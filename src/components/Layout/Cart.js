import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom';
import '../css/cart.css'
import { useDefault } from '../../contexts/DefaultContext';
import Swal from 'sweetalert2';

export default function Cart() {
    const { cart, dispatchCart } = useAuth()
    const { startTransition, isPending, darkTheme, t, lang } = useDefault()
    const [productPrice, setProductPrice] = useState(0)
    const [cartPrice, setCartPrice] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (cart.length !== 0) {
            let price = 0;
            cart.map((product) => {
                price += (product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01) * product.number
            })//seteaza pretul total
            setProductPrice(Number((price).toFixed(2)))
            if (price >= 200) {
                setCartPrice(c => Number(price).toFixed(2))
            } else {
                setCartPrice(c => Number(price + 20).toFixed(2))
            }//daca pretul este mai mic de 200, livrarea costa 20 de lei
        } else {
            navigate('/main')//daca cosul este gol, scoate utilizatorul din pagina
        }
    }, [cart])

    useEffect(() => {
        const count = cart.reduce((total, cart) => total + Number(cart.number), 0)
        document.title = `Blisst — ${t('Cart.Coșul meu')} (${count})`
    }, [lang, cart])

    function handleDeleteCart(product) {
        Swal.fire({
            title: t('Nav.Ești sigur?'),
            text: t('Nav.Asta o să îți șteargă produsul din coș.'),
            icon: 'warning',
            cancelButtonText: t('Nav.Înapoi'),
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: t('Nav.Șterge')
        }).then((result) => {
            if (result.isConfirmed) {
                dispatchCart({ type: 'cartRemove', payload: { cart: product } })
            }
        });
    }//sterge produsul din cos


    return (
        <>
            {isPending && (
                <div className="loading-bg">
                    <div className="loading-spin">Loading...</div>
                </div>
            )}
            <div className='cart-div'>
                <div className='cart-left'>
                    {[...cart].reverse().map((product) => {
                        return (
                            <div className='cart-product'>
                                <Link to={`/product/${product.id}`}>
                                    <img className='cart-photo'
                                        src={product.photo}
                                    />
                                </Link>
                                <Link to={`/product/${product.id}`} className='cart-det'>
                                    <div className='cart-name'>{product.name}</div>
                                    <div className='cart-info'>{product.spec}</div>
                                </Link>
                                <div className='cart-action'>
                                    {product.discount > 0 ? (
                                        <>
                                            <div className="cart-price-flex">
                                                <div className="cart-price-old">{product.price}
                                                    <span className="cart-span">Lei</span>
                                                </div>
                                                <span className="cart-price"> - {(product.discount * 100).toFixed(0)} %</span>
                                            </div>
                                            <div className="cart-price-new text-red-600">{(product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01).toFixed(2)}
                                                <span className="cart-span text-red-600">Lei</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='cart-price'>{product.price} Lei</div>
                                    )}
                                    <div className='cart-price'>{t('Cart.Mărime')}: {product.selectedSize}</div>
                                    <div className='flex'>
                                        <label htmlFor="nr-select" className='cart-price'>{t('Cart.Cantitate')}: </label>
                                        <select id="nr-select" value={product.number} className='cart-option'
                                            onChange={e => {
                                                if (e.target.value === '') {
                                                    handleDeleteCart(product)
                                                } else {
                                                    dispatchCart({ type: 'cartNrChange', payload: { product: product, number: parseInt(e.target.value) } })
                                                }
                                            }
                                            }//modifica numarul de produse, iar daca nr ="", atunci sterge-l
                                        >
                                            <option value="" className='principal font-semibold'>0({t('Cart.șterge')})</option>
                                            {Array.from({ length: product.size[product.selectedSize] }, (_, index) => { if (index < 10) { return index + 1 } }).map((number) => <>
                                                {number && (
                                                    <option key={number} value={number} className='cart-option'>
                                                        {number}
                                                    </option>
                                                )}</>)}
                                        </select>
                                    </div>
                                    <div onClick={() => { startTransition(() => { handleDeleteCart(product) }) }}
                                        className={darkTheme ? 'cart-delete-dark' : 'cart-delete'}
                                    ></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='cart-right'>
                    <div className='cart-title'>{t('Cart.Sumar comandă')}:</div>
                    <div className='flex justify-between w-full'>
                        <div className='cart-text'>{t('Cart.Cost produse')}:</div>
                        <div className='cart-right-price'>{productPrice} Lei</div>
                    </div>
                    <div className='flex justify-between w-full'>
                        <div className='cart-text'>{t('Cart.Cost livrare')}:</div>
                        {productPrice >= 200 ? (
                            <div className='cart-right-free text-green-500'>{t('Cart.Gratuit')}</div>
                        ) : (
                            <div className='cart-right-price'>20 Lei</div>
                        )}
                    </div>
                    <div className='flex justify-between w-full cart-line mt-4'>
                        <div className='cart-title'>{t('Cart.Total')}:</div>
                        <div className='text-xl font-semibold principal'>{cartPrice} Lei</div>
                    </div>
                    <div className='cart-continue'><Link to='/main/cart/checkout'>{t('Cart.Continuă')}<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                </div>
            </div>
        </>
    )
}
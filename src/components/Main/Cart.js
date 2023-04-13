import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './css/cart.css'
import { useDefault } from '../../contexts/DefaultContext';
import Swal from 'sweetalert2';

export default function Cart() {
    const { cart, dispatchCart, product } = useAuth()
    const { startTransition, isPending, darkTheme, } = useDefault()
    const [productPrice, setProductPrice] = useState(0)
    const [cartPrice, setCartPrice] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Blisst — Cosul meu'
        if (cart.length !== 0) {
            let price = 0;
            cart.map((product) => {
                price += (product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01) * product.number
            })
            setProductPrice(Number((price).toFixed(2)))
            if (price >= 200) {
                setCartPrice(c => Number(price).toFixed(2))
            } else {
                setCartPrice(c => Number(price + 20).toFixed(2))
            }
        } else {
            navigate('/')
        }
    }, [cart])

    function handleDeleteCart(product) {
        Swal.fire({
            title: 'Esti sigur?',
            text: 'Asta o sa iti stearga produsul din cos.',
            icon: 'warning',
            cancelButtonText: 'Inapoi',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sterge-l'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatchCart({ type: 'cartRemove', payload: { cart: product } })
            }
        });
    }


    return (
        <>
            {isPending && (
                <div className="loading-bg">
                    <div className="loading-spin">Loading...</div>
                </div>
            )}
            <div className='cart-div'>
                <div className='cart-left'>
                    {cart.map((product) => {
                        return (
                            <div className='cart-product'>
                                <Link to={`/product/${product.id}`}>
                                    <div className='cart-photo'
                                        style={{ backgroundImage: `url(${product.photo})` }}
                                    />
                                </Link>
                                <Link to={`/product/${product.id}`} className='cart-det'>
                                    <div className='cart-name'>{product.nume}</div>
                                    <div className='cart-info'>{product.spec}</div>
                                </Link>
                                <div className='cart-action'>
                                    {product.discount > 0 ? (
                                        <>
                                            <div className="cart-price-flex">
                                                <div className="cart-price-old">{product.price}
                                                    <span className="cart-span">Lei</span>
                                                </div>
                                                <span className="cart-price"> - {product.discount * 100} %</span>
                                            </div>
                                            <div className="cart-price-new text-red-600">{product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01}
                                                <span className="cart-span text-red-600">Lei</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='cart-price'>{product.price} Lei</div>
                                    )}
                                    <div className='cart-price'>Marime: {product.selectedSize}</div>
                                    <div className='flex'>
                                        <label htmlFor="nr-select" className='cart-price'>Numar:</label>
                                        <select id="nr-select" value={product.number} className='cart-option'
                                            onChange={e => {
                                                if (e.target.value === '') {
                                                    handleDeleteCart(product)
                                                } else {
                                                    dispatchCart({ type: 'cartNrChange', payload: { product: product, number: e.target.value } })
                                                }
                                            }
                                            }
                                        >
                                            <option value="" className='text-red-600 font-semibold'>0(sterge)</option>
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
                    <div className='cart-title'>Sumar comanda:</div>
                    <div className='flex justify-between w-full'>
                        <div className='cart-text'>Cost produse:</div>
                        <div className='cart-right-price'>{productPrice} Lei</div>
                    </div>
                    <div className='flex justify-between w-full'>
                        <div className='cart-text'>Cost livrare:</div>
                        {productPrice >= 200 ? (
                            <div className='cart-right-free text-green-500'>Gratuit</div>
                        ) : (
                            <div className='cart-right-price'>20 Lei</div>
                        )}
                    </div>
                    <div className='flex justify-between w-full cart-line mt-4'>
                        <div className='cart-title'>Total:</div>
                        <div className='text-xl font-semibold text-orange-600'>{cartPrice} Lei</div>
                    </div>
                    <div className='cart-continue'><Link to='/main/cart/checkout'>Continua<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                </div>
            </div>
        </>
    )
}
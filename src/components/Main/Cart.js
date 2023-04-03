import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './css/cart.css'
import { useDefault } from '../../contexts/DefaultContext';

export default function Cart() {
    const { cart, dispatchCart } = useAuth()
    const { startTransition, isPending, darkTheme } = useDefault()
    const [cartPrice, setCartPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const discountValue = useRef()
    const [newCart, setNewCart] = useState(0);

    useEffect(() => {
        let price = 0;
        cart.map((product) => {
            price += (product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01) * product.number
        })
        setCartPrice(Number((price).toFixed(2)))
        if(price >= 200) {
            setNewCart(c => Number(price - (price * discount)).toFixed(2))
        } else {
            setNewCart(c => Number((price - (price * discount)) + 20).toFixed(2)) 
        }
    }, [cart, discount])



    const handleDiscount = (e) => {
        e.preventDefault()
        const value = discountValue.current.value
        const discountCode = { stefan10: 0.1, stefan20: 0.2, stefan30: 0.3 }
        if (discountCode.hasOwnProperty(value)) {
            setDiscount(discountCode[value])
        } else {
            alert('Codul este invalid');
        }
        discountValue.current.value = '';
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
                                        <div className='cart-dec'
                                            onClick={() => { dispatchCart({ type: 'cartNrChange', payload: { stoc: product.size[product.selectedSize], product: product, number: product.number - 1 } }) }}
                                        >&#8211;</div>
                                        <div className='cart-number'>{product.number}</div>
                                        <div className='cart-inc'
                                            onClick={() => { dispatchCart({ type: 'cartNrChange', payload: { stoc: product.size[product.selectedSize], product: product, number: product.number + 1 } }) }}
                                        >+</div>
                                    </div>
                                    <div onClick={() => { startTransition(() => { dispatchCart({ type: 'cartRemove', payload: { cart: product } }) }) }}
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
                        {discount ? (
                            <>
                                <div className='cart-right-price'>
                                    <span className='text-gray-500 line-through'>{cartPrice} Lei</span>
                                    -{discount * 100} %
                                </div>
                            </>
                        ) : (
                            <div className='cart-right-price'>{cartPrice} Lei</div>
                        )}
                    </div>
                    {discount ? (
                        <div className='flex justify-between w-full'>
                            <div className='cart-text'>
                                Cost produse nou:
                            </div>
                            <div className='cart-right-price'>
                                {Number((cartPrice - (cartPrice * discount)).toFixed(2))} Lei
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className='flex justify-between w-full'>
                        <div className='cart-text'>Cost livrare:</div>
                        {cartPrice >= 200 ? (
                            <div className='cart-right-free text-green-500'>Gratuit</div>
                        ) : (
                            <div className='cart-right-price'>20 Lei</div>
                        )}
                    </div>
                    <div className='cart-title'>Total:</div>
                    <div className='text-xl font-semibold'>{newCart} Lei</div>
                    <div className='text-xl font-bold'>Ai un cod de reducere?</div>
                    <form className='flex justify-center items-center my-2' onSubmit={handleDiscount}>
                        <input type={'text'} maxLength={10} minLength={6}
                            className='cart-form-input' required
                            placeholder='Introdu codul'
                            ref={discountValue}
                        />
                        <input type='submit' className={darkTheme ? 'cart-form-submit-dark' : 'cart-form-submit'} value=' ' />
                    </form>
                    <div className='cart-continue'><Link to='/'>Continua<div className={darkTheme ? 'nav-arrow-dark' : 'nav-arrow'} /></Link></div>
                </div>
            </div>
        </>
    )
}
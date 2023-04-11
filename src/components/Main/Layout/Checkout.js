import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../css/cartCheckout.css'
import { useAuth } from '../../../contexts/AuthContext'
import { useDefault } from '../../../contexts/DefaultContext'
import axios from 'axios'
import { counties } from './Test'
import Swal from 'sweetalert2';

export default function Checkout() {
  const { server, currentUser,
    cart, dispatchCart,
    dispatchCommand,
    product, setProduct
  } = useAuth()
  const { startTransition, isPending, darkTheme } = useDefault()
  const [actualPage, setActualPage] = useState(1)
  const [edit, setEdit] = useState({ adress: false, contact: false, pay: false })
  const [error, setError] = useState({ adress: '', contact: '', pay: '' })
  const [det, setDet] = useState({ info: '', tel: '', email: '', name: '', county: '' })
  const [cartPrice, setCartPrice] = useState(0)
  const [method, setMethod] = useState({ card: false, ramburs: false })
  const [discount, setDiscount] = useState(0)
  const [preDet, setPreDet] = useState({})
  const [productPrice, setProductPrice] = useState(0)
  const discountValue = useRef()
  const navigate = useNavigate()

  const backInfo = () => {
    setPreDet({
      info: det.info,
      tel: det.tel,
      email: det.email,
      name: det.name,
      type: det.type,
      county: det.county
    })
    setEdit({ adress: false, contact: false, pay: false })
  }
  const saveInfo = e => {
    e.preventDefault()
    startTransition(() => {
      axios.post(`${server}/user/infoUpdate`, {
        uid: currentUser.uid,
        det: preDet,
      })
        .then(info => {
          setDet({
            info: preDet.info,
            tel: preDet.tel,
            email: preDet.email,
            name: preDet.name,
            type: preDet.type,
            county: preDet.county
          }); console.log(info.data)
        })
        .catch(err => {
          setPreDet({
            info: det.info,
            tel: det.info,
            email: det.email,
            name: det.name,
            type: det.type,
            county: det.county
          }); console.error(err)
        })
      setEdit({ adress: false, contact: false, pay: false })
    })
  }
  const handleNext = () => {
    let actualError = { adress: '', contact: '', pay: '' }
    if (det.info === '' || det.county === '') {
      actualError.adress = 'Seteaza adresa pentru a continua'
    }
    if (det.tel === '') {
      actualError.contact = 'Seteaza un numar de telefon pentru a continua'
    }
    if (method.card === false && method.ramburs === false) {
      actualError.pay = 'Selecteaza o metoda de plata'
    }
    if (Object.values(actualError).every((value) => value === '')) {
      setActualPage(2);
      window.scrollTo(0, 0);
    } else {
      Swal.fire({
        title: 'Eroare!',
        text: "Nu ai introdus toate informatiile.",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Inapoi.',
      })
    }
    setError({ ...actualError })
  }
  const handleDiscount = (e) => {
    e.preventDefault()
    const value = discountValue.current.value
    axios.post(`${server}/discount`, { discountCode: value })
      .then(info => {
        setDiscount(info.data.discount)
        if (info.data.discount !== 0) {
          Swal.fire({
            title: 'Succes',
            text: `Reducerea de ${info.data.discount * 100}% a fost aplicata cu succes`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        } else {
          Swal.fire({
            title: 'Eroare',
            text: "Codul introdus este gresit sau a expirat",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Inapoi'
          })
        }
      })
      .catch(err => console.error(err.error))
    discountValue.current.value = '';
  }
  const handleNewCommand = () => {
    Swal.fire({
      title: 'Esti sigur?',
      text: "Esti sigur ca vrei sa plasezi comanda?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Plaseaza comanda',
      cancelButtonText: 'Inapoi'
    }).then((result) => {
      if (result.isConfirmed) {
        const date = new Date();
        const commandData = {
          method: method.card ? 'Card' : 'Ramburs',
          details: det,
          date: `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
          price: {
            productPrice: productPrice,
            discount: discount,
            delivery: productPrice >= 200 ? 0 : 20,
            total: cartPrice
          },
          product: cart,
          status: 'Se livreaza'
        }
        dispatchCart({ type: 'cartDeleteAll' })
        dispatchCommand({ type: 'commandAdd', payload: { command: commandData } })
        Swal.fire(
          'Comanda Plasata!',
          'Comanda a fost plasata.',
          'success'
        )
        axios.post(`${server}/commandUpdate`,
          {
            uid: currentUser.uid,
            command: commandData,
            email: currentUser.email
          }
        ).then(info => {
          console.log(info);
          handleUpdateSizes()
        })
        .catch(err => console.error(err.error))
        navigate('/main/command')
      }
    })
  }
  const handleUpdateSizes = () => {
    let newProduct = product
    cart.forEach(cart => {
      newProduct = newProduct.map(product => {
        const updatedProduct = product;
        if(product.id === cart.id) {
          updatedProduct.size[cart.selectedSize] -= cart.number
        }
        return updatedProduct
      })
    })
    setProduct(newProduct)
  }
  const handleDeleteCart = product => {
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
  useEffect(() => {
    if (cart.length !== 0) {
      let price = 0;
      cart.map((product) => {
        price += (product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01) * product.number
      })
      setProductPrice(Number((price).toFixed(2)))
      if (price >= 200) {
        setCartPrice(c => Number(price - (price * discount)).toFixed(2))
      } else {
        setCartPrice(c => Number((price - (price * discount)) + 20).toFixed(2))
      }
    } else {
      navigate('/main')
    }
  }, [cart, discount])

  useEffect(() => {
    axios.post(`${server}/user/info`, { uid: currentUser.uid })
      .then(info => { setDet(info.data.det); setPreDet(info.data.det) })
      .catch(err => console.error(err.error))
  }, [])


  return (
    <div className='check'>
      <div className='check-bar-bg'>
        <div className='check-bar'>
          <div className='check-bar-line'>
            <div className={actualPage >= 1 ? 'check-line' : 'check-line-grey'}></div>
            <div className={actualPage >= 2 ? 'check-line' : 'check-line-grey'}></div>
            <div className={actualPage >= 3 ? 'check-line' : 'check-line-grey'}></div>
          </div>
          <div className='check-bar-flex'>
            <div className={actualPage === 0 ? 'check-bar-text' : 'check-bar-text-grey'}
              onClick={() => navigate('/main/cart')}
            >Cosul Meu</div>
            <div className={actualPage === 1 ? 'check-bar-text' : 'check-bar-text-grey'}
              onClick={() => setActualPage(1)}
            >Detalii comanda</div>
            <div className={actualPage === 2 ? 'check-bar-text' : 'check-bar-text-grey'}
              onClick={() => handleNext()}
            >Sumar Comanda</div>
            <div className={actualPage === 3 ? 'check-bar-text' : 'check-bar-text-grey'}
            >Comanda plasata</div>
          </div>
        </div>
      </div>
      {actualPage === 1 ? (
        <>
          <div className='check-page'>
            <div className='check-page-top'>
              <div className='check-page-nr'>1</div>
              <div className='check-page-title'>Adresa de livrare</div>
              <div className='check-error text-red-600'>
                {error.adress}
              </div>
            </div>
            <div className='check-page-content'>
              {edit.adress ? (
                <>
                  <div className='check-det-txt'>
                    <label htmlFor="county-select" className='check-txt'>Judet: <br /></label>
                    <select id="county-select" value={preDet.county}
                      className='check-option'
                      onChange={e => setPreDet({ ...preDet, county: e.target.value })}
                    >
                      <option value="" className='check-option'>Judete</option>
                      {counties.map((county) => (
                        <option key={county} value={county} className='check-option'>
                          {county}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="check-txt">Informatii adresa:<br />
                    <form onSubmit={saveInfo}>
                      <input type='text'
                        className='check-input'
                        value={preDet.info}
                        onChange={e => setPreDet({ ...preDet, info: e.target.value })}
                      />
                      <div className='w-full flex justify-around mt-3'>
                        <input type='submit' className='prof-save'
                          value='Salveaza'
                        />
                        <div className='prof-back' onClick={backInfo}>Inapoi</div>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <div className='check-txt'>Judet: <br />
                    <div className='check-det-txt'>
                      {det.county ? det.county : (<div className="prof-noset">Judet neselectat</div>)}
                    </div>
                  </div>
                  <div className="check-txt">Informatii adresa:<br />
                    <div className="check-det-txt">
                      {det.info !== '' ? det.info : (<div className="prof-noset">Adresa nesetata</div>)}
                    </div>
                    <div className='flex justify-center mt-3'>
                      <div className='check-save' onClick={() => setEdit({ ...edit, adress: true })}>Editeaza</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='check-page'>
            <div className='check-page-top'>
              <div className='check-page-nr'>2</div>
              <div className='check-page-title'>Informatii contact</div>
              <div className='check-error text-red-600'>
                {error.contact}
              </div>
            </div>
            <div className='check-page-content'>
              {edit.contact ? (
                <form onSubmit={saveInfo}>
                  <div className="check-txt">
                    Numar de telefon:
                    <input type='number' value={preDet.tel}
                      onChange={e => setPreDet({ ...preDet, tel: e.target.value })}
                      className='check-input'
                    />
                  </div>
                  <div className="check-txt">
                    Email de contact:
                    <input type='email' value={preDet.email}
                      onChange={e => setPreDet({ ...preDet, email: e.target.value })}
                      className='check-input' required
                    />
                  </div>
                  <div className='w-full flex justify-around mt-3'>
                    <input type='submit' className='check-save'
                      value='Salveaza'
                    />
                    <div className='check-back' onClick={backInfo}>Inapoi</div>
                  </div>
                </form>
              ) : (
                <>
                  <div className="check-txt">Numar de telefon:<br />
                    <div className="check-det-txt">
                      {det.tel !== '' ? det.tel : (<div className="prof-noset">Numar de telefon nesetat</div>)}
                    </div>
                  </div>
                  <div className="check-txt">Email de contact:<br />
                    <div className="check-det-txt">
                      {det.email}
                    </div>
                  </div>
                  <div className='flex justify-center mt-3'>
                    <div className='check-save' onClick={() => setEdit({ ...edit, contact: true })}>Editeaza</div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='check-page'>
            <div className='check-page-top'>
              <div className='check-page-nr'>3</div>
              <div className='check-page-title'>Modalitate de plata</div>
              <div className='check-error text-red-600'>
                {error.pay}
              </div>
            </div>
            <div className='check-page-content'>
              <label className='check-page-pay cursor-not-allowed'>
                <input type='radio'
                  checked={method.card}
                  name="payCheckbox"
                  onChange={() => setMethod({ ramburs: false, card: true })}
                  disabled
                  className='check-page-checkbox' />
                <div className='check-pay-content check-disabled'>
                  <div className='check-pay-title'>Plata cu cardul</div>
                  <div className='check-pay-info'>Aceasta optiune nu este inca disponibila, revino mai tarziu</div>
                </div>
              </label>
              <label className='check-page-pay cursor-pointer'>
                <input type='radio' name="payCheckbox"
                  checked={method.ramburs}
                  className='check-page-checkbox'
                  onChange={() => setMethod({ ramburs: true, card: false })}
                />
                <div className='check-pay-content'>
                  <div className='check-pay-title'>Ramburs la curier</div>
                  <div className='check-pay-info'>Vei plati in momentul in care comanda va fi livrata</div>
                </div>
              </label>
            </div>
          </div>
          <div className='check-continue' onClick={handleNext}>Mai departe</div>
        </>
      ) : (
        <>
          <div className='check-sumar-div'>
            <div className='check-sumar-flex'>
              <div className='check-sumar'>
                <div className='check-txt'>Judetul: <br />
                  <div className='check-det-txt'>
                    {det.county}
                  </div>
                </div>
                <div className="check-txt">Informatii adresa:<br />
                  <div className="check-det-txt">
                    {det.info}
                  </div>
                </div>
              </div>
              <div className='check-sumar'>
                <div className='check-txt'>Numar de telefon: <br />
                  <div className='check-det-txt'>
                    {det.tel}
                  </div>
                </div>
                <div className="check-txt">Email contact:<br />
                  <div className="check-det-txt">
                    {det.email}
                  </div>
                </div>
              </div>
              <div className='check-sumar'>
                <div className='check-txt'>Metoda de plata: <br />
                  <div className='check-det-txt'>
                    {method.ramburs ? 'Ramburs' : method.card ? 'Card de credit' : 'Wrong'}
                  </div>
                </div>
              </div>
            </div>
            <div className='check-save' onClick={() => setActualPage(1)}>Editeaza</div>
          </div>
          <div className='check-sumar-cart'>
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
                      <label className='cart-price'>Numar:</label>
                      <select value={product.number} className='cart-option'
                        onChange={e => {
                          if (e.target.value === '') {
                            handleDeleteCart(product)
                          } else {
                            dispatchCart({ type: 'cartNrChange', payload: { product: product, number: e.target.value } })
                          }
                        }}
                      >
                        <option value="" className='text-red-600 font-semibold'>0(sterge)</option>
                        {Array.from({ length: product.size[product.selectedSize] }, (_, index) => { if (index <= 10) { return index + 1 } }).map((number) => (
                          <option key={number} value={number} className='cart-option'>
                            {number}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div onClick={() => { startTransition(() => { handleDeleteCart(product) }) }}
                      className={darkTheme ? 'cart-delete-dark' : 'cart-delete'}
                    ></div>
                  </div>
                </div>
              )
            })}
            <div className='check-sumar-total'>
              <div className='flex justify-between w-full'>
                <div className='cart-text'>Cost produse:</div>
                {discount ? (
                  <>
                    <div className='cart-right-price'>
                      <span className='text-gray-500 line-through'>{productPrice} Lei</span>
                      -{discount * 100} %
                    </div>
                  </>
                ) : (
                  <div className='cart-right-price'>{productPrice} Lei</div>
                )}
              </div>
              {discount ? (
                <div className='flex justify-between w-full'>
                  <div className='cart-text'>Cost produse nou</div>
                  <div className='cart-right-price'>{(productPrice - (productPrice * discount)).toFixed(2)} Lei</div>
                </div>
              ) : (<></>)}
              <div className='flex justify-between w-full'>
                <div className='cart-text'>Cost livrare:</div>
                {productPrice >= 200 ? (
                  <div className='cart-right-free text-green-500'>Gratuit</div>
                ) : (
                  <div className='cart-right-price'>20 Lei</div>
                )}
              </div>
              <div className='flex justify-between w-full cart-line mt-4'></div>
              <div className='cart-title'>Total:</div>
              <div className='text-xl font-semibold text-orange-600'>{cartPrice} Lei</div>
              <div className='text-xl font-bold cart-text'>Ai un cod de reducere?</div>
              <form className='flex justify-center items-center my-2' onSubmit={handleDiscount}>
                <input type={'text'} maxLength={10} minLength={6}
                  className='cart-form-input' required
                  placeholder='Introdu codul'
                  ref={discountValue}
                />
                <input type='submit' className={darkTheme ? 'cart-form-submit-dark' : 'cart-form-submit'} value=' ' />
              </form>
            </div>
          </div>
          <div className='check-sumar-command' onClick={() => handleNewCommand()}>
            Plaseaza comanda
          </div>
        </>
      )}
    </div>
  )
}

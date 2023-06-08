import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../css/cartCheckout.css'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import axios from 'axios'
import { counties } from '../../contexts/Import'
import Swal from 'sweetalert2';

export default function Checkout() {
  const { server, currentUser,
    cart, dispatchCart,
    det,
  } = useAuth()
  const { startTransition, isPending, darkTheme, t, lang } = useDefault()
  const [actualPage, setActualPage] = useState(1)
  const [edit, setEdit] = useState({ adress: false, contact: false, pay: false })
  const [error, setError] = useState({ adress: '', contact: '', pay: '' })
  const [cartPrice, setCartPrice] = useState(0)
  const [method, setMethod] = useState({ card: false, ramburs: false })
  const [discount, setDiscount] = useState({ value: 0, code: '' })
  const [preDet, setPreDet] = useState({})
  const [newDet, setNewDet] = useState({ info: '', tel: '', email: '', name: '', type: '', county: '', newsLetter: false, color: '' })
  const [productPrice, setProductPrice] = useState(0)
  const discountValue = useRef()
  const navigate = useNavigate()
  const backInfo = () => {
    setPreDet({
      info: newDet.info,
      tel: newDet.tel,
      email: newDet.email,
      name: newDet.name,
      type: newDet.type,
      county: newDet.county,
      color: newDet.color
    })
    setEdit({ adress: false, contact: false, pay: false })
  }//daca utilizatorul nu modifica informatiile, nu le salva
  const saveInfo = e => {
    e.preventDefault()
    setNewDet({
      info: preDet.info,
      tel: preDet.tel,
      email: preDet.email,
      name: preDet.name,
      type: preDet.type,
      county: preDet.county,
      color: preDet.color
    })
    setEdit({ adress: false, contact: false, pay: false })
  }//daca utilizatorul apasa salveaza,salveaza informatiile
  const handleNext = () => {
    let actualError = { adress: '', contact: '', pay: '' }
    if (newDet.info === '' || newDet.county === '') {
      actualError.adress = t('Check.Setează adresa pentru a continua!')
    }
    if (newDet.tel === '') {
      actualError.contact = t('Check.Setează un număr de telefon pentru a continua!')
    }
    if (method.card === false && method.ramburs === false) {
      actualError.pay = t('Check.Selectează o metodă de plată!')
    }
    if (Object.values(actualError).every((value) => value === '')) {
      setActualPage(2);
      window.scrollTo(0, 0);
    } else {
      Swal.fire({
        title: t('Check.Eroare!'),
        text: t('Check.Nu ai introdus toate informațiile.'),
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: t('Check.Înapoi'),
      })
    }
    setError({ ...actualError })
  }//daca utilizatorul apasa continuare, verifica daca informatiile sunt corecte,iar apoi schimba pagina
  const handleDiscount = (e) => {
    e.preventDefault()
    const value = discountValue.current.value
    axios.post(`${server}/discount`, { discountCode: value, email: currentUser.email })
      .then(info => {
        if (info.data.success === true) {
          setDiscount({ value: info.data.discount, code: value })
          Swal.fire({
            title: t('Check.Felicitări!'),
            text: `${t('Check.Reducerea de')} ${info.data.discount * 100} % ${t('Check.a fost aplicată cu succes.')}`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
          })
        } else {
          Swal.fire({
            title: t('Check.Eroare!'),
            text: t(`Check.${info.data.message}`),
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('Check.Înapoi')
          })
        }
      })
      .catch(err => console.error(err.error))
    discountValue.current.value = '';
  }//verifica daca discount-ul este bun, si daca a mai fost folosit de acest utilizator
  const handleNewCommand = (payMethod) => {
    Swal.fire({
      title: t('Check.Ești sigur?'),
      text: t('Check.Ești sigur că vrei să plasezi comanda?'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Check.Plasează comanda'),
      cancelButtonText: t('Check.Înapoi')
    }).then(async (result) => {
      if (result.isConfirmed) {
        const verify = await axios.post(`${server}/product/verifyStock`, { cart: cart })
        if (verify.data.success) {
          const date = new Date();
          let hours = date.getHours()
          let minutes = date.getMinutes()
          if (hours < 10) hours = `0${hours}`
          if (minutes < 10) minutes = `0${minutes}`
          const orderData = {
            method: method.card ? 'Card' : 'Ramburs',
            details: newDet,
            date: `${date.getDate()} ${date.getMonth() + 1} ${hours}:${minutes} ${date.getFullYear()}`,
            price: {
              productPrice: productPrice,
              discount: discount.value,
              code: discount.code,
              delivery: productPrice >= 200 ? 0 : 20,
              total: cartPrice
            },
            status: 'Plasată',
          }
          if (payMethod === 'card') {
            try {
              const response = await axios.post(`${server}/create-checkout-session`, {
                orderData: orderData,
              });
              console.log(response)
              if (response.data.success) {
                window.open(response.data.url, '_blank')
                navigate('/main')
              }
            } catch (err) {
              console.log(err)
              Swal.fire({
                title: t('Check.Eroare!'),
                text: `${t('Check.A apărut o eroare')}: ${err.message}.`,
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: t('Check.Înapoi')
              })
            }
          } else if (payMethod === 'ramburs') {
            const newOrder = encodeURIComponent(JSON.stringify(orderData));
            navigate(`/placeOrder/${newOrder}`)
          }
        } else {
          Swal.fire(
            t('Check.A apărut o eroare'),
            t(`Check.${verify.data.message}`),
            'error'
          )
        }
      }
    })
  }//plaseaza comanda(adica salveaza comanda in baza de date la user/uid/command si la commands), trimite un email cu comanda, si sterge produsele din cos.
  const handleDeleteCart = product => {
    Swal.fire({
      title: t('Check.Ești sigur?'),
      text: t('Check.Asta o să iți șteargă produsul din coș.'),
      icon: 'warning',
      cancelButtonText: t('Check.Înapoi'),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Check.Șterge')
    }).then((result) => {
      if (result.isConfirmed) {
        dispatchCart({ type: 'cartRemove', payload: { cart: product } })
      }
    });
  }//sterge un produs din cos

  useEffect(() => {
    startTransition(() => {
      if (cart.length !== 0) {
        let price = 0;
        cart.map((product) => {
          price += ((product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01)).toFixed(2) * product.number
        })
        setProductPrice(Number((price).toFixed(2)))
        if (price >= 200) {
          setCartPrice(c => Number(price - (price * discount.value)).toFixed(2))
        } else {
          setCartPrice(c => Number((price - (price * discount.value)) + 20).toFixed(2))
        }
      } else {
        navigate('/main')
      }
    })
  }, [cart, discount])//cand cosul sau discount-ul se modifica, recalculeaza pretul produselor

  useEffect(() => {
    startTransition(() => {
      setNewDet(det)
      setPreDet(det)
    })
  }, [])
  useEffect(() => {
    document.title = `Blisst — ${t('Check.Plasează comanda')}`
  }, [lang])


  return (
    <>
      {isPending && (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      )}
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
              >{t('Check.Coșul Meu')}</div>
              <div className={actualPage === 1 ? 'check-bar-text' : 'check-bar-text-grey'}
                onClick={() => setActualPage(1)}
              >{t('Check.Detalii Comandă')}</div>
              <div className={actualPage === 2 ? 'check-bar-text' : 'check-bar-text-grey'}
                onClick={() => handleNext()}
              >{t('Check.Sumar Comandă')}</div>
              <div className={actualPage === 3 ? 'check-bar-text' : 'check-bar-text-grey'}
              >{t('Check.Comandă plasată')}</div>
            </div>
          </div>
        </div>
        {actualPage === 1 ? (
          // pagina 1 (detalii comanda)
          <>
            <div className='check-page'>
              <div className='check-page-top'>
                <div className='check-page-nr'>1</div>
                <div className='check-page-title'>{t('Check.Adresa de livrare')}</div>
                <div className='check-error text-red-600'>
                  {error.adress}
                </div>
              </div>
              <div className='check-page-content'>
                {edit.adress ? (
                  <>
                    <div className='check-det-txt'>
                      <label htmlFor="county-select" className='check-txt'>{t('Check.Județ')}: <br /></label>
                      <select id="county-select" value={preDet.county}
                        className='check-option'
                        onChange={e => setPreDet({ ...preDet, county: e.target.value })}
                      >
                        <option value="" className='check-option'>{t('Check.Județe')}</option>
                        {counties.map((county) => (
                          <option key={county} value={county} className='check-option'>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="check-txt">{t('Check.Informații adresă')}:<br />
                      <form onSubmit={saveInfo}>
                        <input type='text'
                          className='check-input'
                          minLength={20} maxLength={150}
                          value={preDet.info}
                          onChange={e => setPreDet({ ...preDet, info: e.target.value })}
                        />
                        <div className='w-full flex justify-around mt-3'>
                          <input type='submit' className='prof-save'
                            value={t('Check.Salvează')}
                          />
                          <div className='prof-back' onClick={backInfo}>{t('Check.Înapoi')}</div>
                        </div>
                      </form>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='check-txt'>{t('Check.Județ')}: <br />
                      <div className='check-det-txt'>
                        {newDet.county !== "" ? newDet.county : (<div className="prof-noset">{t('Check.Județ neselectat')}</div>)}
                      </div>
                    </div>
                    <div className="check-txt">{t('Check.Informații adresă')}:<br />
                      <div className="check-det-txt">
                        {newDet.info !== '' ? newDet.info : (<div className="prof-noset">{t('Check.Adresă nesetată')}</div>)}
                      </div>
                      <div className='flex justify-center mt-3'>
                        <div className='check-save' onClick={() => setEdit({ ...edit, adress: true })}>{t('Check.Editează')}</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='check-page'>
              <div className='check-page-top'>
                <div className='check-page-nr'>2</div>
                <div className='check-page-title'>{t('Check.Informații contact')}</div>
                <div className='check-error text-red-600'>
                  {error.contact}
                </div>
              </div>
              <div className='check-page-content'>
                {edit.contact ? (
                  <form onSubmit={saveInfo}>
                    <div className="check-txt">
                      {t('Check.Număr de telefon')}:
                      <input type='number' value={preDet.tel}
                        onChange={e => setPreDet({ ...preDet, tel: e.target.value })}
                        className='check-input'
                        minLength={8}
                        maxLength={16}
                      />
                    </div>
                    <div className="check-txt">
                      {t('Check.Email de contact')}:
                      <input type='email' value={preDet.email}
                        onChange={e => setPreDet({ ...preDet, email: e.target.value })}
                        className='check-input' required minLength={8} maxLength={40}
                      />
                    </div>
                    <div className='w-full flex justify-around mt-3'>
                      <input type='submit' className='check-save'
                        value={t('Check.Salvează')}
                      />
                      <div className='check-back' onClick={backInfo}>{t('Check.Înapoi')}</div>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="check-txt">{t('Check.Număr de telefon')}:<br />
                      <div className="check-det-txt">
                        {newDet.tel !== '' ? newDet.tel : (<div className="prof-noset">{t('Check.Număr de telefon nesetat')}</div>)}
                      </div>
                    </div>
                    <div className="check-txt">{t('Check.Email de contact')}:<br />
                      <div className="check-det-txt">
                        {newDet.email}
                      </div>
                    </div>
                    <div className='flex justify-center mt-3'>
                      <div className='check-save' onClick={() => setEdit({ ...edit, contact: true })}>{t('Check.Editează')}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='check-page'>
              <div className='check-page-top'>
                <div className='check-page-nr'>3</div>
                <div className='check-page-title'>{t('Check.Modalitate de plată')}</div>
                <div className='check-error text-red-600'>
                  {error.pay}
                </div>
              </div>
              <div className='check-page-content'>
                <label className='check-page-pay cursor-pointer'>
                  <input type='radio'
                    checked={method.card}
                    name="payCheckbox"
                    onChange={() => setMethod({ ramburs: false, card: true })}
                    className='check-page-checkbox' />
                  <div className='check-pay-content'>
                    <div className='check-pay-title'>{t('Check.Plată cu cardul')}</div>
                    <div className='check-pay-info'>{t('Check.Vei introduce cardul puțin mai târziu')}</div>
                  </div>
                </label>
                <label className='check-page-pay cursor-pointer'>
                  <input type='radio' name="payCheckbox"
                    checked={method.ramburs}
                    className='check-page-checkbox'
                    onChange={() => setMethod({ ramburs: true, card: false })}
                  />
                  <div className='check-pay-content'>
                    <div className='check-pay-title'>{t('Check.Ramburs la curier')}</div>
                    <div className='check-pay-info'>{t('Check.Vei plăti în momentul în care comanda va fi livrată')}</div>
                  </div>
                </label>
              </div>
            </div>
            <div className='check-continue' onClick={handleNext}>{t('Check.Mai departe')}</div>
          </>
        ) : (
          // pagina 2 (editeaza informatiile, cosul si adauga discount)
          <>
            <div className='check-sumar-div'>
              <div className='check-sumar-flex'>
                <div className='check-sumar'>
                  <div className='check-txt'>{t('Check.Județul')}: <br />
                    <div className='check-det-txt'>
                      {newDet.county}
                    </div>
                  </div>
                  <div className="check-txt">{t('Check.Informații adresă')}:<br />
                    <div className="check-det-txt">
                      {newDet.info}
                    </div>
                  </div>
                </div>
                <div className='check-sumar'>
                  <div className='check-txt'>{t('Check.Număr de telefon')}: <br />
                    <div className='check-det-txt'>
                      {newDet.tel}
                    </div>
                  </div>
                  <div className="check-txt">{t('Check.Email de contact')}:<br />
                    <div className="check-det-txt">
                      {newDet.email}
                    </div>
                  </div>
                </div>
                <div className='check-sumar'>
                  <div className='check-txt'>{t('Check.Modalitate de plată')}: <br />
                    <div className='check-det-txt'>
                      {method.ramburs ? t('Profile.Ramburs') : method.card && t('Profile.Card')}
                    </div>
                  </div>
                </div>
              </div>
              <div className='check-save' onClick={() => setActualPage(1)}>{t('Check.Editează')}</div>
            </div>
            <div className='check-sumar-cart'>
              {cart.map((product) => {
                return (
                  <div className='cart-product'>
                    <Link to={`/product/${product.id}`}>
                      <img className='cart-photo'
                        src={product.photo} alt='Poza'
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
                      <div className='cart-price'>{t('Check.Mărime')}: {product.selectedSize}</div>
                      <div className='flex'>
                        <label className='cart-price'>{t('Check.Cantitate')}:</label>
                        <select value={product.number} className='cart-option'
                          onChange={e => {
                            if (e.target.value === '') {
                              handleDeleteCart(product)
                            } else {
                              dispatchCart({ type: 'cartNrChange', payload: { product: product, number: parseInt(e.target.value) } })
                            }
                          }}
                        >
                          <option value="" className='principal font-semibold'>0({t('Check.șterge')})</option>
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
                  <div className='cart-text'>{t('Cart.Cost produse')}:</div>
                  {discount.value !== 0 ? (
                    <>
                      <div className='cart-right-price'>
                        <span className='text-gray-500 line-through'>{productPrice} Lei</span>
                        -{discount.value * 100} %
                      </div>
                    </>
                  ) : (
                    <div className='cart-right-price'>{productPrice} Lei</div>
                  )}
                </div>
                {discount.value !== 0 ? (
                  <div className='flex justify-between w-full'>
                    <div className='cart-text'>{t('Check.Cost produse nou')}:</div>
                    <div className='cart-right-price'>{(productPrice - (productPrice * discount.value)).toFixed(2)} Lei</div>
                  </div>
                ) : (<></>)}
                <div className='flex justify-between w-full'>
                  <div className='cart-text'>{t('Cart.Cost livrare')}:</div>
                  {productPrice >= 200 ? (
                    <div className='cart-right-free text-green-500'>{t('Cart.Gratuit')}</div>
                  ) : (
                    <div className='cart-right-price'>20 Lei</div>
                  )}
                </div>
                <div className='flex justify-between w-full cart-line mt-4'></div>
                <div className='flex justify-between w-full flex-row'>
                  <div className='cart-title'>{t('Cart.Total')}:</div>
                  <div className='text-xl font-semibold principal'>{cartPrice} Lei</div>
                </div>
                <div className='text-xl font-bold cart-text'>{t('Check.Ai un cod de reducere?')}</div>
                <form className='flex justify-center items-center my-2' onSubmit={handleDiscount}>
                  <input type={'text'} maxLength={10} minLength={6}
                    className='cart-form-input' required
                    placeholder={t('Check.Introdu codul')}
                    ref={discountValue}
                  />
                  <input type='submit' className={darkTheme ? 'cart-form-submit-dark' : 'cart-form-submit'} value=' ' />
                </form>
              </div>
            </div>
            {method.card ? (
              <div className='check-sumar-command' onClick={() => handleNewCommand('card')}>
                {t('Check.Plasează comanda')}
              </div>
            ) : (
              <div className='check-sumar-command' onClick={() => handleNewCommand('ramburs')}>
                {t('Check.Plasează comanda')}
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

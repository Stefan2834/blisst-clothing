import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import { Link, useNavigate } from 'react-router-dom'
import '../css/order.css'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function Order() {
  const { det, currentUser, server } = useAuth()
  const { darkTheme, startTransition, isPending, t, lang } = useDefault()
  const [order, setOrder] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [load, setLoad] = useState(4)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {
    document.title = `Blisst — ${t('Order.Comenziile mele')}`
  }, [lang])

  useEffect(() => {
    if (currentUser) {
      axios.post(`${server}/user/orders`, { uid: currentUser.uid })
        .then(data => { setOrder(data.data.orders); setLoading(false) })
        .catch(err => { console.error(err); setLoading(false) })
    } else {
      navigate('/main')
    }
  }, [])

  const handleCancel = (uid, date) => {
    Swal.fire({
      title: t('Check.Ești sigur?'),
      text: t('Order.Ești sigur că vrei să anulezi comanda?'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Order.Anulează comanda'),
      cancelButtonText: t('Check.Înapoi')
    }).then(async (result) => {
      if (result.isConfirmed) {
        axios.post(`${server}/user/order/cancel`, {
          uid,
          date
        }).then(data => {
          if (data.data.success) {
            setOrder(o => o.map(order => {
              if (order.date === date) {
                return { ...order, status: 'Se anulează' }
              } else {
                return order
              }
            }))
            Swal.fire(
              t('Order.Comanda se anulează'),
              t('Order.Comanda este în curs de anulare.'),
              'success'
            )
          }
        })
      }
    })
  }

  const handleProductSelect = (commandIndex, selectedProduct) => {
    setSelectedProducts(prevState => {
      const newState = [...prevState]
      newState[commandIndex] = selectedProduct
      return newState
    })
  }//schimba produsul selectat pt fiecare comanda

  return (
    <>
      {loading ? (
        <>
          <div className="loading-bg">
            <div className="loading-spin">{t('Main.Se încarcă')}...</div>
          </div>
          <div className='h-screen' />
        </>
      ) : (
        <div className='command-bg'>
          <div className='command'>
            <div className='comm-top'>
              <div className={darkTheme ? 'comm-photo-dark' : 'comm-photo'}></div>
              <div className="comm-name">{t('Order.Salut')},
                <span className='principal'> {det.name}</span>!
                <br />{t('Order.Uite istoricul comenziilor tale')}
              </div>
            </div>
            {order.length === 0 ? (
              <>
              </>
            ) : (
              <>
                {[...order].reverse().map((order, index) => {
                  // afiseaza comenziile, dar in ordine inversa, adica de la cea mai recenta in jos
                  const selectedProduct = selectedProducts[index] || order.product[0]
                  const [day, month, time, year] = order.date.split(' ');
                  if (load > index) {
                    return (
                      <div className='comm-element'>
                        <div className='comm-left'>
                          <div className='comm-left-top'>
                            <div className="comm-option flex justify-center items-center">{t('Order.Data comenzii')}:
                              <div className="comm-txt">{day} {t(`Month.${month}`)} {time} {year}</div>
                            </div>
                            <div className='flex items-center justify-center'>
                              <label className='comm-option'>{t('Order.Produs')}:</label>
                              <select value={JSON.stringify(selectedProduct)} className='comm-option'
                                onChange={e => { handleProductSelect(index, JSON.parse(e.target.value)) }}
                              >
                                {order.product.map((product) => {
                                  return (
                                    <option key={product.id}
                                      value={JSON.stringify(product)}
                                      className='comm-option'
                                    >
                                      {product.name} {product.selectedSize}
                                    </option>
                                  )
                                })}
                              </select>
                              {order.status === 'Plasată' && (
                                <div className={darkTheme ? 'comm-cancel-dark' : 'comm-cancel'}
                                  onClick={() => handleCancel(order.uid, order.date)}
                                />
                              )}
                            </div>
                          </div>
                          <div className='cart-product'>
                            <Link to={`/product/${selectedProduct.id}`}>
                              <img className='cart-photo'
                                src={selectedProduct.photo} alt='Poza'
                              />
                            </Link>
                            <Link to={`/product/${selectedProduct.id}`} className='cart-det'>
                              <div className='cart-name'>{selectedProduct.name}</div>
                              <div className='cart-info'>{selectedProduct.spec}</div>
                            </Link>
                            <div className='comm-action'>
                              {selectedProduct.discount > 0 ? (
                                <>
                                  <div className="cart-price-flex">
                                    <div className="cart-price-old">{selectedProduct.price}
                                      <span className="cart-span">Lei</span>
                                    </div>
                                    <span className="cart-price"> - {(selectedProduct.discount * 100).toFixed(0)} %</span>
                                  </div>
                                  <div className="cart-price-new text-red-600">{(selectedProduct.price + 0.01 - ((selectedProduct.price + 0.01) * selectedProduct.discount) - 0.01).toFixed(2)}
                                    <span className="cart-span text-red-600">Lei</span>
                                  </div>
                                </>
                              ) : (
                                <div className='cart-price'>{selectedProduct.price} Lei</div>
                              )}
                              <div className='cart-price'>{t('Cart.Mărime')}: {selectedProduct.selectedSize}</div>
                              <div className='cart-price'>{t('Cart.Cantitate')}: {selectedProduct.number}</div>
                            </div>
                          </div>
                        </div>
                        <div className='comm-right'>
                          <div className="comm-title">{t('Profile.Utilizator')}:
                            <div className="comm-txt">{order.user}</div>
                          </div>
                          <div className="comm-title">{t('Profile.Județ')}:
                            <div className='comm-txt'>{order.details.county}</div>
                          </div>
                          <div className="comm-title">{t('Profile.Informații adresă')}:
                            <div className="comm-txt">{order.details.info}</div>
                          </div>
                          <div className="comm-title">{t('Profile.Telefon')}:
                            <div className="comm-txt">{order.details.tel}</div>
                          </div>
                          <div className="comm-title">{t('Profile.Total')}:
                            <div className="comm-txt">{order.price.total} Lei</div>
                          </div>
                          <div className="comm-title">{t('Profile.Metodă de plată')}:
                            <div className="comm-txt">{t(`Profile.${order.method}`)}</div>
                          </div>
                          <div className="comm-title">{t('Profile.Status')}:
                            <div className="comm-txt principal">{t(`Profile.${order.status}`)}</div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })}
              </>
            )}
            {load < order.length && (
              <div className="cloth-more">
                <div className="cloth-more-btn" onClick={() => startTransition(() => setLoad(p => p + 4))}>{t('Order.Încarcă mai multe comenzi')}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

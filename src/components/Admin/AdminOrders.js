import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import axios from 'axios'
import '../css/admin.css'
import '../../index.css'
import Swal from 'sweetalert2'

export default function AdminOrders() {
  const { server, product, setProduct } = useAuth()
  const { isPending, startTransition, t, lang } = useDefault()
  const [orders, setOrders] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Toate')
  const [load, setLoad] = useState(4)
  let count = 0;

  const handleProductSelect = (orderIndex, selectedProduct) => {
    setSelectedProducts(prevState => {
      const newState = [...prevState]
      newState[orderIndex] = selectedProduct
      return newState
    })
  }

  const handleStatus = async (status, id, uid, email) => {
    Swal.fire({
      title: t('Admin.Disc.Ești sigur?'),
      text: `${t('Admin.Orders.Sigur vrei să modifici statusul comenzi utilizatorului')} ${email} ${t('Admin.Orders.în')} ${t(`Profile.${status}`)} ?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Admin.Orders.Modifică'),
      cancelButtonText: t('Admin.Disc.Înapoi')
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedOrders = orders.map(order => {
          if (order.id === id && order.uid === uid) {
            if (status === 'Anulată') {
              axios.post(`${server}/admin/order/cancel`, {
                cart: order.product,
                id: id,
                uid: uid
              })
              const updatedProduct = [...product];
              order.product.forEach((orderItem) => {
                const productIndex = updatedProduct.findIndex((productItem) => productItem.id === orderItem.id);
                if (productIndex !== -1) {
                  const selectedSize = orderItem.selectedSize;
                  const number = orderItem.number;
                  updatedProduct[productIndex] = {
                    ...updatedProduct[productIndex],
                    size: {
                      ...updatedProduct[productIndex].size,
                      [selectedSize]: Number(updatedProduct[productIndex].size[selectedSize]) + Number(number),
                    },
                  };
                }
              });
              setProduct(updatedProduct);
              return { ...order, status: status }
            } else {
              return { ...order, status: status }
            }
          } else {
            return order
          }
        })
        await axios.post(`${server}/admin/orders`, { uid, id, status })
          .then(data => console.log(data))
          .catch(err => console.error(err))
        setOrders(updatedOrders)
        await axios.post(`${server}/admin/status`, {
          uid: uid,
          id: id,
          status: status
        })
          .then(data => console.log(data))
          .catch(err => console.error(err))
      }
    })
  }

  useEffect(() => {
    axios.get(`${server}/admin/orders`)
      .then(data => {
        setLoading(false)
        if (data.data.orders) {
          setOrders(data.data.orders)
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    document.title = `Blisst — Admin — ${t('Order.Comenzi')}`
  }, [lang])

  return (
    <>
      <div className='admin-commands'>
        {loading || isPending ? (
          <>
            <div className="loading-bg">
              <div className="loading-spin">Loading...</div>
            </div>
            <div className='h-screen' />
          </>
        ) : (
          <div className='admin-commands-div'>
            <div className='admin-comm-filter'>
              <div className='comm-title'>
                <select value={filter} className='comm-option'
                  onChange={e => { setFilter(e.target.value) }}
                >
                  <option value='Toate' className='comm-option' >
                    {t('Order.Toate')}
                  </option>
                  <option value='Se livrează' className='comm-option' >
                    {t('Profile.Se livrează')}
                  </option>
                  <option value='Plasată' className='comm-option' >
                    {t('Profile.Plasată')}
                  </option>
                  <option value='Livrată' className='comm-option'>
                    {t('Profile.Livrată')}
                  </option>
                  <option value='Anulată' className='comm-option'>
                    {t('Profile.Anulată')}
                  </option>
                </select>
              </div>
            </div>
            {[...orders].reverse().map((order, index) => {
              if (order.status === filter || filter === 'Toate') {
                count += 1
                const selectedProduct = selectedProducts[index] || order.product[0]
                const [day, month, time, year] = order.date.split(' ');
                if (load >= count) {
                  return (
                    <div className='comm-element'>
                      <div className='comm-left'>
                        <div className='comm-left-top'>
                          <div className="comm-option flex justify-center items-center">{t('Order.Data comenzii')}:
                            <div className="comm-txt">{day} {t(`Month.${month}`)} {time} {year}</div>
                          </div>
                          <div>
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
                                    {t(`${product.name}`)} {product.selectedSize}
                                  </option>
                                )
                              })}
                            </select>
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
                        <div className="comm-title">{t('Profile.Județ')}:
                          <div className='comm-txt'>{order.details.county}</div>
                        </div>
                        <div className="comm-title">{t('Profile.Informații adresă')}:
                          <div className="comm-txt">{order.details.info}</div>
                        </div>
                        <div className="comm-title">{t('Profile.Telefon')}:
                          <div className="comm-txt">{order.details.tel}</div>
                        </div>
                        <div className="comm-title">{t('Profile.Email')}:
                          <div className="comm-txt">{order.details.email}</div>
                        </div>
                        <div className="comm-title">{t('Profile.Total')}:
                          <div className="comm-txt">{order.price.total} Lei</div>
                        </div>
                        <div className="comm-title">{t('Profile.Metodă de plată')}:
                          <div className="comm-txt">{t(`Profile.${order.method}`)}</div>
                        </div>
                        <div className='comm-title'>Status:
                          {order.status === 'Anulată' ? (
                            <label className='comm-option'>{t('Profile.Anulată')}</label>
                          ) : (
                            <select value={order.status} className='comm-option'
                              onChange={e => { handleStatus(e.target.value, order.id, order.uid, order.details.email) }}
                            >
                              <option value={'Plasată'} className='comm-option' >
                                {t('Profile.Plasată')}
                              </option>
                              <option value={'Se livrează'} className='comm-option' >
                                {t('Profile.Se livrează')}
                              </option>
                              <option value={'Livrată'} className='comm-option'>
                                {t('Profile.Livrată')}
                              </option>
                              <option value={'Anulată'} className='comm-option'>
                                {t('Profile.Anulată')}
                              </option>
                            </select>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                }
              }
            })}
            {count === 0 && (
              <div className="h-80 w-full flex items-center justify-center">
                <div className='cloth-no'>
                  {t('Admin.Orders.Nici un produs nu îndeplinește filtrele')}
                </div>
              </div>
            )}
            {load < count && (
              <div className="cloth-more">
                <div className="cloth-more-btn" onClick={() => startTransition(() => setLoad(p => p + 4))}>{t('Admin.Orders.Încarcă mai multe comenzi')}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

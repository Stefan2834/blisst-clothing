import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import '../css/admin.css'
import '../../index.css'
import { useDefault } from '../../contexts/DefaultContext'

export default function AdminOrders() {
  const { server, product, setProduct } = useAuth()
  const { isPending, startTransition } = useDefault()
  const [orders, setOrders] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Toate')
  const [load, setLoad] = useState(4)

  const handleProductSelect = (orderIndex, selectedProduct) => {
    setSelectedProducts(prevState => {
      const newState = [...prevState]
      newState[orderIndex] = selectedProduct
      return newState
    })
  }

  const handleStatus = async (status, id, uid) => {
    const updatedOrders = orders.map(order => {
      if (order.id === id && order.uid === uid) {
        if (status === 'Anulata') {
          console.log(order.product)
          order.product.map(comm => {
            setProduct(product.map((product) => {
              if (product.id === comm.id) {
                return { ...product, size: { ...product.size, [comm.selectedSize]: product.size[comm.selectedSize] + comm.number } }
              } else {
                return product
              }
            }))
          })
          return null
        } else {
          return { ...order, status: status }
        }
      } else {
        return order
      }
    }).filter(c => c !== null)
    await axios.post(`${server}/admin/status`, {
      uid: uid,
      id: id,
      status: status
    })
      .then(data => console.log(data))
      .catch(err => console.error(err))
    setOrders(updatedOrders)
    await axios.post(`${server}/admin/orders`, { orders: updatedOrders })
      .then(data => console.log(data))
      .catch(err => console.error(err))
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
                  <option value={'Toate'} className='comm-option' >
                    Toate
                  </option>
                  <option value={'Se livrează'} className='comm-option' >
                    Se livrează
                  </option>
                  <option value={'Plasată'} className='comm-option' >
                    Plasată
                  </option>
                  <option value={'Livrată'} className='comm-option'>
                    Livrată
                  </option>
                </select>
              </div>
            </div>
            {[...orders].reverse().map((order, index) => {
              if (order.status === filter || filter === 'Toate') {
                const selectedProduct = selectedProducts[index] || order.product[0]
                if (load > index) {
                  return (
                    <div className='comm-element'>
                      <div className='comm-left'>
                        <div className='comm-left-top'>
                          <div className="comm-option flex justify-center items-center">Data comenzii:
                            <div className="comm-txt">{order.date}</div>
                          </div>
                          <div>
                            <label className='comm-option'>Produs:</label>
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
                            <div className='cart-price'>Marime: {selectedProduct.selectedSize}</div>
                            <div className='cart-price'>Numar: {selectedProduct.number}</div>
                          </div>
                        </div>
                      </div>
                      <div className='comm-right'>
                        <div className='comm-title'>Judetul:
                          <div className='comm-txt'>{order.details.county}</div>
                        </div>
                        <div className="comm-title">Informatii adresa:
                          <div className="comm-txt">{order.details.info}</div>
                        </div>
                        <div className="comm-title">Telefon:
                          <div className="comm-txt">{order.details.tel}</div>
                        </div>
                        <div className="comm-title">Email:
                          <div className="comm-txt">{order.details.email}</div>
                        </div>
                        <div className="comm-title">Total:
                          <div className="comm-txt">{order.price.total} Lei</div>
                        </div>
                        <div className="comm-title">Metoda de plata:
                          <div className="comm-txt">{order.method}</div>
                        </div>
                        <div className='comm-title'>Status:
                          <select value={order.status} className='comm-option'
                            onChange={e => { handleStatus(e.target.value, order.id, order.uid) }}
                          >
                            <option value={'Plasată'} className='comm-option' >
                              Plasată
                            </option>
                            <option value={'Se livrează'} className='comm-option' >
                              Se livrează
                            </option>
                            <option value={'Livrată'} className='comm-option'>
                              Livrată
                            </option>
                            <option value={'Anulată'} className='comm-option'>
                              Anulată
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )
                }
              }
            })}
            {load < orders.length && (
              <div className="cloth-more">
                <div className="cloth-more-btn" onClick={() => startTransition(() => setLoad(p => p + 4))}>Incarca mai multe comenzi</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import '../css/admin.css'
import '../../index.css'
import { useDefault } from '../../contexts/DefaultContext'

export default function AdminCommands() {
  const { server, product, setProduct } = useAuth()
  const { isPending, startTransition } = useDefault()
  const [commands, setCommands] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Toate')
  const [load, setLoad] = useState(4)

  const handleProductSelect = (commandIndex, selectedProduct) => {
    setSelectedProducts(prevState => {
      const newState = [...prevState]
      newState[commandIndex] = selectedProduct
      return newState
    })
  }

  const handleStatus = async (status, id, uid) => {
    const updatedCommands = commands.map(command => {
      if (command.id === id && command.uid === uid) {
        if (status === 'Anulata') {
          console.log(command.product)
          command.product.map(comm => {
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
          return { ...command, status: status }
        }
      } else {
        return command
      }
    }).filter(c => c !== null)
    await axios.post(`${server}/admin/status`, {
      uid: uid,
      id: id,
      status: status
    })
      .then(data => console.log(data))
      .catch(err => console.error(err))
    setCommands(updatedCommands)
    await axios.post(`${server}/admin/commands`, { commands: updatedCommands })
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    axios.get(`${server}/admin/commands`)
      .then(data => {
        setLoading(false)
        if (data.data.commands) {
          setCommands(data.data.commands)
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
        {loading || isPending && (
          <div className="loading-bg">
            <div className="loading-spin">Loading...</div>
          </div>
        )}
        <div className='admin-commands-div'>
          <div className='admin-comm-filter'>
            <div className='comm-title'>
              <select value={filter} className='comm-option'
                onChange={e => { setFilter(e.target.value) }}
              >
                <option value={'Toate'} className='comm-option' >
                  Toate
                </option>
                <option value={'Se livreaza'} className='comm-option' >
                  Se livreaza
                </option>
                <option value={'Plasata'} className='comm-option' >
                  Plasata
                </option>
                <option value={'Livrata'} className='comm-option'>
                  Livrata
                </option>
                <option value={'Anulata'} className='comm-option'>
                  Anulata
                </option>
              </select>
            </div>
          </div>
          {[...commands].reverse().map((command, index) => {
            if (command.status === filter || filter === 'Toate') {
              const selectedProduct = selectedProducts[index] || command.product[0]
              if (load > index) {
                return (
                  <div className='comm-element'>
                    <div className='comm-left'>
                      <div className='comm-left-top'>
                        <div className="comm-option flex justify-center items-center">Data comenzi:
                          <div className="comm-txt">{command.date}</div>
                        </div>
                        <div>
                          <label className='comm-option'>Produs:</label>
                          <select value={JSON.stringify(selectedProduct)} className='comm-option'
                            onChange={e => { handleProductSelect(index, JSON.parse(e.target.value)) }}
                          >
                            {command.product.map((product) => {
                              return (
                                <option key={product.id}
                                  value={JSON.stringify(product)}
                                  className='comm-option'
                                >
                                  {product.nume} {product.selectedSize}
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
                          <div className='cart-name'>{selectedProduct.nume}</div>
                          <div className='cart-info'>{selectedProduct.spec}</div>
                        </Link>
                        <div className='comm-action'>
                          {selectedProduct.discount > 0 ? (
                            <>
                              <div className="cart-price-flex">
                                <div className="cart-price-old">{selectedProduct.price}
                                  <span className="cart-span">Lei</span>
                                </div>
                                <span className="cart-price"> - {selectedProduct.discount * 100} %</span>
                              </div>
                              <div className="cart-price-new text-red-600">{selectedProduct.price + 0.01 - ((selectedProduct.price + 0.01) * selectedProduct.discount) - 0.01}
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
                        <div className='comm-txt'>{command.details.county}</div>
                      </div>
                      <div className="comm-title">Informatii adresa:
                        <div className="comm-txt">{command.details.info}</div>
                      </div>
                      <div className="comm-title">Telefon:
                        <div className="comm-txt">{command.details.tel}</div>
                      </div>
                      <div className="comm-title">Email:
                        <div className="comm-txt">{command.details.email}</div>
                      </div>
                      <div className="comm-title">Total:
                        <div className="comm-txt">{command.price.total} Lei</div>
                      </div>
                      <div className="comm-title">Metoda de livrare:
                        <div className="comm-txt">{command.method}</div>
                      </div>
                      <div className='comm-title'>Status:
                        <select value={command.status} className='comm-option'
                          onChange={e => { handleStatus(e.target.value, command.id, command.uid) }}
                        >
                          <option value={'Plasata'} className='comm-option' >
                            Plasata
                          </option>
                          <option value={'Se livreaza'} className='comm-option' >
                            Se livreaza
                          </option>
                          <option value={'Livrata'} className='comm-option'>
                            Livrata
                          </option>
                          <option value={'Anulata'} className='comm-option'>
                            Anulata
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                )
              }
            }
          })}
          {load < commands.length && (
            <div className="cloth-more">
              <div className="cloth-more-btn" onClick={() => startTransition(() => setLoad(p => p + 4))}>Incarca mai multe comenzi</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import '../css/admin.css'

export default function AdminCommands() {
  const { server } = useAuth()
  const [commands, setCommands] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('Toate')

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
        return { ...command, status: status }
      } else {
        return command
      }
    })
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
        if (data.data.commands) {
          setCommands(data.data.commands)
          setLoading(false)
        }
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading ? (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      ) : (
        <div className='admin-commands'>
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
                  <option value={'Livrat'} className='comm-option'>
                    Livrat
                  </option>
                  <option value={'Anulat'} className='comm-option'>
                    Anulat
                  </option>
                </select>
              </div>
            </div>
            {commands.map((command, index) => {
              if (command.status === filter || filter === 'Toate') {
                const selectedProduct = selectedProducts[index] || command.product[0]
                return (
                  <div className='comm-element'>
                    <div className='comm-left'>
                      <div className='comm-left-top'>
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
                      <div className='comm-product'>
                        <Link to={`/product/${selectedProduct.id}`}>
                          <div className='comm-photo-product'
                            style={{ backgroundImage: `url(${selectedProduct.photo})` }}
                          />
                        </Link>
                        <Link to={`/product/${selectedProduct.id}`} className='comm-det'>
                          <div className='comm-text'>{selectedProduct.nume}</div>
                          <div className='comm-info'>{selectedProduct.spec}</div>
                        </Link>
                        <div className='comm-action'>
                          {selectedProduct.discount > 0 ? (
                            <>
                              <div className="comm-price-flex">
                                <div className="comm-price-old">{selectedProduct.price}
                                  <span className="comm-span">Lei</span>
                                </div>
                                <span className="comm-price"> - {selectedProduct.discount * 100} %</span>
                              </div>
                              <div className="comm-price-new text-red-600">{selectedProduct.price + 0.01 - ((selectedProduct.price + 0.01) * selectedProduct.discount) - 0.01}
                                <span className="comm-span text-red-600">Lei</span>
                              </div>
                            </>
                          ) : (
                            <div className='comm-price'>{selectedProduct.price} Lei</div>
                          )}
                          <div className='comm-price'>Marime: {selectedProduct.selectedSize}</div>
                          <div className='comm-price'>Numar: {selectedProduct.number}</div>
                          <div className='comm-price'>Id: {selectedProduct.id}</div>
                        </div>
                      </div>
                    </div>
                    <div className='comm-right'>
                      <div className='comm-right-adress'>
                        <div className='comm-title'>Judetul: <br />
                          <div className='comm-txt'>{command.details.county}</div>
                        </div>
                        <div className="comm-title">Informatii adresa:<br />
                          <div className="comm-txt">{command.details.info}</div>
                        </div>
                        <div className="comm-title">Telefon:<br />
                          <div className="comm-txt">{command.details.tel}</div>
                        </div>
                        <div className="comm-title">Email:<br />
                          <div className="comm-txt">{command.details.email}</div>
                        </div>
                      </div>
                      <div className='comm-right-det'>
                        <div className="comm-title flex items-center">Total:
                          <div className="comm-txt">{command.price.total}</div>
                        </div>
                        <div className="comm-title flex items-center">Reducere:
                          <div className="comm-txt">
                            {command.price.discount === 0 ? 'Nu' : `${command.price.discount * 100}%`}
                          </div>
                        </div>
                        <div className="comm-title flex items-center">Metoda de livrare:
                          <div className="comm-txt">{command.method}</div>
                        </div>
                        <div className="comm-title flex items-center">Data comenzi:
                          <div className="comm-txt">{command.date}</div>
                        </div>
                        <div className='comm-title flex items-center'>Status
                          <select value={command.status} className='comm-option'
                            onChange={e => { handleStatus(e.target.value, command.id, command.uid) }}
                          >
                            <option value={'Se livreaza'} className='comm-option' >
                              Se livreaza
                            </option>
                            <option value={'Livrat'} className='comm-option'>
                              Livrat
                            </option>
                            <option value={'Anulat'} className='comm-option'>
                              Anulat
                            </option>
                          </select>
                        </div>
                        <div className="comm-title flex items-center">Uid:
                          <div className="comm-txt">{command.uid}</div>
                        </div>
                        <div className="comm-title flex items-center">Id comanda:
                          <div className="comm-txt">{command.id}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      )}
    </>
  )
}

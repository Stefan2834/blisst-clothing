import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import { Link } from 'react-router-dom'
import '../css/command.css'
import axios from 'axios'

export default function Command() {
  const { command, server, currentUser } = useAuth()
  const { darkTheme, startTransition, isPending } = useDefault()
  const [det, setDet] = useState({ info: '', tel: '', email: '', name: '' })
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    document.title = 'Blisst — Comenziile mele'
    axios.post(`${server}/user/info`, { uid: currentUser.uid })
      .then(info => { setDet(info.data.det) })
      .catch(err => console.error(err.error))
  }, [])

  const handleProductSelect = (commandIndex, selectedProduct) => {
    setSelectedProducts(prevState => {
      const newState = [...prevState]
      newState[commandIndex] = selectedProduct
      return newState
    })
  }

  return (
    <>
      <div className='command-bg'>
        <div className='command'>
          <div className='comm-top'>
            <div className={darkTheme ? 'comm-photo-dark' : 'comm-photo'}></div>
            <div className="comm-name">Salut,
              <span className='text-orange-600'> {det.name}</span>!
              <br />Uite istoricul comenziilor tale
            </div>
          </div>
          {command.map((command, index) => {
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
                    <div className="comm-title flex items-center">Statusul comenzi:
                      <div className="comm-txt">{command.status}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

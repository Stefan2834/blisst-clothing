import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import { Link } from 'react-router-dom'
import '../css/command.css'

export default function Command() {
  const { command, det } = useAuth()
  const { darkTheme, startTransition, isPending } = useDefault()
  const [selectedProducts, setSelectedProducts] = useState([])
  const [load, setLoad] = useState(4)

  useEffect(() => {
    document.title = 'Blisst — Comenziile mele'
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
      {isPending && (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      )}
      <div className='command-bg'>
        <div className='command'>
          <div className='comm-top'>
            <div className={darkTheme ? 'comm-photo-dark' : 'comm-photo'}></div>
            <div className="comm-name">Salut,
              <span className='principal'> {det.name}</span>!
              <br />Uite istoricul comenziilor tale
            </div>
          </div>
          {[...command].reverse().map((command, index) => {
            const selectedProduct = selectedProducts[index] || command.product[0]
            console.log(index, load)
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
                        <div className='cart-photo'
                          style={{ backgroundImage: `url(${selectedProduct.photo})` }}
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
                      <div className="comm-txt">{command.price.total}</div>
                    </div>
                    <div className="comm-title">Metoda de livrare:
                      <div className="comm-txt">{command.method}</div>
                    </div>
                    <div className="comm-title">Statusul comenzi:
                      <div className="comm-txt principal">{command.status}</div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
          {load < command.length && (
            <div className="cloth-more">
              <div className="cloth-more-btn" onClick={() => startTransition(() => setLoad(p => p + 4))}>Incarca mai multe comenzi</div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

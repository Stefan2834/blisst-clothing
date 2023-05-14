import React, { useEffect, useState, useRef } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Product from '../SmallComponents/Product'
import { useDefault } from '../../contexts/DefaultContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function AdminProducts() {
  const { product, server, setProduct } = useAuth()
  const { t, lang, darkTheme } = useDefault()
  const [load, setLoad] = useState(10)
  const [loading, setLoading] = useState(false)
  const [updateProduct, setUpdateProduct] = useState({ index: -1 })

  useEffect(() => {
    document.title = `Blisst — Admin — ${t('Produse')}`
  }, [lang])



  const handleChange = async (e, update) => {
    setLoading(true)
    e.preventDefault()
    const price = Number(updateProduct.price) - 0.01
    const discount = (updateProduct.discount / 100).toFixed(2)
    axios.post(`${server}/admin/productUpdate`, {
      product: { ...update, index: undefined, price: price, discount: discount }
    })
      .then(data => {
        console.log(data);
        if (data.data.success) {
          const newProduct = product.map(p => {
            if (p.id === update.id) {
              return { ...update, price: price, discount: discount }
            } else {
              return p
            }
          })
          setProduct(newProduct)
        }
      })
      .catch(err => console.error(err))
    setLoading(false)
  }

  const handleDelete = async (id) => {
    setLoading(true)
    axios.post(`${server}/admin/productDelete`, { id: id })
      .then(data => {
        console.log(data);
        if (data.data.success) {
          const newProduct = product.map(p => {
            if (p.id === id) {
              return null
            } else {
              return p
            }
          }).filter(p => p != null)
          setProduct(newProduct)
        }
      })
      .catch(err => console.error(err))
    setLoading(false)
  }


  return (
    <>
      {loading ? (
        <>
          <div className="loading-bg">
            <div className="loading-spin">Loading...</div>
          </div>
          <div className="h-screen" />
        </>
      ) : (

        <div className='flex flex-wrap items-center justify-around mt-14 mx-4'>
          <Link to='/main/admin/products/add' className={darkTheme ? 'adm-prod-new-dark' : 'adm-prod-new'}></Link>
          {product.map((product, ind) => {
            if (ind + 1 < load) {
              return (
                <div className='adm-prod-edit'>
                  <Product product={product} />
                  <div className='adm-prod-edit-bg'>
                    {updateProduct.index === ind ? (
                      <form onSubmit={e => { handleChange(e, updateProduct); setUpdateProduct({ index: -1 }) }} className='flex flex-col items-center justify-start h-full'>
                        <div className='adm-prod-edit-title'>
                          {t('Editează')}
                        </div>
                        <div className='adm-prod-edit-text'>{t('Nume')}:
                          <input type='text' value={updateProduct.name} required
                            className='adm-prod-edit-input'
                            onChange={e => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                          />
                        </div>
                        <div className='adm-prod-edit-text'>{t('Detalii')}:
                          <input type='text' value={updateProduct.spec} required
                            className='adm-prod-edit-input'
                            onChange={e => setUpdateProduct({ ...updateProduct, spec: e.target.value })}
                          />
                        </div>
                        <div className='adm-prod-edit-text'>Pret:
                          <input type='number' className='adm-prod-edit-input'
                            required min={1} max={500}
                            value={updateProduct.price}
                            onChange={e => {
                              setUpdateProduct({ ...updateProduct, price: e.target.value })
                            }}
                          />
                        </div>
                        <div className='adm-prod-edit-text'>Discount:
                          <input type='number' className='adm-prod-edit-input'
                            required min={0} max={100}
                            value={updateProduct.discount}
                            onChange={e => {
                              setUpdateProduct({ ...updateProduct, discount: e.target.value })
                            }}
                          />
                        </div>
                        <div className='adm-prod-edit-text'>Stoc:</div>
                        <div className='adm-prod-size'>
                          {Object.keys(updateProduct.size).map(size => {
                            return (
                              <div className='w-1/3 text-center'>
                                {size}:
                                <select value={updateProduct.size[size]} className='adm-prod-option' required
                                  onChange={e => setUpdateProduct({ ...updateProduct, size: { ...updateProduct.size, [size]: e.target.value } })}
                                >
                                  {[...Array(101).keys()].map((type) => {
                                    return (
                                      <option key={type}
                                        value={type}
                                        className='adm-prod-option'
                                      >
                                        {type}
                                      </option>
                                    )
                                  })}
                                </select>
                              </div>
                            )
                          })}
                        </div>
                        <div className='adm-edit'>
                          <input type='submit' value=' ' className={darkTheme ? 'adm-save-btn-dark' : 'adm-save-btn'} />
                          <div className={darkTheme ? 'adm-back-btn-dark' : 'adm-back-btn'} onClick={() => setUpdateProduct({ index: -1 })}></div>
                        </div>
                      </form>
                    ) : (
                      <div className='adm-edit'>
                        <div className={darkTheme ? 'adm-edit-btn-dark' : 'adm-edit-btn'} onClick={() => {
                          setUpdateProduct({ index: ind, ...product, price: Number(product.price + 0.01), discount: Number(product.discount * 100) })
                        }}></div>
                        <div className={darkTheme ? 'adm-delete-btn-dark' : 'adm-delete-btn'}
                          onClick={() => handleDelete(product.id)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            }
          })}
          {load < product.length && (
            <div className='w-full flex items-center justify-center'>
              <div className='adm-prod-more' onClick={() => setLoad(c => c + 10)}>
                {t('Încarcă mai multe')}
              </div>
            </div>
          )}
        </div>
      )}

    </>
  )
}

import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../contexts/AuthContext'
import { useDefault } from '../../../contexts/DefaultContext'

export default function Sidebar() {
  const { setProductLoad, darkTheme, setSearch, startTransition } = useDefault()
  const { filter, setFilter } = useAuth()
  const { id } = useParams()
  const [sizeType, setSizeType] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const validPath = ['man', 'woman', 'man top tricouri', 'man top bluze', 'man bottom scurti', 'man bottom lungi',
      'man foot adidasi', 'man foot papuci', 'man top', 'man bottom', 'man foot',
      'woman top tricouri', 'woman top bluze', 'woman bottom scurti', 'woman bottom lungi',
      'woman foot adidasi', 'woman foot papuci', 'woman top', 'woman bottom', 'woman foot'
    ]
    if (!validPath.includes(id)) {
      navigate('/')
    }
    if (id.includes('woman')) {
      document.documentElement.style.setProperty("--principal", '#e684ae')
    } else {
      document.documentElement.style.setProperty("--principal", '#79cbca')
    }
    setProductLoad(8)
    setFilter({ ...filter, type: id, size: '' })
    if (id.includes('foot')) {
      setSizeType(['37', '38', '39', '40', '41', '42', '43', '44'])
    } else {
      setSizeType(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
    }
  }, [id])



  return (
    <div className='side-filter-bar'>
      <span className='side-font'>Filtre</span>
      <form className="side-form" onChange={() => setProductLoad(8)} >
        <label>
          Pret minim (Lei):
          <input type='number'
            className='side-price-input'
            onChange={e => startTransition(() => setFilter({ ...filter, minPrice: e.target.value }))}
          />
        </label>
        <label>
          Pret maxim (Lei):
          <input type='number'
            className='side-price-input'
            onChange={e => startTransition(() => setFilter({ ...filter, maxPrice: e.target.value }))}
          />
        </label>
        <div className="mt-4 mb-3 w-full flex items-center justify-around">
          <div className='side-font'>Marimi</div>
          <div className='side-font'>Sorteaza</div>
        </div>
        <div className='side-flex'>
          <div className="side-size">
            {sizeType.map((size) => {
              return (
                <label className="my-1 w-5/12">
                  <input type='checkbox' className="side-size-check"
                    checked={filter.size === size}
                    onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, size: '' }) : setFilter({ ...filter, size: size }))}
                  />
                  <div className="side-size-label">{size}</div>
                </label>
              )
            })}
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.size === ''}
                onChange={e =>startTransition(() =>  e.target.checked && setFilter({ ...filter, size: '' }))}
              />
              <div className="side-size-label">Toate</div>
            </label>
          </div>


          <div className="side-sort">
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'price+'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'price+' }))}
              />
              <div className="side-size-label">Pret <div className={darkTheme ? 'side-size-img-up-dark' : "side-size-img-up"} /></div>
            </label>
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'price-'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'price-' }))}
              />
              <div className="side-size-label">Pret <div className={darkTheme ? 'side-size-img-down-dark' : "side-size-img-down"} /></div>
            </label>
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'review+'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'review+' }))}
              />
              <div className="side-size-label">Review <div className={darkTheme ? 'side-size-img-up-dark' : "side-size-img-up"} /></div>
            </label>
            <label className="my-1 w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'review-'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'review-' }))}
              />
              <div className="side-size-label">Review <div className={darkTheme ? 'side-size-img-down-dark' : "side-size-img-down"} /></div>
            </label>
          </div>
        </div>
      <div className='side-search'>
        <form>
          <label className='side-id-label'>
            <input
              type={'text'} maxLength={8}
              className='side-id-input'
              onChange={(e) => {
                startTransition(() => {
                  setSearch(e.target.value)
                });
              }}
              placeholder='Cauta dupa id'
            />
            <div className={darkTheme ? 'side-id-img-dark' : 'side-id-img'} />
          </label>
        </form>
      </div>
      </form>
    </div>
  )
}

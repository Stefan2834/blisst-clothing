import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'

export default function Sidebar() {
  const { setProductLoad, darkTheme, setSearch, startTransition } = useDefault()
  const { filter, setFilter } = useAuth()
  const { id } = useParams()
  const [sizeType, setSizeType] = useState([])
  const [expand, setExpand] = useState()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `Blisst — ${id.includes('femei') ? 'Femei' : 'Barbati'}`
    const validPath = ['barbati', 'femei', 'barbati top tricouri', 'barbati top bluze', 'barbati bottom scurti', 'barbati bottom lungi',
      'barbati foot adidasi', 'barbati foot papuci', 'barbati top', 'barbati bottom', 'barbati foot',
      'femei top tricouri', 'femei top bluze', 'femei bottom scurti', 'femei bottom lungi',
      'femei foot adidasi', 'femei foot papuci', 'femei top', 'femei bottom', 'femei foot'
    ]
    if (!validPath.includes(id)) {
      navigate('/')
    }
    if (id.includes('femei')) {
      document.documentElement.style.setProperty("--principal2", '#e684ae')
    } else {
      document.documentElement.style.setProperty("--principal2", '#79cbca')
    }
    setProductLoad(10)
    setFilter({ ...filter, type: id, size: '' })
    if (id.includes('foot')) {
      setSizeType(['37', '38', '39', '40', '41', '42', '43', '44'])
    } else {
      setSizeType(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
    }

  }, [id])

  const handleExpand = (type) => {
    if (expand === type) {
      setExpand()
    } else {
      setExpand(type)
    }
  }



  return (
    <>
      <div className={open ? 'side-filter-bg' : 'hidden'} onClick={() => setOpen(false)} />
      <div className={open ? 'side-filter-bar' : 'side-filter-closed'}>
        <div className={darkTheme ? 'side-switch-dark' : 'side-switch'} onClick={() => setOpen(o => !o)} />
        <div className='side-font'>Filtre</div>
        <form className="side-form" onChange={() => setProductLoad(8)}>
          <div className='side-expand' onClick={() => handleExpand('Pret')}>
            <span className='side-selection'>Pret</span>
            {darkTheme ? (
              <div className={expand === 'Pret' ? 'side-minus-dark' : 'side-plus-dark'} />
            ) : (
              <div className={expand === 'Pret' ? 'side-minus' : 'side-plus'} />
            )}
          </div>
          <div className={expand === 'Pret' ? 'side-overflow-expand' : 'side-overflow'}>
            <label className='side-selection'>
              Minim (Lei):
              <input type='number'
                className='side-price-input'
                onChange={e => startTransition(() => setFilter({ ...filter, minPrice: e.target.value }))}
              />
            </label>
            <label className='side-selection'>
              Maxim (Lei):
              <input type='number'
                className='side-price-input'
                onChange={e => startTransition(() => setFilter({ ...filter, maxPrice: e.target.value }))}
              />
            </label>
          </div>
          <div className='side-expand' onClick={() => handleExpand('Marimi')}>
            <span className='side-selection'>Marimi</span>
            {darkTheme ? (
              <div className={expand === 'Marimi' ? 'side-minus-dark' : 'side-plus-dark'} />
            ) : (
              <div className={expand === 'Marimi' ? 'side-minus' : 'side-plus'} />
            )}
          </div>
          <div className={expand === 'Marimi' ? 'side-overflow-expand' : "side-overflow"}>
            {sizeType.map((size) => {
              return (
                <label className="w-3/12 m-1">
                  <input type='checkbox' className="side-size-check"
                    checked={filter.size === size}
                    onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, size: '' }) : setFilter({ ...filter, size: size }))}
                  />
                  <div className="side-size-label side-selection">{size}</div>
                </label>
              )
            })}
            <label className="w-full">
              <input type='checkbox' className="side-size-check"
                checked={filter.size === ''}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, size: '' }))}
              />
              <div className="side-size-label w-100 side-selection">Toate</div>
            </label>
          </div>
          <div className='side-expand' onClick={() => handleExpand('Sorteaza')}>
            <span className='side-selection'>Sorteaza</span>
            {darkTheme ? (
              <div className={expand === 'Sorteaza' ? 'side-minus-dark' : 'side-plus-dark'} />
            ) : (
              <div className={expand === 'Sorteaza' ? 'side-minus' : 'side-plus'} />
            )}
          </div>
          <div className={expand === 'Sorteaza' ? 'side-overflow-expand' : "side-overflow"}>
            <label className="w-24 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === ''}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: '' }))}
              />
              <div className="side-size-label side-selection">Implicit</div>
            </label>
            <label className="w-24 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'nrReview'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'nrReview' }))}
              />
              <div className="side-size-label side-selection">Nr.review-uri</div>
            </label>
            <label className="w-5/12 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'price+'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'price+' }))}
              />
              <div className="side-size-label side-selection">Pret <div className={darkTheme ? 'side-size-img-up-dark' : "side-size-img-up"} /></div>
            </label>
            <label className="w-5/12 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'price-'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'price-' }))}
              />
              <div className="side-size-label side-selection">Pret <div className={darkTheme ? 'side-size-img-down-dark' : "side-size-img-down"} /></div>
            </label>
            <label className="w-5/12 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'review+'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'review+' }))}
              />
              <div className="side-size-label side-selection">Rating <div className={darkTheme ? 'side-size-img-up-dark' : "side-size-img-up"} /></div>
            </label>
            <label className="w-5/12 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'review-'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'review-' }))}
              />
              <div className="side-size-label side-selection">Rating <div className={darkTheme ? 'side-size-img-down-dark' : "side-size-img-down"} /></div>
            </label>
          </div>
          <div className='side-expand' onClick={() => handleExpand('Culori')}>
            <span className='side-selection'>Culori</span>
            {darkTheme ? (
              <div className={expand === 'Culori' ? 'side-minus-dark' : 'side-plus-dark'} />
            ) : (
              <div className={expand === 'Culori' ? 'side-minus' : 'side-plus'} />
            )}
          </div>
          <div className={expand === 'Culori' ? 'side-overflow-expand' : "side-overflow"}>
            <label className="m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.color === 'red'}
                onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, color: '' }) : setFilter({ ...filter, color: 'red' }))}
              />
              <div className="side-colors side-selection side-color1"></div>
            </label>
            <label className="m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.color === 'blue'}
                onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, color: '' }) : setFilter({ ...filter, color: 'blue' }))}
              />
              <div className="side-colors side-selection side-color2"></div>
            </label>
            <label className="m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.color === 'pink'}
                onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, color: '' }) : setFilter({ ...filter, color: 'pink' }))}
              />
              <div className="side-colors side-selection side-color3"></div>
            </label>
            <label className="m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.color === 'orange'}
                onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, color: '' }) : setFilter({ ...filter, color: 'orange' }))}
              />
              <div className="side-colors side-selection side-color4"></div>
            </label>
            <label className="m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.color === 'green'}
                onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, color: '' }) : setFilter({ ...filter, color: 'green' }))}
              />
              <div className="side-colors side-selection side-color5"></div>
            </label>
            <label className="m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.color === 'black'}
                onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, color: '' }) : setFilter({ ...filter, color: 'black' }))}
              />
              <div className="side-colors side-selection side-color6"></div>
            </label>
          </div>
          <div className='side-expand' onClick={() => handleExpand('Cauta')}>
            <span className='side-selection side-selection'>Cauta</span>
            {darkTheme ? (
              <div className={expand === 'Cauta' ? 'side-minus-dark' : 'side-plus-dark'} />
            ) : (
              <div className={expand === 'Cauta' ? 'side-minus' : 'side-plus'} />
            )}
          </div>
          <div className={expand === 'Cauta' ? 'side-overflow-expand' : 'side-overflow'}>
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
    </>
  )
}

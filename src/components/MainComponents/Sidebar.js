import React, { useState, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDefault } from '../../contexts/DefaultContext'
import { colors } from '../SmallComponents/Test'

export default function Sidebar() {
  const { setProductLoad, darkTheme, startTransition, filter, setFilter, filterOpen, setFilterOpen } = useDefault()
  const { id } = useParams()
  const [sizeType, setSizeType] = useState([])
  const [expand, setExpand] = useState()
  const navigate = useNavigate()


  useLayoutEffect(() => {
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
    setFilter({ ...filter, type: id, })
    if (id.includes('foot')) {
      setSizeType(['37', '38', '39', '40', '41', '42', '43', '44'])
    } else {
      setSizeType(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
    }

    window.addEventListener("scroll", () => setFilterOpen(false))
    return () => {
      window.removeEventListener("scroll", () => setFilterOpen(false))
      setFilter({ minPrice: '', maxPrice: '', size: '', sort: '', color: '', type: id, search: '' })
    }

  }, [id])

  const handleExpand = (type) => {
    if (expand === type) {
      setExpand()
    } else {
      setExpand(type)
    }
  }

  let filterNumber = Object.values(filter).reduce((total, fil) => total + (fil === "" ? 0 : 1), -1)
  console.log(filterNumber)

  return (
    <>
      <div className={filterOpen ? 'side-filter-bg' : 'hidden'} onClick={() => setFilterOpen(false)} />
      <div className={filterOpen ? 'side-filter-bar' : 'side-filter-closed'}>
        <div className='side-font flex items-start'>Filtre
          {filterNumber > 0 && (
            <span className="text-sm">({filterNumber})</span>
          )}
        </div>
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
                value={filter.minPrice}
                onChange={e => startTransition(() => setFilter({ ...filter, minPrice: e.target.value }))}
              />
            </label>
            <label className='side-selection'>
              Maxim (Lei):
              <input type='number'
                className='side-price-input'
                value={filter.maxPrice}
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
            {colors.map(color => {
              return (
                <label>
                  <input type='checkbox' className="side-size-check"
                    checked={filter.color === color}
                    onChange={e => startTransition(() => !e.target.checked ? setFilter({ ...filter, color: '' }) : setFilter({ ...filter, color: color }))}
                  />
                  <div className="side-colors side-selection" style={{ backgroundColor: color }} />
                </label>
              )
            })}
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
                      setFilter({ ...filter, search: e.target.value })
                    });
                  }}
                  value={filter.search}
                  placeholder='Cauta dupa id'
                />
                <div className={darkTheme ? 'side-id-img-dark' : 'side-id-img'} />
              </label>
            </form>
          </div>
          <div className='side-expand' onClick={() => {
            startTransition(() => {
              setExpand()
              setFilter({ minPrice: '', maxPrice: '', size: '', sort: '', color: '', type: id, search: '' })
            })
          }}>
            <span className='side-selection side-selection'>Sterge Filtre</span>
            {darkTheme ? (
              <div className='side-del-dark' />
            ) : (
              <div className='side-del' />
            )}
          </div>
        </form>
      </div>
    </>
  )
}

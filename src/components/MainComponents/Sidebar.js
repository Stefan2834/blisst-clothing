import React, { useState, useLayoutEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDefault } from '../../contexts/DefaultContext'
import { colors, validPath } from '../../contexts/Import'
import { useAuth } from '../../contexts/AuthContext'
import { useEffect } from 'react'


export default function Sidebar() {
  const { collections } = useAuth()
  const { setProductLoad, darkTheme, startTransition,
    filter, setFilter,
    filterOpen, setFilterOpen,
    setScrollPosition, t, lang
  } = useDefault()
  const { id } = useParams()
  const [sizeType, setSizeType] = useState([])
  const [expand, setExpand] = useState()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    console.log(filter.type, id)
    startTransition(() => {
      const newValidPath = [...validPath, ...collections.map(coll => { return `collection ${coll.name}` })]
      if (!newValidPath.includes(id)) {
        navigate('/')
      }
      setFilter({ ...filter, type: id, })
      if (id.includes('femei')) {
        document.documentElement.style.setProperty("--principal2", '#e684ae')
      } else {
        document.documentElement.style.setProperty("--principal2", '#79cbca')
      }
      if (id.includes('foot')) {
        setSizeType(['37', '38', '39', '40', '41', '42', '43', '44'])
      } else {
        setSizeType(['XS', 'S', 'M', 'L', 'XL', 'XXL'])
      }
    })
    const handleScroll = () => {
      setFilterOpen(false)
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id])

  useEffect(() => {
    let title
    if (id.includes('femei')) {
      title = 'Femei'
    } else if (id.includes('barbati')) {
      title = 'Bărbați'
    } else if (id.includes('collection')) {
      title = 'Colecții'
    }
    document.title = `Blisst — ${t(`Side.${title}`)}`
  }, [lang, id])

  const handleExpand = (type) => {
    if (expand === type) {
      setExpand()
    } else {
      setExpand(type)
    }
  }

  let filterNumber = (filter.searchId || filter.searchName) === "" ? Object.values(filter).reduce((total, fil) => total + (fil === "" ? 0 : 1), -1) : 1

  return (
    <>
      <div className={filterOpen ? 'side-filter-bg' : 'hidden'} onClick={() => setFilterOpen(false)} />
      <div className={filterOpen ? 'side-filter-bar' : 'side-filter-closed'}>
        <div className='side-font flex items-start'>{t('Side.Filtre')}
          {filterNumber > 0 && (
            <span className="text-sm">({filterNumber})</span>
          )}
        </div>
        <form className="side-form" onChange={() => { setProductLoad(10); window.scrollTo(0, 0) }} onSubmit={(e) => e.preventDefault()}>
          <div className='side-expand' onClick={() => handleExpand('Pret')}>
            <span className='side-selection'>{t('Side.Preț')}</span>
            {darkTheme ? (
              <div className={expand === 'Pret' ? 'side-minus-dark' : 'side-plus-dark'} />
            ) : (
              <div className={expand === 'Pret' ? 'side-minus' : 'side-plus'} />
            )}
          </div>
          <div className={expand === 'Pret' ? 'side-overflow-expand' : 'side-overflow'}>
            <label className='side-selection'>
              {t('Side.Minim')} (Lei):
              <input type='number'
                className='side-price-input'
                value={filter.minPrice}
                onChange={e => startTransition(() => setFilter({ ...filter, minPrice: e.target.value }))}
              />
            </label>
            <label className='side-selection'>
              {t('Side.Maxim')} (Lei):
              <input type='number'
                className='side-price-input'
                value={filter.maxPrice}
                onChange={e => startTransition(() => setFilter({ ...filter, maxPrice: e.target.value }))}
              />
            </label>
          </div>
          <div className='side-expand' onClick={() => handleExpand('Marimi')}>
            <span className='side-selection'>{t('Side.Mărimi')}</span>
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
              <div className="side-size-label w-100 side-selection">{t('Side.Toate')}</div>
            </label>
          </div>
          <div className='side-expand' onClick={() => handleExpand('Sorteaza')}>
            <span className='side-selection'>{t('Side.Sortează')}</span>
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
              <div className="side-size-label side-selection">{t('Side.Implicit')}</div>
            </label>
            <label className="w-24 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'nrReview'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'nrReview' }))}
              />
              <div className="side-size-label side-selection">{t('Side.Review-uri')}</div>
            </label>
            <label className="w-5/12 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'price+'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'price+' }))}
              />
              <div className="side-size-label side-selection">{t('Side.Preț')} <div className={darkTheme ? 'side-size-img-up-dark' : "side-size-img-up"} /></div>
            </label>
            <label className="w-5/12 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'price-'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'price-' }))}
              />
              <div className="side-size-label side-selection">{t('Side.Preț')} <div className={darkTheme ? 'side-size-img-down-dark' : "side-size-img-down"} /></div>
            </label>
            <label className="w-5/12 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'review+'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'review+' }))}
              />
              <div className="side-size-label side-selection">{t('Side.Rating')} <div className={darkTheme ? 'side-size-img-up-dark' : "side-size-img-up"} /></div>
            </label>
            <label className="w-5/12 m-1">
              <input type='checkbox' className="side-size-check"
                checked={filter.sort === 'review-'}
                onChange={e => startTransition(() => e.target.checked && setFilter({ ...filter, sort: 'review-' }))}
              />
              <div className="side-size-label side-selection">{t('Side.Rating')} <div className={darkTheme ? 'side-size-img-down-dark' : "side-size-img-down"} /></div>
            </label>
          </div>
          <div className='side-expand' onClick={() => handleExpand('Culori')}>
            <span className='side-selection'>{t('Side.Culori')}</span>
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
            <span className='side-selection side-selection'>{t('Side.Caută')}</span>
            {darkTheme ? (
              <div className={expand === 'Cauta' ? 'side-minus-dark' : 'side-plus-dark'} />
            ) : (
              <div className={expand === 'Cauta' ? 'side-minus' : 'side-plus'} />
            )}
          </div>
          <div className={expand === 'Cauta' ? 'side-overflow-expand' : 'side-overflow'}>
            <label className='side-selection'>
              {t('Side.După nume')}:
              <input type='text'
                className='side-price-input'
                value={filter.searchName}
                onChange={e => setFilter({ ...filter, searchName: e.target.value, searchId: '' })}
              />
            </label>
            <label className='side-selection'>
              {t('Side.După id')}:
              <input type='text'
                className='side-price-input'
                value={filter.searchId}
                onChange={e => setFilter({ ...filter, searchId: e.target.value, searchName: '' })}
              />
            </label>
          </div>
          <div className='side-expand' onClick={() => {
            startTransition(() => {
              setExpand()
              setProductLoad(10)
              window.scrollTo(0, 0)
              setFilter({ minPrice: '', maxPrice: '', size: '', sort: '', color: '', type: id, searchId: '', searchName: '' })
            })
          }}>
            <span className='side-selection side-selection'>{t('Side.Șterge Filtre')}</span>
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

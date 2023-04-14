import React, { useState, useEffect } from 'react'
import { useDefault } from '../../contexts/DefaultContext'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Countdown from '../SmallComponents/Countdown'


export default function Main() {
  const {
    currentUser,
    favorite, dispatchFav,
    server
  } = useAuth()
  const { darkTheme } = useDefault()
  const [suggestion, setSuggestion] = useState()


  useEffect(() => {
    document.title = 'Blisst'
    axios.get(`${server}/suggestion/daily`)
      .then(daily => {
        setSuggestion(daily.data.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <div className='main'>
        <div className='main-off'>
          <div className='main-left'>
            <div className='flex items-center justify-start flex-col'>
              <div className='main-off-title'>Noi dam <span className='text-orange-600'>Moda</span></div>
              <div className='main-off-text'>Produsul zilei:</div>
              <div className='sugg-div'>
                {suggestion && (
                  <>
                    <Link to={`/product/${suggestion.id}`}>
                      <div className="sugg-photo">
                        <div style={{ backgroundImage: `url(${suggestion.photo})` }} className="sugg-img" />
                      </div>
                    </Link>
                    <div className={suggestion.sex === 'man' ? 'sugg-det sugg-grad-man' : 'sugg-det sugg-grad-woman'}>
                      <Link to={`/product/${suggestion.id}`}>
                        <div className="sugg-left">
                          <div className="sugg-name">
                            {suggestion.nume}
                          </div>
                          <div className="sugg-price">
                            {suggestion.discount > 0 ? (
                              <>
                                <div className="sugg-price-flex">
                                  <div className="sugg-price-old">{suggestion.price}
                                    <span className="sugg-span">Lei</span>
                                  </div>
                                  <span className="sugg-price"> - {suggestion.discount * 100} %</span>
                                </div>
                                <div className="sugg-price-new text-red-600">{suggestion.price + 0.01 - ((suggestion.price + 0.01) * suggestion.discount) - 0.01}
                                  <span className="sugg-span text-red-600">Lei</span>
                                </div>
                              </>
                            ) : (
                              <>
                                {suggestion.price} <span className="sugg-span">Lei</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                      <div className="sugg-right">
                        {favorite.some(item => item.id === suggestion.id) ? (
                          <div className="sugg-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: suggestion } })} />
                        ) : (
                          <div className="sugg-fav" onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: suggestion, user: currentUser } })} />
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <Countdown />
            </div>
          </div>
          <div className='main-right'>
            <div className='main-off-man'>
              <Link to='/main/cloth/barbati' className='main-off-photo-man' />
              <Link to='/main/cloth/man' className='main-off-more'>Produse pentru
                <span className='text-orange-600 ml-2'>
                  El
                </span>
                <div className='nav-arrow' />
              </Link>
            </div>
            <div className='main-off-woman'>
              <Link to='/main/cloth/femei' className='main-off-photo-woman' />
              <Link to='/main/cloth/woman' className='main-off-more'>Produse pentru
                <span className='text-orange-600 ml-2'>
                  Ea
                </span>
                <div className='nav-arrow' />
              </Link>
            </div>
          </div>
        </div>
        <div className='main-info'>
          <div className='main-info-card'>
            <div className={darkTheme ? 'main-info-icon-truck-dark' : 'main-info-icon-truck'} />
            <div className='main-info-text'>
              Plata cu <span className='text-orange-600'>ramburs</span> la curier
            </div>
          </div>
          <div className='main-info-card'>
            <div className={darkTheme ? 'main-info-icon-wallet-dark' : 'main-info-icon-wallet'} />
            <div className='main-info-text'>
              Livrare gratuita la comenzi de peste <span className='text-orange-600'>200</span> de Lei
            </div>
          </div>
          <div className='main-info-card'>
            <div className={darkTheme ? 'main-info-icon-watch-dark' : 'main-info-icon-watch'} />
            <div className='main-info-text'>
              Comanda livrata in <span className='text-orange-600'>3-5 zile</span> lucratoare
            </div>
          </div>
        </div>
        <div className='main-disc'>
          <div className='main-disc-top'>
            <div className='main-disc-top-text'>Produse la reducere</div>
          </div>
          <div className='main-disc-flex'></div>
        </div>
      </div>
    </>
  )
}

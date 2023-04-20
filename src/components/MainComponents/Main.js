import React, { useState, useEffect } from 'react'
import { useDefault } from '../../contexts/DefaultContext'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Countdown from '../SmallComponents/Countdown'
import Swal from 'sweetalert2'



export default function Main() {
  const {
    currentUser,
    favorite, dispatchFav,
    server
  } = useAuth()
  const { darkTheme } = useDefault()
  const [suggestion, setSuggestion] = useState()
  const [det, setDet] = useState({ info: '', tel: '', email: '', name: '', type: '', county: '', newsLetter: false })

  const handleSubscribe = () => {
    Swal.fire({
      title: 'Te-ai abonat',
      text: "Multumim ca te-ai abonat! Verifica adresa de email pentru a primi codul de reducere.",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    })
    handleModify(true)
  }

  const handleUnSubscribe = () => {
    Swal.fire({
      title: 'Ne pare rau.',
      text: "Te-ai dezabonat de la News Letter",
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    })
    handleModify(false)
  }

  const handleModify = (value) => {
    const newDet = { ...det, newsLetter: value }
    setDet(newDet)
    axios.post(`${server}/user/infoUpdate`, { uid: currentUser.uid, det: newDet })
      .then((data) => {
        console.log(data)
        if (value) {
          axios.post(`${server}/email/newsLetter`, { email: currentUser.email, name: det.name })
            .then((data) => console.log(data))
            .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    document.title = 'Blisst'
    axios.get(`${server}/suggestion/daily`)
      .then(daily => {
        setSuggestion(daily.data.data)
        if (currentUser) {
          axios.post(`${server}/user/info`, { uid: currentUser.uid })
            .then(info => { if (info.data.det) { setDet(info.data.det) } })
            .catch(err => console.error(err.error))
        }
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className='main'>
        <div className='main-off'>
          <div className='main-left'>
            <div className='flex items-center justify-start flex-col'>
              <div className='main-off-title'>Noi dam <span className='principal'>Moda</span></div>
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
              <Link to='/main/cloth/barbati' className='main-off-more'>Produse pentru
                <span className='principal ml-2'>
                  El
                </span>
                <div className='nav-arrow' />
              </Link>
            </div>
            <div className='main-off-woman'>
              <Link to='/main/cloth/femei' className='main-off-photo-woman' />
              <Link to='/main/cloth/femei' className='main-off-more'>Produse pentru
                <span className='principal ml-2'>
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
              Plata cu <span className='principal'>ramburs</span> la curier
            </div>
          </div>
          <div className='main-info-card'>
            <div className={darkTheme ? 'main-info-icon-wallet-dark' : 'main-info-icon-wallet'} />
            <div className='main-info-text'>
              Livrare gratuita la comenzi de peste <span className='principal'>200</span> de Lei
            </div>
          </div>
          <div className='main-info-card'>
            <div className={darkTheme ? 'main-info-icon-watch-dark' : 'main-info-icon-watch'} />
            <div className='main-info-text'>
              Comanda livrata in <span className='principal'>3-5 zile</span> lucratoare
            </div>
          </div>
        </div>
        <div className='main-disc'>
          <div className='main-disc-top'>
            <div className='main-disc-top-text'>Produse</div>
          </div>
          <div className='main-disc-flex'>
            <div className='main-disc-flex-container'>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo1' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Tricou pentru El
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo2' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Tricou pentru Ea
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo3' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Hanorac pentru El
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo4' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Hanorac pentru Ea
                  </div>
                </div>
              </div>
            </div>
            <div className='main-disc-flex-container'>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo5' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Pantaloni scurti pentru El
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo6' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Pantaloni scurti pentru Ea
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo7' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Pantaloni lungi pentru El
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo8' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Pantaloni lungi pentru Ea
                  </div>
                </div>
              </div>
            </div>
            <div className='main-disc-flex-container'>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo9' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Adidasi pentru El
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo10' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Adidasi pentru Ea
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo11' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Papuci pentru El
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo12' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Papuci pentru Ea
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

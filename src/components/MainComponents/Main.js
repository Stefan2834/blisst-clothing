import React, { useState, useEffect } from 'react'
import { useDefault } from '../../contexts/DefaultContext'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Countdown from '../SmallComponents/Countdown'
import Product from '../SmallComponents/Product'



export default function Main() {
  const { server, product } = useAuth()
  const { darkTheme } = useDefault()
  const [suggestion, setSuggestion] = useState()

  useEffect(() => {
    document.title = 'Blisst'
    axios.get(`${server}/suggestion/daily`)
      .then(daily => {
        const id = daily.data.data
        setSuggestion(product.find(p => p.id === id))
      })
      .catch(err => console.log(err))
  }, [])//fa o cerere la server, pentru a vedea care este produsul zilei

  return (
    <>
      <div className='main'>
        <div className='main-off'>
          <div className='main-left'>
            <div className='flex items-center justify-start flex-col'>
              <div className='main-off-title'>Noi dam <span className='principal'>Moda</span></div>
              <div className='main-off-text'>Produsul zilei:</div>
              <div className='cloth-div main-cloth-div'>
                {suggestion && (
                  <Product product={suggestion} />
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
                    Pantaloni lungi pentru El
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo6' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Pantaloni lungi pentru Ea
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo7' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Pantaloni scurti pentru El
                  </div>
                </div>
              </div>
              <div className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo8' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    Pantaloni scurti pentru Ea
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

import React, { useState, useEffect } from 'react'
import { useDefault } from '../../contexts/DefaultContext'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Countdown from '../SmallComponents/Countdown'
import Product from '../SmallComponents/Product'




export default function Main() {
  const { server, product } = useAuth()
  const { darkTheme, t } = useDefault()
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
              <div className='main-off-title'>{t('Main.Noi dăm')} <span className='principal'>{t('Main.Moda')}</span></div>
              <div className='main-off-text'>{t('Main.Produsul zilei')}:</div>
              <div className='main-cloth-div'>
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
              <Link to='/main/cloth/barbati' className='main-off-more'>{t('Main.Produse pentru')}
                <span className='principal ml-2'>
                  {t('Main.El')}
                </span>
                <div className='nav-arrow' />
              </Link>
            </div>
            <div className='main-off-woman'>
              <Link to='/main/cloth/femei' className='main-off-photo-woman' />
              <Link to='/main/cloth/femei' className='main-off-more'>{t('Main.Produse pentru')}
                <span className='principal ml-2'>
                  {t('Main.Ea')}
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
              {t('Main.Plata cu')} <span className='principal'>{t('Main.ramburs')}</span> {t('Main.sau')} <span className='principal'>{t('Main.card')}</span>
            </div>
          </div>
          <div className='main-info-card'>
            <div className={darkTheme ? 'main-info-icon-wallet-dark' : 'main-info-icon-wallet'} />
            <div className='main-info-text'>
              {t('Main.Livrare gratuită la comenzi de peste')} <span className='principal'>200</span> Lei
            </div>
          </div>
          <div className='main-info-card'>
            <div className={darkTheme ? 'main-info-icon-watch-dark' : 'main-info-icon-watch'} />
            <div className='main-info-text'>
              {t('Main.Comandă livrată în')} <span className='principal'>{t('Main.3-5 zile')}</span> {t('Main.lucrătoare')}
            </div>
          </div>
        </div>
        <div className='main-disc'>
          <div className='main-disc-top'>
            <div className='main-disc-top-text'>{t('Main.Produse')}</div>
          </div>
          <div className='main-disc-flex'>
            <div className='main-disc-flex-container'>
              <Link to='/main/cloth/barbati top tricouri' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo1' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Tricou pentru El')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/femei top tricouri' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo2' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Tricou pentru Ea')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/barbati top bluze' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo3' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Hanorac pentru El')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/femei top bluze' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo4' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Hanorac pentru Ea')}
                  </div>
                </div>
              </Link>
            </div>
            <div className='main-disc-flex-container'>
              <Link to='/main/cloth/barbati bottom lungi' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo5' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Pantaloni lungi pentru El')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/femei bottom lungi' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo6' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Pantaloni lungi pentru Ea')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/barbati bottom scurti' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo7' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Pantaloni scurți pentru El')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/femei bottom scurti' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo8' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Pantaloni scurți pentru Ea')}
                  </div>
                </div>
              </Link>
            </div>
            <div className='main-disc-flex-container'>
              <Link to='/main/cloth/barbati foot adidasi' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo9' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Adidași pentru El')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/femei foot adidasi' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo10' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Adidași pentru Ea')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/barbati foot papuci' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo11' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Papuci pentru El')}
                  </div>
                </div>
              </Link>
              <Link to='/main/cloth/femei foot papuci' className='main-disc-container'>
                <div className='main-disc-photo main-disc-photo12' />
                <div className='main-disc-text'>
                  <div className='main-disc-text-btn'>
                    {t('Main.Papuci pentru Ea')}
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

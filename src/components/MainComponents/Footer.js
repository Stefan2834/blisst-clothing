import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'

export default function Footer() {
  const { pathname } = useLocation()
  const { currentUser, server, det, setDet } = useAuth()
  const { darkTheme, t } = useDefault()
  const [full, setFull] = useState(true)

  const handleSubscribe = () => {
    Swal.fire({
      title: t('Foo.Te-ai abonat'),
      text: t('Foo.Mulțumim că te-ai abonat! Verifică adresa de email pentru a primit codul de reducere.'),
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    })
    handleModify(true)
  }
  const handleUnSubscribe = () => {
    Swal.fire({
      title: t('Foo.Ne pare rău.'),
      text: t('Foo.Te-ai dezabonat de la NewsLetter'),
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok',
    })
    handleModify(false)
  }//daca utilizatorul vrea se se dezaboneze de la newsLetter, cheama functia handleModify cu parametrul egal cu adevarat respectiv fals
  const handleModify = (value) => {
    const newDet = { ...det, newsLetter: value }
    setDet(newDet)
    axios.post(`${server}/user/infoUpdate`, { uid: currentUser.uid, det: newDet })
      .then((data) => {
        if (value) {
          axios.post(`${server}/email/newsLetter`, { email: currentUser.email, name: det.name })
            .then((data) => console.log(data))
            .catch(err => console.error(err))
        }
      })
      .catch(err => console.error(err))
  }// modifica in baza de date, datele de la newsLetter

  useEffect(() => {
    if (pathname.includes('/main/cloth')) {
      setFull(false)
    } else {
      setFull(true)
    }
  }, [pathname])


  return (
    <div className='footer'>
      <div className={full ? 'foo-content-full' : 'foo-content'}>
        <div className='foo-top'>
          <div className='foo-collumn'>
            <div className='foo-title'>{t('Foo.Bărbați')}</div>
            <Link to='/main/cloth/barbati top tricouri' className='foo-text'>{t('Foo.Tricouri')}</Link>
            <Link to='/main/cloth/barbati top bluze' className='foo-text'>{t('Foo.Bluze')}</Link>
            <Link to='/main/cloth/barbati bottom lungi' className='foo-text'>{t('Foo.Pantaloni lungi')}</Link>
            <Link to='/main/cloth/barbati bottom scurti' className='foo-text'>{t('Foo.Pantaloni scurți')}</Link>
            <Link to='/main/cloth/barbati foot adidasi' className='foo-text'>{t('Foo.Adidași')}</Link>
            <Link to='/main/cloth/barbati foot papuci' className='foo-text'>{t('Foo.Șosete')}</Link>
          </div>
          <div className='foo-collumn'>
            <div className='foo-title'>{t('Foo.Femei')}</div>
            <Link to='/main/cloth/femei top tricouri' className='foo-text'>{t('Foo.Tricouri')}</Link>
            <Link to='/main/cloth/femei top bluze' className='foo-text'>{t('Foo.Bluze')}</Link>
            <Link to='/main/cloth/femei bottom lungi' className='foo-text'>{t('Foo.Pantaloni lungi')}</Link>
            <Link to='/main/cloth/femei bottom scurti' className='foo-text'>{t('Foo.Pantaloni scurți')}</Link>
            <Link to='/main/cloth/femei foot adidasi' className='foo-text'>{t('Foo.Adidași')}</Link>
            <Link to='/main/cloth/femei foot papuci' className='foo-text'>{t('Foo.Șosete')}</Link>
          </div>
          <div className='foo-collumn'>
            <div className='foo-title'>{t('Foo.Contul meu')}</div>
            <Link to='/main/fav' className='foo-text'>{t('Foo.Favorite')}</Link>
            <Link to='/main/cart' className='foo-text'>{t('Foo.Coșul meu')}</Link>
            <Link to='/main/profile' className='foo-text'>{t('Foo.Profilul meu')}</Link>
            {currentUser ? (
              <Link to='/connect' className='foo-text'>{t('Foo.Deconectare')}</Link>
            ) : (
              <Link to='/connect' className='foo-text'>{t('Foo.Conectare')}</Link>
            )}
          </div>
          <div className='foo-collumn'>
            <div className='foo-title'>{t('Foo.Informații')}</div>
            <Link to='/main/terms' className='foo-text'>{t('Foo.Termeni și condiții')}</Link>
            <Link to='/main/faq' className='foo-text'>{t('Foo.Întrebări frecvente')}</Link>
            <Link to='/main/help' className='foo-text'>{t('Foo.Ajutor')}</Link>
            <a href='/Licenses.pdf' className='foo-text' download>{t('Foo.Licențe')}</a>
            <Link to='/main/credits' className='foo-text'>{t('Foo.Credite')}</Link>
          </div>
          <div className='foo-collumn'>
            <div className='foo-title-news'>NewsLetter</div>
            {currentUser ? (
              <>
                {det.newsLetter ? (
                  <div className='foo-news'>{t('Foo.Primești prea multe emailuri?')}
                    <div className='foo-btn' onClick={handleUnSubscribe}>{t('Foo.Dezabonează-te')}</div>
                  </div>
                ) : (
                  <div className='foo-news'>{t('Foo.Abonează-te si primești 10% reducere.')}
                    <div className='foo-btn' onClick={handleSubscribe}>{t('Foo.Abonează-te')}</div>
                  </div>
                )}
              </>
            ) : (
              <div className='foo-news'>{t('Foo.Poți beneficia de o reducere de 10% dacă te conectezi')}.
                <Link to='/connect' className='foo-btn'>{t('Foo.Conectează-te')}</Link>
              </div>
            )}
          </div>
        </div>
        <div className='foo-bottom'>
          {darkTheme ? (
            <div className='foo-bottom-content'>
              <Link to='https://www.instagram.com/stefaniosif17/'>
                <div className='foo-social foo-insta-dark' />
              </Link>
              <Link to='https://github.com/Stefan2834'>
                <div className='foo-social foo-github-dark' />
              </Link>
              <Link to='https://www.youtube.com/channel/UCAV4P3xhYwZ_4gDFXyc5JMg'>
                <div className='foo-social foo-youtube-dark' />
              </Link>
              <Link to='https://twitter.com/Stefan2834'>
                <div className='foo-social foo-twitter-dark' />
              </Link>
              <Link to='https://www.tiktok.com/@stefan2834'>
                <div className='foo-social foo-tiktok-dark' />
              </Link>
            </div>
          ) : (
            <div className='foo-bottom-content'>
              <Link to='https://www.instagram.com/stefaniosif17/'>
                <div className='foo-social foo-insta' />
              </Link>
              <Link to='https://github.com/Stefan2834'>
                <div className='foo-social foo-github' />
              </Link>
              <Link to='https://www.youtube.com/channel/UCAV4P3xhYwZ_4gDFXyc5JMg'>
                <div className='foo-social foo-youtube' />
              </Link>
              <Link to='https://twitter.com/Stefan2834'>
                <div className='foo-social foo-twitter' />
              </Link>
              <Link to='https://www.tiktok.com/@stefan2834'>
                <div className='foo-social foo-tiktok' />
              </Link>
            </div>
          )}
        </div>
        <Link to='/' className='foo-logo principal'></Link>
        <div className='foo-copy'>© <span className='principal'>2023</span> Blisst Clothing</div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useAuth } from '../../../contexts/AuthContext'
import { useDefault } from '../../../contexts/DefaultContext'

export default function Footer() {
  const { currentUser, server } = useAuth()
  const { darkTheme } = useDefault()
  const [det, setDet] = useState({ info: '', tel: '', email: '', name: '', type: '', county: '', newsLetter: false })

  useEffect(() => {
    if (currentUser) {
      axios.post(`${server}/user/info`, { uid: currentUser.uid })
        .then(info => { if (info.data.det) { setDet(info.data.det) } })
        .catch(err => console.error(err.error))
    }
  }, [])

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
    setDet({ ...det, newsLetter: value })
    axios.post(`${server}/user/InfoUpdate`, { uid: currentUser.uid, det: { ...det, newsLetter: value } })
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


  return (
    <div className='footer'>
      <div className='foo-left'>
        <div className='foo-left-text'>
          Acest site a fost creat de <span className='text-orange-600'>Stefan Iosif</span>.<br />
          Pentru mai multe informatii, lasa un email la:<br />
          <span className='text-orange-600'>iosifs617@gmail.com</span>
        </div>
      </div>
      <div className='foo-content'>
        <div className='foo-top'>
          <div className='foo-collumn'>
            <div className='foo-title'>Barbati</div>
            <Link to='/main/cloth/barbati top tricouri' className='foo-text'>Tricouri</Link>
            <Link to='/main/cloth/barbati top bluze' className='foo-text'>Bluze</Link>
            <Link to='/main/cloth/barbati bottom lungi' className='foo-text'>Pantaloni lungi</Link>
            <Link to='/main/cloth/barbati bottom scurti' className='foo-text'>Pantaloni scurti</Link>
            <Link to='/main/cloth/barbati foot adidasi' className='foo-text'>Adidasi</Link>
            <Link to='/main/cloth/barbati foot papuci' className='foo-text'>Papuci</Link>
          </div>
          <div className='foo-collumn'>
            <div className='foo-title'>Femei</div>
            <Link to='/main/cloth/femei top tricouri' className='foo-text'>Tricouri</Link>
            <Link to='/main/cloth/femei top bluze' className='foo-text'>Bluze</Link>
            <Link to='/main/cloth/femei bottom lungi' className='foo-text'>Pantaloni lungi</Link>
            <Link to='/main/cloth/femei bottom scurti' className='foo-text'>Pantaloni scurti</Link>
            <Link to='/main/cloth/femei foot adidasi' className='foo-text'>Adidasi</Link>
            <Link to='/main/cloth/femei foot papuci' className='foo-text'>Papuci</Link>
          </div>
          <div className='foo-collumn'>
            <div className='foo-title'>Informatii</div>
            <Link to='/main/fav' className='foo-text'>Favorite</Link>
            <Link to='/main/cart' className='foo-text'>Cosul meu</Link>
            <Link to='/main/profile' className='foo-text'>Profilul meu</Link>
            <Link to='/connect' className='foo-text'>Conecteaza-te</Link>
            <Link to='/main/' className='foo-text'>Termeni si conditii</Link>
          </div>
          <div className='foo-collumn'>
            <div className='foo-title-news'>News letter</div>
            {currentUser ? (
              <>
                {det.newsLetter ? (
                  <div className='foo-news'>Primesti prea multe emailuri?
                    <div className='foo-btn' onClick={handleUnSubscribe}>Dezaboneaza-te</div>
                  </div>
                ) : (
                  <div className='foo-news'>Aboneaza-te si primesti 10% reducere.
                    <div className='foo-btn' onClick={handleSubscribe}>Aboneaza-te</div>
                  </div>
                )}
              </>
            ) : (
              <div className='foo-news'>Poti beneficia de o reducere de 10% daca te conectezi.
                <Link to='/connect' className='foo-btn'>Conecteaza-te</Link>
              </div>
            )}
          </div>
        </div>
        <div className='foo-bottom'>
          {darkTheme ? (
            <div className='foo-bottom-content'>
              <Link to='/'>
                <div className='foo-social foo-insta-dark' />
              </Link>
              <Link to='/'>
                <div className='foo-social foo-github-dark' />
              </Link>
              <Link to='/'>
                <div className='foo-social foo-youtube-dark' />
              </Link>
              <Link to='/'>
                <div className='foo-social foo-twitter-dark' />
              </Link>
              <Link to='/'>
                <div className='foo-social foo-tiktok-dark' />
              </Link>
            </div>
          ) : (
            <div className='foo-bottom-content'>
              <Link to='/'>
                <div className='foo-social foo-insta' />
              </Link>
              <Link to='/'>
                <div className='foo-social foo-github' />
              </Link>
              <Link to='/'>
                <div className='foo-social foo-youtube' />
              </Link>
              <Link to='/'>
                <div className='foo-social foo-twitter' />
              </Link>
              <Link to='/'>
                <div className='foo-social foo-tiktok' />
              </Link>
            </div>
          )}
        </div>
        <div className='foo-logo text-orange-600'>Fashionista</div>
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'

export default function Footer() {
  const { currentUser, server, det, setDet } = useAuth()
  const { darkTheme } = useDefault()

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
  }//daca utilizatorul vrea se se dezaboneze de la newsLetter, cheama functia handleModify cu parametrul egal cu adevarat respectiv fals
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
  }// modifica in baza de date, datele de la newsLetter


  return (
    <div className='footer'>
      <div className='foo-left'>
        <div className='foo-left-text'>
          Acest site a fost creat de <span className='principal font-semibold'>Stefan Iosif</span>.<br />
          Pentru mai multe informatii, lasa un email la:<br />
          <span className='principal font-semibold'>iosifs617@gmail.com</span>
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
            <div className='foo-title'>Contul meu</div>
            <Link to='/main/fav' className='foo-text'>Favorite</Link>
            <Link to='/main/cart' className='foo-text'>Cosul meu</Link>
            <Link to='/main/profile' className='foo-text'>Profilul meu</Link>
            <Link to='/connect' className='foo-text'>Conecteaza-te</Link>
          </div>
          <div className='foo-collumn'>
            <div className='foo-title'>Informatii</div>
            <Link to='/main/terms' className='foo-text'>Termeni si conditii</Link>
            <Link to='/main/faq' className='foo-text'>Faq</Link>
            <Link to='/main/help' className='foo-text'>Ajutor</Link>
            <Link to='/main/license' className='foo-text'>Licente</Link>
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
        <div className='foo-logo principal'>Blisst</div>
      </div>
    </div>
  )
}

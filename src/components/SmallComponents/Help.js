import React, { useRef, useState } from 'react'
import '../css/help.css'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import emailSvg from '../../svg-icon/email-security.svg'
import infoSvg from '../../svg-icon/info.svg'
import { useEffect } from 'react'


export default function Help() {
  const { currentUser, server } = useAuth()
  const { t, lang } = useDefault()
  const emailRef = useRef()
  const errorRef = useRef()
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `Blisst — ${t('Help.Ajutor')}`
  }, [lang])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const email = currentUser ? currentUser.email : emailRef.current.value
      console.log(email, errorRef.current.value)
      const error = await axios.post(`${server}/error`, {
        email: email,
        error: errorRef.current.value
      })
      if (error.data.success) {
        Swal.fire(
          t('Help.Trimis!'),
          t('Help.Eroare a fost trimisă către noi. Vei primi un email cu rezolvarea in câteva zile.'),
          'success'
        )
        navigate('/main')
      } else {
        setResponse(error.data.message)
      }
    } catch (err) {
      console.log(err)
      setResponse(err)
    }
    setLoading(false)
  }// salveaza in baza de date eroarea gasita de catre utilizator, iar apoi trimite-l pe pagina de main

  return (
    <>
      {loading && (
        <div className="loading-bg">
          <div className="loading-spin">{t('Main.Se încarcă')}...</div>
        </div>
      )}
      <div className='help'>
        <div className='help-div'>
          <div className='help-content'>
            <div className='for-title'>{t('Help.Ai o problemă?')}</div>
            <div className='for-text'>{t('Help.Ai orice fel de problemă legată de orice parte a site-ului? Scrie-o aici')}</div>
            <form className='for-form' onSubmit={handleSubmit}>
              <label className='acc-label'><img className='acc-svg' src={infoSvg} alt='Img' />
                <input ref={errorRef} className='acc-input' type='text' placeholder=' ' required />
                <span className='place-holder'>{t('Help.Detalii problemă')}</span>
              </label>
              {!currentUser && (
                <label className='help-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                  <input ref={emailRef} className='acc-input' type='email' placeholder=' ' required />
                  <span className='place-holder'>{t('Forgot.Email')}</span>
                </label>
              )}
              <input type='submit'
                className='for-submit'
                value={t('Help.Raportează problema')}
              />
              <div className='for-res'>
                {response /* posibila eroare */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

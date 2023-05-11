import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { useDefault } from '../../contexts/DefaultContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailSvg from '../../svg-icon/email-security.svg'
import passSvg from '../../svg-icon/key.svg'
import eyeTrue from '../../svg-icon/eye-check.svg'
import eyeFalse from '../../svg-icon/eye-off.svg'
import { useEffect } from 'react';

export default function ResendEmail() {
  const { server } = useAuth()
  const { t, lang } = useDefault()
  const emailRef = useRef();
  const passRef = useRef()
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [passView, setPassView] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `Blisst — ${t('Resend.Retrimite email')}`
  }, [lang])

  const handleEmail = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const email = emailRef.current.value
      const password = passRef.current.value
      const response = await axios.post(`${server}/connect/resendEmail`, {
        email: email,
        password: password
      })
      console.log(response)
      if (response.data.success) {
        Swal.fire(
          t('Forgot.Trimis!'),
          t('Resend.Emailul de resetare a fost trimis. Verifică-ți emailul pentru a activa contul.'),
          'success'
        )
        navigate('/connect')
      } else {
        setResponse(response.data.message)
      }
    } catch (err) {
      console.log(err.message)
      setResponse(err.message)
    }
    setLoading(false)
  }//daca emailul de verificare nu a fost trimis(foarte putin probabil) sau a fost sters din greseala, 
  //emailul se retrimite iar


  return (
    <>
      {loading && (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      )}
      <div className='for'>
        <div className='for-content'>
          <div className='for-title'>{t('Resend.Nu ai primit emailul?')}</div>
          <div className='for-text'>{t(`Resend.ResendText`)}
          </div>
          <form className='for-form' onSubmit={handleEmail}>
            <label className='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
              <input ref={emailRef} className='acc-input' type='email' placeholder=' ' required />
              <span className='place-holder'>{t('Forgot.Email')}</span>
            </label>
            <label className='acc-label'><img className='acc-svg' src={passSvg} alt='Img' />
              <input ref={passRef} className='acc-input' type={passView ? 'text' : 'password'} placeholder=' ' minLength={6} maxLength={20} required />
              <span className='place-holder'>{t('Resend.Parola')}</span>
              <img className='acc-svg-eye'
                src={passView ? eyeTrue : eyeFalse}
                alt='Img' onClick={() => { setPassView(!passView) }}
              />
            </label>
            <input type='submit'
              className='for-submit'
              value={t('Forgot.Trimite emailul')}
            />
            <div className='for-res'>
              {response && (
                <>
                  {t(`Resend.${response}`)}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

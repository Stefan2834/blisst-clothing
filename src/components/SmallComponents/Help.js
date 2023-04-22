import React, { useRef, useState } from 'react'
import '../css/help.css'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import emailSvg from '../../svg-icon/email-security.svg'
import infoSvg from '../../svg-icon/info.svg'


export default function Help() {
  const { currentUser, server } = useAuth()
  const emailRef = useRef()
  const errorRef = useRef()
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const error = await axios.post(`${server}/error`, {
        email: currentUser ? currentUser.email : emailRef.current.value,
        error: errorRef.current.value
      })
      if (error.data.success) {
        Swal.fire(
          'Trimis!',
          'Eroare a fost trimisa catre noi. Vei primi un email cu rezolvarea in cateva zile',
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
          <div className="loading-spin">Loading...</div>
        </div>
      )}
      <div className='help'>
        <div className='help-div'>
          <div className='help-content'>
            <div className='for-title'>Ai o problema?</div>
            <div className='for-text'>Ai orice fel de problema legata de orice parte a site-ului? Scrie-o aici</div>
            <form className='for-form' onSubmit={handleSubmit}>
              <label className='acc-label'><img className='acc-svg' src={infoSvg} alt='Img' />
                <input ref={errorRef} className='acc-input' type='text' placeholder=' ' required />
                <span className='place-holder'>Detalii problema</span>
              </label>
              {!currentUser && (
                <label className='help-label'><img className='acc-svg' src={emailSvg} alt='Img' />
                  <input ref={emailRef} className='acc-input' type='email' placeholder=' ' required />
                  <span className='place-holder'>Email</span>
                </label>
              )}
              <input type='submit'
                className='for-submit'
                value='Raporteaza problema'
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

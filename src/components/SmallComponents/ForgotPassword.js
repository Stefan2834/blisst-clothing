import React, { useRef, useState } from 'react'
import emailSvg from '../../svg-icon/email-security.svg'
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function ForgotPassword() {
  const { server } = useAuth()
  const emailRef = useRef();
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmail = async e => {
    e.preventDefault()
    try {
      setLoading(true)
      const email = emailRef.current.value
      const response = await axios.post(`${server}/connect/reset`, { email: email })
      console.log(response)
      if (response.data.success) {
        Swal.fire(
          'Trimis!',
          'Emailul de resetare a fost trimis. Verica-ti emailul pentru a reseta parola',
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
  }

  return (
    <>
      {loading && (
        <div className="loading-bg">
          <div className="loading-spin">Loading...</div>
        </div>
      )}
      <div className='for'>
        <div className='for-content'>
          <div className='for-title'>Ti-ai uitat parola?</div>
          <div className='for-text'>Introdu emailul pentru a reseta parola.</div>
          <form className='for-form' onSubmit={handleEmail}>
            <label className='acc-label'><img className='acc-svg' src={emailSvg} alt='Img' />
              <input ref={emailRef} className='acc-input' type='email' placeholder=' ' required />
              <span className='place-holder'>Email</span>
            </label>
            <input type='submit'
              className='for-submit'
              value='Trimite emailul'
            />
            <div className='for-res'>
              {response}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

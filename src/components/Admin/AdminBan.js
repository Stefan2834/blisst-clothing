import React, { useState, useEffect, useRef } from 'react'
import '../css/admin.css'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import axios from 'axios'
import Swal from 'sweetalert2'


export default function AdminBan() {
  const { server } = useAuth()
  const { t, lang, darkTheme } = useDefault()
  const [loading, setLoading] = useState(true)
  const [bannedUsers, setBannedUsers] = useState([])
  const emailRef = useRef()
  const reasonRef = useRef()

  useEffect(() => {
    document.title = `Blisst — Admin — ${t('Admin.Ban.Banuri')}`
  }, [lang])

  useEffect(() => {
    axios.get(`${server}/admin/ban`)
      .then(data => {
        setBannedUsers(data.data.ban)
        setLoading(false)
      })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])



  const handleDelete = (email) => {
    setLoading(true)
    axios.post(`${server}/admin/banDelete`, {
      email: email
    }).then(data => {
      setBannedUsers(b => b.map(b => {
        if (b.email === email) {
          return null
        } else {
          return b
        }
      }).filter(c => c != null))
      setLoading(false)
      Swal.fire(
        t('Admin.Ban.Ban scos!'),
        `${t('Admin.Ban.Banul a fost scos cu succes pentru')} ${email} .`,
        'success'
      )
    }).catch(err => { console.error(err); setLoading(false) })
  }

  const handleBan = (e) => {
    setLoading(true)
    e.preventDefault()
    const email = emailRef.current.value
    const reason = reasonRef.current.value
    axios.post(`${server}/admin/ban`, {
      email: email,
      reason: reason
    }).then(data => {
      if (data.data.success) {
        setBannedUsers([...bannedUsers, { email: email, reason: reason }])
        setLoading(false)
        Swal.fire(
          t('Admin.Ban.Utilizator banat!'),
          `${email} ${t('Admin.Ban.a fost banat cu succes.')}`,
          'success'
        )
      } else {
        setLoading(false)
        Swal.fire(
          t('Admin.Ban.Nu poți face asta!'),
          t(`Admin.Ban.${data.data.message}`),
          'error'
        )
      }
    })
      .catch(err => { console.error(err); setLoading(false) })
  }

  return (
    <>
      {loading ? (
        <>
          <div className="loading-bg">
            <div className="loading-spin">Loading...</div>
          </div>
          <div className="h-screen" />
        </>
      ) : (
        <div className='adm-list'>
          <form className='adm-list-container' onSubmit={e => handleBan(e)}>
            <div className='adm-list-title'>{t('Admin.Ban.Setează ban')}</div>
            <label className='adm-label'>
              <input ref={emailRef} className='adm-input' type='email' placeholder=' ' required maxLength={50} />
              <span className='adm-place-holder'>{t('Admin.Ban.Email')}</span>
            </label>
            <label className='adm-label'>
              <input ref={reasonRef} className='adm-input' type='text' placeholder=' ' required minLength={5} maxLength={200} />
              <span className='adm-place-holder'>{t('Admin.Ban.Motiv')}</span>
            </label>
            <input type='submit' value={t('Admin.List.Adaugă')} className='adm-submit' />
          </form>
          <div className='adm-list-container'>
            <div className='adm-list-title'>{t('Admin.Ban.Banuri')}</div>
            {bannedUsers.length === 0 ? (
              <div className="font-semibold text-lg">
                {t('Admin.Ban.Nici un utilizator nu este banat.')}
              </div>
            ) : (
              <>
                {bannedUsers.map(ban => {
                  return (
                    <div className='flex items-center justify-between w-full my-4'>
                      <div className='adm-list-name'>{ban.email}</div>
                      <div className={darkTheme ? 'adm-list-delete-dark' : 'adm-list-delete'}
                        onClick={() => handleDelete(ban.email)}
                      />
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
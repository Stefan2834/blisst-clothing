import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import axios from 'axios'
import { useRef } from 'react'
import Swal from 'sweetalert2'

export default function AdminList() {
  const { server, currentUser } = useAuth()
  const { t, lang, darkTheme } = useDefault()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const emailRef = useRef()

  useEffect(() => {
    document.title = `Blisst — Admin — ${t('Admin.List.Listă')}`
  }, [lang])

  const handleAdmin = e => {
    e.preventDefault()
    Swal.fire({
      title: t('Admin.List.Ești sigur?'),
      text: `${t('Admin.List.Sigur vrei să oferi gradul de admin lui')} ${emailRef.current.value} ?`,
      icon: 'question',
      cancelButtonText: t('Admin.List.Înapoi'),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Admin.List.Adaugă')
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true)
        const email = emailRef.current.value
        axios.post(`${server}/admin/admins`, {
          email: email
        })
          .then(data => {
            if (data.data.success) {
              Swal.fire(
                t('Admin.List.Admin adăugat!'),
                `${email} ${t('Admin.List.este acum admin.')}`,
                'success'
              )
              setAdmins([...admins, email])
            } else {
              Swal.fire(
                t('Admin.List.Eroare!'),
                t(`Admin.List.${data.data.message}.`),
                'error'
              )
            }
            setLoading(false)
          })
          .catch(err => { console.error(err); setLoading(false) })
      }
    });
  }

  const handleDelete = email => {
    if (email === currentUser.email) {
      Swal.fire(
        t('Admin.List.Nu poți face asta!'),
        t('Admin.List.Nu poți să iți ștergi singur rolul de admin'),
        'warning'
      )
    } else {
      Swal.fire({
        title: t('Admin.List.Ești sigur?'),
        text: `${t(`Admin.List.Sigur vrei să îi scoți gradul de admin lui`)} ${email} ?`,
        icon: 'question',
        cancelButtonText: t('Admin.List.Înapoi'),
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: t('Admin.List.Șterge')
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${server}/admin/delete`, {
            email: email
          })
            .then(data => {
              if (data.data.success) {
                Swal.fire(
                  t('Admin.List.Admin șters!'),
                  `${email} ${t('Admin.List.nu mai este admin.')}`,
                  'success'
                )
                emailRef.current.value = ""
                setAdmins(admins.map(admin => {
                  if (admin === email) {
                    return null
                  } else {
                    return admin
                  }
                }).filter(a => a != null))
              }
            })
            .catch(err => console.error(err))
        }
      });
    }
  }

  useLayoutEffect(() => {
    axios.get(`${server}/admin/admins`)
      .then(data => { setAdmins(data.data.admins); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])




  return (
    <>
      {loading ? (
        <>
          <div className="loading-bg">
            <div className="loading-spin">{t('Main.Se încarcă')}...</div>
          </div>
          <div className="h-screen" />
        </>
      ) : (
        <div className='adm-list'>
          <form className='adm-list-container' onSubmit={e => handleAdmin(e)}>
            <div className='adm-list-title'>{t('Admin.List.Adaugă admin')}</div>
            <label className='adm-label'>
              <input ref={emailRef} className='adm-input' type='email' placeholder=' ' required minLength={6} maxLength={30} />
              <span className='adm-place-holder'>{t('Admin.List.Email')}</span>
            </label>
            <input type='submit' value={t('Admin.List.Adaugă')} className='adm-submit' />
          </form>
          <div className='adm-list-container'>
            <div className='adm-list-title'>{t('Admin.List.Scoate admin')}</div>
            {admins.map(admin => {
              return (
                <div className='flex items-center justify-between w-full my-4'>
                  <div className='adm-list-name'>
                    {admin}
                  </div>
                  <div className={darkTheme ? 'adm-list-delete-dark' : 'adm-list-delete'} onClick={() => handleDelete(admin)} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

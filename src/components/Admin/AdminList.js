import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { useRef } from 'react'
import Swal from 'sweetalert2'

export default function AdminList() {
  const { server, currentUser } = useAuth()
  const [admins, setAdmins] = useState([])
  const [loading, setLoading] = useState(true)
  const uidRef = useRef()
  const emailRef = useRef()

  const handleAdmin = e => {
    e.preventDefault()
    Swal.fire({
      title: 'Esti sigur?',
      text: `Sigur vrei sa oferi gradul de admin lui: ${emailRef.current.value} ?`,
      icon: 'question',
      cancelButtonText: 'Inapoi',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Adauga'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${server}/admin/admins`, {
          uid: uidRef.current.value,
          email: emailRef.current.value
        })
          .then(data => {
            Swal.fire(
              'Admin adaugat!',
              `${emailRef.current.value} este acum admin.`,
              'success'
            )
            setAdmins([...admins, emailRef.current.value])
          })
          .catch(err => console.error(err))
      }
    });
  }

  const handleDelete = email => {
    if (email === currentUser.email) {
      Swal.fire(
        'Nu poti face asta!',
        'Nu poti sa iti stergi singur rolul de admin',
        'warning'
      )
    } else {
      Swal.fire({
        title: 'Esti sigur?',
        text: `Sigur vrei sa ii scoti gradul de admin lui: ${email} ?`,
        icon: 'question',
        cancelButtonText: 'Inapoi',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sterge'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`${server}/admin/delete`, {
            email: email
          })
            .then(data => {
              Swal.fire(
                'Admin sters!',
                `${email} nu mai este admin.`,
                'success'
              )
              emailRef.current.value = ""
              uidRef.current.value = ""
              setAdmins(admins.map(admin => {
                if (admin === email) {
                  return null
                } else {
                  return admin
                }
              }).filter(a => a != null))
            })
            .catch(err => console.error(err))
        }
      });
    }
  }

  useEffect(() => {
    axios.get(`${server}/admin/admins`)
      .then(data => { setAdmins(data.data.admins); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])




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
          <form className='adm-list-container' onSubmit={e => handleAdmin(e)}>
            <div className='adm-list-title'>Adauga admin</div>
            <label className='adm-label'>
              <input ref={uidRef} className='adm-input' type='text' placeholder=' ' required minLength={10} maxLength={30} />
              <span className='adm-place-holder'>Uid</span>
            </label>
            <label className='adm-label'>
              <input ref={emailRef} className='adm-input' type='email' placeholder=' ' required minLength={6} maxLength={30} />
              <span className='adm-place-holder'>Email</span>
            </label>
            <input type='submit' value={'Adauga'} className='adm-submit' />
          </form>
          <div className='adm-list-container'>
            <div className='adm-list-title'>Scoate admin</div>
            {admins.map(admin => {
              return (
                <div className='flex items-center justify-between w-full my-4'>
                  <div className='adm-list-name'>
                    {admin}
                  </div>
                  <div className='adm-list-delete' onClick={() => handleDelete(admin)} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

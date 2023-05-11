import React, { useState, useEffect, useRef } from 'react'
import '../css/admin.css'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import axios from 'axios'

export default function AdminCollections() {
  const { server } = useAuth()
  const { t, lang } = useDefault()
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])
  const uidRef = useRef()
  const emailRef = useRef()

  useEffect(() => {
    document.title = `Blisst - Admin - ${t('Admin.Coll.Collecții')}`
  }, [lang])

  useEffect(() => {
    axios.get(`${server}/admin/collections`)
      .then(data => {
        setCollections(data.data.collections)
        setLoading(false)
      })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const handleAdmin = (e) => {
    e.preventDefault()
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
          <form className='adm-list-container' onSubmit={e => handleAdmin(e)}>
            <div className='adm-list-title'>{t('Admin.List.Adaugă admin')}</div>
            <label className='adm-label'>
              <input ref={uidRef} className='adm-input' type='text' placeholder=' ' required minLength={10} maxLength={30} />
              <span className='adm-place-holder'>Uid</span>
            </label>
            <label className='adm-label'>
              <input ref={emailRef} className='adm-input' type='email' placeholder=' ' required minLength={6} maxLength={30} />
              <span className='adm-place-holder'>{t('Admin.List.Email')}</span>
            </label>
            <input type='submit' value={t('Admin.List.Adaugă')} className='adm-submit' />
          </form>
          <div className='adm-list-container'>
            <div className='adm-list-title'>{t('Admin.Coll.Colecții')}</div>
            {collections.map(coll => {
              return (
                <div className='flex items-center justify-between w-full my-4'>
                  <div className='adm-list-name'>{coll.name}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

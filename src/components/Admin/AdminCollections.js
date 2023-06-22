import React, { useState, useEffect, useRef } from 'react'
import '../css/admin.css'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import axios from 'axios'
import Swal from 'sweetalert2'

import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../SmallComponents/Firebase'

export default function AdminCollections() {
  const { server } = useAuth()
  const { t, lang, darkTheme } = useDefault()
  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])
  const [photo, setPhoto] = useState('')
  const [loadSecond, setLoadSecond] = useState(false)
  const nameRef = useRef()

  useEffect(() => {
    document.title = `Blisst — Admin — ${t('Admin.Coll.Colecții')}`
  }, [lang])

  useEffect(() => {
    axios.get(`${server}/admin/collections`)
      .then(data => {
        setCollections(data.data.collections)
        setLoading(false)
      })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const handlePhoto = async (e) => {
    setLoadSecond(true)
    const file = e.target.files[0]
    let imageUrl = null;
    if (file) {
      const imageRef = storageRef(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      imageUrl = await getDownloadURL(imageRef);
      const url = imageUrl
      setPhoto(url)
    }
    setLoadSecond(false)
  };

  const handleDelete = (coll) => {
    setLoading(true)
    axios.post(`${server}/admin/collectionsDelete`, {
      name: coll.name
    }).then(data => {
      setCollections(c => c.map(c => {
        if (c.name === coll.name) {
          return null
        } else {
          return c
        }
      }).filter(c => c != null))
      setLoading(false)
      Swal.fire(
        t('Admin.Coll.Colecție ștearsă!'),
        t('Admin.Coll.Colecția a fost ștearsă cu succes.'),
        'success'
      )
    }).catch(err => { console.error(err); setLoading(false) })
  }

  const handleColl = (e) => {
    setLoading(true)
    e.preventDefault()
    const name = nameRef.current.value
    axios.post(`${server}/admin/collections`, {
      name: name,
      photo: photo
    }).then(data => {
      if (data.data.success) {
        Swal.fire(
          t('Admin.Coll.Colecție adăugată!'),
          t('Admin.Coll.Colecția a fost adăugată cu succes.'),
          'success'
        )
        setCollections([...collections, { name: name, photo: photo }])
      } else {
        Swal.fire(
          t('Admin.Coll.Eroare!'),
          t(`Admin.Coll.${data.data.message}`),
          'error'
        )
      }
      setLoading(false)
    })
      .catch(err => { console.error(err); setLoading(false) })
  }

  return (
    <>
      {loadSecond && (
        <div className="loading-bg">
          <div className="loading-spin">{t('Main.Se încarcă')}...</div>
        </div>
      )}
      {loading ? (
        <>
          <div className="loading-bg">
            <div className="loading-spin">{t('Main.Se încarcă')}...</div>
          </div>
          <div className="h-screen" />
        </>
      ) : (
        <div className='adm-list'>
          <form className='adm-list-container' onSubmit={e => handleColl(e)}>
            <div className='adm-list-title'>{t('Admin.Coll.Adaugă colecție')}</div>
            <label className='adm-label'>
              <input ref={nameRef} className='adm-input' type='text' placeholder=' ' required minLength={2} maxLength={30} />
              <span className='adm-place-holder'>{t('Admin.Coll.Nume')}</span>
            </label>
            <label className='adm-option-label'>
              <input type='file' onChange={(e) => handlePhoto(e)} required />
            </label>
            <input type='submit' value={t('Admin.List.Adaugă')} className='adm-submit' />
          </form>
          <div className='adm-list-container'>
            <div className='adm-list-title'>{t('Admin.Coll.Colecții')}</div>
            {collections.map(coll => {
              return (
                <div className='flex items-center justify-between w-full my-4'>
                  <div className='adm-list-name'>{coll.name}</div>
                  <div className={darkTheme ? 'adm-list-delete-dark' : 'adm-list-delete'}
                    onClick={() => handleDelete(coll)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}

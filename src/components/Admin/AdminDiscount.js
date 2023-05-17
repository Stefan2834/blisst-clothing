import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useEffect } from 'react'

export default function AdminDiscount() {
  const { server } = useAuth()
  const { t, darkTheme } = useDefault()
  const codeRef = useRef()
  const valueRef = useRef()
  const navigate = useNavigate()
  const [discount, setDiscount] = useState([])


  useEffect(() => {
    document.title = `Blisst — Admin — Discount`
  }, [])

  const handleAddDiscount = e => {
    e.preventDefault()
    const code = codeRef.current.value
    const value = Number(valueRef.current.value / 100).toFixed(2)
    axios.post(`${server}/admin/discount`, { code: code, value: value })
      .then(data => {
        if (data.data.success) {
          Swal.fire({
            title: t('Admin.Disc.Adăugat!'),
            text: t(`Admin.Disc.${data.data.message}`),
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
          navigate('/main/admin')
        } else {
          Swal.fire({
            title: t('Admin.Add.Eroare!'),
            text: data.data.message,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: t('Admin.Add.Înapoi'),
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleView = () => {
    Swal.fire({
      title: t('Admin.Disc.Ești sigur?'),
      text: t('Admin.Disc.Atenție! Asigură-te că nimeni în afară de tine nu este capabil să vada aceste coduri, deoarece sunt confidențiale.'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Admin.Disc.Afișeaza'),
      cancelButtonText: t('Admin.Disc.Înapoi')
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`${server}/admin/discount`)
          .then(data => {
            setDiscount(data.data.discount)
          })
          .catch(err => console.error(err))
      }
    })
  }

  const handleDelete = (dis) => {
    Swal.fire({
      title: t('Admin.Disc.Ești sigur?'),
      text: t('Admin.Disc.Atenție! Odată ce ai șters un cod, îți sugerăm să nu îl mai adaugi înapoi, deoarece oameni îl pot folosi iar, dupa readăugare.'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('Admin.Disc.Șterge'),
      cancelButtonText: t('Admin.Disc.Înapoi')
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post(`${server}/admin/discountDelete`, {discount: dis})
          .then(data => {
            if (data.data.success) {
              Swal.fire(
                t('Admin.Disc.Cod șters!'),
                t('Admin.Disc.Codul a fost șters cu succes.'),
                'success'
              )
              setDiscount(discount.filter(d => d.code != dis.code))
            }
          })
          .catch(err => console.error(err))
      }
    })
  }


  return (
    <div className='adm-dis'>
      <form className='adm-dis-add' onSubmit={(e) => handleAddDiscount(e)}>
        <div className='adm-dis-title'>{t('Admin.Disc.Adaugă un cod de discount')}</div>
        <label className='adm-label'>
          <input ref={codeRef} className='adm-input' type='text' placeholder=' ' required minLength={6} maxLength={10} />
          <span className='adm-place-holder'>{t('Admin.Disc.Cod')}</span>
        </label>
        <label className='adm-label'>
          <input ref={valueRef} className='adm-input' type='number' placeholder=' ' required min={1} max={100} />
          <span className='adm-place-holder'>{t('Admin.Disc.Valoare discount %')}</span>
        </label>
        <input type='submit' value={t('Admin.Disc.Creeaza codul')} className='adm-submit' />
      </form>
      <div className='adm-dis-add'>
        <div className='adm-dis-title'>{t('Admin.Disc.Alte coduri')}</div>
        {discount.length === 0 ? (
          <div className='adm-submit' onClick={() => handleView()}>{t('Admin.Disc.Afișeaza alte coduri')}</div>
        ) : (
          <div className='adm-submit' onClick={() => setDiscount([])}>{t('Admin.Disc.Oprește afișarea')}</div>
        )}
        {discount.map(dis => {
          return (
            <div className='adm-dis-div'>
              <div>
                {t('Admin.Disc.Codul')}:<span className='font-semibold'>{dis.code}</span>
              </div>
              <div>
                {t('Admin.Disc.Reducere')}:<span className='font-semibold'>{(dis.value * 100).toFixed(0)}%</span>
              </div>
              <div className={darkTheme ? 'adm-list-delete-dark' : 'adm-list-delete'}
                onClick={() => handleDelete(dis)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

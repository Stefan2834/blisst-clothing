import React, { useState, useEffect } from 'react'
import '../css/admin.css'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Admin() {
  const { det, currentUser, server } = useAuth()
  const { t } = useDefault()
  const [owner, setOwner] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Blisst — Admin'
    axios.get(`${server}/admin/owner`)
      .then(data => { setOwner(data.data.owner); setLoading(false) })
      .catch(err => console.error('Owner not found'))
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
        <div className='admin'>
          <div className='admin-div'>
            <div className='admin-top'>{t('Profile.Salut')}, {det.type === 'man' ? t('Profile.Domnule') : t('Profile.Doamna')}
              <span className='principal'> {det.name}</span>
            </div>
            <div className='admin-txt'>{t('Admin.Main.Bun venit pe pagina pentru admini!')}</div>
            <div className='admin-bottom-flex'>
              <Link to='/main/admin/products' className='admin-link'>{t('Admin.Main.Produse')}</Link>
              <Link to='/main/admin/orders' className='admin-link'>{t('Admin.Main.Comenzi')}</Link>
              <Link to='/main/admin/discount' className='admin-link'>{t('Admin.Main.Discount-uri')}</Link>
              <Link to='/main/admin/errors' className='admin-link'>{t('Admin.Main.Erori')}</Link>
              <Link to='/main/admin/collections' className='admin-link'>{t('Admin.Main.Colecții')}</Link>
              <Link to='/main/admin/banned' className='admin-link'>{t('Admin.Main.Banuri')}</Link>
              {currentUser.email === owner && (
                <Link to='/main/admin/list' className='admin-link'>{t('Admin.Main.Alți admini')}</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

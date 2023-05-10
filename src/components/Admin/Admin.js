import React, { useState, useEffect } from 'react'
import '../css/admin.css'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Admin() {
  const { det, currentUser, server } = useAuth()
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
            <div className='admin-top'>Salut, {det.type === 'man' ? 'Domnule' : 'Doamna'}
              <span className='principal'> {det.name}</span>
            </div>
            <div className='admin-txt'>Bun venit pe pagina pentru admini!</div>
            <div className='admin-bottom-flex'>
              <Link to='/main/admin/products' className='admin-link'>Produse</Link>
              <Link to='/main/admin/orders' className='admin-link'>Comenzi</Link>
              <Link to='/main/admin/discount' className='admin-link'>Discount-uri</Link>
              <Link to='/main/admin/errors' className='admin-link'>Erori</Link>
            </div>
            {currentUser.email === owner && (
              <Link to='/main/admin/list' className='admin-link'>Alti admini</Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}

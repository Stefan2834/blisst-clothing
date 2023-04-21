import React from 'react'
import '../css/admin.css'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Admin() {
  const { det } = useAuth()


  return (
    <div className='admin'>
      <div className='admin-div'>
        <div className='admin-top'>Salut, Domnule  
          <span className='principal'> {det.name}</span>
        </div>
        <div className='admin-txt'>Bun venit pe pagina pentru admini!</div>
        <div className='admin-bottom-flex'>
          <Link to='/main/admin/commands' className='admin-link'>Comenzi</Link>
          <Link to='/main/admin/discount' className='admin-link'>Discount-uri</Link>
          <Link to='/main/admin/products' className='admin-link'>Produse</Link>
          <Link to='/main/admin/errors' className='admin-link'>Erori</Link>
        </div>
      </div>
    </div>
  )
}

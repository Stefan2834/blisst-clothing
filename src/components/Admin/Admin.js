import React from 'react'
import '../css/admin.css'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function Admin() {
  const { det } = useAuth()


  return (
    <div className='admin'>
      <div className='admin-div'>
        <div className='admin-top'>Salut, 
          <span className='principal'> {det.name}</span>
        </div>
        <div className='admin-txt'>Bun venit pe pagina pentru admini!</div>
        <div className='flex justify-around items-center'>
          <Link to='/main/admin/commands' className='admin-link'>Comenzi</Link>
          <Link to='/main/admin/products' className='admin-link'>Produse</Link>
          <Link to='/main/admin/products' className='admin-link'>Produse</Link>
        </div>
      </div>
    </div>
  )
}

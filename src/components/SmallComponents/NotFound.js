import React from 'react'
import '../css/notFound.css'
import { Link } from 'react-router-dom'
import { useDefault } from '../../contexts/DefaultContext'

export default function NotFound() {
  const { darkTheme } = useDefault()

  return (
    <div className='not'>
      <div className='not-right-div'>
        <div className='flex'>
          <div className='not-404'>404</div>
          <div className={darkTheme ? 'not-photo-dark' : 'not-photo'} />
        </div>
        <div className='not-title'>Pagina gresita</div>
        <div className='not-text'>Pagina pe care incerci sa o accesezi nu exista.</div>
        <Link to='/main' className='not-btn'>Mergi acasa</Link>
      </div>
    </div>
  )
}

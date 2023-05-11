import React, { useEffect } from 'react'
import '../css/notFound.css'
import { Link } from 'react-router-dom'
import { useDefault } from '../../contexts/DefaultContext'

export default function NotFound() {
  const { darkTheme, t } = useDefault()
  //daca pagina nu exista, afiseaza asta

  useEffect(() => {
    document.title = `Blisst — 404`
  }, [])

  return (
    <div className='not'>
      <div className='not-right-div'>
        <div className='flex'>
          <div className='not-404'>404</div>
          <div className={darkTheme ? 'not-photo-dark' : 'not-photo'} />
        </div>
        <div className='not-title'>{t('404.Pagina greșită')}</div>
        <div className='not-text'>{t('404.Pagina pe care încerci să o accesezi nu există.')}</div>
        <Link to='/main' className='not-btn'>{t('404.Înapoi acasa')}</Link>
      </div>
    </div>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/ban.css'
import { useEffect } from 'react';

export default function Ban({ ...props }) {
  const { t, ban, setBan } = props
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Blisst'
  }, [])


  return (
    <div className='h-screen w-screen bg-white'>
      <div className='ban-main'>
        <div className='ban-div'>
          <div className='ban-title text-red-600'>
            {t('Ban.Ai fost banat!')}
          </div>
          <div className='ban-text'>
            {t('Ban.Acest cont a fost banat deoarece')}:
          </div>
          <div className='ban-reason'>
            {ban}
          </div>
          <div className='ban-text'>
            {t('Ban.Dacă nu ai încălcat nicio regula, scrie-ne la')} @blisstteam@gmail.com .
          </div>
          <div className='ban-logout' onClick={() => { setBan(); navigate('/connect') }}>
            {t('Ban.Deconectare')}
          </div>
        </div>
      </div>
    </div>
  )
}

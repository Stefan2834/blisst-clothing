import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/ban.css'

export default function Ban({ ...props }) {
  const { t, ban, setBan } = props
  const navigate = useNavigate()


  return (
    <div className='ban-main'>
      <div className='ban-div'>
        <div className='ban-title text-red-600'>
          {t('Ai fost banat!')}
        </div>
        <div className='ban-text'>
          {t('Acest cont a fost banat deoarece')}:
        </div>
        <div className='ban-reason'>
          {ban}
        </div>
        <div className='ban-text'>
          {t('Dacă nu ai încălcat nicio regula, scrie-ne la @blisstteam@gmail.com')}
        </div>
        <div className='ban-logout' onClick={() => { setBan(); navigate('/connect') }}>
          {t('Deconectare')}
        </div>
      </div>
    </div>
  )
}

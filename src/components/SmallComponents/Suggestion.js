import React, { useState, useLayoutEffect } from 'react'
import '../css/suggestion.css'
import axios from 'axios'
import Product from './Product'
import { useAuth } from '../../contexts/AuthContext'
import { useDefault } from '../../contexts/DefaultContext'

export default function Suggestion(props) {
  const type = props.type
  const [suggestion, setSuggestion] = useState({})
  const [loading, setLoading] = useState(true)
  const { server, product } = useAuth()
  const { t } = useDefault()

  //componentul pentru afisare produsul zilei sau top reducere

  useLayoutEffect(() => {
    if (type === 'daily') {
      axios.get(`${server}/suggestion/daily`)
        .then(daily => {
          setSuggestion(daily.data.daily)
          setLoading(false)
        })
        .catch(err => console.log(err))
    } else if (type === 'discount') {
      axios.get(`${server}/suggestion/discount`)
        .then(discount => {
          setSuggestion(discount.data.discount)
          setLoading(false)
        })
        .catch(err => console.error(err))
    }
  }, [])//daca props.type === daily afiseaza produsul zile, altfel afiseaza produsul cu cel mai mare discount




  return (
    <>
      {loading ? (
        <div className='suggestion'>
          {type === 'daily' ? (
            <div className='sugg-title'>{t('Fav.Produsul zilei')}</div>
          ) : (
            <div className='sugg-title'>{t('Fav.Top reducere')}</div>
          )}
          <div className='main-cloth-div'></div>
        </div>
      ) : (
        <div className='suggestion'>
          {type === 'daily' ? (
            <div className='sugg-title'>{t('Fav.Produsul zilei')}</div>
          ) : (
            <div className='sugg-title'>{t('Fav.Top reducere')}</div>
          )}
          <div className='main-cloth-div'>
            <Product product={suggestion} />
          </div>
          <img src={suggestion.photo} alt='Poza' className='sugg-photo-bg' />
        </div>
      )}
    </>
  )
}


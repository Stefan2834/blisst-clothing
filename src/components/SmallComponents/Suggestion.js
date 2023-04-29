import React, { useState, useLayoutEffect } from 'react'
import '../css/suggestion.css'
import axios from 'axios'
import Product from './Product'
import { useAuth } from '../../contexts/AuthContext'

export default function Suggestion(props) {
  const type = props.type
  const [suggestion, setSuggestion] = useState({})
  const [loading, setLoading] = useState(true)
  const { server, product } = useAuth()

  //componentul pentru afisare produsul zilei sau top reducere

  useLayoutEffect(() => {
    if (type === 'daily') {
      axios.get(`${server}/suggestion/daily`)
        .then(daily => {
          const id = daily.data.data
          setSuggestion(product.find(p => p.id === id))
          setLoading(false)
        })
        .catch(err => console.log(err))
    } else if (type === 'discount') {
      const discount = product.reduce((prev, current) => {
        if (current.discount > prev.discount) {
          return current;
        } else {
          return prev;
        }
      })
      setSuggestion(discount)
      setLoading(false)
    }
  }, [])//daca props.type === daily afiseaza produsul zile, altfel afiseaza produsul cu cel mai mare discount




  return (
    <>
      {loading ? (
        <div className='suggestion'>
          {type === 'daily' ? (
            <div className='sugg-title'>Produsul Zilei</div>
          ) : (
            <div className='sugg-title'>Top reducere</div>
          )}
        </div>
      ) : (
        <div className='suggestion'>
          {type === 'daily' ? (
            <div className='sugg-title'>Produsul Zilei</div>
          ) : (
            <div className='sugg-title'>Top reducere</div>
          )}
          <Product product={suggestion} />
          <img src={suggestion.photo} alt='Poza' className='sugg-photo-bg' />
        </div>
      )}
    </>
  )
}


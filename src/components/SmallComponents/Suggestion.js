import React, { useState, useLayoutEffect } from 'react'
import '../css/suggestion.css'
import axios from 'axios'
import Product from './Product'
import { useAuth } from '../../contexts/AuthContext'

export default function Suggestion(props) {
  const [type] = useState(props.type)
  const [suggestion, setSuggestion] = useState({})
  const [loading, setLoading] = useState(true)
  const { server, product } = useAuth()

  //componentul pentru afisare produsul zilei sau top reducere

  useLayoutEffect(() => {
    if (type === 'daily') {
      axios.get(`${server}/suggestion/daily`)
        .then(daily => {
          setSuggestion(daily.data.data)
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
        <div className='suggestion bg-slate-600'>
          {type === 'daily' ? (
            <div className='sugg-title'>Produsul Zilei</div>
          ) : (
            <div className='sugg-title'>Top reducere</div>
          )}
        </div>
      ) : (
        <div className='suggestion' style={{ backgroundImage: `url(${suggestion.photo})` }}>
          {type === 'daily' ? (
            <div className='sugg-title'>Produsul Zilei</div>
          ) : (
            <div className='sugg-title'>Top reducere</div>
          )}
          <Product product={suggestion} />
        </div>
      )}
    </>
  )
}


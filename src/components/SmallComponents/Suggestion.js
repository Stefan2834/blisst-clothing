import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/suggestion.css'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'

export default function Suggestion(props) {
  const [type, setType] = useState(props.type)
  const [suggestion, setSuggestion] = useState({})
  const {
    currentUser,
    favorite, dispatchFav,
    server, product,
  } = useAuth()


  useEffect(() => {
    if (type === 'daily') {
      axios.get(`${server}/suggestion/daily`)
        .then(daily => {
          setSuggestion(daily.data.data)
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
    }
  }, [])




  return (
    <>
      <div className='suggestion' style={{ backgroundImage: `url(${suggestion.photo})` }}>
        {type === 'daily' ? (
          <div className='sugg-title'>Produsul Zilei</div>
        ) : (
          <div className='sugg-title'>Top reducere</div>
        )}
        <div className='sugg-div'>
          <Link to={`/product/${suggestion.id}`}>
            <div className="sugg-photo">
              <div style={{ backgroundImage: `url(${suggestion.photo})` }} className="sugg-img" />
            </div>
          </Link>
          <div className={suggestion.sex === 'man' ? 'sugg-det sugg-grad-man' : 'sugg-det sugg-grad-woman'}>
            <Link to={`/product/${suggestion.id}`}>
              <div className="sugg-left">
                <div className="sugg-name">
                  {suggestion.nume}
                </div>
                <div className="sugg-price">
                  {suggestion.discount > 0 ? (
                    <>
                      <div className="sugg-price-flex">
                        <div className="sugg-price-old">{suggestion.price}
                          <span className="sugg-span">Lei</span>
                        </div>
                        <span className="sugg-price"> - {suggestion.discount * 100} %</span>
                      </div>
                      <div className="sugg-price-new text-red-600">{suggestion.price + 0.01 - ((suggestion.price + 0.01) * suggestion.discount) - 0.01}
                        <span className="sugg-span text-red-600">Lei</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {suggestion.price} <span className="sugg-span">Lei</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
            <div className="sugg-right">
              {favorite.some(item => item.id === suggestion.id) ? (
                <div className="sugg-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: suggestion } })} />
              ) : (
                <div className="sugg-fav" onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: suggestion, user: currentUser } })} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


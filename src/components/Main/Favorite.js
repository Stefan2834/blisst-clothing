import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Suggestion from "./Layout/Suggestion";
import { Link, useNavigate } from 'react-router-dom';
import './css/cart.css'

export default function Favorite() {
  const { favorite, dispatchFav, currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Blisst — Favorite'
    if(favorite.length === 0) {
      navigate('/main')
    }
  }, [favorite])
  return (
    <div className='fav-div'>
      <Suggestion type={'daily'} />
      <div className='fav-center'>
        {favorite.map((product) => {
          return (
            <div className='sugg-div'>
              <Link to={`/product/${product.id}`}>
                <div className="sugg-photo">
                  <img src={product.photo} alt='Poza produs' className="sugg-img" />
                </div>
              </Link>
              <div className={product.sex === 'man' ? 'sugg-det sugg-grad-man' : 'sugg-det sugg-grad-woman'}>
                <Link to={`/product/${product.id}`}>
                  <div className="sugg-left">
                    <div className="sugg-name">
                      {product.nume}
                    </div>
                    <div className="sugg-price">
                      {product.discount > 0 ? (
                        <>
                          <div className="sugg-price-flex">
                            <div className="sugg-price-old">{product.price}
                              <span className="sugg-span">Lei</span>
                            </div>
                            <span className="sugg-price"> - {product.discount * 100} %</span>
                          </div>
                          <div className="sugg-price-new text-red-600">{product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01}
                            <span className="sugg-span text-red-600">Lei</span>
                          </div>
                        </>
                      ) : (
                        <>
                          {product.price} <span className="sugg-span">Lei</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="sugg-right">
                  {favorite.some(item => item.id === product.id) ? (
                    <div className="sugg-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: product } })} />
                  ) : (
                    <div className="sugg-fav" onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: product, user: currentUser } })} />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <Suggestion type={'discount'} />
    </div>
  )
}

import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { useDefault } from '../../contexts/DefaultContext'
import Confetti from 'react-confetti';


export default function Product(props) {
  const product = props.product
  const { favorite, dispatchFav, currentUser } = useAuth()
  const { t } = useDefault()
  const [confetti, setConfetti] = useState(false)

  //ca sa nu existe prea multe lini de cod degeaba, am creat un component care apare 
  //pentru fiecare produs din favorite, paginile cu haine,
  //produsul zilei si top reducere

  return (
    <div className='cloth-div'>
      <Link to={`/product/${product.id}`}>
        <div className="cloth-photo">
          <img src={product.photo} className="cloth-img" />
        </div>
      </Link>
      <div className={product.sex === 'man' ? 'cloth-det cloth-grad-man' : 'cloth-det cloth-grad-woman'}>
        <Link to={`/product/${product.id}`}>
          <div className="cloth-left">
            <div className="cloth-name">
              {product.name}
            </div>
            <div className="cloth-price">
              {product.discount > 0 ? (
                <>
                  <div className="cloth-price-flex">
                    <div className="cloth-price-old">{product.price}
                      <span className="cloth-span">Lei</span>
                    </div>
                    <span className="cloth-price"> - {(product.discount * 100).toFixed(0)} %</span>
                  </div>
                  <div className="cloth-price-new text-red-600">{(product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01).toFixed(2)}
                    <span className="cloth-span text-red-600">Lei</span>
                  </div>
                </>
              ) : (
                <>
                  {product.price} <span className="cloth-span">Lei</span>
                </>
              )}
            </div>
          </div>
        </Link>
        <div className="cloth-right">
          {favorite.some(item => item.id === product.id) ? (
            <>
              <Confetti width={60} height={60} recycle={false} gravity={0.3} />
              <div className="cloth-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: product } })} />
            </>
          ) : (
            <div className="cloth-fav" onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: product, user: currentUser, t: t } })} />
          )}
          <div className="flex items-center justify-center">
            <FaStar size={16} className='principal' />
            {product.star.total === 0 ? (
              <span className='font-medium text-sm'>0.00</span>
            ) : (
              <span className="font-medium text-sm">{(product.star.total / product.star.nr).toFixed(2)}</span>
            )}
            <span className="font-light text-sm">({product.star.nr})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

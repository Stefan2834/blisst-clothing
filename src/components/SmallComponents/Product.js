import React from 'react'
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';



export default function Product(props) {
  const product = props.product
  const { favorite, dispatchFav, currentUser } = useAuth()

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
              {product.nume}
            </div>
            <div className="cloth-price">
              {product.discount > 0 ? (
                <>
                  <div className="cloth-price-flex">
                    <div className="cloth-price-old">{product.price}
                      <span className="cloth-span">Lei</span>
                    </div>
                    <span className="cloth-price"> - {product.discount * 100} %</span>
                  </div>
                  <div className="cloth-price-new text-red-600">{product.price + 0.01 - ((product.price + 0.01) * product.discount) - 0.01}
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
            <div className="cloth-removefav" onClick={() => dispatchFav({ type: 'favRemove', payload: { fav: product } })} />
          ) : (
            <div className="cloth-fav" onClick={() => dispatchFav({ type: 'favAdd', payload: { fav: product, user: currentUser } })} />
          )}
          <div className="flex items-start justify-center">
            <FaStar size={16} className='principal' />
            <span className="font-medium text-sm">{(product.star.total / product.star.nr).toFixed(2)}</span>
            <span className="font-light text-sm">({product.star.nr})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

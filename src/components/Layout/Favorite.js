import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import Suggestion from "../SmallComponents/Suggestion";
import { useNavigate } from 'react-router-dom';
import '../css/cart.css'
import Product from '../SmallComponents/Product';

export default function Favorite() {
  const { favorite } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `Blisst — Favorite (${favorite.length})`
    if (favorite.length === 0) {
      navigate('/main')
    }
  }, [favorite])//daca nu ai nimic la favorite, trimite-l pe pagina principala
  return (
    <div className='fav-div'>
      <Suggestion type={'daily'} />
      <div className='fav-center'>
        {favorite.map((product) => {
          return (
            <Product product={product} />
          )
        })}
      </div>
      <Suggestion type={'discount'} />
    </div>
  )
}

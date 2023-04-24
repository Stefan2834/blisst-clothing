import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRef } from 'react'
import { colors } from '../SmallComponents/Test'

export default function AdminProducs() {
  const { product } = useAuth()
  const [newProduct, setNewProduct] = useState({photos: []})
  const type = [
    'barbati top tricouri', 'barbati top bluze', 'barbati bottom scurti', 'barbati bottom lungi',
    'barbati foot adidasi', 'barbati foot papuci',
    'femei top tricouri', 'femei top bluze', 'femei bottom scurti', 'femei bottom lungi',
    'femei foot adidasi', 'femei foot papuci',
  ]
  const nameRef = useRef()
  const idRef = useRef()
  const priceRef = useRef()
  const discountRef = useRef()
  const specRef = useRef()

  return (
    <div className='adm-prod'>
      
    </div>
  )
}

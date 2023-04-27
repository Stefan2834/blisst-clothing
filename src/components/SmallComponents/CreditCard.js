import React from 'react'
import { useParams } from 'react-router-dom'

export default function CreditCard() {
  const { cardId } = useParams()
  console.log(cardId)
  return (
    <div>{cardId}</div>
  )
}

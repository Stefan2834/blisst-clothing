import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function CreditCard() {
  const { server, currentUser, cart, dispatchCart, dispatchCommand } = useAuth()
  const { cardId } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    const handleCommand = async () => {
      try {
        const commandData = { ...JSON.parse(cardId), product: cart }
        if (commandData.price.discount !== 0) {
          axios.post(`${server}/discountOnce`, { email: currentUser.email, code: commandData.price.code })
        }
        Swal.fire(
          'Comanda Plasata!',
          'Comanda a fost plasata.',
          'success'
        )
        axios.post(`${server}/commandUpdate`, {
          uid: currentUser.uid,
          command: commandData,
          cart: cart
        }
        ).then(info => {
          dispatchCart({ type: 'cartDeleteAll' })
          dispatchCommand({ type: 'commandAdd', payload: { command: commandData } })
          console.log(info);
          axios.post(`${server}/email/command`,
            {
              email: currentUser.email,
              name: commandData.details.name,
              price: commandData.price.total
            }).then((data) => {
              console.log(data)
            }).catch(err => {
              console.log(err)
            })
        })
          .catch(err => console.error(err.error))
      } catch (err) {
        console.log(err)
      }
      navigate('/main/command', { replace: true })
    }
    handleCommand()
  }, [])


  return (
    <></>
  )
}

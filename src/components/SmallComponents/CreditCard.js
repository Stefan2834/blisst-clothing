import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useDefault } from '../../contexts/DefaultContext'

export default function CreditCard() {
  const { server, currentUser, cart, dispatchCart, dispatchOrder, setProduct } = useAuth()
  const { t } = useDefault()
  const { cardId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Blisst'
    const handleOrder = async () => {
      try {
        const orderData = { ...JSON.parse(cardId), product: cart }
        if (orderData.price.discount !== 0) {
          axios.post(`${server}/discountOnce`, { email: currentUser.email, code: orderData.price.code })
        }
        Swal.fire(
          t('Check.Comandă plasată'),
          t('Check.Comanda a fost plasată.'),
          'success'
        )
        axios.post(`${server}/orderUpdate`, {
          uid: currentUser.uid,
          order: orderData,
          cart: cart
        }
        ).then(async info => {
          console.log(info)
          dispatchCart({ type: 'cartDeleteAll' })
          dispatchOrder({ type: 'orderGet', payload: { order: orderData } })
          axios.post(`${server}/email/order`,
            {
              email: currentUser.email,
              price: orderData.price.total
            }).then((data) => {
              console.log(data)
            }).catch(err => {
              console.log(err)
            })
        })
          .catch(err => console.error(err))
      } catch (err) {
        console.error(err)
      }
      navigate('/main/orders', { replace: true })
    }
    handleOrder()
  }, [])


  return (
    <></>
  )
}

import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import { Product, Product1 } from './Import';
import Ban from '../components/SmallComponents/Ban'
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext)
}

export default function Reducer(state, action) {
  switch (action.type) {
    case ('cartNr'):
      return { ...state, number: action.payload.number }
    case ('cartReset'):
      return { ...state, number: 1 }
    case ('setSize'):
      return { ...state, size: action.payload.size }
    case ('cartGet'):
      return action.payload.cart
    case ('cartAdd'):
      if (state.some(item => item.id === action.payload.clothing.id && item.selectedSize === action.payload.spec.size)) {
        const updatedCart = state.map(cartMap => {
          if (cartMap.id === action.payload.clothing.id && cartMap.selectedSize === action.payload.spec.size) {
            if (cartMap.number + action.payload.spec.number > action.payload.clothing.size[cartMap.selectedSize]) {
              return { ...cartMap, number: action.payload.clothing.size[cartMap.selectedSize] }
            } else if (cartMap.number + action.payload.spec.number <= 10) {
              return { ...cartMap, number: cartMap.number + action.payload.spec.number }
            } else {
              return { ...cartMap, number: 10 }
            }
          } else {
            return cartMap
          }
        })
        return updatedCart
      } else {
        return [...state, { ...action.payload.clothing, selectedSize: action.payload.spec.size, number: action.payload.spec.number }]
      }
    case ('cartRemove'):
      return state.filter(cart => cart.id !== action.payload.cart.id || cart.selectedSize !== action.payload.cart.selectedSize)
    case ('cartNrChange'):
      const updatedNr = state.map(cartMap => {
        if (cartMap.id === action.payload.product.id && cartMap.selectedSize === action.payload.product.selectedSize) {
          return { ...cartMap, number: action.payload.number }
        } else {
          return cartMap
        }
      })
      return updatedNr
    case ('cartUpdate'):
      return state.map(cart => {
        const selectedProduct = action.payload.product.find(product => product.id === cart.id);
        if (selectedProduct.size[cart.selectedSize] === 0) {
          return null
        } else if (cart.number > selectedProduct.size[cart.selectedSize]) {
          return {
            ...cart, number: selectedProduct.size[cart.selectedSize],
            size: {
              ...cart.size, [cart.selectedSize]: selectedProduct.size[cart.selectedSize]
            }
          }
        }
        return { ...cart }
      }).filter(cart => cart !== null)
    case ('cartDeleteAll'):
      return []
    case ('favGet'):
      return action.payload.fav
    case ('favAdd'):
      const t = action.payload.t
      if (!action.payload.user) {
        Swal.fire({
          title: t('Fav.Nu ești conectat!'),
          text: t("Fav.Trebuie să te conectezi pentru această acțiune."),
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: t('Fav.Înapoi'),
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: t('Fav.Conectează-te')
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/connect'
          }
        })
        return []
      } else {
        return [...state, action.payload.fav]
      }
    case ('favRemove'):
      return state.filter(fav => fav.id !== action.payload.fav.id)
    case ('orderGet'):
      return action.payload.order
    case ('orderAdd'):
      return [...state, action.payload.order]
    case ('deleteState'):
      return []
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [product, setProduct] = useState(
    []
    // Product
    // Product1
  )
  const { t } = useTranslation()
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const server = "https://blisst.onrender.com"
  // const server = 'http://localhost:9000'
  const [admin, setAdmin] = useState(false)
  const [ban, setBan] = useState()
  const [showMessage, setShowMessage] = useState(false)
  const [det, setDet] = useState({ info: '', tel: '', email: '', name: '', type: '', county: '', newsLetter: false, color: '' })
  const [favorite, dispatchFav] = useReducer(Reducer, [])
  const [cart, dispatchCart] = useReducer(Reducer, [])
  const [order, dispatchOrder] = useReducer(Reducer, [])
  const [collections, setCollections] = useState([])
  const navigate = useNavigate()

  const getUserData = async (email, uid, product) => {
    await axios.post(`${server}/user/info`, { uid: uid, email: email })
      .then(info => {
        if (info.data.success) {
          console.log(info.data.data)
          dispatchFav({ type: 'favGet', payload: { fav: info.data.data.fav } })
          dispatchCart({ type: 'cartGet', payload: { cart: info.data.data.cart } })
          dispatchCart({ type: 'cartUpdate', payload: { product: product } })
          dispatchOrder({ type: 'orderGet', payload: { order: info.data.data.order } })
          setDet(info.data.data.det);
          setAdmin(info.data.admin)
          document.documentElement.style.setProperty("--principal", info.data.data.det.color)
        } else if (info.data.ban) {
          setBan(info.data.reason)
        }
        console.log(info)
      })
      .catch(err => {
        console.error(err.error)
      })
  }

  const getData = async () => {
    const product = await axios.get(`${server}/product`)
    if (product.data.success) {
      setProduct(product.data.product)
      setCollections(product.data.collections)
    }
    const connect = await axios.get(`${server}/connect/admin`)
    if (connect.data.success) {
      if (Cookies.get('userData')) {
        const user = JSON.parse(Cookies.get('userData'));
        console.log(user)
        setCurrentUser(user)
        await getUserData(user.email, user.uid, product.data.product)
      } else {
        navigate('/connect')
      }
    }
    setLoading(false)
  }
  const postProduct = () => {
    axios.post(`${server}/user/product`, {
      product: product,
    })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    setTimeout(() => {
      setShowMessage(true);
    }, 1000)
    getData()
    // postProduct()
  }, [])

  useEffect(() => {
    if (currentUser) {
      axios.post(`${server}/user/favorite/add`, {
        favorite: favorite,
        uid: currentUser.uid
      })
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
  }, [favorite])

  useEffect(() => {
    if (currentUser) {
      axios.post(`${server}/user/cart/add`, {
        cart: cart,
        uid: currentUser.uid
      })
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
  }, [cart])

  useEffect(() => {
    if (currentUser) {
      axios.post(`${server}/user/order/add`, {
        order: order,
        uid: currentUser.uid,
      })
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
  }, [order])


  const value = {
    currentUser, setCurrentUser,
    cart, dispatchCart,
    favorite, dispatchFav,
    loading, setLoading,
    server, product, setProduct,
    order, dispatchOrder,
    getUserData,
    det, setDet,
    admin, setAdmin,
    collections, setCollections
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <>
          {showMessage && (
            <div className='auth-loading'>
              {t('Main.Servărul pornește. Asta durează între 10 și 60 de secunde')}
            </div>
          )}
        </>
      ) : ban ? (
        <Ban t={t} ban={ban} setBan={setBan} />
      ) : children
      }
    </AuthContext.Provider>
  )
}

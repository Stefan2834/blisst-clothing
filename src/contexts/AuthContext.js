import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import manTshirtBlack from '../clothing/man/barbati-shirt.jpg'
import bluza from '../clothing/man/bluza.jpg'
import tricouGalben from '../clothing/man/bluza-galbena.jpg'
import hanoracAlb from '../clothing/man/hanorac-alb.jpg'
import hanoracGalben from '../clothing/man/hanorac-galbne.jpg'
import hanoracNegru from '../clothing/man/hanorac-negru.jpg'
import hanoracRosu from '../clothing/man/hanorac-rosu.jpg'
import tricouAlb from '../clothing/man/tricou-alb.jpg'
import tricouGri from '../clothing/man/tricou-negru.jpg'
import tricouBlisst from '../clothing/man/tricouBlisst3.jpg'

export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext)
}

export default function Reducer(state, action) {
  switch (action.type) {
    case ('cartNr'):
      return { ...state, number: action.payload.number }
    case ('cartReset'):
      return { ...state, number: '' }
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
      if (!action.payload.user) {
        Swal.fire({
          title: 'Eroare',
          text: "Nu esti conectat",
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Inapoi'
        })
      } else {
        return [...state, action.payload.fav]
      }
    case ('favRemove'):
      return state.filter(fav => fav.id !== action.payload.fav.id)
    case ('commandGet'):
      return action.payload.command
    case ('commandAdd'):
      return [action.payload.command, ...state]
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [product, setProduct] = useState([{
    nume: 'Tricou Negru',
    price: 29.99,
    discount: 0.2,
    photo: manTshirtBlack,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    ],
    star: { total: 21, nr: 7 },
    size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: 'xy'
  }, {
    nume: 'Tricou Albastru',
    price: 29.99,
    discount: 0.4,
    photo: tricouGri,
    sex: 'man',
    type: 'barbati foot adidasi',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { 37: 0, 38: 4, 39: 6, 40: 11, 41: 2, 42: 9, 43: 10, 44: 0, },
    id: '1'
  }, {
    nume: 'Bluza Dungi',
    price: 79.99,
    discount: 0,
    photo: bluza,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 9, XL: 0, XXL: 4 },
    id: '2'
  }, {
    nume: 'Tricou Pac Man',
    price: 49.99,
    discount: 0.2,
    photo: tricouGalben,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 9, XL: 1, XXL: 4 },
    id: '3'
  }, {
    nume: 'Hanorac Alb',
    price: 149.99,
    discount: 0.5,
    photo: hanoracAlb,
    sex: 'woman',
    type: 'femei top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '4'
  }, {
    nume: 'Hanorac Galben',
    price: 99.99,
    discount: 0.1,
    photo: hanoracGalben,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '5'
  }, {
    nume: 'Hanorac Negru',
    price: 129.99,
    discount: 0,
    photo: hanoracNegru,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 0, XL: 1, XXL: 4 },
    id: '6'
  }, {
    nume: 'Hanorac Rosu',
    price: 89.99,
    discount: 0,
    photo: hanoracRosu,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '7'
  }, {
    nume: 'Tricou Alb',
    price: 49.99,
    discount: 0,
    photo: tricouAlb,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    id: '8'
  }, {
    nume: 'Tricou Blisst alb',
    price: 99.99,
    discount: 0.1,
    photo: tricouBlisst,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    ],
    star: { total: 21, nr: 7 },
    size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '9'
  }, {
    nume: 'Tricou Negru',
    price: 29.99,
    discount: 0.2,
    photo: manTshirtBlack,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    ],
    star: { total: 21, nr: 7 },
    size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '0'
  }, {
    nume: 'Tricou Albastru',
    price: 29.99,
    discount: 0.4,
    photo: tricouGri,
    sex: 'man',
    type: 'barbati foot adidasi',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { 37: 0, 38: 4, 39: 6, 40: 11, 41: 2, 42: 9, 43: 10, 44: 0, },
    id: '1'
  }, {
    nume: 'Bluza Dungi',
    price: 79.99,
    discount: 0,
    photo: bluza,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 9, XL: 0, XXL: 4 },
    id: '2'
  }, {
    nume: 'Tricou Pac Man',
    price: 49.99,
    discount: 0.2,
    photo: tricouGalben,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 9, XL: 1, XXL: 4 },
    id: '3'
  }, {
    nume: 'Hanorac Alb',
    price: 149.99,
    discount: 0.5,
    photo: hanoracAlb,
    sex: 'woman',
    type: 'femei top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '4'
  }, {
    nume: 'Hanorac Galben',
    price: 99.99,
    discount: 0.1,
    photo: hanoracGalben,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '5'
  }, {
    nume: 'Hanorac Negru',
    price: 129.99,
    discount: 0,
    photo: hanoracNegru,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 0, XL: 1, XXL: 4 },
    id: '6'
  }, {
    nume: 'Hanorac Rosu',
    price: 89.99,
    discount: 0,
    photo: hanoracRosu,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '7'
  }, {
    nume: 'Tricou Alb',
    price: 49.99,
    discount: 0,
    photo: tricouAlb,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    id: '8'
  }, {
    nume: 'Tricou Blisst alb',
    price: 99.99,
    discount: 0.1,
    photo: tricouBlisst,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    ],
    star: { total: 21, nr: 7 },
    size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '9'
  }, {
    nume: 'Tricou Negru',
    price: 29.99,
    discount: 0.2,
    photo: manTshirtBlack,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    ],
    star: { total: 21, nr: 7 },
    size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '0'
  }, {
    nume: 'Tricou Albastru',
    price: 29.99,
    discount: 0.4,
    photo: tricouGri,
    sex: 'man',
    type: 'barbati foot adidasi',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { 37: 0, 38: 4, 39: 6, 40: 11, 41: 2, 42: 9, 43: 10, 44: 0, },
    id: '1'
  }, {
    nume: 'Bluza Dungi',
    price: 79.99,
    discount: 0,
    photo: bluza,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 9, XL: 0, XXL: 4 },
    id: '2'
  }, {
    nume: 'Tricou Pac Man',
    price: 49.99,
    discount: 0.2,
    photo: tricouGalben,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 9, XL: 1, XXL: 4 },
    id: '3'
  }, {
    nume: 'Hanorac Alb',
    price: 149.99,
    discount: 0.5,
    photo: hanoracAlb,
    sex: 'woman',
    type: 'femei top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '4'
  }, {
    nume: 'Hanorac Galben',
    price: 99.99,
    discount: 0.1,
    photo: hanoracGalben,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '5'
  }, {
    nume: 'Hanorac Negru',
    price: 129.99,
    discount: 0,
    photo: hanoracNegru,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 0, XL: 1, XXL: 4 },
    id: '6'
  }, {
    nume: 'Hanorac Rosu',
    price: 89.99,
    discount: 0,
    photo: hanoracRosu,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '7'
  }, {
    nume: 'Tricou Alb',
    price: 49.99,
    discount: 0,
    photo: tricouAlb,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    id: '8'
  }, {
    nume: 'Tricou Blisst alb',
    price: 99.99,
    discount: 0.1,
    photo: tricouBlisst,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    ],
    star: { total: 21, nr: 7 },
    size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '9'
  }, {
    nume: 'Tricou Negru',
    price: 29.99,
    discount: 0.2,
    photo: manTshirtBlack,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    ],
    star: { total: 21, nr: 7 },
    size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '0'
  }, {
    nume: 'Tricou Albastru',
    price: 29.99,
    discount: 0.4,
    photo: tricouGri,
    sex: 'man',
    type: 'barbati foot adidasi',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { 37: 0, 38: 4, 39: 6, 40: 11, 41: 2, 42: 9, 43: 10, 44: 0, },
    id: '1'
  }, {
    nume: 'Bluza Dungi',
    price: 79.99,
    discount: 0,
    photo: bluza,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 9, XL: 0, XXL: 4 },
    id: '2'
  }, {
    nume: 'Tricou Pac Man',
    price: 49.99,
    discount: 0.2,
    photo: tricouGalben,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 9, XL: 1, XXL: 4 },
    id: '3'
  }, {
    nume: 'Hanorac Alb',
    price: 149.99,
    discount: 0.5,
    photo: hanoracAlb,
    sex: 'woman',
    type: 'femei top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '4'
  }, {
    nume: 'Hanorac Galben',
    price: 99.99,
    discount: 0.1,
    photo: hanoracGalben,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '5'
  }, {
    nume: 'Hanorac Negru',
    price: 129.99,
    discount: 0,
    photo: hanoracNegru,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 0, L: 0, XL: 1, XXL: 4 },
    id: '6'
  }, {
    nume: 'Hanorac Rosu',
    price: 89.99,
    discount: 0,
    photo: hanoracRosu,
    sex: 'man',
    type: 'barbati top bluze',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '7'
  }, {
    nume: 'Tricou Alb',
    price: 49.99,
    discount: 0,
    photo: tricouAlb,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    id: '8'
  }, {
    nume: 'Tricou Blisst alb',
    price: 99.99,
    discount: 0.1,
    photo: tricouBlisst,
    sex: 'man',
    type: 'barbati top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    ],
    star: { total: 21, nr: 7 },
    size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '9'
  }])
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const server = "https://clothing-shop2834.herokuapp.com"
  // const server = 'http://localhost:9000'
  const [favorite, dispatchFav] = useReducer(Reducer, [])
  const [cart, dispatchCart] = useReducer(Reducer, [])
  const [command, dispatchCommand] = useReducer(Reducer, [])
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
    size: '',
    sort: ''
  })

  const getUserData = async uid => {
    await axios.post(`${server}/user/favorite/get`, { uid: uid })
      .then(data => {
        if (data.data.fav) {
          dispatchFav({ type: 'favGet', payload: { fav: data.data.fav } })
        }
      }).catch(err => console.error(err))
    await axios.post(`${server}/user/cart/get`, { uid: uid })
      .then(data => {
        if (data.data.cart) {
          dispatchCart({ type: 'cartGet', payload: { cart: data.data.cart } })
          dispatchCart({ type: 'cartUpdate', payload: { product: product } })
        }
      }).catch(err => console.error(err))
    await axios.post(`${server}/user/command/get`, { uid: uid })
      .then(data => {
        if (data.data.command) {
          dispatchCommand({ type: 'commandGet', payload: { command: data.data.command } })
        }
      }).catch(err => console.error(err))
    setLoading(false)
  }

  useEffect(() => {
    axios.get(`${server}/connect`)
      .then(data => {
        console.log(data)
        if (data.data.success) {
          if (Cookies.get('userData')) {
            const user = JSON.parse(Cookies.get('userData'));
            setCurrentUser(user)
            getUserData(user.uid)
          }
        } else {
        }
      })
      .catch(err => {
        console.log(err)
      })
    setLoading(false)
    // setLoading(false);
    // axios.post(`${server}/user/product`, {
    //   product: product
    // })
    //   .then(data => console.log(data))
    //   .catch(err => console.log(err))
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
      axios.post(`${server}/user/command/add`, {
        command: command,
        uid: currentUser.uid
      })
        .then(data => console.log(data))
        .catch(err => console.error(err))
    }
  }, [command])


  const value = {
    currentUser, setCurrentUser,
    cart, dispatchCart,
    favorite, dispatchFav,
    loading, setLoading,
    server, product, setProduct,
    filter, setFilter,
    command, dispatchCommand,
    getUserData,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import manTshirtBlack from '../clothing/man/barbati-shirt.jpg'
import bluza from '../clothing/man/bluza.jpg'
import tricouGalben from '../clothing/man/bluza-galbena.jpg'
import hanoracAlb from '../clothing/man/hanorac-alb.jpg'
import hanoracGalben from '../clothing/man/hanorac-galbne.jpg'
import hanoracNegru from '../clothing/man/hanorac-negru.jpg'
import hanoracRosu from '../clothing/man/hanorac-rosu.jpg'
import tricouAlb from '../clothing/man/tricou-alb.jpg'
import tricouGri from '../clothing/man/tricou-negru.jpg'
import axios from 'axios';

export const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext)
}

export default function Reducer(state, action) {
  switch (action.type) {
    case ('increase'):
      const increaseNr = state.number + 1;
      const stoc = action.payload.stoc;
      if (increaseNr > stoc) {
        return { ...state, number: stoc }
      } else {
        return { ...state, number: increaseNr > 10 ? 10 : increaseNr };
      }
    case ('decrease'):
      const decreaseNr = state.number - 1;
      return { ...state, number: decreaseNr < 1 ? 1 : decreaseNr }
    case ('restart'):
      return { ...state, number: 1 }
    case ('setSize'):
      return { ...state, size: action.payload.size }
    case ('cartGet'):
      return action.payload.cart
    case ('cartAdd'):
      if (!action.payload.user) {
        alert('Nu esti conectat!')
        return state
      } else {
        if (action.payload.spec.size === '') {
          alert('Selecteaza o marime!')
          return state
        } else if (state.some(item => item.id === action.payload.clothing.id && item.selectedSize === action.payload.spec.size)) {
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
      }
    case ('cartRemove'):
      return state.filter(cart => cart.id !== action.payload.cart.id || cart.selectedSize !== action.payload.cart.selectedSize)
    case ('cartNrChange'):
      const updatedNr = state.map(cartMap => {
        if (cartMap.id === action.payload.product.id && cartMap.selectedSize === action.payload.product.selectedSize) {
          if (action.payload.number > action.payload.product.size[action.payload.product.selectedSize]) {
            return { ...cartMap, number: action.payload.product.size[cartMap.selectedSize] }
          } else if (action.payload.number <= 10 && action.payload.number > 0) {
            return { ...cartMap, number: action.payload.number }
          } else if (action.payload.number === 0) {
            return null
          } else {
            return { ...cartMap, number: 10 }
          }
        } else {
          return cartMap
        }
      }).filter(cartMap => cartMap !== null);
      return updatedNr
    case ('favGet'):
      return action.payload.fav
    case ('favAdd'):
      if (!action.payload.user) {
        alert('Nu esti conectat')
      } else {
        return [...state, action.payload.fav]
      }
    case ('favRemove'):
      return state.filter(fav => fav.id !== action.payload.fav.id)
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [det, setDet] = useState({ info: '', tel: '', email: '', name: '' })
  // const server = process.env.REACT_APP_SERVER
  // const server = 'http://localhost:9000'
  const server = "https://wonderful-llama-9952d3.netlify.app/"
  const [favorite, dispatchFav] = useReducer(Reducer, [])
  const [cart, dispatchCart] = useReducer(Reducer, [])
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
    size: '',
    sort: ''
  })
  const [product, setProduct] = useState([{
    nume: 'Tricou Negru',
    price: 29.99,
    discount: 0.2,
    photo: manTshirtBlack,
    sex: 'man',
    type: 'man top tricouri',
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
    size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '0'
  }, {
    nume: 'Tricou Albastru',
    price: 29.99,
    discount: 0.4,
    photo: tricouGri,
    sex: 'man',
    type: 'man foot adidasi',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '1'
  }, {
    nume: 'Bluza Dungi',
    price: 79.99,
    discount: 0,
    photo: bluza,
    sex: 'man',
    type: 'man top bluze',
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
    type: 'man top tricouri',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    id: '8'
  }, {
    nume: 'Tricou Negru',
    price: 29.99,
    discount: 0.2,
    photo: manTshirtBlack,
    sex: 'man',
    type: 'man top tricouri',
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
    size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '0'
  }, {
    nume: 'Tricou Albastru',
    price: 29.99,
    discount: 0.4,
    photo: tricouGri,
    sex: 'man',
    type: 'man foot adidasi',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '1'
  }, {
    nume: 'Bluza Dungi',
    price: 79.99,
    discount: 0,
    photo: bluza,
    sex: 'man',
    type: 'man top bluze',
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
    type: 'man top tricouri',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    id: '8'
  }, {
    nume: 'Tricou Negru',
    price: 29.99,
    discount: 0.2,
    photo: manTshirtBlack,
    sex: 'man',
    type: 'man top tricouri',
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
    size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '0'
  }, {
    nume: 'Tricou Albastru',
    price: 29.99,
    discount: 0.4,
    photo: tricouGri,
    sex: 'man',
    type: 'man foot adidasi',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '1'
  }, {
    nume: 'Bluza Dungi',
    price: 79.99,
    discount: 0,
    photo: bluza,
    sex: 'man',
    type: 'man top bluze',
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
    type: 'man top tricouri',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    id: '8'
  }, {
    nume: 'Tricou Negru',
    price: 29.99,
    discount: 0.2,
    photo: manTshirtBlack,
    sex: 'man',
    type: 'man top tricouri',
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
    size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '0'
  }, {
    nume: 'Tricou Albastru',
    price: 29.99,
    discount: 0.4,
    photo: tricouGri,
    sex: 'man',
    type: 'man foot adidasi',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    id: '1'
  }, {
    nume: 'Bluza Dungi',
    price: 79.99,
    discount: 0,
    photo: bluza,
    sex: 'man',
    type: 'man top bluze',
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
    type: 'man top tricouri',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top bluze',
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
    type: 'man top tricouri',
    spec: 'Tricou negru din bumbac',
    review: [{ text: 'Produs impecabil', user: 'guticaLucian@gmail.com', anonim: false, star: 3 },
    { text: 'Din pacate produsul nu este precum cel din poza', user: 'domnuGuticaLucian@gmail.com', anonim: false, star: 3 }
    ],
    star: { total: 6, nr: 2 },
    size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    id: '8'
  }])

  const getUserData = uid => {
    axios.post(`${server}/user/favorite/get`, { uid: uid })
      .then(data => {
        if (data.data.fav) {
          dispatchFav({ type: 'favGet', payload: { fav: data.data.fav } })
        }
      }).catch(err => console.error(err))
    axios.post(`${server}/user/cart/get`, { uid: uid })
      .then(data => {
        if (data.data.cart) {
          dispatchCart({ type: 'cartGet', payload: { cart: data.data.cart } })
        }
      }).catch(err => console.error(err))
    axios.post(`${server}/user/info`, { uid: uid })
      .then(info => { setDet(info.data.det) })
      .catch(err => console.error(err.error))
  }

  useEffect(() => {
    axios.get(`${server}/connect`)
      .then(user => {
        setCurrentUser(user.data.user)
        console.log(user.data.user)
        if (user.data.user) {
          getUserData(user.data.user.uid)
        }
        setLoading(false)
      })
      .catch(err => console.error(err.error))
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
        .catch(err => console.log(err))
    }
  }, [cart])


  const value = {
    currentUser, setCurrentUser,
    cart, dispatchCart,
    favorite, dispatchFav,
    det, setDet,
    loading, setLoading,
    server, product, setProduct,
    filter, setFilter,
    getUserData
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

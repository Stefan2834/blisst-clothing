import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import blackTeeFront from '../clothing/man/black 1c1919/default tee front.png'
import blueTeeFront from '../clothing/man/blue 0091e5/default tee front.png'
import cyanTeeFront from '../clothing/man/cyan 00d2ff/default tee front.png'
import darkBlueTeeFront from '../clothing/man/dark blue 1200ff/default tee front.png'
import greenTeeFront from '../clothing/man/green 72ff00/default tee front.png'
import orangeTeeFront from '../clothing/man/orange fd6500/default tee front.png'
import pinkTeeFront from '../clothing/man/pink ff00f0/default tee front.png'
import purpleTeeFront from '../clothing/man/purple a200ff/default tee front.png'
import redTeeFront from '../clothing/man/red ea0000/default tee front.png'
import turqoiseTeeFront from '../clothing/man/turqoise 00ffd8/default tee front.png'
import whiteTeeFront from '../clothing/man/white fff/default tee front.png'
import yellowTeeFront from '../clothing/man/yellow fff600/default tee front.png'
import blackTeeBack from '../clothing/man/black 1c1919/default tee back.png'
import blueTeeBack from '../clothing/man/blue 0091e5/default tee back.png'
import cyanTeeBack from '../clothing/man/cyan 00d2ff/default tee back.png'
import darkBlueTeeBack from '../clothing/man/dark blue 1200ff/default tee back.png'
import greenTeeBack from '../clothing/man/green 72ff00/default tee back.png'
import orangeTeeBack from '../clothing/man/orange fd6500/default tee back.png'
import pinkTeeBack from '../clothing/man/pink ff00f0/default tee back.png'
import purpleTeeBack from '../clothing/man/purple a200ff/default tee back.png'
import redTeeBack from '../clothing/man/red ea0000/default tee back.png'
import turqoiseTeeBack from '../clothing/man/turqoise 00ffd8/default tee back.png'
import whiteTeeBack from '../clothing/man/white fff/default tee back.png'
import yellowTeeBack from '../clothing/man/yellow fff600/default tee back.png'

import blueHooFrontPatern from '../clothing/man/patern/frontBlue.png'
import blueHooBackPatern from '../clothing/man/patern/backBlue.png'
import blueHooLeftPatern from '../clothing/man/patern/leftBlue.png'
import blueHooRightPatern from '../clothing/man/patern/rightBlue.png'

import redHooFrontPatern from '../clothing/man/patern/frontRed.png'
import redHooBackPatern from '../clothing/man/patern/backRed.png'
import redHooLeftPatern from '../clothing/man/patern/leftRed.png'
import redHooRightPatern from '../clothing/man/patern/rightRed.png'

import yellowHooFrontPatern from '../clothing/man/patern/frontYellow.png'
import yellowHooBackPatern from '../clothing/man/patern/backYellow.png'
import yellowHooLeftPatern from '../clothing/man/patern/leftYellow.png'
import yellowHooRightPatern from '../clothing/man/patern/rightYellow.png'

import whiteHooFrontPatern from '../clothing/man/patern/frontWhite.png'
import whiteHooBackPatern from '../clothing/man/patern/backWhite.png'
import whiteHooLeftPatern from '../clothing/man/patern/leftWhite.png'
import whiteHooRightPatern from '../clothing/man/patern/rightWhite.png'

import greenHooFrontPatern from '../clothing/man/patern/frontGreen.png'
import greenHooBackPatern from '../clothing/man/patern/backGreen.png'
import greenHooLeftPatern from '../clothing/man/patern/leftGreen.png'
import greenHooRightPatern from '../clothing/man/patern/rightGreen.png'

import blueHooFront from '../clothing/man/blue 0091e5/default hoo front.png'
import blueHooBack from '../clothing/man/blue 0091e5/default hoo back.png'
import blueHooRight from '../clothing/man/blue 0091e5/default hoo right.png'
import blueHooLeft from '../clothing/man/blue 0091e5/default hoo left.png'

import cyanHooFront from '../clothing/man/cyan 00d2ff/default hoo front.png'
import cyanHooBack from '../clothing/man/cyan 00d2ff/default hoo back.png'
import cyanHooRight from '../clothing/man/cyan 00d2ff/default hoo right.png'
import cyanHooLeft from '../clothing/man/cyan 00d2ff/default hoo left.png'

import greenHooFront from '../clothing/man/green 72ff00/default hoo front.png'
import greenHooBack from '../clothing/man/green 72ff00/default hoo back.png'
import greenHooRight from '../clothing/man/green 72ff00/default hoo right.png'
import greenHooLeft from '../clothing/man/green 72ff00/default hoo left.png'

import orangeHooFront from '../clothing/man/orange fd6500/default hoo front.png'
import orangeHooBack from '../clothing/man/orange fd6500/default hoo back.png'
import orangeHooRight from '../clothing/man/orange fd6500/default hoo right.png'
import orangeHooLeft from '../clothing/man/orange fd6500/default hoo left.png'

import pinkHooFront from '../clothing/man/pink ff00f0/default hoo front.png'
import pinkHooBack from '../clothing/man/pink ff00f0/default hoo back.png'
import pinkHooRight from '../clothing/man/pink ff00f0/default hoo right.png'
import pinkHooLeft from '../clothing/man/pink ff00f0/default hoo left.png'

import purpleHooFront from '../clothing/man/purple a200ff/default hoo front.png'
import purpleHooBack from '../clothing/man/purple a200ff/default hoo back.png'
import purpleHooRight from '../clothing/man/purple a200ff/default hoo right.png'
import purpleHooLeft from '../clothing/man/purple a200ff/default hoo left.png'

import redHooFront from '../clothing/man/red ea0000/default hoo front.png'
import redHooBack from '../clothing/man/red ea0000/default hoo back.png'
import redHooRight from '../clothing/man/red ea0000/default hoo right.png'
import redHooLeft from '../clothing/man/red ea0000/default hoo left.png'

import turqoiseHooFront from '../clothing/man/turqoise 00ffd8/default hoo front.png'
import turqoiseHooBack from '../clothing/man/turqoise 00ffd8/default hoo back.png'
import turqoiseHooRight from '../clothing/man/turqoise 00ffd8/default hoo right.png'
import turqoiseHooLeft from '../clothing/man/turqoise 00ffd8/default hoo left.png'

import blackHooFront from '../clothing/man/black 1c1919/default hoo front.png'
import blackHooBack from '../clothing/man/black 1c1919/default hoo back.png'
import blackHooRight from '../clothing/man/black 1c1919/default hoo right.png'
import blackHooLeft from '../clothing/man/black 1c1919/default hoo left.png'

import yellowHooFront from '../clothing/man/yellow fff600/default hoo front.png'
import yellowHooBack from '../clothing/man/yellow fff600/default hoo back.png'
import yellowHooRight from '../clothing/man/yellow fff600/default hoo right.png'
import yellowHooLeft from '../clothing/man/yellow fff600/default hoo left.png'






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
      if (!action.payload.user) {
        Swal.fire({
          title: 'Nu esti conectat!',
          text: "Trebuie sa te conectezi pentru aceasta actiune.",
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Inapoi',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Conecteaza-te'
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
    case ('commandGet'):
      return action.payload.command
    case ('commandAdd'):
      return [...state, action.payload.command]
    case ('deleteState'):
      return []
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [product, setProduct] = useState(
    [
    // {
    //   a: {
    //     name: 'Tricou simplu',
    //     price: 29.99,
    //     discount: 0.2,
    //     photo: blackTeeFront,
    //     sliderPhoto: [blackTeeBack, blackTeeBack, blackTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#1c1919',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    //     id: 'a'
    //   }, b: {
    //     name: 'Tricou simplu',
    //     price: 29.99,
    //     discount: 0.4,
    //     photo: blueTeeFront,
    //     sliderPhoto: [blueTeeBack, blueTeeBack, blueTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#0091e5',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 0, M: 5, L: 10, XL: 2, XXL: 5 },
    //     id: 'b'
    //   }, c: {
    //     name: 'Tricou simplu',
    //     price: 79.99,
    //     discount: 0,
    //     photo: cyanTeeFront,
    //     sliderPhoto: [cyanTeeBack, cyanTeeBack, cyanTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#00d2ff',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 10, S: 5, M: 0, L: 9, XL: 0, XXL: 4 },
    //     id: 'c'
    //   }, d: {
    //     name: 'Tricou simplu',
    //     price: 49.99,
    //     discount: 0.2,
    //     photo: darkBlueTeeFront,
    //     sliderPhoto: [darkBlueTeeBack, darkBlueTeeBack, darkBlueTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#1200ff',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 10, S: 5, M: 0, L: 9, XL: 1, XXL: 4 },
    //     id: 'd'
    //   }, e: {
    //     name: 'Tricou simplu',
    //     price: 149.99,
    //     discount: 0.5,
    //     photo: greenTeeFront,
    //     sliderPhoto: [greenTeeBack, greenTeeBack, greenTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#72ff00',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 10, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    //     id: 'e'
    //   }, f: {
    //     name: 'Tricou simplu',
    //     price: 99.99,
    //     discount: 0.1,
    //     photo: orangeTeeFront,
    //     sliderPhoto: [orangeTeeBack, orangeTeeBack, orangeTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#fd6500',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 10, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    //     id: 'f'
    //   }, g: {
    //     name: 'Tricou simplu',
    //     price: 129.99,
    //     discount: 0,
    //     photo: pinkTeeFront,
    //     sliderPhoto: [pinkTeeBack, pinkTeeBack, pinkTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#ff00f0',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 10, S: 5, M: 0, L: 0, XL: 1, XXL: 4 },
    //     id: 'g'
    //   }, h: {
    //     name: 'Tricou simplu',
    //     price: 89.99,
    //     discount: 0,
    //     photo: purpleTeeFront,
    //     sliderPhoto: [purpleTeeBack, purpleTeeBack, purpleTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#a200ff',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 5, M: 4, L: 9, XL: 1, XXL: 4 },
    //     id: 'h'
    //   }, i: {
    //     name: 'Tricou simplu',
    //     price: 49.99,
    //     discount: 0,
    //     photo: redTeeFront,
    //     sliderPhoto: [redTeeBack, redTeeBack, redTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#ea0000',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 10, S: 5, M: 4, L: 9, XL: 0, XXL: 4 },
    //     id: 'i'
    //   }, j: {
    //     name: 'Tricou simplu',
    //     price: 99.99,
    //     discount: 0.1,
    //     photo: turqoiseTeeFront,
    //     sliderPhoto: [turqoiseTeeBack, turqoiseTeeBack, turqoiseTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#00ffd8',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    //     id: 'j'
    //   }, k: {
    //     name: 'Tricou simplu',
    //     price: 29.99,
    //     discount: 0.2,
    //     photo: whiteTeeFront,
    //     sliderPhoto: [whiteTeeBack, whiteTeeBack, whiteTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#eee',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 20, S: 0, M: 4, L: 9, XL: 1, XXL: 4 },
    //     id: 'k'
    //   }, l: {
    //     name: 'Tricou simplu',
    //     price: 29.99,
    //     discount: 0.4,
    //     photo: yellowTeeFront,
    //     sliderPhoto: [yellowTeeBack, yellowTeeBack, yellowTeeBack],
    //     sex: 'man',
    //     type: 'barbati top tricouri',
    //     color: '#fff600',
    //     spec: 'Tricou negru din bumbac',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 5, M: 0, L: 2, XL: 1, XXL: 9 },
    //     id: 'l'
    //   }, m: {
    //     name: 'Hanorac cu patern',
    //     price: 129.99,
    //     discount: 0,
    //     photo: blueHooFrontPatern,
    //     sliderPhoto: [blueHooBackPatern, blueHooLeftPatern, blueHooRightPatern],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#0091e5',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 5, M: 0, L: 0, XL: 7, XXL: 3 },
    //     id: 'm',
    //   }, n: {
    //     name: 'Hanorac cu patern',
    //     price: 129.99,
    //     discount: 0,
    //     photo: redHooFrontPatern,
    //     sliderPhoto: [redHooBackPatern, redHooLeftPatern, redHooRightPatern],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ea0000',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 5, M: 3, L: 1, XL: 7, XXL: 3 },
    //     id: 'n',
    //   }, o: {
    //     name: 'Hanorac cu patern',
    //     price: 129.99,
    //     discount: 0,
    //     photo: yellowHooFrontPatern,
    //     sliderPhoto: [yellowHooBackPatern, yellowHooLeftPatern, yellowHooRightPatern],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#fff600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 5, M: 0, L: 0, XL: 7, XXL: 3 },
    //     id: 'o',
    //   }, p: {
    //     name: 'Hanorac cu patern',
    //     price: 129.99,
    //     discount: 0,
    //     photo: whiteHooFrontPatern,
    //     sliderPhoto: [whiteHooBackPatern, whiteHooLeftPatern, whiteHooRightPatern],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#eee',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 2, M: 5, L: 6, XL: 7, XXL: 3 },
    //     id: 'p',
    //   }, q: {
    //     name: 'Hanorac cu patern',
    //     price: 129.99,
    //     discount: 0,
    //     photo: greenHooFrontPatern,
    //     sliderPhoto: [greenHooBackPatern, greenHooLeftPatern, greenHooRightPatern],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#72ff00',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 5, M: 2, L: 6, XL: 7, XXL: 3 },
    //     id: 'q',
    //   } , r: {
    //     name: 'Hanorac simplu',
    //     price: 99.99,
    //     discount: 0,
    //     photo: blueHooFront,
    //     sliderPhoto: [blueHooBack, blueHooLeft, blueHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#0091e5',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 5, M: 5, L: 6, XL: 7, XXL: 6 },
    //     id: 'r',
    //   } , s: {
    //     name: 'Hanorac simplu',
    //     price: 79.99,
    //     discount: 0,
    //     photo: cyanHooFront,
    //     sliderPhoto: [cyanHooBack, cyanHooLeft, cyanHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#00d2ff',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 7, M: 9, L: 1, XL: 7, XXL: 0 },
    //     id: 's',
    //   } , t: {
    //     name: 'Hanorac simplu',
    //     price: 109.99,
    //     discount: 0,
    //     photo: greenHooFront,
    //     sliderPhoto: [greenHooBack, greenHooLeft, greenHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#72ff00',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 5, M: 6, L: 0, XL: 7, XXL: 0 },
    //     id: 't',
    //   } , u: {
    //     name: 'Hanorac simplu',
    //     price: 139.99,
    //     discount: 0.3,
    //     photo: orangeHooFront,
    //     sliderPhoto: [orangeHooBack, orangeHooLeft, orangeHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#fd6500',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 6, S: 6, M: 14, L: 15, XL: 21, XXL: 23 },
    //     id: 'u',
    //   } , v: {
    //     name: 'Hanorac simplu',
    //     price: 99.99,
    //     discount: 0.2,
    //     photo: pinkHooFront,
    //     sliderPhoto: [pinkHooBack, pinkHooLeft, pinkHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ff00f0',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 5, S: 5, M: 3, L: 0, XL: 2, XXL: 6 },
    //     id: 'v',
    //   } , w: {
    //     name: 'Hanorac simplu',
    //     price: 79.99,
    //     discount: 0,
    //     photo: purpleHooFront,
    //     sliderPhoto: [purpleHooBack, purpleHooLeft, purpleHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#a200ff',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 0, M: 4, L: 2, XL: 7, XXL: 3 },
    //     id: 'w',
    //   } , x: {
    //     name: 'Hanorac simplu',
    //     price: 94.99,
    //     discount: 0,
    //     photo: redHooFront,
    //     sliderPhoto: [redHooBack, redHooLeft, redHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ea0000',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 6, M: 3, L: 7, XL: 7, XXL: 3 },
    //     id: 'x',
    //   } , y: {
    //     name: 'Hanorac simplu',
    //     price: 59.99,
    //     discount: 0,
    //     photo: turqoiseHooFront,
    //     sliderPhoto: [turqoiseHooBack, turqoiseHooLeft, turqoiseHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#00ffd8',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 6, S: 3, M: 0, L: 9, XL: 11, XXL: 21 },
    //     id: 'y',
    //   } , z: {
    //     name: 'Hanorac simplu',
    //     price: 69.99,
    //     discount: 0,
    //     photo: blackHooFront,
    //     sliderPhoto: [blackHooBack, blackHooLeft, blackHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#1c1919',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 6, S: 2, M: 4, L: 3, XL: 0, XXL: 0 },
    //     id: 'z',
    //   } , aa: {
    //     name: 'Hanorac simplu',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: yellowHooFront,
    //     sliderPhoto: [yellowHooBack, yellowHooLeft, yellowHooRight],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'aa',
    //   } ,
    // }
    ]
  )
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  // const server = process.env.REACT_APP_SERVER;
  const server = "https://blisst.onrender.com"
  // const server = 'http://localhost:9000'
  const [admin, setAdmin] = useState()
  const [det, setDet] = useState({ info: '', tel: '', email: '', name: '', type: '', county: '', newsLetter: true, color: '' })
  const [favorite, dispatchFav] = useReducer(Reducer, [])
  const [cart, dispatchCart] = useReducer(Reducer, [])
  const [command, dispatchCommand] = useReducer(Reducer, [])

  const getUserData = async (uid, product) => {
    await axios.post(`${server}/user/info`, { uid: uid })
      .then(info => {
        if (info.data.success) {
          dispatchFav({ type: 'favGet', payload: { fav: info.data.data.fav } })
          dispatchCart({ type: 'cartGet', payload: { cart: info.data.data.cart } })
          dispatchCart({ type: 'cartUpdate', payload: { product: product } })
          dispatchCommand({ type: 'commandGet', payload: { command: info.data.data.command } })
          setDet(info.data.data.det);
          document.documentElement.style.setProperty("--principal", info.data.data.det.color)
        }
      })
      .catch(err => {
        console.error(err.error)
      })
  }

  const getData = async () => {
    const product = await axios.get(`${server}/product`)
    if (product.data.success) {
      setProduct(product.data.product)
    }
    const connect = await axios.get(`${server}/connect`)
    if (connect.data.admin) {
      setAdmin(true)
    }
    if (connect.data.success) {
      if (Cookies.get('userData')) {
        const user = JSON.parse(Cookies.get('userData'));
        setCurrentUser(user)
        await getUserData(user.uid, product.data.product)
      }
    }
    setLoading(false)
  }
  const postProduct = () => {
    axios.post(`${server}/user/product`, {
      product: product
    })
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
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
      axios.post(`${server}/user/command/add`, {
        command: command,
        uid: currentUser.uid,
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
    command, dispatchCommand,
    getUserData,
    det, setDet,
    admin, setAdmin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

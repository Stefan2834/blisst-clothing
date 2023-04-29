import React, { createContext, useContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';
import blackTeeFront from '../clothing/man/top/black 1c1919/default tee front.png'
import blueTeeFront from '../clothing/man/top/blue 0091e5/default tee front.png'
import cyanTeeFront from '../clothing/man/top/cyan 00d2ff/default tee front.png'
import greenTeeFront from '../clothing/man/top/green 72ff00/default tee front.png'
import orangeTeeFront from '../clothing/man/top/orange fd6500/default tee front.png'
import pinkTeeFront from '../clothing/man/top/pink ff00f0/default tee front.png'
import purpleTeeFront from '../clothing/man/top/purple a200ff/default tee front.png'
import redTeeFront from '../clothing/man/top/red ea0000/default tee front.png'
import turqoiseTeeFront from '../clothing/man/top/turqoise 00ffd8/default tee front.png'
import whiteTeeFront from '../clothing/man/top/white fff/default tee front.png'
import yellowTeeFront from '../clothing/man/top/yellow fff600/default tee front.png'
import blackTeeBack from '../clothing/man/top/black 1c1919/default tee back.png'
import blueTeeBack from '../clothing/man/top/blue 0091e5/default tee back.png'
import cyanTeeBack from '../clothing/man/top/cyan 00d2ff/default tee back.png'
import greenTeeBack from '../clothing/man/top/green 72ff00/default tee back.png'
import orangeTeeBack from '../clothing/man/top/orange fd6500/default tee back.png'
import pinkTeeBack from '../clothing/man/top/pink ff00f0/default tee back.png'
import purpleTeeBack from '../clothing/man/top/purple a200ff/default tee back.png'
import redTeeBack from '../clothing/man/top/red ea0000/default tee back.png'
import turqoiseTeeBack from '../clothing/man/top/turqoise 00ffd8/default tee back.png'
import whiteTeeBack from '../clothing/man/top/white fff/default tee back.png'
import yellowTeeBack from '../clothing/man/top/yellow fff600/default tee back.png'

import blueHooFrontPatern from '../clothing/man/top/patern/frontBlue.png'
import blueHooBackPatern from '../clothing/man/top/patern/backBlue.png'
import blueHooLeftPatern from '../clothing/man/top/patern/leftBlue.png'
import blueHooRightPatern from '../clothing/man/top/patern/rightBlue.png'

import redHooFrontPatern from '../clothing/man/top/patern/frontRed.png'
import redHooBackPatern from '../clothing/man/top/patern/backRed.png'
import redHooLeftPatern from '../clothing/man/top/patern/leftRed.png'
import redHooRightPatern from '../clothing/man/top/patern/rightRed.png'

import yellowHooFrontPatern from '../clothing/man/top/patern/frontYellow.png'
import yellowHooBackPatern from '../clothing/man/top/patern/backYellow.png'
import yellowHooLeftPatern from '../clothing/man/top/patern/leftYellow.png'
import yellowHooRightPatern from '../clothing/man/top/patern/rightYellow.png'

import whiteHooFrontPatern from '../clothing/man/top/patern/frontWhite.png'
import whiteHooBackPatern from '../clothing/man/top/patern/backWhite.png'
import whiteHooLeftPatern from '../clothing/man/top/patern/leftWhite.png'
import whiteHooRightPatern from '../clothing/man/top/patern/rightWhite.png'

import greenHooFrontPatern from '../clothing/man/top/patern/frontGreen.png'
import greenHooBackPatern from '../clothing/man/top/patern/backGreen.png'
import greenHooLeftPatern from '../clothing/man/top/patern/leftGreen.png'
import greenHooRightPatern from '../clothing/man/top/patern/rightGreen.png'

import sprayHooFrontCustom from '../clothing/man/top/custom/frontSpray.png'
import sprayHooBackCustom from '../clothing/man/top/custom/backSpray.png'
import sprayHooLeftCustom from '../clothing/man/top/custom/leftSpray.png'
import sprayHooRightCustom from '../clothing/man/top/custom/rightSpray.png'

import bascketHooFrontCustom from '../clothing/man/top/custom/frontBascket.png'
import bascketHooBackCustom from '../clothing/man/top/custom/backBascket.png'
import bascketHooLeftCustom from '../clothing/man/top/custom/leftBascket.png'
import bascketHooRightCustom from '../clothing/man/top/custom/rightBascket.png'

import shapeHooFrontCustom from '../clothing/man/top/custom/frontShape.png'
import shapeHooBackCustom from '../clothing/man/top/custom/backShape.png'
import shapeHooLeftCustom from '../clothing/man/top/custom/leftShape.png'
import shapeHooRightCustom from '../clothing/man/top/custom/rightShape.png'

import snakeHooFrontCustom from '../clothing/man/top/custom/frontSnake.png'
import snakeHooBackCustom from '../clothing/man/top/custom/backSnake.jpg'
import snakeHooLeftCustom from '../clothing/man/top/custom/leftSnake.png'
import snakeHooRightCustom from '../clothing/man/top/custom/rightSnake.png'

import blueHooFront from '../clothing/man/top/blue 0091e5/default hoo front.png'
import blueHooBack from '../clothing/man/top/blue 0091e5/default hoo back.png'
import blueHooRight from '../clothing/man/top/blue 0091e5/default hoo right.png'
import blueHooLeft from '../clothing/man/top/blue 0091e5/default hoo left.png'

import cyanHooFront from '../clothing/man/top/cyan 00d2ff/default hoo front.png'
import cyanHooBack from '../clothing/man/top/cyan 00d2ff/default hoo back.png'
import cyanHooRight from '../clothing/man/top/cyan 00d2ff/default hoo right.png'
import cyanHooLeft from '../clothing/man/top/cyan 00d2ff/default hoo left.png'

import greenHooFront from '../clothing/man/top/green 72ff00/default hoo front.png'
import greenHooBack from '../clothing/man/top/green 72ff00/default hoo back.png'
import greenHooRight from '../clothing/man/top/green 72ff00/default hoo right.png'
import greenHooLeft from '../clothing/man/top/green 72ff00/default hoo left.png'

import orangeHooFront from '../clothing/man/top/orange fd6500/default hoo front.png'
import orangeHooBack from '../clothing/man/top/orange fd6500/default hoo back.png'
import orangeHooRight from '../clothing/man/top/orange fd6500/default hoo right.png'
import orangeHooLeft from '../clothing/man/top/orange fd6500/default hoo left.png'

import pinkHooFront from '../clothing/man/top/pink ff00f0/default hoo front.png'
import pinkHooBack from '../clothing/man/top/pink ff00f0/default hoo back.png'
import pinkHooRight from '../clothing/man/top/pink ff00f0/default hoo right.png'
import pinkHooLeft from '../clothing/man/top/pink ff00f0/default hoo left.png'

import purpleHooFront from '../clothing/man/top/purple a200ff/default hoo front.png'
import purpleHooBack from '../clothing/man/top/purple a200ff/default hoo back.png'
import purpleHooRight from '../clothing/man/top/purple a200ff/default hoo right.png'
import purpleHooLeft from '../clothing/man/top/purple a200ff/default hoo left.png'

import redHooFront from '../clothing/man/top/red ea0000/default hoo front.png'
import redHooBack from '../clothing/man/top/red ea0000/default hoo back.png'
import redHooRight from '../clothing/man/top/red ea0000/default hoo right.png'
import redHooLeft from '../clothing/man/top/red ea0000/default hoo left.png'

import turqoiseHooFront from '../clothing/man/top/turqoise 00ffd8/default hoo front.png'
import turqoiseHooBack from '../clothing/man/top/turqoise 00ffd8/default hoo back.png'
import turqoiseHooRight from '../clothing/man/top/turqoise 00ffd8/default hoo right.png'
import turqoiseHooLeft from '../clothing/man/top/turqoise 00ffd8/default hoo left.png'

import blackHooFront from '../clothing/man/top/black 1c1919/default hoo front.png'
import blackHooBack from '../clothing/man/top/black 1c1919/default hoo back.png'
import blackHooRight from '../clothing/man/top/black 1c1919/default hoo right.png'
import blackHooLeft from '../clothing/man/top/black 1c1919/default hoo left.png'

import yellowHooFront from '../clothing/man/top/yellow fff600/default hoo front.png'
import yellowHooBack from '../clothing/man/top/yellow fff600/default hoo back.png'
import yellowHooRight from '../clothing/man/top/yellow fff600/default hoo right.png'
import yellowHooLeft from '../clothing/man/top/yellow fff600/default hoo left.png'



/*----------Pants----------*/



import manblackPanBrownFront from '../clothing/man/bottom/black 1c1919/default pan brown front.png'
import manblackPanBrownBack from '../clothing/man/bottom/black 1c1919/default pan brown front.png'
import manblackPanBrownRight from '../clothing/man/bottom/black 1c1919/default pan brown front.png'
import manblackPanBrownLeft from '../clothing/man/bottom/black 1c1919/default pan brown front.png'

import manbluePanBrownFront from '../clothing/man/bottom/blue 0091e5/default pan brown front.png'
import manbluePanBrownBack from '../clothing/man/bottom/blue 0091e5/default pan brown front.png'
import manbluePanBrownRight from '../clothing/man/bottom/blue 0091e5/default pan brown front.png'
import manbluePanBrownLeft from '../clothing/man/bottom/blue 0091e5/default pan brown front.png'

import mancyanPanBrownFront from '../clothing/man/bottom/cyan 00d2ff/default pan brown front.png'
import mancyanPanBrownBack from '../clothing/man/bottom/cyan 00d2ff/default pan brown front.png'
import mancyanPanBrownRight from '../clothing/man/bottom/cyan 00d2ff/default pan brown front.png'
import mancyanPanBrownLeft from '../clothing/man/bottom/cyan 00d2ff/default pan brown front.png'

import mangreenPanBrownFront from '../clothing/man/bottom/green 72ff00/default pan brown front.png'
import mangreenPanBrownBack from '../clothing/man/bottom/green 72ff00/default pan brown front.png'
import mangreenPanBrownRight from '../clothing/man/bottom/green 72ff00/default pan brown front.png'
import mangreenPanBrownLeft from '../clothing/man/bottom/green 72ff00/default pan brown front.png'

import manorangePanBrownFront from '../clothing/man/bottom/orange fd6500/default pan brown front.png'
import manorangePanBrownBack from '../clothing/man/bottom/orange fd6500/default pan brown front.png'
import manorangePanBrownRight from '../clothing/man/bottom/orange fd6500/default pan brown front.png'
import manorangePanBrownLeft from '../clothing/man/bottom/orange fd6500/default pan brown front.png'

import manpinkPanBrownFront from '../clothing/man/bottom/pink ff00f0/default pan brown front.png'
import manpinkPanBrownBack from '../clothing/man/bottom/pink ff00f0/default pan brown front.png'
import manpinkPanBrownRight from '../clothing/man/bottom/pink ff00f0/default pan brown front.png'
import manpinkPanBrownLeft from '../clothing/man/bottom/pink ff00f0/default pan brown front.png'

import manpurplePanBrownFront from '../clothing/man/bottom/purple a200ff/default pan brown front.png'
import manpurplePanBrownBack from '../clothing/man/bottom/purple a200ff/default pan brown front.png'
import manpurplePanBrownRight from '../clothing/man/bottom/purple a200ff/default pan brown front.png'
import manpurplePanBrownLeft from '../clothing/man/bottom/purple a200ff/default pan brown front.png'

import manredPanBrownFront from '../clothing/man/bottom/red ea0000/default pan brown front.png'
import manredPanBrownBack from '../clothing/man/bottom/red ea0000/default pan brown front.png'
import manredPanBrownRight from '../clothing/man/bottom/red ea0000/default pan brown front.png'
import manredPanBrownLeft from '../clothing/man/bottom/red ea0000/default pan brown front.png'

import manturqoisePanBrownFront from '../clothing/man/bottom/turqoise 00ffd8/default pan brown front.png'
import manturqoisePanBrownBack from '../clothing/man/bottom/turqoise 00ffd8/default pan brown front.png'
import manturqoisePanBrownRight from '../clothing/man/bottom/turqoise 00ffd8/default pan brown front.png'
import manturqoisePanBrownLeft from '../clothing/man/bottom/turqoise 00ffd8/default pan brown front.png'

import manwhitePanBrownFront from '../clothing/man/bottom/white fff/default pan brown front.png'
import manwhitePanBrownBack from '../clothing/man/bottom/white fff/default pan brown front.png'
import manwhitePanBrownRight from '../clothing/man/bottom/white fff/default pan brown front.png'
import manwhitePanBrownLeft from '../clothing/man/bottom/white fff/default pan brown front.png'

import manyellowPanBrownFront from '../clothing/man/bottom/yellow fff600/default pan brown front.png'
import manyellowPanBrownBack from '../clothing/man/bottom/yellow fff600/default pan brown front.png'
import manyellowPanBrownRight from '../clothing/man/bottom/yellow fff600/default pan brown front.png'
import manyellowPanBrownLeft from '../clothing/man/bottom/yellow fff600/default pan brown front.png'


/*Grey*/


import manblackPanGreyFront from '../clothing/man/bottom/black 1c1919/default pan grey front.png'
import manblackPanGreyBack from '../clothing/man/bottom/black 1c1919/default pan grey back.png'
import manblackPanGreyRight from '../clothing/man/bottom/black 1c1919/default pan grey front.png'
import manblackPanGreyLeft from '../clothing/man/bottom/black 1c1919/default pan grey front.png'

import manbluePanGreyFront from '../clothing/man/bottom/blue 0091e5/default pan grey front.png'
import manbluePanGreyBack from '../clothing/man/bottom/blue 0091e5/default pan grey back.png'
import manbluePanGreyRight from '../clothing/man/bottom/blue 0091e5/default pan grey front.png'
import manbluePanGreyLeft from '../clothing/man/bottom/blue 0091e5/default pan grey front.png'

import mancyanPanGreyFront from '../clothing/man/bottom/cyan 00d2ff/default pan grey front.png'
import mancyanPanGreyBack from '../clothing/man/bottom/cyan 00d2ff/default pan grey back.png'
import mancyanPanGreyRight from '../clothing/man/bottom/cyan 00d2ff/default pan grey front.png'
import mancyanPanGreyLeft from '../clothing/man/bottom/cyan 00d2ff/default pan grey front.png'

import mangreenPanGreyFront from '../clothing/man/bottom/green 72ff00/default pan grey front.png'
import mangreenPanGreyBack from '../clothing/man/bottom/green 72ff00/default pan grey back.png'
import mangreenPanGreyRight from '../clothing/man/bottom/green 72ff00/default pan grey front.png'
import mangreenPanGreyLeft from '../clothing/man/bottom/green 72ff00/default pan grey front.png'

import manorangePanGreyFront from '../clothing/man/bottom/orange fd6500/default pan grey front.png'
import manorangePanGreyBack from '../clothing/man/bottom/orange fd6500/default pan grey back.png'
import manorangePanGreyRight from '../clothing/man/bottom/orange fd6500/default pan grey front.png'
import manorangePanGreyLeft from '../clothing/man/bottom/orange fd6500/default pan grey front.png'

import manpinkPanGreyFront from '../clothing/man/bottom/pink ff00f0/default pan grey front.png'
import manpinkPanGreyBack from '../clothing/man/bottom/pink ff00f0/default pan grey back.png'
import manpinkPanGreyRight from '../clothing/man/bottom/pink ff00f0/default pan grey front.png'
import manpinkPanGreyLeft from '../clothing/man/bottom/pink ff00f0/default pan grey front.png'

import manpurplePanGreyFront from '../clothing/man/bottom/purple a200ff/default pan grey front.png'
import manpurplePanGreyBack from '../clothing/man/bottom/purple a200ff/default pan grey back.png'
import manpurplePanGreyRight from '../clothing/man/bottom/purple a200ff/default pan grey front.png'
import manpurplePanGreyLeft from '../clothing/man/bottom/purple a200ff/default pan grey front.png'

import manredPanGreyFront from '../clothing/man/bottom/red ea0000/default pan grey front.png'
import manredPanGreyBack from '../clothing/man/bottom/red ea0000/default pan grey back.png'
import manredPanGreyRight from '../clothing/man/bottom/red ea0000/default pan grey front.png'
import manredPanGreyLeft from '../clothing/man/bottom/red ea0000/default pan grey front.png'

import manturqoisePanGreyFront from '../clothing/man/bottom/turqoise 00ffd8/default pan grey front.png'
import manturqoisePanGreyBack from '../clothing/man/bottom/turqoise 00ffd8/default pan grey back.png'
import manturqoisePanGreyRight from '../clothing/man/bottom/turqoise 00ffd8/default pan grey front.png'
import manturqoisePanGreyLeft from '../clothing/man/bottom/turqoise 00ffd8/default pan grey front.png'

import manwhitePanGreyFront from '../clothing/man/bottom/white fff/default pan grey front.png'
import manwhitePanGreyBack from '../clothing/man/bottom/white fff/default pan grey back.png'
import manwhitePanGreyRight from '../clothing/man/bottom/white fff/default pan grey front.png'
import manwhitePanGreyLeft from '../clothing/man/bottom/white fff/default pan grey front.png'

import manyellowPanGreyFront from '../clothing/man/bottom/yellow fff600/default pan grey front.png'
import manyellowPanGreyBack from '../clothing/man/bottom/yellow fff600/default pan grey back.png'
import manyellowPanGreyRight from '../clothing/man/bottom/yellow fff600/default pan grey front.png'
import manyellowPanGreyLeft from '../clothing/man/bottom/yellow fff600/default pan grey front.png'





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
    //   }, p1: {
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
    //     id: 'p1',
    //   }, p2: {
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
    //     id: 'p2',
    //   }, p3: {
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
    //     id: 'p3',
    //   }, p4: {
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
    //     id: 'p4',
    //   }, p5: {
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
    //     size: { XS: 4, S: 0, M: 2, L: 6, XL: 0, XXL: 3 },
    //     id: 'p5',
    //   }, p6: {
    //     name: 'Hanorac custom',
    //     price: 129.99,
    //     discount: 0,
    //     photo: sprayHooFrontCustom,
    //     sliderPhoto: [sprayHooBackCustom, sprayHooLeftCustom, sprayHooRightCustom],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#eee',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 0, L: 3, XL: 4, XXL: 3 },
    //     id: 'p6',
    //   }, p7: {
    //     name: 'Hanorac custom',
    //     price: 129.99,
    //     discount: 0,
    //     photo: bascketHooFrontCustom,
    //     sliderPhoto: [bascketHooBackCustom, bascketHooLeftCustom, bascketHooRightCustom],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#eee',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 6, M: 3, L: 2, XL: 5, XXL: 4 },
    //     id: 'p7',
    //   }, p8: {
    //     name: 'Hanorac custom',
    //     price: 129.99,
    //     discount: 0,
    //     photo: shapeHooFrontCustom,
    //     sliderPhoto: [shapeHooBackCustom, shapeHooLeftCustom, shapeHooRightCustom],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#eee',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 4, S: 5, M: 2, L: 6, XL: 7, XXL: 3 },
    //     id: 'p8',
    //   }, p9: {
    //     name: 'Hanorac Snake',
    //     price: 129.99,
    //     discount: 0.2,
    //     photo: snakeHooFrontCustom,
    //     sliderPhoto: [snakeHooBackCustom, snakeHooLeftCustom, snakeHooRightCustom],
    //     sex: 'man',
    //     type: 'barbati top bluze',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#eee',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 2, S: 5, M: 4, L: 0, XL: 3, XXL: 1 },
    //     id: 'p9',
    //   }, h1: {
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
    //     id: 'h1',
    //   }, h2: {
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
    //     id: 'h2',
    //   }, h3: {
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
    //     id: 'h3',
    //   }, h4: {
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
    //     id: 'h4',
    //   }, h5: {
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
    //     id: 'h5',
    //   }, h6: {
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
    //     id: 'h6',
    //   }, h7: {
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
    //     id: 'h7',
    //   }, h8: {
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
    //     id: 'h8',
    //   }, h9: {
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
    //     id: 'h9',
    //   }, h10: {
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
    //     id: 'h10',
    //   }, mpb1: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manblackPanBrownFront,
    //     sliderPhoto: [manblackPanBrownBack, manblackPanBrownLeft, manblackPanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb1',
    //   }, mpb2: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manbluePanBrownFront,
    //     sliderPhoto: [manbluePanBrownBack, manbluePanBrownLeft, manbluePanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb2',
    //   }, mpb3: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: mancyanPanBrownFront,
    //     sliderPhoto: [mancyanPanBrownBack, mancyanPanBrownLeft, mancyanPanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb3',
    //   }, mpb4: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: mangreenPanBrownFront,
    //     sliderPhoto: [mangreenPanBrownBack, mangreenPanBrownLeft, mangreenPanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb4',
    //   }, mpb5: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manorangePanBrownFront,
    //     sliderPhoto: [manorangePanBrownBack, manorangePanBrownLeft, manorangePanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb5',
    //   }, mpb6: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manpinkPanBrownFront,
    //     sliderPhoto: [manpinkPanBrownBack, manpinkPanBrownLeft, manpinkPanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb6',
    //   }, mpb7: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manpurplePanBrownFront,
    //     sliderPhoto: [manpurplePanBrownBack, manpurplePanBrownLeft, manpurplePanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb7',
    //   }, mpb8: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manredPanBrownFront,
    //     sliderPhoto: [manredPanBrownBack, manredPanBrownLeft, manredPanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb8',
    //   }, mpb9: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manturqoisePanBrownFront,
    //     sliderPhoto: [manturqoisePanBrownBack, manturqoisePanBrownLeft, manturqoisePanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb9',
    //   }, mpb10: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manwhitePanBrownFront,
    //     sliderPhoto: [manwhitePanBrownBack, manwhitePanBrownLeft, manwhitePanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb10',
    //   }, mpb11: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0.2,
    //     photo: manyellowPanBrownFront,
    //     sliderPhoto: [manyellowPanBrownBack, manyellowPanBrownLeft, manyellowPanBrownRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 0, S: 7, M: 6, L: 5, XL: 3, XXL: 0 },
    //     id: 'mpb11',
    //   }, mpg1: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manblackPanGreyFront,
    //     sliderPhoto: [manblackPanGreyBack, manblackPanGreyLeft, manblackPanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg1',
    //   }, mpg2: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manbluePanGreyFront,
    //     sliderPhoto: [manbluePanGreyBack, manbluePanGreyLeft, manbluePanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg2',
    //   }, mpg3: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: mancyanPanGreyFront,
    //     sliderPhoto: [mancyanPanGreyBack, mancyanPanGreyLeft, mancyanPanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg3',
    //   }, mpg4: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: mangreenPanGreyFront,
    //     sliderPhoto: [mangreenPanGreyBack, mangreenPanGreyLeft, mangreenPanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg4',
    //   }, mpg5: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manorangePanGreyFront,
    //     sliderPhoto: [manorangePanGreyBack, manorangePanGreyLeft, manorangePanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg5',
    //   }, mpg6: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manpinkPanGreyFront,
    //     sliderPhoto: [manpinkPanGreyBack, manpinkPanGreyLeft, manpinkPanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg6',
    //   }, mpg7: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manpurplePanGreyFront,
    //     sliderPhoto: [manpurplePanGreyBack, manpurplePanGreyLeft, manpurplePanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg7',
    //   }, mpg8: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manredPanGreyFront,
    //     sliderPhoto: [manredPanGreyBack, manredPanGreyLeft, manredPanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg8',
    //   }, mpg9: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manturqoisePanGreyFront,
    //     sliderPhoto: [manturqoisePanGreyBack, manturqoisePanGreyLeft, manturqoisePanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg9',
    //   }, mpg10: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manwhitePanGreyFront,
    //     sliderPhoto: [manwhitePanGreyBack, manwhitePanGreyLeft, manwhitePanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg10',
    //   }, mpg11: {
    //     name: 'Pantaloni simpli',
    //     price: 119.99,
    //     discount: 0,
    //     photo: manyellowPanGreyFront,
    //     sliderPhoto: [manyellowPanGreyBack, manyellowPanGreyLeft, manyellowPanGreyRight],
    //     sex: 'man',
    //     type: 'barbati bottom lungi',
    //     spec: 'Tricou negru din bumbac',
    //     color: '#ffd600',
    //     star: { total: 0, nr: 0 },
    //     size: { XS: 3, S: 7, M: 6, L: 5, XL: 3, XXL: 1 },
    //     id: 'mpg11',
    //   },
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

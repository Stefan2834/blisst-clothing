import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function AdminDiscount() {
  const { server } = useAuth()
  const codeRef = useRef()
  const valueRef = useRef()
  const navigate = useNavigate()
  const [discount, setDiscount] = useState([])

  const handleAddDiscount = e => {
    e.preventDefault()
    const code = codeRef.current.value
    const value = Number(valueRef.current.value / 100)
    console.log(code, value)
    axios.post(`${server}/admin/discount`, { code: code, value: value })
      .then(data => {
        if (data.data.succes) {
          Swal.fire({
            title: 'Adaugat',
            text: data.data.message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
          })
          navigate('/main/admin')
        } else {
          Swal.fire({
            title: 'Eroare!',
            text: data.data.message,
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Inapoi',
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleView = () => {
    Swal.fire({
      title: 'Esti sigur?',
      text: "Atentie! Asigura-te ca nimeni in afara de tine nu este capabil sa vada aceste coduri, deoarece sunt confidentiale",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Afiseaza',
      cancelButtonText: 'Inapoi'
    }).then((result) => {
      if(result.isConfirmed) {
        axios.get(`${server}/admin/discount`)
        .then(data => {
          setDiscount(data.data.discount)
        })
        .catch(err => console.error(err))
      }
    })
  }


  return (
    <div className='adm-dis'>
      <form className='adm-dis-add' onSubmit={(e) => handleAddDiscount(e)}>
        <div className='adm-dis-title'>Adauga un cod de discount</div>
        <label className='adm-label'>
          <input ref={codeRef} className='adm-input' type='text' placeholder=' ' required minLength={6} maxLength={10} />
          <span className='adm-place-holder'>Codul</span>
        </label>
        <label className='adm-label'>
          <input ref={valueRef} className='adm-input' type='number' placeholder=' ' required min={1} max={100} />
          <span className='adm-place-holder'>Discount-ul %</span>
        </label>
        <input type='submit' value={'Creeaza codul'} className='adm-submit' />
      </form>
      <div className='adm-dis-add'>
        <div className='adm-dis-title'>Alte coduri</div>
        <div className='adm-submit' onClick={() => handleView()}>Afiseaza alte coduri</div>
        {discount.map(dis => {
          return (
            <div className='adm-dis-div'>
              <div>
                Codul:<span className='font-semibold'>{dis.code}</span>
              </div>
              <div>
                Reducere:<span className='font-semibold'>{dis.value * 100} %</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

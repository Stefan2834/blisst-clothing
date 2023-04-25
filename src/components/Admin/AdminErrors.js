import React, { useLayoutEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { useDefault } from '../../contexts/DefaultContext'
import { useRef } from 'react'
import Swal from 'sweetalert2'

export default function AdminErrors() {
  const { server } = useAuth()
  const { darkTheme } = useDefault()
  const [error, setError] = useState([])
  const [popUp, setPopUp] = useState({ user: '', open: false, error: "", id: 0 })
  const solve = useRef()

  const handleDelete = (id) => {
    axios.delete(`${server}/admin/errors`, { id: id })
      .then(data => {
        setError(prevErrors => {
          const newErrors = [...prevErrors]
          newErrors.splice(id, 1)
          return newErrors;
        });
      })
      .catch(err => console.error(err))
  }

  const handleSend = async () => {
    await axios.post(`${server}/email/error`, { name: popUp.user, solve: solve.current.value })
      .then(() => {
        handleDelete(popUp.id)
        Swal.fire({
          title: 'Email trimis',
          text: `Emailul a fost trimis cu succes catre ${popUp.user}`,
          icon: 'success',
          cancelButtonText: 'Ok',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
        })
        setPopUp({ user: '', open: false, error: '', id: '' })
      })
      .catch(err => {
        console.log(err)
      })
  }

  useLayoutEffect(() => {
    axios.get(`${server}/admin/errors`)
      .then(data => {
        if (data.data.errors) {
          setError(data.data.errors)
        }
      })
      .catch(err => console.error(err))
  }, [])


  return (
    <div className='admin-err-container'>
      {popUp.open && (
        <div className='adm-popup'>
          <div className='adm-popup-bg' onClick={() => setPopUp({ user: "", open: false, error: "", id: 0 })} />
          <div className='adm-pop-content'>
            <div className='adm-dis-title'>Raspunde acestui utilizator</div>
            <div className='flex justify-start items-center my-4 w-full'>
              <div className="font-medium text-lg">Nume: </div>
              <div className="font-medium text-lg">{popUp.user}</div>
            </div>
            <div className='flex justify-start items-start my-4 w-full'>
              <div className="font-medium text-lg">Problema: </div>
              <div className="font-medium text-lg">{popUp.error} </div>
            </div>
            <div className='flex justify-start items-center my-4 w-full'>
              <div className='font-medium text-lg'>Raspunde:</div>
              <input type='text' ref={solve}
                className='adm-pop-input w-full'
                required
                placeholder='Raspuns...' minLength={10} maxLength={300}
              />
            </div>
            <div className='adm-pop-send' onClick={() => { handleSend() }}>Trimite email</div>
          </div>
        </div>
      )}
      <div className='admin-err-div'>
        {error.length === 0 ? (
          <div className='admin-err'>
            <div className='admin-err-title'>Nu mai exista erori!</div>
          </div>
        ) : (
          <>
            {error.map((err, index) => {
              return (
                <div className='admin-err'>
                  <div className='flex flex-col'>
                    <div className='admin-err-title'>{err.email}</div>
                    <div className='admin-err-text'>{err.error}</div>
                  </div>
                  <div className='flex flex-col'>
                    <div onClick={() => setPopUp({ user: err.email, open: true, error: err.error, id: index })}
                      className={darkTheme ? 'admin-err-checkbox-dark' : 'admin-err-checkbox'}
                    ></div>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

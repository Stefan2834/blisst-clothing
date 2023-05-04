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
  const [loading, setLoading] = useState(true)
  const [popUp, setPopUp] = useState({ user: '', open: false, error: "" })
  const solve = useRef()

  const handleDelete = (id) => {
    axios.post(`${server}/admin/errors`, { id: id })
      .then(data => {
        setError(prevErrors => {
          const newErrors = [...prevErrors]
          newErrors.splice(id, 1)
          return newErrors;
        });
      })
      .catch(err => console.error(err))
  }

  const handleSend = async (e) => {
    e.preventDefault()
    await axios.post(`${server}/email/error`, { name: popUp.user, solve: solve.current.value, error: popUp.error })
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
        setPopUp({ user: '', open: false, error: '' })
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
        setLoading(false)
      })
      .catch(err => {console.error(err); setLoading(false)})
  }, [])


  return (
    <>
      {loading ? (
        <>
          <div className="loading-bg">
            <div className="loading-spin">Loading...</div>
          </div>
          <div className="h-screen" />
        </>
      ) : (
        <div className='admin-err-container'>
          {popUp.open && (
            <form className='adm-popup' onSubmit={e => handleSend(e)}>
              <div className='adm-popup-bg' onClick={() => setPopUp({ user: "", open: false, error: "" })} />
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
                    placeholder='Raspuns...' minLength={10} maxLength={500}
                  />
                </div>
                <input type='submit' className='adm-pop-send' value={'Trimite email'} />
              </div>
            </form>
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
      )}
    </>
  )
}

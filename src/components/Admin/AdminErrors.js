import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import { useDefault } from '../../contexts/DefaultContext'

export default function AdminErrors() {
  const { server } = useAuth()
  const { darkTheme } = useDefault()
  const [error, setError] = useState([])

  const handleDelete = (id) => {
    console.log(id)
    axios.delete(`${server}/admin/errors`, { id: id })
      .then(data => {
        setError(prevErrors => {
          const newErrors = [...prevErrors]
          newErrors.splice(id , 1)
          return newErrors;
        });
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
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
                    <div onClick={() => handleDelete(index)}
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

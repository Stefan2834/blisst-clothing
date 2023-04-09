import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'

export default function Command() {
  const { command } = useAuth()
  console.log(command)

  return (
    <div className='mt-20'>
      {command.map((command) => {
        return (
          <div className='flex flex-col'>
            <div>{command.price}</div>
            <div>{JSON.stringify(command.details)}</div>
            <div>{command.date}</div>
          </div>
        )
      })}
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element: Element}) {
  const { currentUser } = useAuth()
  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {
    currentUser ? setIsLogged(true) : setIsLogged(false)
  }, [])
  

  return isLogged ? (
    <Element />
  ) : (
    <Navigate to="/connect" replace />
  );
}

import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element: Element}) {
  const { currentUser } = useAuth()
  const [isLogged] = useState(currentUser)

  

  return isLogged ? (
    <Element />
  ) : (
    <Navigate to="/connect" replace />
  );
}

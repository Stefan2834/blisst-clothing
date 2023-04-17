import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ element: Element}) {
  const { admin } = useAuth()
  const [isLogged] = useState(admin)

  

  return isLogged ? (
    <Element />
  ) : (
    <Navigate to="/main" replace />
  );
}

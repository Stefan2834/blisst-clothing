import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ element: Element}) {
  const { admin } = useAuth()
  const [isLogged] = useState(admin)

  //daca utilizatorul nu este admin, dar incearca sa acceseze paginile pentru admini, este retrimis pe main

  
  return isLogged ? (
    <Element />
  ) : (
    <Navigate to="/main" replace />
  );
}

import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ element: Element}) {
  const { currentUser } = useAuth()
  const [isLogged] = useState(currentUser)

  //daca utilizatorul nu este conectar, si incearca sa acceseze o pagina de tip fav, cart etc,
  //este retrimis pe main

  

  return isLogged ? (
    <Element />
  ) : (
    <Navigate to="/connect" replace />
  );
}

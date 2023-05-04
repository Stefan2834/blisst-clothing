import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function OwnerRoute({ element: Element }) {
  const { currentUser, server } = useAuth()
  const [owner, setOwner] = useState()
  const [loading, setLoading] = useState(true)
  const email = currentUser ? currentUser.email : undefined

  useEffect(() => {
    axios.get(`${server}/admin/owner`)
      .then((data => {setOwner(data.data.owner); setLoading(false)}))
      .catch(err => console.error(err))
  }, [])

  //daca utilizatorul nu este owner, dar incearca sa acceseze pagina cu toti admini, este retrimis pe main
  if (!loading) {
    return owner === email ? (
      <Element />
    ) : (
      <Navigate to="/main" replace />
    );
  } else {
    return (
      <></>
    )
  }
}
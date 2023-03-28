import React, { createContext, useContext, useState, useEffect, useTransition } from 'react'
import useLocalStorage from '../CustomHook/useLocalStorage'

export const DefaultContext = createContext();

export function useDefault() {
  return useContext(DefaultContext)
}

export default function DefaultProvider({ children }) {
  const [darkTheme, setDarkTheme] = useLocalStorage('dark', false)
  const [isPending, startTransition] = useTransition({ timeoutMs: 500 });
  const [activeForm, setActiveForm] = useState(true)
  const [error, setError] = useState('');
  const [search, setSearch] = useState();
  const [productLoad, setProductLoad] = useState(8);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.style.setProperty("--black", '#fff')
      document.documentElement.style.setProperty("--dark-principal", '#fff')
      document.documentElement.style.setProperty("--color", 'black')
      document.documentElement.style.setProperty("--color-second", '#0b0b0b')
      document.documentElement.style.setProperty("--color-oposite", '#fff')
      document.documentElement.style.setProperty("--color-third", '#1c1c1c')
    } else {
      document.documentElement.style.setProperty("--black", '#0b0b0b')
      document.documentElement.style.setProperty("--dark-principal", '#0b0b0b')
      document.documentElement.style.setProperty("--color", 'white')
      document.documentElement.style.setProperty("--color-second", '#eee')
      document.documentElement.style.setProperty("--color-oposite", '#0b0b0b')
      document.documentElement.style.setProperty("--color-third", '#ddd')
    }
  }, [darkTheme])




  const value = {
    error, setError,
    activeForm, setActiveForm,
    productLoad, setProductLoad,
    darkTheme, setDarkTheme,
    search, setSearch,
    startTransition, isPending
  }
  return (
    <DefaultContext.Provider value={value}>
      {children}
    </DefaultContext.Provider>
  )
}

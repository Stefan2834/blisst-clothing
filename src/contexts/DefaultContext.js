import React, { createContext, useContext, useState, useEffect, useTransition, useDeferredValue } from 'react'
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
  const [loading, setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [productLoad, setProductLoad] = useState(10);
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
    size: '',
    sort: '',
    color: '',
    searchId: '',
    searchName: '',
    type:''
  })
  const deferredSearch = useDeferredValue(filter.searchName)

  
  useEffect(() => {
    if (darkTheme) {
      document.documentElement.style.setProperty("--black", '#fff')
      document.documentElement.style.setProperty("--dark-principal", '#fff')
      document.documentElement.style.setProperty("--color", '#070707')
      document.documentElement.style.setProperty("--color-second", '#0b0b0b')
      document.documentElement.style.setProperty("--color-oposite", '#fff')
      document.documentElement.style.setProperty("--color-third", '#1c1c1c')
    } else {
      document.documentElement.style.setProperty("--black", '#141414')
      document.documentElement.style.setProperty("--dark-principal", '#101010')
      document.documentElement.style.setProperty("--color", 'white')
      document.documentElement.style.setProperty("--color-second", '#eee')
      document.documentElement.style.setProperty("--color-oposite", '#070707')
      document.documentElement.style.setProperty("--color-third", '#ddd')
    }
    setLoading(false)
  }, [darkTheme])




  const value = {
    error, setError,
    activeForm, setActiveForm,
    productLoad, setProductLoad,
    darkTheme, setDarkTheme,
    filterOpen, setFilterOpen,
    filter, setFilter,
    startTransition, isPending,
    deferredSearch
  }
  return (
    <DefaultContext.Provider value={value}>
      {!loading && children}
    </DefaultContext.Provider>
  )
}

import React, { createContext, useContext, useState, useEffect, useTransition, useDeferredValue, useLayoutEffect } from 'react'
import useLocalStorage from '../CustomHook/useLocalStorage'
import { useTranslation } from 'react-i18next'
import i18n from '../index'

export const DefaultContext = createContext();

export function useDefault() {
  return useContext(DefaultContext)
}

export default function DefaultProvider({ children }) {
  const { t } = useTranslation()
  const [darkTheme, setDarkTheme] = useLocalStorage('dark', false)
  const [lang, setLang] = useLocalStorage('lang', 'en')
  const [isPending, startTransition] = useTransition({ timeoutMs: 500 });
  const [activeForm, setActiveForm] = useState(true)
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [productLoad, setProductLoad] = useState(10);
  const [scrollPosition, setScrollPosition] = useState(0)
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
    size: '',
    sort: '',
    color: '',
    searchId: '',
    searchName: '',
    type: ''
  })
  const deferredSearch = useDeferredValue(filter.searchName)



  useEffect(() => {
    if (darkTheme) {
      document.documentElement.style.setProperty("--footer", '#272727')
      document.documentElement.style.setProperty("--dark-principal", '#fff')
      document.documentElement.style.setProperty("--color", '#101010')
      document.documentElement.style.setProperty("--color-second", '#0b0b0b')
      document.documentElement.style.setProperty("--color-oposite", '#fff')
      document.documentElement.style.setProperty("--color-third", '#1c1c1c')
      document.documentElement.style.setProperty('color-scheme', 'dark');
    } else {
      document.documentElement.style.setProperty("--footer", '#eee')
      document.documentElement.style.setProperty("--dark-principal", '#101010')
      document.documentElement.style.setProperty("--color", '#fff')
      document.documentElement.style.setProperty("--color-second", '#eee')
      document.documentElement.style.setProperty("--color-oposite", '#101010')
      document.documentElement.style.setProperty("--color-third", '#ddd')
      document.documentElement.style.setProperty('color-scheme', 'light');
    }
  }, [darkTheme])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1770) {
        setProductLoad(10)
      } else {
        setProductLoad(8)
      }
    }
    window.addEventListener("resize", handleResize())
    setLoading(false)
    return () => {
      window.removeEventListener("resieze", handleResize())
    }
  }, [])
  useLayoutEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang])

  
  


  const value = {
    error, setError,
    activeForm, setActiveForm,
    productLoad, setProductLoad,
    darkTheme, setDarkTheme,
    filterOpen, setFilterOpen,
    filter, setFilter,
    startTransition, isPending,
    deferredSearch,
    lang, setLang,
    scrollPosition, setScrollPosition,
    t
  }
  return (
    <DefaultContext.Provider value={value}>
      {!loading && children}
    </DefaultContext.Provider>
  )
}

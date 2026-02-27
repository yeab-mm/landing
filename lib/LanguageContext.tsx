'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Define the context type
interface LanguageContextType {
  language: string
  changeLanguage: (lang: string) => void
}

// Create context with undefined default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<string>('en')

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLang = localStorage.getItem('appLanguage')
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem('appLanguage', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

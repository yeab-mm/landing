// lib/LanguageContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'am'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  darkMode: boolean
  setDarkMode: (dark: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [darkMode, setDarkMode] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved preferences from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'am')) {
      setLanguage(savedLanguage)
    }
    
    if (savedDarkMode) {
      setDarkMode(savedDarkMode === 'true')
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    console.log('Setting language to:', lang) // Debug log
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const handleSetDarkMode = (dark: boolean) => {
    setDarkMode(dark)
    localStorage.setItem('darkMode', dark.toString())
  }

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage,
      darkMode, 
      setDarkMode: handleSetDarkMode 
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
import { useLanguage } from './LanguageContext'
import translations from './translations'

interface UseTranslationReturn {
  t: (key: string) => string
  language: string
}

export function useTranslation(): UseTranslationReturn {
  const { language } = useLanguage()
  
  const t = (key: string): string => {
    if (!key) return ''
    // Use type assertion to avoid TypeScript errors
    const trans = translations as any
    return trans[language]?.[key] || trans.en?.[key] || key
  }
  
  return { t, language }
}

export default useTranslation

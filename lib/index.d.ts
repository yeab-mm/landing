// Global type declarations
declare module '@/lib/translations' {
  const translations: {
    [key: string]: {
      [key: string]: string
    }
  }
  export default translations
}

declare module '@/lib/useTranslation' {
  export function useTranslation(): {
    t: (key: string) => string
    language: string
  }
}

declare module '@/lib/LanguageContext' {
  export function LanguageProvider({ children }: { children: React.ReactNode }): JSX.Element
  export function useLanguage(): {
    language: string
    changeLanguage: (lang: string) => void
  }
}

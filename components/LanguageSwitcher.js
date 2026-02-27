'use client'

import { useLanguage } from '../lib/LanguageContext'
import { useTranslation } from '../lib/useTranslation'

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage()
  const { t } = useTranslation()

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500 hidden md:inline">{t('language')}:</span>
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white border border-gray-300 rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="en">🇬🇧 English</option>
        <option value="am">🇪🇹 አማርኛ</option>
      </select>
    </div>
  )
}

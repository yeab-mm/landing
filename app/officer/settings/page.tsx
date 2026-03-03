'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  BellIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface Settings {
  siteName: string
  itemsPerPage: string
  emailNotifications: boolean
  smsNotifications: boolean
  twoFactorAuth: boolean
  dateFormat: string
  timezone: string
  language: string
}

interface Tab {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

export default function OfficerSettingsPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode
  const setDarkMode = languageContext.setDarkMode // Use setDarkMode instead of toggleDarkMode
  const globalLanguage = languageContext.language
  const setLanguage = languageContext.setLanguage // Use setLanguage instead of changeLanguage

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  const [activeTab, setActiveTab] = useState<string>('general')
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Digital Land Portal',
    itemsPerPage: '20',
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    dateFormat: 'MM/DD/YYYY',
    timezone: 'UTC+3',
    language: globalLanguage
  })

  const tabs: Tab[] = [
    { id: 'general', name: t('general'), icon: Cog6ToothIcon },
    { id: 'notifications', name: t('notifications'), icon: BellIcon },
    { id: 'security', name: t('security'), icon: ShieldCheckIcon },
    { id: 'appearance', name: t('appearance'), icon: PaintBrushIcon },
    { id: 'localization', name: t('localization'), icon: GlobeAltIcon }
  ]

  const handleSettingChange = (key: keyof Settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div>
      {/* Header with back button */}
      <div className="flex items-center mb-6">
        <Link href="/officer" className={cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800') + ' mr-4'}>
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{t('settings')}</h1>
        {saveSuccess && (
          <div className={cn('bg-blue-900/30 text-blue-400', 'bg-blue-50 text-blue-600') + ' flex items-center text-sm px-4 py-2 rounded-lg ml-4'}>
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            {t('saved')}
          </div>
        )}
      </div>

      {/* Settings Tabs */}
      <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden'}>
        <div className={cn('border-gray-700', 'border-gray-200') + ' border-b'}>
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              const tabClass = "flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 " + 
                (isActive 
                  ? "border-blue-500 text-blue-600 " + (darkMode ? 'dark:text-blue-400' : '')
                  : "border-transparent " + (darkMode ? 'text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'))
              const iconClass = "w-5 h-5 mr-2 " + 
                (isActive 
                  ? "text-blue-600 " + (darkMode ? 'dark:text-blue-400' : '')
                  : (darkMode ? 'text-gray-500' : 'text-gray-400'))
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={tabClass}
                >
                  <Icon className={iconClass} />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-medium'}>{t('general')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('siteName')}</label>
                  <input
                    type="text"
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'}
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('itemsPerPage')}</label>
                  <select
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'}
                    value={settings.itemsPerPage}
                    onChange={(e) => handleSettingChange('itemsPerPage', e.target.value)}
                  >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-medium'}>{t('notifications')}</h2>
              <div className="space-y-4">
                <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                  <div>
                    <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('emailNotifications')}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.emailNotifications ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                  >
                    <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.emailNotifications ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                
                <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                  <div>
                    <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('smsNotifications')}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.smsNotifications ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                  >
                    <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.smsNotifications ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-medium'}>{t('security')}</h2>
              <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                <div>
                  <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('twoFactorAuth')}</p>
                </div>
                <button
                  onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
                  className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.twoFactorAuth ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                >
                  <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1')} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-medium'}>{t('appearance')}</h2>
              <div>
                <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('darkMode')}</label>
                <button
                  onClick={toggleDarkMode}
                  className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (darkMode ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                >
                  <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (darkMode ? 'translate-x-6' : 'translate-x-1')} />
                </button>
                <p className={cn('text-gray-500', 'text-gray-400') + ' text-xs mt-2'}>
                  {darkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'localization' && (
            <div className="space-y-6">
              <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-medium'}>{t('localization')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('language')}</label>
                  <select
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'}
                    value={globalLanguage}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'am')} // Use setLanguage
                  >
                    <option value="en">English</option>
                    <option value="am">አማርኛ</option>
                  </select>
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('dateFormat')}</label>
                  <select
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'}
                    value={settings.dateFormat}
                    onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('timezone')}</label>
                  <select
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'}
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  >
                    <option value="UTC+3">East Africa Time (UTC+3)</option>
                    <option value="UTC+2">Central Africa Time (UTC+2)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className={cn('border-gray-700', 'border-gray-200') + ' mt-6 pt-6 border-t flex justify-end'}>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('saveChanges')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
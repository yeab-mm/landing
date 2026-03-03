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
  WalletIcon,
  BanknotesIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'

interface Settings {
  siteName: string
  siteUrl: string
  supportEmail: string
  supportPhone: string
  itemsPerPage: string
  enableRegistration: boolean
  enableMarketplace: boolean
  maintenanceMode: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  twoFactorAuth: boolean
  dateFormat: string
  timezone: string
  currency: string
  transactionFee: string
  paymentGateways: {
    telebirr: boolean
    cbeBirr: boolean
    bankTransfer: boolean
    cash: boolean
  }
}

interface Tab {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
}

export default function AdminSettingsPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode
  const toggleDarkMode = languageContext.toggleDarkMode

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  const [activeTab, setActiveTab] = useState<string>('general')
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)
  
  const [settings, setSettings] = useState<Settings>({
    siteName: 'Digital Land Portal',
    siteUrl: 'https://land.gov.et',
    supportEmail: 'support@land.gov.et',
    supportPhone: '+251 911 234 567',
    itemsPerPage: '20',
    enableRegistration: true,
    enableMarketplace: true,
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    dateFormat: 'MM/DD/YYYY',
    timezone: 'UTC+3',
    currency: 'ETB',
    transactionFee: '2.5',
    paymentGateways: {
      telebirr: true,
      cbeBirr: true,
      bankTransfer: false,
      cash: true
    }
  })

  const tabs: Tab[] = [
    { id: 'general', name: t('general'), icon: Cog6ToothIcon },
    { id: 'notifications', name: t('notifications'), icon: BellIcon },
    { id: 'security', name: t('security'), icon: ShieldCheckIcon },
    { id: 'appearance', name: t('appearance'), icon: PaintBrushIcon },
    { id: 'localization', name: t('localization'), icon: GlobeAltIcon },
    { id: 'payments', name: t('paymentSettings'), icon: CurrencyDollarIcon }
  ]

  const handleSettingChange = (key: keyof Settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleGatewayChange = (gateway: keyof Settings['paymentGateways']) => {
    setSettings(prev => ({
      ...prev,
      paymentGateways: {
        ...prev.paymentGateways,
        [gateway]: !prev.paymentGateways[gateway]
      }
    }))
  }

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{t('settings')}</h1>
        {saveSuccess && (
          <div className={cn('bg-green-900/30 text-green-400', 'bg-green-50 text-green-600') + ' flex items-center text-sm px-4 py-2 rounded-lg'}>
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
                  ? "border-green-500 text-green-600 " + (darkMode ? 'dark:text-green-400' : '')
                  : "border-transparent " + (darkMode ? 'text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'))
              const iconClass = "w-5 h-5 mr-2 " + 
                (isActive 
                  ? "text-green-600 " + (darkMode ? 'dark:text-green-400' : '')
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
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
                    value={settings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('siteUrl')}</label>
                  <input
                    type="url"
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
                    value={settings.siteUrl}
                    onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
                  />
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('supportEmail')}</label>
                  <input
                    type="email"
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
                    value={settings.supportEmail}
                    onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                  />
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('supportPhone')}</label>
                  <input
                    type="tel"
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
                    value={settings.supportPhone}
                    onChange={(e) => handleSettingChange('supportPhone', e.target.value)}
                  />
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('itemsPerPage')}</label>
                  <select
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
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
              
              <div className="space-y-3">
                <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                  <div>
                    <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('enableRegistration')}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableRegistration', !settings.enableRegistration)}
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.enableRegistration ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                  >
                    <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.enableRegistration ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                
                <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                  <div>
                    <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('enableMarketplace')}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableMarketplace', !settings.enableMarketplace)}
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.enableMarketplace ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                  >
                    <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.enableMarketplace ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
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
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.emailNotifications ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
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
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.smsNotifications ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
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
                  className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.twoFactorAuth ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
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
                  className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (darkMode ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
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
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('dateFormat')}</label>
                  <select
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
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
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
                    value={settings.timezone}
                    onChange={(e) => handleSettingChange('timezone', e.target.value)}
                  >
                    <option value="UTC+3">East Africa Time (UTC+3)</option>
                    <option value="UTC+2">Central Africa Time (UTC+2)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                  </select>
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('currency')}</label>
                  <select
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                  >
                    <option value="ETB">Ethiopian Birr (ETB)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-medium'}>{t('paymentSettings')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('currency')}</label>
                  <select
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
                    value={settings.currency}
                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                  >
                    <option value="ETB">ETB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('transactionFee')} (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
                    value={settings.transactionFee}
                    onChange={(e) => handleSettingChange('transactionFee', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className={cn('text-white', 'text-gray-900') + ' text-md font-medium mb-3'}>{t('paymentGateways')}</h3>
                <div className="space-y-3">
                  <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                    <div className="flex items-center">
                      <WalletIcon className={cn('text-gray-400', 'text-gray-500') + ' w-5 h-5 mr-3'} />
                      <div>
                        <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('telebirr')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGatewayChange('telebirr')}
                      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.paymentGateways.telebirr ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                    >
                      <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.paymentGateways.telebirr ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>

                  <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                    <div className="flex items-center">
                      <BanknotesIcon className={cn('text-gray-400', 'text-gray-500') + ' w-5 h-5 mr-3'} />
                      <div>
                        <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('cbeBirr')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGatewayChange('cbeBirr')}
                      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.paymentGateways.cbeBirr ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                    >
                      <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.paymentGateways.cbeBirr ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>

                  <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                    <div className="flex items-center">
                      <CreditCardIcon className={cn('text-gray-400', 'text-gray-500') + ' w-5 h-5 mr-3'} />
                      <div>
                        <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('bankTransfer')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGatewayChange('bankTransfer')}
                      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.paymentGateways.bankTransfer ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                    >
                      <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.paymentGateways.bankTransfer ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>

                  <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className={cn('text-gray-400', 'text-gray-500') + ' w-5 h-5 mr-3'} />
                      <div>
                        <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('cash')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGatewayChange('cash')}
                      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.paymentGateways.cash ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
                    >
                      <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.paymentGateways.cash ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className={cn('border-gray-700', 'border-gray-200') + ' mt-6 pt-6 border-t flex justify-end'}>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('saveChanges')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

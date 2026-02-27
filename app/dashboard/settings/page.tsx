'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
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
  themeColor: string
  darkMode: boolean
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

interface ThemeColor {
  name: string
  class: string
  ring: string
}

export default function SettingsPage() {
  const { t } = useTranslation()
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
    themeColor: 'green',
    darkMode: false,
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

  const themeColors: ThemeColor[] = [
    { name: 'green', class: 'bg-green-600', ring: 'ring-green-300' },
    { name: 'blue', class: 'bg-blue-600', ring: 'ring-blue-300' },
    { name: 'purple', class: 'bg-purple-600', ring: 'ring-purple-300' },
    { name: 'orange', class: 'bg-orange-600', ring: 'ring-orange-300' }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('settings')}</h1>
        {saveSuccess && (
          <div className="flex items-center text-green-600 text-sm bg-green-50 px-4 py-2 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            {t('saved')}
          </div>
        )}
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              const tabClass = "flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap " + (isActive ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300")
              const iconClass = "w-5 h-5 mr-2 " + (isActive ? "text-green-600" : "text-gray-400")
              
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
              <h2 className="text-lg font-medium text-gray-900">{t('general')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('siteName')}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.siteName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('siteUrl')}</label>
                  <input
                    type="url"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.siteUrl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('siteUrl', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('supportEmail')}</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.supportEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('supportEmail', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('supportPhone')}</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.supportPhone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('supportPhone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('itemsPerPage')}</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.itemsPerPage}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSettingChange('itemsPerPage', e.target.value)}
                  >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('enableRegistration')}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableRegistration', !settings.enableRegistration)}
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.enableRegistration ? 'bg-green-600' : 'bg-gray-300')}
                  >
                    <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.enableRegistration ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('enableMarketplace')}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('enableMarketplace', !settings.enableMarketplace)}
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.enableMarketplace ? 'bg-green-600' : 'bg-gray-300')}
                  >
                    <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.enableMarketplace ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">{t('notifications')}</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('emailNotifications')}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.emailNotifications ? 'bg-green-600' : 'bg-gray-300')}
                  >
                    <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.emailNotifications ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{t('smsNotifications')}</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}
                    className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.smsNotifications ? 'bg-green-600' : 'bg-gray-300')}
                  >
                    <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.smsNotifications ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">{t('security')}</h2>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{t('twoFactorAuth')}</p>
                </div>
                <button
                  onClick={() => handleSettingChange('twoFactorAuth', !settings.twoFactorAuth)}
                  className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.twoFactorAuth ? 'bg-green-600' : 'bg-gray-300')}
                >
                  <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1')} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">{t('appearance')}</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('themeColor')}</label>
                <div className="flex space-x-3">
                  {themeColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleSettingChange('themeColor', color.name)}
                      className={'w-10 h-10 rounded-full ' + color.class + (settings.themeColor === color.name ? ' ring-4 ' + color.ring : '')}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('darkMode')}</label>
                <button
                  onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
                  className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.darkMode ? 'bg-green-600' : 'bg-gray-300')}
                >
                  <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.darkMode ? 'translate-x-6' : 'translate-x-1')} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'localization' && (
            <div className="space-y-6">
              <h2 className="text-lg font-medium text-gray-900">{t('localization')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('dateFormat')}</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.dateFormat}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSettingChange('dateFormat', e.target.value)}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('timezone')}</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.timezone}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSettingChange('timezone', e.target.value)}
                  >
                    <option value="UTC+3">East Africa Time (UTC+3)</option>
                    <option value="UTC+2">Central Africa Time (UTC+2)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('currency')}</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.currency}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSettingChange('currency', e.target.value)}
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
              <h2 className="text-lg font-medium text-gray-900">{t('paymentSettings')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('currency')}</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.currency}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSettingChange('currency', e.target.value)}
                  >
                    <option value="ETB">ETB</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('transactionFee')} (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={settings.transactionFee}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('transactionFee', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-md font-medium mb-3 text-gray-900">{t('paymentGateways')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <WalletIcon className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{t('telebirr')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGatewayChange('telebirr')}
                      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.paymentGateways.telebirr ? 'bg-green-600' : 'bg-gray-300')}
                    >
                      <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.paymentGateways.telebirr ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <BanknotesIcon className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{t('cbeBirr')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGatewayChange('cbeBirr')}
                      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.paymentGateways.cbeBirr ? 'bg-green-600' : 'bg-gray-300')}
                    >
                      <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.paymentGateways.cbeBirr ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CreditCardIcon className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{t('bankTransfer')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGatewayChange('bankTransfer')}
                      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.paymentGateways.bankTransfer ? 'bg-green-600' : 'bg-gray-300')}
                    >
                      <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.paymentGateways.bankTransfer ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="w-5 h-5 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-900">{t('cash')}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGatewayChange('cash')}
                      className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (settings.paymentGateways.cash ? 'bg-green-600' : 'bg-gray-300')}
                    >
                      <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (settings.paymentGateways.cash ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {t('saveChanges')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  ShieldCheckIcon,
  KeyIcon,
  FingerPrintIcon,
  ClockIcon,
  GlobeAltIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

type SecurityStatus = 'success' | 'failed' | 'warning'

interface SecurityEvent {
  id: number
  event: string
  location: string
  device: string
  ip: string
  status: SecurityStatus
  time: string
}

interface ActiveSession {
  id: number
  device: string
  location: string
  ip: string
  lastActive: string
  current: boolean
}

export default function AdminSecurityPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true)
  const [loginAlerts, setLoginAlerts] = useState({
    email: true,
    sms: false
  })

  const securityEvents: SecurityEvent[] = [
    { 
      id: 1, 
      event: t('loginAttempt'), 
      location: 'አዲስ አበባ፣ ኢትዮጵያ', 
      device: 'Chrome በዊንዶውስ', 
      ip: '196.188.123.45', 
      status: 'success', 
      time: '2 ' + t('minutesAgo') 
    },
    { 
      id: 2, 
      event: t('passwordChanged'), 
      location: 'ባሕር ዳር፣ ኢትዮጵያ', 
      device: 'Firefox በማክኦኤስ', 
      ip: '196.189.67.89', 
      status: 'success', 
      time: '1 ' + t('hoursAgo') 
    },
    { 
      id: 3, 
      event: t('failedLogin'), 
      location: t('unknown'), 
      device: 'Safari በአይፎን', 
      ip: '45.67.123.89', 
      status: 'failed', 
      time: '3 ' + t('hoursAgo') 
    },
    { 
      id: 4, 
      event: t('twoFactorAuth'), 
      location: 'አዲስ አበባ፣ ኢትዮጵያ', 
      device: 'Chrome በአንድሮይድ', 
      ip: '196.188.45.67', 
      status: 'success', 
      time: '5 ' + t('hoursAgo') 
    },
    { 
      id: 5, 
      event: t('accountSettingsChanged'), 
      location: 'አዲስ አበባ፣ ኢትዮጵያ', 
      device: 'Edge በዊንዶውስ', 
      ip: '196.188.78.90', 
      status: 'warning', 
      time: '1 ' + t('daysAgo') 
    }
  ]

  const activeSessions: ActiveSession[] = [
    { 
      id: 1, 
      device: 'Chrome በዊንዶውስ', 
      location: 'አዲስ አበባ፣ ኢትዮጵያ', 
      ip: '196.188.123.45', 
      lastActive: t('currentlyActive'), 
      current: true 
    },
    { 
      id: 2, 
      device: 'Safari በአይፎን', 
      location: 'ባሕር ዳር፣ ኢትዮጵያ', 
      ip: '196.189.67.89', 
      lastActive: '2 ' + t('hoursAgo'), 
      current: false 
    }
  ]

  const getStatusColor = (status: SecurityStatus): string => {
    if (status === 'success') {
      return cn('text-green-400 bg-green-900/30', 'text-green-600 bg-green-100')
    } else if (status === 'failed') {
      return cn('text-red-400 bg-red-900/30', 'text-red-600 bg-red-100')
    } else {
      return cn('text-yellow-400 bg-yellow-900/30', 'text-yellow-600 bg-yellow-100')
    }
  }

  const getStatusIcon = (status: SecurityStatus) => {
    if (status === 'success') return CheckCircleIcon
    if (status === 'failed') return XCircleIcon
    return ExclamationTriangleIcon
  }

  return (
    <div className={cn('bg-gray-900', 'bg-gray-50') + ' min-h-screen'}>
      <div className="p-8">
        <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold mb-6'}>{t('security')}</h1>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <div className="flex items-center justify-between mb-2">
              <KeyIcon className={cn('text-green-400', 'text-green-600') + ' w-8 h-8'} />
              <span className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>2FA</span>
            </div>
            <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm'}>{t('twoFactorAuth')}</p>
            <p className={cn('text-green-400', 'text-green-600') + ' text-xs mt-2'}>{t('enabled')}</p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <div className="flex items-center justify-between mb-2">
              <FingerPrintIcon className={cn('text-purple-400', 'text-purple-600') + ' w-8 h-8'} />
              <span className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>4</span>
            </div>
            <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm'}>{t('activeSessions')}</p>
            <p className={cn('text-gray-500', 'text-gray-500') + ' text-xs mt-2'}>2 {t('devices')}</p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <div className="flex items-center justify-between mb-2">
              <ClockIcon className={cn('text-yellow-400', 'text-yellow-600') + ' w-8 h-8'} />
              <span className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>30</span>
            </div>
            <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm'}>{t('daysSinceLastPassword')}</p>
            <p className={cn('text-yellow-400', 'text-yellow-600') + ' text-xs mt-2'}>{t('recommended90Days')}</p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <div className="flex items-center justify-between mb-2">
              <ShieldCheckIcon className={cn('text-green-400', 'text-green-600') + ' w-8 h-8'} />
              <span className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>85%</span>
            </div>
            <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm'}>{t('securityScore')}</p>
            <p className={cn('text-green-400', 'text-green-600') + ' text-xs mt-2'}>{t('good')}</p>
          </div>
        </div>

        {/* Two Factor Authentication */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-6 mb-6'}>
          <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold mb-4'}>{t('twoFactorAuth')}</h2>
          <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
            <div className="flex items-start space-x-3">
              <ShieldCheckIcon className={cn('text-green-400', 'text-green-600') + ' w-5 h-5 mt-0.5'} />
              <div>
                <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('secureYourAccount')}</p>
                <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('twoFactorDescription')}</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (twoFactorEnabled ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
            >
              <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (twoFactorEnabled ? 'translate-x-6' : 'translate-x-1')} />
            </button>
          </div>
          {twoFactorEnabled && (
            <div className={cn('bg-green-900/30', 'bg-green-50') + ' mt-4 p-4 rounded-lg'}>
              <p className={cn('text-green-400', 'text-green-800') + ' text-sm flex items-center'}>
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                {t('twoFactorEnabled')}
              </p>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-6 mb-6'}>
          <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold mb-4'}>{t('password')}</h2>
          <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-4 rounded-lg'}>
            <div className="flex items-start space-x-3">
              <KeyIcon className={cn('text-gray-400', 'text-gray-500') + ' w-5 h-5 mt-0.5'} />
              <div>
                <p className={cn('text-white', 'text-gray-900') + ' font-medium'}>{t('changePassword')}</p>
                <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('lastChanged30Days')} • {t('strongPassword')}</p>
              </div>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700">
              {t('change')}
            </button>
          </div>
        </div>

        {/* Login Alerts */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-6 mb-6'}>
          <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold mb-4'}>{t('loginAlerts')}</h2>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm mb-4'}>{t('loginAlertsDescription')}</p>
          <div className="space-y-3">
            <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-3 rounded-lg'}>
              <div className="flex items-center">
                <EnvelopeIcon className={cn('text-gray-400', 'text-gray-500') + ' w-5 h-5 mr-3'} />
                <span className={cn('text-gray-300', 'text-gray-700') + ' text-sm'}>{t('emailNotifications')}</span>
              </div>
              <button
                onClick={() => setLoginAlerts({...loginAlerts, email: !loginAlerts.email})}
                className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (loginAlerts.email ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
              >
                <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (loginAlerts.email ? 'translate-x-6' : 'translate-x-1')} />
              </button>
            </div>
            <div className={cn('bg-gray-700/50', 'bg-gray-50') + ' flex items-center justify-between p-3 rounded-lg'}>
              <div className="flex items-center">
                <DevicePhoneMobileIcon className={cn('text-gray-400', 'text-gray-500') + ' w-5 h-5 mr-3'} />
                <span className={cn('text-gray-300', 'text-gray-700') + ' text-sm'}>{t('smsNotifications')}</span>
              </div>
              <button
                onClick={() => setLoginAlerts({...loginAlerts, sms: !loginAlerts.sms})}
                className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (loginAlerts.sms ? 'bg-green-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300'))}
              >
                <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (loginAlerts.sms ? 'translate-x-6' : 'translate-x-1')} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden mb-6'}>
          <div className={cn('border-gray-700', 'border-gray-200') + ' px-6 py-4 border-b'}>
            <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold'}>{t('activeSessions')}</h2>
          </div>
          <div className={cn('divide-gray-700', 'divide-gray-200') + ' divide-y'}>
            {activeSessions.map((session) => (
              <div key={session.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' p-6 transition-colors'}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={cn('bg-green-900/30', 'bg-green-100') + ' p-2 rounded-lg'}>
                      <ComputerDesktopIcon className={cn('text-green-400', 'text-green-600') + ' w-5 h-5'} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={cn('text-white', 'text-gray-900') + ' font-medium'}>{session.device}</h3>
                        {session.current && (
                          <span className={cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-800') + ' text-xs px-2 py-0.5 rounded-full'}>
                            {t('currentSession')}
                          </span>
                        )}
                      </div>
                      <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm mb-1'}>{session.location}</p>
                      <p className={cn('text-gray-500', 'text-gray-400') + ' text-xs'}>IP: {session.ip}</p>
                      <p className={cn('text-gray-500', 'text-gray-400') + ' text-xs mt-1'}>{t('lastActive')}: {session.lastActive}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className={cn('text-red-400 hover:text-red-300', 'text-red-600 hover:text-red-700') + ' text-sm'}>
                      {t('revoke')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden'}>
          <div className={cn('border-gray-700', 'border-gray-200') + ' px-6 py-4 border-b'}>
            <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold'}>{t('recentActivity')}</h2>
          </div>
          <div className={cn('divide-gray-700', 'divide-gray-200') + ' divide-y'}>
            {securityEvents.map((event) => {
              const StatusIcon = getStatusIcon(event.status)
              const statusColor = getStatusColor(event.status)
              
              return (
                <div key={event.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' p-6 transition-colors'}>
                  <div className="flex items-start space-x-4">
                    <div className={'p-2 rounded-lg ' + statusColor}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={cn('text-white', 'text-gray-900') + ' font-medium'}>{event.event}</h3>
                        <span className={cn('text-gray-500', 'text-gray-400') + ' text-xs'}>{event.time}</span>
                      </div>
                      <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm mb-1'}>{event.location}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className={cn('text-gray-500', 'text-gray-400')}>{event.device}</span>
                        <span className={cn('text-gray-500', 'text-gray-400')}>IP: {event.ip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
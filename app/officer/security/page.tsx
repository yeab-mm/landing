
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
  EnvelopeIcon,
  ArrowLeftIcon
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

export default function OfficerSecurityPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode

  // Dark mode helper classes
  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50'
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white'
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900'
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-500'
  const textMuted = darkMode ? 'text-gray-500' : 'text-gray-400'
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200'
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'

  const [twoFactorEnabled, setTwoFactorEnabled] = useState<boolean>(true)
  const [loginAlerts, setLoginAlerts] = useState({
    email: true,
    sms: false
  })

  const securityEvents: SecurityEvent[] = [
    { id: 1, event: t('loginAttempt'), location: 'Addis Ababa, Ethiopia', device: 'Chrome on Windows', ip: '196.188.123.45', status: 'success', time: '2 ' + t('minutesAgo') },
    { id: 2, event: t('passwordChanged'), location: 'Bahir Dar, Ethiopia', device: 'Firefox on MacOS', ip: '196.189.67.89', status: 'success', time: '1 ' + t('hoursAgo') },
    { id: 3, event: t('failedLogin'), location: t('unknown'), device: 'Safari on iPhone', ip: '45.67.123.89', status: 'failed', time: '3 ' + t('hoursAgo') },
    { id: 4, event: t('twoFactorAuth'), location: 'Addis Ababa, Ethiopia', device: 'Chrome on Android', ip: '196.188.45.67', status: 'success', time: '5 ' + t('hoursAgo') },
    { id: 5, event: t('accountSettingsChanged'), location: 'Addis Ababa, Ethiopia', device: 'Edge on Windows', ip: '196.188.78.90', status: 'warning', time: '1 ' + t('daysAgo') }
  ]

  const activeSessions: ActiveSession[] = [
    { id: 1, device: 'Chrome on Windows', location: 'Addis Ababa, Ethiopia', ip: '196.188.123.45', lastActive: t('currentlyActive'), current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Bahir Dar, Ethiopia', ip: '196.189.67.89', lastActive: '2 ' + t('hoursAgo'), current: false }
  ]

  const getStatusColor = (status: SecurityStatus): string => {
    if (status === 'success') {
      return darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600'
    } else if (status === 'failed') {
      return darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'
    } else {
      return darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
    }
  }

  const getStatusIcon = (status: SecurityStatus) => {
    if (status === 'success') return CheckCircleIcon
    if (status === 'failed') return XCircleIcon
    return ExclamationTriangleIcon
  }

  return (
    <div className={`${bgColor} min-h-screen`}>
      <div className="p-6">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link
            href="/officer"
            className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:opacity-80 mr-4`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className={`${textPrimary} text-2xl font-bold`}>
            {t('security')}
          </h1>
        </div>

        {/* Security Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <div className="flex items-center justify-between mb-2">
              <KeyIcon className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} w-8 h-8`} />
              <span className={`${textPrimary} text-2xl font-bold`}>2FA</span>
            </div>
            <p className={`${textSecondary} text-sm`}>{t('twoFactorAuth')}</p>
            <p className={`${darkMode ? 'text-green-400' : 'text-green-600'} text-xs mt-2`}>{t('enabled')}</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <div className="flex items-center justify-between mb-2">
              <FingerPrintIcon className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} w-8 h-8`} />
              <span className={`${textPrimary} text-2xl font-bold`}>4</span>
            </div>
            <p className={`${textSecondary} text-sm`}>{t('activeSessions')}</p>
            <p className={`${textMuted} text-xs mt-2`}>2 {t('devices')}</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <div className="flex items-center justify-between mb-2">
              <ClockIcon className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'} w-8 h-8`} />
              <span className={`${textPrimary} text-2xl font-bold`}>30</span>
            </div>
            <p className={`${textSecondary} text-sm`}>{t('daysSinceLastPassword')}</p>
            <p className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'} text-xs mt-2`}>{t('recommended90Days')}</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <div className="flex items-center justify-between mb-2">
              <ShieldCheckIcon className={`${darkMode ? 'text-green-400' : 'text-green-600'} w-8 h-8`} />
              <span className={`${textPrimary} text-2xl font-bold`}>85%</span>
            </div>
            <p className={`${textSecondary} text-sm`}>{t('securityScore')}</p>
            <p className={`${darkMode ? 'text-green-400' : 'text-green-600'} text-xs mt-2`}>{t('good')}</p>
          </div>
        </div>

        {/* Two Factor Authentication */}
        <div className={`${cardBg} rounded-xl shadow-sm p-6 mb-6`}>
          <h2 className={`${textPrimary} text-lg font-semibold mb-4`}>{t('twoFactorAuth')}</h2>
          <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} flex items-center justify-between p-4 rounded-lg`}>
            <div className="flex items-start space-x-3">
              <ShieldCheckIcon className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} w-5 h-5 mt-0.5`} />
              <div>
                <p className={`${textPrimary} font-medium`}>{t('secureYourAccount')}</p>
                <p className={`${textSecondary} text-sm`}>{t('twoFactorDescription')}</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300')}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          {twoFactorEnabled && (
            <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} mt-4 p-4 rounded-lg`}>
              <p className={`${darkMode ? 'text-blue-400' : 'text-blue-800'} text-sm flex items-center`}>
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                {t('twoFactorEnabled')}
              </p>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className={`${cardBg} rounded-xl shadow-sm p-6 mb-6`}>
          <h2 className={`${textPrimary} text-lg font-semibold mb-4`}>{t('password')}</h2>
          <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} flex items-center justify-between p-4 rounded-lg`}>
            <div className="flex items-start space-x-3">
              <KeyIcon className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} w-5 h-5 mt-0.5`} />
              <div>
                <p className={`${textPrimary} font-medium`}>{t('changePassword')}</p>
                <p className={`${textSecondary} text-sm`}>{t('lastChanged30Days')} • {t('strongPassword')}</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
              {t('change')}
            </button>
          </div>
        </div>

        {/* Login Alerts */}
        <div className={`${cardBg} rounded-xl shadow-sm p-6 mb-6`}>
          <h2 className={`${textPrimary} text-lg font-semibold mb-4`}>{t('loginAlerts')}</h2>
          <p className={`${textSecondary} text-sm mb-4`}>{t('loginAlertsDescription')}</p>
          <div className="space-y-3">
            <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} flex items-center justify-between p-3 rounded-lg`}>
              <div className="flex items-center">
                <EnvelopeIcon className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} w-5 h-5 mr-3`} />
                <span className={`${textPrimary} text-sm`}>{t('emailNotifications')}</span>
              </div>
              <button
                onClick={() => setLoginAlerts({...loginAlerts, email: !loginAlerts.email})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${loginAlerts.email ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300')}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${loginAlerts.email ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} flex items-center justify-between p-3 rounded-lg`}>
              <div className="flex items-center">
                <DevicePhoneMobileIcon className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} w-5 h-5 mr-3`} />
                <span className={`${textPrimary} text-sm`}>{t('smsNotifications')}</span>
              </div>
              <button
                onClick={() => setLoginAlerts({...loginAlerts, sms: !loginAlerts.sms})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${loginAlerts.sms ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-300')}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${loginAlerts.sms ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className={`${cardBg} rounded-xl shadow-sm overflow-hidden mb-6`}>
          <div className={`px-6 py-4 border-b ${borderColor}`}>
            <h2 className={`${textPrimary} text-lg font-semibold`}>{t('activeSessions')}</h2>
          </div>
          <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {activeSessions.map((session) => (
              <div key={session.id} className={`p-6 ${hoverBg} transition-colors`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} p-2 rounded-lg`}>
                      <ComputerDesktopIcon className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} w-5 h-5`} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className={`${textPrimary} font-medium`}>{session.device}</h3>
                        {session.current && (
                          <span className={`${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-0.5 rounded-full`}>
                            {t('currentSession')}
                          </span>
                        )}
                      </div>
                      <p className={`${textSecondary} text-sm mb-1`}>{session.location}</p>
                      <p className={`${textMuted} text-xs`}>IP: {session.ip}</p>
                      <p className={`${textMuted} text-xs mt-1`}>{t('lastActive')}: {session.lastActive}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <button className={`${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'} text-sm`}>
                      {t('revoke')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`${cardBg} rounded-xl shadow-sm overflow-hidden`}>
          <div className={`px-6 py-4 border-b ${borderColor}`}>
            <h2 className={`${textPrimary} text-lg font-semibold`}>{t('recentActivity')}</h2>
          </div>
          <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {securityEvents.map((event) => {
              const StatusIcon = getStatusIcon(event.status)
              const statusColor = getStatusColor(event.status)
              
              return (
                <div key={event.id} className={`p-6 ${hoverBg} transition-colors`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${statusColor}`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`${textPrimary} font-medium`}>{event.event}</h3>
                        <span className={`${textMuted} text-xs`}>{event.time}</span>
                      </div>
                      <p className={`${textSecondary} text-sm mb-1`}>{event.location}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className={`${textMuted}`}>{event.device}</span>
                        <span className={`${textMuted}`}>IP: {event.ip}</span>
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

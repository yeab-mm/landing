'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '../../../lib/useTranslation'
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

export default function SecurityPage() {
  const { t } = useTranslation()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState({
    email: true,
    sms: false
  })

  const securityEvents = [
    { id: 1, event: 'Login Attempt', location: 'Addis Ababa, Ethiopia', device: 'Chrome on Windows', ip: '196.188.123.45', status: 'success', time: '2 minutes ago' },
    { id: 2, event: 'Password Changed', location: 'Bahir Dar, Ethiopia', device: 'Firefox on MacOS', ip: '196.189.67.89', status: 'success', time: '1 hour ago' },
    { id: 3, event: 'Failed Login Attempt', location: 'Unknown', device: 'Safari on iPhone', ip: '45.67.123.89', status: 'failed', time: '3 hours ago' },
    { id: 4, event: 'Two-Factor Authentication', location: 'Addis Ababa, Ethiopia', device: 'Chrome on Android', ip: '196.188.45.67', status: 'success', time: '5 hours ago' },
    { id: 5, event: 'Account Settings Changed', location: 'Addis Ababa, Ethiopia', device: 'Edge on Windows', ip: '196.188.78.90', status: 'warning', time: '1 day ago' }
  ]

  const activeSessions = [
    { id: 1, device: 'Chrome on Windows', location: 'Addis Ababa, Ethiopia', ip: '196.188.123.45', lastActive: 'Currently active', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Bahir Dar, Ethiopia', ip: '196.189.67.89', lastActive: '2 hours ago', current: false }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'success': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'success': return CheckCircleIcon
      case 'failed': return XCircleIcon
      case 'warning': return ExclamationTriangleIcon
      default: return ClockIcon
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('security')}</h1>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <KeyIcon className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">2FA</span>
          </div>
          <p className="text-sm text-gray-600">Two-factor authentication</p>
          <p className="text-xs text-green-600 mt-2">Enabled</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <FingerPrintIcon className="w-8 h-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">4</span>
          </div>
          <p className="text-sm text-gray-600">Active sessions</p>
          <p className="text-xs text-gray-500 mt-2">2 devices</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <ClockIcon className="w-8 h-8 text-yellow-600" />
            <span className="text-2xl font-bold text-gray-900">30</span>
          </div>
          <p className="text-sm text-gray-600">Days since last password change</p>
          <p className="text-xs text-yellow-600 mt-2">Recommended: 90 days</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <ShieldCheckIcon className="w-8 h-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">85%</span>
          </div>
          <p className="text-sm text-gray-600">Security score</p>
          <p className="text-xs text-green-600 mt-2">Good</p>
        </div>
      </div>

      {/* Two Factor Authentication */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication (2FA)</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <ShieldCheckIcon className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Secure Your Account</p>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account by requiring a verification code in addition to your password</p>
            </div>
          </div>
          <button
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (twoFactorEnabled ? 'bg-green-600' : 'bg-gray-300')}
          >
            <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (twoFactorEnabled ? 'translate-x-6' : 'translate-x-1')} />
          </button>
        </div>
        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-800 flex items-center">
              <CheckCircleIcon className="w-4 h-4 mr-2" />
              Two-factor authentication is enabled. Your account is extra secure.
            </p>
          </div>
        )}
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Password</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <KeyIcon className="w-5 h-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Change Password</p>
              <p className="text-sm text-gray-500">Last changed 30 days ago • Strong password</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
            Change Password
          </button>
        </div>
      </div>

      {/* Login Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Login Alerts</h2>
        <p className="text-sm text-gray-500 mb-4">Get notified when someone logs into your account</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-700">Email notifications</span>
            </div>
            <button
              onClick={() => setLoginAlerts({...loginAlerts, email: !loginAlerts.email})}
              className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (loginAlerts.email ? 'bg-green-600' : 'bg-gray-300')}
            >
              <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (loginAlerts.email ? 'translate-x-6' : 'translate-x-1')} />
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <DevicePhoneMobileIcon className="w-5 h-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-700">SMS notifications</span>
            </div>
            <button
              onClick={() => setLoginAlerts({...loginAlerts, sms: !loginAlerts.sms})}
              className={'relative inline-flex h-6 w-11 items-center rounded-full transition-colors ' + (loginAlerts.sms ? 'bg-green-600' : 'bg-gray-300')}
            >
              <span className={'inline-block h-4 w-4 transform rounded-full bg-white transition-transform ' + (loginAlerts.sms ? 'translate-x-6' : 'translate-x-1')} />
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Sessions</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {activeSessions.map((session) => (
            <div key={session.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ComputerDesktopIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{session.device}</h3>
                      {session.current && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          Current Session
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{session.location}</p>
                    <p className="text-xs text-gray-400">IP: {session.ip}</p>
                    <p className="text-xs text-gray-400 mt-1">Last active: {session.lastActive}</p>
                  </div>
                </div>
                {!session.current && (
                  <button className="text-sm text-red-600 hover:text-red-700">
                    Revoke
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {securityEvents.map((event) => {
            const StatusIcon = getStatusIcon(event.status)
            const statusColor = getStatusColor(event.status)
            
            return (
              <div key={event.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start space-x-4">
                  <div className={'p-2 rounded-lg ' + statusColor}>
                    <StatusIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-gray-900">{event.event}</h3>
                      <span className="text-xs text-gray-400">{event.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{event.location}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>{event.device}</span>
                      <span>IP: {event.ip}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

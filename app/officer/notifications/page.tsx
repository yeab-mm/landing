
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  TrashIcon,
  CheckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface Notification {
  id: number
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  read: boolean
  time: string
}

export default function OfficerNotificationsPage() {
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

  const [filter, setFilter] = useState<string>('all')
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: t('newVerification'), message: t('newVerificationMsg'), type: 'info', read: false, time: '5 ' + t('minutesAgo') },
    { id: 2, title: t('paymentReceived'), message: t('paymentReceivedMsg'), type: 'success', read: false, time: '15 ' + t('minutesAgo') },
    { id: 3, title: t('verificationApproved'), message: t('verificationApprovedMsg'), type: 'success', read: true, time: '1 ' + t('hoursAgo') },
    { id: 4, title: t('systemAlert'), message: t('systemAlertMsg'), type: 'warning', read: true, time: '2 ' + t('hoursAgo') },
    { id: 5, title: t('verificationRejected'), message: t('verificationRejectedMsg'), type: 'error', read: false, time: '3 ' + t('hoursAgo') }
  ])

  const getTypeColor = (type: string): string => {
    if (type === 'success') {
      return darkMode ? 'bg-green-900/30 text-green-400 border-green-800' : 'bg-green-100 text-green-800 border-green-200'
    } else if (type === 'error') {
      return darkMode ? 'bg-red-900/30 text-red-400 border-red-800' : 'bg-red-100 text-red-800 border-red-200'
    } else if (type === 'warning') {
      return darkMode ? 'bg-yellow-900/30 text-yellow-400 border-yellow-800' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
    } else {
      return darkMode ? 'bg-blue-900/30 text-blue-400 border-blue-800' : 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getTypeIcon = (type: string) => {
    if (type === 'success') return CheckCircleIcon
    if (type === 'error') return XCircleIcon
    if (type === 'warning') return ExclamationTriangleIcon
    return InformationCircleIcon
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read
    if (filter === 'read') return n.read
    return true
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className={`${bgColor} min-h-screen`}>
      <div className="p-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link
              href="/officer"
              className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:opacity-80 mr-4`}
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <h1 className={`${textPrimary} text-2xl font-bold`}>
              {t('notifications')}
            </h1>
          </div>
          <button
            onClick={markAllAsRead}
            className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:opacity-80 flex items-center text-sm font-medium`}
          >
            <CheckIcon className="w-4 h-4 mr-1" />
            {t('markAllAsRead')}
          </button>
        </div>

        {/* Filters */}
        <div className={`${cardBg} rounded-xl shadow-sm p-4 mb-6`}>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('all')} ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filter === 'unread' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('unread')} ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                filter === 'read' 
                  ? 'bg-blue-600 text-white' 
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('read')} ({notifications.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className={`${cardBg} rounded-xl shadow-sm overflow-hidden`}>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className={`${darkMode ? 'text-gray-600' : 'text-gray-300'} w-12 h-12 mx-auto mb-4`} />
              <p className={`${textSecondary}`}>{t('noNotifications')}</p>
            </div>
          ) : (
            <div className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {filteredNotifications.map((notification) => {
                const Icon = getTypeIcon(notification.type)
                const typeColor = getTypeColor(notification.type)
                
                return (
                  <div
                    key={notification.id}
                    className={`p-6 hover:opacity-80 transition-colors cursor-pointer ${
                      !notification.read
                        ? darkMode 
                          ? 'bg-blue-900/20 hover:bg-gray-700' 
                          : 'bg-blue-50 hover:bg-gray-50'
                        : darkMode
                          ? 'hover:bg-gray-700' 
                          : 'hover:bg-gray-50'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${typeColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`${textPrimary} font-medium`}>{notification.title}</h3>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <p className={`${textMuted} text-sm mb-2`}>{notification.message}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className={`${textMuted} flex items-center`}>
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {notification.time}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full ${typeColor}`}>
                              {notification.type === 'success' ? t('success') :
                               notification.type === 'error' ? t('error') :
                               notification.type === 'warning' ? t('warning') : t('info')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNotification(notification.id)
                        }}
                        className={`${darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-600'}`}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

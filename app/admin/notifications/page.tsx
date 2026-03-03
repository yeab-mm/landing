'use client'

import { useState, useEffect } from 'react'
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
  CheckIcon
} from '@heroicons/react/24/outline'

interface Notification {
  id: number
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  read: boolean
  time: string
}

export default function AdminNotificationsPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode
  const { language } = languageContext

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  const [filter, setFilter] = useState<string>('all')
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Update notifications when language changes
  useEffect(() => {
    setNotifications([
      { 
        id: 1, 
        title: t('newVerification'), 
        message: t('newVerificationMsg'), 
        type: 'info', 
        read: false, 
        time: '5 ' + t('minutesAgo') 
      },
      { 
        id: 2, 
        title: t('paymentReceived'), 
        message: t('paymentReceivedMsg'), 
        type: 'success', 
        read: false, 
        time: '15 ' + t('minutesAgo') 
      },
      { 
        id: 3, 
        title: t('verificationApproved'), 
        message: t('verificationApprovedMsg'), 
        type: 'success', 
        read: true, 
        time: '1 ' + t('hoursAgo') 
      },
      { 
        id: 4, 
        title: t('systemAlert'), 
        message: t('systemAlertMsg'), 
        type: 'warning', 
        read: true, 
        time: '2 ' + t('hoursAgo') 
      },
      { 
        id: 5, 
        title: t('verificationRejected'), 
        message: t('verificationRejectedMsg'), 
        type: 'error', 
        read: false, 
        time: '3 ' + t('hoursAgo') 
      }
    ])
  }, [language, t]) // Re-run when language or t function changes

  const getTypeColor = (type: string): string => {
    if (type === 'success') {
      return cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-800')
    } else if (type === 'error') {
      return cn('bg-red-900/30 text-red-400', 'bg-red-100 text-red-800')
    } else if (type === 'warning') {
      return cn('bg-yellow-900/30 text-yellow-400', 'bg-yellow-100 text-yellow-800')
    } else {
      return cn('bg-blue-900/30 text-blue-400', 'bg-blue-100 text-blue-800')
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
    <div className={cn('bg-gray-900', 'bg-gray-50') + ' min-h-screen'}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{t('notifications')}</h1>
          <button
            onClick={markAllAsRead}
            className={cn('text-green-400 hover:text-green-300', 'text-green-600 hover:text-green-800') + ' flex items-center text-sm font-medium'}
          >
            <CheckIcon className="w-4 h-4 mr-1" />
            {t('markAllAsRead')}
          </button>
        </div>

        {/* Filters */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4 mb-6'}>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={'px-4 py-2 text-sm rounded-lg transition-colors ' + 
                (filter === 'all' 
                  ? 'bg-green-600 text-white' 
                  : cn('bg-gray-700 text-gray-300 hover:bg-gray-600', 'bg-gray-100 text-gray-700 hover:bg-gray-200'))}
            >
              {t('all')} ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={'px-4 py-2 text-sm rounded-lg transition-colors ' + 
                (filter === 'unread' 
                  ? 'bg-green-600 text-white' 
                  : cn('bg-gray-700 text-gray-300 hover:bg-gray-600', 'bg-gray-100 text-gray-700 hover:bg-gray-200'))}
            >
              {t('unread')} ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={'px-4 py-2 text-sm rounded-lg transition-colors ' + 
                (filter === 'read' 
                  ? 'bg-green-600 text-white' 
                  : cn('bg-gray-700 text-gray-300 hover:bg-gray-600', 'bg-gray-100 text-gray-700 hover:bg-gray-200'))}
            >
              {t('read')} ({notifications.length - unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden'}>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <BellIcon className={cn('text-gray-600', 'text-gray-300') + ' w-12 h-12 mx-auto mb-4'} />
              <p className={cn('text-gray-400', 'text-gray-500')}>{t('noNotifications')}</p>
            </div>
          ) : (
            <div className={cn('divide-gray-700', 'divide-gray-200') + ' divide-y'}>
              {filteredNotifications.map((notification) => {
                const Icon = getTypeIcon(notification.type)
                const typeColor = getTypeColor(notification.type)
                
                return (
                  <div
                    key={notification.id}
                    className={'p-6 hover:opacity-80 transition-colors cursor-pointer ' + 
                      (!notification.read 
                        ? (darkMode ? 'bg-green-900/20 hover:bg-gray-700' : 'bg-green-50 hover:bg-gray-50')
                        : (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'))}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={'p-2 rounded-lg ' + typeColor}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={cn('text-white', 'text-gray-900') + ' font-medium'}>{notification.title}</h3>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                            )}
                          </div>
                          <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm mb-2'}>{notification.message}</p>
                          <div className="flex items-center space-x-4 text-xs">
                            <span className={cn('text-gray-500', 'text-gray-400') + ' flex items-center'}>
                              <ClockIcon className="w-3 h-3 mr-1" />
                              {notification.time}
                            </span>
                            <span className={'px-2 py-0.5 rounded-full ' + typeColor}>
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
                        className={cn('text-gray-500 hover:text-red-400', 'text-gray-400 hover:text-red-600')}
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
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
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
  type: string
  read: boolean
  time: string
}

export default function NotificationsPage() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<string>('all')
  
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'New Verification Request', message: 'Abebe Kebede has submitted a land verification request for parcel BA-2023-045', type: 'info', read: false, time: '5 minutes ago' },
    { id: 2, title: 'Payment Received', message: 'Payment of ₿ 2,500,000 for land purchase has been completed', type: 'success', read: false, time: '15 minutes ago' },
    { id: 3, title: 'Verification Approved', message: 'Land verification for Tigist Haile has been approved', type: 'success', read: true, time: '1 hour ago' },
    { id: 4, title: 'System Alert', message: 'Database backup completed successfully', type: 'warning', read: true, time: '2 hours ago' },
    { id: 5, title: 'Verification Rejected', message: 'Land verification for Tekle Berhan has been rejected due to incomplete documents', type: 'error', read: false, time: '3 hours ago' }
  ])

  const getTypeColor = (type: string): string => {
    switch(type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200'
      case 'error': return 'bg-red-100 text-red-800 border-red-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'success': return CheckCircleIcon
      case 'error': return XCircleIcon
      case 'warning': return ExclamationTriangleIcon
      default: return InformationCircleIcon
    }
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('notifications')}</h1>
        <button
          onClick={markAllAsRead}
          className="flex items-center text-sm text-green-600 hover:text-green-800"
        >
          <CheckIcon className="w-4 h-4 mr-1" />
          Mark all as read
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={'px-4 py-2 text-sm rounded-lg ' + (filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={'px-4 py-2 text-sm rounded-lg ' + (filter === 'unread' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={'px-4 py-2 text-sm rounded-lg ' + (filter === 'read' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200')}
          >
            Read ({notifications.length - unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <BellIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => {
              const Icon = getTypeIcon(notification.type)
              const typeColor = getTypeColor(notification.type)
              
              return (
                <div
                  key={notification.id}
                  className={'p-6 hover:bg-gray-50 transition-colors cursor-pointer ' + (!notification.read ? 'bg-green-50' : '')}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={'p-2 rounded-lg ' + typeColor}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-400">
                          <span className="flex items-center">
                            <ClockIcon className="w-3 h-3 mr-1" />
                            {notification.time}
                          </span>
                          <span className={'px-2 py-0.5 rounded-full ' + typeColor}>
                            {notification.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteNotification(notification.id)
                      }}
                      className="text-gray-400 hover:text-red-600"
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
  )
}

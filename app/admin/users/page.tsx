'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'

type UserRole = 'admin' | 'officer' | 'citizen'
type UserStatus = 'active' | 'inactive' | 'suspended'

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: UserRole
  status: UserStatus
  joinedDate: string
  verifications: number
}

export default function AdminUsersPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  const [users] = useState<User[]>([
    { id: 1, name: 'Abebe Kebede', email: 'abebe.k@email.com', phone: '+251 911 123 456', role: 'citizen', status: 'active', joinedDate: '2024-01-15', verifications: 3 },
    { id: 2, name: 'Tigist Haile', email: 'tigist.h@land.gov.et', phone: '+251 912 234 567', role: 'officer', status: 'active', joinedDate: '2023-11-20', verifications: 145 },
    { id: 3, name: 'Tekle Berhan', email: 'tekle.b@email.com', phone: '+251 913 345 678', role: 'citizen', status: 'suspended', joinedDate: '2024-02-01', verifications: 1 },
    { id: 4, name: 'Meron Assefa', email: 'meron.a@land.gov.et', phone: '+251 914 456 789', role: 'officer', status: 'active', joinedDate: '2023-09-10', verifications: 89 },
    { id: 5, name: 'Dawit Mekonnen', email: 'dawit.m@email.com', phone: '+251 915 567 890', role: 'citizen', status: 'inactive', joinedDate: '2024-01-28', verifications: 0 },
    { id: 6, name: 'Admin User', email: 'admin@land.gov.et', phone: '+251 916 678 901', role: 'admin', status: 'active', joinedDate: '2023-01-01', verifications: 0 }
  ])

  const getRoleColor = (role: UserRole): string => {
    switch(role) {
      case 'admin': return cn('bg-red-900/30 text-red-400', 'bg-red-100 text-red-800')
      case 'officer': return cn('bg-purple-900/30 text-purple-400', 'bg-purple-100 text-purple-800')
      case 'citizen': return cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-800')
      default: return cn('bg-gray-800 text-gray-400', 'bg-gray-100 text-gray-800')
    }
  }

  const getStatusColor = (status: UserStatus): string => {
    switch(status) {
      case 'active': return cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-800')
      case 'inactive': return cn('bg-gray-800 text-gray-400', 'bg-gray-100 text-gray-800')
      case 'suspended': return cn('bg-red-900/30 text-red-400', 'bg-red-100 text-red-800')
      default: return cn('bg-gray-800 text-gray-400', 'bg-gray-100 text-gray-800')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{t('userManagement')}</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
          <UserPlusIcon className="w-5 h-5 mr-2" />
          {t('addNewUser')}
        </button>
      </div>

      {/* Filters */}
      <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4 mb-6'}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className={cn('text-gray-500', 'text-gray-400') + ' absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5'} />
            <input
              type="text"
              placeholder={t('search')}
              className={cn(
                'bg-gray-700 border-gray-600 text-white placeholder-gray-400',
                'bg-white border-gray-300 text-gray-900'
              ) + ' w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
            />
          </div>
          <select className={cn(
            'bg-gray-700 border-gray-600 text-white',
            'bg-white border-gray-300 text-gray-900'
          ) + ' px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}>
            <option value="all">{t('allRoles')}</option>
            <option value="admin">{t('admin')}</option>
            <option value="officer">{t('officer')}</option>
            <option value="citizen">{t('citizen')}</option>
          </select>
          <select className={cn(
            'bg-gray-700 border-gray-600 text-white',
            'bg-white border-gray-300 text-gray-900'
          ) + ' px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}>
            <option value="all">{t('allStatus')}</option>
            <option value="active">{t('active')}</option>
            <option value="inactive">{t('inactive')}</option>
            <option value="suspended">{t('suspended')}</option>
          </select>
          <button className={cn(
            'border-gray-700 text-gray-300 hover:bg-gray-700',
            'border-gray-300 text-gray-700 hover:bg-gray-50'
          ) + ' flex items-center justify-center px-4 py-2 border rounded-lg transition-colors'}>
            <FunnelIcon className="w-5 h-5 mr-2" />
            {t('filter')}
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden'}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={cn('bg-gray-700', 'bg-gray-50')}>
            <tr>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('user')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('contact')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('role')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('status')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('joinedDate')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('verifications')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-right text-xs font-medium uppercase'}>{t('actions')}</th>
            </tr>
          </thead>
          <tbody className={cn('bg-gray-800 divide-gray-700', 'bg-white divide-gray-200') + ' divide-y'}>
            {users.map((user) => (
              <tr key={user.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' transition-colors'}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={'w-10 h-10 rounded-full flex items-center justify-center ' + cn('bg-green-900/30', 'bg-green-100')}>
                      <span className={cn('text-green-400', 'text-green-600') + ' font-medium'}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className={cn('text-white', 'text-gray-900') + ' text-sm font-medium'}>{user.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className={cn('text-gray-300', 'text-gray-600') + ' text-sm'}>{user.email}</p>
                  <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{user.phone}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={'px-2 py-1 text-xs font-medium rounded-full ' + getRoleColor(user.role)}>
                    {t(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={'px-2 py-1 text-xs font-medium rounded-full ' + getStatusColor(user.status)}>
                    {t(user.status)}
                  </span>
                </td>
                <td className={cn('text-gray-400', 'text-gray-500') + ' px-6 py-4 text-sm'}>{user.joinedDate}</td>
                <td className={cn('text-gray-400', 'text-gray-500') + ' px-6 py-4 text-sm'}>{user.verifications}</td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button className={cn('text-green-400 hover:text-green-300', 'text-green-600 hover:text-green-900') + ' mr-3'}>
                    <PencilIcon className="w-5 h-5 inline" />
                  </button>
                  <button className={cn('text-red-400 hover:text-red-300', 'text-red-600 hover:text-red-900')}>
                    <TrashIcon className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

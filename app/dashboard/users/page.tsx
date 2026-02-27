'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import {
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

// Define specific types for role and status
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

export default function UsersPage() {
  const { t } = useTranslation()
  
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
      case 'admin': return 'bg-red-100 text-red-800'
      case 'officer': return 'bg-purple-100 text-purple-800'
      case 'citizen': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: UserStatus): string => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('userManagement')}</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          + {t('addNewUser')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t('search')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            defaultValue="all"
          >
            <option value="all">{t('allRoles')}</option>
            <option value="admin">{t('admin')}</option>
            <option value="officer">{t('officer')}</option>
            <option value="citizen">{t('citizen')}</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            defaultValue="all"
          >
            <option value="all">{t('allStatus')}</option>
            <option value="active">{t('active')}</option>
            <option value="inactive">{t('inactive')}</option>
            <option value="suspended">{t('suspended')}</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FunnelIcon className="w-5 h-5 mr-2 text-gray-500" />
            {t('filter')}
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('user')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('contact')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('role')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('joinedDate')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('verifications')}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-medium">
                        {user.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                  <div className="text-sm text-gray-500">{user.phone}</div>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.verifications}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3 transition-colors">
                    <PencilIcon className="w-5 h-5 inline" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 transition-colors">
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

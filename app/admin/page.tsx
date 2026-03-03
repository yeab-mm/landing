
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  UsersIcon,
  DocumentCheckIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  BellIcon
} from '@heroicons/react/24/outline'

export default function AdminDashboardPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode

  // Dark mode helper function
  const cn = (darkClass: string, lightClass: string) => {
    return darkMode ? darkClass : lightClass
  }

  const [stats] = useState({
    totalUsers: '15,432',
    pendingVerifications: '234',
    totalRevenue: '₿ 2.4M',
    activeListings: '1,287'
  })

  const recentVerifications = [
    { id: 1, applicant: 'Abebe Kebede', land: 'BA-2023-045', time: '2 hours ago', status: 'pending' },
    { id: 2, applicant: 'Tigist Haile', land: 'BA-2023-089', time: '5 hours ago', status: 'pending' },
    { id: 3, applicant: 'Tekle Berhan', land: 'BA-2023-123', time: '1 day ago', status: 'pending' },
    { id: 4, applicant: 'Meron Assefa', land: 'BA-2023-067', time: '1 day ago', status: 'pending' },
    { id: 5, applicant: 'Dawit Mekonnen', land: 'BA-2023-156', time: '2 days ago', status: 'pending' }
  ]

  return (
    <div className={cn('bg-gray-900', 'bg-gray-50') + ' min-h-screen'}>
      <div className="p-8">
        <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold mb-6'}>{t('adminDashboard')}</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-6'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm mb-1'}>{t('totalUsers')}</p>
                <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <UsersIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-4">+12% {t('fromLastMonth')}</p>
          </div>

          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-6'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm mb-1'}>{t('pendingVerifications')}</p>
                <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{stats.pendingVerifications}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DocumentCheckIcon className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-xs text-yellow-600 mt-4">23 {t('pending')}</p>
          </div>

          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-6'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm mb-1'}>{t('totalRevenue')}</p>
                <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{stats.totalRevenue}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <CreditCardIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400 mt-4">+8% {t('fromLastMonth')}</p>
          </div>

          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-6'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm mb-1'}>{t('activeListings')}</p>
                <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{stats.activeListings}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingBagIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-4">+45 {t('new')}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-6 mb-8'}>
          <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold mb-4'}>{t('quickActions')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-center">
              <DocumentCheckIcon className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-400">{t('processVerifications')}</span>
            </button>
            <button className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors text-center">
              <UsersIcon className="w-6 h-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-green-700 dark:text-green-400">{t('manageUsers')}</span>
            </button>
            <button className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors text-center">
              <CreditCardIcon className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-400">{t('reviewPayments')}</span>
            </button>
            <button className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors text-center">
              <ShoppingBagIcon className="w-6 h-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-400">{t('moderateListings')}</span>
            </button>
          </div>
        </div>

        {/* Recent Verifications */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden'}>
          <div className={cn('border-gray-700', 'border-gray-200') + ' px-6 py-4 border-b'}>
            <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold'}>{t('recentActivity')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className={cn('bg-gray-700', 'bg-gray-50')}>
                <tr>
                  <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('applicant')}</th>
                  <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('landParcel')}</th>
                  <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('submitted')}</th>
                  <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('status')}</th>
                  <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-right text-xs font-medium uppercase'}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody className={cn('bg-gray-800 divide-gray-700', 'bg-white divide-gray-200') + ' divide-y'}>
                {recentVerifications.map((item) => (
                  <tr key={item.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' transition-colors'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${item.applicant.replace(' ', '+')}&background=16a34a&color=fff`}
                          className="w-8 h-8 rounded-full"
                          alt=""
                        />
                        <div className="ml-3">
                          <p className={cn('text-white', 'text-gray-900') + ' text-sm font-medium'}>{item.applicant}</p>
                        </div>
                      </div>
                    </td>
                    <td className={cn('text-gray-300', 'text-gray-600') + ' px-6 py-4 text-sm'}>{item.land}</td>
                    <td className={cn('text-gray-400', 'text-gray-500') + ' px-6 py-4 text-sm'}>{item.time}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">{t('pending')}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-3 text-sm font-medium">{t('review')}</button>
                      <button className={cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800') + ' text-sm font-medium'}>{t('view')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
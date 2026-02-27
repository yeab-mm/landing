'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '../../lib/useTranslation'
import {
  UsersIcon,
  DocumentCheckIcon,
  CreditCardIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const { t } = useTranslation()
  const [stats] = useState({
    totalUsers: '15,432',
    pendingVerifications: '234',
    totalRevenue: '₿ 2.4M',
    activeListings: '1,287'
  })

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('dashboardOverview')}</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('totalUsers')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4">+12% {t('fromLastMonth')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('pendingVerifications')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingVerifications}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <DocumentCheckIcon className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-xs text-yellow-600 mt-4">23 {t('pending')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('totalRevenue')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCardIcon className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-4">+8% {t('fromLastMonth')}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{t('activeListings')}</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeListings}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingBagIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-purple-600 mt-4">+45 {t('new')}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('quickActions')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
            <DocumentCheckIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-700">{t('processVerifications')}</span>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
            <UsersIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-700">{t('manageUsers')}</span>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
            <CreditCardIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-700">{t('reviewPayments')}</span>
          </button>
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center">
            <ShoppingBagIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-green-700">{t('moderateListings')}</span>
          </button>
        </div>
      </div>

      {/* Recent Verifications */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{t('recentActivity')}</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('applicant')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('landParcel')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('submitted')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('status')}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1,2,3,4,5].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img 
                      src="https://ui-avatars.com/api/?name=Abebe+Kebede&background=16a34a&color=fff" 
                      className="w-8 h-8 rounded-full"
                      alt=""
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Abebe Kebede</p>
                      <p className="text-xs text-gray-500">ID: KB-12345</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">Plot #: BA-2023-045</p>
                  <p className="text-xs text-gray-500">500 sqm • Zone 3</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">2 {t('hoursAgo')}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">{t('pending')}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm text-green-600 hover:text-green-800 mr-3">{t('review')}</button>
                  <button className="text-sm text-gray-600 hover:text-gray-800">{t('view')}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

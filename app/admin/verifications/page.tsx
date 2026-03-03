
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  DocumentCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon
} from '@heroicons/react/24/outline'

interface Verification {
  id: number
  applicant: string
  applicantId: string
  landParcel: string
  location: string
  area: string
  submittedDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'underReview' | 'approved' | 'rejected' | 'infoNeeded'
  documents: number
}

export default function AdminVerificationsPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode

  // Dark mode helper function
  const cn = (darkClass: string, lightClass: string) => {
    return darkMode ? darkClass : lightClass
  }

  const [verifications] = useState<Verification[]>([
    { id: 1, applicant: 'Abebe Kebede', applicantId: 'KB-12345', landParcel: 'BA-2023-045', location: 'Zone 3, Bahir Dar', area: '500 sqm', submittedDate: '2024-02-20', priority: 'high', status: 'pending', documents: 4 },
    { id: 2, applicant: 'Tigist Haile', applicantId: 'TH-67890', landParcel: 'BA-2023-089', location: 'Zone 1, Bahir Dar', area: '350 sqm', submittedDate: '2024-02-19', priority: 'medium', status: 'underReview', documents: 3 },
    { id: 3, applicant: 'Tekle Berhan', applicantId: 'TB-24680', landParcel: 'BA-2023-123', location: 'Zone 5, Bahir Dar', area: '750 sqm', submittedDate: '2024-02-18', priority: 'low', status: 'infoNeeded', documents: 2 },
    { id: 4, applicant: 'Meron Assefa', applicantId: 'MA-13579', landParcel: 'BA-2023-067', location: 'Zone 2, Bahir Dar', area: '425 sqm', submittedDate: '2024-02-17', priority: 'high', status: 'approved', documents: 5 },
    { id: 5, applicant: 'Dawit Mekonnen', applicantId: 'DM-97531', landParcel: 'BA-2023-156', location: 'Zone 4, Bahir Dar', area: '600 sqm', submittedDate: '2024-02-16', priority: 'medium', status: 'rejected', documents: 3 }
  ])

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') {
      return darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
    } else if (priority === 'medium') {
      return darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
    } else {
      return darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
    }
  }

  const getStatusColor = (status: string) => {
    if (status === 'pending') {
      return darkMode ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800'
    } else if (status === 'underReview') {
      return darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
    } else if (status === 'approved') {
      return darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
    } else if (status === 'rejected') {
      return darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
    } else {
      return darkMode ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-800'
    }
  }

  const getStatusIcon = (status: string) => {
    if (status === 'pending') return ClockIcon
    if (status === 'underReview') return DocumentCheckIcon
    if (status === 'approved') return CheckCircleIcon
    return XCircleIcon
  }

  return (
    <div className={cn('bg-gray-900', 'bg-gray-50') + ' min-h-screen'}>
      <div className="p-8">
        <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold mb-6'}>{t('verifications')}</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('total')}</p>
            <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{verifications.length}</p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('pending')}</p>
            <p className="text-2xl font-bold text-yellow-600">
              {verifications.filter(v => v.status === 'pending').length}
            </p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('underReview')}</p>
            <p className="text-2xl font-bold text-blue-600">
              {verifications.filter(v => v.status === 'underReview').length}
            </p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('approved')}</p>
            <p className="text-2xl font-bold text-green-600">
              {verifications.filter(v => v.status === 'approved').length}
            </p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('rejected')}</p>
            <p className="text-2xl font-bold text-red-600">
              {verifications.filter(v => v.status === 'rejected').length}
            </p>
          </div>
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
              <option value="all">{t('allStatus')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="underReview">{t('underReview')}</option>
              <option value="approved">{t('approved')}</option>
              <option value="rejected">{t('rejected')}</option>
            </select>
            <select className={cn(
              'bg-gray-700 border-gray-600 text-white',
              'bg-white border-gray-300 text-gray-900'
            ) + ' px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}>
              <option value="all">{t('allPriority')}</option>
              <option value="high">{t('high')}</option>
              <option value="medium">{t('medium')}</option>
              <option value="low">{t('low')}</option>
            </select>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center">
              <FunnelIcon className="w-5 h-5 mr-2" />
              {t('filter')}
            </button>
          </div>
        </div>

        {/* Verifications Table */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden'}>
          <table className="min-w-full">
            <thead className={cn('bg-gray-700', 'bg-gray-50')}>
              <tr>
                <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('applicant')}</th>
                <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('landParcel')}</th>
                <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('location')}</th>
                <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('submitted')}</th>
                <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('priority')}</th>
                <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('status')}</th>
                <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-right text-xs font-medium uppercase'}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody className={cn('bg-gray-800 divide-gray-700', 'bg-white divide-gray-200') + ' divide-y'}>
              {verifications.map((verification) => {
                const StatusIcon = getStatusIcon(verification.status)
                return (
                  <tr key={verification.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' transition-colors'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${verification.applicant.replace(' ', '+')}&background=16a34a&color=fff`}
                          className="w-8 h-8 rounded-full"
                          alt=""
                        />
                        <div className="ml-3">
                          <p className={cn('text-white', 'text-gray-900') + ' text-sm font-medium'}>{verification.applicant}</p>
                          <p className={cn('text-gray-400', 'text-gray-500') + ' text-xs'}>{verification.applicantId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className={cn('text-white', 'text-gray-900') + ' text-sm font-medium'}>{verification.landParcel}</p>
                      <p className={cn('text-gray-400', 'text-gray-500') + ' text-xs'}>{verification.area}</p>
                    </td>
                    <td className={cn('text-gray-400', 'text-gray-500') + ' px-6 py-4 text-sm'}>{verification.location}</td>
                    <td className={cn('text-gray-400', 'text-gray-500') + ' px-6 py-4 text-sm'}>{verification.submittedDate}</td>
                    <td className="px-6 py-4">
                      <span className={'px-2 py-1 text-xs rounded-full ' + getPriorityColor(verification.priority)}>
                        {t(verification.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={'inline-flex items-center px-2 py-1 text-xs rounded-full ' + getStatusColor(verification.status)}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {verification.status === 'underReview' ? t('underReview') : t(verification.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 mr-3 text-sm font-medium">{t('review')}</button>
                      <button className={cn('text-gray-400 hover:text-gray-300', 'text-gray-600 hover:text-gray-800')}>
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

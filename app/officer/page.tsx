
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
  UserGroupIcon,
  ShoppingBagIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'

export default function OfficerDashboard() {
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

  const [stats] = useState({
    pendingVerifications: '24',
    approvedToday: '12',
    rejectedToday: '3',
    totalCitizens: '1,234',
    activeListings: '45',
    totalApplications: '67'
  })

  const recentVerifications = [
    { id: 1, applicant: 'Abebe Kebede', type: t('landTransfer'), time: '10 ' + t('minutesAgo'), status: 'pending', priority: 'high' },
    { id: 2, applicant: 'Tigist Haile', type: t('newRegistration'), time: '25 ' + t('minutesAgo'), status: 'approved', priority: 'medium' },
    { id: 3, applicant: 'Tekle Berhan', type: t('boundaryUpdate'), time: '1 ' + t('hoursAgo'), status: 'pending', priority: 'low' },
    { id: 4, applicant: 'Meron Assefa', type: t('ownershipVerification'), time: '2 ' + t('hoursAgo'), status: 'rejected', priority: 'high' },
    { id: 5, applicant: 'Dawit Mekonnen', type: t('landTransfer'), time: '3 ' + t('hoursAgo'), status: 'approved', priority: 'medium' }
  ]

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high') {
      return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full">{t('high')}</span>
    } else if (priority === 'medium') {
      return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">{t('medium')}</span>
    } else {
      return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">{t('low')}</span>
    }
  }

  const getStatusBadge = (status: string) => {
    if (status === 'approved') {
      return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">{t('approved')}</span>
    } else if (status === 'rejected') {
      return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full">{t('rejected')}</span>
    } else {
      return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full">{t('pending')}</span>
    }
  }

  return (
    <div className={`${bgColor} min-h-screen`}>
      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className={`${textPrimary} text-3xl font-bold mb-2`}>{t('officerDashboard')}</h1>
          <p className={`${textSecondary} text-lg`}>{t('welcomeBack')} {t('whatsHappening')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${cardBg} rounded-xl shadow-sm p-6 border ${borderColor}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`${textSecondary} text-sm font-medium`}>{t('pendingVerifications')}</h3>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <ClockIcon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
            <p className={`${textPrimary} text-3xl font-bold mb-2`}>{stats.pendingVerifications}</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">{t('requiresImmediateAttention')}</p>
          </div>

          <div className={`${cardBg} rounded-xl shadow-sm p-6 border ${borderColor}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`${textSecondary} text-sm font-medium`}>{t('approvedToday')}</h3>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircleIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className={`${textPrimary} text-3xl font-bold mb-2`}>{stats.approvedToday}</p>
            <p className="text-xs text-green-600 dark:text-green-400">+5 {t('fromYesterday')}</p>
          </div>

          <div className={`${cardBg} rounded-xl shadow-sm p-6 border ${borderColor}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`${textSecondary} text-sm font-medium`}>{t('totalCitizens')}</h3>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <UserGroupIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className={`${textPrimary} text-3xl font-bold mb-2`}>{stats.totalCitizens}</p>
            <p className="text-xs text-purple-600 dark:text-purple-400">{t('activeUsers')}</p>
          </div>

          <div className={`${cardBg} rounded-xl shadow-sm p-6 border ${borderColor}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`${textSecondary} text-sm font-medium`}>{t('activeListings')}</h3>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <ShoppingBagIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className={`${textPrimary} text-3xl font-bold mb-2`}>{stats.activeListings}</p>
            <p className="text-xs text-blue-600 dark:text-blue-400">{t('marketplaceActive')}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link href="/officer/verifications" className={`${cardBg} p-4 rounded-xl border ${borderColor} ${hoverBg} transition-colors flex items-center justify-between group`}>
            <div>
              <p className={`${textPrimary} font-medium`}>{t('reviewVerifications')}</p>
              <p className={`${textMuted} text-sm`}>{stats.pendingVerifications} {t('pending')}</p>
            </div>
            <DocumentCheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/officer/applications" className={`${cardBg} p-4 rounded-xl border ${borderColor} ${hoverBg} transition-colors flex items-center justify-between group`}>
            <div>
              <p className={`${textPrimary} font-medium`}>{t('reviewApplications')}</p>
              <p className={`${textMuted} text-sm`}>12 {t('newApplications')}</p>
            </div>
            <DocumentCheckIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/officer/marketplace" className={`${cardBg} p-4 rounded-xl border ${borderColor} ${hoverBg} transition-colors flex items-center justify-between group`}>
            <div>
              <p className={`${textPrimary} font-medium`}>{t('moderateListings')}</p>
              <p className={`${textMuted} text-sm`}>3 {t('pendingApproval')}</p>
            </div>
            <ShoppingBagIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/officer/citizens" className={`${cardBg} p-4 rounded-xl border ${borderColor} ${hoverBg} transition-colors flex items-center justify-between group`}>
            <div>
              <p className={`${textPrimary} font-medium`}>{t('viewCitizens')}</p>
              <p className={`${textMuted} text-sm`}>{t('manageCitizenRecords')}</p>
            </div>
            <UserGroupIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Recent Verifications Table */}
        <div className={`${cardBg} rounded-xl shadow-sm border ${borderColor} overflow-hidden mb-8`}>
          <div className={`px-6 py-4 border-b ${borderColor} flex justify-between items-center`}>
            <h2 className={`${textPrimary} text-lg font-semibold`}>{t('recentVerifications')}</h2>
            <Link href="/officer/verifications" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center">
              {t('viewAll')}
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('applicant')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('type')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('time')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('priority')}</th>
                  <th className={`px-6 py-3 text-left text-xs font-medium uppercase ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('status')}</th>
                  <th className={`px-6 py-3 text-right text-xs font-medium uppercase ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('actions')}</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                {recentVerifications.map((item) => (
                  <tr key={item.id} className={hoverBg}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${item.applicant.replace(' ', '+')}&background=2563eb&color=fff`}
                          className="w-8 h-8 rounded-full"
                          alt=""
                        />
                        <span className={`ml-3 ${textPrimary} text-sm font-medium`}>{item.applicant}</span>
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${textSecondary} text-sm`}>{item.type}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${textMuted} text-sm`}>{item.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getPriorityBadge(item.priority)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link href={`/officer/verifications/${item.id}`} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                        {t('review')}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${cardBg} rounded-xl shadow-sm p-6 border ${borderColor}`}>
            <h3 className={`${textPrimary} font-medium mb-4`}>{t('todaysActivity')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={`${textSecondary} text-sm`}>{t('verificationsProcessed')}</span>
                <span className={`${textPrimary} font-semibold`}>24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${textSecondary} text-sm`}>{t('applicationsReviewed')}</span>
                <span className={`${textPrimary} font-semibold`}>15</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`${textSecondary} text-sm`}>{t('listingsModerated')}</span>
                <span className={`${textPrimary} font-semibold`}>8</span>
              </div>
            </div>
          </div>

          <div className={`${cardBg} rounded-xl shadow-sm p-6 border ${borderColor}`}>
            <h3 className={`${textPrimary} font-medium mb-4`}>{t('performance')}</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`${textSecondary} text-sm`}>{t('approvalRate')}</span>
                  <span className={`${textPrimary} text-sm font-semibold`}>92%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className={`${textSecondary} text-sm`}>{t('responseTime')}</span>
                  <span className={`${textPrimary} text-sm font-semibold`}>2.4h</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${cardBg} rounded-xl shadow-sm p-6 border ${borderColor}`}>
            <h3 className={`${textPrimary} font-medium mb-4`}>{t('quickStats')}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`${textSecondary} text-xs`}>{t('totalApplications')}</p>
                <p className={`${textPrimary} text-xl font-bold`}>67</p>
              </div>
              <div>
                <p className={`${textSecondary} text-xs`}>{t('thisWeek')}</p>
                <p className={`${textPrimary} text-xl font-bold`}>23</p>
              </div>
              <div>
                <p className={`${textSecondary} text-xs`}>{t('completionRate')}</p>
                <p className={`${textPrimary} text-xl font-bold`}>88%</p>
              </div>
              <div>
                <p className={`${textSecondary} text-xs`}>{t('onTime')}</p>
                <p className={`${textPrimary} text-xl font-bold`}>95%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

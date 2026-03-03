
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
  EyeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface Verification {
  id: number
  applicant: string
  idNumber: string
  type: string
  submittedDate: string
  priority: 'high' | 'medium' | 'low'
  status: 'pending' | 'reviewing' | 'approved' | 'rejected'
  documents: number
}

export default function OfficerVerificationsPage() {
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
  const headerBg = darkMode ? 'bg-gray-700' : 'bg-gray-50'
  const headerText = darkMode ? 'text-gray-300' : 'text-gray-500'
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-white'
  const inputBorder = darkMode ? 'border-gray-600' : 'border-gray-300'
  const inputText = darkMode ? 'text-white' : 'text-gray-900'

  const [verifications] = useState<Verification[]>([
    { id: 1, applicant: 'Abebe Kebede', idNumber: 'KB-12345', type: t('landTransfer'), submittedDate: '2024-02-20', priority: 'high', status: 'pending', documents: 4 },
    { id: 2, applicant: 'Tigist Haile', idNumber: 'TH-67890', type: t('newRegistration'), submittedDate: '2024-02-19', priority: 'medium', status: 'reviewing', documents: 3 },
    { id: 3, applicant: 'Tekle Berhan', idNumber: 'TB-24680', type: t('boundaryUpdate'), submittedDate: '2024-02-18', priority: 'low', status: 'approved', documents: 5 },
    { id: 4, applicant: 'Meron Assefa', idNumber: 'MA-13579', type: t('ownershipVerification'), submittedDate: '2024-02-17', priority: 'high', status: 'rejected', documents: 2 },
    { id: 5, applicant: 'Dawit Mekonnen', idNumber: 'DM-97531', type: t('landTransfer'), submittedDate: '2024-02-16', priority: 'medium', status: 'pending', documents: 4 },
    { id: 6, applicant: 'Almaz Haile', idNumber: 'AH-11223', type: t('newRegistration'), submittedDate: '2024-02-15', priority: 'high', status: 'reviewing', documents: 3 }
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
    } else if (status === 'reviewing') {
      return darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
    } else if (status === 'approved') {
      return darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
    } else {
      return darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800'
    }
  }

  const getStatusIcon = (status: string) => {
    if (status === 'pending') return ClockIcon
    if (status === 'reviewing') return DocumentCheckIcon
    if (status === 'approved') return CheckCircleIcon
    return XCircleIcon
  }

  return (
    <div className={`${bgColor} min-h-screen`}>
      <div className="p-6">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link
            href="/officer"
            className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:opacity-80 mr-4`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className={`${textPrimary} text-2xl font-bold`}>
            {t('verifications')}
          </h1>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <p className={`${textSecondary} text-sm`}>{t('total')}</p>
            <p className={`${textPrimary} text-2xl font-bold`}>24</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <p className={`${textSecondary} text-sm`}>{t('pending')}</p>
            <p className="text-2xl font-bold text-yellow-600">12</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <p className={`${textSecondary} text-sm`}>{t('inReview')}</p>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <p className={`${textSecondary} text-sm`}>{t('approved')}</p>
            <p className="text-2xl font-bold text-green-600">15</p>
          </div>
        </div>

        {/* Filters */}
        <div className={`${cardBg} rounded-xl shadow-sm p-4 mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textMuted}`} />
              <input
                type="text"
                placeholder={t('search')}
                className={`w-full pl-10 pr-4 py-2 border ${inputBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg} ${inputText}`}
              />
            </div>
            <select className={`px-3 py-2 border ${inputBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg} ${inputText}`}>
              <option value="all">{t('allTypes')}</option>
              <option value="landTransfer">{t('landTransfer')}</option>
              <option value="newRegistration">{t('newRegistration')}</option>
              <option value="boundaryUpdate">{t('boundaryUpdate')}</option>
            </select>
            <select className={`px-3 py-2 border ${inputBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg} ${inputText}`}>
              <option value="all">{t('allStatus')}</option>
              <option value="pending">{t('pending')}</option>
              <option value="reviewing">{t('inReview')}</option>
              <option value="approved">{t('approved')}</option>
              <option value="rejected">{t('rejected')}</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
              <FunnelIcon className="w-5 h-5 mr-2" />
              {t('filter')}
            </button>
          </div>
        </div>

        {/* Verifications Table */}
        <div className={`${cardBg} rounded-xl shadow-sm overflow-hidden`}>
          <table className="min-w-full">
            <thead className={headerBg}>
              <tr>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('applicant')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('type')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('submitted')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('priority')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('status')}</th>
                <th className={`${headerText} px-6 py-3 text-right text-xs font-medium uppercase`}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {verifications.map((verification) => {
                const StatusIcon = getStatusIcon(verification.status)
                return (
                  <tr key={verification.id} className={hoverBg}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={`https://ui-avatars.com/api/?name=${verification.applicant.replace(' ', '+')}&background=2563eb&color=fff`}
                          className="w-8 h-8 rounded-full"
                          alt=""
                        />
                        <div className="ml-3">
                          <p className={`${textPrimary} text-sm font-medium`}>{verification.applicant}</p>
                          <p className={`${textSecondary} text-xs`}>{verification.idNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`${textSecondary} px-6 py-4 text-sm`}>{verification.type}</td>
                    <td className={`${textMuted} px-6 py-4 text-sm`}>{verification.submittedDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(verification.priority)}`}>
                        {t(verification.priority)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full ${getStatusColor(verification.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {verification.status === 'reviewing' ? t('inReview') : t(verification.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:opacity-80 mr-3 text-sm font-medium`}>
                        {t('review')}
                      </button>
                      <button className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:opacity-80`}>
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

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import {
  DocumentCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline'

interface Verification {
  id: number
  applicant: string
  applicantId: string
  landParcel: string
  location: string
  area: string
  submittedDate: string
  priority: string
  status: string
  documents: number
}

export default function VerificationsPage() {
  const { t } = useTranslation()
  
  const [verifications] = useState<Verification[]>([
    { id: 1, applicant: 'Abebe Kebede', applicantId: 'KB-12345', landParcel: 'BA-2023-045', location: 'Zone 3, Bahir Dar', area: '500 sqm', submittedDate: '2024-02-20', priority: 'high', status: 'pending', documents: 4 },
    { id: 2, applicant: 'Tigist Haile', applicantId: 'TH-67890', landParcel: 'BA-2023-089', location: 'Zone 1, Bahir Dar', area: '350 sqm', submittedDate: '2024-02-19', priority: 'medium', status: 'underReview', documents: 3 },
    { id: 3, applicant: 'Tekle Berhan', applicantId: 'TB-24680', landParcel: 'BA-2023-123', location: 'Zone 5, Bahir Dar', area: '750 sqm', submittedDate: '2024-02-18', priority: 'low', status: 'infoNeeded', documents: 2 },
    { id: 4, applicant: 'Meron Assefa', applicantId: 'MA-13579', landParcel: 'BA-2023-067', location: 'Zone 2, Bahir Dar', area: '425 sqm', submittedDate: '2024-02-17', priority: 'high', status: 'approved', documents: 5 },
    { id: 5, applicant: 'Dawit Mekonnen', applicantId: 'DM-97531', landParcel: 'BA-2023-156', location: 'Zone 4, Bahir Dar', area: '600 sqm', submittedDate: '2024-02-16', priority: 'medium', status: 'rejected', documents: 3 }
  ])

  const getPriorityColor = (priority: string): string => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'underReview': return 'bg-blue-100 text-blue-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'infoNeeded': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return ClockIcon
      case 'underReview': return DocumentCheckIcon
      case 'approved': return CheckCircleIcon
      case 'rejected': return XCircleIcon
      default: return ClockIcon
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('verifications')}</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('total')}</p>
          <p className="text-2xl font-bold text-gray-900">{verifications.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">
            {verifications.filter(v => v.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('underReview')}</p>
          <p className="text-2xl font-bold text-blue-600">
            {verifications.filter(v => v.status === 'underReview').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('approved')}</p>
          <p className="text-2xl font-bold text-green-600">
            {verifications.filter(v => v.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('rejected')}</p>
          <p className="text-2xl font-bold text-red-600">
            {verifications.filter(v => v.status === 'rejected').length}
          </p>
        </div>
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
            <option value="all">{t('allStatus')}</option>
            <option value="pending">{t('pending')}</option>
            <option value="underReview">{t('underReview')}</option>
            <option value="approved">{t('approved')}</option>
            <option value="rejected">{t('rejected')}</option>
          </select>
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            defaultValue="all"
          >
            <option value="all">{t('allPriority')}</option>
            <option value="high">{t('high')}</option>
            <option value="medium">{t('medium')}</option>
            <option value="low">{t('low')}</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            {t('export')}
          </button>
        </div>
      </div>

      {/* Verifications Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('applicant')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('landParcel')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('location')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('submitted')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('priority')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('status')}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {verifications.map((verification) => {
              const StatusIcon = getStatusIcon(verification.status)
              return (
                <tr key={verification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 font-medium">
                          {verification.applicant.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{verification.applicant}</div>
                        <div className="text-sm text-gray-500">ID: {verification.applicantId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{verification.landParcel}</div>
                    <div className="text-sm text-gray-500">{verification.area}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {verification.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {verification.submittedDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={'px-2 py-1 text-xs rounded-full ' + getPriorityColor(verification.priority)}>
                      {t(verification.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={'inline-flex items-center px-2 py-1 text-xs rounded-full ' + getStatusColor(verification.status)}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {t(verification.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900 mr-3">{t('review')}</button>
                    <button className="text-gray-600 hover:text-gray-900">{t('view')}</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

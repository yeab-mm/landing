
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  UserGroupIcon,
  EnvelopeIcon,
  PhoneIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowLeftIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline'

interface Citizen {
  id: number
  name: string
  email: string
  phone: string
  idNumber: string
  region: string
  city: string
  registeredDate: string
  properties: number
  verifications: number
  status: 'active' | 'inactive'
}

export default function OfficerCitizensPage() {
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

  const [citizens] = useState<Citizen[]>([
    { id: 1, name: 'Abebe Kebede', email: 'abebe.k@email.com', phone: '+251 911 123 456', idNumber: 'KB-12345', region: 'Amhara', city: 'Bahir Dar', registeredDate: '2024-01-15', properties: 2, verifications: 3, status: 'active' },
    { id: 2, name: 'Tigist Haile', email: 'tigist.h@email.com', phone: '+251 912 234 567', idNumber: 'TH-67890', region: 'Amhara', city: 'Gondar', registeredDate: '2023-11-20', properties: 1, verifications: 1, status: 'active' },
    { id: 3, name: 'Tekle Berhan', email: 'tekle.b@email.com', phone: '+251 913 345 678', idNumber: 'TB-24680', region: 'Oromia', city: 'Adama', registeredDate: '2024-02-01', properties: 3, verifications: 2, status: 'active' },
    { id: 4, name: 'Meron Assefa', email: 'meron.a@email.com', phone: '+251 914 456 789', idNumber: 'MA-13579', region: 'Tigray', city: 'Mekelle', registeredDate: '2023-09-10', properties: 1, verifications: 0, status: 'inactive' },
    { id: 5, name: 'Dawit Mekonnen', email: 'dawit.m@email.com', phone: '+251 915 567 890', idNumber: 'DM-97531', region: 'Amhara', city: 'Debre Markos', registeredDate: '2024-01-28', properties: 2, verifications: 1, status: 'active' },
    { id: 6, name: 'Almaz Haile', email: 'almaz.h@email.com', phone: '+251 916 678 901', idNumber: 'AH-11223', region: 'SNNPR', city: 'Hawassa', registeredDate: '2023-12-05', properties: 1, verifications: 0, status: 'active' }
  ])

  const getStatusColor = (status: string) => {
    if (status === 'active') {
      return darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
    } else {
      return darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-800'
    }
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
            {t('citizens')}
          </h1>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <p className={`${textSecondary} text-sm`}>{t('total')}</p>
            <p className={`${textPrimary} text-2xl font-bold`}>1,234</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <p className={`${textSecondary} text-sm`}>{t('active')}</p>
            <p className="text-2xl font-bold text-green-600">1,189</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <p className={`${textSecondary} text-sm`}>{t('properties')}</p>
            <p className="text-2xl font-bold text-blue-600">2,456</p>
          </div>
          <div className={`${cardBg} rounded-xl shadow-sm p-4`}>
            <p className={`${textSecondary} text-sm`}>{t('verifications')}</p>
            <p className="text-2xl font-bold text-purple-600">789</p>
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
              <option value="amhara">Amhara</option>
              <option value="oromia">Oromia</option>
              <option value="tigray">Tigray</option>
              <option value="snnpr">SNNPR</option>
            </select>
            <select className={`px-3 py-2 border ${inputBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBg} ${inputText}`}>
              <option value="all">{t('allStatus')}</option>
              <option value="active">{t('active')}</option>
              <option value="inactive">{t('inactive')}</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
              <FunnelIcon className="w-5 h-5 mr-2" />
              {t('filter')}
            </button>
          </div>
        </div>

        {/* Citizens Table */}
        <div className={`${cardBg} rounded-xl shadow-sm overflow-hidden`}>
          <table className="min-w-full">
            <thead className={headerBg}>
              <tr>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('name')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('contact')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('idNumber')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('location')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('properties')}</th>
                <th className={`${headerText} px-6 py-3 text-left text-xs font-medium uppercase`}>{t('status')}</th>
                <th className={`${headerText} px-6 py-3 text-right text-xs font-medium uppercase`}>{t('actions')}</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
              {citizens.map((citizen) => (
                <tr key={citizen.id} className={hoverBg}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${citizen.name.replace(' ', '+')}&background=2563eb&color=fff`}
                        className="w-8 h-8 rounded-full"
                        alt=""
                      />
                      <span className={`ml-3 ${textPrimary} text-sm font-medium`}>{citizen.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`${textSecondary} text-sm flex items-center`}>
                      <EnvelopeIcon className="w-4 h-4 mr-1" /> {citizen.email}
                    </p>
                    <p className={`${textMuted} text-sm flex items-center mt-1`}>
                      <PhoneIcon className="w-4 h-4 mr-1" /> {citizen.phone}
                    </p>
                  </td>
                  <td className={`${textMuted} px-6 py-4 text-sm`}>{citizen.idNumber}</td>
                  <td className="px-6 py-4">
                    <p className={`${textPrimary} text-sm`}>{citizen.city}</p>
                    <p className={`${textMuted} text-xs`}>{citizen.region}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className={`${textPrimary} text-sm font-medium`}>{citizen.properties}</p>
                    <p className={`${textMuted} text-xs`}>{citizen.verifications} {t('verifications')}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(citizen.status)}`}>
                      {t(citizen.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} hover:opacity-80 mr-3 text-sm font-medium`}>
                      {t('view')}
                    </button>
                    <button className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} hover:opacity-80`}>
                      <DocumentCheckIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

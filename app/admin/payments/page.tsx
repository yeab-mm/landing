'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  CreditCardIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  WalletIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

interface Payment {
  id: number
  transactionId: string
  payer: string
  amount: number
  type: 'purchase' | 'verification' | 'transfer' | 'service'
  method: 'telebirr' | 'cbe' | 'bank' | 'cash'
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  date: string
  description: string
}

export default function AdminPaymentsPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  const [payments] = useState<Payment[]>([
    { id: 1, transactionId: 'TXN-2024-001', payer: 'Abebe Kebede', amount: 2500000, type: 'purchase', method: 'telebirr', status: 'completed', date: '2024-02-20', description: 'Land purchase - Parcel BA-2023-045' },
    { id: 2, transactionId: 'TXN-2024-002', payer: 'Tigist Haile', amount: 3500, type: 'verification', method: 'cbe', status: 'completed', date: '2024-02-19', description: 'Land verification fee' },
    { id: 3, transactionId: 'TXN-2024-003', payer: 'Tekle Berhan', amount: 5000, type: 'transfer', method: 'bank', status: 'pending', date: '2024-02-18', description: 'Ownership transfer fee' },
    { id: 4, transactionId: 'TXN-2024-004', payer: 'Meron Assefa', amount: 1950000, type: 'purchase', method: 'telebirr', status: 'completed', date: '2024-02-17', description: 'Land purchase - Parcel BA-2023-067' },
    { id: 5, transactionId: 'TXN-2024-005', payer: 'Dawit Mekonnen', amount: 1200, type: 'service', method: 'cbe', status: 'failed', date: '2024-02-16', description: 'Document processing fee' }
  ])

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'purchase': return cn('bg-purple-900/30 text-purple-400', 'bg-purple-100 text-purple-800')
      case 'verification': return cn('bg-blue-900/30 text-blue-400', 'bg-blue-100 text-blue-800')
      case 'transfer': return cn('bg-yellow-900/30 text-yellow-400', 'bg-yellow-100 text-yellow-800')
      case 'service': return cn('bg-gray-700 text-gray-400', 'bg-gray-100 text-gray-800')
      default: return cn('bg-gray-800 text-gray-400', 'bg-gray-100 text-gray-800')
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-800')
      case 'pending': return cn('bg-yellow-900/30 text-yellow-400', 'bg-yellow-100 text-yellow-800')
      case 'failed': return cn('bg-red-900/30 text-red-400', 'bg-red-100 text-red-800')
      case 'refunded': return cn('bg-gray-700 text-gray-400', 'bg-gray-100 text-gray-800')
      default: return cn('bg-gray-800 text-gray-400', 'bg-gray-100 text-gray-800')
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return CheckCircleIcon
      case 'pending': return ClockIcon
      case 'failed': return XCircleIcon
      default: return ClockIcon
    }
  }

  const getMethodIcon = (method: string) => {
    switch(method) {
      case 'telebirr': return WalletIcon
      case 'cbe': return BanknotesIcon
      case 'bank': return CreditCardIcon
      default: return CurrencyDollarIcon
    }
  }

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div>
      <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold mb-6'}>{t('payments')}</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('total')}</p>
          <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{payments.length}</p>
        </div>
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('totalRevenue')}</p>
          <p className="text-2xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
        </div>
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">1</p>
        </div>
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('completed')}</p>
          <p className="text-2xl font-bold text-green-600">3</p>
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
            <option value="all">{t('allTypes')}</option>
            <option value="purchase">{t('purchase')}</option>
            <option value="verification">{t('verification')}</option>
            <option value="transfer">{t('transfer')}</option>
            <option value="service">{t('service')}</option>
          </select>
          <select className={cn(
            'bg-gray-700 border-gray-600 text-white',
            'bg-white border-gray-300 text-gray-900'
          ) + ' px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}>
            <option value="all">{t('allStatus')}</option>
            <option value="completed">{t('completed')}</option>
            <option value="pending">{t('pending')}</option>
            <option value="failed">{t('failed')}</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center">
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            {t('export')}
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden'}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className={cn('bg-gray-700', 'bg-gray-50')}>
            <tr>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('transactionId')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('payer')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('amount')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('type')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('method')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('status')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-left text-xs font-medium uppercase'}>{t('date')}</th>
              <th className={cn('text-gray-300', 'text-gray-500') + ' px-6 py-3 text-right text-xs font-medium uppercase'}>{t('actions')}</th>
            </tr>
          </thead>
          <tbody className={cn('bg-gray-800 divide-gray-700', 'bg-white divide-gray-200') + ' divide-y'}>
            {payments.map((payment) => {
              const StatusIcon = getStatusIcon(payment.status)
              const MethodIcon = getMethodIcon(payment.method)
              return (
                <tr key={payment.id} className={cn('hover:bg-gray-700', 'hover:bg-gray-50') + ' transition-colors'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">{payment.transactionId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={'w-8 h-8 rounded-full flex items-center justify-center ' + cn('bg-green-900/30', 'bg-green-100')}>
                        <span className={cn('text-green-400', 'text-green-600') + ' text-xs font-medium'}>
                          {payment.payer.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className={cn('text-white', 'text-gray-900') + ' text-sm font-medium'}>{payment.payer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={cn('text-white', 'text-gray-900') + ' text-sm font-semibold'}>{formatPrice(payment.amount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={'px-2 py-1 text-xs rounded-full ' + getTypeColor(payment.type)}>
                      {t(payment.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <MethodIcon className={cn('text-gray-400', 'text-gray-500') + ' w-4 h-4 mr-1'} />
                      <span className={cn('text-gray-300', 'text-gray-600') + ' text-sm'}>{t(payment.method)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={'inline-flex items-center px-2 py-1 text-xs rounded-full ' + getStatusColor(payment.status)}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {t(payment.status)}
                    </span>
                  </td>
                  <td className={cn('text-gray-400', 'text-gray-500') + ' px-6 py-4 text-sm'}>{payment.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className={cn('text-green-400 hover:text-green-300', 'text-green-600 hover:text-green-900')}>
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
  )
}

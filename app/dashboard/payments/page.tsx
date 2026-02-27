'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
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
  type: string
  method: string
  status: string
  date: string
  description: string
}

export default function PaymentsPage() {
  const { t } = useTranslation()
  
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

  const getTypeColor = (type: string): string => {
    switch(type) {
      case 'purchase': return 'bg-purple-100 text-purple-800'
      case 'verification': return 'bg-blue-100 text-blue-800'
      case 'transfer': return 'bg-yellow-100 text-yellow-800'
      case 'service': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('payments')}</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('total')}</p>
          <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('totalRevenue')}</p>
          <p className="text-2xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">
            {payments.filter(p => p.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('completed')}</p>
          <p className="text-2xl font-bold text-green-600">
            {payments.filter(p => p.status === 'completed').length}
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
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="all">{t('allTypes')}</option>
            <option value="purchase">{t('purchase')}</option>
            <option value="verification">{t('verification')}</option>
            <option value="transfer">{t('transfer')}</option>
            <option value="service">{t('service')}</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="all">{t('allStatus')}</option>
            <option value="completed">{t('completed')}</option>
            <option value="pending">{t('pending')}</option>
            <option value="failed">{t('failed')}</option>
          </select>
          <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
            {t('export')}
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('transactionId')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('payer')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('amount')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('type')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('method')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('date')}</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment) => {
              const StatusIcon = getStatusIcon(payment.status)
              const MethodIcon = getMethodIcon(payment.method)
              
              return (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">{payment.transactionId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-600 text-xs font-medium">
                          {payment.payer.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{payment.payer}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">{formatPrice(payment.amount)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={'px-2 py-1 text-xs rounded-full ' + getTypeColor(payment.type)}>
                      {t(payment.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <MethodIcon className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600 capitalize">{t(payment.method)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={'inline-flex items-center px-2 py-1 text-xs rounded-full ' + getStatusColor(payment.status)}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {t(payment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-green-600 hover:text-green-900">
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

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import {
  DocumentArrowDownIcon,
  CalendarIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentCheckIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline'

interface Report {
  id: number
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  type: string
  lastGenerated: string
  format: string
  color: string
}

export default function ReportsPage() {
  const { t } = useTranslation()
  const [dateRange, setDateRange] = useState<string>('month')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const reports: Report[] = [
    { id: 1, name: 'Monthly Transaction Report', description: 'Complete overview of all transactions for the selected month', icon: CurrencyDollarIcon, type: 'financial', lastGenerated: '2024-02-20', format: 'PDF', color: 'green' },
    { id: 2, name: 'User Registration Analytics', description: 'Detailed analysis of user registrations and demographics', icon: UserGroupIcon, type: 'user', lastGenerated: '2024-02-19', format: 'Excel', color: 'blue' },
    { id: 3, name: 'Verification Performance', description: 'Land verification metrics and officer performance', icon: DocumentCheckIcon, type: 'operational', lastGenerated: '2024-02-18', format: 'PDF', color: 'purple' },
    { id: 4, name: 'Marketplace Activity', description: 'Listings, views, and sales analytics', icon: HomeIcon, type: 'marketplace', lastGenerated: '2024-02-17', format: 'CSV', color: 'orange' },
    { id: 5, name: 'Revenue Summary', description: 'Detailed revenue breakdown by service type', icon: ChartBarIcon, type: 'financial', lastGenerated: '2024-02-16', format: 'Excel', color: 'green' }
  ]

  const getColorClasses = (color: string): string => {
    const colors: Record<string, string> = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return colors[color] || colors.green
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('reports')}</h1>

      {/* Date Range Selector */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <CalendarIcon className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
          </div>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={dateRange}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setDateRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            {t('generate')}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('totalRevenue')}</p>
          <p className="text-2xl font-bold text-gray-900">₿ 4.5M</p>
          <p className="text-xs text-green-600 mt-2">+12.5% from last month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('newUsers')}</p>
          <p className="text-2xl font-bold text-gray-900">342</p>
          <p className="text-xs text-green-600 mt-2">+23 from yesterday</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('verifications')}</p>
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-xs text-green-600 mt-2">89% approval rate</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('activeListings')}</p>
          <p className="text-2xl font-bold text-gray-900">124</p>
          <p className="text-xs text-green-600 mt-2">12 new this week</p>
        </div>
      </div>

      {/* Reports Grid */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const Icon = report.icon
          const colorClass = getColorClasses(report.color)
          
          return (
            <div
              key={report.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 hover:border-green-200"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={'p-3 rounded-lg ' + colorClass}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  {report.format}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{report.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">
                  Last: {report.lastGenerated}
                </span>
                <button className="text-green-600 hover:text-green-700">
                  <ArrowDownTrayIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Report Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">{selectedReport.name}</h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">{selectedReport.description}</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" defaultValue="2024-02-01" />
                    <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" defaultValue="2024-02-29" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                    <option>PDF Document</option>
                    <option>Excel Spreadsheet</option>
                    <option>CSV File</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

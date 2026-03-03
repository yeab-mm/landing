
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
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

export default function AdminReportsPage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  const [dateRange, setDateRange] = useState<string>('month')
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  const reports: Report[] = [
    { id: 1, name: t('monthlyTransactionReport'), description: t('monthlyTransactionDesc'), icon: CurrencyDollarIcon, type: 'financial', lastGenerated: '2024-02-20', format: 'PDF', color: 'green' },
    { id: 2, name: t('userRegistrationAnalytics'), description: t('userRegistrationDesc'), icon: UserGroupIcon, type: 'user', lastGenerated: '2024-02-19', format: 'Excel', color: 'blue' },
    { id: 3, name: t('verificationPerformance'), description: t('verificationPerformanceDesc'), icon: DocumentCheckIcon, type: 'operational', lastGenerated: '2024-02-18', format: 'PDF', color: 'purple' },
    { id: 4, name: t('marketplaceActivity'), description: t('marketplaceActivityDesc'), icon: HomeIcon, type: 'marketplace', lastGenerated: '2024-02-17', format: 'CSV', color: 'orange' },
    { id: 5, name: t('revenueSummary'), description: t('revenueSummaryDesc'), icon: ChartBarIcon, type: 'financial', lastGenerated: '2024-02-16', format: 'Excel', color: 'green' }
  ]

  const getColorClasses = (color: string): string => {
    const colors: Record<string, string> = {
      green: cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-600'),
      blue: cn('bg-blue-900/30 text-blue-400', 'bg-blue-100 text-blue-600'),
      purple: cn('bg-purple-900/30 text-purple-400', 'bg-purple-100 text-purple-600'),
      orange: cn('bg-orange-900/30 text-orange-400', 'bg-orange-100 text-orange-600')
    }
    return colors[color] || (darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600')
  }

  return (
    <div className={cn('bg-gray-900', 'bg-gray-50') + ' min-h-screen'}>
      <div className="p-8">
        <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold mb-6'}>{t('reports')}</h1>

        {/* Date Range Selector */}
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4 mb-6'}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <CalendarIcon className={cn('text-gray-500', 'text-gray-400') + ' w-5 h-5 mr-2'} />
              <span className={cn('text-gray-300', 'text-gray-700') + ' text-sm font-medium'}>{t('dateRange')}:</span>
            </div>
            <select
              className={cn(
                'bg-gray-700 border-gray-600 text-white',
                'bg-white border-gray-300 text-gray-900'
              ) + ' px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="today">{t('today')}</option>
              <option value="week">{t('thisWeek')}</option>
              <option value="month">{t('thisMonth')}</option>
              <option value="quarter">{t('thisQuarter')}</option>
              <option value="year">{t('thisYear')}</option>
            </select>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              {t('generate')}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('totalRevenue')}</p>
            <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>₿ 4.5M</p>
            <p className="text-xs text-green-600 mt-2">+12.5% {t('fromLastMonth')}</p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('newUsers')}</p>
            <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>342</p>
            <p className="text-xs text-green-600 mt-2">+23 {t('fromYesterday')}</p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('verifications')}</p>
            <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>156</p>
            <p className="text-xs text-green-600 mt-2">89% {t('approvalRate')}</p>
          </div>
          <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
            <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('activeListings')}</p>
            <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>124</p>
            <p className="text-xs text-green-600 mt-2">12 {t('new')}</p>
          </div>
        </div>

        {/* Reports Grid */}
        <h2 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold mb-4'}>{t('availableReports')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => {
            const Icon = report.icon
            const colorClass = getColorClasses(report.color)
            
            return (
              <div
                key={report.id}
                className={cn('bg-gray-800 border-gray-700 hover:border-green-700', 'bg-white border-gray-100 hover:border-green-200') + ' rounded-xl shadow-sm p-6 hover:shadow-lg transition-all cursor-pointer border'}
                onClick={() => setSelectedReport(report)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={'p-3 rounded-lg ' + colorClass}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={cn('bg-gray-700 text-gray-400', 'bg-gray-100 text-gray-500') + ' text-xs px-2 py-1 rounded'}>
                    {report.format}
                  </span>
                </div>
                <h3 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold mb-2'}>{report.name}</h3>
                <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm mb-4'}>{report.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700 dark:border-gray-200">
                  <span className={cn('text-gray-500', 'text-gray-400') + ' text-xs'}>
                    {t('lastGenerated')}: {report.lastGenerated}
                  </span>
                  <button className={cn('text-green-400 hover:text-green-300', 'text-green-600 hover:text-green-700')}>
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
            <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-xl max-w-2xl w-full mx-4'}>
              <div className={'px-6 py-4 border-b flex justify-between items-center ' + (darkMode ? 'border-gray-700' : 'border-gray-200')}>
                <h3 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold'}>{selectedReport.name}</h3>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <div className="p-6">
                <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm mb-4'}>{selectedReport.description}</p>
                <div className="space-y-4">
                  <div>
                    <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('dateRange')}</label>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="date" className={cn(
                        'bg-gray-700 border-gray-600 text-white',
                        'bg-white border-gray-300 text-gray-900'
                      ) + ' px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500'} defaultValue="2024-02-01" />
                      <input type="date" className={cn(
                        'bg-gray-700 border-gray-600 text-white',
                        'bg-white border-gray-300 text-gray-900'
                      ) + ' px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500'} defaultValue="2024-02-29" />
                    </div>
                  </div>
                  <div>
                    <label className={cn('text-gray-300', 'text-gray-700') + ' block text-sm font-medium mb-2'}>{t('format')}</label>
                    <select className={cn(
                      'bg-gray-700 border-gray-600 text-white',
                      'bg-white border-gray-300 text-gray-900'
                    ) + ' w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500'}>
                      <option>PDF {t('document')}</option>
                      <option>Excel {t('spreadsheet')}</option>
                      <option>CSV {t('file')}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={'px-6 py-4 border-t flex justify-end space-x-3 ' + (darkMode ? 'border-gray-700' : 'border-gray-200')}>
                <button
                  onClick={() => setSelectedReport(null)}
                  className={cn(
                    'border-gray-600 text-gray-300 hover:bg-gray-700',
                    'border-gray-300 text-gray-700 hover:bg-gray-50'
                  ) + ' px-4 py-2 border rounded-lg transition-colors'}
                >
                  {t('cancel')}
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  {t('generateReport')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

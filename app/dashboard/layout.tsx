'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  HomeIcon,
  UsersIcon,
  DocumentCheckIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  ChartBarIcon,
  BellIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

interface NavigationItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const { language, changeLanguage } = useLanguage()
  const pathname = usePathname()

  const navigation: NavigationItem[] = [
    { name: 'dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'users', href: '/dashboard/users', icon: UsersIcon },
    { name: 'verifications', href: '/dashboard/verifications', icon: DocumentCheckIcon },
    { name: 'marketplace', href: '/dashboard/marketplace', icon: ShoppingBagIcon },
    { name: 'payments', href: '/dashboard/payments', icon: CreditCardIcon },
    { name: 'reports', href: '/dashboard/reports', icon: DocumentArrowDownIcon },
    { name: 'notifications', href: '/dashboard/notifications', icon: BellIcon },
    { name: 'security', href: '/dashboard/security', icon: ShieldCheckIcon },
    { name: 'settings', href: '/dashboard/settings', icon: Cog6ToothIcon }
  ]

  const isActive = (href: string): boolean => pathname === href

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">DL</span>
          </div>
          <span className="ml-3 font-semibold text-gray-900">Digital Land</span>
        </div>

        <nav className="mt-6 px-3">
          {navigation.map((item: NavigationItem) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            const linkClass = active 
              ? "flex items-center px-4 py-3 mb-1 text-sm rounded-lg bg-green-50 text-green-700"
              : "flex items-center px-4 py-3 mb-1 text-sm rounded-lg text-gray-700 hover:bg-gray-50"
            
            const iconClass = active
              ? "w-5 h-5 mr-3 text-green-600"
              : "w-5 h-5 mr-3 text-gray-400"

            return (
              <Link key={item.href} href={item.href} className={linkClass}>
                <Icon className={iconClass} />
                {t(item.name)}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={() => {
              localStorage.removeItem('isLoggedIn')
              localStorage.removeItem('userEmail')
              window.location.href = '/login'
            }}
            className="flex items-center w-full px-4 py-3 text-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {t('logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* Header with Language Switcher */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-900">
            {t(navigation.find((item: NavigationItem) => item.href === pathname)?.name || 'dashboard')}
          </h1>
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeLanguage(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="en">🇬🇧 English</option>
              <option value="am">🇪🇹 አማርኛ</option>
            </select>
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=16a34a&color=fff"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}

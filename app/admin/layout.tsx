'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
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

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode
  const language = languageContext.language
  const changeLanguage = languageContext.changeLanguage
  const pathname = usePathname()

  useEffect(() => {
    const role = localStorage.getItem('userRole')
    if (role !== 'admin') {
      window.location.href = '/login'
    }
  }, [])

  const navigation: NavigationItem[] = [
    { name: 'dashboard', href: '/admin', icon: HomeIcon },
    { name: 'users', href: '/admin/users', icon: UsersIcon },
    { name: 'verifications', href: '/admin/verifications', icon: DocumentCheckIcon },
    { name: 'marketplace', href: '/admin/marketplace', icon: ShoppingBagIcon },
    { name: 'payments', href: '/admin/payments', icon: CreditCardIcon },
    { name: 'reports', href: '/admin/reports', icon: DocumentArrowDownIcon },
    { name: 'notifications', href: '/admin/notifications', icon: BellIcon },
    { name: 'security', href: '/admin/security', icon: ShieldCheckIcon },
    { name: 'settings', href: '/admin/settings', icon: Cog6ToothIcon }
  ]

  const isActive = (href: string): boolean => pathname === href

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  return (
    <div className={cn('bg-gray-900', 'bg-gray-50') + ' min-h-screen'}>
      {/* Sidebar */}
      <div className={cn('bg-gray-800 border-gray-700', 'bg-white border-gray-200') + ' fixed inset-y-0 left-0 w-64 border-r transition-colors duration-200'}>
        <div className={cn('border-gray-700', 'border-gray-200') + ' flex items-center h-16 px-6 border-b'}>
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">AD</span>
          </div>
          <span className={cn('text-white', 'text-gray-900') + ' ml-3 font-semibold'}>{t('adminPortal')}</span>
        </div>
        
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            const linkClass = active 
              ? cn('bg-green-900/30 text-green-400', 'bg-green-50 text-green-700') + ' flex items-center px-4 py-3 mb-1 text-sm rounded-lg'
              : cn('text-gray-300 hover:bg-gray-700', 'text-gray-700 hover:bg-gray-50') + ' flex items-center px-4 py-3 mb-1 text-sm rounded-lg transition-colors'
            
            const iconClass = active
              ? cn('text-green-400', 'text-green-600') + ' w-5 h-5 mr-3'
              : cn('text-gray-500', 'text-gray-400') + ' w-5 h-5 mr-3'

            return (
              <Link key={item.href} href={item.href} className={linkClass}>
                <Icon className={iconClass} />
                {t(item.name)}
                {item.name === 'verifications' && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">12</span>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className={cn('border-gray-700', 'border-gray-200') + ' absolute bottom-0 left-0 right-0 p-4 border-t'}>
          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = '/login'
            }}
            className={cn('text-red-400 hover:bg-red-900/30', 'text-red-600 hover:bg-red-50') + ' flex items-center w-full px-4 py-3 text-sm rounded-lg transition-colors'}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {t('logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        {/* Header */}
        <header className={cn('bg-gray-800 border-gray-700', 'bg-white border-gray-200') + ' border-b h-16 flex items-center justify-between px-8 transition-colors duration-200'}>
          <h1 className={cn('text-white', 'text-gray-900') + ' text-xl font-semibold'}>
            {t(navigation.find((item) => item.href === pathname)?.name || 'dashboard')}
          </h1>
          <div className="flex items-center space-x-4">
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className={cn(
                'bg-gray-700 border-gray-600 text-white',
                'bg-white border-gray-300 text-gray-900'
              ) + ' border rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500'}
            >
              <option value="en">🇬🇧 English</option>
              <option value="am">🇪🇹 አማርኛ</option>
            </select>
            <button className="relative p-2 text-gray-400 hover:text-gray-600">
              <BellIcon className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3">
              <span className={cn('text-gray-300', 'text-gray-700') + ' text-sm'}>Admin</span>
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=16a34a&color=fff"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">{children}</main>
      </div>
    </div>
  )
}

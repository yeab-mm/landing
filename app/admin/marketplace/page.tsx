'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
import { useLanguage } from '@/lib/LanguageContext'
import {
  HomeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  UserIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BuildingStorefrontIcon,
  HeartIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'

interface Listing {
  id: number
  title: string
  description: string
  location: string
  area: string
  price: number
  owner: string
  status: 'active' | 'pending' | 'sold' | 'rejected'
  type: 'residential' | 'commercial' | 'agricultural'
  subType: string
  views: number
  image: string
  features: string[]
}

export default function AdminMarketplacePage() {
  const { t } = useTranslation()
  const languageContext = useLanguage()
  const darkMode = languageContext.darkMode

  const cn = (darkClass: string, lightClass: string) => darkMode ? darkClass : lightClass

  const [listings] = useState<Listing[]>([
    { 
      id: 1, 
      title: 'Coffee House - Downtown', 
      description: 'Prime location coffee shop with outdoor seating.',
      location: 'Zone 1, Bahir Dar', 
      area: '120 sqm', 
      price: 850000, 
      owner: 'Abebe Kebede', 
      status: 'active', 
      type: 'commercial', 
      subType: 'cafe', 
      views: 245,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Outdoor seating', 'Kitchen ready', 'High traffic']
    },
    { 
      id: 2, 
      title: 'Book Store & Café', 
      description: 'Combined bookstore and coffee shop near university.',
      location: 'Zone 3, Bahir Dar', 
      area: '200 sqm', 
      price: 1200000, 
      owner: 'Tigist Haile', 
      status: 'pending', 
      type: 'commercial', 
      subType: 'bookstore', 
      views: 189,
      image: 'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Near university', 'Established business', 'Inventory included']
    },
    { 
      id: 3, 
      title: 'Italian Restaurant', 
      description: 'Fully equipped restaurant with professional kitchen.',
      location: 'Zone 2, Bahir Dar', 
      area: '250 sqm', 
      price: 2200000, 
      owner: 'Almaz Haile', 
      status: 'active', 
      type: 'commercial', 
      subType: 'restaurant', 
      views: 312,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Full kitchen', 'Bar area', 'Outdoor seating']
    },
    { 
      id: 4, 
      title: 'Modern Apartment', 
      description: 'Luxury apartment with stunning lake view.',
      location: 'Zone 4, Bahir Dar', 
      area: '180 sqm', 
      price: 3200000, 
      owner: 'Yonas Desta', 
      status: 'sold', 
      type: 'residential', 
      subType: 'apartment', 
      views: 278,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Lake view', 'Balcony', 'Parking']
    }
  ])

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-800')
      case 'pending': return cn('bg-yellow-900/30 text-yellow-400', 'bg-yellow-100 text-yellow-800')
      case 'sold': return cn('bg-gray-700 text-gray-400', 'bg-gray-100 text-gray-800')
      case 'rejected': return cn('bg-red-900/30 text-red-400', 'bg-red-100 text-red-800')
      default: return cn('bg-gray-800 text-gray-400', 'bg-gray-100 text-gray-800')
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'residential': return cn('bg-blue-900/30 text-blue-400', 'bg-blue-100 text-blue-800')
      case 'commercial': return cn('bg-purple-900/30 text-purple-400', 'bg-purple-100 text-purple-800')
      case 'agricultural': return cn('bg-green-900/30 text-green-400', 'bg-green-100 text-green-800')
      default: return cn('bg-gray-800 text-gray-400', 'bg-gray-100 text-gray-800')
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{t('landListings')}</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
          <BuildingStorefrontIcon className="w-5 h-5 mr-2" />
          {t('addNewListing')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('totalListings')}</p>
          <p className={cn('text-white', 'text-gray-900') + ' text-2xl font-bold'}>{listings.length}</p>
        </div>
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('active')}</p>
          <p className="text-2xl font-bold text-green-600">2</p>
        </div>
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">1</p>
        </div>
        <div className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm p-4'}>
          <p className={cn('text-gray-400', 'text-gray-500') + ' text-sm'}>{t('totalValue')}</p>
          <p className="text-2xl font-bold text-green-600">{formatPrice(7450000)}</p>
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
            <option value="residential">{t('residential')}</option>
            <option value="commercial">{t('commercial')}</option>
            <option value="agricultural">{t('agricultural')}</option>
          </select>
          <select className={cn(
            'bg-gray-700 border-gray-600 text-white',
            'bg-white border-gray-300 text-gray-900'
          ) + ' px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'}>
            <option value="all">{t('allStatus')}</option>
            <option value="active">{t('active')}</option>
            <option value="pending">{t('pending')}</option>
            <option value="sold">Sold</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center">
            <FunnelIcon className="w-5 h-5 mr-2" />
            {t('filter')}
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <div key={listing.id} className={cn('bg-gray-800', 'bg-white') + ' rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group'}>
            <div className="relative h-48 overflow-hidden">
              <img 
                src={listing.image} 
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  {listing.subType}
                </span>
                <span className={'px-2 py-1 text-xs rounded-full ' + getStatusColor(listing.status)}>
                  {listing.status}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className={cn('text-white', 'text-gray-900') + ' text-lg font-semibold hover:text-green-600 dark:hover:text-green-400 cursor-pointer mb-2'}>
                {listing.title}
              </h3>
              <p className={cn('text-gray-400', 'text-gray-600') + ' text-sm mb-2 line-clamp-2'}>{listing.description}</p>
              <p className={cn('text-gray-500', 'text-gray-500') + ' text-sm mb-2 flex items-center'}>
                <MapPinIcon className="w-4 h-4 mr-1" />
                {listing.location}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {listing.features.slice(0, 2).map((feature, idx) => (
                  <span key={idx} className={cn('bg-gray-700 text-gray-300', 'bg-gray-100 text-gray-600') + ' text-xs px-2 py-1 rounded'}>
                    {feature}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className={cn('text-gray-400', 'text-gray-600') + ' text-sm'}>{listing.area}</span>
                <span className={'px-2 py-1 text-xs rounded-full ' + getTypeColor(listing.type)}>
                  {t(listing.type)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-700 dark:border-gray-200">
                <div className="flex items-center">
                  <div className={'w-8 h-8 rounded-full flex items-center justify-center ' + cn('bg-green-900/30', 'bg-green-100')}>
                    <span className={cn('text-green-400', 'text-green-600') + ' text-xs font-medium'}>
                      {listing.owner.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-2">
                    <p className={cn('text-gray-400', 'text-gray-500') + ' text-xs'}>{t('owner')}</p>
                    <p className={cn('text-white', 'text-gray-900') + ' text-sm font-medium'}>{listing.owner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{formatPrice(listing.price)}</p>
                  <p className={cn('text-gray-500', 'text-gray-400') + ' text-xs flex items-center'}>
                    <EyeIcon className="w-3 h-3 mr-1" />
                    {listing.views} {t('views')}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700">
                  {t('approve')}
                </button>
                <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-red-700">
                  {t('reject')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

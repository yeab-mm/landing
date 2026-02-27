'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/useTranslation'
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
  ChatBubbleLeftIcon,
  ShareIcon
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
  status: string
  type: string
  subType: string
  views: number
  image: string
  features: string[]
}

export default function MarketplacePage() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [favorites, setFavorites] = useState<number[]>([])
  
  const [listings] = useState<Listing[]>([
    // Coffee Houses & Cafés
    { 
      id: 1, 
      title: 'Coffee House - Downtown', 
      description: 'Prime location coffee shop with outdoor seating. Fully equipped with espresso machines, grinders, and furniture. High foot traffic area near commercial buildings.',
      location: 'Zone 1, Bahir Dar', 
      area: '120 sqm', 
      price: 850000, 
      owner: 'Abebe Kebede', 
      status: 'active', 
      type: 'commercial', 
      subType: 'cafe', 
      views: 245,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Outdoor seating', 'Kitchen ready', 'High traffic', 'Espresso machine included']
    },
    { 
      id: 2, 
      title: 'Book Store & Café', 
      description: 'Combined bookstore and coffee shop near university. Two-story building with reading nooks, study areas, and a full-service coffee bar.',
      location: 'Zone 3, Bahir Dar', 
      area: '200 sqm', 
      price: 1200000, 
      owner: 'Tigist Haile', 
      status: 'active', 
      type: 'commercial', 
      subType: 'cafe', 
      views: 189,
      image: 'https://images.unsplash.com/photo-1525193612562-0ec53b0e5d7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Near university', 'Established business', 'Inventory included', 'Study areas']
    },
    { 
      id: 3, 
      title: 'Espresso Bar - Shopping Mall', 
      description: 'Small coffee kiosk in busy shopping center. Turnkey operation with all equipment and supplies included. Perfect for entrepreneur.',
      location: 'Zone 2, Bahir Dar', 
      area: '45 sqm', 
      price: 450000, 
      owner: 'Tekle Berhan', 
      status: 'pending', 
      type: 'commercial', 
      subType: 'cafe', 
      views: 67,
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Mall location', 'Low maintenance', 'High foot traffic', 'Ready to operate']
    },
    
    // Book Stores
    { 
      id: 4, 
      title: 'University Book Store', 
      description: 'Large bookstore near Bahir Dar University. Sells textbooks, stationery, and academic supplies. Established customer base.',
      location: 'Zone 4, Bahir Dar', 
      area: '300 sqm', 
      price: 1800000, 
      owner: 'Meron Assefa', 
      status: 'active', 
      type: 'commercial', 
      subType: 'bookstore', 
      views: 156,
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Student population', 'Stationery section', 'Reading area', 'Inventory included']
    },
    { 
      id: 5, 
      title: 'Rare Books & Coffee House', 
      description: 'Vintage bookstore with attached café. Specializes in rare books, first editions, and provides a cozy reading atmosphere with coffee service.',
      location: 'Zone 1, Bahir Dar', 
      area: '180 sqm', 
      price: 950000, 
      owner: 'Dawit Mekonnen', 
      status: 'active', 
      type: 'commercial', 
      subType: 'bookstore', 
      views: 203,
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Rare books collection', 'Coffee corner', 'Event space', 'Vintage decor']
    },
    
    // Restaurants
    { 
      id: 6, 
      title: 'Italian Restaurant', 
      description: 'Fully equipped restaurant with professional kitchen, pizza oven, and bar. Indoor and outdoor seating with beautiful views.',
      location: 'Zone 2, Bahir Dar', 
      area: '250 sqm', 
      price: 2200000, 
      owner: 'Almaz Haile', 
      status: 'active', 
      type: 'commercial', 
      subType: 'restaurant', 
      views: 312,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Full kitchen', 'Bar area', 'Outdoor seating', 'Pizza oven']
    },
    
    // Residential
    { 
      id: 7, 
      title: 'Modern Apartment - 3 Bedroom', 
      description: 'Luxury apartment with stunning lake view. Open plan living, modern kitchen, and spacious balcony. Secure building with parking.',
      location: 'Zone 4, Bahir Dar', 
      area: '180 sqm', 
      price: 3200000, 
      owner: 'Yonas Desta', 
      status: 'active', 
      type: 'residential', 
      subType: 'apartment', 
      views: 278,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      features: ['Lake view', 'Balcony', 'Parking', 'Modern kitchen']
    }
  ])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'sold': return 'bg-gray-100 text-gray-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string): string => {
    switch(type) {
      case 'residential': return 'bg-blue-100 text-blue-800'
      case 'commercial': return 'bg-purple-100 text-purple-800'
      case 'agricultural': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter listings based on search and filters
  const filteredListings = listings.filter(listing => {
    const matchesSearch = searchTerm === '' || 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.subType.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = typeFilter === 'all' || listing.type === typeFilter
    const matchesStatus = statusFilter === 'all' || listing.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('landListings')}</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center">
          <BuildingStorefrontIcon className="w-5 h-5 mr-2" />
          {t('addNewListing')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('totalListings')}</p>
          <p className="text-2xl font-bold text-gray-900">{listings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('active')}</p>
          <p className="text-2xl font-bold text-green-600">
            {listings.filter(l => l.status === 'active').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('pending')}</p>
          <p className="text-2xl font-bold text-yellow-600">
            {listings.filter(l => l.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <p className="text-sm text-gray-500 mb-1">{t('totalValue')}</p>
          <p className="text-2xl font-bold text-green-600">
            {formatPrice(listings.reduce((sum, l) => sum + l.price, 0))}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search coffee house, book store, restaurant, apartment..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={typeFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="commercial">Commercial</option>
            <option value="residential">Residential</option>
            <option value="agricultural">Agricultural</option>
          </select>
          
          <select 
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={statusFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          Found <span className="font-semibold text-green-600">{filteredListings.length}</span> properties
        </p>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <div key={listing.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group">
            {/* Image Section */}
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
              <button 
                onClick={() => toggleFavorite(listing.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                {favorites.includes(listing.id) ? (
                  <HeartIconSolid className="w-4 h-4 text-red-500" />
                ) : (
                  <HeartIcon className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>

            {/* Content Section */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 cursor-pointer mb-2">
                {listing.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{listing.description}</p>
              
              <p className="text-sm text-gray-500 mb-2 flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="truncate">{listing.location}</span>
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-1 mb-3">
                {listing.features.slice(0, 3).map((feature: string, idx: number) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-gray-600">{listing.area}</span>
                <span className={'px-2 py-1 text-xs rounded-full ' + getTypeColor(listing.type)}>
                  {listing.type}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs font-medium">
                      {listing.owner.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-2">
                    <p className="text-xs text-gray-500">Owner</p>
                    <p className="text-sm font-medium text-gray-900">{listing.owner}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{formatPrice(listing.price)}</p>
                  <p className="text-xs text-gray-400 flex items-center justify-end">
                    <EyeIcon className="w-3 h-3 mr-1" />
                    {listing.views} views
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                  View Details
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {filteredListings.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
          <BuildingStorefrontIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No properties found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setTypeFilter('all')
              setStatusFilter('all')
            }}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

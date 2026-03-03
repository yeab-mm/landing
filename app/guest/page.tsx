'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  ShieldCheckIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  HomeIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  FunnelIcon,
  HeartIcon,
  ArrowLeftIcon,
  LanguageIcon,
  PhotoIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/lib/LanguageContext'

interface LandListing {
  id: number
  title: string
  location: string
  price: number
  area: number
  type: 'residential' | 'commercial' | 'agricultural'
  image: string
  verified: boolean
  featured: boolean
}

export default function GuestPage() {
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'en' | 'am')
  }

  // Content based on language
  const content = {
    en: {
      brand: 'Digital',
      brandSpan: 'Land',
      back: 'Back to Home',
      badge: 'Continue as Guest',
      title: 'Browse Land in Bahir Dar',
      subtitle: 'Explore verified land listings across Bahir Dar city',
      searchPlaceholder: 'Search by location, size, or price...',
      filters: 'Filters',
      allTypes: 'All Types',
      residential: 'Residential',
      commercial: 'Commercial',
      agricultural: 'Agricultural',
      allPrices: 'All Prices',
      under500k: 'Under 500,000 ETB',
      under1m: '500,000 - 1,000,000 ETB',
      under2m: '1,000,000 - 2,000,000 ETB',
      above2m: 'Above 2,000,000 ETB',
      clearFilters: 'Clear Filters',
      verified: 'Verified',
      featured: 'Featured',
      viewDetails: 'View Details',
      noListings: 'No listings found',
      noListingsDesc: 'Try adjusting your search or filters',
      loginPrompt: 'Want to save listings and get updates?',
      login: 'Login',
      register: 'Create Account',
      area: 'sq m',
      etb: 'ETB',
      guestMessage: 'You are browsing as a guest',
      guestDescription: 'Create an account to save listings and get notified about new properties',
      locations: {
        bdu: 'Bahir Dar University Area',
        tana: 'Lake Tana Area',
        downtown: 'Downtown',
        kebele16: 'Kebele 16',
        kebele17: 'Kebele 17',
        kebele18: 'Kebele 18',
        kebele19: 'Kebele 19',
        kebele20: 'Kebele 20'
      }
    },
    am: {
      brand: 'ዲጂታል',
      brandSpan: 'መሬት',
      back: 'ወደ መነሻ ተመለስ',
      badge: 'እንደ እንግዳ ይቀጥሉ',
      title: 'በባህር ዳር መሬት ይቃኙ',
      subtitle: 'በመላው ባህር ዳር ከተማ የተረጋገጡ የመሬት ዝርዝሮችን ይመልከቱ',
      searchPlaceholder: 'በአካባቢ፣ በመጠን ወይም በዋጋ ይፈልጉ...',
      filters: 'ማጣሪያዎች',
      allTypes: 'ሁሉም አይነቶች',
      residential: 'መኖሪያ',
      commercial: 'ንግድ',
      agricultural: 'እርሻ',
      allPrices: 'ሁሉም ዋጋዎች',
      under500k: 'ከ500,000 ብር በታች',
      under1m: '500,000 - 1,000,000 ብር',
      under2m: '1,000,000 - 2,000,000 ብር',
      above2m: 'ከ2,000,000 ብር በላይ',
      clearFilters: 'ማጣሪያዎችን አጽዳ',
      verified: 'የተረጋገጠ',
      featured: 'ተለይቶ የቀረበ',
      viewDetails: 'ዝርዝሮችን ተመልከት',
      noListings: 'ምንም ዝርዝሮች አልተገኙም',
      noListingsDesc: 'ፍለጋዎን ወይም ማጣሪያዎችዎን ለማስተካከል ይሞክሩ',
      loginPrompt: 'ዝርዝሮችን ማስቀመጥ እና ማሻሻያዎችን ማግኘት ይፈልጋሉ?',
      login: 'ግባ',
      register: 'መለያ ይፍጠሩ',
      area: 'ካሬ ሜትር',
      etb: 'ብር',
      guestMessage: 'እንደ እንግዳ እየተመለከቱ ነው',
      guestDescription: 'ዝርዝሮችን ለማስቀመጥ እና ስለ አዳዲስ ንብረቶች ማሳወቂያ ለማግኘት መለያ ይፍጠሩ',
      locations: {
        bdu: 'ባህር ዳር ዩኒቨርሲቲ አካባቢ',
        tana: 'ጣና ሐይቅ አካባቢ',
        downtown: 'መሀል ከተማ',
        kebele16: 'ቀበሌ 16',
        kebele17: 'ቀበሌ 17',
        kebele18: 'ቀበሌ 18',
        kebele19: 'ቀበሌ 19',
        kebele20: 'ቀበሌ 20'
      }
    }
  }

  const t = content[language]

  // Sample land listings in Bahir Dar
  const listings: LandListing[] = [
    {
      id: 1,
      title: language === 'en' ? 'Residential Plot near BDU' : 'በባህር ዳር ዩኒቨርሲቲ አቅራቢያ የመኖሪያ መሬት',
      location: t.locations.bdu,
      price: 750000,
      area: 400,
      type: 'residential',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      verified: true,
      featured: true
    },
    {
      id: 2,
      title: language === 'en' ? 'Commercial Space Downtown' : 'በመሀል ከተማ የንግድ ቦታ',
      location: t.locations.downtown,
      price: 1200000,
      area: 300,
      type: 'commercial',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      verified: true,
      featured: true
    },
    {
      id: 3,
      title: language === 'en' ? 'Agricultural Land near Lake Tana' : 'በጣና ሐይቅ አቅራቢያ የእርሻ መሬት',
      location: t.locations.tana,
      price: 450000,
      area: 1500,
      type: 'agricultural',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      verified: true,
      featured: false
    }
  ]

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || listing.type === selectedType
    
    let matchesPrice = true
    if (priceRange !== 'all') {
      if (priceRange === 'under500k') matchesPrice = listing.price < 500000
      else if (priceRange === 'under1m') matchesPrice = listing.price >= 500000 && listing.price < 1000000
      else if (priceRange === 'under2m') matchesPrice = listing.price >= 1000000 && listing.price < 2000000
      else if (priceRange === 'above2m') matchesPrice = listing.price >= 2000000
    }
    
    return matchesSearch && matchesType && matchesPrice
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat().format(price)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Green Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 pb-32">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-8 w-8 text-white" />
              <span className="text-2xl font-light text-white">
                {t.brand} <span className="font-semibold">{t.brandSpan}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="flex items-center space-x-2 mr-4 border-r border-white/30 pr-4">
                <LanguageIcon className="h-5 w-5 text-white" />
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="bg-transparent text-white text-sm font-medium focus:outline-none cursor-pointer"
                >
                  <option value="en" className="text-gray-900">English</option>
                  <option value="am" className="text-gray-900">አማርኛ</option>
                </select>
              </div>
              <Link 
                href="/" 
                className="flex items-center text-white hover:text-green-100 transition-colors bg-white/10 px-4 py-2 rounded-lg"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                {t.back}
              </Link>
            </div>
          </div>
        </nav>

        {/* Guest Badge */}
        <div className="max-w-7xl mx-auto px-4 mt-8">
          <div className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <UserIcon className="h-4 w-4 text-yellow-300 mr-2" />
            <span className="text-sm font-medium text-yellow-300">{t.guestMessage}</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center px-4 mt-4">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <GlobeAltIcon className="h-5 w-5 text-white mr-2" />
            <span className="text-sm font-medium text-white">{t.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h1>
          <p className="text-xl text-green-100 mb-8">{t.subtitle}</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Guest Description */}
          <p className="text-green-200 text-sm mt-4">
            {t.guestDescription}
          </p>
        </div>
      </div>

      {/* Content Section - White Card Overlay */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 pb-16">
        {/* Filters Toggle for Mobile */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white rounded-xl shadow-lg p-4 flex items-center justify-between"
          >
            <span className="font-medium text-gray-900">{t.filters}</span>
            <FunnelIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <FunnelIcon className="w-5 h-5 mr-2 text-green-600" />
                {t.filters}
              </h3>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.allTypes}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">{t.allTypes}</option>
                  <option value="residential">{t.residential}</option>
                  <option value="commercial">{t.commercial}</option>
                  <option value="agricultural">{t.agricultural}</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.allPrices}
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">{t.allPrices}</option>
                  <option value="under500k">{t.under500k}</option>
                  <option value="under1m">{t.under1m}</option>
                  <option value="under2m">{t.under2m}</option>
                  <option value="above2m">{t.above2m}</option>
                </select>
              </div>

              {/* Filter Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setSelectedType('all')
                    setPriceRange('all')
                  }}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  {t.clearFilters}
                </button>
              </div>

              {/* Guest Note in Filters */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="bg-yellow-50 rounded-lg p-3">
                  <p className="text-xs text-yellow-800">
                    {language === 'en' 
                      ? '✨ Create an account to save your filters and get notified about new listings'
                      : '✨ ማጣሪያዎችዎን ለማስቀመጥ እና ስለ አዳዲስ ዝርዝሮች ማሳወቂያ ለማግኘት መለያ ይፍጠሩ'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:col-span-3">
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noListings}</h3>
                <p className="text-gray-500 mb-6">{t.noListingsDesc}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <div key={listing.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group">
                    <Link href={`/guest/${listing.id}`}>
                      <div className="relative h-48">
                        <img 
                          src={listing.image} 
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {listing.verified && (
                          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                            <ShieldCheckIcon className="w-3 h-3 mr-1" />
                            {t.verified}
                          </div>
                        )}
                        {listing.featured && (
                          <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                            {t.featured}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{listing.title}</h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPinIcon className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                            <span className="line-clamp-1">{listing.location}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <HomeIcon className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                            <span>{listing.area} {t.area}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <CurrencyDollarIcon className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                            <span>{formatPrice(listing.price)} {t.etb}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            listing.type === 'residential' ? 'bg-blue-100 text-blue-800' :
                            listing.type === 'commercial' ? 'bg-purple-100 text-purple-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {listing.type === 'residential' ? t.residential :
                             listing.type === 'commercial' ? t.commercial : t.agricultural}
                          </span>
                          
                          <span className="text-green-600 hover:text-green-700 text-sm font-medium inline-flex items-center">
                            {t.viewDetails} 
                            <span className="ml-1">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {/* Login Prompt for Guests */}
            <div className="mt-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center border border-yellow-200">
              <HeartIcon className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.loginPrompt}</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {language === 'en' 
                  ? 'Join Digital Land Portal to save your favorite listings and get email alerts when new properties match your criteria.'
                  : 'የሚወዷቸውን ዝርዝሮች ለማስቀመጥ እና ከመስፈርትዎ ጋር የሚዛመዱ አዳዲስ ንብረቶች ሲኖሩ የኢሜይል ማሳወቂያ ለማግኘት ዲጂታል መሬት መግቢያን ይቀላቀሉ።'}
              </p>
              <div className="flex justify-center space-x-4">
                <Link 
                  href="/login" 
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  {t.login}
                </Link>
                <Link 
                  href="/register" 
                  className="bg-white text-green-600 px-6 py-2 rounded-lg border-2 border-green-600 hover:bg-green-50 transition-colors font-medium"
                >
                  {t.register}
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                {language === 'en' 
                  ? 'Continue browsing as a guest - no account needed'
                  : 'እንደ እንግዳ ማሰስዎን ይቀጥሉ - መለያ አያስፈልግም'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
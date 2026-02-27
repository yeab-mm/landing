'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Simple Navigation */}
      <nav className="absolute top-0 w-full p-6 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-light text-gray-800">
              Digital <span className="font-semibold text-green-600">Land</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/help" 
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              Help
            </Link>
            <Link 
              href="/about" 
              className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content with Image */}
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Image with Overlay - Changed to green gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Beautiful landscape of Bahir Dar with lake and mountains" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text and Buttons */}
            <div className="text-white">
              <div className="mb-8">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Ethiopia's Official Land Registry</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                  Digital Land Portal
                </h1>
                
                <p className="text-xl text-green-100 flex items-center space-x-3 mb-8">
                  <span>Secure</span>
                  <span className="w-1 h-1 bg-green-300 rounded-full"></span>
                  <span>Verified</span>
                  <span className="w-1 h-1 bg-green-300 rounded-full"></span>
                  <span>Official</span>
                </p>

                <p className="text-lg text-green-100 mb-8 max-w-md">
                  Access Ethiopia's first digital land registry system. Verify ownership, 
                  browse properties, and manage your land records securely online.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 max-w-sm">
                <Link
                  href="/login"
                  className="block w-full bg-white text-green-900 px-6 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all shadow-xl hover:shadow-2xl text-center"
                >
                  Login
                </Link>
                
                <Link
                  href="/register"
                  className="block w-full bg-green-600 text-white px-6 py-4 rounded-xl font-semibold text-lg border-2 border-white/20 hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-center"
                >
                  Create Account
                </Link>
                
                <Link
                  href="/marketplace"
                  className="block w-full text-green-100 px-6 py-3 rounded-lg text-sm hover:text-white transition-colors text-center"
                >
                  Continue as Guest
                </Link>
              </div>

              {/* Footer Text */}
              <p className="mt-8 text-xs text-green-200">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>

            {/* Right Column - Image with Stats */}
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">15K+</div>
                    <div className="text-xs text-green-200">Registered Users</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">8K+</div>
                    <div className="text-xs text-green-200">Verified Lands</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">₿45M+</div>
                    <div className="text-xs text-green-200">Transactions</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">98%</div>
                    <div className="text-xs text-green-200">Satisfaction</div>
                  </div>
                </div>
                
                {/* Featured Property */}
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
                      alt="Coffee House"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-white font-medium">Featured Property</p>
                      <p className="text-sm text-green-200">Coffee House - Downtown</p>
                      <p className="text-xs text-green-300">₿ 850,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white" fillOpacity="0.1"/>
        </svg>
      </div>
    </div>
  )
}

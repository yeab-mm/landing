'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    setTimeout(() => {
      setLoading(false)
      if (formData.email && formData.password) {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userEmail', formData.email)
        toast.success('Login successful!')
        router.push('/dashboard')
      } else {
        toast.error('Please enter both email and password')
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Green Card */}
      <div className="max-w-md w-full bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-green-600 text-3xl font-bold">DL</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-green-100">Please sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Email Address
            </label>
            <div className="relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full pl-10 pr-4 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-100 mb-1">
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full pl-10 pr-4 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link href="/forgot-password" className="text-sm text-green-200 hover:text-white font-medium">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-green-400"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-green-600 to-green-700 text-green-200">Or Continue With</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="flex justify-center items-center px-4 py-2 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg hover:bg-green-500 hover:bg-opacity-30 transition-colors">
              <FaGoogle className="w-5 h-5 text-white" />
            </button>
            <button className="flex justify-center items-center px-4 py-2 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg hover:bg-green-500 hover:bg-opacity-30 transition-colors">
              <FaFacebook className="w-5 h-5 text-white" />
            </button>
            <button className="flex justify-center items-center px-4 py-2 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg hover:bg-green-500 hover:bg-opacity-30 transition-colors">
              <FaTwitter className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Register Link */}
        <p className="mt-8 text-center text-green-200">
          Don't have an Account?{' '}
          <Link href="/register" className="text-white hover:text-green-100 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

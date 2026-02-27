'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      toast.success('Password reset instructions sent to your email')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Green Card */}
      <div className="max-w-md w-full bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-2xl p-8 relative z-10">
        {/* Back to Login Link */}
        <Link 
          href="/login" 
          className="inline-flex items-center text-green-200 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Login
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-green-600 text-3xl font-bold">DL</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
          <p className="text-green-100">Enter your email to receive reset instructions</p>
        </div>

        {!submitted ? (
          <>
            {/* Forgot Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-green-100 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    className="w-full pl-10 pr-4 py-3 bg-green-500 bg-opacity-20 border border-green-400 rounded-lg text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </form>

            {/* Social Login - Optional */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-green-400"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-green-600 to-green-700 text-green-200">
                    Or continue with
                  </span>
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
          </>
        ) : (
          /* Success Message */
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-green-100 mb-6">
              We've sent password reset instructions to <br />
              <span className="font-semibold text-white">{email}</span>
            </p>
            <div className="bg-green-500 bg-opacity-20 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-100">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-white font-semibold hover:underline"
                >
                  try again
                </button>
              </p>
            </div>
            <Link
              href="/login"
              className="inline-flex items-center text-green-200 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        )}

        {/* Register Link */}
        <p className="mt-8 text-center text-green-200">
          Don't have an account?{' '}
          <Link href="/register" className="text-white hover:text-green-100 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

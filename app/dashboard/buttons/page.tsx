'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowPathIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  UserPlusIcon,
  DocumentCheckIcon,
  HomeIcon,
  ChartBarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
  ShoppingBagIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline'

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false)

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className='fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200'>
        <div className='flex items-center h-16 px-6 border-b border-gray-200'>
          <div className='w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center'>
            <span className='text-white font-bold'>DL</span>
          </div>
          <span className='ml-3 font-semibold text-gray-900'>Digital Land</span>
        </div>
        
        <nav className='mt-6 px-3'>
          <Link href='/dashboard' className='flex items-center px-4 py-3 mb-1 text-sm rounded-lg text-gray-700 hover:bg-gray-50'>
            <HomeIcon className='w-5 h-5 mr-3 text-gray-400' />
            Dashboard
          </Link>
          <Link href='/dashboard/users' className='flex items-center px-4 py-3 mb-1 text-sm rounded-lg text-gray-700 hover:bg-gray-50'>
            <UserGroupIcon className='w-5 h-5 mr-3 text-gray-400' />
            Users
          </Link>
          <Link href='/dashboard/verifications' className='flex items-center px-4 py-3 mb-1 text-sm rounded-lg text-gray-700 hover:bg-gray-50'>
            <DocumentCheckIcon className='w-5 h-5 mr-3 text-gray-400' />
            Verifications
          </Link>
          <Link href='/dashboard/marketplace' className='flex items-center px-4 py-3 mb-1 text-sm rounded-lg text-gray-700 hover:bg-gray-50'>
            <ShoppingBagIcon className='w-5 h-5 mr-3 text-gray-400' />
            Marketplace
          </Link>
          <Link href='/dashboard/payments' className='flex items-center px-4 py-3 mb-1 text-sm rounded-lg text-gray-700 hover:bg-gray-50'>
            <CreditCardIcon className='w-5 h-5 mr-3 text-gray-400' />
            Payments
          </Link>
          <Link href='/dashboard/reports' className='flex items-center px-4 py-3 mb-1 text-sm rounded-lg text-gray-700 hover:bg-gray-50'>
            <DocumentArrowDownIcon className='w-5 h-5 mr-3 text-gray-400' />
            Reports
          </Link>
          <Link href='/dashboard/settings' className='flex items-center px-4 py-3 mb-1 text-sm rounded-lg text-gray-700 hover:bg-gray-50'>
            <Cog6ToothIcon className='w-5 h-5 mr-3 text-gray-400' />
            Settings
          </Link>
          <Link href='/dashboard/buttons' className='flex items-center px-4 py-3 mb-1 text-sm rounded-lg bg-blue-50 text-blue-700'>
            <div className='w-5 h-5 mr-3 bg-blue-600 rounded-full'></div>
            Buttons
          </Link>
        </nav>

        {/* Logout Button */}
        <div className='absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200'>
          <button className='flex items-center w-full px-4 py-3 text-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors'>
            <svg className='w-5 h-5 mr-3 text-red-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className='ml-64 flex-1'>
        {/* Header */}
        <header className='bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8'>
          <h1 className='text-xl font-semibold text-gray-900'>Button Components</h1>
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-gray-700'>Admin</span>
            <img 
              src='https://ui-avatars.com/api/?name=Admin+User&background=2563eb&color=fff' 
              alt='Admin' 
              className='w-8 h-8 rounded-full'
            />
          </div>
        </header>

        {/* Buttons Showcase */}
        <main className='p-8'>
          {/* Button Variants */}
          <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Button Variants</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              
              {/* Primary Button */}
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-700'>Primary Button</p>
                <button className='btn-primary w-full'>
                  Primary Action
                </button>
                <p className='text-xs text-gray-500'>Used for: Main actions, navigation, primary CTAs</p>
              </div>

              {/* Success Button */}
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-700'>Success Button</p>
                <button className='btn-success w-full'>
                  <CheckCircleIcon className='w-5 h-5 mr-2 inline' />
                  Approve Verification
                </button>
                <p className='text-xs text-gray-500'>Used for: Approvals, completions, confirmations</p>
              </div>

              {/* Danger Button */}
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-700'>Danger Button</p>
                <button className='btn-danger w-full'>
                  <TrashIcon className='w-5 h-5 mr-2 inline' />
                  Delete User
                </button>
                <p className='text-xs text-gray-500'>Used for: Deletions, rejections, destructive actions</p>
              </div>

              {/* Warning Button */}
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-700'>Warning Button</p>
                <button className='btn-warning w-full'>
                  <ExclamationTriangleIcon className='w-5 h-5 mr-2 inline' />
                  Suspend User
                </button>
                <p className='text-xs text-gray-500'>Used for: Cautionary actions, warnings</p>
              </div>

              {/* Secondary Button */}
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-700'>Secondary Button</p>
                <button className='btn-secondary w-full'>
                  Cancel
                </button>
                <p className='text-xs text-gray-500'>Used for: Alternative actions, cancel buttons</p>
              </div>

              {/* Outline Button */}
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-700'>Outline Button</p>
                <button className='btn-outline w-full'>
                  <EyeIcon className='w-5 h-5 mr-2 inline' />
                  View Details
                </button>
                <p className='text-xs text-gray-500'>Used for: Less emphasis, secondary options</p>
              </div>
            </div>
          </div>

          {/* Button Sizes */}
          <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Button Sizes</h2>
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <button className='btn-primary px-3 py-1.5 text-sm'>Small Button</button>
                <button className='btn-primary'>Medium Button</button>
                <button className='btn-primary px-6 py-3 text-lg'>Large Button</button>
              </div>
            </div>
          </div>

          {/* Button with Icons */}
          <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Buttons with Icons</h2>
            <div className='flex flex-wrap gap-4'>
              <button className='btn-primary flex items-center'>
                <UserPlusIcon className='w-5 h-5 mr-2' />
                Add User
              </button>
              <button className='btn-success flex items-center'>
                <CheckCircleIcon className='w-5 h-5 mr-2' />
                Approve
              </button>
              <button className='btn-danger flex items-center'>
                <XCircleIcon className='w-5 h-5 mr-2' />
                Reject
              </button>
              <button className='btn-warning flex items-center'>
                <ExclamationTriangleIcon className='w-5 h-5 mr-2' />
                Flag
              </button>
              <button className='btn-secondary flex items-center'>
                <PencilIcon className='w-5 h-5 mr-2' />
                Edit
              </button>
              <button className='btn-outline flex items-center'>
                <EyeIcon className='w-5 h-5 mr-2' />
                Preview
              </button>
            </div>
          </div>

          {/* Loading States */}
          <div className='bg-white rounded-xl shadow-sm p-6 mb-8'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Loading States</h2>
            <div className='flex flex-wrap gap-4'>
              <button className='btn-primary flex items-center' onClick={() => setLoading(!loading)}>
                {loading ? (
                  <>
                    <ArrowPathIcon className='w-5 h-5 mr-2 animate-spin' />
                    Processing...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
              <button className='btn-success flex items-center' disabled>
                <ArrowPathIcon className='w-5 h-5 mr-2 animate-spin' />
                Approving...
              </button>
              <button className='btn-primary opacity-50 cursor-not-allowed' disabled>
                Disabled Button
              </button>
            </div>
          </div>

          {/* Real-world Examples */}
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Real-world Examples</h2>
            
            {/* User Management Actions */}
            <div className='mb-6'>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>User Management</h3>
              <div className='flex flex-wrap gap-3'>
                <button className='btn-primary flex items-center'>
                  <UserPlusIcon className='w-4 h-4 mr-1' />
                  Add User
                </button>
                <button className='btn-success flex items-center text-sm'>
                  <CheckCircleIcon className='w-4 h-4 mr-1' />
                  Activate
                </button>
                <button className='btn-warning flex items-center text-sm'>
                  <ExclamationTriangleIcon className='w-4 h-4 mr-1' />
                  Suspend
                </button>
                <button className='btn-danger flex items-center text-sm'>
                  <TrashIcon className='w-4 h-4 mr-1' />
                  Delete
                </button>
              </div>
            </div>

            {/* Verification Actions */}
            <div className='mb-6'>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>Verification Actions</h3>
              <div className='flex flex-wrap gap-3'>
                <button className='btn-primary flex items-center'>
                  <DocumentCheckIcon className='w-4 h-4 mr-1' />
                  Review
                </button>
                <button className='btn-success flex items-center'>
                  <CheckCircleIcon className='w-4 h-4 mr-1' />
                  Approve
                </button>
                <button className='btn-danger flex items-center'>
                  <XCircleIcon className='w-4 h-4 mr-1' />
                  Reject
                </button>
                <button className='btn-outline flex items-center'>
                  <EyeIcon className='w-4 h-4 mr-1' />
                  View Docs
                </button>
              </div>
            </div>

            {/* Payment Actions */}
            <div>
              <h3 className='text-sm font-medium text-gray-700 mb-3'>Payment Actions</h3>
              <div className='flex flex-wrap gap-3'>
                <button className='btn-primary flex items-center'>
                  <CurrencyDollarIcon className='w-4 h-4 mr-1' />
                  Process Payment
                </button>
                <button className='btn-success flex items-center'>
                  <CheckCircleIcon className='w-4 h-4 mr-1' />
                  Confirm
                </button>
                <button className='btn-danger flex items-center'>
                  <XCircleIcon className='w-4 h-4 mr-1' />
                  Refund
                </button>
                <button className='btn-outline flex items-center'>
                  <EyeIcon className='w-4 h-4 mr-1' />
                  View Receipt
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

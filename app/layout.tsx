import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from '../lib/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digital Land Portal - Bahir Dar University',
  description: 'Digital Land Registry and Ownership Verification System for Ethiopia',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#16a34a', // Changed to green
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#363636',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
              },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  )
}

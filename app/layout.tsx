import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from '@/lib/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digital Land Portal - Bahir Dar University',
  description: 'Digital Land Registry and Ownership Verification System for Ethiopia',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>  {/* ← This must wrap everything */}
          {children}
          <Toaster position="top-right" />
        </LanguageProvider>
      </body>
    </html>
  )
}
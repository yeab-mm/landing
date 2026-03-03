// app/officer/layout.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  HomeIcon,
  UsersIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BellIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/lib/LanguageContext'
import { useTranslation } from '@/lib/useTranslation'

// ... rest of your officer layout code, same fix: use setLanguage instead of changeLanguage
'use client'

import { ArrowLeft } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Navbar from '..'

const pageTitles: Record<string, string> = {
  '/distributors': 'Distributors',
  '/medicines': 'Medicines',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

const MainNavbar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 bg-white border-b">
        {pathname === "/"  ? <Navbar />:  <>
          <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        
        
        <button
          onClick={() => router.back()}
          className="flex items-center cursor-pointer justify-center rounded-full p-2 hover:bg-gray-100 transition"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

       
        <h1 className="text-lg md:text-xl font-semibold text-gray-900">
          {pageTitles[pathname] ?? ''}
        </h1>
      </div>
        </>}
    
    </div>
  )
}

export default MainNavbar

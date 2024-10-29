import React from 'react'
import { Shield, FileText, Users } from 'lucide-react'
import Link from 'next/link'

export const  Footer =()=>  {
  return (
    <footer className= "absolute mt-10 bottom-0  w-full bg-white text-gray-500 py-8 border-t border-gray-300 max-h-[400px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <img src="/seekmonk.jpg" alt="seek monk" className="h-8 w-auto" />
            </Link>
          </div>
          <nav className="w-full p-4 flex flex-col md:flex-row  justify-start  md:justify-end gap-6">
            <Link 
              href="/privacy-policy" 
              className="flex items-left text-start hover:text-white transition-colors duration-300"
            >
              <Shield className="h-5 w-5 mr-2" />
              Privacy Policy
            </Link>
            <Link 
              href="/terms-conditions" 
              className="flex items-center hover:text-white transition-colors duration-300"
            >
              <FileText className="h-5 w-5 mr-2" />
              Terms & Conditions
            </Link>
            <Link 
              href="/about-us" 
              className="flex items-center hover:text-white transition-colors duration-300"
            >
              <Users className="h-5 w-5 mr-2" />
              About Us
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm">
          © {new Date().getFullYear()} SeekMonk. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
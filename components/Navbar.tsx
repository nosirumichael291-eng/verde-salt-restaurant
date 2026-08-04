'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-charcoal/95 backdrop-blur-sm text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-terracotta">Verde</span>
            <span className="font-serif text-2xl font-bold text-white">&</span>
            <span className="font-serif text-2xl font-bold text-sage">Salt</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-terracotta transition-colors">
              Home
            </Link>
            <Link href="/menu" className="hover:text-terracotta transition-colors">
              Menu
            </Link>
            <Link href="/reservations" className="hover:text-terracotta transition-colors">
              Reservations
            </Link>
            <Link href="/about" className="hover:text-terracotta transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-terracotta transition-colors">
              Contact
            </Link>
            <Link
              href="/reservations"
              className="bg-terracotta hover:bg-terracotta/80 px-6 py-2 rounded-full font-medium transition-all"
            >
              Book a Table
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link href="/" className="hover:text-terracotta transition-colors" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/menu" className="hover:text-terracotta transition-colors" onClick={() => setIsOpen(false)}>
                Menu
              </Link>
              <Link href="/reservations" className="hover:text-terracotta transition-colors" onClick={() => setIsOpen(false)}>
                Reservations
              </Link>
              <Link href="/about" className="hover:text-terracotta transition-colors" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="hover:text-terracotta transition-colors" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <Link
                href="/reservations"
                className="bg-terracotta hover:bg-terracotta/80 px-6 py-2 rounded-full font-medium text-center transition-all"
                onClick={() => setIsOpen(false)}
              >
                Book a Table
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

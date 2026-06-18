'use client';

import { useState } from 'react';
import { Link } from 'wouter';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Courses', href: '/courses' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E8E8E8] shadow-sm">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
            <img 
              src="/manus-storage/genius-logo-shield-cropped_9229f373.png" 
              alt="The Genius Institute" 
              className="h-12 w-12"
            />
            <span className="font-merriweather text-lg font-bold text-[#001F3F] hidden sm:inline">
              The Genius Institute
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="text-gray-700 hover:text-[#001F3F] font-medium transition-colors cursor-pointer">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/login">
            <span className="text-gray-700 hover:text-[#001F3F] font-medium transition-colors cursor-pointer">
              Log In
            </span>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#001F3F] hover:bg-[#000814] text-white font-semibold px-6 py-2">
              Start Learning
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-[#E8E8E8] bg-white">
          <div className="container py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className="block text-gray-700 hover:text-[#001F3F] font-medium py-2 cursor-pointer transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button 
                className="w-full bg-[#001F3F] hover:bg-[#000814] text-white font-semibold" 
                onClick={() => setIsOpen(false)}
              >
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

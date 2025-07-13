'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/sports', label: 'Sports', icon: '⚽' },
    { href: '/members', label: 'Members', icon: '👥' },
    { href: '/subscriptions', label: 'Subscriptions', icon: '📋' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="nav w-full z-50 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center mr-3" aria-label="Home">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-blue-700 hover:text-cyan-400 transition-colors duration-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-8 9 8M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
          </svg>
        </Link>
        <Link href="/" className="flex items-center">
          <img src="/apex-club-logo.png" alt="Apex Club Logo" style={{ height: 48, width: 'auto', marginRight: 20, borderRadius: 8 }} />
        </Link>
      </div>
      {/* Desktop Navigation Links - top right, horizontal, clean and modern */}
      <div className="flex flex-row items-center gap-x-6 whitespace-nowrap ml-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`relative nav-link px-3 py-2 flex items-center transition-colors duration-200 hover:bg-white/10 hover:text-cyan-300 rounded-xl ${pathname === item.href ? 'active' : ''}`}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            <span className="text-xl mr-2 text-white transition-colors duration-200" aria-hidden="true">{item.icon}</span>
            <span className="text-black">{item.label}</span>
            {pathname === item.href && (
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 rounded-full animate-pulse"></span>
            )}
          </Link>
        ))}
      </div>
      {/* Mobile menu button and mobile navigation removed */}
    </nav>
  );
} 
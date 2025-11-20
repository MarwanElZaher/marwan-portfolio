'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', path: '/#about' },
    { label: 'Skills', path: '/#skills' },
    { label: 'Projects', path: '/#projects' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-glass-bg/90 backdrop-blur-md border-b border-glass-border py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
    >
      <nav className="container mx-auto flex justify-between items-center px-6">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground">
          Marwan<span className="text-primary">.</span>
        </Link>

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.path}
                  className="text-sm font-medium text-muted hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <Link
            href="/contact"
            className="md:hidden px-4 py-2 text-sm bg-white/10 rounded-full"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}
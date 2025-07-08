'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Book an Appointment', href: '/book' },
  { label: 'Buy Plants', href: '/buy' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md fixed top-0 w-full z-50 h-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-500">
          Nursury
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-green-400 transition">
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="bg-green-500 text-black px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Slide Down */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black text-white px-6 pt-4 pb-6 flex flex-col gap-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-green-400 transition"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="bg-green-500 text-black px-4 py-2 rounded font-semibold hover:bg-green-600 transition mt-2"
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

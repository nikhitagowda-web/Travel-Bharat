import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, ShieldCheck, MapPin } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore States', path: '/#states-section' },
    { name: 'Admin Dashboard', path: '/admin' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Identity */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                Travel<span className="text-orange-600">Bharat</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 -mt-1">
                Incredible India
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isActive('/') ? 'text-orange-600 font-semibold' : 'text-slate-600 hover:text-orange-600'
              }`}
            >
              Home
            </Link>
            <a
              href="/#states-section"
              className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
            >
              Explore 10+ States
            </a>
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-slate-200 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Admin Panel
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6 text-orange-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600"
          >
            Home
          </Link>
          <a
            href="/#states-section"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600"
          >
            Explore 10+ States
          </a>
          <Link
            to="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium text-emerald-700 bg-emerald-50"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Admin Content Manager
          </Link>
        </div>
      )}
    </header>
  );
}
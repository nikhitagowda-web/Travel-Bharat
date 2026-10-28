import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Heart, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Travel<span className="text-orange-500">Bharat</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your digital tourism encyclopedia for exploring India state by state. Discover culture, heritage, nature, and adventure.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-orange-400 transition-colors">Home Overview</Link>
              </li>
              <li>
                <a href="/#states-section" className="hover:text-orange-400 transition-colors">10+ Covered States</a>
              </li>
              <li>
                <Link to="/admin" className="hover:text-orange-400 transition-colors">Content Management</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Featured Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                UNESCO Heritage Sites
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                Nature & Western Ghats
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                Adventures & Coasts
              </li>
            </ul>
          </div>

          {/* Academic & Project Attribution */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-white">Unified Mentor Project</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Designed as a mobile-first, high-performance web platform under the Incredible India tourism initiative.
            </p>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TravelBharat. Built with React & Tailwind CSS.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Tourism
          </p>
        </div>
      </div>
    </footer>
  );
}
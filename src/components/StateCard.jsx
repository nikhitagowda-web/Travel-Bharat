import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Compass } from 'lucide-react';

export default function StateCard({ state }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* State Image Thumbnail */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={state.heroImage}
          alt={state.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* State Badge on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs text-orange-300 font-medium mb-0.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Capital: {state.capital}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
            {state.name}
          </h3>
        </div>

        {/* Place Count Chip */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-800 shadow-sm">
          {state.places.length} {state.places.length === 1 ? 'Place' : 'Places'}
        </div>
      </div>

      {/* State Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-orange-600 mb-1.5 italic">
            "{state.tagline}"
          </p>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {state.description}
          </p>
        </div>

        {/* Action Link */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <Link
            to={`/state/${state.id}`}
            className="w-full inline-flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors"
          >
            <span>Explore Destinations</span>
            <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-orange-50 flex items-center justify-center text-slate-700 group-hover:text-orange-600 transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
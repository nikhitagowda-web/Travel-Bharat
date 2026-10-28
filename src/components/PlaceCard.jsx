import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, ArrowRight, Tag } from 'lucide-react';

export default function PlaceCard({ place, stateId, stateName }) {
  const categoryColorMap = {
    Heritage: 'bg-amber-100 text-amber-800 border-amber-200',
    Nature: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Religious: 'bg-purple-100 text-purple-800 border-purple-200',
    Adventure: 'bg-sky-100 text-sky-800 border-sky-200'
  };

  const badgeClass =
    categoryColorMap[place.category] || 'bg-slate-100 text-slate-800 border-slate-200';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      {/* Place Main Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <img
          src={place.images[0]}
          alt={place.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border shadow-sm ${badgeClass}`}
          >
            {place.category}
          </span>
        </div>

        {/* Star Rating Badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[11px] font-semibold text-white">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{place.rating}</span>
        </div>

        {/* Location Overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <div className="flex items-center gap-1 text-xs font-medium text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="truncate">
              {place.city}, {stateName}
            </span>
          </div>
        </div>
      </div>

      {/* Place Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-base text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 mb-1.5">
            {place.name}
          </h4>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
            {place.overview}
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {place.bestTime}
            </span>
            <span className="font-semibold text-slate-700 truncate max-w-[120px]">
              {place.entryFee.split(',')[0]}
            </span>
          </div>

          <Link
            to={`/state/${stateId}/place/${place.id}`}
            className="w-full py-2 px-3 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5"
          >
            <span>View Full Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
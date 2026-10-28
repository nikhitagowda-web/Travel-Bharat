import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import PlaceCard from '../components/PlaceCard';
import { CATEGORIES } from '../data/travelData';
import { ArrowLeft, MapPin, Compass, Sparkles, Filter } from 'lucide-react';

export default function StateDetail() {
  const { stateId } = useParams();
  const { states } = useTravel();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const currentState = states.find((s) => s.id === stateId);

  const filteredPlaces = useMemo(() => {
    if (!currentState) return [];
    if (selectedCategory === 'All') return currentState.places;
    return currentState.places.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [currentState, selectedCategory]);

  if (!currentState) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">State Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">The requested state profile could not be located.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All States
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* State Hero Header */}
      <section className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900 text-white">
        <img
          src={currentState.heroImage}
          alt={currentState.name}
          className="w-full h-full object-cover opacity-45 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-black/40 hover:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full w-fit transition-all border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to States Overview
          </Link>

          <div className="space-y-2 mb-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 bg-orange-950/70 border border-orange-500/30 px-3 py-1 rounded-full uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              Capital: {currentState.capital}
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {currentState.name}
            </h1>
            <p className="text-sm sm:text-base text-orange-200 font-medium italic">
              "{currentState.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-2 sm:line-clamp-none">
              {currentState.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-orange-600" />
              Tourist Destinations ({filteredPlaces.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore handpicked attractions in {currentState.name}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Places Grid */}
        <div className="mt-8">
          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((pl) => (
                <PlaceCard
                  key={pl.id}
                  place={pl}
                  stateId={currentState.id}
                  stateName={currentState.name}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <Filter className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">
                No places found under category "{selectedCategory}"
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-3 text-xs font-bold text-orange-600 hover:underline"
              >
                View all places in {currentState.name}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
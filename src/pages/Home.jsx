import React, { useState, useMemo } from 'react';
import { useTravel } from '../context/TravelContext';
import { CATEGORIES } from '../data/travelData';
import StateCard from '../components/StateCard';
import PlaceCard from '../components/PlaceCard';
import { Search, MapPin, Sparkles, Filter, Landmark } from 'lucide-react';

export default function Home() {
  const { states } = useTravel();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Search through all places and states
  const filteredResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q && selectedCategory === 'All') return null;

    const matchedPlaces = [];
    states.forEach((st) => {
      st.places.forEach((pl) => {
        const matchesCategory =
          selectedCategory === 'All' || pl.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesQuery =
          !q ||
          pl.name.toLowerCase().includes(q) ||
          pl.city.toLowerCase().includes(q) ||
          st.name.toLowerCase().includes(q) ||
          pl.category.toLowerCase().includes(q);

        if (matchesCategory && matchesQuery) {
          matchedPlaces.push({
            place: pl,
            stateId: st.id,
            stateName: st.name
          });
        }
      });
    });

    return matchedPlaces;
  }, [states, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Unified Mentor • Incredible India Tourism Hub
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Explore India <span className="text-orange-500">State by State</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover verified heritage monuments, misty hill stations, sacred spiritual ghats, and coastal adventures across all Indian states in one centralized platform.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-2xl mx-auto mt-6">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search any place, city, or state (e.g. Mysore, Hampi, Taj Mahal, Coorg)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/95 text-slate-900 placeholder:text-slate-400 font-medium text-sm sm:text-base shadow-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dynamic Search / Filter Results */}
        {filteredResults !== null ? (
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-orange-600" />
                  Search Results
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Found {filteredResults.length} {filteredResults.length === 1 ? 'destination' : 'destinations'} matching your criteria
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 underline"
              >
                Reset Filters
              </button>
            </div>

            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResults.map(({ place, stateId, stateName }) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    stateId={stateId}
                    stateName={stateName}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <Landmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No destinations found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Try searching for another place or clear the category filters to browse all.
                </p>
              </div>
            )}
          </section>
        ) : null}

        {/* States Section (Browse State-by-State) */}
        <section id="states-section" className="scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                State-Wise Tourism Catalog
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Explore All 10+ States
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2 sm:mt-0">
              Click on any state card to discover its top heritage landmarks, nature reserves, cities, and cultural highlights.
            </p>
          </div>

          {/* Grid of States */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {states.map((st) => (
              <StateCard key={st.id} state={st} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
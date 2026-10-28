import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTravel } from '../context/TravelContext';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Ticket,
  Calendar,
  Star,
  CheckCircle2,
  ExternalLink,
  Compass,
  Sparkles
} from 'lucide-react';

export default function PlaceDetail() {
  const { stateId, placeId } = useParams();
  const { states } = useTravel();

  const currentState = states.find((s) => s.id === stateId);
  const place = currentState?.places.find((p) => p.id === placeId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!currentState || !place) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Destination Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The requested tourist destination details could not be found.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-xl text-sm font-semibold hover:bg-orange-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    );
  }

  const categoryColorMap = {
    Heritage: 'bg-amber-100 text-amber-800 border-amber-200',
    Nature: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Religious: 'bg-purple-100 text-purple-800 border-purple-200',
    Adventure: 'bg-sky-100 text-sky-800 border-sky-200'
  };

  const badgeClass =
    categoryColorMap[place.category] || 'bg-slate-100 text-slate-800 border-slate-200';

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    place.mapQuery || `${place.name}, ${place.city}, ${currentState.name}`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link
            to={`/state/${currentState.id}`}
            className="inline-flex items-center gap-1.5 font-bold text-slate-700 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {currentState.name} Places</span>
          </Link>
          <span className="text-slate-400 hidden sm:inline">
            India &gt; {currentState.name} &gt; {place.name}
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border ${badgeClass}`}
              >
                {place.category}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full text-xs font-bold">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{place.rating} / 5.0</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {place.name}
            </h1>
            <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-1.5">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
              <span>
                {place.city}, {currentState.name}, India
              </span>
            </p>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all"
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Gallery Section */}
        <section className="mb-10">
          <div className="h-72 sm:h-96 md:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-900 relative shadow-md">
            <img
              src={place.images[activeImageIndex] || place.images[0]}
              alt={place.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
              Photo {activeImageIndex + 1} of {place.images.length}
            </div>
          </div>

          {/* Thumbnails (if multiple images exist) */}
          {place.images.length > 1 && (
            <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-2">
              {place.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-orange-500 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Core Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Overview, Highlights, Nearby) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview & Historical Significance */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                About & Historical Significance
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed sm:text-base">
                {place.overview}
              </p>
            </div>

            {/* Key Highlights */}
            {place.highlights && place.highlights.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Key Attractions & What to See
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {place.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-orange-50/50 border border-orange-100 text-xs sm:text-sm font-medium text-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Attractions */}
            {place.nearbyAttractions && place.nearbyAttractions.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-3">
                  Nearby Attractions to Explore
                </h3>
                <div className="flex flex-wrap gap-2">
                  {place.nearbyAttractions.map((attraction, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                    >
                      📍 {attraction}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Travel Logistics Card) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 sticky top-24">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                Visitor Information
              </h3>

              {/* Best Time */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Best Time to Visit
                  </h4>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{place.bestTime}</p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Opening Hours
                  </h4>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{place.timings}</p>
                </div>
              </div>

              {/* Entry Fee */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                  <Ticket className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Entry Fee
                  </h4>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">{place.entryFee}</p>
                </div>
              </div>

              {/* State & City Summary Box */}
              <div className="pt-4 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>State:</span>
                    <span className="font-bold text-slate-800">{currentState.name}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>City / Region:</span>
                    <span className="font-bold text-slate-800">{place.city}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Category:</span>
                    <span className="font-bold text-slate-800">{place.category}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
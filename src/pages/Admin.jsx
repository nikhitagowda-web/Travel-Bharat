import React, { useState } from 'react';
import { useTravel } from '../context/TravelContext';
import { CATEGORIES } from '../data/travelData';
import {
  ShieldCheck,
  PlusCircle,
  Trash2,
  RotateCcw,
  CheckCircle,
  MapPin,
  Image as ImageIcon
} from 'lucide-react';

export default function Admin() {
  const { states, addPlaceToState, deletePlace, resetToDefault } = useTravel();

  const [selectedStateId, setSelectedStateId] = useState(states[0]?.id || 'karnataka');
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    category: 'Heritage',
    rating: 4.8,
    bestTime: '',
    timings: '',
    entryFee: '',
    imageUrl: '',
    overview: '',
    highlights: '',
    nearbyAttractions: ''
  });

  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.city || !formData.overview) {
      alert('Please fill in the place name, city, and overview description.');
      return;
    }

    const newPlace = {
      id: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: formData.name,
      city: formData.city,
      category: formData.category,
      rating: parseFloat(formData.rating) || 4.7,
      bestTime: formData.bestTime || 'October to March',
      timings: formData.timings || '09:00 AM - 05:00 PM',
      entryFee: formData.entryFee || 'Free',
      mapQuery: `${formData.name}, ${formData.city}`,
      images: [
        formData.imageUrl ||
          'https://images.unsplash.com/photo-1600100397608-f010f443bbf6?auto=format&fit=crop&w=1000&q=80'
      ],
      overview: formData.overview,
      highlights: formData.highlights
        ? formData.highlights.split(',').map((h) => h.trim())
        : ['Scenic Views', 'Architecture', 'Culture'],
      nearbyAttractions: formData.nearbyAttractions
        ? formData.nearbyAttractions.split(',').map((n) => n.trim())
        : ['City Center', 'Local Market']
    };

    addPlaceToState(selectedStateId, newPlace);

    setSuccessMsg(`"${formData.name}" was successfully added!`);
    setFormData({
      name: '',
      city: '',
      category: 'Heritage',
      rating: 4.8,
      bestTime: '',
      timings: '',
      entryFee: '',
      imageUrl: '',
      overview: '',
      highlights: '',
      nearbyAttractions: ''
    });

    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Content Management Panel
              </h1>
              <p className="text-xs text-slate-500">
                Add, moderate, or remove state tourist destinations
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all destinations back to initial defaults?')) {
                resetToDefault();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Initial Data
          </button>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Destination Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-orange-600" />
              Add New Tourist Destination
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target State */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select State *
                  </label>
                  <select
                    value={selectedStateId}
                    onChange={(e) => setSelectedStateId(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  >
                    {states.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.places.length} places)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Place Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jog Falls"
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / District *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Shivamogga"
                    required
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Best Time */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Best Time to Visit
                  </label>
                  <input
                    type="text"
                    name="bestTime"
                    value={formData.bestTime}
                    onChange={handleChange}
                    placeholder="e.g. August to December"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Timings */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Visiting Timings
                  </label>
                  <input
                    type="text"
                    name="timings"
                    value={formData.timings}
                    onChange={handleChange}
                    placeholder="e.g. 06:00 AM - 06:00 PM"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Entry Fee */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Entry Fee
                  </label>
                  <input
                    type="text"
                    name="entryFee"
                    value={formData.entryFee}
                    onChange={handleChange}
                    placeholder="e.g. ₹50 per person"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image URL (Unsplash or direct image link)
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description & Significance *
                </label>
                <textarea
                  name="overview"
                  rows="3"
                  value={formData.overview}
                  onChange={handleChange}
                  placeholder="Detailed overview about history, nature, culture..."
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Highlights & Nearby comma-separated */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Highlights (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="highlights"
                    value={formData.highlights}
                    onChange={handleChange}
                    placeholder="e.g. Raja Fall, Roarer Fall, Viewpoint"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nearby Attractions (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="nearbyAttractions"
                    value={formData.nearbyAttractions}
                    onChange={handleChange}
                    placeholder="e.g. Linganamakki Dam, Honnemardu"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors"
              >
                Publish Destination
              </button>
            </form>
          </div>

          {/* Existing Places Quick Inventory */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-h-[600px] flex flex-col">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
              Existing Destinations ({states.reduce((acc, s) => acc + s.places.length, 0)})
            </h3>

            <div className="overflow-y-auto space-y-3 flex-1 pr-1">
              {states.map((st) => (
                <div key={st.id} className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {st.name}
                  </span>
                  {st.places.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
                    >
                      <div className="truncate mr-2">
                        <p className="font-semibold text-slate-800 truncate">{p.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{p.city}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${p.name}"?`)) {
                            deletePlace(st.id, p.id);
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                        title="Delete destination"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TravelProvider } from './context/TravelContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import StateDetail from './pages/StateDetail';
import PlaceDetail from './pages/PlaceDetail';
import Admin from './pages/Admin';

export default function App() {
  return (
    <TravelProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/state/:stateId" element={<StateDetail />} />
              <Route path="/state/:stateId/place/:placeId" element={<PlaceDetail />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </TravelProvider>
  );
}
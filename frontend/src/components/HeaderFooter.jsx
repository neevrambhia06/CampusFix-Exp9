import React, { useState } from 'react';
import { 
  Ticket, 
  MapPin, 
  Search, 
  PlusCircle, 
  UserCheck, 
  ChevronDown, 
  Sparkles,
  Menu,
  X,
  ShoppingBag
} from 'lucide-react';
import { MOCK_CITIES } from '../mockData';

export function Header({ 
  selectedCity, 
  setSelectedCity, 
  searchTerm, 
  setSearchTerm, 
  activeView, 
  setActiveView, 
  onOpenCreateEventModal,
  myBookingsCount 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F1EDE5]/95 backdrop-blur-md border-b border-[#E0D9CB] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* BRAND LOGO */}
          <div 
            onClick={() => setActiveView('explore')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#004643] flex items-center justify-center text-[#F1EDE5] shadow-md shadow-[#004643]/20 group-hover:scale-105 transition-transform">
              <Ticket className="w-5 h-5 text-[#F1EDE5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-[#002E2C]">
                  EventPulse
                </span>
                <span className="badge badge-amber text-[10px] font-bold py-0.5 px-2">LIVE</span>
              </div>
              <p className="text-[11px] text-[#597371] font-medium hidden sm:block">Tickets & Event Discovery</p>
            </div>
          </div>

          {/* SEARCH BAR & CITY SELECTOR */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl mx-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#597371]" />
              <input 
                type="text"
                placeholder="Search concerts, comedies, sports, venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs text-[#002E2C] placeholder-[#8A9E9C] focus:outline-none focus:ring-2 focus:ring-[#004643]/20 focus:border-[#004643]"
              />
            </div>

            {/* City Selector */}
            <div className="relative shrink-0">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-[#E0D9CB] text-xs font-bold text-[#002E2C] hover:border-[#004643] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#004643]" />
                <span>{selectedCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#597371]" />
              </button>

              {cityDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-2xl border border-[#E0D9CB] shadow-xl py-2 z-50 animate-fadeIn">
                  <p className="px-4 py-1 text-[10px] uppercase font-bold text-[#8A9E9C]">Popular Cities</p>
                  {MOCK_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-[#F1EDE5] transition-colors ${
                        selectedCity === city ? 'text-[#004643] bg-[#E6F2F1]' : 'text-[#2C4A48]'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* ACTION BUTTONS & NAV */}
          <div className="flex items-center gap-3 shrink-0">
            
            <button
              onClick={() => setActiveView('my-bookings')}
              className={`btn ${activeView === 'my-bookings' ? 'btn-primary' : 'btn-secondary'} text-xs sm:text-sm py-2 px-3.5 relative`}
            >
              <ShoppingBag className="w-4 h-4 text-[#004643]" />
              <span className="hidden sm:inline">My Tickets</span>
              {myBookingsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#D97706] text-white text-[10px] font-extrabold flex items-center justify-center -mr-1">
                  {myBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCreateEventModal}
              className="btn btn-primary text-xs sm:text-sm py-2 px-4 shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Event</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white text-[#002E2C] border border-[#E0D9CB]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Search & City bar */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E0D9CB] space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#597371]" />
              <input 
                type="text"
                placeholder="Search events, shows..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs"
              />
            </div>

            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#E0D9CB]">
              <span className="text-xs font-semibold text-[#597371]">Selected City:</span>
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="text-xs font-bold text-[#004643] bg-transparent focus:outline-none"
              >
                {MOCK_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}

export function Footer({ setActiveView }) {
  return (
    <footer className="bg-white border-t border-[#E0D9CB] mt-24 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#004643] flex items-center justify-center text-[#F1EDE5]">
                <Ticket className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-[#002E2C]">EventPass</span>
            </div>
            <p className="text-sm text-[#597371] leading-relaxed">
              India's premium ticketing & live event experience platform. Book concerts, stand-up comedy, sports matches, and theatrical performances.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#002E2C] text-sm tracking-wide uppercase mb-4">Discover Events</h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#597371]">
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#004643] transition-colors">Concerts & Festivals</button></li>
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#004643] transition-colors">Standup Comedy Shows</button></li>
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#004643] transition-colors">Sports Matches</button></li>
              <li><button onClick={() => setActiveView('explore')} className="hover:text-[#004643] transition-colors">Theatre & Plays</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#002E2C] text-sm tracking-wide uppercase mb-4">For Organizers</h4>
            <ul className="space-y-2.5 text-sm font-medium text-[#597371]">
              <li><a href="#host" className="hover:text-[#004643] transition-colors">List Your Live Show</a></li>
              <li><a href="#host" className="hover:text-[#004643] transition-colors">Box Office Management</a></li>
              <li><a href="#host" className="hover:text-[#004643] transition-colors">QR Scanning Console</a></li>
              <li><a href="#host" className="hover:text-[#004643] transition-colors">Payout & Analytics</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-[#002E2C] text-sm tracking-wide uppercase mb-4">Get Event Alerts</h4>
            <p className="text-xs text-[#597371]">Subscribe to receive early-bird ticket alerts in your city.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email address..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E0D9CB] focus:outline-none focus:ring-2 focus:ring-[#004643]/20 bg-[#FAF8F5]"
              />
              <button className="btn btn-primary text-xs px-4">Subscribe</button>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A9E9C] font-medium">
          <p>© 2026 EventPass Ticket Platform. Inspired by modern ticketing UX standards.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#002E2C] cursor-pointer">Terms of Booking</span>
            <span className="hover:text-[#002E2C] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#002E2C] cursor-pointer">Refund Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Tag, 
  Star, 
  Search, 
  Ticket, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { MOCK_CATEGORIES } from '../mockData';
import ExpandableEventCard from './ExpandableEventCard';

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80';

export function ExploreEvents({ 
  events, 
  selectedCity, 
  selectedCategory, 
  setSelectedCategory,
  onSelectEventForBooking 
}) {
  const filteredEvents = events.filter(evt => {
    const matchesCity = selectedCity === 'All' || evt.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesCategory = selectedCategory === 'all' || evt.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesCity && matchesCategory;
  });

  return (
    <div className="space-y-12">
      
      {/* HERO HERO BANNER - BOOKMYSHOW / DISTRICT STYLE */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#004643] via-[#003634] to-[#002826] p-8 sm:p-12 text-[#F1EDE5] shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-[#D97706]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-[#E6F2F1] border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Discover Unforgettable Live Experiences</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="!text-white">Book Tickets for </span><span className="text-amber-300 underline decoration-amber-300/40 underline-offset-8">Concerts, Comedy & Sports</span>.
          </h1>

          <p className="text-base sm:text-lg text-[#E6F2F1]/90 font-normal leading-relaxed">
            The easiest way to discover and reserve official tickets for trending concerts, stand-up shows, sports arenas, and food festivals near you in <strong className="text-white underline">{selectedCity}</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a 
              href="#event-grid"
              className="px-6 py-3.5 rounded-xl bg-[#F1EDE5] text-[#004643] font-bold text-sm shadow-lg hover:bg-white transition-all transform hover:-translate-y-0.5"
            >
              Explore Live Shows ↓
            </a>
          </div>
        </div>

        {/* HERO STATS */}
        <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-emerald-200 uppercase font-semibold tracking-wider">Live Events</p>
            <p className="text-2xl font-extrabold text-white mt-1">120+ Active</p>
          </div>
          <div>
            <p className="text-xs text-emerald-200 uppercase font-semibold tracking-wider">Tickets Booked Today</p>
            <p className="text-2xl font-extrabold text-amber-300 mt-1">4,850+</p>
          </div>
          <div>
            <p className="text-xs text-emerald-200 uppercase font-semibold tracking-wider">Verified Venues</p>
            <p className="text-2xl font-extrabold text-white mt-1">45+ Locations</p>
          </div>
          <div>
            <p className="text-xs text-emerald-200 uppercase font-semibold tracking-wider">Customer Satisfaction</p>
            <p className="text-2xl font-extrabold text-white mt-1">4.9 / 5.0 ⭐</p>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}
      <section className="bg-white p-5 rounded-2xl border border-[#E0D9CB] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#002E2C] uppercase tracking-wider">Explore by Category</h3>
          <span className="text-xs text-[#597371] font-semibold">City: <strong className="text-[#004643]">{selectedCity}</strong></span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {MOCK_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? 'bg-[#004643] text-[#F1EDE5] shadow-sm'
                  : 'bg-[#FAF8F5] text-[#2C4A48] border border-[#E0D9CB] hover:bg-[#E6F2F1]'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* EVENTS LISTING GRID */}
      <section id="event-grid" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#002E2C]">Trending Live Shows in {selectedCity}</h2>
            <p className="text-xs text-[#597371]">Showing {filteredEvents.length} verified events</p>
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#E0D9CB] text-center space-y-3">
            <Ticket className="w-10 h-10 text-[#8A9E9C] mx-auto" />
            <h3 className="font-bold text-[#002E2C]">No events currently listed for this category in {selectedCity}</h3>
            <p className="text-xs text-[#597371]">Try selecting "All Events" or switching cities in the top bar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => (
              <ExpandableEventCard
                key={evt.id}
                cardId={evt.id}
                imageSrc={evt.banner || DEFAULT_BANNER}
                title={evt.title}
                description={evt.description}
                primaryActionLabel="Book Tickets"
                onPrimaryAction={() => onSelectEventForBooking(evt)}
                content={(
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div className="rounded-2xl bg-white border border-[#E0D9CB] p-4 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A9E9C]">Venue</p>
                        <p className="font-semibold text-[#002E2C]">{evt.venue}</p>
                      </div>
                      <div className="rounded-2xl bg-white border border-[#E0D9CB] p-4 space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A9E9C]">Date & Time</p>
                        <p className="font-semibold text-[#002E2C]">{evt.date} • {evt.time}</p>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#E6F2F1] border border-[#CCE5E3] p-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#597371]">Tickets From</p>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-black text-[#004643]">₹{evt.price}</span>
                          {evt.originalPrice && (
                            <span className="text-sm text-[#8A9E9C] line-through">₹{evt.originalPrice}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge badge-amber font-bold shadow-xs">{evt.badge}</span>
                      <span className="badge badge-blue bg-white/95 text-[#002E2C] font-semibold border-[#E0D9CB]">{evt.category}</span>
                    </div>
                  </div>
                )}
              />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

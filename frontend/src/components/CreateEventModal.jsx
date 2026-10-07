import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Tag, 
  CheckCircle2 
} from 'lucide-react';
import { MOCK_CITIES, MOCK_CATEGORIES } from '../mockData';

export function CreateEventModal({ isOpen, onClose, onCreateEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Concerts & Music',
    city: 'Mumbai',
    venue: '',
    date: '',
    time: '7:00 PM',
    price: 999,
    banner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    badge: 'New Event',
    organizer: '',
    description: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvt = {
      id: `evt-${Date.now()}`,
      title: formData.title || "Custom Live Concert 2026",
      category: formData.category,
      city: formData.city,
      venue: formData.venue || "Grand Arena Venue",
      date: formData.date || "2026-09-15",
      time: formData.time,
      price: Number(formData.price) || 999,
      originalPrice: Number(formData.price) + 500,
      banner: formData.banner,
      badge: formData.badge,
      rating: 4.9,
      reviewsCount: 1,
      language: "English / Hindi",
      duration: "3 Hours",
      organizer: formData.organizer || "Live Nation",
      description: formData.description || "Exciting live event performance with grand stage setups.",
      ticketTypes: [
        { id: "gen", name: "General Admission", price: Number(formData.price), description: "Standard venue entrance pass.", available: 100 },
        { id: "vip", name: "VIP Front Row Pass", price: Number(formData.price) * 2.5, description: "Reserved VIP seating near stage.", available: 20 }
      ]
    };

    onCreateEvent(newEvt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-3xl border border-[#E0D9CB] shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="p-6 bg-white border-b border-[#E0D9CB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#004643] text-[#F1EDE5] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#002E2C]">List & Host New Live Event</h2>
              <p className="text-xs text-[#597371] font-medium">Box office setup & ticket pricing console</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E0D9CB]/50 text-[#002E2C] hover:bg-[#E0D9CB] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
          
          <div>
            <label className="block font-bold uppercase text-[#002E2C] mb-1">Event Title *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Arijit Singh Live in Concert 2026"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase text-[#002E2C] mb-1">Event Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs font-semibold"
              >
                <option value="Concerts & Music">Concerts & Music</option>
                <option value="Standup Comedy">Standup Comedy</option>
                <option value="Workshops & Tech">Workshops & Tech</option>
                <option value="Sports & Fitness">Sports & Fitness</option>
                <option value="Theatre & Arts">Theatre & Arts</option>
                <option value="Food & Festivals">Food & Festivals</option>
              </select>
            </div>

            <div>
              <label className="block font-bold uppercase text-[#002E2C] mb-1">City Location</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs font-semibold"
              >
                {MOCK_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#002E2C] mb-1">Venue Address *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. DY Patil Stadium, Nerul, Navi Mumbai"
              value={formData.venue}
              onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold uppercase text-[#002E2C] mb-1">Event Date</label>
              <input 
                type="date" 
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E0D9CB] bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-[#002E2C] mb-1">Show Time</label>
              <input 
                type="text" 
                placeholder="7:00 PM"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E0D9CB] bg-white text-xs"
              />
            </div>
            <div>
              <label className="block font-bold uppercase text-[#002E2C] mb-1">Starting Price (₹)</label>
              <input 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E0D9CB] bg-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase text-[#002E2C] mb-1">Organizer Entity</label>
            <input 
              type="text" 
              placeholder="e.g. BookMyShow / District Live Productions"
              value={formData.organizer}
              onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-[#002E2C] mb-1">Event Overview Description</label>
            <textarea 
              rows="3"
              placeholder="Detailed description of artists, schedule, gate rules..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-xl border border-[#E0D9CB] bg-white text-xs"
            />
          </div>

          <div className="pt-4 border-t border-[#E0D9CB] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary py-2 px-6"
            >
              Publish Event Tickets Live 🎫
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

import React from 'react';
import { 
  Ticket, 
  MapPin, 
  Calendar, 
  Clock, 
  QrCode, 
  Download, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

export function MyBookings({ bookings, onBackToExplore }) {
  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="bg-white p-8 rounded-3xl border border-[#E0D9CB] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F2F1] text-[#004643] text-xs font-semibold">
            <Ticket className="w-4 h-4 text-[#004643]" />
            <span>Digital Ticket Wallet</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002E2C]">My Booked Events & Passes</h1>
          <p className="text-sm text-[#597371] max-w-2xl">
            Access your entry passes, QR codes, venue locations, and show schedules anytime.
          </p>
        </div>

        <button 
          onClick={onBackToExplore}
          className="btn btn-secondary text-xs shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          Book More Events
        </button>
      </div>

      {/* TICKETS LIST */}
      {bookings.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl border border-[#E0D9CB] text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#8A9E9C] flex items-center justify-center mx-auto border border-[#E0D9CB]">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-[#002E2C] text-lg">No Tickets Booked Yet</h3>
          <p className="text-xs text-[#597371] max-w-md mx-auto">
            You haven't booked any upcoming concerts, comedy shows, or event passes yet.
          </p>
          <button 
            onClick={onBackToExplore}
            className="btn btn-primary py-2.5 px-6 text-xs"
          >
            Browse Trending Shows
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookings.map((b) => (
            <div 
              key={b.id}
              className="bg-white rounded-3xl border border-[#E0D9CB] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                
                <div className="flex items-center justify-between">
                  <span className="badge badge-emerald font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {b.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#8A9E9C]">ID: {b.id}</span>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-[#002E2C]">{b.eventName}</h3>
                  <p className="text-xs font-bold text-[#004643] mt-1">{b.quantity} x {b.ticketType}</p>
                </div>

                <div className="space-y-2 text-xs text-[#597371] bg-[#FAF8F5] p-4 rounded-2xl border border-[#E0D9CB]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#004643] shrink-0" />
                    <span>{b.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#004643] shrink-0" />
                    <span>{b.date} at {b.time}</span>
                  </div>
                </div>

                {/* QR CODE SECTION */}
                <div className="pt-2 flex items-center gap-4 bg-[#E6F2F1]/50 p-4 rounded-2xl border border-[#99CBC7]/50">
                  <img src={b.qrCode} alt="Ticket QR Code" className="w-20 h-20 rounded-xl border border-white bg-white p-1" />
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-[#002E2C]">Gate Entry QR Pass</p>
                    <p className="text-[11px] text-[#597371]">Show this code at the arena entrance scanner for express check-in.</p>
                  </div>
                </div>

              </div>

              {/* TICKET FOOTER */}
              <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#E0D9CB] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#8A9E9C] uppercase font-bold text-[10px] block">Total Paid</span>
                  <span className="font-black text-[#004643] text-base">₹{b.totalAmount}</span>
                </div>

                <button 
                  onClick={() => alert(`Downloading PDF Ticket Pass for ${b.id}...`)}
                  className="btn btn-secondary text-xs py-2 px-3.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#004643]" />
                  Download PDF
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

import React, { useState } from 'react';
import { 
  X, 
  Ticket, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Minus, 
  CheckCircle2, 
  CreditCard,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

const DEFAULT_BANNER = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80';

export function BookingModal({ event, isOpen, onClose, onConfirmBooking }) {
  const [selectedTicketId, setSelectedTicketId] = useState(event?.ticketTypes?.[0]?.id || '');
  const [quantity, setQuantity] = useState(1);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [step, setStep] = useState(1); // 1: Select tickets, 2: Checkout details, 3: Confirmation success

  if (!isOpen || !event) return null;

  const currentTicket = event.ticketTypes?.find(t => t.id === selectedTicketId) || event.ticketTypes?.[0];
  const ticketPrice = currentTicket ? currentTicket.price : event.price;
  const subtotal = ticketPrice * quantity;
  const bookingFee = Math.round(subtotal * 0.05); // 5% fee
  const grandTotal = subtotal + bookingFee;

  const handleNextStep = () => {
    if (step === 1) setStep(2);
  };

  const handleConfirmPay = (e) => {
    e.preventDefault();
    const newBooking = {
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      eventName: event.title,
      ticketType: currentTicket ? currentTicket.name : 'General Entry',
      quantity,
      totalAmount: grandTotal,
      date: event.date,
      time: event.time,
      venue: event.venue,
      status: 'Confirmed',
      qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event.id}-${Date.now()}`,
      bookedOn: new Date().toISOString().split('T')[0]
    };

    onConfirmBooking(newBooking);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF8F5] rounded-3xl border border-[#E0D9CB] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* MODAL HEADER */}
        <div className="p-6 bg-white border-b border-[#E0D9CB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#004643] text-[#F1EDE5] flex items-center justify-center font-bold">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#002E2C]">Book Event Tickets</h2>
              <p className="text-xs text-[#597371] font-medium">{event.title}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#E0D9CB]/50 text-[#002E2C] hover:bg-[#E0D9CB] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: SELECT TICKET TYPE & QUANTITY */}
        {step === 1 && (
          <div className="p-8 space-y-6 overflow-y-auto flex-1 text-xs">
            
            {/* Event Summary Banner */}
            <div className="bg-white p-4 rounded-2xl border border-[#E0D9CB] flex items-center gap-4">
              <img src={event.banner || DEFAULT_BANNER} alt={event.title} className="w-20 h-20 rounded-xl object-cover" />
              <div className="space-y-1">
                <span className="badge badge-blue">{event.category}</span>
                <h4 className="font-bold text-[#002E2C] text-sm">{event.title}</h4>
                <p className="text-[#597371] font-medium">{event.venue} • {event.date}</p>
              </div>
            </div>

            {/* Ticket Categories Selection */}
            <div className="space-y-3">
              <label className="block font-bold uppercase tracking-wider text-[#002E2C]">Select Ticket Tier:</label>
              {event.ticketTypes?.map((t) => (
                <div 
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    selectedTicketId === t.id
                      ? 'bg-[#E6F2F1] border-[#004643] ring-1 ring-[#004643]'
                      : 'bg-white border-[#E0D9CB] hover:border-[#004643]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#002E2C]">{t.name}</span>
                      <span className="text-[10px] text-[#D97706] bg-[#FEF3C7] px-2 py-0.5 rounded-full font-bold">
                        {t.available} tickets left
                      </span>
                    </div>
                    <p className="text-[#597371]">{t.description}</p>
                  </div>
                  <span className="text-base font-extrabold text-[#004643]">₹{t.price}</span>
                </div>
              ))}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#E0D9CB]">
              <div>
                <span className="font-bold text-[#002E2C] block">Number of Tickets</span>
                <span className="text-[#597371]">Max 6 tickets per booking</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-[#F1EDE5] text-[#004643] font-bold flex items-center justify-center border border-[#E0D9CB]"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-black text-base text-[#002E2C] px-2">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(6, quantity + 1))}
                  className="w-8 h-8 rounded-xl bg-[#F1EDE5] text-[#004643] font-bold flex items-center justify-center border border-[#E0D9CB]"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subtotal Footer */}
            <div className="pt-4 border-t border-[#E0D9CB] flex items-center justify-between">
              <div>
                <span className="text-[#8A9E9C] uppercase font-bold block">Total Amount</span>
                <span className="text-2xl font-black text-[#004643]">₹{grandTotal}</span>
                <span className="text-[10px] text-[#597371] block">Includes ₹{bookingFee} platform fee</span>
              </div>

              <button
                onClick={handleNextStep}
                className="btn btn-primary py-3 px-6 text-sm"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}

        {/* STEP 2: CHECKOUT & CONTACT DETAILS */}
        {step === 2 && (
          <form onSubmit={handleConfirmPay} className="p-8 space-y-5 overflow-y-auto flex-1 text-xs">
            <h3 className="font-bold text-sm text-[#002E2C] uppercase tracking-wider">Attendee & Contact Information</h3>

            <div>
              <label className="block font-bold text-[#002E2C] mb-1">Full Name *</label>
              <input 
                type="text" 
                required
                placeholder="Enter attendee full name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#002E2C] mb-1">Email Address (For Ticket E-Mail) *</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#002E2C] mb-1">Phone Number (For SMS Ticket) *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 9876543210"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E0D9CB] bg-white text-xs"
                />
              </div>
            </div>

            {/* Payment Summary Box */}
            <div className="bg-white p-4 rounded-2xl border border-[#E0D9CB] space-y-2">
              <div className="flex justify-between font-semibold text-[#597371]">
                <span>{currentTicket?.name || 'Ticket'} x {quantity}</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between font-semibold text-[#597371]">
                <span>Booking & Convenience Fee</span>
                <span>₹{bookingFee}</span>
              </div>
              <div className="pt-2 border-t border-[#E0D9CB] flex justify-between font-extrabold text-sm text-[#002E2C]">
                <span>Grand Total Payable</span>
                <span className="text-[#004643] font-black">₹{grandTotal}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E0D9CB] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn btn-secondary py-2.5 px-4"
              >
                Back to Selection
              </button>

              <button
                type="submit"
                className="btn btn-amber py-3 px-6 text-sm font-bold shadow-lg"
              >
                Pay & Confirm Ticket ₹{grandTotal}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: BOOKING CONFIRMED SUCCESS */}
        {step === 3 && (
          <div className="p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#D1FAE5] text-[#047857] flex items-center justify-center mx-auto border border-[#A7F3D0]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-[#002E2C]">Booking Confirmed! 🎉</h3>
              <p className="text-xs text-[#597371]">Your tickets have been issued and sent to your email.</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#E0D9CB] text-left space-y-4 max-w-md mx-auto">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-[#004643]">Booking ID: BK-{Math.floor(10000 + Math.random() * 90000)}</span>
                <span className="badge badge-emerald">CONFIRMED</span>
              </div>
              <div className="text-xs space-y-1">
                <p className="font-bold text-[#002E2C] text-sm">{event.title}</p>
                <p className="text-[#597371]">{event.venue}</p>
                <p className="text-[#597371]">{event.date} at {event.time}</p>
                <p className="font-bold text-[#004643] pt-2">{quantity} x {currentTicket?.name || 'General Access'}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="btn btn-primary py-3 px-8 text-sm"
            >
              Done & View My Tickets
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

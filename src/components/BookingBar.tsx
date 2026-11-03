import React, { useState } from 'react';
import { Calendar, Users, Home, ChevronRight, AlertCircle } from 'lucide-react';
import { MotionFadeIn } from './MotionFadeIn';

interface BookingBarProps {
  onCheckAvailability: (bookingParams: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
  }) => void;
}

export const BookingBar: React.FC<BookingBarProps> = ({ onCheckAvailability }) => {
  // Helper to get formatted ISO date string for input default
  const today = new Date();
  const defaultCheckInDate = new Date(today.setDate(today.getDate() + 14));
  const defaultCheckOutDate = new Date(today.setDate(today.getDate() + 3));

  const formatDateForInput = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDateForInput(defaultCheckInDate));
  const [checkOut, setCheckOut] = useState<string>(formatDateForInput(defaultCheckOutDate));
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [showGuestPicker, setShowGuestPicker] = useState<boolean>(false);
  const [dateError, setDateError] = useState<string | null>(null);

  const handleCheckInChange = (newDate: string) => {
    setCheckIn(newDate);
    if (newDate >= checkOut) {
      // Auto-adjust check-out to check-in + 1 day
      const nextDay = new Date(newDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(formatDateForInput(nextDay));
      setDateError(null);
    } else {
      setDateError(null);
    }
  };

  const handleCheckOutChange = (newDate: string) => {
    if (newDate <= checkIn) {
      setDateError("Check-out date must be after check-in date.");
      setCheckOut(newDate);
    } else {
      setDateError(null);
      setCheckOut(newDate);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkOut <= checkIn) {
      setDateError("Please select a check-out date after your check-in date.");
      return;
    }
    setDateError(null);
    onCheckAvailability({
      checkIn,
      checkOut,
      adults,
      children,
      rooms
    });
  };

  return (
    <section id="booking" className="px-4 md:px-8 -mt-5 md:-mt-8 relative z-20 max-w-6xl mx-auto w-full">
      <MotionFadeIn yOffset={16} duration={0.5}>
        <div className="palace-card rounded-2xl p-4 md:p-6 text-[#1D2320]">
        
        {/* Subtle section label */}
        <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/20 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="font-cinzel text-xs md:text-sm font-semibold tracking-wider text-[#0E241B] uppercase">
              Check Palace Availability &amp; Reserve
            </span>
          </div>
          <span className="text-[10px] md:text-xs text-[#C5A059] font-medium tracking-wide">
            Best Heritage Rate Guarantee · Direct Booking Concierge
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-3 md:items-stretch">
          
          {/* Check In */}
          <div className="relative bg-[#F3EFE6] rounded-xl p-2.5 md:p-3 border border-[#C5A059]/25 focus-within:border-[#C5A059] transition-colors flex flex-col justify-between">
            <label className="block text-[10px] uppercase tracking-wider text-[#0E241B]/70 font-semibold mb-1 flex items-center gap-1">
              <Calendar size={12} className="text-[#C5A059]" />
              <span>Check-In</span>
            </label>
            <input
              type="date"
              value={checkIn}
              min={formatDateForInput(new Date())}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full bg-transparent text-xs md:text-sm font-semibold text-[#0E241B] focus:outline-none cursor-pointer"
              required
            />
          </div>

          {/* Check Out */}
          <div className="relative bg-[#F3EFE6] rounded-xl p-2.5 md:p-3 border border-[#C5A059]/25 focus-within:border-[#C5A059] transition-colors flex flex-col justify-between">
            <label className="block text-[10px] uppercase tracking-wider text-[#0E241B]/70 font-semibold mb-1 flex items-center gap-1">
              <Calendar size={12} className="text-[#C5A059]" />
              <span>Check-Out</span>
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn || formatDateForInput(new Date())}
              onChange={(e) => handleCheckOutChange(e.target.value)}
              className="w-full bg-transparent text-xs md:text-sm font-semibold text-[#0E241B] focus:outline-none cursor-pointer"
              required
            />
          </div>

          {/* Guests & Rooms Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowGuestPicker(!showGuestPicker)}
              className="w-full h-full bg-[#F3EFE6] rounded-xl p-2.5 md:p-3 border border-[#C5A059]/25 flex items-center justify-between text-left hover:border-[#C5A059] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Users size={14} className="text-[#C5A059] shrink-0" />
                <div className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-wider text-[#0E241B]/70 font-semibold truncate">
                    Guests &amp; Rooms
                  </span>
                  <span className="block text-xs md:text-sm font-semibold text-[#0E241B] truncate">
                    {adults + children} Guests · {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-[#C5A059] font-medium underline shrink-0 ml-1">
                {showGuestPicker ? 'Done' : 'Change'}
              </span>
            </button>

            {/* Guest Picker Popover */}
            {showGuestPicker && (
              <div className="absolute top-full left-0 right-0 md:w-72 mt-1.5 bg-[#FBFAF6] border border-[#B99560]/30 rounded-xl p-3 shadow-xl z-30 space-y-2.5">
                {/* Adults */}
                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="text-xs font-semibold text-[#17352B]">Adults</span>
                    <span className="block text-[10px] text-gray-500">Ages 12+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-7 h-7 rounded-full bg-[#F3F0E8] border border-[#B99560]/30 text-xs font-bold text-[#17352B] flex items-center justify-center hover:bg-[#B99560]/20"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(Math.min(8, adults + 1))}
                      className="w-7 h-7 rounded-full bg-[#F3F0E8] border border-[#B99560]/30 text-xs font-bold text-[#17352B] flex items-center justify-center hover:bg-[#B99560]/20"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between py-1 border-t border-gray-100">
                  <div>
                    <span className="text-xs font-semibold text-[#17352B]">Children</span>
                    <span className="block text-[10px] text-gray-500">Ages 0-11</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-7 h-7 rounded-full bg-[#F3F0E8] border border-[#B99560]/30 text-xs font-bold text-[#17352B] flex items-center justify-center hover:bg-[#B99560]/20"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(Math.min(6, children + 1))}
                      className="w-7 h-7 rounded-full bg-[#F3F0E8] border border-[#B99560]/30 text-xs font-bold text-[#17352B] flex items-center justify-center hover:bg-[#B99560]/20"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between py-1 border-t border-gray-100">
                  <div>
                    <span className="text-xs font-semibold text-[#17352B]">Rooms</span>
                    <span className="block text-[10px] text-gray-500">Palace Suites</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-7 h-7 rounded-full bg-[#F3F0E8] border border-[#B99560]/30 text-xs font-bold text-[#17352B] flex items-center justify-center hover:bg-[#B99560]/20"
                    >
                      -
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{rooms}</span>
                    <button
                      type="button"
                      onClick={() => setRooms(Math.min(5, rooms + 1))}
                      className="w-7 h-7 rounded-full bg-[#F3F0E8] border border-[#B99560]/30 text-xs font-bold text-[#17352B] flex items-center justify-center hover:bg-[#B99560]/20"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGuestPicker(false)}
                  className="w-full mt-2 py-1.5 text-center bg-[#17352B] text-[#FBFAF6] rounded-lg text-xs font-semibold hover:bg-[#1f473a]"
                >
                  Apply Selection
                </button>
              </div>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="btn-royal-emerald w-full h-12 md:h-auto min-h-[48px] rounded-xl font-cinzel text-xs md:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2"
          >
            <span>Check Availability</span>
            <ChevronRight size={15} className="text-[#D4AF37]" />
          </button>
        </form>

        {/* Date error alert if invalid */}
        {dateError && (
          <div className="mt-2.5 flex items-center gap-1.5 p-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-[11px]">
            <AlertCircle size={14} className="shrink-0 text-amber-700" />
            <span>{dateError}</span>
          </div>
        )}

        {/* Accuracy transparency footnote */}
        <p className="mt-2.5 text-[10px] text-center text-[#20251F]/60">
          Direct reservation inquiry · Live rate quotation provided within 2 hours
        </p>
      </div>
      </MotionFadeIn>
    </section>
  );
};

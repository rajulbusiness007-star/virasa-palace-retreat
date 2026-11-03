/**
 * VIRĀSĀ PALACE & RETREAT
 * Premium Mobile-First Luxury Hotel & Destination Wedding Website
 * Inspired by the timeless heritage, elegance, and hospitality of Taj Hotels
 */

import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { Header } from './components/Header';
import { NavDrawer } from './components/NavDrawer';
import { Hero } from './components/Hero';
import { BookingBar } from './components/BookingBar';
import { LuxuryBentoGrid } from './components/LuxuryBentoGrid';
import { RoomShowcase } from './components/RoomShowcase';
import { InteractiveEstateMap } from './components/InteractiveEstateMap';
import { WeddingExperience } from './components/WeddingExperience';
import { WeddingTimelineScroll } from './components/WeddingTimelineScroll';
import { ConciergeEstimator } from './components/ConciergeEstimator';
import { AnnualRoyalCalendar } from './components/AnnualRoyalCalendar';
import { ExperiencesShowcase } from './components/ExperiencesShowcase';
import { InteractiveGuestBook } from './components/InteractiveGuestBook';
import { AboutPhilosophy } from './components/AboutPhilosophy';
import { GalleryLightbox } from './components/GalleryLightbox';
import { TestimonialsFaq } from './components/TestimonialsFaq';
import { NewsletterSignup } from './components/NewsletterSignup';
import { ContactSection } from './components/ContactSection';
import { StickyBottomBar } from './components/StickyBottomBar';
import { DigitalConciergeModal } from './components/DigitalConciergeModal';
import { BookingModal } from './components/BookingModal';
import { WeddingEnquiryModal } from './components/WeddingEnquiryModal';
import { IntegrationGuideModal } from './components/IntegrationGuideModal';
import { TransitionProvider } from './context/TransitionContext';
import { RoyalTransitionCurtain } from './components/RoyalTransitionCurtain';
import { HOTEL_CONFIG } from './data/hotelData';

export default function App() {
  // Modal states
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isWeddingModalOpen, setIsWeddingModalOpen] = useState(false);
  const [isConfigGuideOpen, setIsConfigGuideOpen] = useState(false);

  // Customized wedding enquiry plan passed from Estate Map or Concierge Estimator
  const [weddingEnquiryPlan, setWeddingEnquiryPlan] = useState<{
    venueName?: string;
    summaryNote?: string;
    days?: number;
    guests?: number;
  } | null>(null);

  // Booking search parameters passed between BookingBar and BookingModal
  const [bookingParams, setBookingParams] = useState<{
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    preferredSuiteId?: string;
  }>({});

  // Active Lightbox image passed from RoomShowcase, WeddingExperience, or Experiences
  const [lightboxPreview, setLightboxPreview] = useState<{
    url: string;
    title: string;
  } | null>(null);

  // Handler when user submits dates on BookingBar
  const handleCheckAvailability = (params: {
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
  }) => {
    setBookingParams(params);
    setIsBookingModalOpen(true);
  };

  // Handler when user clicks "Reserve Suite" on a specific room
  const handleBookRoom = (roomId: string) => {
    setBookingParams((prev) => ({
      ...prev,
      preferredSuiteId: roomId
    }));
    setIsBookingModalOpen(true);
  };

  // Handler when user wants to reserve a dining/spa experience
  const handleReserveExperience = (expTitle: string) => {
    setBookingParams((prev) => ({
      ...prev,
    }));
    setIsBookingModalOpen(true);
  };

  // Handler for quick photo enlargement
  const handleViewImage = (url: string, title: string) => {
    setLightboxPreview({ url, title });
  };

  // Smooth scroll helper for "Explore The Palace"
  const handleExplorePalace = () => {
    const bentoEl = document.getElementById('bento');
    if (bentoEl) {
      bentoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContactQuick = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handler when user clicks "Inquire for this Zone" in InteractiveEstateMap
  const handleSelectZoneForEnquiry = (zoneName: string) => {
    setWeddingEnquiryPlan({
      venueName: zoneName,
      summaryNote: `Interested in venue allocation: ${zoneName} for an upcoming celebration.`
    });
    setIsWeddingModalOpen(true);
  };

  // Handler when user clicks "Send Blueprint to Royal Concierge" in ConciergeEstimator
  const handlePlanReadyForEnquiry = (details: {
    eventVision: string;
    guests: number;
    days: number;
    privileges: string[];
    summaryNote: string;
  }) => {
    setWeddingEnquiryPlan({
      summaryNote: details.summaryNote,
      days: details.days,
      guests: details.guests
    });
    setIsWeddingModalOpen(true);
  };

  // Handler when user selects a specific festival or wedding date from AnnualRoyalCalendar
  const handleOpenWeddingEnquiryWithDate = (dateTitle: string, monthDetail: string) => {
    setWeddingEnquiryPlan({
      summaryNote: `Inquiring for Auspicious Date: ${dateTitle} (${monthDetail}). Please review royal estate availability for our celebration.`
    });
    setIsWeddingModalOpen(true);
  };

  const handleOpenBookingWithDate = (dateTitle: string, monthDetail: string) => {
    setBookingParams((prev) => ({
      ...prev,
    }));
    setIsBookingModalOpen(true);
  };

  return (

    <TransitionProvider>
      <MobileFrame>
        {/* Mobile & Laptop Top App Bar */}
        <Header
          onOpenMenu={() => setIsNavDrawerOpen(true)}
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onOpenWeddingEnquiry={() => {
            setWeddingEnquiryPlan(null);
            setIsWeddingModalOpen(true);
          }}
          onOpenContactQuick={handleOpenContactQuick}
        />

        {/* Navigation Slide-Over Menu */}
        <NavDrawer
          isOpen={isNavDrawerOpen}
          onClose={() => setIsNavDrawerOpen(false)}
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onOpenWeddingEnquiry={() => {
            setWeddingEnquiryPlan(null);
            setIsWeddingModalOpen(true);
          }}
          onOpenConfigGuide={() => setIsConfigGuideOpen(true)}
        />

        {/* Main Mobile Page Flow */}
        <main className="w-full flex flex-col">
          {/* Section 1: Hero Section (Cinematic Drone Video Loop, Palace Soundscape & Curtain Reveal) */}
          <Hero
            onOpenWeddingEnquiry={() => {
              setWeddingEnquiryPlan(null);
              setIsWeddingModalOpen(true);
            }}
            onExplorePalace={handleExplorePalace}
          />

          {/* Section 2: Hotel Booking Component */}
          <BookingBar onCheckAvailability={handleCheckAvailability} />

          {/* Section 3: Luxury Asymmetric Bento Grid (Crown Jewels & Sovereign Privileges) */}
          <LuxuryBentoGrid
            onReserveExperience={handleReserveExperience}
            onOpenWeddingEnquiry={() => {
              setWeddingEnquiryPlan(null);
              setIsWeddingModalOpen(true);
            }}
          />

          {/* Section 4: Hotel Rooms & Accommodations (with subtle depth parallax) */}
          <RoomShowcase
            onBookRoom={handleBookRoom}
            onViewImage={handleViewImage}
          />

          {/* Section 5: Magical "Scrollytelling" Estate Floorplan & Grounds Map */}
          <InteractiveEstateMap
            onSelectZoneForEnquiry={handleSelectZoneForEnquiry}
          />

          {/* Section 6: Destination Wedding Experience (with 6 Ceremonies & Venues) */}
          <WeddingExperience
            onOpenWeddingEnquiry={() => {
              setWeddingEnquiryPlan(null);
              setIsWeddingModalOpen(true);
            }}
            onViewImage={handleViewImage}
          />

          {/* Section 7: Horizontal Scrollytelling Wedding Timeline */}
          <WeddingTimelineScroll
            onOpenWeddingEnquiry={() => {
              setWeddingEnquiryPlan(null);
              setIsWeddingModalOpen(true);
            }}
          />

          {/* Section 8: Concierge Experience & Itinerary Architect Tool */}
          <ConciergeEstimator
            onPlanReadyForEnquiry={handlePlanReadyForEnquiry}
          />

          {/* Section 9: Annual Royal Calendar (Horizontal Scroll of Seasonal Festivals, Cultural Galas & Peak Wedding Dates) */}
          <AnnualRoyalCalendar
            onOpenWeddingEnquiryWithDate={handleOpenWeddingEnquiryWithDate}
            onOpenBookingWithDate={handleOpenBookingWithDate}
            onViewImage={handleViewImage}
          />

          {/* Section 10: Curated Luxury Experiences */}
          <ExperiencesShowcase
            onReserveExperience={handleReserveExperience}
            onViewImage={handleViewImage}
          />


          {/* Section 10: The Interactive Royal Guest Book & Blessing Wall */}
          <InteractiveGuestBook />

          {/* Section 11: Living Royal Heritage & Hospitality Philosophy */}
          <AboutPhilosophy />

          {/* Section 12: Visual Gallery & Lightbox */}
          <GalleryLightbox
            initialActiveImage={lightboxPreview}
            onClearInitial={() => setLightboxPreview(null)}
          />

          {/* Section 13: Testimonials & FAQs */}
          <TestimonialsFaq />

          {/* Section 14: The Virāsā Chronicle Newsletter */}
          <NewsletterSignup />

          {/* Section 15: Location, Concierge & Contact */}
          <ContactSection
            onOpenWeddingEnquiry={() => {
              setWeddingEnquiryPlan(null);
              setIsWeddingModalOpen(true);
            }}
            onOpenConfigGuide={() => setIsConfigGuideOpen(true)}
          />
        </main>

        {/* Sticky Bottom Booking & Wedding Bar */}
        <StickyBottomBar
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onOpenWeddingEnquiry={() => {
            setWeddingEnquiryPlan(null);
            setIsWeddingModalOpen(true);
          }}
        />

        {/* Digital Concierge: 24/7 Royal Desk Chat Modal & FAB */}
        <DigitalConciergeModal
          onOpenBooking={() => setIsBookingModalOpen(true)}
          onOpenWeddingEnquiry={() => {
            setWeddingEnquiryPlan(null);
            setIsWeddingModalOpen(true);
          }}
        />

        {/* Hotel Booking System Modal */}
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          initialParams={bookingParams}
        />

        {/* Destination Wedding Enquiry Modal */}
        <WeddingEnquiryModal
          isOpen={isWeddingModalOpen}
          onClose={() => setIsWeddingModalOpen(false)}
          initialPlan={weddingEnquiryPlan}
        />

        {/* Property & Live Engine Integration Guide */}
        <IntegrationGuideModal
          isOpen={isConfigGuideOpen}
          onClose={() => setIsConfigGuideOpen(false)}
        />

        {/* Global Cinematic Royal Transition Curtain Overlay */}
        <RoyalTransitionCurtain />
      </MobileFrame>
    </TransitionProvider>
  );
}

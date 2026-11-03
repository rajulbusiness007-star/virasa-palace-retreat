import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Sparkles, Compass, Volume2, VolumeX, Film, Image as ImageIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RoyalCrest, RoyalDivider } from './RoyalMotif';
import { royalSoundscape } from '../utils/royalAudio';
import { RoyalAmbientParticles } from './RoyalAmbientParticles';

interface HeroProps {
  onOpenWeddingEnquiry: () => void;
  onExplorePalace: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenWeddingEnquiry,
  onExplorePalace
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mediaType, setMediaType] = useState<'video' | 'photo'>('video');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // High-fidelity luxury palace imagery
  const heroImage = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85";
  // Cinematic ambient luxury palace & water pavilion video loop
  const heroVideo = "https://assets.mixkit.co/videos/preview/mixkit-luxury-palace-hotel-with-illuminated-pool-at-night-42296-large.mp4";

  // Parallax and Curtain Reveal scroll tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const heroContentOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.55, 0.05]);
  
  // Curtain Reveal split effect: left and right velvet drape curtains sliding apart
  const curtainLeftX = useTransform(scrollYProgress, [0.35, 1], ["0%", "-105%"]);
  const curtainRightX = useTransform(scrollYProgress, [0.35, 1], ["0%", "105%"]);

  const toggleSound = () => {
    royalSoundscape.toggle();
  };

  useEffect(() => {
    const unsubscribe = royalSoundscape.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative w-full min-h-screen flex flex-col justify-end bg-[#091913] text-[#FBFAF6] -mt-16 md:-mt-20 overflow-hidden"
    >
      
      {/* Background Media with Subtle Parallax Motion */}
      <motion.div 
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute -top-[10%] inset-x-0 h-[120%] w-full z-0 will-change-transform"
      >
        {mediaType === 'video' ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={heroImage}
            onError={() => setMediaType('photo')}
            className="w-full h-full object-cover object-center"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : (
          !imgError ? (
            <img
              src={heroImage}
              alt="VIRĀSĀ Palace & Retreat illuminated facade at twilight"
              referrerPolicy="no-referrer"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover object-center transition-all duration-1000 ${
                imgLoaded ? 'opacity-90' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-b from-[#091913] via-[#0E241B] to-[#091913] flex items-center justify-center">
              <div className="opacity-15">
                <RoyalCrest size={180} />
              </div>
            </div>
          )
        )}

        {/* Sophisticated Luxury Scrim ensuring WCAG AA legibility with deep royal velvet emerald tones */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#091913] via-[#0E241B]/70 to-black/45" />
        
        {/* Subtle royal amber glow overlay & living floating ember particles */}
        <div className="absolute inset-0 bg-radial from-[#C5A059]/15 via-transparent to-transparent pointer-events-none" />
        <RoyalAmbientParticles particleCount={36} className="opacity-75" />
      </motion.div>

      {/* Floating Media & Soundscape Controls (Top Right of Hero) */}
      <aside 
        aria-label="Cinematic Media Controls"
        className="absolute top-20 right-4 md:right-8 z-30 flex items-center gap-2"
      >
        {/* Drone Video vs Sunset Still Toggle */}
        <button
          onClick={() => setMediaType(prev => prev === 'video' ? 'photo' : 'video')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0E241B]/80 hover:bg-[#1A3E31] border border-[#C5A059]/40 text-[#DFCEB2] text-[11px] font-medium backdrop-blur-md shadow-lg transition-all active:scale-95"
          aria-label="Toggle between drone footage and twilight photography"
        >
          {mediaType === 'video' ? (
            <>
              <Film size={13} className="text-[#D4AF37] animate-pulse" />
              <span className="hidden xs:inline">Drone Loop</span>
            </>
          ) : (
            <>
              <ImageIcon size={13} className="text-[#D4AF37]" />
              <span className="hidden xs:inline">Still Frame</span>
            </>
          )}
        </button>

        {/* Ambient Royal Palace Soundscape (Web Audio API Tanpura & Wind Chimes) */}
        <button
          onClick={toggleSound}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-medium backdrop-blur-md shadow-lg transition-all active:scale-95 ${
            isPlayingAudio 
              ? 'bg-[#C5A059] text-[#0E241B] border-[#F4E8D1] font-bold'
              : 'bg-[#0E241B]/80 hover:bg-[#1A3E31] border-[#C5A059]/40 text-[#DFCEB2]'
          }`}
          aria-label={isPlayingAudio ? 'Mute ambient palace melody' : 'Play ambient royal sitar soundscape'}
        >
          {isPlayingAudio ? (
            <>
              <Volume2 size={13} className="animate-bounce" />
              <span>Palace Melody On</span>
            </>
          ) : (
            <>
              <VolumeX size={13} />
              <span className="hidden xs:inline">Soundscape</span>
            </>
          )}
        </button>
      </aside>

      {/* Hero Foreground Content with Motion Entrance and Gentle Parallax Dissolve */}
      <motion.div 
        style={{ opacity: heroContentOpacity }}
        className="relative z-10 px-5 md:px-12 pt-24 md:pt-36 pb-12 md:pb-16 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        
        {/* Adorable Royal Welcome & Concierge Live Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 animate-float-gentle"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E241B]/85 hover:bg-[#1A3E31]/90 border border-[#C5A059]/50 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all hover:scale-105 cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] md:text-xs font-medium tracking-wide text-[#DFCEB2]">
              🏰 Welcome to the Kingdom · Live Concierge Online
            </span>
            <span className="text-xs">✨</span>
          </div>
        </motion.div>

        {/* Brand Royal Monogram & Editorial Coordinates */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 inline-flex flex-col items-center"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#0E241B]/90 border border-[#C5A059]/60 flex items-center justify-center shadow-[0_0_30px_rgba(197,160,89,0.3)] backdrop-blur-md mb-2 group">
            <RoyalCrest size={36} className="text-[#D4AF37]" />
          </div>
          <div className="flex items-center gap-2 text-[10px] md:text-xs tracking-[0.25em] text-[#DFCEB2] uppercase font-semibold">
            <span>26.9124° N, 75.7873° E</span>
            <span>·</span>
            <span>Mewar Heritage Belt</span>
          </div>
        </motion.div>

        {/* Brand Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-[#FBFAF6] uppercase max-w-2xl leading-tight drop-shadow-md"
        >
          VIRĀSĀ PALACE
          <span className="block text-xs md:text-sm font-medium tracking-[0.3em] gold-foil-text mt-1 md:mt-2">
            &amp; RETREAT
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.9, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <RoyalDivider className="my-3 md:my-4" />
        </motion.div>

        {/* Tagline & Headline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-cormorant text-xl xs:text-2xl md:text-3xl lg:text-4xl italic text-[#F4E8D1] font-normal tracking-wide drop-shadow-sm"
        >
          "A Royal Story. Yours to Live."
        </motion.p>

        {/* Editorial Short Description */}
        <motion.p 
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2.5 md:mt-3.5 text-xs xs:text-[13px] md:text-base text-[#FAF8F5]/85 max-w-xl font-normal leading-relaxed"
        >
          Echoes of timeless Rajputana grandeur intertwined with bespoke modern luxury. An ancestral sanctuary where fairy-tale destination weddings and sovereign leisure unfold.
        </motion.p>

        {/* Dual Primary Call-to-Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 w-full max-w-md md:max-w-2xl flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center"
        >
          {/* Wedding Enquiry Button (Gold primary) */}
          <button
            onClick={onOpenWeddingEnquiry}
            className="btn-royal-gold w-full md:w-auto md:px-7 h-12 rounded-xl text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <Sparkles size={16} className="text-[#0E241B]" />
            <span>Plan Your Destination Wedding</span>
          </button>

          {/* Explore Palace Button */}
          <button
            onClick={onExplorePalace}
            className="btn-royal-outline w-full md:w-auto md:px-6 h-12 rounded-xl font-semibold text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <Compass size={15} className="text-[#D4AF37]" />
            <span>Explore The Palace</span>
          </button>
        </motion.div>

        {/* Subtle Scroll Down Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={onExplorePalace}
          className="mt-8 inline-flex flex-col items-center gap-1.5 text-[10px] md:text-xs tracking-widest text-[#B99560]/80 uppercase hover:text-[#B99560] transition-colors"
          aria-label="Scroll to booking & palace overview"
        >
          <span className="font-medium">Discover Sanctuary</span>
          <ChevronDown size={15} className="animate-bounce text-[#B99560]" />
        </motion.button>

      </motion.div>

      {/* The "Curtain Reveal" Transition: Royal Velvet Gates Parting on Scroll */}
      <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none z-20 overflow-hidden flex">
        <motion.div 
          style={{ x: curtainLeftX }}
          className="w-1/2 h-full bg-gradient-to-r from-[#091913] to-[#0E241B] border-r border-[#C5A059]/40 shadow-2xl relative"
        >
          <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-30 text-[#D4AF37]">
            <RoyalCrest size={24} />
          </div>
        </motion.div>
        <motion.div 
          style={{ x: curtainRightX }}
          className="w-1/2 h-full bg-gradient-to-l from-[#091913] to-[#0E241B] border-l border-[#C5A059]/40 shadow-2xl relative"
        >
          <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-30 text-[#D4AF37]">
            <RoyalCrest size={24} />
          </div>
        </motion.div>
      </div>

    </section>
  );
};
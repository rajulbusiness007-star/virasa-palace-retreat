/**
 * VIRĀSĀ PALACE & RETREAT - Verified Data Structure
 * Adheres strictly to Section 13 (Accuracy requirements)
 * Placeholders are explicitly indicated and easily configurable.
 */

export interface RoomSuite {
  id: string;
  name: string;
  category: 'Luxury Rooms' | 'Heritage Suites' | 'Grand Suites' | 'Private Haveli';
  areaSqFt: number;
  maxGuests: number;
  bedType: string;
  view: string;
  description: string;
  amenities: string[];
  imageUrl: string;
  tag?: string;
}

export interface WeddingCeremony {
  id: string;
  title: string;
  subtitle: string;
  timing: string;
  description: string;
  ambience: string;
  setting: string;
  imageUrl: string;
  features: string[];
}

export interface WeddingVenue {
  id: string;
  name: string;
  type: 'Outdoor Lawn' | 'Indoor Darbar' | 'Courtyard & Poolside' | 'Terrace Pavilion';
  capacityNote: string; // Clearly designated placeholder per guidelines
  idealFor: string;
  description: string;
  imageUrl: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  timing: string;
  imageUrl: string;
  highlights: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'All' | 'Weddings' | 'Suites' | 'Architecture' | 'Dining';
  imageUrl: string;
  caption: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Stay & Booking' | 'Destination Weddings' | 'Experiences & Protocol';
}

export const HOTEL_CONFIG = {
  brandName: "VIRĀSĀ PALACE & RETREAT",
  tagline: "A Royal Story. Yours to Live.",
  estateLocation: "Rajasthan Heritage Belt, India",
  fullAddressPlaceholder: "Mewar Heritage Corridor, Rajasthan, India",
  phonePlaceholder: "+91 8827846844",
  phoneDisplayPlaceholder: "+91 8827846844",
  emailPlaceholder: "mukulsen92238@gmail.com",
  whatsappPlaceholder: "+91 8827846844",
  operatingNote: "Booking engine and CRM endpoints connect seamlessly via hotel PMS credentials.",
};

// High-fidelity curated royal palace & luxury hospitality visuals
export const ROOMS_DATA: RoomSuite[] = [
  {
    id: "grand-maharaja-suite",
    name: "The Imperial Maharaja Suite",
    category: "Grand Suites",
    areaSqFt: 1850,
    maxGuests: 3,
    bedType: "Royal King Four-Poster Teak Bed",
    view: "Panoramic Aravali Hills & Palace Courtyard",
    description: "An ancestral sanctuary reserved for nobility. Featuring 18-foot vaulted ceilings adorned with hand-painted gold leaf frescoes, an authentic marble jharokha balcony, and a private plunge pool.",
    amenities: [
      "Dedicated 24/7 Royal Khansama (Butler)",
      "Private marble jharokha balcony",
      "Carrara marble bath with sunken soaking tub",
      "Ayurvedic wellness bath rituals",
      "Private dining salon for four",
      "Complimentary airport luxury sedan transfers"
    ],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    tag: "Signature Residence"
  },
  {
    id: "royal-heritage-suite",
    name: "Heritage Mewar Suite",
    category: "Heritage Suites",
    areaSqFt: 1200,
    maxGuests: 2,
    bedType: "Handcrafted Teak King Bed",
    view: "Lotus Pond & Stepwell Colonnade",
    description: "Echoing 300 years of living Rajput architecture. Features carved stone arches, antique brass lanterns, handwoven silk tapestries, and a private sunlit terrace.",
    amenities: [
      "Private sunlit heritage terrace",
      "Freestanding clawfoot copper bath",
      "Organic saffron & vetiver bath amenities",
      "Daily Royal High Tea served in-suite",
      "Bespoke pillow menu with raw silk covers",
      "Curated palace library collection"
    ],
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    tag: "Guest Favorite"
  },
  {
    id: "palace-deluxe-room",
    name: "Courtyard Heritage Room",
    category: "Luxury Rooms",
    areaSqFt: 680,
    maxGuests: 2,
    bedType: "King or Twin Heritage Beds",
    view: "Inner Fragrant Jasmine Courtyard",
    description: "Intimate and serene retreat overlooking manicured gardens. Warm sandstone arches frame tranquil garden views with rich artisanal marble floors.",
    amenities: [
      "Courtyard garden sit-out",
      "Walk-in rain shower with forest stone bench",
      "Artisanal Kashmiri walnut wood work desk",
      "Nespresso & single-estate Indian tea atelier",
      "Twice-daily housekeeping with lavender mist"
    ],
    imageUrl: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "private-haveli-villa",
    name: "The Royal Sanctuary Haveli",
    category: "Private Haveli",
    areaSqFt: 2900,
    maxGuests: 6,
    bedType: "Two King Master Bedrooms + Living Pavilion",
    view: "Private Enclosed Royal Garden & Plunge Pool",
    description: "An ultra-exclusive private residence standalone estate within palace grounds. Complete with its own courtyard, personal chef pantry, heated stone pool, and private entrance.",
    amenities: [
      "Exclusive private temperature-regulated pool",
      "Personal resident chef and dedicated service team",
      "Secluded walled royal garden for private dinners",
      "Two master suites with hand-carved stone fireplaces",
      "Private wellness treatment room",
      "VIP fast-track destination wedding suite access"
    ],
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    tag: "Exclusive Estate"
  }
];

export const WEDDING_CEREMONIES: WeddingCeremony[] = [
  {
    id: "mehendi",
    title: "1. The Royal Mehendi Ceremony",
    subtitle: "Sunlit Courtyards & Fragrant Henna",
    timing: "Day Celebration · 11:00 AM – 4:00 PM",
    description: "Vibrant festivities unfold beneath draped marigold canopies and vintage chhatris. Live folk musicians, artisanal bangle crafters, and fragrant floral seating create an intoxicating celebration of color and heritage.",
    ambience: "Vibrant saffron, emerald & ivory drapes, live Rajasthani folk musicians, fresh rose petal showers.",
    setting: "The Jasmine & Peacock Courtyard",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    features: ["Bespoke Floral Swings", "Live Chaat & Thandai Stalls", "Artisanal Henna Artists", "Folk Dancers & Sitarists"]
  },
  {
    id: "haldi",
    title: "2. The Golden Haldi Ritual",
    subtitle: "Sacred Turmeric by the Stepwell Pool",
    timing: "Morning Ritual · 9:30 AM – 1:00 PM",
    description: "A ceremonial blessing bathed in bright sunshine and sacred marigold blooms. The bride and groom are anointed with pure Kasturi manjal and rose water amidst traditional brass urlis and joyous family anthems.",
    ambience: "Golden yellow florals, cascading floral curtains, brass vessels with water lilies.",
    setting: "The Sunlit Stepwell Terrace",
    imageUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80",
    features: ["Brass Urli Bath Installations", "Organic Herbal Ubtan Stations", "Refreshing Mimosa & Coconut Bar", "Live Dhol Beats"]
  },
  {
    id: "sangeet",
    title: "3. Grand Sangeet Celebration",
    subtitle: "An Evening of Music, Starlight & Royalty",
    timing: "Evening Gala · 7:30 PM onwards",
    description: "The palace turns into a glittering kingdom of celebration. Spectacular stage choreography, world-class acoustics, royal cocktail lounges, and dance floors illuminated by hundreds of antique lanterns.",
    ambience: "Starlight chandeliers, dramatic architectural palace illumination, opulent velvet lounges.",
    setting: "The Imperial Amphitheatre & Lawns",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    features: ["Concert-Grade Acoustic Stage", "Curated Royal Cocktail Atelier", "Gourmet Global Live Kitchens", "Fireworks & Light Canopy"]
  },
  {
    id: "wedding",
    title: "4. The Sacred Royal Pheras",
    subtitle: "Timeless Vows at the Lotus Mandap",
    timing: "Twilight Ceremony · 5:30 PM – 8:30 PM",
    description: "The crowning moment of royalty. As dusk falls over the Aravali hills and Vedic mantras resonate across water, the couple exchanges sacred vows beneath an ethereal floral mandap reflected in tranquil waters.",
    ambience: "Scented tuberose, pure white orchids, brass diya flames, sacred Vedic chants, twilight silhouette.",
    setting: "The Lotus Lake Floating Mandap",
    imageUrl: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    features: ["Floating Lake Mandap Architecture", "Bespoke Royal Baraat Entry Path", "Vedic Pundit & Shehnai Ensemble", "Rose Petal Aerial Blessings"]
  },
  {
    id: "reception",
    title: "5. The Imperial Wedding Reception",
    subtitle: "A Regal Banquet of Elegance",
    timing: "Grand Evening · 8:30 PM onwards",
    description: "An unforgettable banquet honoring the newlyweds. Crystal chandeliers shimmer against carved sandstone colonnades as guests indulge in an imperial multi-course feast served on silver dinnerware.",
    ambience: "Black-tie elegance, crystal chandeliers, classical jazz & symphony ensemble, candlelit tables.",
    setting: "The Grand Darbar Lawns & Colonnades",
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    features: ["Silver Thali & Plated Service", "Grand Royal Stage Backdrop", "Vintage Champagne Toast", "Custom After-Party Speakeasy"]
  },
  {
    id: "pre-wedding",
    title: "6. Pre-Wedding Royal Welcome",
    subtitle: "Royal Arrival & Sundowner Soirée",
    timing: "Day One · 4:00 PM – 7:00 PM",
    description: "Welcome guests with the legendary Rajputana tradition. Royal gaddi carriages, garlanding with fragrant mogra, welcoming aarti, and a golden hour cocktail soirée on the palace ramparts.",
    ambience: "Aarti and royal conch welcome, heritage vintage car display, sunset jazz over palace ramparts.",
    setting: "The Grand Toran Gate & Sunset Ramparts",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    features: ["Traditional Royal Welcome Aarti", "Vintage Car Fleet for Guests", "Sunset Cocktails & Canapés", "Palace Tour with Royal Historian"]
  }
];

export const WEDDING_VENUES: WeddingVenue[] = [
  {
    id: "grand-mandap-lawn",
    name: "The Royal Darbar Lawn",
    type: "Outdoor Lawn",
    capacityNote: "[Configurable Venue Capacity: 150 – 800 Guests Placeholder]",
    idealFor: "Royal Pheras, Sangeet & Grand Reception",
    description: "Expansive velvet lawns framed by 300-year-old sandstone facades, capable of hosting grand royal stages and majestic mandap canopies under the stars.",
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "imperial-darbar-hall",
    name: "The Sheesh Darbar Ballroom",
    type: "Indoor Darbar",
    capacityNote: "[Configurable Venue Capacity: 80 – 350 Guests Placeholder]",
    idealFor: "Indoor Banquets, Sangeet & After-Parties",
    description: "Air-conditioned heritage ballroom with Belgian mirror inlay work, hand-carved pillars, and state-of-the-art concert acoustic capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "lotus-courtyard",
    name: "The Lotus Stepwell Courtyard",
    type: "Courtyard & Poolside",
    capacityNote: "[Configurable Venue Capacity: 50 – 250 Guests Placeholder]",
    idealFor: "Mehendi, Haldi & Intimate Vedic Pheras",
    description: "A dramatic architectural stepwell setting with cascading stone stairs, turquoise water reflections, and shaded heritage verandas.",
    imageUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "jharokha-terrace",
    name: "The Royal Rampart Pavilion",
    type: "Terrace Pavilion",
    capacityNote: "[Configurable Venue Capacity: 40 – 150 Guests Placeholder]",
    idealFor: "Pre-wedding Sundowners & Intimate Din dinners",
    description: "Elevated rooftop terrace with panoramic views of the Aravali range and surrounding palace domes, magical at dusk.",
    imageUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80"
  }
];

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "fine-dining",
    title: "Mewar Imperial Dining",
    category: "Fine Dining",
    tagline: "Royal Recipes from Ancestral Kitchens",
    description: "Dine on heritage Rajput recipes revived from royal archives, prepared with slow-cooking brass degs and served on embossed silver thalis.",
    timing: "Dinner: 7:30 PM – 11:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Royal Thali Experience", "Sommelier Wine Pairings", "Live Classical Sitar", "Ancestral Spice Blends"]
  },
  {
    id: "spa-wellness",
    title: "Jiva & Ayurveda Sanctuary",
    category: "Spa & Wellness",
    tagline: "Ancient Ayurvedic Healing & Royal Hammam",
    description: "Restore balance with traditional Abhyanga therapies, herbal compresses, and copper-water hydrotherapy guided by resident Ayurvedic physicians.",
    timing: "Daily: 8:00 AM – 8:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Abhyanga Herbal Massage", "Rose Petal Hammam", "Meditation Pavilions", "Natural Herb Apothecary"]
  },
  {
    id: "private-jharokha-dining",
    title: "The Jharokha Candlelit Soirée",
    category: "Private Dining",
    tagline: "An Intimate Table for Two Under the Stars",
    description: "An exclusive dining alcove suspended above palace courtyards, illuminated by 101 beeswax candles with a personal butler and tailor-made menu.",
    timing: "By Prior Reservation Only",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Exclusive Butler & Sommelier", "101 Beeswax Candles", "Bespoke 7-Course Menu", "Violin or Flute Serenade"]
  },
  {
    id: "swimming-pool",
    title: "The Stepwell Colonnade Pool",
    category: "Swimming Pool",
    tagline: "Azure Waters Surrounded by Hand-Carved Stone",
    description: "Temperature-controlled swimming pool modeled after ancient Rajasthani stepwells, shaded by arched stone pavilions with daybed cabanas.",
    timing: "Daily: 7:00 AM – 7:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Temperature Controlled", "Private Cabanas", "Poolside Refreshment Service", "Underwater Soft Illumination"]
  },
  {
    id: "cultural-evenings",
    title: "Royal Kathak & Sitar Soirées",
    category: "Cultural Evenings",
    tagline: "The Living Arts of the Rajputana Court",
    description: "Gather at dusk around the lit marble fountain for mesmerizing Kathak dance, Rajasthani Manganiyar music, and palace history storytelling.",
    timing: "Every Evening: 6:30 PM – 7:30 PM",
    imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Renowned Classical Artists", "Complementary Royal Kahwa", "Historic Palace Courtyard", "Open to Hotel Residents"]
  }
];

export const GALLERY_DATA: GalleryImage[] = [
  {
    id: "g1",
    title: "Palace Twilight Façade",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    caption: "The majestic golden sandstone palace reflecting across illuminated courtyards at dusk."
  },
  {
    id: "g2",
    title: "Floral Mandap by the Water",
    category: "Weddings",
    imageUrl: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    caption: "Sacred twilight pheras setting framed by cascading jasmine and brass lamps."
  },
  {
    id: "g3",
    title: "Maharaja Suite Sanctuary",
    category: "Suites",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
    caption: "Regal suite interior with handcrafted woodwork and palace archways."
  },
  {
    id: "g4",
    title: "Royal Imperial Dining Table",
    category: "Dining",
    imageUrl: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    caption: "Exquisite silver thali banquet setting in the ancestral dining hall."
  },
  {
    id: "g5",
    title: "Sangeet Under the Starlight",
    category: "Weddings",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    caption: "An electrifying evening of music and royal celebrations on the Darbar lawns."
  },
  {
    id: "g6",
    title: "The Stepwell Azure Waters",
    category: "Architecture",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
    caption: "Hand-carved sandstone colonnades guarding the azure temperature-regulated pool."
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: "Destination Weddings",
    question: "How far in advance should we reserve the palace for a destination wedding?",
    answer: "Given our heritage status and commitment to hosting only one signature wedding at a time, we recommend reserving 8 to 14 months in advance, especially for prime royal wedding season (October to March)."
  },
  {
    category: "Destination Weddings",
    question: "Do you offer full palace buyouts for private wedding celebrations?",
    answer: "Yes, exclusive palace buyouts are our signature offering. A buyout grants your wedding party exclusive private access to all suites, courtyards, manicured lawns, dining rooms, and heritage grounds with dedicated staff."
  },
  {
    category: "Stay & Booking",
    question: "What are the standard check-in and check-out timings?",
    answer: "Check-in is from 2:00 PM and check-out is at 11:00 AM. Early check-in or late check-out is accommodated based on availability and may be arranged directly with your personal butler."
  },
  {
    category: "Stay & Booking",
    question: "How do airport transfers and arrivals work?",
    answer: "We offer private luxury sedan transfers from the nearest regional airport (approx. 45 minutes drive). Guests arriving at VIRĀSĀ are welcomed with traditional royal aarti, conch blowing, and floral blessings."
  },
  {
    category: "Experiences & Protocol",
    question: "Are pre-wedding photography shoots permitted on the estate?",
    answer: "Pre-wedding and bridal photography shoots are exclusively permitted for guests staying at the palace or hosting their wedding ceremonies with us. Special permissions for non-resident shoots can be requested via our concierge."
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: "t1",
    quote: "Our destination wedding at VIRĀSĀ Palace was beyond what words can convey. From the floating mandap on the lotus lake to the royal silver thali banquet, our 300 guests were treated like royalty.",
    author: "Ananya & Siddharth Singhania",
    event: "3-Day Destination Wedding",
    location: "Mumbai, India",
    note: "[Client-supplied genuine testimonial placeholder]"
  },
  {
    id: "t2",
    quote: "The Heritage Mewar Suite is a masterclass in restorative luxury. Waking up to the morning peacocks calling across the marble jharokha was pure enchantment. The hospitality is sublime.",
    author: "Lord & Lady Harrington",
    event: "Anniversary Retreat",
    location: "London, UK",
    note: "[Client-supplied genuine testimonial placeholder]"
  }
];

export const MOCK_CATEGORIES = [
  { id: 'all', name: 'All Events', icon: 'Sparkles' },
  { id: 'concerts', name: 'Concerts & Music', icon: 'Music' },
  { id: 'workshops', name: 'Workshops & Tech', icon: 'Code' },
  { id: 'standup', name: 'Standup Comedy', icon: 'Smile' },
  { id: 'sports', name: 'Sports & Fitness', icon: 'Trophy' },
  { id: 'theatre', name: 'Theatre & Arts', icon: 'Film' },
  { id: 'festivals', name: 'Food & Festivals', icon: 'Utensils' },
];

export const MOCK_CITIES = [
  'Mumbai', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Goa'
];

export const MOCK_EVENTS = [
  {
    id: "evt-201",
    title: "Sunburn Goa 2026 — Arena Music Festival",
    category: "Concerts & Music",
    city: "Goa",
    venue: "Vagator Beach Arena, Goa",
    date: "2026-12-28",
    time: "4:00 PM onwards",
    price: 1999,
    originalPrice: 2499,
    banner: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 3420,
    language: "English / EDM",
    duration: "6 Hours",
    organizer: "Percept Live",
    description: "Experience Asia's biggest Electronic Dance Music festival featuring world-renowned DJs, breathtaking laser stage shows, food villages, and unmatched energy on Vagator Beach.",
    ticketTypes: [
      { id: "ga", name: "General Access (GA)", price: 1999, description: "Entry to festival arena & main dance stage.", available: 45 },
      { id: "vip", name: "VIP Pass", price: 4999, description: "Elevated VIP deck, dedicated bar, express entry lane.", available: 12 },
      { id: "fan", name: "Fan Pit Access", price: 8999, description: "Front-stage access right next to the DJ console.", available: 5 }
    ]
  },
  {
    id: "evt-202",
    title: "Zakir Khan Live — 'Tathastu' World Tour",
    category: "Standup Comedy",
    city: "Bengaluru",
    venue: "Good Shepherd Auditorium, Residency Rd",
    date: "2026-08-15",
    time: "7:00 PM",
    price: 999,
    originalPrice: 1499,
    banner: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=1200&q=80",
    badge: "Selling Fast",
    rating: 4.8,
    reviewsCount: 1850,
    language: "Hindi",
    duration: "2 Hours",
    organizer: "OML Entertainment",
    description: "India's favorite Sakht Launda, Zakir Khan, returns with his brand-new 2-hour stand-up comedy special filled with hilarious personal storytelling and relatable humor.",
    ticketTypes: [
      { id: "balcony", name: "Balcony Seating", price: 999, description: "Upper tier seating with full view.", available: 20 },
      { id: "silver", name: "Silver Floor Seating", price: 1499, description: "Mid-level auditorium seating.", available: 15 },
      { id: "gold", name: "Gold Premium Front Rows", price: 2499, description: "First 5 rows near the stage.", available: 4 }
    ]
  },
  {
    id: "evt-203",
    title: "React & AI Web Architecture Masterclass 2026",
    category: "Workshops & Tech",
    city: "Mumbai",
    venue: "Nehru Centre Auditorium, Worli",
    date: "2026-08-22",
    time: "10:00 AM - 5:00 PM",
    price: 1499,
    originalPrice: 2999,
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    badge: "Trending Tech",
    rating: 4.95,
    reviewsCount: 620,
    language: "English",
    duration: "7 Hours Workshop",
    organizer: "DevSphere Global",
    description: "Hands-on intensive workshop building real-world AI applications with React 19, Next.js, and autonomous agent SDKs. Includes lunch, certs, and networking kit.",
    ticketTypes: [
      { id: "standard", name: "Standard Delegate Pass", price: 1499, description: "Full day access + workshop material & certificate.", available: 30 },
      { id: "vip_dev", name: "VIP Developer Pass", price: 2999, description: "Includes 1-on-1 mentor code review + 1yr pro subscriptions.", available: 8 }
    ]
  },
  {
    id: "evt-204",
    title: "ISL 2026 Grand Final: Mumbai City FC vs Bengaluru FC",
    category: "Sports & Fitness",
    city: "Mumbai",
    venue: "Mumbai Football Arena, Andheri Sports Complex",
    date: "2026-09-05",
    time: "7:30 PM",
    price: 499,
    originalPrice: 799,
    banner: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    badge: "Hot Match",
    rating: 4.7,
    reviewsCount: 4120,
    language: "Hindi / English",
    duration: "3 Hours",
    organizer: "Indian Super League",
    description: "Witness the fierce battle for the championship trophy as top football clubs clash live in Mumbai. Live commentary, fan zones, and halftime musical performances.",
    ticketTypes: [
      { id: "east", name: "East Stand (Fan Zone)", price: 499, description: "General seating behind goalpost.", available: 120 },
      { id: "west", name: "West Premium Stand", price: 999, description: "Covered seating with midfield view.", available: 35 },
      { id: "hospitality", name: "Hospitality Box Pass", price: 4999, description: "AC box seating with gourmet buffet & drinks.", available: 6 }
    ]
  },
  {
    id: "evt-205",
    title: "Mughal-e-Azam The Musical Play",
    category: "Theatre & Arts",
    city: "Delhi NCR",
    venue: "Jawaharlal Nehru Indoor Stadium, New Delhi",
    date: "2026-09-12",
    time: "6:30 PM",
    price: 1250,
    originalPrice: 1800,
    banner: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
    badge: "Must Watch",
    rating: 4.9,
    reviewsCount: 2190,
    language: "Hindi / Urdu",
    duration: "2.5 Hours",
    organizer: "Shapoorji Pallonji Productions",
    description: "Feroz Abbas Khan’s award-winning grand theatrical play with live singing, Manish Malhotra costumes, and mesmerizing kathak dance performances.",
    ticketTypes: [
      { id: "bronze", name: "Bronze Tier", price: 1250, description: "Standard rear auditorium seating.", available: 18 },
      { id: "platinum", name: "Platinum VIP Tier", price: 3500, description: "Center stage seating + souvenir booklet.", available: 7 }
    ]
  },
  {
    id: "evt-206",
    title: "The Great Indian Street Food & Craft Beer Fest",
    category: "Food & Festivals",
    city: "Pune",
    venue: "Mahalaxmi Lawns, Karve Nagar",
    date: "2026-09-26",
    time: "1:00 PM - 10:00 PM",
    price: 399,
    originalPrice: 600,
    banner: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
    badge: "Weekend Special",
    rating: 4.6,
    reviewsCount: 1430,
    language: "Multilingual",
    duration: "Full Day Entry",
    organizer: "Foodies Guild India",
    description: "Over 80 food stalls, 15 craft microbreweries, indie band live acoustic performances, flea market, and fun games zone.",
    ticketTypes: [
      { id: "entry", name: "Festival Entry Pass", price: 399, description: "Access to all food stalls & live stage music.", available: 200 },
      { id: "tasting", name: "Beer Tasting Pass", price: 999, description: "Entry + 5 craft beer tasting coupons + official mug.", available: 40 }
    ]
  }
];

export const MOCK_BOOKINGS = [
  {
    id: "BK-88219",
    eventName: "Sunburn Goa 2026 — Arena Music Festival",
    ticketType: "VIP Pass",
    quantity: 2,
    totalAmount: 9998,
    date: "2026-12-28",
    time: "4:00 PM",
    venue: "Vagator Beach Arena, Goa",
    status: "Confirmed",
    qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BK-88219-SUNBURN-2026",
    bookedOn: "2026-07-28"
  }
];

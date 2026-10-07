// Static User Profile
export const user = {
  name: "Aarav Shah",
  role: "Student",
  department: "Computer Science & Engg.",
  email: "aarav.shah@campus.edu",
  id: "STU-2026-88",
  avatar: "A"
};

// Initial Mock Issues Data
export const mockIssues = [
  {
    id: "1",
    title: "Water Leakage near Lab 302 AC Unit",
    category: "Plumbing",
    location: "Academic Block B · 3rd Floor",
    priority: "High",
    status: "In Progress",
    reporter: "Aarav Shah",
    reportedAt: "2h ago",
    updatedAt: "30m ago",
    description: "Continuous water dripping near the main AC pipeline causing ceiling dampness and potential short circuit risk near server rack."
  },
  {
    id: "2",
    title: "Projector HDMI Port Damaged",
    category: "IT / Network",
    location: "Seminar Hall A",
    priority: "Medium",
    status: "Reported",
    reporter: "Priya Sharma",
    reportedAt: "4h ago",
    updatedAt: "4h ago",
    description: "The primary podium HDMI input connector is loose, causing screen flickering during lectures."
  },
  {
    id: "3",
    title: "Broken Desktop Panel Row 3 Desk 4",
    category: "Furniture",
    location: "Main Building · Ground Floor Room 104",
    priority: "Low",
    status: "Resolved",
    reporter: "Rohan Verma",
    reportedAt: "1d ago",
    updatedAt: "2h ago",
    description: "Desktop wood laminate came loose exposing sharp metal fasteners."
  },
  {
    id: "4",
    title: "Wi-Fi Access Point AP-04 Offline",
    category: "IT / Network",
    location: "Central Library · 2nd Floor Quiet Zone",
    priority: "High",
    status: "Reported",
    reporter: "Ananya Patel",
    reportedAt: "5h ago",
    updatedAt: "5h ago",
    description: "No wireless coverage available in the east wing study area since morning."
  },
  {
    id: "5",
    title: "Elevator B Door Sensor Intermittent Fault",
    category: "Electrical",
    location: "Engineering Block · Elevator Bay",
    priority: "High",
    status: "In Progress",
    reporter: "Karan Malhotra",
    reportedAt: "6h ago",
    updatedAt: "1h ago",
    description: "Infrared safety curtain sensor fails to detect passengers entering, causing doors to close prematurely."
  },
  {
    id: "6",
    title: "Gym Cable Cross Machine Grip Replacement",
    category: "Facilities",
    location: "Sports Complex · Fitness Center",
    priority: "Low",
    status: "Resolved",
    reporter: "Neha Gupta",
    reportedAt: "2d ago",
    updatedAt: "1d ago",
    description: "Right pulley rubber handle is torn and unhinged."
  }
];

// Announcements Mock Data
export const mockAnnouncements = [
  {
    id: "ann-1",
    title: "Scheduled Power & Electrical Infrastructure Maintenance",
    category: "Electrical",
    date: "Friday · 10:00 AM – 1:00 PM",
    badge: "Important",
    description: "Routine transformer testing and breaker upgrades will be conducted across Engineering Block B and Central Auditorium.",
    author: "Campus Maintenance Directorate"
  },
  {
    id: "ann-2",
    title: "Central Library Wi-Fi Upgrade & Fiber Migration",
    category: "IT / Network",
    date: "Saturday · 2:00 PM – 5:00 PM",
    badge: "Notice",
    description: "High-speed Wi-Fi 6 access points are being installed across 2nd & 3rd floors. Temporary connection drops expected.",
    author: "IT Infrastructure Team"
  },
  {
    id: "ann-3",
    title: "Campus Water Pipeline Disinfection & Pressure Test",
    category: "Plumbing",
    date: "Sunday · 6:00 AM – 9:00 AM",
    badge: "Planned",
    description: "Water supply to Hostel Block C and Cafeteria wing will be turned off temporarily during tank cleaning.",
    author: "Facilities Ops"
  }
];

// Activity Timeline Mock Data
export const mockActivities = [
  {
    id: "act-1",
    title: "Projector issue reported",
    time: "2 hours ago",
    user: "Priya Sharma",
    type: "report",
    badge: "Reported"
  },
  {
    id: "act-2",
    title: "Technician assigned to Block B Leakage",
    time: "4 hours ago",
    user: "Rajesh Kumar (Maintenance Lead)",
    type: "assign",
    badge: "In Progress"
  },
  {
    id: "act-3",
    title: "Gym Equipment Handle replaced",
    time: "Yesterday",
    user: "Facilities Team",
    type: "resolve",
    badge: "Resolved"
  },
  {
    id: "act-4",
    title: "Elevator B sensor diagnostic started",
    time: "6 hours ago",
    user: "Elevator Service Vendor",
    type: "progress",
    badge: "In Progress"
  }
];

// Analytics Data
export const mockAnalytics = {
  categoryDistribution: [
    { category: "IT / Network", count: 14, percentage: 35, color: "#2563EB" },
    { category: "Plumbing", count: 10, percentage: 25, color: "#004643" },
    { category: "Electrical", count: 8, percentage: 20, color: "#D97706" },
    { category: "Furniture", count: 5, percentage: 12.5, color: "#7C3AED" },
    { category: "Facilities", count: 3, percentage: 7.5, color: "#059669" }
  ],
  priorityDistribution: [
    { level: "High", count: 6, percentage: 30, color: "#BE123C" },
    { level: "Medium", count: 9, percentage: 45, color: "#B45309" },
    { level: "Low", count: 5, percentage: 25, color: "#004643" }
  ],
  statusDistribution: [
    { status: "Reported", count: 7, percentage: 35, color: "#9F1239" },
    { status: "In Progress", count: 8, percentage: 40, color: "#B45309" },
    { status: "Resolved", count: 5, percentage: 25, color: "#047857" }
  ]
};

// Help FAQs
export const mockFaqs = [
  {
    q: "How do I report a new campus issue?",
    a: "Click on '+ Report Issue' in the left sidebar or top bar. Fill out the location, category, priority, and description, then click Submit."
  },
  {
    q: "How can I track my submitted reports?",
    a: "Navigate to the 'My Reports' tab from the sidebar to view all issues reported by you alongside live status badges."
  },
  {
    q: "What does 'In Progress' mean?",
    a: "'In Progress' indicates that a maintenance technician or department engineer has been assigned and is actively working on resolving the issue."
  },
  {
    q: "How long does resolution usually take?",
    a: "High Priority safety or water issues are typically addressed within 2-4 hours. General repairs take 24-48 hours."
  },
  {
    q: "Who handles electrical and IT issues?",
    a: "Electrical issues are assigned to Campus Maintenance Operations, while IT/Network tickets are routed to the Central IT Infrastructure Team."
  }
];

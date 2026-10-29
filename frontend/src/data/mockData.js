// Static User Profile
export const user = {
  name: "Neev Rambhia",
  role: "Student",
  department: "Computer Science & Engg.",
  email: "25206010@apsit.edu.in",
  id: "25206010",
  avatar: "🎓"
};

// Technician Assignment Checker Helper (Exp 10 RBAC)
export const isAssignedToUser = (assignedTo, user) => {
  if (!assignedTo || !user) return false;
  const assigned = String(assignedTo).toLowerCase();
  const userName = String(user.name || '').toLowerCase();
  const firstName = userName.split(' ')[0] || '';

  if (assigned.includes(userName) || (firstName.length > 2 && assigned.includes(firstName))) return true;
  if ((userName.includes('estate') || userName.includes('crew')) && (assigned.includes('estate') || assigned.includes('crew'))) return true;
  return false;
};

// Clean Reporter Name Formatter (Exp 10 Rule: Clean full name without Moodle ID / brackets)
export const formatReporterName = (raw) => {
  if (!raw) return 'Campus Resident';
  let str = String(raw).trim();
  str = str.replace(/\s*[\(\[\{]\s*\d+\s*[\)\]\}]/g, '').trim();
  str = str.replace(/\s*-\s*\d+$/g, '').trim();
  if (/^\d+$/.test(str) || !str) {
    return str === '25206010' ? 'Neev Rambhia' : 'Student Reporter';
  }
  return str;
};

// Comprehensive Campus Issues Data (Synchronized with Firebase Cloud Firestore)
export const mockIssues = [
  {
    "id": "1",
    "title": "Water Leakage near Lab 302 AC Unit",
    "category": "Plumbing",
    "location": "Academic Block B · 3rd Floor",
    "priority": "High",
    "status": "In Progress",
    "reporter": "Aarav Shah",
    "reportedBy": "Aarav Shah",
    "reportedAt": "2 hours ago",
    "updatedAt": "30 mins ago",
    "assignedTo": "Ramesh Nair",
    "description": "Continuous water dripping near the main AC pipeline causing ceiling dampness and potential short circuit risk near server rack."
  },
  {
    "id": "2",
    "title": "Projector HDMI Port Damaged",
    "category": "IT / Network",
    "location": "Seminar Hall A",
    "priority": "Medium",
    "status": "Reported",
    "reporter": "Priya Sharma",
    "reportedBy": "Priya Sharma",
    "reportedAt": "4 hours ago",
    "updatedAt": "4 hours ago",
    "assignedTo": "Vikram Rao",
    "description": "The primary podium HDMI input connector is loose, causing intermittent screen flickering during lectures."
  },
  {
    "id": "3",
    "title": "Broken Desktop Panel Row 3 Desk 4",
    "category": "Furniture",
    "location": "Main Building · Ground Floor Room 104",
    "priority": "Low",
    "status": "Resolved",
    "reporter": "Rohan Verma",
    "reportedBy": "Rohan Verma",
    "reportedAt": "1 day ago",
    "updatedAt": "2 hours ago",
    "assignedTo": "Estate General Crew",
    "description": "Desktop wood laminate came loose exposing sharp metal fasteners. Repaired and secured."
  },
  {
    "id": "4",
    "title": "Wi-Fi Access Point AP-04 Offline",
    "category": "IT / Network",
    "location": "Central Library · 2nd Floor Quiet Zone",
    "priority": "High",
    "status": "Reported",
    "reporter": "Ananya Patel",
    "reportedBy": "Ananya Patel",
    "reportedAt": "5 hours ago",
    "updatedAt": "5 hours ago",
    "assignedTo": "Vikram Rao",
    "description": "No wireless coverage available in the east wing study area since morning. Students unable to access course portals."
  },
  {
    "id": "5",
    "title": "Elevator B Door Sensor Intermittent Fault",
    "category": "Electrical",
    "location": "Engineering Block · Elevator Bay",
    "priority": "High",
    "status": "In Progress",
    "reporter": "Karan Malhotra",
    "reportedBy": "Karan Malhotra",
    "reportedAt": "6 hours ago",
    "updatedAt": "1 hour ago",
    "assignedTo": "Suresh Kumar",
    "description": "Infrared safety curtain sensor fails to detect passengers entering, causing doors to close prematurely."
  },
  {
    "id": "6",
    "title": "Gym Cable Cross Machine Grip Replacement",
    "category": "Facilities",
    "location": "Sports Complex · Fitness Center",
    "priority": "Low",
    "status": "Resolved",
    "reporter": "Neha Gupta",
    "reportedBy": "Neha Gupta",
    "reportedAt": "2 days ago",
    "updatedAt": "1 day ago",
    "assignedTo": "Estate General Crew",
    "description": "Right pulley rubber handle was torn and unhinged. New ergonomic grip installed and tested."
  },
  {
    "id": "7",
    "title": "Air Conditioner Cooling Failure in Lab 408",
    "category": "Electrical",
    "location": "Computer Center · Lab 408",
    "priority": "High",
    "status": "Reported",
    "reporter": "Aarav Sharma",
    "reportedBy": "Aarav Sharma",
    "reportedAt": "1 day ago",
    "updatedAt": "1 day ago",
    "assignedTo": "Rajesh Sharma",
    "description": "Split AC unit blowing ambient air without compressor engagement. Room temperature reaching 32C during afternoon sessions."
  },
  {
    "id": "8",
    "title": "Campus Wi-Fi Router Reset Required",
    "category": "IT / Network",
    "location": "Hostel Block C · Wing 2",
    "priority": "Medium",
    "status": "Reported",
    "reporter": "Neev Rambhia",
    "reportedBy": "Neev Rambhia",
    "reportedAt": "Just now",
    "updatedAt": "Just now",
    "assignedTo": "Vikram Rao",
    "description": "Frequent disconnects on the 5GHz SSID across floors 2 and 3. Gateway packet drop observed above 18%."
  },
  {
    "id": "9",
    "title": "Fume Hood Exhaust Fan Motor Defect",
    "category": "Electrical",
    "location": "Chemistry Block · Research Lab 2",
    "priority": "High",
    "status": "In Progress",
    "reporter": "Prof. Ramesh Kulkarni",
    "reportedBy": "Prof. Ramesh Kulkarni",
    "reportedAt": "3 hours ago",
    "updatedAt": "45 mins ago",
    "assignedTo": "Suresh Kumar",
    "description": "Exhaust motor emitting high-pitched squeal with diminished ventilation airflow. Chemical solvent handling temporarily paused."
  },
  {
    "id": "10",
    "title": "Ceiling Acoustic Tile Dislodged",
    "category": "Facilities",
    "location": "Central Library · Main Atrium",
    "priority": "Medium",
    "status": "In Progress",
    "reporter": "Tanvi Desai",
    "reportedBy": "Tanvi Desai",
    "reportedAt": "7 hours ago",
    "updatedAt": "2 hours ago",
    "assignedTo": "Estate General Crew",
    "description": "Acoustic grid panel hanging by corner near entry turnstiles. Cordoned off to prevent hazard to pedestrians."
  },
  {
    "id": "11",
    "title": "Drinking Water Dispenser Filter Overdue",
    "category": "Plumbing",
    "location": "Student Activity Center · 1st Floor",
    "priority": "Medium",
    "status": "Resolved",
    "reporter": "Hostel Student Council",
    "reportedBy": "Hostel Student Council",
    "reportedAt": "2 days ago",
    "updatedAt": "3 hours ago",
    "assignedTo": "Ramesh Nair",
    "description": "UV purifier indicator LED glowing red requesting cartridge change. Replacement cartridge installed and water test passed."
  },
  {
    "id": "12",
    "title": "Wireless Podium Mic RF Interference",
    "category": "Electronics",
    "location": "Central Auditorium",
    "priority": "Low",
    "status": "Reported",
    "reporter": "Dr. Neha Sen",
    "reportedBy": "Dr. Neha Sen",
    "reportedAt": "8 hours ago",
    "updatedAt": "8 hours ago",
    "assignedTo": "Vikram Rao",
    "description": "Lavalier transmitter picking up 60Hz hum when walking near stage left lighting dimmer rack."
  },
  {
    "id": "13",
    "title": "Emergency Exit Luminaire Battery Fault",
    "category": "Electrical",
    "location": "Hostel Block A · Stairwell 3",
    "priority": "High",
    "status": "In Progress",
    "reporter": "Campus Safety Warden",
    "reportedBy": "Campus Safety Warden",
    "reportedAt": "1 day ago",
    "updatedAt": "4 hours ago",
    "assignedTo": "Suresh Kumar",
    "description": "Self-testing LED exit sign indicates flashing amber warning for battery failure during monthly audit."
  },
  {
    "id": "14",
    "title": "Classroom 204 Magnetic Whiteboard Refacing",
    "category": "Furniture",
    "location": "Management Block · Room 204",
    "priority": "Low",
    "status": "Resolved",
    "reporter": "Aarav Shah",
    "reportedBy": "Aarav Shah",
    "reportedAt": "3 days ago",
    "updatedAt": "Yesterday",
    "assignedTo": "Estate General Crew",
    "description": "Marker ghosting and scratched enamel coating cleaned with industrial restorative solvent."
  },
  {
    "id": "15",
    "title": "Cafeteria Handwash Basin Trap Clogged",
    "category": "Plumbing",
    "location": "Dining Hall · South Wing",
    "priority": "High",
    "status": "In Progress",
    "reporter": "Vikram Malhotra",
    "reportedBy": "Vikram Malhotra",
    "reportedAt": "5 hours ago",
    "updatedAt": "1 hour ago",
    "assignedTo": "Ramesh Nair",
    "description": "Dual washbasin draining extremely slowly causing standing water during peak lunch hours."
  },
  {
    "id": "16",
    "title": "Gigabit Ethernet Wall Port Disconnected",
    "category": "IT / Network",
    "location": "Mechanical Engg Dept · CAD Lab Workstation 12",
    "priority": "Medium",
    "status": "Reported",
    "reporter": "Neev Rambhia",
    "reportedBy": "Neev Rambhia",
    "reportedAt": "1 hour ago",
    "updatedAt": "1 hour ago",
    "assignedTo": "Vikram Rao",
    "description": "RJ-45 keystone jack plastic clip cracked; patch cord falls out easily causing connection termination during simulation runs."
  }
];

// Announcements Mock Data (Enriched with Details Modal Data)
export const mockAnnouncements = [
  {
    "id": "ann-1",
    "title": "Scheduled Power & Electrical Infrastructure Maintenance",
    "category": "Electrical",
    "date": "Friday · 10:00 AM – 1:00 PM",
    "badge": "Important",
    "severity": "Important",
    "sender": "Dr. Ananya Sen · Dean of Infrastructure & Campus Operations",
    "description": "Routine transformer testing, breaker upgrades, and thermal imaging inspections will be conducted across Engineering Block B and Central Auditorium. High-voltage sub-panels will undergo scheduled preventive maintenance.",
    "impactedLocations": [
      "Engineering Block B (Floors 1 - 4)",
      "Central Auditorium Main Hall & Green Rooms",
      "North Substation Transformer Yard"
    ],
    "safetyChecklist": [
      "Verify backup UPS battery levels on critical laboratory workstation racks",
      "Avoid elevator usage 10 minutes prior to scheduled power toggle window",
      "Shut down sensitive oscilloscopes and spectrometers before 9:50 AM",
      "Report any sparks, unusual buzzing, or emergency trips to Security Dispatch (Ext. 2200)"
    ],
    "author": "Campus Maintenance Directorate"
  },
  {
    "id": "ann-2",
    "title": "Central Library Wi-Fi Upgrade & Fiber Migration",
    "category": "IT / Network",
    "date": "Saturday · 2:00 PM – 5:00 PM",
    "badge": "Notice",
    "severity": "Notice",
    "sender": "Vikram Rao · IT & Audio-Visual Systems Lead",
    "description": "High-speed Wi-Fi 6 multi-gigabit access points are being installed across 2nd & 3rd floors of the library. Backbone switches are undergoing optical fiber migration.",
    "impactedLocations": [
      "Central Library · 2nd Floor Quiet Zone",
      "Central Library · 3rd Floor Digital Reference Lab",
      "Reading Atrium West Wing"
    ],
    "safetyChecklist": [
      "Save active portal research papers and thesis submissions locally prior to maintenance",
      "Use wired Ethernet drops in Ground Floor Study Pods for uninterrupted access",
      "Clear browser cache and reconnect to 'Fixora-Campus-Secure' after 5:00 PM"
    ],
    "author": "IT Infrastructure Team"
  },
  {
    "id": "ann-3",
    "title": "Campus Water Pipeline Disinfection & Pressure Test",
    "category": "Plumbing",
    "date": "Sunday · 6:00 AM – 9:00 AM",
    "badge": "Planned",
    "severity": "Warning",
    "sender": "Ramesh Nair · Plumbing & Water Management Specialist",
    "description": "Overhead distribution reservoir tanks and supply mains to Hostel Block C and Dining Hall are undergoing hydraulic pressure integrity testing and eco-friendly UV sanitization.",
    "impactedLocations": [
      "Hostel Block C (Wings 1, 2, 3)",
      "Student Dining Hall · South Wing Kitchen",
      "Recreation Center Ground Floor Washrooms"
    ],
    "safetyChecklist": [
      "Store sufficient emergency potable water in provided hostel floor dispensers",
      "Keep all washbasin taps closed to prevent airlock pressure surges upon restoration",
      "Let cold water taps run for 60 seconds after 9:00 AM until clarity stabilizes"
    ],
    "author": "Facilities Ops"
  },
  {
    "id": "ann-4",
    "title": "Quarterly Fire Safety System Inspection & Alarm Drill",
    "category": "Facilities",
    "date": "Next Tuesday · 11:30 AM",
    "badge": "Safety",
    "severity": "Critical",
    "sender": "Dr. Ananya Sen · Dean of Infrastructure & Campus Operations",
    "description": "Full-spectrum inspection of smoke detectors, fire dampeners, emergency strobe sounders, and riser hydrants across all academic blocks.",
    "impactedLocations": [
      "Main Academic Building & Administrative Wing",
      "Computer Center · Labs 401 - 412",
      "Chemistry & Materials Engineering Laboratories"
    ],
    "safetyChecklist": [
      "Strobe lights and high-decibel horns will pulse 3 times; no building evacuation required",
      "Keep stairwell fire exit push-bars unobstructed at all times",
      "Verify fire warden first-responder kits in each departmental office"
    ],
    "author": "Campus Safety Committee"
  }
];

// Activity Timeline Mock Data
export const mockActivities = [
  {
    id: "act-1",
    title: "Gigabit Ethernet Wall Port Disconnected logged",
    time: "1 hour ago",
    user: "Neev Rambhia",
    type: "report",
    badge: "Reported"
  },
  {
    id: "act-2",
    title: "Technician assigned to Block B Leakage",
    time: "2 hours ago",
    user: "Ramesh Nair (Plumbing Specialist)",
    type: "assign",
    badge: "In Progress"
  },
  {
    id: "act-3",
    title: "Fume Hood Exhaust Motor dispatched to Suresh Kumar",
    time: "3 hours ago",
    user: "Dr. Ananya Sen (Dean)",
    type: "progress",
    badge: "In Progress"
  },
  {
    id: "act-4",
    title: "Projector HDMI repair queued for triage",
    time: "4 hours ago",
    user: "Priya Sharma",
    type: "report",
    badge: "Reported"
  },
  {
    id: "act-5",
    title: "Cafeteria Handwash Basin drain trap assigned to Ramesh Nair",
    time: "5 hours ago",
    user: "Campus Facilities Ops",
    type: "progress",
    badge: "In Progress"
  },
  {
    id: "act-6",
    title: "Gym Cable Cross Machine Grip replaced & verified",
    time: "Yesterday",
    user: "Estate General Crew",
    type: "resolve",
    badge: "Resolved"
  }
];

// Analytics Data
export const mockAnalytics = {
  categoryDistribution: [
    { category: "IT / Network", count: 4, percentage: 25, color: "#2563EB" },
    { category: "Electrical", count: 4, percentage: 25, color: "#D97706" },
    { category: "Plumbing", count: 3, percentage: 18.75, color: "#004643" },
    { category: "Facilities", count: 2, percentage: 12.5, color: "#059669" },
    { category: "Furniture", count: 2, percentage: 12.5, color: "#7C3AED" },
    { category: "Electronics", count: 1, percentage: 6.25, color: "#E11D48" }
  ],
  priorityDistribution: [
    { level: "High", count: 7, percentage: 43.75, color: "#BE123C" },
    { level: "Medium", count: 5, percentage: 31.25, color: "#B45309" },
    { level: "Low", count: 4, percentage: 25, color: "#004643" }
  ],
  statusDistribution: [
    { status: "Reported", count: 6, percentage: 37.5, color: "#9F1239" },
    { status: "In Progress", count: 6, percentage: 37.5, color: "#B45309" },
    { status: "Resolved", count: 4, percentage: 25, color: "#047857" }
  ]
};

// Help FAQs
export const mockFaqs = [
  {
    q: "How do I report a new campus issue?",
    a: "Click on '+ Report Issue' in the left sidebar or top bar. Fill out the location, category, priority, and description, then click Submit. Your issue will be immediately synced to Google Firebase."
  },
  {
    q: "How can I track my submitted reports?",
    a: "Navigate to the 'My Reports' tab from the sidebar to view all issues reported by you alongside live status badges and technician resolution progress."
  },
  {
    q: "What does 'In Progress' mean?",
    a: "'In Progress' indicates that a maintenance technician or department engineer has been assigned and is actively working on resolving the issue on site."
  },
  {
    q: "How long does resolution usually take?",
    a: "High Priority safety or water issues are typically addressed within 2-4 hours. General repairs take 24-48 hours depending on parts availability."
  },
  {
    q: "Who handles electrical and IT issues?",
    a: "Electrical issues are assigned to Campus Maintenance Operations, while IT/Network tickets are routed to the Central IT Infrastructure Team."
  }
];

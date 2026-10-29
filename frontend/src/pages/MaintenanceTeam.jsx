import React from 'react';
import { PageHeader } from '../components/common/CommonComponents';
import { Wrench, Phone, Mail, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export function MaintenanceTeam() {
  const team = [
    { 
      id: 1, 
      name: "Suresh Kumar", 
      role: "Lead Maintenance Technician", 
      dept: "Campus Facilities & Electrical Maintenance", 
      status: "Active On Duty", 
      phone: "+91 98765 11001", 
      zone: "Academic Blocks A & B · Substation",
      username: "suresh"
    },
    { 
      id: 2, 
      name: "Vikram Rao", 
      role: "IT & AV Network Lead", 
      dept: "IT & Audio-Visual Systems", 
      status: "Active On Duty", 
      phone: "+91 98765 11002", 
      zone: "Central Library · Auditorium · Labs",
      username: "vikram"
    },
    { 
      id: 3, 
      name: "Ramesh Nair", 
      role: "Plumbing Specialist", 
      dept: "Plumbing & Water Management", 
      status: "Active On Duty", 
      phone: "+91 98765 11003", 
      zone: "Hostel Blocks C & D · Dining Hall",
      username: "ramesh"
    },
    { 
      id: 4, 
      name: "Rajesh Sharma", 
      role: "HVAC & Facilities Technician", 
      dept: "Air Conditioning & Ventilation Support", 
      status: "Active On Duty", 
      phone: "+91 98765 11004", 
      zone: "Computer Center · Seminar Halls",
      username: "rajesh.tech"
    },
    { 
      id: 5, 
      name: "Estate General Crew", 
      role: "Campus General Operations Crew", 
      dept: "Estate Maintenance & Ground Facilities", 
      status: "Active On Duty", 
      phone: "+91 98765 11005", 
      zone: "Sports Complex · Workshop · Grounds",
      username: "estate"
    },
    { 
      id: 6, 
      name: "Dr. Ananya Sen", 
      role: "Dean of Infrastructure & Operations", 
      dept: "Campus Operations Directorate", 
      status: "Directorate Office", 
      phone: "+91 98765 11000", 
      zone: "Administrative Directorate",
      username: "admin"
    }
  ];

  return (
    <div className="maintenance-team-page space-y">
      <PageHeader
        title="Campus Maintenance Team Roster"
        subtitle="On-duty engineers and maintenance leads assigned to campus operational zones."
      />

      <div className="issue-grid-saas">
        {team.map((m) => (
          <div key={m.id} className="team-member-card">
            <div className="member-avatar" style={{ backgroundColor: m.username === 'admin' ? '#004643' : undefined, color: '#fff' }}>
              {m.name.charAt(0)}
            </div>
            <div className="member-info">
              <h3 className="member-name">{m.name}</h3>
              <p className="member-role">{m.role}</p>
              <span className="member-dept">{m.dept}</span>
              <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>
                Operational Zone: <strong style={{ color: '#0F172A' }}>{m.zone}</strong>
              </p>
              <p style={{ fontSize: '0.7rem', color: '#94A3B8', marginTop: '2px' }}>
                Login ID: <code>{m.username}</code>
              </p>
            </div>

            <div className="member-status-row">
              <span className={`badge ${m.status.includes('Active') ? 'badge-status-resolved' : 'badge-status-progress'}`}>
                <CheckCircle2 size={12} style={{ marginRight: '4px' }} />
                {m.status}
              </span>
              <span className="member-phone font-mono">{m.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaintenanceTeam;

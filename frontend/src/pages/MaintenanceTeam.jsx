import React from 'react';
import { PageHeader } from '../components/common/CommonComponents';
import { Wrench, Phone, Mail, CheckCircle2 } from 'lucide-react';

export function MaintenanceTeam() {
  const team = [
    { id: 1, name: "Rajesh Kumar", role: "Maintenance Lead Lead", dept: "Electrical & Power", status: "Active On Duty", phone: "+91 98765 11001" },
    { id: 2, name: "Suresh Patil", role: "Senior Technician", dept: "Plumbing & Water Supply", status: "Active On Duty", phone: "+91 98765 11002" },
    { id: 3, name: "Vikram Singh", role: "Network Engineer", dept: "IT & Wi-Fi Infrastructure", status: "Active On Duty", phone: "+91 98765 11003" },
    { id: 4, name: "Anita Rao", role: "Facilities Manager", dept: "Furniture & Civil Repair", status: "In Workshop", phone: "+91 98765 11004" }
  ];

  return (
    <div className="maintenance-team-page space-y">
      <PageHeader
        title="Campus Maintenance Team Roster"
        subtitle="On-duty engineers and maintenance leads assigned to campus zones."
      />

      <div className="issue-grid-saas">
        {team.map((m) => (
          <div key={m.id} className="team-member-card">
            <div className="member-avatar">
              {m.name.charAt(0)}
            </div>
            <div className="member-info">
              <h3 className="member-name">{m.name}</h3>
              <p className="member-role">{m.role}</p>
              <span className="member-dept">{m.dept}</span>
            </div>

            <div className="member-status-row">
              <span className="badge badge-status-resolved">
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

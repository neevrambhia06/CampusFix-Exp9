import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

export function IssueTimeline(props) {
  const { status = 'Reported' } = props;

  const steps = [
    {
      key: 'Reported',
      title: 'Issue Reported',
      desc: 'Ticket logged into CampusFix database and queued for triage.',
      time: 'Completed',
      done: true
    },
    {
      key: 'Assigned',
      title: 'Technician Assigned',
      desc: 'Maintenance lead assigned to inspect location and materials.',
      time: status === 'Reported' ? 'Pending' : 'Completed',
      done: status === 'In Progress' || status === 'Resolved'
    },
    {
      key: 'In Progress',
      title: 'Work In Progress',
      desc: 'Active repairs being conducted by maintenance team.',
      time: status === 'In Progress' ? 'Active Now' : status === 'Resolved' ? 'Completed' : 'Upcoming',
      done: status === 'In Progress' || status === 'Resolved'
    },
    {
      key: 'Resolved',
      title: 'Resolved & Closed',
      desc: 'Final inspection verified. Ticket officially closed.',
      time: status === 'Resolved' ? 'Completed' : 'Pending',
      done: status === 'Resolved'
    }
  ];

  return (
    <div className="issue-vertical-timeline font-body">
      <h3 className="timeline-section-title">Resolution Workflow Progress</h3>
      <div className="timeline-steps">
        {steps.map((step, idx) => (
          <div 
            key={step.key} 
            className={`timeline-step-item ${step.done ? 'step-done' : ''} ${status === step.key ? 'step-active' : ''}`}
          >
            <div className="step-marker">
              {step.done ? (
                <CheckCircle2 size={16} className="marker-icon-done" />
              ) : (
                <span className="marker-number">{idx + 1}</span>
              )}
            </div>
            <div className="step-content">
              <div className="step-header-row">
                <h4 className="step-title">{step.title}</h4>
                <span className={`step-time-badge ${step.done ? 'badge-done' : ''}`}>
                  {step.time}
                </span>
              </div>
              <p className="step-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IssueTimeline;

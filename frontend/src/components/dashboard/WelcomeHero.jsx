import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowRight, Sparkles } from 'lucide-react';

export function WelcomeHero(props) {
  const { user } = props;
  const navigate = useNavigate();

  return (
    <div className="welcome-hero-card">
      <div className="welcome-hero-content">
        <div className="welcome-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Campus Maintenance Portal</span>
        </div>
        <h1 className="welcome-title">
          {user ? `Good day, ${user.name.split(' ')[0]}.` : 'Welcome to Fixora Campus Hub.'}
        </h1>
        <p className="welcome-subtitle">
          {user 
            ? "Here's what's happening across your campus today. Report issues, track live repairs, and check maintenance schedules."
            : "Explore active maintenance requests, review live campus facilities status, or sign in to track your personal tickets."}
        </p>

        <div className="welcome-actions">
          <button
            onClick={() => navigate('/report')}
            className="btn btn-primary"
          >
            <PlusCircle size={18} />
            <span>+ Report an Issue</span>
          </button>

          <button
            onClick={() => navigate('/my-reports')}
            className="btn btn-secondary"
          >
            <span>View My Reports</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeHero;

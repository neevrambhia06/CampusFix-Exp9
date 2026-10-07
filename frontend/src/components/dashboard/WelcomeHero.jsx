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
          Good morning, {user ? user.name.split(' ')[0] : 'Aarav'}.
        </h1>
        <p className="welcome-subtitle">
          Here's what's happening across your campus today. Report issues, track live repairs, and check maintenance schedules.
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

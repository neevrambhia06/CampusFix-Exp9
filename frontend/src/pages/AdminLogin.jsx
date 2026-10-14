import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { useCampusFix } from '../context/CampusFixContext';

export function AdminLogin() {
  const { login, isAdmin, currentUser } = useCampusFix();
  const navigate = useNavigate();

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already admin, redirect to admin dashboard
  if (isAdmin) {
    return (
      <div className="state-box" style={{ maxWidth: '500px', margin: '4rem auto' }}>
        <ShieldCheck size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
        <h2 className="state-title">Already Logged In as Admin</h2>
        <p className="state-message">
          You are currently signed in as <strong>{currentUser.name}</strong>.
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button onClick={() => navigate('/admin')} className="btn btn-primary">
            Go to Admin Dashboard
          </button>
          <Link to="/dashboard" className="btn btn-secondary">
            Return to User Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      await login(username, password);
      navigate('/admin');
    } catch (err) {
      setErrorMessage(err.message || 'Invalid username or password. Use admin / admin');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin');
    setErrorMessage('');
  };

  return (
    <div className="admin-login-wrapper" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem 2rem', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Header Icon & Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            backgroundColor: 'var(--primary-light)',
            color: 'var(--primary)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <ShieldCheck size={32} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
            Fixora Admin Portal
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Sign in with administrative credentials to manage campus tickets.
          </p>
        </div>

        {/* Demo Credentials Tip Banner */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          border: '1px dashed var(--border-light)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.825rem'
        }}>
          <div>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Demo Access: </span>
            <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>admin</code> / <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>admin</code>
          </div>
          <button
            type="button"
            onClick={handleFillDemo}
            className="btn btn-sm btn-secondary"
            style={{ padding: '3px 8px', fontSize: '0.75rem' }}
          >
            Auto-fill
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div style={{
            backgroundColor: 'var(--status-reported-bg)',
            color: 'var(--status-reported-text)',
            border: '1px solid var(--status-reported-border)',
            borderRadius: 'var(--radius-md)',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={14} />
              <span>Username</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              className="form-input"
              style={{ width: '100%' }}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <KeyRound size={14} />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="form-input"
              style={{ width: '100%' }}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem' }}
          >
            {loading ? (
              <span>Verifying Credentials...</span>
            ) : (
              <>
                <Lock size={16} style={{ marginRight: '6px' }} />
                <span>Log In as Administrator</span>
                <ArrowRight size={16} style={{ marginLeft: '6px' }} />
              </>
            )}
          </button>
        </form>

        {/* Bottom Navigation */}
        <div style={{ marginTop: '2rem', textAlign: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem' }}>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={14} />
            <span>Return to Fixora Student Portal</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;

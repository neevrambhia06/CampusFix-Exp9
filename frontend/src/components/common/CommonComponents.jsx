import React from 'react';

export function Button(props) {
  const { 
    children, 
    variant = 'primary', 
    size = 'md', 
    onClick, 
    type = 'button',
    disabled = false,
    className = '',
    icon: Icon = null
  } = props;

  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`.trim()}
    >
      {Icon && <Icon className="btn-icon" size={16} />}
      <span>{children}</span>
    </button>
  );
}

export function Badge(props) {
  const { children, type = 'default', className = '' } = props;
  return (
    <span className={`badge badge-${type} ${className}`.trim()}>
      {children}
    </span>
  );
}

export function PageHeader(props) {
  const { title, subtitle, action } = props;
  return (
    <div className="page-header">
      <div className="page-header-text">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </div>
  );
}

export function SectionHeader(props) {
  const { title, subtitle, action } = props;
  return (
    <div className="section-header">
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
}

export function LoadingState(props) {
  const { message = 'Loading campus data...' } = props;
  return (
    <div className="state-box">
      <div className="loading-spinner"></div>
      <h3 className="state-title">Fetching Data</h3>
      <p className="state-message">{message}</p>
    </div>
  );
}

export function EmptyState(props) {
  const { 
    icon: Icon = null, 
    title = 'No Records Found', 
    description = 'There are no items matching your criteria.',
    action = null
  } = props;
  return (
    <div className="empty-state">
      <div className="empty-icon-wrapper">
        {Icon ? <Icon size={32} /> : '📋'}
      </div>
      <h3 className="empty-title">{title}</h3>
      <p className="empty-description">{description}</p>
      {action && <div style={{ marginTop: '1.25rem' }}>{action}</div>}
    </div>
  );
}

export function ErrorState(props) {
  const { title = 'API Connection Error', message, onRetry, onSwitchMock } = props;
  return (
    <div className="state-box error-box">
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
      <p className="error-tip">
        Please check your internet connection or verify that the Fixora API backend service is running.
      </p>
      <div className="error-actions">
        {onRetry && (
          <button onClick={onRetry} className="btn btn-primary btn-sm">
            Retry REST API Connection
          </button>
        )}
        {onSwitchMock && (
          <button onClick={onSwitchMock} className="btn btn-secondary btn-sm">
            Use Static mockData.js
          </button>
        )}
      </div>
    </div>
  );
}

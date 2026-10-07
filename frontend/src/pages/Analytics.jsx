import React from 'react';
import { PageHeader } from '../components/common/CommonComponents';
import { mockAnalytics } from '../data/mockData';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

export function Analytics() {
  return (
    <div className="analytics-page space-y">
      <PageHeader
        title="Issue Analytics & Distribution"
        subtitle="Visual metrics breakdown of campus maintenance tickets by category, status, and priority."
      />

      <div className="analytics-grid">
        {/* Category Breakdown SVG Bar Visualization */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <BarChart3 size={18} className="analytics-icon" />
            <h3 className="analytics-card-title">Issues by Category</h3>
          </div>
          <p className="analytics-card-subtitle">Volume breakdown across campus departments</p>

          <div className="bar-charts-list">
            {mockAnalytics.categoryDistribution.map((cat) => (
              <div key={cat.category} className="chart-bar-item">
                <div className="bar-label-row">
                  <span className="bar-category-name">{cat.category}</span>
                  <span className="bar-value-text">{cat.count} tickets ({cat.percentage}%)</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill"
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <PieChart size={18} className="analytics-icon" />
            <h3 className="analytics-card-title">Priority Breakdown</h3>
          </div>
          <p className="analytics-card-subtitle">Severity level breakdown of logged tickets</p>

          <div className="bar-charts-list">
            {mockAnalytics.priorityDistribution.map((p) => (
              <div key={p.level} className="chart-bar-item">
                <div className="bar-label-row">
                  <span className="bar-category-name">{p.level} Priority</span>
                  <span className="bar-value-text">{p.count} tickets ({p.percentage}%)</span>
                </div>
                <div className="bar-track">
                  <div 
                    className="bar-fill"
                    style={{ width: `${p.percentage}%`, backgroundColor: p.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Distribution */}
        <div className="analytics-card full-width">
          <div className="analytics-card-header">
            <TrendingUp size={18} className="analytics-icon" />
            <h3 className="analytics-card-title">Status Resolution Distribution</h3>
          </div>
          <p className="analytics-card-subtitle">Current workflow lifecycle stage distribution</p>

          <div className="status-progress-bars">
            {mockAnalytics.statusDistribution.map((st) => (
              <div key={st.status} className="status-distribution-col">
                <div className="status-col-value font-heading">{st.count}</div>
                <div className="status-col-label">{st.status}</div>
                <div className="status-col-percent font-mono">{st.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;

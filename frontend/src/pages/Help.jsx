import React from 'react';
import { PageHeader } from '../components/common/CommonComponents';
import { mockFaqs } from '../data/mockData';
import { HelpCircle, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export function Help() {
  return (
    <div className="help-page space-y">
      <PageHeader
        title="Help & Support Desk"
        subtitle="Frequently asked questions, maintenance SLAs, and contact details for campus operations."
      />

      <div className="help-layout-grid">
        {/* FAQs List */}
        <div className="help-faqs-section space-y">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faqs-list">
            {mockFaqs.map((faq, idx) => (
              <div key={idx} className="faq-item-card">
                <h3 className="faq-question">
                  <HelpCircle size={18} className="faq-icon" />
                  <span>{faq.q}</span>
                </h3>
                <p className="faq-answer">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Maintenance Side Panel */}
        <div className="help-contact-section">
          <div className="contact-panel-card">
            <h3 className="panel-title">Need Urgent Assistance?</h3>
            <p className="panel-subtitle">Contact Campus Maintenance Control Desk directly for high priority emergencies.</p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <Mail size={18} className="contact-icon" />
                <div>
                  <span className="contact-label">Email Support</span>
                  <span className="contact-value">maintenance@campus.edu</span>
                </div>
              </div>

              <div className="contact-info-item">
                <Phone size={18} className="contact-icon" />
                <div>
                  <span className="contact-label">Emergency Control Room</span>
                  <span className="contact-value">+91 (022) 2845-9900</span>
                </div>
              </div>

              <div className="contact-info-item">
                <MapPin size={18} className="contact-icon" />
                <div>
                  <span className="contact-label">Physical Office</span>
                  <span className="contact-value">Main Building · Ground Floor Room 002</span>
                </div>
              </div>
            </div>

            <div className="panel-divider"></div>

            <div className="contact-hours-box">
              <strong>Support Hours:</strong>
              <p>Mon – Sat: 8:00 AM – 8:00 PM</p>
              <p>Emergency Services: 24/7 Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;

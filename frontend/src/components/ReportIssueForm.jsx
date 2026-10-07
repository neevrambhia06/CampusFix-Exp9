import React, { useState, useRef, useEffect } from 'react';
import { useCampusFix } from '../context/CampusFixContext';
import { PlusCircle, CheckCircle2 } from 'lucide-react';

export function ReportIssueForm({ onSuccessReturn }) {
  const { currentUser, addIssue } = useCampusFix();

  // 1. Controlled Inputs State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Plumbing',
    location: '',
    priority: 'Medium',
    reportedBy: currentUser ? currentUser.name : 'Aarav Shah',
    description: '',
  });

  // 2. Validation Errors State
  const [errors, setErrors] = useState({});

  // 3. UI Feedback States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 4. useRef to focus the Title input automatically
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  // Update reportedBy if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({ ...prev, reportedBy: currentUser.name }));
    }
  }, [currentUser]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long.';
    }

    if (!formData.category) {
      newErrors.category = 'Category must be selected.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location details are required.';
    }

    if (!formData.priority) {
      newErrors.priority = 'Priority level must be selected.';
    }

    if (!formData.reportedBy.trim()) {
      newErrors.reportedBy = 'Reported By field must be provided.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const issuePayload = {
      title: formData.title.trim(),
      category: formData.category,
      location: formData.location.trim(),
      priority: formData.priority,
      status: 'Reported',
      reporter: formData.reportedBy.trim(),
      reportedBy: formData.reportedBy.trim(),
      reportedAt: 'Just now',
      updatedAt: 'Just now',
      description: formData.description.trim(),
    };

    try {
      await addIssue(issuePayload);
      setSubmitSuccess(true);
      
      // Reset Form State
      setFormData({
        title: '',
        category: 'Plumbing',
        location: '',
        priority: 'Medium',
        reportedBy: currentUser ? currentUser.name : 'Aarav Shah',
        description: '',
      });
      setErrors({});

      // Re-focus title input using useRef
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    } catch (err) {
      console.error('Submit failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAnother = () => {
    setSubmitSuccess(false);
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 50);
  };

  return (
    <div className="report-form-wrapper">
      {submitSuccess ? (
        <div className="state-box success-box">
          <CheckCircle2 size={48} className="success-icon-svg" />
          <h2 className="state-title">Issue Reported Successfully!</h2>
          <p className="state-message">
            Issue reported successfully. The ticket has been sent to JSON Server and registered into CampusFix shared state.
          </p>
          <div className="success-actions">
            {onSuccessReturn && (
              <button onClick={onSuccessReturn} className="btn btn-primary">
                View Issues List
              </button>
            )}
            <button onClick={handleResetAnother} className="btn btn-secondary">
              Report Another Issue
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="report-form-saas" noValidate>
          {/* Section 1: Issue Details */}
          <div className="form-section">
            <div className="form-section-header">
              <span className="section-step">1</span>
              <div>
                <h3 className="form-section-title">Issue Information</h3>
                <p className="form-section-desc">Provide title and choose category/priority.</p>
              </div>
            </div>

            <div className="form-group-grid">
              {/* Title Field (ref for autofocus) */}
              <div className="form-group full-width">
                <label htmlFor="issue-title" className="form-label-saas">
                  Issue Title *
                </label>
                <input
                  id="issue-title"
                  ref={titleInputRef}
                  name="title"
                  type="text"
                  placeholder="e.g. Water Leakage near Lab 302 AC Unit"
                  value={formData.title}
                  onChange={handleChange}
                  className={`form-input-saas ${errors.title ? 'input-error' : ''}`}
                />
                {errors.title ? (
                  <span className="field-error-message">{errors.title}</span>
                ) : (
                  <span className="form-helper">Minimum 5 characters required.</span>
                )}
              </div>

              {/* Category Field */}
              <div className="form-group">
                <label htmlFor="issue-category" className="form-label-saas">
                  Category *
                </label>
                <select
                  id="issue-category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`form-select-saas ${errors.category ? 'input-error' : ''}`}
                >
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Cleanliness">Cleanliness</option>
                  <option value="IT / Network">IT / Network</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <span className="field-error-message">{errors.category}</span>
                )}
              </div>

              {/* Priority Field */}
              <div className="form-group">
                <label htmlFor="issue-priority" className="form-label-saas">
                  Priority *
                </label>
                <select
                  id="issue-priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className={`form-select-saas ${errors.priority ? 'input-error' : ''}`}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && (
                  <span className="field-error-message">{errors.priority}</span>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Location */}
          <div className="form-section">
            <div className="form-section-header">
              <span className="section-step">2</span>
              <div>
                <h3 className="form-section-title">Campus Location</h3>
                <p className="form-section-desc">Building, floor, or room number.</p>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="issue-location" className="form-label-saas">
                Location *
              </label>
              <input
                id="issue-location"
                name="location"
                type="text"
                placeholder="e.g. Academic Block B · 3rd Floor Room 302"
                value={formData.location}
                onChange={handleChange}
                className={`form-input-saas ${errors.location ? 'input-error' : ''}`}
              />
              {errors.location && (
                <span className="field-error-message">{errors.location}</span>
              )}
            </div>
          </div>

          {/* Section 3: Description */}
          <div className="form-section">
            <div className="form-section-header">
              <span className="section-step">3</span>
              <div>
                <h3 className="form-section-title">Description & Details</h3>
                <p className="form-section-desc">Describe the issue clearly.</p>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="issue-description" className="form-label-saas">
                Description *
              </label>
              <textarea
                id="issue-description"
                name="description"
                rows="4"
                placeholder="Describe what is broken, when it started, and any hazards..."
                value={formData.description}
                onChange={handleChange}
                className={`form-textarea-saas ${errors.description ? 'input-error' : ''}`}
              />
              {errors.description ? (
                <span className="field-error-message">{errors.description}</span>
              ) : (
                <span className="form-helper">Minimum 10 characters required.</span>
              )}
            </div>
          </div>

          {/* Section 4: Reported By */}
          <div className="form-section">
            <div className="form-section-header">
              <span className="section-step">4</span>
              <div>
                <h3 className="form-section-title">Reporter Details</h3>
                <p className="form-section-desc">User associated with this maintenance request.</p>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="issue-reportedBy" className="form-label-saas">
                Reported By *
              </label>
              <input
                id="issue-reportedBy"
                name="reportedBy"
                type="text"
                value={formData.reportedBy}
                onChange={handleChange}
                className={`form-input-saas ${errors.reportedBy ? 'input-error' : ''}`}
              />
              {errors.reportedBy && (
                <span className="field-error-message">{errors.reportedBy}</span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions-bar">
            {onSuccessReturn && (
              <button
                type="button"
                onClick={onSuccessReturn}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              <PlusCircle size={18} />
              <span>{isSubmitting ? 'Submitting Issue...' : 'Submit Issue'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReportIssueForm;

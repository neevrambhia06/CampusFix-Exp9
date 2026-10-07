import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/common/CommonComponents';
import ReportIssueForm from '../components/ReportIssueForm';
import { ArrowLeft } from 'lucide-react';

export function ReportIssue() {
  const navigate = useNavigate();

  return (
    <div className="report-issue-page space-y">
      <PageHeader
        title="Report a Campus Issue"
        subtitle="Help us keep the campus running smoothly by reporting maintenance, electrical, or facilities problems."
        action={
          <button
            onClick={() => navigate('/issues')}
            className="btn btn-secondary"
          >
            <ArrowLeft size={16} />
            <span>Cancel & Return</span>
          </button>
        }
      />

      <ReportIssueForm onSuccessReturn={() => navigate('/issues')} />
    </div>
  );
}

export default ReportIssue;


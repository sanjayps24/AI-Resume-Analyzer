import React, { useState } from 'react';
import { Target, ChevronDown, ChevronUp } from 'lucide-react';

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (jd: string) => void;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  setJobDescription
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card" style={{ padding: '1.25rem 1.75rem', marginTop: '1.25rem' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(168, 85, 247, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Target size={20} color="var(--accent-secondary)" />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem' }}>Target Job Description Matcher (Optional)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Paste target job posting to get role-specific ATS match score & missing keywords
            </p>
          </div>
        </div>

        <div style={{ color: 'var(--text-muted)' }}>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isOpen && (
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div className="form-group">
            <label className="form-label">Job Posting Requirements</label>
            <textarea
              className="form-textarea"
              rows={5}
              placeholder="Paste the full job description or key requirements here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

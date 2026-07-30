import React from 'react';
import { Loader2, CheckCircle2, Cpu, FileSearch, Sparkles } from 'lucide-react';

interface AnalysisProgressProps {
  currentStage: number; // 0, 1, 2, 3
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ currentStage }) => {
  const stages = [
    { title: 'Parsing File Content', desc: 'Extracting text, sections, and structural headers' },
    { title: 'Keyword & Metric Audit', desc: 'Scanning hard skills, soft skills, and action verbs' },
    { title: 'Gemini AI Intelligence Evaluation', desc: 'Running deep ATS scoring & impact assessment' },
    { title: 'Synthesizing Actionable Feedback', desc: 'Generating bullet point rewrites & optimization tips' }
  ];

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2.5rem 2rem', textAlign: 'center', margin: '2rem 0' }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        background: 'var(--gradient-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem auto',
        boxShadow: 'var(--shadow-glow)'
      }}>
        <Loader2 size={32} color="#ffffff" className="spin" />
      </div>

      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Analyzing Your Resume with Gemini AI...</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>
        Please wait while our AI engine evaluates your resume against industry ATS standards.
      </p>

      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {stages.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: isCurrent ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-secondary)',
                border: `1px solid ${isCurrent ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ flexShrink: 0 }}>
                {isDone ? (
                  <CheckCircle2 size={22} color="var(--accent-emerald)" />
                ) : isCurrent ? (
                  <Loader2 size={22} color="var(--accent-primary)" className="spin" />
                ) : (
                  <div style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: '2px solid var(--text-muted)',
                    opacity: 0.5
                  }} />
                )}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: isCurrent ? 'var(--accent-primary)' : isDone ? 'var(--text-primary)' : 'var(--text-muted)'
                }}>
                  {stage.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stage.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

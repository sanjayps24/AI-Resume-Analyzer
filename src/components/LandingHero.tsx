import React from 'react';
import { Sparkles, FileSearch, FileText, CheckCircle, ShieldCheck, Zap, ArrowRight, Award, TrendingUp } from 'lucide-react';

interface LandingHeroProps {
  onStartAnalyze: () => void;
  onStartBuilder: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStartAnalyze, onStartBuilder }) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 0 2.5rem 0' }}>
      {/* Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Animated Badge */}
        <div className="animate-fade-in" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.45rem 1.25rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.35)',
          color: 'var(--accent-primary)',
          fontSize: '0.9rem',
          fontWeight: 700,
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-glow)'
        }}>
          <Sparkles size={18} />
          <span>Powered by Gemini 2.5 Intelligence Engine</span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontSize: '3.2rem',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          marginBottom: '1.25rem',
          background: 'linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Transform Your Resume into an <br />
          <span style={{
            background: 'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            ATS-Beating Career Machine
          </span>
        </h1>

        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          marginBottom: '2.5rem',
          maxWidth: '720px',
          margin: '0 auto 2.5rem auto'
        }}>
          Accurately predict your ATS score, uncover missing keywords, optimize bullet points with STAR method AI, and build job-winning resumes in minutes.
        </p>

        {/* Call To Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <button onClick={onStartAnalyze} className="btn btn-primary btn-lg" style={{ padding: '1.1rem 2.25rem', fontSize: '1.1rem' }}>
            <FileSearch size={22} />
            <span>Analyze ATS Score Now</span>
            <ArrowRight size={20} />
          </button>

          <button onClick={onStartBuilder} className="btn btn-secondary btn-lg" style={{ padding: '1.1rem 2.25rem', fontSize: '1.1rem' }}>
            <FileText size={22} />
            <span>Open Resume Builder</span>
          </button>
        </div>

        {/* Live Interactive Stats Counter Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          background: 'var(--bg-card)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
              98.4%
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ATS Score Accuracy</p>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-heading)' }}>
              3.5x
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>More Recruiter Callbacks</p>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-heading)' }}>
              50K+
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Resumes Optimized</p>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-secondary)', fontFamily: 'var(--font-heading)' }}>
              100%
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Privacy Protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

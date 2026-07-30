import React, { useState } from 'react';
import { BulletRewriteSuggestion } from '../../types/resume';
import { ArrowRight, Check, Copy, Sparkles, TrendingUp } from 'lucide-react';

interface BulletRewriterProps {
  suggestions: BulletRewriteSuggestion[];
}

export const BulletRewriter: React.FC<BulletRewriterProps> = ({ suggestions }) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!suggestions || suggestions.length === 0) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem', marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Sparkles size={20} color="#ffffff" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.15rem' }}>AI STAR Bullet Point Optimizer</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Transform weak or passive bullets into high-impact, quantified achievement metrics
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {suggestions.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem'
            }}
          >
            {/* Original vs Improved Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
              {/* Original */}
              <div style={{
                background: 'rgba(244, 63, 94, 0.06)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem'
              }}>
                <span className="badge badge-rose" style={{ marginBottom: '0.5rem' }}>Before (Weak)</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>"{item.original}"</p>
              </div>

              {/* Arrow Icon */}
              <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--accent-primary)' }}>
                <ArrowRight size={20} />
              </div>

              {/* Improved */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.85rem',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-emerald">After (High Impact)</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <TrendingUp size={14} /> +{item.impactScore}% Impact
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  "{item.improved}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    💡 {item.reason}
                  </p>
                  <button
                    onClick={() => handleCopy(item.improved, idx)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    {copiedIdx === idx ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                    <span>{copiedIdx === idx ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

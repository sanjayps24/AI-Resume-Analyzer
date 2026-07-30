import React from 'react';

interface ScoreGaugeProps {
  score: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  size?: number;
  strokeWidth?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  grade,
  size = 180,
  strokeWidth = 14
}) => {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Determine color based on score
  let scoreColor = 'var(--accent-emerald)';
  let gradeBadgeClass = 'badge-emerald';

  if (score < 60) {
    scoreColor = 'var(--accent-rose)';
    gradeBadgeClass = 'badge-rose';
  } else if (score < 80) {
    scoreColor = 'var(--accent-amber)';
    gradeBadgeClass = 'badge-amber';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--bg-tertiary)"
          strokeWidth={strokeWidth}
        />
        {/* Score Fill Line */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s ease-out, stroke 0.5s ease' }}
        />
      </svg>

      {/* Score Center Text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
          {score}
          <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>%</span>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          ATS SCORE
        </p>
      </div>

      {/* Grade Badge */}
      <div style={{ marginTop: '0.5rem' }}>
        <span className={`badge ${gradeBadgeClass}`} style={{ fontSize: '0.9rem', padding: '0.3rem 0.9rem' }}>
          Grade: {grade}
        </span>
      </div>
    </div>
  );
};

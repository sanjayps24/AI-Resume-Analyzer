import React, { useState } from 'react';
import { AtsAnalysisResult } from '../../types/resume';
import { ScoreGauge } from './ScoreGauge';
import { BulletRewriter } from './BulletRewriter';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Zap,
  Target,
  ArrowRight,
  Sparkles,
  BarChart3,
  ListChecks,
  Briefcase
} from 'lucide-react';

interface AnalysisResultsProps {
  result: AtsAnalysisResult;
  onImportToBuilder?: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, onImportToBuilder }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'rewrites' | 'jobmatch'>('overview');

  const categoryList = [
    result.categoryScores.impact,
    result.categoryScores.formatting,
    result.categoryScores.skills,
    result.categoryScores.quantification,
    result.categoryScores.completeness
  ].filter(Boolean);

  return (
    <div className="animate-fade-in" style={{ marginTop: '2rem' }}>
      {/* Top Banner & Main Score Card */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center'
        }}>
          {/* Gauge & Grade */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ScoreGauge score={result.overallScore} grade={result.atsGrade} />
          </div>

          {/* Summary Feedback */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={20} color="var(--accent-primary)" />
              <h2 style={{ fontSize: '1.4rem' }}>Executive AI Assessment</h2>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              {result.summaryFeedback}
            </p>

            {/* Recommended Job Roles */}
            {result.recommendedJobTitles && result.recommendedJobTitles.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
                  OPTIMIZED FOR ROLES LIKE:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {result.recommendedJobTitles.map((role, idx) => (
                    <span key={idx} className="badge badge-indigo" style={{ textTransform: 'none' }}>
                      <Briefcase size={12} /> {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Import Button */}
            {onImportToBuilder && (
              <button onClick={onImportToBuilder} className="btn btn-primary">
                <span>Fix & Rebuild in Resume Builder</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation for Results */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '1.5rem',
        overflowX: 'auto'
      }}>
        <button
          className={`btn btn-sm ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={16} />
          <span>Category Scores</span>
        </button>

        <button
          className={`btn btn-sm ${activeTab === 'keywords' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('keywords')}
        >
          <ListChecks size={16} />
          <span>Keywords Audit ({result.matchedKeywords?.length || 0})</span>
        </button>

        <button
          className={`btn btn-sm ${activeTab === 'rewrites' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('rewrites')}
        >
          <Zap size={16} />
          <span>AI Bullet Rewrites ({result.bulletRewrites?.length || 0})</span>
        </button>

        {result.targetRoleMatch && (
          <button
            className={`btn btn-sm ${activeTab === 'jobmatch' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('jobmatch')}
          >
            <Target size={16} />
            <span>Job Match ({result.targetRoleMatch.matchScore}%)</span>
          </button>
        )}
      </div>

      {/* TAB 1: Category Scores & Strengths / Fixes */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Category Progress Bars */}
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Detailed Sub-Score Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {categoryList.map((cat, idx) => {
                let barColor = 'var(--accent-emerald)';
                if (cat.score < 60) barColor = 'var(--accent-rose)';
                else if (cat.score < 80) barColor = 'var(--accent-amber)';

                return (
                  <div key={idx}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{cat.name}</span>
                      <span style={{ fontWeight: 700, color: barColor }}>{cat.score}/100</span>
                    </div>
                    <div style={{
                      height: '8px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-full)',
                      overflow: 'hidden',
                      marginBottom: '0.35rem'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${cat.score}%`,
                        background: barColor,
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 1s ease-out'
                      }} />
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.feedback}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths vs Critical Fixes Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* Strengths Card */}
            <div className="glass-card" style={{ padding: '1.5rem', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-emerald)' }}>
                <Award size={22} />
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Key Strengths</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {result.strengths?.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={18} color="var(--accent-emerald)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Fixes Card */}
            <div className="glass-card" style={{ padding: '1.5rem', borderColor: 'rgba(244, 63, 94, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--accent-rose)' }}>
                <AlertTriangle size={22} />
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>Critical ATS Fixes Needed</h3>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {result.criticalFixes?.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem' }}>
                    <XCircle size={18} color="var(--accent-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Keywords Audit */}
      {activeTab === 'keywords' && (
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Skills & Keyword Audit Matrix</h3>

          {/* Matched Keywords */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-emerald)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={18} /> Matched Skills & Keywords Found ({result.matchedKeywords?.length || 0})
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {result.matchedKeywords?.map((kw, idx) => (
                <span key={idx} className="badge badge-emerald" style={{ textTransform: 'none' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-rose)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <XCircle size={18} /> Missing High-Impact Keywords ({result.missingKeywords?.length || 0})
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Consider integrating these relevant industry terms into your Experience or Skills sections:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {result.missingKeywords?.map((kw, idx) => (
                <span key={idx} className="badge badge-rose" style={{ textTransform: 'none' }}>
                  + {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI Rewrites */}
      {activeTab === 'rewrites' && (
        <BulletRewriter suggestions={result.bulletRewrites} />
      )}

      {/* TAB 4: Target Job Match */}
      {activeTab === 'jobmatch' && result.targetRoleMatch && (
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Target Job Match Analysis</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Alignment with provided job posting</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>
                {result.targetRoleMatch.matchScore}%
              </div>
              <span className="badge badge-indigo">Role Fit Score</span>
            </div>
          </div>

          {result.targetRoleMatch.missingRequiredSkills?.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-amber)', marginBottom: '0.5rem' }}>
                Missing Job Requirements
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {result.targetRoleMatch.missingRequiredSkills.map((sk, idx) => (
                  <span key={idx} className="badge badge-amber" style={{ textTransform: 'none' }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.targetRoleMatch.tailoredTips?.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>Tailored Positioning Tips</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {result.targetRoleMatch.tailoredTips.map((tip, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--accent-secondary)' }}>👉</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

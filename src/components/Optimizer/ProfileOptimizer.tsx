import React, { useState } from 'react';
import { Linkedin, Github, Sparkles, Copy, Check, ArrowRight, Loader2, Award, ExternalLink } from 'lucide-react';
import { optimizeLinkedInProfile, optimizeGitHubPortfolio, LinkedInOptimizationResult, GitHubOptimizationResult } from '../../services/gemini';

interface ProfileOptimizerProps {
  resumeSummary?: string;
  targetTitle?: string;
  skills?: string[];
}

export const ProfileOptimizer: React.FC<ProfileOptimizerProps> = ({
  resumeSummary = 'Senior Full Stack Software Engineer',
  targetTitle = 'Senior Full Stack Engineer',
  skills = ['TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'GraphQL']
}) => {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'github'>('linkedin');
  const [roleTitleInput, setRoleTitleInput] = useState(targetTitle);
  const [skillsInput, setSkillsInput] = useState(skills.join(', '));
  const [projectsInput, setProjectsInput] = useState('');
  
  const [isLinkedInLoading, setIsLinkedInLoading] = useState(false);
  const [linkedInResult, setLinkedInResult] = useState<LinkedInOptimizationResult | null>(null);

  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [gitHubResult, setGitHubResult] = useState<GitHubOptimizationResult | null>(null);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleOptimizeLinkedIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLinkedInLoading(true);
    try {
      const skillsArr = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
      const res = await optimizeLinkedInProfile(resumeSummary, roleTitleInput, skillsArr);
      setLinkedInResult(res);
    } catch (err) {
      console.error('LinkedIn optimization failed:', err);
    } finally {
      setIsLinkedInLoading(false);
    }
  };

  const handleOptimizeGitHub = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGitHubLoading(true);
    try {
      const res = await optimizeGitHubPortfolio(projectsInput, roleTitleInput);
      setGitHubResult(res);
    } catch (err) {
      console.error('GitHub optimization failed:', err);
    } finally {
      setIsGitHubLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(168, 85, 247, 0.12)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          color: 'var(--accent-secondary)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          <Sparkles size={16} />
          <span>Recruiter Visibility Booster</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          LinkedIn & GitHub AI Optimizer
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Align your LinkedIn profile and GitHub repositories with ATS standards to double recruiter outreach
        </p>
      </div>

      {/* Sub Tab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button
          className={`btn ${activeTab === 'linkedin' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('linkedin')}
          style={{ padding: '0.75rem 1.75rem' }}
        >
          <Linkedin size={20} color={activeTab === 'linkedin' ? '#ffffff' : '#0a66c2'} />
          <span>LinkedIn Profile Optimizer</span>
        </button>
        <button
          className={`btn ${activeTab === 'github' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('github')}
          style={{ padding: '0.75rem 1.75rem' }}
        >
          <Github size={20} color={activeTab === 'github' ? '#ffffff' : 'var(--text-primary)'} />
          <span>GitHub Portfolio Optimizer</span>
        </button>
      </div>

      {/* TAB 1: LinkedIn Optimizer */}
      {activeTab === 'linkedin' && (
        <div>
          <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
            <form onSubmit={handleOptimizeLinkedIn}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Target Role / Industry Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={roleTitleInput}
                    onChange={(e) => setRoleTitleInput(e.target.value)}
                    placeholder="e.g. Senior Full Stack Engineer"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Key Core Skills (Comma Separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={skillsInput}
                    onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="TypeScript, React, Node.js, AWS, Python"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={isLinkedInLoading}>
                {isLinkedInLoading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
                <span>Generate Optimized LinkedIn Strategy</span>
              </button>
            </form>
          </div>

          {/* Results Output */}
          {linkedInResult && (
            <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Award size={24} color="#0a66c2" />
                <h3 style={{ fontSize: '1.25rem' }}>Optimized LinkedIn Profile Blueprint</h3>
              </div>

              {/* Headline */}
              <div style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-indigo">Recommended Headline</span>
                  <button
                    onClick={() => handleCopy(linkedInResult.headline, 'headline')}
                    className="btn btn-outline btn-sm"
                  >
                    {copiedField === 'headline' ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                    <span>{copiedField === 'headline' ? 'Copied' : 'Copy Headline'}</span>
                  </button>
                </div>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {linkedInResult.headline}
                </p>
              </div>

              {/* About Section */}
              <div style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-indigo">Optimized About Summary</span>
                  <button
                    onClick={() => handleCopy(linkedInResult.aboutSection, 'about')}
                    className="btn btn-outline btn-sm"
                  >
                    {copiedField === 'about' ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                    <span>{copiedField === 'about' ? 'Copied' : 'Copy About'}</span>
                  </button>
                </div>
                <pre style={{
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.6
                }}>
                  {linkedInResult.aboutSection}
                </pre>
              </div>

              {/* Featured Skills & Tips */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--accent-emerald)' }}>
                    Top Featured Skills to Pin
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {linkedInResult.featuredSkills.map((sk, idx) => (
                      <span key={idx} className="badge badge-emerald" style={{ textTransform: 'none' }}>
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: 'var(--accent-amber)' }}>
                    Recruiter Visibility Tips
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {linkedInResult.optimizationTips.map((tip, idx) => (
                      <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.4rem' }}>
                        <span>💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: GitHub Optimizer */}
      {activeTab === 'github' && (
        <div>
          <div className="glass-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
            <form onSubmit={handleOptimizeGitHub}>
              <div className="form-group">
                <label className="form-label">Projects & GitHub Repository Details</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={projectsInput}
                  onChange={(e) => setProjectsInput(e.target.value)}
                  placeholder="e.g. React dashboard app using TypeScript, Docker, AWS S3, and GraphQL API with 150+ stars..."
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isGitHubLoading}>
                {isGitHubLoading ? <Loader2 size={18} className="spin" /> : <Sparkles size={18} />}
                <span>Generate GitHub Portfolio & README Bio</span>
              </button>
            </form>
          </div>

          {/* Results Output */}
          {gitHubResult && (
            <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <Github size={24} />
                <h3 style={{ fontSize: '1.25rem' }}>ATS Project Bullets & GitHub Profile README</h3>
              </div>

              {/* Bullet Points */}
              <div style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', marginBottom: '0.75rem' }}>
                  ATS Resume Project Bullet Points
                </h4>
                <ul style={{ paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {gitHubResult.repoBulletPoints.map((bp, idx) => (
                    <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{bp}</li>
                  ))}
                </ul>
              </div>

              {/* README.md Bio */}
              <div style={{ marginBottom: '1.5rem', background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className="badge badge-indigo">GitHub README.md Bio</span>
                  <button
                    onClick={() => handleCopy(gitHubResult.readmeBio, 'readme')}
                    className="btn btn-outline btn-sm"
                  >
                    {copiedField === 'readme' ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                    <span>{copiedField === 'readme' ? 'Copied' : 'Copy Markdown'}</span>
                  </button>
                </div>
                <pre style={{
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-secondary)',
                  whiteSpace: 'pre-wrap',
                  background: 'var(--bg-primary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)'
                }}>
                  {gitHubResult.readmeBio}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { FileSearch, FileText, Moon, Sun, Sparkles, Share2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'analyzer' | 'builder' | 'optimizer';
  setActiveTab: (tab: 'analyzer' | 'builder' | 'optimizer') => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme
}) => {
  return (
    <header className="no-print" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-card)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.85rem 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          onClick={() => setActiveTab('analyzer')}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'var(--gradient-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <Sparkles size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                SmartResume 
              </span>
              <span className="badge badge-indigo">AI PRO</span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ATS Score Analyzer & Resume Builder</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          background: 'var(--bg-secondary)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <button
            className={`btn ${activeTab === 'analyzer' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('analyzer')}
            style={{ border: 'none', padding: '0.5rem 1.1rem' }}
          >
            <FileSearch size={17} />
            <span>ATS Analyzer</span>
          </button>
          <button
            className={`btn ${activeTab === 'builder' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('builder')}
            style={{ border: 'none', padding: '0.5rem 1.1rem' }}
          >
            <FileText size={17} />
            <span>Resume Builder</span>
          </button>
          <button
            className={`btn ${activeTab === 'optimizer' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('optimizer')}
            style={{ border: 'none', padding: '0.5rem 1.1rem' }}
          >
            <Share2 size={17} />
            <span>LinkedIn & GitHub AI</span>
          </button>
        </nav>

        {/* Theme Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.55rem', borderRadius: '50%' }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} color="#6366f1" />}
          </button>
        </div>
      </div>
    </header>
  );
};

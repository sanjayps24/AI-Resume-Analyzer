import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { FileUploader } from './components/Analyzer/FileUploader';
import { JobDescriptionInput } from './components/Analyzer/JobDescriptionInput';
import { AnalysisProgress } from './components/Analyzer/AnalysisProgress';
import { AnalysisResults } from './components/Analyzer/AnalysisResults';
import { FormEditor } from './components/Builder/FormEditor';
import { ResumePreview } from './components/Builder/ResumePreview';
import { ProfileOptimizer } from './components/Optimizer/ProfileOptimizer';
import { AtsAnalysisResult, ResumeData, ResumeStyleConfig } from './types/resume';
import { analyzeResumeWithGemini } from './services/gemini';
import { SAMPLE_RESUMES } from './data/sampleResumes';
import { Sparkles, FileSearch, RotateCcw } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<'analyzer' | 'builder' | 'optimizer'>('analyzer');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Analyzer State
  const [resumeText, setResumeText] = useState<string>('');
  const [loadedFileName, setLoadedFileName] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStage, setAnalysisStage] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<AtsAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Builder State with Default Sample
  const [builderResumeData, setBuilderResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumai_builder_data');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return SAMPLE_RESUMES[0].resumeData;
  });

  const [styleConfig, setStyleConfig] = useState<ResumeStyleConfig>({
    template: 'modern',
    primaryColor: '#6366f1',
    fontFamily: 'Inter',
    fontSize: 'normal',
    margins: 'normal'
  });

  // Auto-save Builder Data to localStorage
  useEffect(() => {
    localStorage.setItem('resumai_builder_data', JSON.stringify(builderResumeData));
  }, [builderResumeData]);

  // Sync theme attribute to <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleTextLoaded = (text: string, fileName?: string) => {
    setResumeText(text);
    setLoadedFileName(fileName || 'Loaded Resume');
  };

  // Trigger Gemini AI ATS Analysis seamlessly
  const handleStartAnalysis = async () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisStage(0);

    // Multi-stage progress indicators
    const timer1 = setTimeout(() => setAnalysisStage(1), 600);
    const timer2 = setTimeout(() => setAnalysisStage(2), 1400);
    const timer3 = setTimeout(() => setAnalysisStage(3), 2200);

    try {
      const result = await analyzeResumeWithGemini(resumeText, jobDescription);
      setAnalysisResult(result);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setAnalysisError(err.message || 'Failed to analyze resume');
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsAnalyzing(false);
    }
  };

  // 1-Click Import from Analyzer into Builder
  const handleImportToBuilder = () => {
    if (resumeText) {
      setBuilderResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          summary: resumeText.slice(0, 300) + '...'
        }
      }));
    }
    setActiveTab('builder');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        {/* ==================================================================== */}
        {/* TAB 1: AI RESUME ANALYZER                                            */}
        {/* ==================================================================== */}
        {activeTab === 'analyzer' && (
          <div>
            {/* Landing Hero Section */}
            <LandingHero
              onStartAnalyze={() => {
                const el = document.getElementById('analyzer-upload-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onStartBuilder={() => setActiveTab('builder')}
            />

            <div id="analyzer-upload-section" style={{ paddingTop: '1.5rem' }}>
              {/* File & Text Uploader */}
              <FileUploader onTextLoaded={handleTextLoaded} isLoading={isAnalyzing} />

              {/* Optional Job Description Matcher */}
              <JobDescriptionInput jobDescription={jobDescription} setJobDescription={setJobDescription} />

              {/* Action Trigger Button */}
              {resumeText.trim() && !isAnalyzing && (
                <div style={{ textAlign: 'center', marginTop: '1.75rem' }} className="animate-fade-in">
                  <button onClick={handleStartAnalysis} className="btn btn-primary btn-lg" style={{ minWidth: '260px' }}>
                    <Sparkles size={20} />
                    <span>Calculate Accurate ATS Score</span>
                  </button>
                </div>
              )}

              {/* Analysis Progress */}
              {isAnalyzing && <AnalysisProgress currentStage={analysisStage} />}

              {/* Error Display */}
              {analysisError && (
                <div className="glass-card" style={{ padding: '1.5rem', margin: '1.5rem 0', borderColor: 'rgba(244, 63, 94, 0.4)', textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--accent-rose)', marginBottom: '0.5rem' }}>Analysis Notice</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{analysisError}</p>
                </div>
              )}

              {/* Analysis Results Dashboard */}
              {analysisResult && !isAnalyzing && (
                <AnalysisResults result={analysisResult} onImportToBuilder={handleImportToBuilder} />
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: AI RESUME BUILDER                                             */}
        {/* ==================================================================== */}
        {activeTab === 'builder' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem' }}>Professional Interactive Resume Builder</h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  Craft ATS-formatted resumes with real-time AI bullet generation and side-by-side preview
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setBuilderResumeData(SAMPLE_RESUMES[0].resumeData)}
                >
                  <RotateCcw size={14} /> Load Tech Sample
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setBuilderResumeData(SAMPLE_RESUMES[1].resumeData)}
                >
                  <RotateCcw size={14} /> Load Product Sample
                </button>
              </div>
            </div>

            {/* Side-by-Side Builder Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start' }}>
              {/* Form Editor Column */}
              <div>
                <FormEditor
                  resumeData={builderResumeData}
                  setResumeData={setBuilderResumeData}
                  hasApiKey={true}
                />
              </div>

              {/* Real-Time Preview Column */}
              <div>
                <ResumePreview
                  resumeData={builderResumeData}
                  styleConfig={styleConfig}
                  setStyleConfig={setStyleConfig}
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: LINKEDIN & GITHUB AI OPTIMIZER                                */}
        {/* ==================================================================== */}
        {activeTab === 'optimizer' && (
          <ProfileOptimizer
            resumeSummary={builderResumeData.personalInfo.summary}
            targetTitle={builderResumeData.personalInfo.title}
            skills={builderResumeData.skills.flatMap(s => s.skills)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print" style={{
        borderTop: '1px solid var(--border-color)',
        padding: '1.5rem 0',
        textAlign: 'center',
        background: 'var(--bg-secondary)',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginTop: '3rem'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            ResumAI &copy; {new Date().getFullYear()} • Powered by Gemini 2.5 AI Engine
          </div>
          <div>
            Professional ATS Resume Intelligence
          </div>
        </div>
      </footer>
    </div>
  );
};

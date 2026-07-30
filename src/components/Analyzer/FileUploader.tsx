import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Clipboard, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { extractTextFromPdf } from '../../services/pdfParser';
import { extractTextFromDocx } from '../../services/docxParser';
import { SAMPLE_RESUMES, SampleResumeItem } from '../../data/sampleResumes';

interface FileUploaderProps {
  onTextLoaded: (text: string, fileName?: string) => void;
  isLoading: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onTextLoaded, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste' | 'samples'>('upload');
  const [pastedText, setPastedText] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    setErrorMsg(null);
    setSelectedFileName(file.name);
    try {
      let text = '';
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (extension === 'pdf') {
        text = await extractTextFromPdf(file);
      } else if (extension === 'docx') {
        text = await extractTextFromDocx(file);
      } else if (extension === 'txt' || extension === 'md') {
        text = await file.text();
      } else {
        throw new Error('Unsupported file format. Please upload PDF, DOCX, TXT, or MD.');
      }

      onTextLoaded(text, file.name);
    } catch (err: any) {
      console.error('File parsing failed:', err);
      setErrorMsg(err.message || 'Error processing file');
      setSelectedFileName(null);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handlePasteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastedText.trim()) {
      setErrorMsg('Please paste your resume text before submitting.');
      return;
    }
    onTextLoaded(pastedText.trim(), 'Pasted Resume');
  };

  const handleSampleClick = (sample: SampleResumeItem) => {
    setSelectedFileName(`${sample.title}.txt`);
    onTextLoaded(sample.rawText, sample.title);
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem' }}>
      {/* Sub-tabs for input mode */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '1rem',
        marginBottom: '1.5rem'
      }}>
        <button
          className={`btn btn-sm ${activeTab === 'upload' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('upload')}
        >
          <UploadCloud size={16} />
          <span>Upload Resume File</span>
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'paste' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('paste')}
        >
          <Clipboard size={16} />
          <span>Paste Raw Text</span>
        </button>
        <button
          className={`btn btn-sm ${activeTab === 'samples' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveTab('samples')}
        >
          <Sparkles size={16} />
          <span>Sample Presets</span>
        </button>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.1)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#f87171',
          fontSize: '0.9rem',
          marginBottom: '1.25rem'
        }}>
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* TAB 1: File Upload */}
      {activeTab === 'upload' && (
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".pdf,.docx,.txt,.md"
            style={{ display: 'none' }}
          />
          
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem 1.5rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragActive ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-secondary)',
              transition: 'all 0.25s ease'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <UploadCloud size={28} color="var(--accent-primary)" />
            </div>

            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
              Drag & Drop your resume here, or <span style={{ color: 'var(--accent-primary)' }}>Browse File</span>
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Supports PDF (.pdf), Word (.docx), Plain Text (.txt), and Markdown (.md)
            </p>

            {selectedFileName && (
              <div style={{
                marginTop: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--accent-emerald)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                <CheckCircle2 size={16} />
                <span>Loaded: {selectedFileName}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Text Paste */}
      {activeTab === 'paste' && (
        <form onSubmit={handlePasteSubmit}>
          <div className="form-group">
            <label className="form-label">Resume Plain Content</label>
            <textarea
              className="form-textarea"
              rows={8}
              placeholder="Paste your full resume text here (Summary, Work Experience, Skills, Education)..."
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading || !pastedText.trim()}>
            <FileText size={18} />
            <span>Analyze Pasted Resume</span>
          </button>
        </form>
      )}

      {/* TAB 3: Sample Presets */}
      {activeTab === 'samples' && (
        <div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Click any sample resume to instantly analyze its ATS score and view AI recommendations:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {SAMPLE_RESUMES.map((sample) => (
              <div
                key={sample.id}
                onClick={() => handleSampleClick(sample)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span className="badge badge-indigo">{sample.category}</span>
                </div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>{sample.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sample.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

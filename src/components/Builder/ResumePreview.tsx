import React, { useRef, useState } from 'react';
import { ResumeData, ResumeStyleConfig, ResumeTemplateType } from '../../types/resume';
import { Download, Layout, Palette, Type, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ResumePreviewProps {
  resumeData: ResumeData;
  styleConfig: ResumeStyleConfig;
  setStyleConfig: React.Dispatch<React.SetStateAction<ResumeStyleConfig>>;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  resumeData,
  styleConfig,
  setStyleConfig
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const colors = ['#6366f1', '#10b981', '#f59e0b', '#06b6d4', '#a855f7', '#f43f5e', '#1e293b'];

  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);

    try {
      const element = previewRef.current;
      const opt = {
        margin: 0.3,
        filename: `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err: any) {
      console.error('PDF Export Error:', err);
      // Fallback to native print
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const { personalInfo, workExperience, education, skills, projects } = resumeData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Controls Bar: Template, Color, Font, Download */}
      <div className="glass-card no-print" style={{ padding: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Template Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Layout size={16} color="var(--text-muted)" />
          <select
            className="form-select"
            value={styleConfig.template}
            onChange={(e) => setStyleConfig(prev => ({ ...prev, template: e.target.value as ResumeTemplateType }))}
            style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            <option value="modern">Modern Executive</option>
            <option value="tech">Tech Minimalist</option>
            <option value="classic">Clean Classic</option>
            <option value="creative">Creative Elegance</option>
          </select>
        </div>

        {/* Color Palette */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Palette size={16} color="var(--text-muted)" />
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setStyleConfig(prev => ({ ...prev, primaryColor: c }))}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: c,
                border: styleConfig.primaryColor === c ? '2px solid #ffffff' : '1px solid transparent',
                cursor: 'pointer',
                boxShadow: styleConfig.primaryColor === c ? '0 0 0 2px ' + c : 'none'
              }}
            />
          ))}
        </div>

        {/* Font Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Type size={16} color="var(--text-muted)" />
          <select
            className="form-select"
            value={styleConfig.fontFamily}
            onChange={(e) => setStyleConfig(prev => ({ ...prev, fontFamily: e.target.value as any }))}
            style={{ width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            <option value="Inter">Inter Sans</option>
            <option value="Outfit">Outfit Heading</option>
            <option value="Roboto Mono">Roboto Mono</option>
          </select>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExportPdf}
          disabled={isExporting}
          className="btn btn-primary btn-sm"
        >
          <Download size={16} />
          <span>{isExporting ? 'Exporting PDF...' : 'Download PDF'}</span>
        </button>
      </div>

      {/* Live Resume Document Viewport */}
      <div
        className="glass-card print-area"
        style={{
          background: '#ffffff',
          color: '#1e293b',
          borderRadius: 'var(--radius-md)',
          padding: '2.5rem',
          minHeight: '800px',
          fontFamily: styleConfig.fontFamily === 'Outfit' ? "'Outfit', sans-serif" : styleConfig.fontFamily === 'Roboto Mono' ? "'Roboto Mono', monospace" : "'Inter', sans-serif",
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div ref={previewRef} style={{ width: '100%' }}>
          {/* TEMPLATE 1 & DEFAULT: Modern Executive */}
          {styleConfig.template === 'modern' && (
            <div>
              {/* Header */}
              <div style={{ borderBottom: `3px solid ${styleConfig.primaryColor}`, paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2.2rem', color: styleConfig.primaryColor, fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                  {personalInfo.fullName || 'Your Name'}
                </h1>
                <p style={{ fontSize: '1.1rem', color: '#475569', fontWeight: 600, marginTop: '0.2rem', marginBottom: '0.75rem' }}>
                  {personalInfo.title || 'Target Job Title'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#64748b' }}>
                  {personalInfo.email && <span>📧 {personalInfo.email}</span>}
                  {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
                  {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                  {personalInfo.linkedin && <span>🔗 {personalInfo.linkedin}</span>}
                  {personalInfo.github && <span>💻 {personalInfo.github}</span>}
                </div>
              </div>

              {/* Summary */}
              {personalInfo.summary && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.95rem', color: styleConfig.primaryColor, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.6rem' }}>
                    Professional Summary
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>{personalInfo.summary}</p>
                </div>
              )}

              {/* Experience */}
              {workExperience.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '0.95rem', color: styleConfig.primaryColor, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '1rem' }}>
                    Work Experience
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {workExperience.map((exp) => (
                      <div key={exp.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <span style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{exp.position}</span>
                          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>
                            {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : '- Present'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: styleConfig.primaryColor, marginBottom: '0.4rem' }}>
                          {exp.company} {exp.location ? `• ${exp.location}` : ''}
                        </div>
                        <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                          {exp.highlights?.map((hl, idx) => hl && (
                            <li key={idx} style={{ fontSize: '0.86rem', color: '#334155', marginBottom: '0.3rem', lineHeight: 1.5 }}>
                              {hl}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Skills Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Education */}
                {education.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '0.95rem', color: styleConfig.primaryColor, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                      Education
                    </h3>
                    {education.map((edu) => (
                      <div key={edu.id} style={{ marginBottom: '0.75rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{edu.degree}</div>
                        <div style={{ fontSize: '0.85rem', color: '#475569' }}>{edu.institution}</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{edu.startDate} {edu.endDate ? `- ${edu.endDate}` : ''}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '0.95rem', color: styleConfig.primaryColor, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
                      Key Skills
                    </h3>
                    {skills.map((cat, idx) => (
                      <div key={idx} style={{ marginBottom: '0.6rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a' }}>{cat.category}: </span>
                        <span style={{ fontSize: '0.85rem', color: '#475569' }}>{cat.skills.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TEMPLATE 2: Tech Minimalist */}
          {styleConfig.template === 'tech' && (
            <div style={{ fontFamily: "'Roboto Mono', monospace" }}>
              <div style={{ background: '#0f172a', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <h1 style={{ fontSize: '2rem', color: styleConfig.primaryColor, margin: 0 }}>&lt;{personalInfo.fullName || 'Name'} /&gt;</h1>
                <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '0.25rem' }}>// {personalInfo.title}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', marginTop: '0.75rem', color: '#cbd5e1' }}>
                  {personalInfo.email && <span>email: {personalInfo.email}</span>}
                  {personalInfo.phone && <span>phone: {personalInfo.phone}</span>}
                  {personalInfo.github && <span>github: {personalInfo.github}</span>}
                </div>
              </div>

              {personalInfo.summary && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', color: styleConfig.primaryColor, borderBottom: '1px dashed #cbd5e1', paddingBottom: '0.25rem' }}>
                    01. SUMMARY
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#334155' }}>{personalInfo.summary}</p>
                </div>
              )}

              {workExperience.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', color: styleConfig.primaryColor, borderBottom: '1px dashed #cbd5e1', paddingBottom: '0.25rem' }}>
                    02. EXPERIENCE
                  </h3>
                  {workExperience.map((exp) => (
                    <div key={exp.id} style={{ marginBottom: '1rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{exp.position} @ {exp.company}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>[{exp.startDate} to {exp.endDate || 'Present'}]</div>
                      <ul style={{ paddingLeft: '1rem', margin: '0.4rem 0' }}>
                        {exp.highlights?.map((hl, idx) => (
                          <li key={idx} style={{ fontSize: '0.82rem', color: '#334155' }}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TEMPLATE 3: Clean Classic */}
          {styleConfig.template === 'classic' && (
            <div style={{ textAlign: 'left' }}>
              <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <h1 style={{ fontSize: '2.2rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                  {personalInfo.fullName}
                </h1>
                <p style={{ fontSize: '1rem', color: '#475569', margin: '0.2rem 0 0.5rem 0' }}>{personalInfo.title}</p>
                <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
                  {personalInfo.location && <span>{personalInfo.location}</span>}
                  {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                  {personalInfo.email && <span>• {personalInfo.email}</span>}
                  {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                </div>
              </div>

              {personalInfo.summary && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
                    Summary
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#1e293b' }}>{personalInfo.summary}</p>
                </div>
              )}

              {workExperience.length > 0 && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', borderBottom: '1px solid #0f172a', paddingBottom: '0.2rem', marginBottom: '0.75rem' }}>
                    Experience
                  </h3>
                  {workExperience.map((exp) => (
                    <div key={exp.id} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.95rem' }}>
                        <span>{exp.company} - {exp.position}</span>
                        <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                      </div>
                      <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem' }}>
                        {exp.highlights?.map((hl, idx) => (
                          <li key={idx} style={{ fontSize: '0.85rem', color: '#334155' }}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TEMPLATE 4: Creative Elegance */}
          {styleConfig.template === 'creative' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', color: styleConfig.primaryColor, margin: 0 }}>{personalInfo.fullName}</h2>
                <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>{personalInfo.title}</p>
                
                <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <div><strong>Email:</strong> {personalInfo.email}</div>
                  <div><strong>Phone:</strong> {personalInfo.phone}</div>
                  <div><strong>Location:</strong> {personalInfo.location}</div>
                </div>

                {skills.length > 0 && (
                  <div>
                    <h4 style={{ fontSize: '0.85rem', color: styleConfig.primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Skills</h4>
                    {skills.map((c, i) => (
                      <div key={i} style={{ fontSize: '0.78rem', marginBottom: '0.4rem' }}>
                        <strong>{c.category}:</strong> {c.skills.join(', ')}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {personalInfo.summary && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h3 style={{ fontSize: '0.95rem', color: styleConfig.primaryColor, textTransform: 'uppercase', marginBottom: '0.5rem' }}>About Me</h3>
                    <p style={{ fontSize: '0.88rem', color: '#334155' }}>{personalInfo.summary}</p>
                  </div>
                )}

                {workExperience.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '0.95rem', color: styleConfig.primaryColor, textTransform: 'uppercase', marginBottom: '0.75rem' }}>Experience</h3>
                    {workExperience.map((exp) => (
                      <div key={exp.id} style={{ marginBottom: '1rem' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{exp.position}</div>
                        <div style={{ fontSize: '0.82rem', color: styleConfig.primaryColor }}>{exp.company}</div>
                        <ul style={{ paddingLeft: '1.1rem', marginTop: '0.3rem' }}>
                          {exp.highlights?.map((hl, idx) => (
                            <li key={idx} style={{ fontSize: '0.84rem', color: '#334155' }}>{hl}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ResumeData, WorkExperience, Education, Project, SkillCategory } from '../../types/resume';
import { Plus, Trash2, Sparkles, User, Briefcase, GraduationCap, Code, FolderGit2, Award, Loader2 } from 'lucide-react';
import { generateAiSummary, generateAiBullets } from '../../services/gemini';

interface FormEditorProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  hasApiKey: boolean;
}

export const FormEditor: React.FC<FormEditorProps> = ({
  resumeData,
  setResumeData,
  hasApiKey
}) => {
  const [activeSection, setActiveSection] = useState<'contact' | 'experience' | 'education' | 'skills' | 'projects'>('contact');
  const [isAiLoadingSummary, setIsAiLoadingSummary] = useState(false);
  const [loadingBulletId, setLoadingBulletId] = useState<string | null>(null);

  // Handlers for Personal Info
  const handlePersonalInfoChange = (field: keyof typeof resumeData.personalInfo, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  // AI Summary Enhancement
  const handleAiEnhanceSummary = async () => {
    if (!hasApiKey) return;
    setIsAiLoadingSummary(true);
    try {
      const skillsList = resumeData.skills.flatMap(s => s.skills);
      const enhanced = await generateAiSummary(
        resumeData.personalInfo.title || 'Professional',
        resumeData.personalInfo.summary,
        skillsList
      );
      handlePersonalInfoChange('summary', enhanced);
    } catch (err: any) {
      alert(`AI Summary Generation failed: ${err.message}`);
    } finally {
      setIsAiLoadingSummary(false);
    }
  };

  // Work Experience Handlers
  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: ['']
    };
    setResumeData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, newExp]
    }));
  };

  const updateWorkExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  };

  const updateHighlight = (expId: string, hIdx: number, val: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => {
        if (exp.id !== expId) return exp;
        const updated = [...exp.highlights];
        updated[hIdx] = val;
        return { ...exp, highlights: updated };
      })
    }));
  };

  const addHighlight = (expId: string) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, highlights: [...exp.highlights, ''] };
      })
    }));
  };

  const removeHighlight = (expId: string, hIdx: number) => {
    setResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, highlights: exp.highlights.filter((_, idx) => idx !== hIdx) };
      })
    }));
  };

  // AI Bullet Generator for Experience
  const handleGenerateAiBullets = async (exp: WorkExperience) => {
    if (!hasApiKey) return;
    setLoadingBulletId(exp.id);
    try {
      const generated = await generateAiBullets(
        exp.position || 'Software Engineer',
        exp.company || 'Tech Corp',
        exp.highlights.join('. ')
      );
      setResumeData(prev => ({
        ...prev,
        workExperience: prev.workExperience.map(item => item.id === exp.id ? { ...item, highlights: generated } : item)
      }));
    } catch (err: any) {
      alert(`AI Bullet generation failed: ${err.message}`);
    } finally {
      setLoadingBulletId(null);
    }
  };

  // Education Handlers
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  // Skills Handlers
  const updateSkillsCategory = (catIdx: number, categoryName: string, skillsStr: string) => {
    const skillsArr = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    setResumeData(prev => {
      const updated = [...prev.skills];
      updated[catIdx] = { category: categoryName, skills: skillsArr };
      return { ...prev, skills: updated };
    });
  };

  const addSkillsCategory = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: 'New Category', skills: ['Skill 1', 'Skill 2'] }]
    }));
  };

  const removeSkillsCategory = (catIdx: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, idx) => idx !== catIdx)
    }));
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem' }}>
      {/* Navigation Sub-tabs */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.85rem',
        marginBottom: '1.25rem',
        overflowX: 'auto'
      }}>
        <button
          className={`btn btn-sm ${activeSection === 'contact' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveSection('contact')}
        >
          <User size={16} /> Contact & Summary
        </button>
        <button
          className={`btn btn-sm ${activeSection === 'experience' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveSection('experience')}
        >
          <Briefcase size={16} /> Experience ({resumeData.workExperience.length})
        </button>
        <button
          className={`btn btn-sm ${activeSection === 'education' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveSection('education')}
        >
          <GraduationCap size={16} /> Education ({resumeData.education.length})
        </button>
        <button
          className={`btn btn-sm ${activeSection === 'skills' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => setActiveSection('skills')}
        >
          <Code size={16} /> Skills ({resumeData.skills.length})
        </button>
      </div>

      {/* SECTION 1: Personal Info & Summary */}
      {activeSection === 'contact' && (
        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Personal Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                placeholder="Alexander Wright"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Job Title</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.title}
                onChange={(e) => handlePersonalInfoChange('title', e.target.value)}
                placeholder="Senior Full Stack Engineer"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={resumeData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                placeholder="alex.wright@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                placeholder="(555) 019-2834"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Location (City, State/Country)</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="form-group">
              <label className="form-label">LinkedIn Profile URL</label>
              <input
                type="text"
                className="form-input"
                value={resumeData.personalInfo.linkedin || ''}
                onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/alexwright"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label className="form-label">Professional Summary</label>
              <button
                type="button"
                onClick={handleAiEnhanceSummary}
                className="btn btn-outline btn-sm"
                disabled={isAiLoadingSummary}
                style={{ color: 'var(--accent-primary)', borderColor: 'var(--border-glow)' }}
              >
                {isAiLoadingSummary ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />}
                <span>AI Enhance Summary</span>
              </button>
            </div>
            <textarea
              className="form-textarea"
              rows={4}
              value={resumeData.personalInfo.summary}
              onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
              placeholder="Energetic software engineer with 5+ years of experience..."
            />
          </div>
        </div>
      )}

      {/* SECTION 2: Work Experience */}
      {activeSection === 'experience' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Work Experience</h3>
            <button className="btn btn-primary btn-sm" onClick={addWorkExperience}>
              <Plus size={16} /> Add Position
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {resumeData.workExperience.map((exp, idx) => (
              <div
                key={exp.id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge badge-indigo">Role #{idx + 1}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleGenerateAiBullets(exp)}
                      disabled={loadingBulletId === exp.id}
                      style={{ color: 'var(--accent-emerald)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
                    >
                      {loadingBulletId === exp.id ? <Loader2 size={14} className="spin" /> : <Sparkles size={14} />}
                      <span>AI Generate Bullets</span>
                    </button>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => removeWorkExperience(exp.id)}
                      style={{ color: 'var(--accent-rose)', borderColor: 'rgba(244, 63, 94, 0.3)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Job Position (e.g. Senior Software Engineer)"
                    value={exp.position}
                    onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Location (e.g. San Francisco, CA)"
                    value={exp.location}
                    onChange={(e) => updateWorkExperience(exp.id, 'location', e.target.value)}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Start Date (e.g. 2021-03)"
                      value={exp.startDate}
                      onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="End Date or Present"
                      value={exp.endDate}
                      onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                    />
                  </div>
                </div>

                {/* Highlights list */}
                <div style={{ marginTop: '0.75rem' }}>
                  <label className="form-label">Key Achievements & Bullet Points</label>
                  {exp.highlights.map((hl, hIdx) => (
                    <div key={hIdx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Bullet point metric..."
                        value={hl}
                        onChange={(e) => updateHighlight(exp.id, hIdx, e.target.value)}
                      />
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => removeHighlight(exp.id, hIdx)}
                      >
                        <Trash2 size={14} color="var(--accent-rose)" />
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => addHighlight(exp.id)}
                    style={{ marginTop: '0.25rem' }}
                  >
                    <Plus size={14} /> Add Bullet
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Education */}
      {activeSection === 'education' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Education & Qualifications</h3>
            <button className="btn btn-primary btn-sm" onClick={addEducation}>
              <Plus size={16} /> Add Education
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {resumeData.education.map((edu) => (
              <div
                key={edu.id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Institution (e.g. UC Berkeley)"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    style={{ fontWeight: 600 }}
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => removeEducation(edu.id)}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    <Trash2 size={14} color="var(--accent-rose)" />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Degree (e.g. BS in Computer Science)"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Field of Study"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Dates (e.g. 2014 - 2018)"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="GPA or Honors (Optional)"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: Skills Matrix */}
      {activeSection === 'skills' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem' }}>Skill Categories & Keywords</h3>
            <button className="btn btn-primary btn-sm" onClick={addSkillsCategory}>
              <Plus size={16} /> Add Category
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {resumeData.skills.map((cat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem'
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Category Name (e.g. Languages, Tools)"
                    value={cat.category}
                    onChange={(e) => updateSkillsCategory(idx, e.target.value, cat.skills.join(', '))}
                    style={{ fontWeight: 600, width: '40%' }}
                  />
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Comma separated skills (e.g. React, TypeScript, Node.js)"
                    value={cat.skills.join(', ')}
                    onChange={(e) => updateSkillsCategory(idx, cat.category, e.target.value)}
                    style={{ width: '60%' }}
                  />
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => removeSkillsCategory(idx)}
                  >
                    <Trash2 size={14} color="var(--accent-rose)" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  website?: string;
  linkedin?: string;
  github?: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
}

export interface AtsCategoryScore {
  name: string;
  score: number; // 0 - 100
  feedback: string;
}

export interface BulletRewriteSuggestion {
  original: string;
  improved: string;
  reason: string;
  impactScore: number;
}

export interface AtsAnalysisResult {
  overallScore: number;
  atsGrade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  summaryFeedback: string;
  categoryScores: {
    impact: AtsCategoryScore;
    formatting: AtsCategoryScore;
    skills: AtsCategoryScore;
    quantification: AtsCategoryScore;
    completeness: AtsCategoryScore;
  };
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  criticalFixes: string[];
  recommendedJobTitles: string[];
  bulletRewrites: BulletRewriteSuggestion[];
  targetRoleMatch?: {
    jobTitle: string;
    matchScore: number;
    missingRequiredSkills: string[];
    tailoredTips: string[];
  };
}

export type ResumeTemplateType = 'modern' | 'classic' | 'tech' | 'creative';

export interface ResumeStyleConfig {
  template: ResumeTemplateType;
  primaryColor: string;
  fontFamily: 'Inter' | 'Outfit' | 'Roboto Mono';
  fontSize: 'compact' | 'normal' | 'spacious';
  margins: 'narrow' | 'normal' | 'wide';
}

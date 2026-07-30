import { ResumeData } from '../types/resume';

export interface SampleResumeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  rawText: string;
  resumeData: ResumeData;
}

export const SAMPLE_RESUMES: SampleResumeItem[] = [
  {
    id: 'senior-software-engineer',
    title: 'Senior Software Engineer',
    category: 'Engineering / Tech',
    description: 'High-performing full stack developer with React, Node.js, Cloud, & System Architecture.',
    rawText: `ALEXANDER WRIGHT
San Francisco, CA | (555) 019-2834 | alex.wright@email.com | linkedin.com/in/alexwright-dev | github.com/alexwright

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 7+ years of experience engineering high-scale web applications, microservices, and cloud infrastructure. Proven track record of reducing latency by 45% and leading cross-functional teams to deliver enterprise SaaS solutions handling over 2M daily active users.

WORK EXPERIENCE
Senior Full Stack Engineer | CloudTech Solutions, San Francisco, CA | 2021 - Present
• Architected scalable React and Node.js microservices platform serving 2.5M daily requests with 99.99% uptime.
• Spearheaded migration from legacy monolithic application to Docker/Kubernetes containerized infrastructure, cutting AWS hosting costs by 32% ($140K annual savings).
• Mentored a team of 8 junior/mid-level software engineers, conducting code reviews and championing CI/CD best practices with GitHub Actions.
• Implemented GraphQL API gateway reducing front-end API payload sizes by 55% and improving page load speeds by 1.8s.

Software Engineer | Apex Systems, San Jose, CA | 2018 - 2021
• Developed responsive user interfaces using TypeScript, React, and Redux Toolkit for high-traffic financial dashboard.
• Integrated Stripe API processing over $12M in annual transactions with zero security vulnerabilities.
• Optimized PostgreSQL database indexing and complex query performance, lowering response times from 850ms to 120ms.

TECHNICAL SKILLS
• Languages: TypeScript, JavaScript (ES6+), Python, Go, SQL, HTML5, CSS3/Sass
• Frameworks & Libraries: React.js, Next.js, Node.js, Express, GraphQL, TailwindCSS, Jest
• Cloud & DevOps: AWS (EC2, S3, Lambda, ECS), Docker, Kubernetes, Terraform, CI/CD, Git

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2014 - 2018
• GPA: 3.8 / 4.0 | Magna Cum Laude

PROJECTS & CERTIFICATIONS
• AWS Certified Solutions Architect – Associate (2023)
• OpenSource Maintainer: Created popular React data visualization library with 4.5k GitHub stars.`,
    resumeData: {
      personalInfo: {
        fullName: 'Alexander Wright',
        email: 'alex.wright@email.com',
        phone: '(555) 019-2834',
        location: 'San Francisco, CA',
        title: 'Senior Full Stack Engineer',
        linkedin: 'linkedin.com/in/alexwright-dev',
        github: 'github.com/alexwright',
        summary: 'Senior Full Stack Engineer with 7+ years of experience engineering high-scale web applications, microservices, and cloud infrastructure. Proven track record of reducing latency by 45% and leading cross-functional teams to deliver enterprise SaaS solutions handling over 2M daily active users.'
      },
      workExperience: [
        {
          id: 'w1',
          company: 'CloudTech Solutions',
          position: 'Senior Full Stack Engineer',
          location: 'San Francisco, CA',
          startDate: '2021-03',
          endDate: '',
          current: true,
          highlights: [
            'Architected scalable React and Node.js microservices platform serving 2.5M daily requests with 99.99% uptime.',
            'Spearheaded migration from legacy monolithic application to Docker/Kubernetes containerized infrastructure, cutting AWS hosting costs by 32% ($140K annual savings).',
            'Mentored a team of 8 software engineers, conducting code reviews and championing CI/CD best practices.',
            'Implemented GraphQL API gateway reducing front-end API payload sizes by 55% and improving page load speeds by 1.8s.'
          ]
        },
        {
          id: 'w2',
          company: 'Apex Systems',
          position: 'Software Engineer',
          location: 'San Jose, CA',
          startDate: '2018-06',
          endDate: '2021-02',
          current: false,
          highlights: [
            'Developed responsive user interfaces using TypeScript, React, and Redux Toolkit for high-traffic financial dashboard.',
            'Integrated Stripe API processing over $12M in annual transactions with zero security vulnerabilities.',
            'Optimized PostgreSQL database indexing and query performance, lowering response times from 850ms to 120ms.'
          ]
        }
      ],
      education: [
        {
          id: 'e1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          location: 'Berkeley, CA',
          startDate: '2014-08',
          endDate: '2018-05',
          gpa: '3.8 / 4.0'
        }
      ],
      skills: [
        {
          category: 'Programming Languages',
          skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL', 'HTML5', 'CSS3']
        },
        {
          category: 'Frameworks & Libraries',
          skills: ['React.js', 'Next.js', 'Node.js', 'Express', 'GraphQL', 'TailwindCSS', 'Jest']
        },
        {
          category: 'Cloud & DevOps',
          skills: ['AWS (EC2, S3, Lambda)', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Git']
        }
      ],
      projects: [
        {
          id: 'p1',
          name: 'React Analytics Dashboard',
          description: 'Open source data visualization component library with automated charts and real-time telemetry.',
          technologies: ['React', 'D3.js', 'TypeScript'],
          link: 'https://github.com/alexwright/react-analytics'
        }
      ],
      certifications: [
        {
          id: 'c1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          date: '2023-04'
        }
      ]
    }
  },
  {
    id: 'product-manager',
    title: 'Product Manager / Lead',
    category: 'Product & Business',
    description: 'Data-driven Product Manager with experience launching B2B SaaS products and growth strategy.',
    rawText: `SARAH JENNINGS
New York, NY | (555) 839-1029 | s.jennings@email.com | linkedin.com/in/sarahjennings-pm

EXECUTIVE SUMMARY
Data-driven Senior Product Manager with 5+ years driving product strategy, roadmap execution, and user acquisition for B2B fintech products. Successfully launched 3 zero-to-one SaaS applications, driving $4.2M ARR growth within 18 months.

EXPERIENCE
Senior Product Manager | Finovate Capital, New York, NY | 2022 - Present
• Led cross-functional squad of 12 (engineers, designers, QA) to build AI-powered credit scoring engine, increasing approval speeds by 60%.
• Conducted user research with 80+ enterprise customers, defining product requirements (PRDs) and user journey maps.
• Increased monthly user retention by 28% through targeted onboarding optimization and feature adoption sprints.

Product Manager | MerchantGrowth SaaS, Boston, MA | 2019 - 2022
• Managed product roadmap for merchant analytics dashboard used by 15,000+ active small businesses.
• Prioritized backlog using RICE framework, delivering 14 major feature releases on schedule across 4 quarters.

SKILLS & CORE COMPETENCIES
• Product Strategy, User Discovery, A/B Testing, Wireframing, Agile / Scrum, Roadmap Prioritization
• Analytics & Tools: Mixpanel, Amplitude, Google Analytics, Jira, Figma, SQL, Tableau

EDUCATION
Bachelor of Business Administration in Marketing | Boston College | 2015 - 2019`,
    resumeData: {
      personalInfo: {
        fullName: 'Sarah Jennings',
        email: 's.jennings@email.com',
        phone: '(555) 839-1029',
        location: 'New York, NY',
        title: 'Senior Product Manager',
        linkedin: 'linkedin.com/in/sarahjennings-pm',
        summary: 'Data-driven Senior Product Manager with 5+ years driving product strategy, roadmap execution, and user acquisition for B2B fintech products. Successfully launched 3 zero-to-one SaaS applications, driving $4.2M ARR growth within 18 months.'
      },
      workExperience: [
        {
          id: 'w1',
          company: 'Finovate Capital',
          position: 'Senior Product Manager',
          location: 'New York, NY',
          startDate: '2022-01',
          endDate: '',
          current: true,
          highlights: [
            'Led cross-functional squad of 12 (engineers, designers, QA) to build AI-powered credit scoring engine, increasing approval speeds by 60%.',
            'Conducted user research with 80+ enterprise customers, defining product requirements (PRDs) and user journey maps.',
            'Increased monthly user retention by 28% through targeted onboarding optimization and feature adoption sprints.'
          ]
        },
        {
          id: 'w2',
          company: 'MerchantGrowth SaaS',
          position: 'Product Manager',
          location: 'Boston, MA',
          startDate: '2019-06',
          endDate: '2021-12',
          current: false,
          highlights: [
            'Managed product roadmap for merchant analytics dashboard used by 15,000+ active small businesses.',
            'Prioritized backlog using RICE framework, delivering 14 major feature releases on schedule across 4 quarters.'
          ]
        }
      ],
      education: [
        {
          id: 'e1',
          institution: 'Boston College',
          degree: 'Bachelor of Business Administration',
          fieldOfStudy: 'Marketing & Analytics',
          location: 'Boston, MA',
          startDate: '2015-09',
          endDate: '2019-05'
        }
      ],
      skills: [
        {
          category: 'Product Management',
          skills: ['Product Strategy', 'User Discovery', 'A/B Testing', 'Agile / Scrum', 'RICE Framework', 'Roadmapping']
        },
        {
          category: 'Analytics & Tools',
          skills: ['Mixpanel', 'Amplitude', 'SQL', 'Jira', 'Figma', 'Tableau', 'Google Analytics']
        }
      ],
      projects: [],
      certifications: [
        {
          id: 'c1',
          name: 'Certified Scrum Product Owner (CSPO)',
          issuer: 'Scrum Alliance',
          date: '2021-08'
        }
      ]
    }
  }
];

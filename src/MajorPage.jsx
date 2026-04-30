import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, TrendingUp, DollarSign, ExternalLink, BookOpen, FileText, Search, Info } from 'lucide-react';



const CAREER_KEY_MAP = {
  // UX / Research
  'UX Researcher': 'ux-researcher',
  'User Experience Researcher': 'ux-researcher',
  'UX/UI Designer': 'ux-ui-designer',
  'UX Writer': 'ux-writer',
  'UX/Product Designer': 'ux-ui-designer',

  // HR / People
  'HR Specialist': 'hr-specialist',
  'Human Resources Specialist': 'hr-specialist',
  'Human Resources Manager': 'hr-specialist',
  'Diversity & Inclusion Specialist': 'hr-specialist',
  'Diversity & Inclusion Manager': 'hr-specialist',
  'Diversity, Equity & Inclusion Specialist': 'hr-specialist',
  'Training & Development': 'training-development',
  'Training & Development Specialist': 'training-development',
  'Learning & Development Specialist': 'training-development',

  // Research / Analysis
  'Market Research Analyst': 'market-research-analyst',
  'Behavioral Health Technician': 'behavioral-health-technician',
  'Case Manager': 'case-manager',
  'Nurse Case Manager': 'case-manager',

  // Business / Operations
  'Operations Analyst': 'operations-analyst',
  'Operations Manager': 'operations-analyst',
  'Business Analyst': 'business-analyst',
  'Systems Analyst': 'business-analyst',
  'Financial Analyst': 'financial-analyst',
  'Corporate Finance Analyst': 'financial-analyst',
  'Supply Chain Analyst': 'supply-chain-analyst',
  'Global Supply Chain Analyst': 'supply-chain-analyst',
  'Supply Chain Engineer': 'supply-chain-analyst',
  'Sales Development Representative': 'sales-development-rep',
  'Customer Success Manager': 'customer-success',
  'Project Manager': 'project-manager',
  'IT Project Manager': 'project-manager',
  'Construction Project Manager': 'construction-project-manager',
  'ERP Consultant': 'erp-consultant',
  'Investment Banking Analyst': 'investment-banking-analyst',
  'Risk Analyst': 'risk-analyst',
  'Procurement Specialist': 'procurement-specialist',
  'Inventory Manager': 'supply-chain-analyst',
  'Logistics Coordinator': 'supply-chain-analyst',
  'Management Consultant': 'business-analyst',
  'Business Development Manager': 'business-analyst',

  // Finance
  'Financial Advisor': 'financial-analyst',
  'Actuarial Analyst': 'actuary',
  'Quantitative Analyst': 'quantitative-analyst',
  'Operations Research Analyst': 'operations-research',
  'Forensic Accountant': 'financial-analyst',
  'Tax Analyst': 'financial-analyst',
  'Staff Accountant': 'financial-analyst',
  'Auditor': 'financial-analyst',

  // Biology / Life Sciences
  'Clinical Research Coordinator': 'clinical-research-coordinator',
  'Medical Writer': 'medical-writer',
  'Regulatory Affairs Specialist': 'regulatory-affairs',
  'Data Analyst (Healthcare)': 'healthcare-data-analyst',
  'Healthcare Data Analyst': 'healthcare-data-analyst',
  'Pharmaceutical Sales Rep': 'pharmaceutical-sales',
  'Pharmaceutical Sales Representative': 'pharmaceutical-sales',
  'Lab Technician': 'lab-technician',
  'Research Associate': 'research-associate',
  'Medical Science Liaison': 'medical-science-liaison',
  'Quality Control Analyst': 'quality-engineer',
  'Health Educator': 'health-educator',
  'Clinical Engineer': 'systems-engineer',
  'Quality Engineer (Medical Devices)': 'quality-engineer',
  'Research & Development Engineer': 'research-associate',

  // CS / Tech
  'Data Analyst': 'data-analyst',
  'Data Analyst (Engineering)': 'data-analyst',
  'Product Manager': 'product-manager',
  'Product Manager (Technical)': 'product-manager',
  'AI Product Manager': 'product-manager',
  'Technical Writer': 'technical-writer',
  'Technical Writer (Multilingual)': 'technical-writer',
  'Software Engineer': 'software-engineer',
  'Full Stack Developer': 'software-engineer',
  'Cybersecurity Analyst': 'cybersecurity-analyst',
  'Cybersecurity Engineer': 'cybersecurity-analyst',
  'Security Engineer': 'cybersecurity-analyst',
  'Incident Response Analyst': 'cybersecurity-analyst',
  'Penetration Tester': 'cybersecurity-analyst',
  'Machine Learning Engineer': 'machine-learning-engineer',
  'MLOps Engineer': 'machine-learning-engineer',
  'AI Research Scientist': 'machine-learning-engineer',
  'Data Scientist': 'data-scientist',
  'Data Scientist (Manufacturing)': 'data-scientist',
  'Data Engineer': 'data-engineer',
  'Cloud Engineer': 'cloud-engineer',
  'Cloud Administrator': 'cloud-engineer',
  'DevOps Engineer': 'devops-engineer',
  'DevOps/Platform Engineer': 'devops-engineer',
  'Systems Administrator': 'systems-engineer',
  'IT Support Specialist': 'hr-specialist',
  'Database Administrator': 'data-analyst',
  'Business Intelligence Analyst': 'data-analyst',
  'Compliance/Risk Analyst': 'compliance-officer',

  // Communications / Writing
  'Corporate Communications Specialist': 'corporate-communications',
  'Communications Manager': 'corporate-communications',
  'Communications Specialist': 'corporate-communications',
  'Public Relations Specialist': 'public-relations',
  'Social Media Manager': 'social-media-manager',
  'Social Media Content Creator': 'social-media-manager',
  'Content Marketing Specialist': 'content-marketing',
  'Content Marketing Manager': 'content-marketing',
  'Digital Marketing Specialist': 'digital-marketing',
  'Digital Marketing Analyst': 'digital-marketing',
  'Content Strategist': 'content-strategist',
  'Grant Writer': 'grant-writer',
  'Copywriter': 'copywriter',
  'Employee Communications': 'corporate-communications',

  // Marketing / Sales
  'Sales Operations': 'sales-operations',
  'Product Marketing': 'product-marketing',
  'Product Marketing Manager': 'product-marketing',
  'Sales Manager': 'sales-development-rep',

  // Education / Training
  'Corporate Trainer': 'corporate-trainer',
  'Instructional Designer': 'instructional-designer',
  'Curriculum Developer (EdTech)': 'instructional-designer',
  'Teacher (K-12)': 'corporate-trainer',
  'Teacher/Educator': 'corporate-trainer',

  // Compliance / Legal
  'Compliance Officer': 'compliance-officer',
  'Compliance Specialist': 'compliance-officer',
  'Compliance Officer (Healthcare)': 'compliance-officer',
  'Corporate Security Analyst': 'corporate-security',
  'Loss Prevention Manager': 'corporate-security',
  'Emergency Management Specialist': 'corporate-security',
  'Probation/Parole Officer': 'corporate-security',

  // Policy / Government
  'Policy Analyst': 'policy-analyst',
  'Government Relations Specialist': 'government-relations',
  'Campaign Manager/Political Consultant': 'policy-analyst',
  'Nonprofit Program Manager': 'nonprofit-program-manager',
  'Nonprofit Manager': 'nonprofit-program-manager',
  'Nonprofit Program Director': 'nonprofit-program-manager',
  'Community Outreach Coordinator': 'nonprofit-program-manager',
  'Community Organizer/Advocate': 'nonprofit-program-manager',
  'Foreign Service Officer': 'government-relations',
  'International Trade Specialist': 'government-relations',

  // Engineering
  'Systems Engineer': 'systems-engineer',
  'Systems Architect': 'systems-engineer',
  'Project Engineer': 'project-manager',
  'Technical Sales Engineer': 'sales-development-rep',
  'Process Engineer': 'process-engineer',
  'Petroleum Engineer': 'process-engineer',
  'Structural Engineer': 'structural-engineer',
  'Transportation Engineer': 'structural-engineer',
  'Embedded Systems Engineer': 'embedded-systems-engineer',
  'Hardware Engineer': 'embedded-systems-engineer',
  'Mechanical Design Engineer': 'mechanical-design-engineer',
  'Manufacturing Engineer': 'manufacturing-engineer',
  'Product Development Engineer': 'mechanical-design-engineer',
  'HVAC/Building Systems Engineer': 'mechanical-design-engineer',
  'Environmental Engineer': 'environmental-engineer',
  'Remediation Engineer': 'environmental-engineer',
  'Water Resources Engineer': 'environmental-engineer',
  'Sustainability Engineer': 'sustainability-analyst',
  'Environmental Consultant': 'environmental-engineer',
  'Electrical Design Engineer': 'power-systems-engineer',
  'Power Systems Engineer': 'power-systems-engineer',
  'RF/Communications Engineer': 'power-systems-engineer',
  'Test Engineer': 'quality-engineer',
  'Quality Engineer': 'quality-engineer',
  'Materials Engineer': 'materials-engineer',
  'Process Engineer (Semiconductor)': 'process-engineer',
  'Research Engineer': 'research-associate',
  'Optical/Photonics Engineer': 'embedded-systems-engineer',
  'BIM Specialist': 'gis-analyst',
  'GIS Analyst': 'gis-analyst',
  'Sustainability Analyst': 'sustainability-analyst',
  'Process Improvement Engineer': 'process-engineer',
  'Data Analyst (Manufacturing)': 'manufacturing-data-analyst',

  // Healthcare / Nursing
  'Healthcare Administrator': 'healthcare-administrator',
  'Medical Practice Manager': 'healthcare-administrator',
  'Health Information Manager': 'healthcare-administrator',
  'Healthcare Analyst': 'healthcare-data-analyst',
  'Registered Nurse (RN)': 'registered-nurse',
  'Travel Nurse': 'registered-nurse',
  'Informatics Nurse': 'registered-nurse',
  'Epidemiologist': 'epidemiologist',
  'Biostatistician': 'biostatistician',
  'Community Health Worker': 'community-health-worker',
  'Public Health Program Manager': 'nonprofit-program-manager',
  'Registered Dietitian (RD)': 'registered-dietitian',
  'Nutrition Educator': 'health-educator',
  'Food Service Manager': 'operations-analyst',
  'Health Coach': 'health-educator',
  'Food Industry Specialist': 'quality-engineer',
  'Athletic Trainer': 'athletic-trainer',
  'Physical Therapist Assistant': 'athletic-trainer',
  'Occupational Therapist Assistant': 'athletic-trainer',
  'Corporate Wellness Coordinator': 'health-educator',
  'Speech-Language Pathologist': 'speech-language-pathologist',
  'Audiologist': 'speech-language-pathologist',
  'Early Intervention Specialist': 'speech-language-pathologist',
  'Rehabilitation Specialist': 'athletic-trainer',
  'Music Therapist': 'health-educator',
  'Chaplain/Counselor': 'nonprofit-program-manager',

  // Design / Creative
  'Graphic Designer': 'graphic-designer',
  'Graphic Designer (Corporate)': 'graphic-designer',
  'Art Director': 'art-director',
  'Art Director (Advertising)': 'art-director',
  'Motion Graphics Designer': 'graphic-designer',
  'Brand Designer': 'graphic-designer',
  'Exhibit/Experience Designer': 'ux-ui-designer',
  'Video Producer': 'content-marketing',
  'Audio/Video Producer': 'content-marketing',
  'Audio/Video Production': 'content-marketing',

  // Social Services
  'Social Worker': 'social-worker',
  'Child Protective Services Worker': 'social-worker',
  'School Social Worker': 'social-worker',
  'Clinical Social Worker': 'social-worker',

  // Planning / Architecture
  'Urban Planner': 'urban-planner',
  'Transportation Planner': 'urban-planner',
  'Community Development Specialist': 'urban-planner',
  'Real Estate Developer (Entry Level)': 'urban-planner',
  'Architectural Designer': 'architect',
  'Interior Designer': 'architect',

  // Events / Hospitality
  'Event Coordinator': 'project-manager',
  'Event Manager': 'project-manager',
  'Events Manager': 'project-manager',
  'Corporate Event Manager': 'project-manager',
  'Hotel/Resort Manager': 'operations-analyst',
  'Facility Manager': 'operations-analyst',

  // Sports
  'Athletic Director (Assistant)': 'operations-analyst',
  'Sports Marketing Coordinator': 'digital-marketing',

  // Localization / International
  'Localization Specialist': 'content-strategist',
  'International Business Coordinator': 'business-analyst',
  'UX Researcher (International Markets)': 'ux-researcher',
};

const CAREER_PIVOTS = {
'anthropology': {
  title: 'Anthropology',
  intro: 'Anthropology teaches you to understand human behavior, culture, and systems — skills that translate surprisingly well into tech, business, research, and social impact work.',
quickReality: {
  bestPayingPivots: [
    'UX Researcher',
    'Market Research Analyst',
    'Human Resources Specialist'
  ],
  fastestHiringRoles: [
    'Research Assistant',
    'Community Program Coordinator',
    'HR Assistant'
  ],
  mostUnderratedPath: 'UX Researcher',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'UX Research Intern',
    'Market Research Intern',
    'Human Resources Intern'
  ]
},
  careers: [
    { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior and culture is exactly what product teams need', salary: '$70k-95k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Study consumer behavior, trends, and cultural patterns for companies', salary: '$55k-80k' },
    { career: 'Human Resources Specialist', growth: '10%', why: 'Your understanding of people and workplace culture is valuable in HR', salary: '$50k-70k' },
    { career: 'Nonprofit Program Manager', growth: '9%', why: 'Work directly with communities, advocacy groups, and mission-driven organizations', salary: '$50k-75k' },
    { career: 'Community Outreach Coordinator', growth: '8%', why: 'Build trust, partnerships, and programs across diverse communities', salary: '$45k-65k' },
    { career: 'Diversity & Inclusion Specialist', growth: '11%', why: 'Cultural competency and systems thinking apply directly to inclusive workplace strategy', salary: '$60k-85k' },
  ],

  morePaths: {
    'Research + Product': [
      'UX Researcher',
      'User Research Coordinator',
      'Market Research Analyst',
      'Consumer Insights Analyst',
      'Research Associate'
    ],
    'People + Organizations': [
      'HR Specialist',
      'Recruiting Coordinator',
      'Employee Experience Specialist',
      'Learning & Development Specialist',
      'People Operations Analyst'
    ],
    'Community + Nonprofit': [
      'Nonprofit Program Manager',
      'Community Outreach Coordinator',
      'Program Coordinator',
      'Volunteer Manager',
      'Advocacy Coordinator'
    ],
    'Strategy + Communication': [
      'DEI Specialist',
      'Communications Specialist',
      'Policy Research Assistant',
      'Content Strategist',
      'Program Evaluation Analyst'
    ]
  },

  searchTerms: [
    'UX Research Intern',
    'Market Research Intern',
    'HR Intern',
    'Community Outreach Intern',
    'Nonprofit Intern',
    'Research Assistant Intern',
    'Policy Intern',
    'People Operations Intern',
    'Program Coordinator Intern'
  ],

  struggles: 'Anthropology is genuinely versatile but requires strong translation work. Most employers do not immediately understand how an anthropology degree applies to their business, so you need to make that case clearly.',

  honest: 'Anthropology has better outcomes than its reputation suggests — especially for UX research and market research. Companies like Google, Microsoft, and Meta actively hire anthropologists for user research. Pairing it with business, data, or tech skills makes the path much easier.',
},
'biochemistry': {
  title: 'Biochemistry',
  intro: 'Biochemistry sits at the intersection of biology and chemistry — giving you one of the strongest science foundations for careers in pharma, biotech, medicine, and research.',
quickReality: {
  bestPayingPivots: [
    'Medical Science Liaison',
    'Regulatory Affairs Specialist',
    'Clinical Research Manager'
  ],
  fastestHiringRoles: [
    'Research Associate',
    'Quality Control Analyst',
    'Clinical Research Coordinator'
  ],
  mostUnderratedPath: 'Regulatory Affairs Specialist',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Biochemistry Research Intern',
    'Clinical Research Intern',
    'Regulatory Affairs Intern'
  ]
},
  careers: [
    { career: 'Research Associate', growth: '10%', why: 'Lab research roles at pharma, biotech, and university labs — the most direct path', salary: '$50k-70k' },
    { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA approval processes — your biochem knowledge is essential', salary: '$65k-95k' },
    { career: 'Quality Control Analyst', growth: '9%', why: 'Ensure products meet standards in pharma, biotech, and food manufacturing', salary: '$50k-70k' },
    { career: 'Clinical Research Coordinator', growth: '14%', why: 'Manage clinical trials — strong science role without needing a PhD', salary: '$50k-70k' },
    { career: 'Medical Science Liaison', growth: '8%', why: 'Bridge between pharma companies and medical professionals — strong long-term pay path', salary: '$90k-130k' },
    { career: 'Technical Operations Associate', growth: '9%', why: 'Biotech and pharma manufacturing need strong science backgrounds in operations roles', salary: '$60k-85k' },
  ],

  morePaths: {
    'Lab + Research': [
      'Research Associate',
      'Lab Technician',
      'Clinical Research Coordinator',
      'Research Scientist',
      'Analytical Chemist'
    ],
    'Pharma + Compliance': [
      'Regulatory Affairs Specialist',
      'Quality Control Analyst',
      'Validation Specialist',
      'GMP Associate',
      'Technical Operations Associate'
    ],
    'Medical + Clinical': [
      'Medical Science Liaison',
      'Clinical Research Coordinator',
      'Clinical Trial Associate',
      'Healthcare Data Analyst',
      'Pharmaceutical Sales Rep'
    ],
    'Business + Science': [
      'Medical Writer',
      'Pharma Sales Representative',
      'Scientific Recruiter',
      'Technical Sales Specialist',
      'Product Specialist'
    ]
  },

  searchTerms: [
    'Biochemistry Intern',
    'Research Associate Intern',
    'Clinical Research Intern',
    'Regulatory Affairs Intern',
    'Quality Control Intern',
    'Lab Technician Intern',
    'Biotech Intern',
    'Validation Intern',
    'Pharmaceutical Operations Intern'
  ],

  struggles: 'Many biochemistry grads feel stuck between needing a PhD for research and not knowing what else to do. There are strong career paths that do not require additional degrees.',

  honest: 'Biochemistry starting salaries are lower than engineering for many entry-level lab roles, but they grow well over time. Medical science liaison is one of the highest-paying non-PhD paths, though it usually requires 2–3 years of lab or clinical experience first.',
},

'biology': {
  title: 'Biology',
  intro: 'A biology degree opens more doors than most students realize — especially if you are not going to medical school. Life sciences employment continues to grow across pharma, biotech, and healthcare.',
quickReality: {
  bestPayingPivots: [
    'Regulatory Affairs Specialist',
    'Healthcare Data Analyst',
    'Pharmaceutical Sales Rep'
  ],
  fastestHiringRoles: [
    'Lab Technician',
    'Clinical Research Coordinator',
    'Quality Control Analyst'
  ],
  mostUnderratedPath: 'Regulatory Affairs Specialist',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Clinical Research Intern',
    'Lab Technician Intern',
    'Regulatory Affairs Intern'
  ]
},
  careers: [
    { career: 'Clinical Research Coordinator', growth: '14%', why: 'Your science background without needing a PhD — manages clinical trials', salary: '$50k-70k' },
    { career: 'Pharmaceutical Sales Rep', growth: '6%', why: 'Biology knowledge plus communication skills — accessible with strong pay', salary: '$55k-75k + commission' },
    { career: 'Lab Technician', growth: '5%', why: 'Most accessible entry point — openings in pharma, biotech, hospitals, and food industry', salary: '$40k-55k' },
    { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA processes — underrated, well-paid, and your biology background is valuable', salary: '$65k-90k' },
    { career: 'Healthcare Data Analyst', growth: '23%', why: 'Health data is exploding — your science background helps you understand it', salary: '$60k-85k' },
    { career: 'Health Educator', growth: '7%', why: 'Teach communities about health — meaningful work with steady demand', salary: '$50k-65k' },
  ],

  morePaths: {
    'Healthcare + Clinical': [
      'Clinical Research Coordinator',
      'Medical Assistant',
      'Patient Care Coordinator',
      'Healthcare Administrator',
      'Health Educator'
    ],
    'Lab + Science': [
      'Lab Technician',
      'Research Assistant',
      'Quality Control Analyst',
      'Research Associate',
      'Environmental Scientist'
    ],
    'Pharma + Business': [
      'Pharmaceutical Sales Rep',
      'Regulatory Affairs Specialist',
      'Medical Writer',
      'Clinical Trial Associate',
      'Medical Device Specialist'
    ],
    'Data + Analysis': [
      'Healthcare Data Analyst',
      'Public Health Analyst',
      'Epidemiology Assistant',
      'Research Data Coordinator',
      'Biostatistics Assistant'
    ]
  },

  searchTerms: [
    'Biology Intern',
    'Clinical Research Intern',
    'Lab Technician Intern',
    'Healthcare Intern',
    'Regulatory Affairs Intern',
    'Pharmaceutical Sales Intern',
    'Research Assistant Intern',
    'Healthcare Data Analyst Intern',
    'Public Health Intern'
  ],

  struggles: 'Many biology students feel stuck between med school and not knowing what else to do. There are strong career paths that do not require additional degrees.',

  honest: 'Entry-level biology salaries start lower than some fields, especially for lab roles, but growth can be strong. Pharma sales, regulatory affairs, and healthcare data analytics often offer the best pay without requiring medical school or a PhD.',
},

'chemistry': {
  title: 'Chemistry',
  intro: 'Chemistry is one of the most practical science degrees. Your lab skills and analytical thinking apply directly to pharma, food, manufacturing, environmental sectors, and increasingly to data roles.',
quickReality: { bestPayingPivots: [ 'Regulatory Affairs Specialist', 'Pharmaceutical Sales Rep', 'Environmental Scientist' ], fastestHiringRoles: [ 'Lab Technician', 'Quality Control Analyst', 'Research Assistant' ], mostUnderratedPath: 'Regulatory Affairs Specialist', gradSchoolRequired: 'Sometimes', strongestInternshipSearches: [ 'Lab Technician Intern', 'Quality Control Intern', 'Regulatory Affairs Intern' ] },
  careers: [
    { career: 'Lab Technician', growth: '5%', why: 'Your lab skills apply directly across pharma, food, and manufacturing', salary: '$45k-60k' },
    { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA/EPA compliance — chemistry knowledge is essential', salary: '$65k-90k' },
    { career: 'Quality Control Analyst', growth: '9%', why: 'Every pharma, food, and manufacturing company needs QC', salary: '$50k-70k' },
    { career: 'Environmental Scientist', growth: '6%', why: 'Apply chemistry to address pollution and sustainability challenges', salary: '$55k-80k' },
    { career: 'Pharmaceutical Sales Rep', growth: '6%', why: 'Your chemistry background gives credibility with medical professionals', salary: '$55k-75k + commission' },
    { career: 'Validation Specialist', growth: '9%', why: 'Pharma and biotech companies need people who understand testing, documentation, and regulated processes', salary: '$60k-85k' },
  ],

  morePaths: {
    'Lab + Testing': [
      'Lab Technician',
      'Quality Control Analyst',
      'Analytical Chemist',
      'Research Assistant',
      'Formulation Chemist'
    ],
    'Pharma + Compliance': [
      'Regulatory Affairs Specialist',
      'Validation Specialist',
      'GMP Associate',
      'Quality Assurance Specialist',
      'Technical Operations Associate'
    ],
    'Environment + Safety': [
      'Environmental Scientist',
      'EHS Specialist',
      'Water Quality Analyst',
      'Environmental Consultant',
      'Hazardous Materials Specialist'
    ],
    'Business + Science': [
      'Pharmaceutical Sales Rep',
      'Technical Sales Specialist',
      'Medical Writer',
      'Product Specialist',
      'Scientific Recruiter'
    ]
  },

  searchTerms: [
    'Chemistry Intern',
    'Lab Technician Intern',
    'Quality Control Intern',
    'Regulatory Affairs Intern',
    'Validation Intern',
    'Environmental Science Intern',
    'Pharmaceutical Intern',
    'Research Assistant Intern',
    'Analytical Chemistry Intern'
  ],

  struggles: 'Many chemistry grads feel pressure to go to graduate school. You do not have to. Regulatory affairs, validation, quality, and pharma sales are strong paths that value your degree without requiring more school.',

  honest: 'Chemistry entry-level roles often start lower than other STEM fields, especially in lab technician roles, but they can grow well with experience. Regulatory affairs, validation, and quality roles are often the strongest non-grad-school paths for chemistry majors.',
},

'computer-information-systems': {
  title: 'Computer Information Systems',
  intro: 'Computer information systems is a practical, applied degree that prepares you to work with technology in business contexts. You are more immediately job-ready than CS grads in many business-facing roles.',
quickReality: {
  bestPayingPivots: [
    'Cloud Administrator',
    'IT Project Manager',
    'Database Administrator'
  ],
  fastestHiringRoles: [
    'Systems Analyst',
    'Business Analyst',
    'Help Desk / IT Support'
  ],
  mostUnderratedPath: 'Cloud Administrator',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'CIS Internship',
    'Business Analyst Intern',
    'Cloud Support Intern'
  ]
},
  careers: [
    { career: 'Systems Analyst', growth: '9%', why: 'Analyze and improve information systems — your degree is exactly right for this', salary: '$60k-85k' },
    { career: 'Business Analyst', growth: '14%', why: 'Bridge between IT and business — CIS grads are well-positioned', salary: '$60k-85k' },
    { career: 'Database Administrator', growth: '9%', why: 'Manage and optimize databases — steady demand across all industries', salary: '$65k-95k' },
    { career: 'IT Project Manager', growth: '9%', why: 'Manage technology implementations with business and technical credibility', salary: '$70k-100k' },
    { career: 'Cloud Administrator', growth: '22%', why: 'Manage cloud infrastructure — AWS/Azure certifications boost this significantly', salary: '$70k-100k' },
    { career: 'Cybersecurity Analyst', growth: '32%', why: 'Your systems and IT foundation gives you a strong base for security roles', salary: '$70k-95k' },
  ],

  morePaths: {
    'Business + Systems': [
      'Business Analyst',
      'Systems Analyst',
      'ERP Analyst',
      'IT Consultant',
      'Implementation Specialist'
    ],
    'Data + Databases': [
      'Database Administrator',
      'Data Analyst',
      'Business Intelligence Analyst',
      'Reporting Analyst',
      'SQL Analyst'
    ],
    'Cloud + IT': [
      'Cloud Administrator',
      'Systems Administrator',
      'Network Administrator',
      'IT Support Specialist',
      'Cloud Engineer'
    ],
    'Security + Projects': [
      'Cybersecurity Analyst',
      'IT Project Manager',
      'Risk Analyst',
      'Compliance Analyst',
      'Product Support Specialist'
    ]
  },

  searchTerms: [
    'Information Systems Intern',
    'Business Analyst Intern',
    'Systems Analyst Intern',
    'IT Intern',
    'Data Analyst Intern',
    'Database Intern',
    'Cloud Intern',
    'Cybersecurity Intern',
    'IT Project Management Intern'
  ],

  struggles: 'CIS is sometimes seen as less rigorous than CS by tech employers. For business-facing roles, it is often actually a better fit. For pure software engineering roles, CS grads usually have an advantage.',

  honest: 'CIS has solid job prospects and starting salaries around $60-75k. Adding cloud, SQL, cybersecurity, or ERP certifications can dramatically improve your options. For business-facing tech roles, CIS is often more practical than CS.',
},

'environmental-science': {
  title: 'Environmental Science',
  intro: 'Environmental science is growing steadily as climate change, sustainability regulations, and infrastructure investment create ongoing demand. You understand both the science and the systems.',
quickReality: {
  bestPayingPivots: [
    'Sustainability Analyst',
    'Environmental Consultant',
    'Environmental Health and Safety Specialist'
  ],
  fastestHiringRoles: [
    'Environmental Scientist',
    'GIS Analyst',
    'Field Technician'
  ],
  mostUnderratedPath: 'Environmental Health and Safety Specialist',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Environmental Science Internship',
    'Sustainability Intern',
    'EHS Internship'
  ]
},
  careers: [
    { career: 'Environmental Scientist', growth: '6%', why: 'Monitor, assess, and protect the environment — core environmental science role', salary: '$55k-80k' },
    { career: 'Environmental Consultant', growth: '8%', why: 'Help companies comply with environmental regulations and reduce impact', salary: '$55k-85k' },
    { career: 'Sustainability Analyst', growth: '14%', why: 'Companies increasingly need people who can measure and improve sustainability', salary: '$60k-85k' },
    { career: 'GIS Analyst', growth: '14%', why: 'Geographic information systems — spatial analysis of environmental data', salary: '$55k-80k' },
    { career: 'Environmental Health and Safety Specialist', growth: '5%', why: 'Ensure workplace and environmental safety compliance — steady demand', salary: '$55k-80k' },
    { career: 'Water Quality Analyst', growth: '6%', why: 'Water testing, monitoring, and compliance are steady paths in public and private sectors', salary: '$50k-75k' },
  ],

  morePaths: {
    'Field + Science': [
      'Environmental Scientist',
      'Field Technician',
      'Water Quality Analyst',
      'Soil Scientist',
      'Conservation Scientist'
    ],
    'Consulting + Compliance': [
      'Environmental Consultant',
      'EHS Specialist',
      'Environmental Compliance Specialist',
      'Permitting Specialist',
      'Site Assessment Specialist'
    ],
    'Sustainability + Climate': [
      'Sustainability Analyst',
      'Climate Analyst',
      'ESG Analyst',
      'Energy Analyst',
      'Carbon Accounting Specialist'
    ],
    'Data + Mapping': [
      'GIS Analyst',
      'Environmental Data Analyst',
      'Remote Sensing Analyst',
      'Research Assistant',
      'Public Health Analyst'
    ]
  },

  searchTerms: [
    'Environmental Science Intern',
    'Environmental Intern',
    'Sustainability Intern',
    'GIS Intern',
    'EHS Intern',
    'Environmental Consultant Intern',
    'Water Quality Intern',
    'Conservation Intern',
    'Environmental Compliance Intern'
  ],

  struggles: 'Environmental science starting salaries are lower than engineering-focused environmental roles. Many positions require field work in sometimes remote locations. Government hiring can also be slow.',

  honest: 'Environmental science has strong long-term prospects as climate regulations tighten. Starting salaries are modest, but sustainability, GIS, EHS, and corporate ESG roles can offer better pay and clearer growth than traditional field-only roles.',
},
'journalism': {
  title: 'Journalism',
  intro: 'Journalism teaches research, interviewing, clear writing, fast decision-making, and how to communicate under pressure. Those skills are highly valuable — even as traditional newsroom jobs have contracted — especially in content strategy, communications, UX writing, and business storytelling roles.',
quickReality: {
  bestPayingPivots: [
    'UX Writer',
    'Content Strategist',
    'Communications Manager'
  ],
  fastestHiringRoles: [
    'Communications Assistant',
    'Content Marketing Intern',
    'Public Relations Coordinator'
  ],
  mostUnderratedPath: 'UX Writer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Communications Intern',
    'Content Strategy Intern',
    'UX Writing Intern'
  ]
},
  careers: [
    { career: 'Content Strategist', growth: '15%', why: 'Editorial judgment, audience understanding, and strong writing transfer directly to content strategy', salary: '$60k-85k' },
    { career: 'Communications Manager', growth: '8%', why: 'Organizations need people who can manage messaging clearly and credibly', salary: '$60k-85k' },
    { career: 'UX Writer', growth: '23%', why: 'Writing clearly for real people inside products is a natural journalism pivot', salary: '$75k-100k' },
    { career: 'Public Relations Specialist', growth: '8%', why: 'Understanding how media works makes you much stronger in PR', salary: '$50k-70k' },
    { career: 'Technical Writer', growth: '7%', why: 'Explaining complex topics simply is one of journalism’s strongest transferable skills', salary: '$60k-80k' },
    { career: 'Brand Content Manager', growth: '14%', why: 'Companies need editorial thinkers who understand story, trust, and audience behavior', salary: '$65k-90k' },
  ],

  morePaths: {
    'Writing + Editorial': [
      'Content Strategist',
      'UX Writer',
      'Technical Writer',
      'Grant Writer',
      'Editorial Content Manager'
    ],
    'Communications + PR': [
      'Communications Manager',
      'PR Specialist',
      'Corporate Communications',
      'Internal Communications',
      'Media Relations'
    ],
    'Business + Brand Storytelling': [
      'Brand Content Manager',
      'Content Marketing',
      'Customer Education',
      'Thought Leadership',
      'Marketing Strategy'
    ],
    'Traditional Media + Reporting': [
      'Reporter',
      'Producer',
      'Digital News Editor',
      'Broadcast Support',
      'Investigative Research'
    ]
  },

  searchTerms: [
    'Journalism Intern',
    'Communications Intern',
    'Content Strategy Intern',
    'UX Writing Intern',
    'PR Intern',
    'Editorial Intern',
    'Brand Content Intern',
    'Corporate Communications Intern',
    'Technical Writing Intern'
  ],

  struggles: 'Traditional journalism jobs — newspapers, magazines, and broadcast — have contracted dramatically. Local news is in real crisis, and many entry-level newsroom roles offer low pay with high burnout and limited stability.',

  honest: 'If your goal is traditional journalism, go in with clear eyes — it is meaningful work, but often financially difficult. Content strategy, communications, UX writing, and brand storytelling offer similar intellectual work with significantly better pay, stability, and long-term growth.',
},
'communications': {
  title: 'Communications',
  intro: 'Communications teaches messaging, audience psychology, storytelling, and how to influence people through media. The strongest careers today are digital-first, data-aware, and tied directly to business results — not just traditional PR or social media posting.',
quickReality: {
  bestPayingPivots: [
    'Content Marketing Manager',
    'Corporate Communications Manager',
    'Product Marketing Manager'
  ],
  fastestHiringRoles: [
    'Social Media Coordinator',
    'Digital Marketing Specialist',
    'Communications Assistant'
  ],
  mostUnderratedPath: 'Corporate Communications Specialist',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Communications Intern',
    'Digital Marketing Intern',
    'Corporate Communications Intern'
  ]
},
  careers: [
    { career: 'Content Marketing Manager', growth: '15%', why: 'Plan and create content that drives revenue, trust, and business growth', salary: '$55k-80k' },
    { career: 'Digital Marketing Specialist', growth: '17%', why: 'Data-driven marketing using SEO, paid media, and analytics — strong growth path', salary: '$50k-70k' },
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Every company needs strong internal and external communication strategy', salary: '$55k-80k' },
    { career: 'Social Media Manager', growth: '10%', why: 'Audience engagement and brand storytelling are core communications strengths', salary: '$50k-75k' },
    { career: 'Public Relations Specialist', growth: '8%', why: 'Manage reputation, media relationships, and public messaging', salary: '$50k-70k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Communication skills tied to retention and revenue make this a strong business pivot', salary: '$55k-80k' },
  ],

  morePaths: {
    'Marketing + Growth': [
      'Content Marketing Manager',
      'Digital Marketing Specialist',
      'Growth Marketing',
      'Product Marketing',
      'SEO + Paid Media'
    ],
    'Corporate + Brand': [
      'Corporate Communications',
      'PR Specialist',
      'Internal Communications',
      'Brand Strategy',
      'Employer Branding'
    ],
    'Client + Revenue Roles': [
      'Customer Success Manager',
      'Account Manager',
      'Sales Enablement',
      'Client Services',
      'Business Development'
    ],
    'Media + Content': [
      'Social Media Manager',
      'Content Producer',
      'Community Manager',
      'Creative Operations',
      'Brand Content Strategy'
    ]
  },

  searchTerms: [
    'Communications Intern',
    'Content Marketing Intern',
    'Digital Marketing Intern',
    'PR Intern',
    'Customer Success Intern',
    'Corporate Communications Intern',
    'Brand Marketing Intern',
    'Social Media Intern',
    'Marketing Analytics Intern'
  ],

  struggles: 'Traditional PR and communications roles have been heavily disrupted by digital media and AI tools. Graduates without skills in analytics, SEO, paid media, or content strategy are at a major disadvantage in the current market.',

  honest: 'Starting salaries in communications often feel low for a degree. The students who earn the most usually move toward product marketing, growth marketing, customer success, or content strategy — roles where communication directly drives revenue, not just visibility.',
},
'data-science': {
  title: 'Data Science',
  intro: 'Data science is one of the fastest growing fields in the economy. Companies across every industry are trying to make sense of their data — and they need people who can do it.',
quickReality: {
  bestPayingPivots: [
    'Machine Learning Engineer',
    'Data Engineer',
    'Data Scientist'
  ],
  fastestHiringRoles: [
    'Data Analyst',
    'Business Intelligence Analyst',
    'Reporting Analyst'
  ],
  mostUnderratedPath: 'Data Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Data Analyst Intern',
    'Business Intelligence Intern',
    'Data Engineering Intern'
  ]
},
  careers: [
    { career: 'Data Scientist', growth: '35%', why: 'Build models and extract insights from complex datasets', salary: '$85k-120k' },
    { career: 'Data Analyst', growth: '23%', why: 'More accessible entry point — analyze data and communicate findings', salary: '$65k-90k' },
    { career: 'Machine Learning Engineer', growth: '40%', why: 'Build and deploy ML models at scale — one of the fastest growing tech roles', salary: '$100k-140k' },
    { career: 'Business Intelligence Analyst', growth: '18%', why: 'Turn data into business decisions using dashboards and reporting', salary: '$65k-90k' },
    { career: 'Data Engineer', growth: '21%', why: 'Build the pipelines that make data usable — often easier entry than pure DS roles', salary: '$85k-120k' },
    { career: 'Analytics Engineer', growth: '20%', why: 'Bridge data engineering and business intelligence — growing fast and underrated', salary: '$80k-115k' },
  ],

  morePaths: {
    'Core Data Roles': [
      'Data Scientist',
      'Data Analyst',
      'Business Intelligence Analyst',
      'Analytics Engineer',
      'Decision Scientist'
    ],
    'Engineering + Infrastructure': [
      'Data Engineer',
      'Machine Learning Engineer',
      'Platform Engineer',
      'Cloud Data Engineer',
      'Database Engineer'
    ],
    'Business + Strategy': [
      'Operations Analyst',
      'Product Analyst',
      'Financial Analyst',
      'Revenue Analyst',
      'Strategy Analyst'
    ],
    'Specialized Paths': [
      'Healthcare Data Analyst',
      'Marketing Analyst',
      'Fraud Analyst',
      'Supply Chain Analyst',
      'Quantitative Analyst'
    ]
  },

  searchTerms: [
    'Data Science Intern',
    'Data Analyst Intern',
    'Business Intelligence Intern',
    'Data Engineering Intern',
    'Machine Learning Intern',
    'Analytics Intern',
    'SQL Analyst Intern',
    'Product Analyst Intern',
    'Operations Analyst Intern'
  ],

  struggles: 'Data science is one of the most hyped fields, which means the entry-level market is crowded. Pure data scientist roles are competitive and often expect experience beyond graduation.',

  honest: 'Data science salaries are excellent, but the field split hard — senior roles pay extremely well while entry-level hiring is much tougher. Data engineering and analytics roles are often the smarter first move. Strong Python and SQL skills are non-negotiable.',
},

'cybersecurity': {
  title: 'Cybersecurity',
  intro: 'Cybersecurity has one of the largest talent shortages of any field — organizations across every industry need people who can protect systems, data, and infrastructure.',
quickReality: {
  bestPayingPivots: [
    'Security Engineer',
    'Penetration Tester',
    'Cloud Security Engineer'
  ],
  fastestHiringRoles: [
    'Cybersecurity Analyst',
    'SOC Analyst',
    'Compliance/Risk Analyst'
  ],
  mostUnderratedPath: 'Compliance/Risk Analyst',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Cybersecurity Internship',
    'SOC Analyst Intern',
    'Security Operations Intern'
  ]
},
  careers: [
    { career: 'Cybersecurity Analyst', growth: '32%', why: 'Monitor and protect systems from threats — high demand almost everywhere', salary: '$70k-95k' },
    { career: 'Penetration Tester', growth: '28%', why: 'Ethically hack systems to find vulnerabilities — specialized and well-paid', salary: '$80k-120k' },
    { career: 'Security Engineer', growth: '32%', why: 'Build secure systems from the ground up and prevent issues before they happen', salary: '$90k-130k' },
    { career: 'Incident Response Analyst', growth: '30%', why: 'Respond to and recover from security breaches — high pressure, high value role', salary: '$75k-105k' },
    { career: 'Compliance/Risk Analyst', growth: '15%', why: 'Ensure organizations meet security and regulatory requirements', salary: '$65k-90k' },
    { career: 'Cloud Security Engineer', growth: '28%', why: 'As companies move to AWS/Azure, cloud security is becoming one of the strongest paths', salary: '$95k-135k' },
  ],

  morePaths: {
    'Security Operations': [
      'Cybersecurity Analyst',
      'SOC Analyst',
      'Incident Response Analyst',
      'Threat Intelligence Analyst',
      'Security Operations Engineer'
    ],
    'Offensive + Testing': [
      'Penetration Tester',
      'Red Team Analyst',
      'Vulnerability Analyst',
      'Application Security Tester',
      'Security Consultant'
    ],
    'Engineering + Cloud': [
      'Security Engineer',
      'Cloud Security Engineer',
      'DevSecOps Engineer',
      'Identity Access Management Engineer',
      'Network Security Engineer'
    ],
    'Risk + Compliance': [
      'Compliance Analyst',
      'Risk Analyst',
      'Governance Analyst',
      'Security Auditor',
      'GRC Specialist'
    ]
  },

  searchTerms: [
    'Cybersecurity Intern',
    'Security Analyst Intern',
    'SOC Analyst Intern',
    'Penetration Testing Intern',
    'Cloud Security Intern',
    'Compliance Analyst Intern',
    'Risk Analyst Intern',
    'Security Engineering Intern',
    'IT Security Intern'
  ],

  struggles: 'Cybersecurity requires continuous learning because threats evolve constantly. Certifications like Security+, Network+, CEH, and eventually CISSP often matter almost as much as the degree.',

  honest: 'Cybersecurity is one of the strongest job markets in tech right now. Starting salaries are strong and growth is fast. Getting Security+ early is one of the highest ROI moves you can make because it opens far more doors than students expect.',
},

'ai-machine-learning': {
  title: 'AI / Machine Learning',
  intro: 'AI and machine learning is one of the fastest-moving fields in tech. The rise of generative AI created massive demand for people who understand how models are built, deployed, and improved in the real world.',
quickReality: {
  bestPayingPivots: [
    'Machine Learning Engineer',
    'MLOps Engineer',
    'AI Product Manager'
  ],
  fastestHiringRoles: [
    'Data Analyst',
    'Machine Learning Intern',
    'Software Engineering Intern'
  ],
  mostUnderratedPath: 'MLOps Engineer',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Machine Learning Intern',
    'Data Science Intern',
    'AI Engineering Internship'
  ]
},
  careers: [
    { career: 'Machine Learning Engineer', growth: '40%', why: 'Build and deploy ML models at scale — one of the fastest growing roles in tech', salary: '$100k-145k' },
    { career: 'AI Research Scientist', growth: '35%', why: 'Push the boundaries of what AI can do — usually requires graduate study', salary: '$110k-160k' },
    { career: 'Data Scientist', growth: '35%', why: 'Apply ML to real business problems — often more accessible than pure research', salary: '$85k-120k' },
    { career: 'MLOps Engineer', growth: '38%', why: 'Deploy, monitor, and maintain ML systems in production — increasingly critical', salary: '$100k-140k' },
    { career: 'AI Product Manager', growth: '25%', why: 'Guide AI product development — strong technical understanding matters here', salary: '$100k-140k' },
    { career: 'Data Engineer', growth: '21%', why: 'Strong ML teams depend on clean, usable data pipelines — often easier entry than research-heavy roles', salary: '$85k-120k' },
  ],

  morePaths: {
    'Core ML + Modeling': [
      'Machine Learning Engineer',
      'Data Scientist',
      'Applied Scientist',
      'Research Engineer',
      'AI Research Scientist'
    ],
    'Infrastructure + Deployment': [
      'MLOps Engineer',
      'Data Engineer',
      'Platform Engineer',
      'Cloud ML Engineer',
      'Analytics Engineer'
    ],
    'Product + Strategy': [
      'AI Product Manager',
      'Product Analyst',
      'Technical Program Manager',
      'Solutions Architect',
      'Technical Consultant'
    ],
    'Specialized Paths': [
      'NLP Engineer',
      'Computer Vision Engineer',
      'Recommendation Systems Engineer',
      'Fraud Detection Analyst',
      'Quantitative Analyst'
    ]
  },

  searchTerms: [
    'Machine Learning Intern',
    'Data Science Intern',
    'AI Intern',
    'MLOps Intern',
    'Data Engineering Intern',
    'Research Engineer Intern',
    'Applied Scientist Intern',
    'Product Analytics Intern',
    'Computer Vision Intern'
  ],

  struggles: 'AI/ML is extremely competitive at the top. The most exciting research roles usually require graduate degrees. Students often underestimate how much math, experimentation, and debugging are involved compared to “just using AI tools.”',

  honest: 'AI/ML has one of the highest salary ceilings in tech right now. Research roles almost always require a master’s or PhD. Applied ML engineering roles are much more accessible with a strong bachelor’s degree, strong Python skills, and real portfolio projects. PyTorch, SQL, and statistics are non-negotiable.',
},

'information-technology': {
  title: 'Information Technology',
  intro: 'IT is the backbone of every organization. Unlike CS, which is more theoretical, IT focuses on keeping systems running, secure, and efficient — making IT graduates useful from day one.',
quickReality: {
  bestPayingPivots: [
    'Cloud Engineer',
    'Cybersecurity Analyst',
    'IT Project Manager'
  ],
  fastestHiringRoles: [
    'IT Support Specialist',
    'Systems Administrator',
    'Help Desk Technician'
  ],
  mostUnderratedPath: 'Cloud Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'IT Internship',
    'Systems Administrator Intern',
    'Cloud Engineering Intern'
  ]
},
  careers: [
    { career: 'IT Support Specialist', growth: '6%', why: 'Most accessible entry point — help organizations keep systems running and people productive', salary: '$45k-65k' },
    { career: 'Systems Administrator', growth: '3%', why: 'Manage servers, networks, users, and core IT infrastructure', salary: '$60k-85k' },
    { career: 'Cloud Engineer', growth: '22%', why: 'Companies moving to cloud need people who understand both IT and cloud platforms', salary: '$80k-115k' },
    { career: 'IT Project Manager', growth: '9%', why: 'Manage technology rollouts and business systems with technical credibility', salary: '$75k-100k' },
    { career: 'Cybersecurity Analyst', growth: '32%', why: 'Your IT infrastructure knowledge translates directly to security work', salary: '$70k-95k' },
    { career: 'Network Administrator', growth: '5%', why: 'Reliable demand for people who manage networks, access, and connectivity', salary: '$60k-85k' },
  ],

  morePaths: {
    'Support + Infrastructure': [
      'IT Support Specialist',
      'Systems Administrator',
      'Network Administrator',
      'Help Desk Analyst',
      'Desktop Support Technician'
    ],
    'Cloud + Systems': [
      'Cloud Engineer',
      'Cloud Administrator',
      'Systems Engineer',
      'Infrastructure Analyst',
      'Platform Support Engineer'
    ],
    'Security + Compliance': [
      'Cybersecurity Analyst',
      'Security Operations Analyst',
      'Risk Analyst',
      'Compliance Analyst',
      'Access Management Specialist'
    ],
    'Projects + Business': [
      'IT Project Manager',
      'Business Systems Analyst',
      'Implementation Specialist',
      'Technical Account Manager',
      'ERP Support Analyst'
    ]
  },

  searchTerms: [
    'IT Intern',
    'Help Desk Intern',
    'Systems Administrator Intern',
    'Cloud Intern',
    'Cybersecurity Intern',
    'Network Intern',
    'IT Support Intern',
    'Infrastructure Intern',
    'IT Project Management Intern'
  ],

  struggles: 'IT starting salaries are lower than CS or software engineering. Traditional sysadmin paths are shrinking while cloud, automation, and security roles are growing much faster.',

  honest: 'IT is one of the most practical and accessible tech degrees. Starting salaries are lower at first, but AWS, Azure, Google Cloud, and Security+ certifications can dramatically change your earning potential. Cloud and security are where the strongest growth is.',
},
'computer-science': {
  title: 'Computer Science',
  intro: 'Computer science is one of the most in-demand degrees in the world. The theoretical foundation you build — algorithms, data structures, systems — opens doors across nearly every industry.',

  quickReality: {
  bestPayingPivots: [
    'Software Engineer',
    'Product Manager',
    'Data Scientist'
  ],
  fastestHiringRoles: [
    'QA Engineer',
    'Technical Support Engineer',
    'Data Analyst'
  ],
  mostUnderratedPath: 'Technical Writer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Software Engineering Intern',
    'Data Analyst Intern',
    'Product Management Intern'
  ]
},
  careers: [
    { career: 'Software Engineer', growth: '22%', why: 'Core CS path — building products, platforms, and systems at every type of company', salary: '$90k-130k' },
    { career: 'Data Scientist', growth: '35%', why: 'Your CS foundation translates well into ML, modeling, and data-driven systems', salary: '$85k-120k' },
    { career: 'Cybersecurity Engineer', growth: '32%', why: 'Massive demand for people who understand how systems actually work and break', salary: '$85k-120k' },
    { career: 'Product Manager', growth: '19%', why: 'Technical background makes you a stronger PM than most non-technical candidates', salary: '$90k-130k' },
    { career: 'Data Engineer', growth: '21%', why: 'Build data systems and pipelines — often less saturated than software engineering', salary: '$85k-120k' },
    { career: 'Technical Writer', growth: '7%', why: 'Your CS knowledge helps you explain complex systems clearly — underrated but strong path', salary: '$60k-85k' },
  ],

  morePaths: {
    'Software + Product': [
      'Software Engineer',
      'Backend Engineer',
      'Frontend Engineer',
      'Full Stack Developer',
      'Product Manager'
    ],
    'Data + AI': [
      'Data Scientist',
      'Data Engineer',
      'Machine Learning Engineer',
      'Analytics Engineer',
      'Business Intelligence Analyst'
    ],
    'Security + Systems': [
      'Cybersecurity Engineer',
      'Security Analyst',
      'Cloud Engineer',
      'DevOps Engineer',
      'Site Reliability Engineer'
    ],
    'Alternative High-Value Paths': [
      'Technical Writer',
      'Solutions Engineer',
      'Developer Relations',
      'Technical Consultant',
      'Sales Engineer'
    ]
  },

  searchTerms: [
    'Software Engineering Intern',
    'Computer Science Intern',
    'Backend Intern',
    'Data Engineering Intern',
    'Cybersecurity Intern',
    'Cloud Engineering Intern',
    'Product Management Intern',
    'Technical Writing Intern',
    'DevOps Intern'
  ],

  struggles: 'The CS job market is more competitive than it was in 2020–2022. Big tech layoffs made entry-level hiring feel harder, and students often underestimate how much internships and networking matter.',

  honest: 'CS still has some of the strongest long-term outcomes of any degree. The market is simply more selective now. Real projects, internships, GitHub activity, and strong interviewing skills matter far more than just GPA.',
},
'architecture': {
  title: 'Architecture',
  intro: 'Architecture combines design, technical systems, problem-solving, and project management. You learn how spaces function, how buildings get built, and how to balance creativity with real-world constraints — skills that transfer beyond traditional architecture firms.',
quickReality: {
  bestPayingPivots: [
    'Construction Project Manager',
    'Real Estate Development Associate',
    'UX/Product Designer'
  ],
  fastestHiringRoles: [
    'Architectural Designer',
    'BIM Specialist',
    'Construction Coordinator'
  ],
  mostUnderratedPath: 'BIM Specialist',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Architecture Intern',
    'BIM Intern',
    'Construction Management Intern'
  ]
},
  careers: [
    { career: 'Architectural Designer', growth: '5%', why: 'Core path — design buildings and spaces at architecture firms, with licensure later', salary: '$50k-70k' },
    { career: 'Interior Designer', growth: '4%', why: 'Design functional and aesthetic spaces for residential and commercial clients', salary: '$50k-75k' },
    { career: 'Construction Project Manager', growth: '8%', why: 'Your technical and design knowledge makes you highly credible in construction leadership', salary: '$70k-100k' },
    { career: 'UX/Product Designer', growth: '16%', why: 'Design thinking and systems thinking transfer surprisingly well to digital products', salary: '$70k-100k' },
    { career: 'BIM Specialist', growth: '10%', why: 'Building Information Modeling is one of the strongest technical architecture paths', salary: '$60k-85k' },
    { career: 'Real Estate Development Associate', growth: '5%', why: 'Understanding buildings and land use creates strong crossover into development', salary: '$55k-85k' },
  ],

  morePaths: {
    'Traditional Architecture': [
      'Architectural Designer',
      'Interior Designer',
      'BIM Specialist',
      'Project Architect Track',
      'Licensure Path'
    ],
    'Construction + Real Estate': [
      'Construction Project Manager',
      'Real Estate Development Associate',
      'Site Planning Coordinator',
      'Facilities Manager',
      'Construction Operations'
    ],
    'Design + Tech': [
      'UX/Product Designer',
      'Exhibit Designer',
      'Experience Designer',
      'Space Planning Specialist',
      'Visualization Designer'
    ],
    'Higher ROI Pivots': [
      'Owner’s Rep',
      'Development Project Manager',
      'Corporate Real Estate',
      'Product Design',
      'Design Strategy Roles'
    ]
  },

  searchTerms: [
    'Architecture Intern',
    'Architectural Design Intern',
    'Construction Management Intern',
    'BIM Intern',
    'Real Estate Development Intern',
    'UX Design Intern',
    'Interior Design Intern',
    'Facilities Management Intern',
    'Project Management Intern'
  ],

  struggles: 'Architecture starting salaries are lower than many students expect given how difficult and time-intensive the degree is. Licensure takes years after graduation, and many architects earn less early on than engineers with similar workloads.',

  honest: 'Architecture requires real interest in the work because the early pay rarely matches the effort. Students who pivot into construction management, real estate development, BIM, or UX design often increase both salary and flexibility. Licensure improves long-term earning potential, but it is a long road.',
},
'communication-sciences': {
  title: 'Communication Sciences / Speech Pathology',
  intro: 'Communication sciences and disorders prepares you to assess and support speech, language, hearing, and swallowing disorders. It is a meaningful and growing field — but the most important thing to know is this: becoming a Speech-Language Pathologist requires graduate school, not just a bachelor’s degree.',
quickReality: {
  bestPayingPivots: [
    'Speech-Language Pathologist',
    'Audiologist',
    'Clinical Research Coordinator'
  ],
  fastestHiringRoles: [
    'Early Intervention Specialist',
    'Rehabilitation Assistant',
    'Clinical Support Roles'
  ],
  mostUnderratedPath: 'Clinical Research Coordinator',
  gradSchoolRequired: 'Yes',
  strongestInternshipSearches: [
    'Speech Pathology Internship',
    'Clinical Research Intern',
    'Early Intervention Internship'
  ]
},
  careers: [
    { career: 'Speech-Language Pathologist', growth: '19%', why: 'Treat communication disorders in schools, hospitals, and private practice — requires master’s degree', salary: '$70k-95k' },
    { career: 'Audiologist', growth: '11%', why: 'Assess and treat hearing disorders — requires doctoral degree (AuD)', salary: '$75k-100k' },
    { career: 'Early Intervention Specialist', growth: '12%', why: 'Work with young children with developmental delays — some roles accessible with a bachelor’s degree', salary: '$45k-65k' },
    { career: 'Rehabilitation Specialist', growth: '10%', why: 'Support patients recovering communication abilities after injury or illness', salary: '$50k-70k' },
    { career: 'Clinical Research Coordinator', growth: '14%', why: 'Work in communication disorders research without needing a clinical license', salary: '$50k-70k' },
    { career: 'Patient Care Coordinator', growth: '9%', why: 'Healthcare operations role that values communication and patient support skills', salary: '$45k-65k' },
  ],

  morePaths: {
    'Clinical Graduate School Path': [
      'Speech-Language Pathologist',
      'Audiologist',
      'School-Based SLP',
      'Medical SLP',
      'Private Practice Path'
    ],
    'Bachelor-Level Healthcare Roles': [
      'Early Intervention Specialist',
      'Rehabilitation Specialist',
      'Patient Care Coordinator',
      'Case Manager',
      'Behavioral Health Support'
    ],
    'Research + Healthcare': [
      'Clinical Research Coordinator',
      'Research Assistant',
      'Healthcare Program Coordinator',
      'Clinical Operations Associate',
      'Hospital Program Assistant'
    ],
    'Education + Child Development': [
      'Special Education Support',
      'Developmental Services Coordinator',
      'School Program Specialist',
      'Youth Services Coordinator',
      'Child Development Assistant'
    ]
  },

  searchTerms: [
    'Speech Pathology Intern',
    'Clinical Research Intern',
    'Early Intervention Intern',
    'Rehabilitation Intern',
    'Healthcare Coordinator Intern',
    'Patient Care Intern',
    'Child Development Intern',
    'Special Education Support Intern',
    'Hospital Program Intern'
  ],

  struggles: 'Many students enter this major without realizing they cannot practice as a Speech-Language Pathologist with only a bachelor’s degree. Graduate school is not optional for the main career path, and admission can be competitive and expensive.',

  honest: 'SLP is a rewarding career with strong job security and good pay, but the master’s degree and clinical hours are required. The bachelor’s degree alone does not unlock most clinical roles. If graduate school is not part of your plan, you should know that early and build around different healthcare paths.',
},
'criminal-justice': {
  title: 'Criminal Justice',
  intro: 'Criminal justice teaches how legal systems, law enforcement, investigations, and risk management work. While many students think only of policing, the strongest career options often include corporate security, compliance, investigations, and risk management roles outside traditional law enforcement.',
quickReality: {
  bestPayingPivots: [
    'Compliance Officer',
    'Fraud Investigator',
    'Corporate Security Analyst'
  ],
  fastestHiringRoles: [
    'Loss Prevention Intern',
    'Probation Officer',
    'Court Services Coordinator'
  ],
  mostUnderratedPath: 'Compliance Officer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Compliance Intern',
    'Corporate Security Intern',
    'Fraud Investigation Intern'
  ]
},
  careers: [
    { career: 'Compliance Officer', growth: '8%', why: 'Help companies follow laws and regulations — one of the best-paying underrated paths', salary: '$60k-85k' },
    { career: 'Corporate Security Analyst', growth: '9%', why: 'Risk assessment, investigations, and business security planning for private companies', salary: '$55k-80k' },
    { career: 'Probation / Parole Officer', growth: '4%', why: 'Government role supporting offender supervision and rehabilitation', salary: '$50k-70k' },
    { career: 'Loss Prevention Manager', growth: '6%', why: 'Retail and corporate asset protection with strong operational crossover', salary: '$50k-75k' },
    { career: 'Emergency Management Specialist', growth: '6%', why: 'Disaster planning, crisis response, and public safety coordination', salary: '$55k-80k' },
    { career: 'Fraud Investigator', growth: '10%', why: 'Banks, insurance companies, and corporations need people who can investigate risk and misconduct', salary: '$60k-85k' },
  ],

  morePaths: {
    'Law Enforcement + Government': [
      'Probation Officer',
      'Parole Officer',
      'Emergency Management Specialist',
      'Court Services Coordinator',
      'Federal Agency Track'
    ],
    'Corporate + Compliance': [
      'Compliance Officer',
      'Corporate Security Analyst',
      'Fraud Investigator',
      'Risk Analyst',
      'Regulatory Affairs Associate'
    ],
    'Investigations + Protection': [
      'Loss Prevention Manager',
      'Private Investigator',
      'Insurance Claims Investigator',
      'Asset Protection Specialist',
      'Internal Investigations Coordinator'
    ],
    'Strong Long-Term Paths': [
      'Law School Track',
      'Corporate Compliance Leadership',
      'Government Security Clearance Roles',
      'Homeland Security',
      'Public Administration'
    ]
  },

  searchTerms: [
    'Criminal Justice Intern',
    'Compliance Intern',
    'Corporate Security Intern',
    'Fraud Investigation Intern',
    'Government Affairs Intern',
    'Emergency Management Intern',
    'Loss Prevention Intern',
    'Risk Management Intern',
    'Court Services Intern'
  ],

  struggles: 'Many criminal justice students default to law enforcement without fully understanding the realities — physical testing, background checks, shift work, slow hiring processes, and significant competition. It is not the only path, and often not the best financial one.',

  honest: 'Corporate compliance, fraud investigation, and security roles often offer better starting pay, more stability, and less physical risk than traditional law enforcement. Law school can be a strong option, but it should be a deliberate decision — not the default next step.',
},
'education': {
  title: 'Education',
  intro: 'Education majors develop the ability to teach, facilitate learning, communicate complex ideas, and understand how people develop — skills valued far beyond K-12 classrooms.',
quickReality: {
  bestPayingPivots: [
    'Instructional Designer',
    'Learning & Development Specialist',
    'Corporate Trainer'
  ],
  fastestHiringRoles: [
    'Teaching Assistant',
    'Substitute Teacher',
    'Education Program Coordinator'
  ],
  mostUnderratedPath: 'Instructional Designer',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Teaching Internship',
    'Instructional Design Intern',
    'Learning and Development Intern'
  ]
},
  careers: [
    { career: 'Teacher (K-12)', growth: '4%', why: 'Direct path — teaching positions in public and private schools', salary: '$45k-65k' },
    { career: 'Corporate Trainer', growth: '11%', why: 'Companies need people who can teach — often pays significantly better than K-12', salary: '$55k-85k' },
    { career: 'Instructional Designer', growth: '9%', why: 'Create online courses and training programs for businesses — growing with remote work', salary: '$60k-90k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Helping customers succeed is teaching in a business context — your skills transfer well', salary: '$55k-80k' },
    { career: 'Learning & Development Specialist', growth: '10%', why: 'Build and manage employee training programs in corporate settings', salary: '$60k-85k' },
    { career: 'Academic Advisor', growth: '8%', why: 'Support student success in colleges and universities — strong fit for education majors', salary: '$50k-70k' },
  ],

  morePaths: {
    'Teaching + Schools': [
      'Teacher',
      'Academic Advisor',
      'School Counselor Path',
      'Student Success Coordinator',
      'Education Program Coordinator'
    ],
    'Corporate + Training': [
      'Corporate Trainer',
      'Learning & Development Specialist',
      'Instructional Designer',
      'Training Coordinator',
      'Onboarding Specialist'
    ],
    'People + Support': [
      'Customer Success Manager',
      'HR Specialist',
      'Community Outreach Coordinator',
      'Program Manager',
      'Employee Experience Specialist'
    ],
    'Alternative Education Paths': [
      'EdTech Specialist',
      'Curriculum Designer',
      'Museum Educator',
      'Youth Program Director',
      'Nonprofit Education Coordinator'
    ]
  },

  searchTerms: [
    'Education Intern',
    'Teaching Intern',
    'Instructional Design Intern',
    'Corporate Training Intern',
    'Customer Success Intern',
    'Academic Advising Intern',
    'Learning and Development Intern',
    'EdTech Intern',
    'Program Coordinator Intern'
  ],

  struggles: 'K-12 teaching salaries have improved but still remain lower than what similar education and responsibility levels earn in many other fields. Teacher burnout is real and has worsened significantly since 2020.',

  honest: 'If teaching is your calling, pursue it — it is meaningful work. But know that corporate training, instructional design, and L&D roles often pay significantly more for similar teaching and communication skills. Both are valid paths.',
},

'graphic-design': {
  title: 'Graphic Design',
  intro: 'Graphic design gives you visual communication skills that are genuinely in demand — every company needs design. The field has expanded far beyond print into digital products, motion, branding, and UX.',
quickReality: {
  bestPayingPivots: [
    'UX/UI Designer',
    'Art Director',
    'Product Designer'
  ],
  fastestHiringRoles: [
    'Graphic Design Intern',
    'Marketing Design Intern',
    'Content Design Intern'
  ],
  mostUnderratedPath: 'UX/UI Designer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Graphic Design Intern',
    'UX Design Intern',
    'Marketing Design Intern'
  ]
},
  careers: [
    { career: 'Graphic Designer', growth: '3%', why: 'Core path — design for brands, marketing, and communications', salary: '$45k-65k' },
    { career: 'UX/UI Designer', growth: '16%', why: 'Apply your visual skills to digital product design — significantly stronger pay than traditional design', salary: '$70k-100k' },
    { career: 'Art Director', growth: '6%', why: 'Lead creative direction for campaigns, teams, and visual strategy', salary: '$75k-110k' },
    { career: 'Motion Graphics Designer', growth: '10%', why: 'Animation and digital video graphics are growing fast across industries', salary: '$55k-80k' },
    { career: 'Brand Designer', growth: '8%', why: 'Build visual identity systems for companies and startups', salary: '$55k-80k' },
    { career: 'Product Designer', growth: '15%', why: 'A strong path for designers who want strategy + UX + interface work', salary: '$75k-110k' },
  ],

  morePaths: {
    'Visual + Brand': [
      'Graphic Designer',
      'Brand Designer',
      'Visual Designer',
      'Marketing Designer',
      'Packaging Designer'
    ],
    'Digital + UX': [
      'UX/UI Designer',
      'Product Designer',
      'Web Designer',
      'Interaction Designer',
      'Design Systems Specialist'
    ],
    'Motion + Content': [
      'Motion Graphics Designer',
      'Video Editor',
      'Content Creator',
      'Social Media Designer',
      'Creative Producer'
    ],
    'Leadership + Strategy': [
      'Art Director',
      'Creative Director',
      'Design Manager',
      'Creative Strategist',
      'Studio Manager'
    ]
  },

  searchTerms: [
    'Graphic Design Intern',
    'UX Design Intern',
    'Product Design Intern',
    'Motion Design Intern',
    'Brand Design Intern',
    'Creative Intern',
    'Visual Design Intern',
    'Marketing Design Intern',
    'Web Design Intern'
  ],

  struggles: 'Graphic design is highly competitive and freelance work can be financially unstable. Entry-level salaries are often lower than students expect, and AI tools are changing the lower end of the market quickly.',

  honest: 'UX/UI and product design often pay far more than traditional graphic design. Learning Figma, UX fundamentals, portfolio presentation, and basic product thinking is usually the highest ROI move for design students. Your visual foundation is a major asset — build on it.',
},

'healthcare-administration': {
  title: 'Healthcare Administration',
  intro: 'Healthcare administration is one of the fastest-growing fields in the economy. As healthcare systems become more complex, the need for people who can manage them — without being clinicians — keeps growing.',
quickReality: {
  bestPayingPivots: [
    'Healthcare Administrator',
    'Healthcare Analyst',
    'Compliance Officer (Healthcare)'
  ],
  fastestHiringRoles: [
    'Medical Office Coordinator',
    'Healthcare Operations Intern',
    'Patient Services Coordinator'
  ],
  mostUnderratedPath: 'Healthcare Analyst',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Healthcare Administration Internship',
    'Healthcare Operations Intern',
    'Hospital Administration Intern'
  ]
},
  careers: [
    { career: 'Healthcare Administrator', growth: '29%', why: 'Manage operations at hospitals, clinics, and healthcare systems — one of the fastest growing management roles', salary: '$60k-90k' },
    { career: 'Health Information Manager', growth: '17%', why: 'Manage patient data, records, and healthcare information systems', salary: '$55k-85k' },
    { career: 'Medical Practice Manager', growth: '20%', why: 'Run the business side of medical offices and specialty practices', salary: '$55k-80k' },
    { career: 'Healthcare Analyst', growth: '23%', why: 'Use healthcare data to improve operations, costs, and patient outcomes', salary: '$60k-85k' },
    { career: 'Compliance Officer (Healthcare)', growth: '12%', why: 'Ensure healthcare organizations meet HIPAA and regulatory requirements', salary: '$60k-85k' },
    { career: 'Patient Experience Manager', growth: '14%', why: 'Improve patient satisfaction and healthcare service delivery across systems', salary: '$55k-80k' },
  ],

  morePaths: {
    'Operations + Management': [
      'Healthcare Administrator',
      'Medical Practice Manager',
      'Operations Coordinator',
      'Hospital Department Manager',
      'Patient Experience Manager'
    ],
    'Data + Information': [
      'Healthcare Analyst',
      'Health Information Manager',
      'Revenue Cycle Analyst',
      'Healthcare Data Analyst',
      'Medical Records Manager'
    ],
    'Compliance + Policy': [
      'Compliance Officer',
      'Risk Management Specialist',
      'Healthcare Policy Analyst',
      'Regulatory Affairs Specialist',
      'Quality Improvement Coordinator'
    ],
    'Patient + Service Roles': [
      'Patient Advocate',
      'Care Coordinator',
      'Healthcare Recruiter',
      'Community Health Coordinator',
      'Clinical Operations Coordinator'
    ]
  },

  searchTerms: [
    'Healthcare Administration Intern',
    'Hospital Administration Intern',
    'Healthcare Analyst Intern',
    'Medical Office Intern',
    'Health Information Intern',
    'Compliance Intern',
    'Patient Experience Intern',
    'Clinical Operations Intern',
    'Healthcare Management Intern'
  ],

  struggles: 'Healthcare administration entry roles often involve a lot of coordination and administrative work before reaching real leadership positions. Advancement usually takes patience and strong operational experience.',

  honest: 'Healthcare administration has some of the strongest projected growth of any business field. Starting salaries are solid and grow well over time. MHA or MBA degrees can accelerate advancement, but operations experience matters first.',
},

'kinesiology': {
  title: 'Kinesiology',
  intro: 'Kinesiology is the study of human movement — exercise science, anatomy, biomechanics, and performance. It is a strong foundation for healthcare, rehab, sports, and wellness careers, but students need to know early that many of the highest-paying clinical roles require graduate school.',
quickReality: {
  bestPayingPivots: [
    'Physical Therapist',
    'Corporate Wellness Manager',
    'Exercise Physiologist'
  ],
  fastestHiringRoles: [
    'Physical Therapy Aide',
    'Rehabilitation Specialist',
    'Personal Trainer'
  ],
  mostUnderratedPath: 'Corporate Wellness Coordinator',
  gradSchoolRequired: 'Usually',
  strongestInternshipSearches: [
    'Physical Therapy Intern',
    'Rehabilitation Intern',
    'Exercise Science Internship'
  ]
},
  careers: [
    { career: 'Physical Therapist Assistant', growth: '24%', why: 'Support physical therapists in patient rehabilitation — accessible through a shorter certification path', salary: '$50k-65k' },
    { career: 'Personal Trainer / Fitness Coach', growth: '14%', why: 'Direct application of exercise science knowledge — flexible path with certifications', salary: '$40k-65k' },
    { career: 'Occupational Therapist Assistant', growth: '24%', why: 'Help patients regain daily living skills — strong demand and stable growth', salary: '$55k-70k' },
    { career: 'Athletic Trainer', growth: '14%', why: 'Prevent and treat sports injuries in schools, clinics, and teams', salary: '$50k-65k' },
    { career: 'Corporate Wellness Coordinator', growth: '12%', why: 'Companies increasingly invest in employee health and wellness programs', salary: '$50k-70k' },
    { career: 'Rehabilitation Specialist', growth: '10%', why: 'Support patient recovery programs in hospitals, clinics, and rehab centers', salary: '$45k-65k' },
  ],

  morePaths: {
    'Rehab + Clinical Support': [
      'Physical Therapist Assistant',
      'Occupational Therapist Assistant',
      'Rehabilitation Specialist',
      'Exercise Physiologist',
      'Patient Care Coordinator'
    ],
    'Sports + Performance': [
      'Athletic Trainer',
      'Strength and Conditioning Coach',
      'Sports Performance Specialist',
      'Personal Trainer',
      'Fitness Director'
    ],
    'Health + Wellness': [
      'Corporate Wellness Coordinator',
      'Health Coach',
      'Community Wellness Specialist',
      'Recreation Program Manager',
      'Wellness Program Coordinator'
    ],
    'Graduate School Paths': [
      'Physical Therapy (DPT)',
      'Occupational Therapy',
      'Physician Assistant',
      'Sports Medicine',
      'Exercise Physiology Advanced Practice'
    ]
  },

  searchTerms: [
    'Kinesiology Intern',
    'Physical Therapy Intern',
    'Rehabilitation Intern',
    'Athletic Training Intern',
    'Wellness Intern',
    'Sports Performance Intern',
    'Exercise Science Intern',
    'Healthcare Support Intern',
    'Fitness Internship'
  ],

  struggles: 'Many kinesiology students assume becoming a physical therapist is a direct bachelor-level path. It is not. PT and OT require graduate school, and many graduates feel stuck if they did not plan for that early.',

  honest: 'If your goal is PT, OT, or another clinical rehab role, plan for graduate school from the beginning. Without that, bachelor-level paths are usually in fitness, wellness, rehab support, or athletics — which can be meaningful, but often pay less than students expect.',
},
'nutrition-dietetics': {
  title: 'Nutrition / Dietetics',
  intro: 'Nutrition and dietetics prepares you to help people improve health through food, behavior, and lifestyle. It is meaningful work with growing demand, but students need to understand early that becoming a Registered Dietitian requires specific licensing steps — not just the degree.',
quickReality: {
  bestPayingPivots: [
    'Registered Dietitian',
    'Food Industry Specialist',
    'Corporate Wellness Manager'
  ],
  fastestHiringRoles: [
    'Nutrition Educator',
    'Health Coach',
    'Food Service Coordinator'
  ],
  mostUnderratedPath: 'Food Industry Specialist',
  gradSchoolRequired: 'Usually',
  strongestInternshipSearches: [
    'Nutrition Internship',
    'Dietetic Internship',
    'Food Science Internship'
  ]
},
  careers: [
    { career: 'Registered Dietitian (RD)', growth: '11%', why: 'Core clinical credential for hospitals, counseling, and medical nutrition work — requires internship and RD exam', salary: '$60k-80k' },
    { career: 'Nutrition Educator', growth: '7%', why: 'Teach nutrition in schools, community programs, and wellness organizations', salary: '$45k-65k' },
    { career: 'Food Service Manager', growth: '5%', why: 'Manage food operations in hospitals, schools, and institutions', salary: '$50k-70k' },
    { career: 'Health Coach', growth: '12%', why: 'Guide clients through lifestyle and nutrition changes — certifications strengthen this path', salary: '$40k-65k' },
    { career: 'Food Industry Specialist', growth: '6%', why: 'Work in product development, quality, compliance, or food operations', salary: '$55k-75k' },
    { career: 'Wellness Program Coordinator', growth: '10%', why: 'Corporate and healthcare wellness programs need nutrition-focused professionals', salary: '$50k-70k' },
  ],

  morePaths: {
    'Clinical + Licensed Path': [
      'Registered Dietitian',
      'Clinical Dietitian',
      'Sports Dietitian',
      'Pediatric Nutrition',
      'Private Practice Nutrition'
    ],
    'Bachelor-Level Nutrition Roles': [
      'Nutrition Educator',
      'Health Coach',
      'Wellness Program Coordinator',
      'Community Health Specialist',
      'Patient Support Services'
    ],
    'Food Industry + Operations': [
      'Food Service Manager',
      'Food Industry Specialist',
      'Quality Assurance',
      'Regulatory Compliance',
      'Product Development Support'
    ],
    'Strong Career Multipliers': [
      'RD Credential',
      'Internship Placement',
      'Sports Nutrition Specialization',
      'Corporate Wellness',
      'Graduate School Path'
    ]
  },

  searchTerms: [
    'Nutrition Intern',
    'Dietetic Intern',
    'Wellness Intern',
    'Food Service Intern',
    'Healthcare Wellness Intern',
    'Community Health Intern',
    'Sports Nutrition Intern',
    'Hospital Nutrition Intern',
    'Corporate Wellness Intern'
  ],

  struggles: 'Many students do not realize that becoming a Registered Dietitian requires completing an accredited internship and passing the RD exam. Without the credential, career options are much more limited and often lower paying.',

  honest: 'The RD credential is basically the unlock for clinical dietitian careers. Plan early, because internship placement can be competitive. Without RD, strong paths still exist in food industry, wellness, and health coaching — but pay and advancement are usually lower.',
},
'social-work': {
  title: 'Social Work',
  intro: 'Social work is one of the most meaningful degrees — you help people navigate crisis, access resources, and build more stable lives. The demand is strong and the work matters deeply.',
quickReality: {
  bestPayingPivots: [
    'Clinical Social Worker',
    'Nonprofit Program Director',
    'School Social Worker'
  ],
  fastestHiringRoles: [
    'Case Manager',
    'Behavioral Health Technician',
    'Community Outreach Coordinator'
  ],
  mostUnderratedPath: 'School Social Worker',
  gradSchoolRequired: 'Usually',
  strongestInternshipSearches: [
    'Social Work Internship',
    'Case Management Intern',
    'Community Services Intern'
  ]
},
  careers: [
    { career: 'Case Manager', growth: '12%', why: 'Connect clients with services, support systems, and resources — core social work role', salary: '$40k-55k' },
    { career: 'Child Protective Services Worker', growth: '8%', why: 'Investigate and respond to child abuse and neglect reports', salary: '$40k-55k' },
    { career: 'School Social Worker', growth: '10%', why: 'Support students with emotional, family, and behavioral challenges', salary: '$50k-65k' },
    { career: 'Clinical Social Worker', growth: '11%', why: 'Provide therapy and counseling — requires MSW and clinical licensure', salary: '$55k-80k' },
    { career: 'Nonprofit Program Director', growth: '9%', why: 'Lead community programs and service organizations', salary: '$50k-75k' },
    { career: 'Community Outreach Coordinator', growth: '8%', why: 'Build support systems and partnerships across local communities', salary: '$45k-65k' },
  ],

  morePaths: {
    'Direct Service + Support': [
      'Case Manager',
      'CPS Worker',
      'Community Outreach Coordinator',
      'Victim Advocate',
      'Housing Support Specialist'
    ],
    'Schools + Youth': [
      'School Social Worker',
      'Youth Program Coordinator',
      'Student Support Specialist',
      'Behavioral Intervention Specialist',
      'Family Services Coordinator'
    ],
    'Clinical + Counseling': [
      'Clinical Social Worker',
      'Mental Health Counselor Track',
      'Substance Abuse Counselor',
      'Rehabilitation Counselor',
      'Therapist Path'
    ],
    'Leadership + Nonprofit': [
      'Nonprofit Program Director',
      'Program Manager',
      'Development Coordinator',
      'Grant Writer',
      'Community Program Director'
    ]
  },

  searchTerms: [
    'Social Work Intern',
    'Case Management Intern',
    'Community Outreach Intern',
    'School Social Work Intern',
    'Behavioral Health Intern',
    'Nonprofit Intern',
    'Program Coordinator Intern',
    'Youth Services Intern',
    'Human Services Intern'
  ],

  struggles: 'Social work starting salaries are among the lowest of any professional degree, while the emotional demands are among the highest. Burnout is a serious and very real issue in this field.',

  honest: 'Social work is a calling more than a high-paying career. If you feel drawn to it, pursue it — but go in with clear eyes about the emotional weight and compensation. An MSW significantly improves earning potential and opens clinical practice and leadership roles.',
},

'foreign-languages': {
  title: 'Foreign Languages',
  intro: 'Foreign languages prepares you to work across cultures, communicate clearly, and navigate global business relationships. The strongest career paths are rarely pure translation — they come from combining language skills with business, marketing, operations, or client-facing work.',
quickReality: {
  bestPayingPivots: [
    'Customer Success Manager',
    'Corporate Communications Specialist',
    'International Business Coordinator'
  ],
  fastestHiringRoles: [
    'HR Assistant',
    'Customer Support Specialist',
    'Marketing Coordinator'
  ],
  mostUnderratedPath: 'Customer Success Manager',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Customer Success Intern',
    'International Business Intern',
    'Corporate Communications Intern'
  ]
},
  careers: [
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Multilingual communication skills are increasingly valuable in global organizations', salary: '$55k-80k' },
    { career: 'Content Marketing Specialist', growth: '15%', why: 'Companies need messaging created for international audiences and markets', salary: '$50k-70k' },
    { career: 'HR Specialist', growth: '10%', why: 'Global companies need people who can support multilingual teams and employees', salary: '$50k-70k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Serving international clients requires relationship-building and strong communication', salary: '$55k-80k' },
    { career: 'International Sales Coordinator', growth: '12%', why: 'Language skills plus business communication make this a strong and practical path', salary: '$55k-80k' },
    { career: 'Global Operations Coordinator', growth: '10%', why: 'Support international teams, vendors, and logistics across regions', salary: '$55k-80k' },
  ],

  morePaths: {
    'Business + Global Work': [
      'International Sales Coordinator',
      'Global Operations Coordinator',
      'Business Development Associate',
      'Supply Chain Coordinator',
      'International Trade Assistant'
    ],
    'Communication + Marketing': [
      'Corporate Communications Specialist',
      'Content Marketing Specialist',
      'Localization Specialist',
      'Brand Coordinator',
      'Social Media Manager'
    ],
    'People + Client Roles': [
      'Customer Success Manager',
      'HR Specialist',
      'Account Manager',
      'Recruiter',
      'Client Relations Specialist'
    ],
    'Traditional Language Paths': [
      'Translator',
      'Interpreter',
      'Language Teacher',
      'Study Abroad Advisor',
      'International Program Coordinator'
    ]
  },

  searchTerms: [
    'International Business Intern',
    'Customer Success Intern',
    'Global Operations Intern',
    'Marketing Intern',
    'Communications Intern',
    'Sales Intern',
    'Localization Intern',
    'HR Intern',
    'Study Abroad Program Intern'
  ],

  struggles: 'Foreign language majors often feel limited to teaching or translation. In reality, the strongest professional outcomes usually come when language becomes one advantage among several — not the entire job.',

  honest: 'Language skills alone rarely command premium salaries. The best path is combining them with business, tech, marketing, healthcare, or operations skills where bilingual ability becomes a real differentiator instead of just a nice bonus.',
},
'history': {
  title: 'History',
  intro: 'History trains you to analyze complex information, build strong arguments, understand systems over time, and write clearly — skills that are far more transferable than the degree’s reputation suggests.',
quickReality: {
  bestPayingPivots: [
    'Compliance Officer',
    'Policy Analyst',
    'Content Strategist'
  ],
  fastestHiringRoles: [
    'Research Assistant',
    'Program Coordinator',
    'Grant Writing Intern'
  ],
  mostUnderratedPath: 'Compliance Officer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Policy Intern',
    'Research Internship',
    'Grant Writing Intern'
  ]
},
  careers: [
    { career: 'Content Strategist', growth: '15%', why: 'Research, analysis, and storytelling — your core skills applied to business content', salary: '$60k-85k' },
    { career: 'Compliance Officer', growth: '8%', why: 'Understanding regulations, documentation, and institutional systems fits strong analytical thinkers', salary: '$60k-85k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Historical context and research skills apply directly to policy and government work', salary: '$55k-80k' },
    { career: 'Archivist / Records Manager', growth: '5%', why: 'Manage and preserve information for organizations, universities, and government', salary: '$45k-65k' },
    { career: 'Grant Writer', growth: '8%', why: 'Research and persuasive writing make this a strong nonprofit and higher-ed path', salary: '$50k-70k' },
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Clear writing and understanding institutional messaging transfer well here', salary: '$55k-80k' },
  ],

  morePaths: {
    'Research + Writing': [
      'Content Strategist',
      'Grant Writer',
      'Editorial Assistant',
      'Technical Writer',
      'Research Associate'
    ],
    'Government + Policy': [
      'Policy Analyst',
      'Legislative Assistant',
      'Government Relations Specialist',
      'Public Affairs Coordinator',
      'Compliance Officer'
    ],
    'Archives + Institutions': [
      'Archivist',
      'Records Manager',
      'Museum Coordinator',
      'Library Services Manager',
      'University Program Coordinator'
    ],
    'Business + Communication': [
      'Corporate Communications Specialist',
      'Communications Coordinator',
      'Program Manager',
      'Operations Analyst',
      'HR Specialist'
    ]
  },

  searchTerms: [
    'Policy Intern',
    'Communications Intern',
    'Research Intern',
    'Government Intern',
    'Grant Writing Intern',
    'Museum Intern',
    'Archives Intern',
    'Compliance Intern',
    'Program Coordinator Intern'
  ],

  struggles: 'The academic history path — professor, researcher, tenure-track faculty — is extremely competitive with very few openings. Most history graduates need to deliberately translate their skills into non-academic careers.',

  honest: 'History is one of the harder majors for immediate career translation, but not because it lacks value — because students often undersell what it teaches. Adding practical skills like Excel, SQL, project management, or policy experience dramatically improves outcomes. Law school is also a common and strong path.',
},
'accounting': {
  title: 'Accounting',
  intro: 'Accounting is one of the most stable and recession-resistant degrees available. Every organization — business, nonprofit, government, and startups — needs accountants. The CPA credential can completely change your earning potential.',
quickReality: {
  bestPayingPivots: [
    'Financial Analyst',
    'Forensic Accountant',
    'CPA Track (Audit/Tax)'
  ],
  fastestHiringRoles: [
    'Staff Accountant',
    'Audit Intern',
    'Tax Intern'
  ],
  mostUnderratedPath: 'Forensic Accountant',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Accounting Intern',
    'Audit Intern',
    'Tax Intern'
  ]
},
  careers: [
    { career: 'Staff Accountant', growth: '6%', why: 'Most accessible entry point — public accounting firms hire large classes every year', salary: '$50k-65k' },
    { career: 'Auditor', growth: '6%', why: 'Review financial records for accuracy, compliance, and risk management', salary: '$55k-75k' },
    { career: 'Tax Analyst', growth: '5%', why: 'Corporate and individual tax work — intense busy seasons but strong long-term stability', salary: '$55k-75k' },
    { career: 'Financial Analyst', growth: '9%', why: 'Your accounting foundation often makes you stronger than pure finance grads', salary: '$65k-90k' },
    { career: 'Forensic Accountant', growth: '8%', why: 'Investigate fraud, financial crime, and complex financial disputes', salary: '$70k-100k' },
    { career: 'FP&A Analyst', growth: '10%', why: 'Financial planning and analysis is a strong pivot with better pay and business visibility', salary: '$70k-95k' },
  ],

  morePaths: {
    'Core Accounting': [
      'Staff Accountant',
      'Auditor',
      'Tax Analyst',
      'Cost Accountant',
      'Senior Accountant'
    ],
    'Finance + Strategy': [
      'Financial Analyst',
      'FP&A Analyst',
      'Budget Analyst',
      'Treasury Analyst',
      'Revenue Analyst'
    ],
    'Risk + Compliance': [
      'Forensic Accountant',
      'Internal Auditor',
      'Compliance Analyst',
      'Risk Analyst',
      'Fraud Investigator'
    ],
    'Business Leadership': [
      'Controller Track',
      'Accounting Manager',
      'Operations Finance Analyst',
      'Business Operations Analyst',
      'CFO Track'
    ]
  },

  searchTerms: [
    'Accounting Intern',
    'Audit Intern',
    'Tax Intern',
    'Financial Analyst Intern',
    'FP&A Intern',
    'Corporate Finance Intern',
    'Compliance Intern',
    'Risk Analyst Intern',
    'Forensic Accounting Intern'
  ],

  struggles: 'Accounting starting salaries can feel low compared to finance, consulting, or tech roles. Many students also underestimate how much the CPA exam matters — without it, advancement often slows significantly.',

  honest: 'Accounting has some of the most reliable employment of any business degree. Starting salaries are not flashy, but the long-term stability is exceptional. CPA certification can add major salary growth and opens senior leadership paths much faster. It is one of the highest ROI credentials in business.',
},
'business-administration': {
  title: 'Business Administration',
  intro: 'Business administration teaches how organizations actually run — operations, finance, people, strategy, and decision-making. It is the broadest business degree, which creates flexibility, but also means you need a clear direction to stand out.',
quickReality: {
  bestPayingPivots: [
    'Project Manager',
    'Customer Success Manager',
    'Business Analyst'
  ],
  fastestHiringRoles: [
    'Sales Development Representative',
    'Operations Coordinator',
    'Customer Success Associate'
  ],
  mostUnderratedPath: 'Customer Success Manager',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Business Analyst Intern',
    'Operations Intern',
    'Customer Success Intern'
  ]
},
  careers: [
    { career: 'Operations Analyst', growth: '16%', why: 'Improve how businesses run — strong fit for broad business problem-solving', salary: '$55k-80k' },
    { career: 'Business Analyst', growth: '14%', why: 'Bridge business needs and practical solutions across teams', salary: '$60k-85k' },
    { career: 'Sales Development Representative', growth: '15%', why: 'Most accessible high-income entry point — often the fastest path to $80k+', salary: '$45k-65k + commission' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Relationship-focused role with strong growth and transferable skills', salary: '$55k-80k' },
    { career: 'Project Manager', growth: '9%', why: 'Coordinate teams, timelines, and execution across departments', salary: '$65k-95k' },
    { career: 'Human Resources Specialist', growth: '10%', why: 'Business operations and people management make this a strong fit', salary: '$50k-70k' },
  ],

  morePaths: {
    'Operations + Strategy': [
      'Operations Analyst',
      'Business Analyst',
      'Project Coordinator',
      'Process Improvement Specialist',
      'Program Coordinator'
    ],
    'Revenue + Client Work': [
      'Sales Development Representative',
      'Customer Success Manager',
      'Account Manager',
      'Business Development Associate',
      'Partnerships Coordinator'
    ],
    'People + Leadership': [
      'Human Resources Specialist',
      'Recruiter',
      'Training & Development Specialist',
      'Office Operations Manager',
      'Team Lead Track'
    ],
    'Higher ROI Pivots': [
      'Product Operations',
      'Consulting Track',
      'Revenue Operations Analyst',
      'Supply Chain Analyst',
      'Corporate Strategy Associate'
    ]
  },

  searchTerms: [
    'Business Intern',
    'Operations Intern',
    'Business Analyst Intern',
    'Sales Intern',
    'Customer Success Intern',
    'Project Management Intern',
    'HR Intern',
    'Business Development Intern',
    'Program Coordinator Intern'
  ],

  struggles: 'Business administration is one of the most common degrees, which means heavy competition. Employers often prefer candidates with a specific concentration like finance, MIS, or supply chain over general business unless you show clear specialization.',

  honest: 'General business majors need to work harder to differentiate themselves. Internships matter more than almost anything. Pick a lane early — operations, sales, analytics, HR, or project management — and build experience around that instead of trying to be “good at everything.”',
},
'economics': {
  title: 'Economics',
  intro: 'Economics teaches you to think analytically about how the world works — incentives, markets, trade-offs, and decision-making. Those skills transfer extremely well into finance, consulting, policy, and data-driven business roles.',
quickReality: {
  bestPayingPivots: [
    'Management Consultant',
    'Financial Analyst',
    'Data Analyst'
  ],
  fastestHiringRoles: [
    'Financial Analyst Intern',
    'Research Assistant',
    'Market Research Analyst'
  ],
  mostUnderratedPath: 'Data Analyst',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Financial Analyst Intern',
    'Economic Research Intern',
    'Data Analyst Intern'
  ]
},
  careers: [
    { career: 'Financial Analyst', growth: '9%', why: 'Your quantitative economics training is strong preparation for finance and forecasting roles', salary: '$65k-90k' },
    { career: 'Data Analyst', growth: '23%', why: 'Econometrics and statistical thinking translate directly to analytics roles', salary: '$60k-85k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Government agencies and think tanks need people who understand economic systems', salary: '$55k-80k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Understanding markets and consumer behavior is one of your strongest transferable skills', salary: '$55k-75k' },
    { career: 'Management Consultant', growth: '11%', why: 'Structured thinking and analytical problem-solving make economics grads strong consulting candidates', salary: '$70k-110k' },
    { career: 'FP&A Analyst', growth: '10%', why: 'Financial planning and analysis is a strong pivot for econ grads who like business strategy', salary: '$70k-95k' },
  ],

  morePaths: {
    'Finance + Forecasting': [
      'Financial Analyst',
      'FP&A Analyst',
      'Budget Analyst',
      'Treasury Analyst',
      'Investment Analyst'
    ],
    'Data + Analytics': [
      'Data Analyst',
      'Business Intelligence Analyst',
      'Revenue Analyst',
      'Operations Analyst',
      'Analytics Consultant'
    ],
    'Policy + Government': [
      'Policy Analyst',
      'Economic Research Assistant',
      'Government Relations Specialist',
      'Public Affairs Associate',
      'Legislative Analyst'
    ],
    'Consulting + Strategy': [
      'Management Consultant',
      'Market Research Analyst',
      'Strategy Analyst',
      'Business Analyst',
      'Corporate Development Analyst'
    ]
  },

  searchTerms: [
    'Economics Intern',
    'Financial Analyst Intern',
    'Data Analyst Intern',
    'Consulting Intern',
    'Policy Intern',
    'Market Research Intern',
    'FP&A Intern',
    'Business Analyst Intern',
    'Research Assistant Intern'
  ],

  struggles: 'Economics is more theoretical than many employers expect. Pure econ grads without strong quantitative skills like econometrics, statistics, Excel modeling, Python, SQL, or R often struggle to compete with finance and accounting students.',

  honest: 'Economics has excellent outcomes for students who lean into the quantitative side. Without those skills, it can feel frustratingly vague. Learning Excel deeply, plus Python, SQL, or R, is one of the highest ROI moves you can make with this degree.',
},
'entrepreneurship': {
  title: 'Entrepreneurship',
  intro: 'Entrepreneurship teaches you to spot opportunities, solve problems, build things from scratch, and think like an owner. Those skills are valuable whether you start your own company or work inside someone else’s.',
quickReality: {
  bestPayingPivots: [
    'Product Manager',
    'Business Development Manager',
    'Management Consultant'
  ],
  fastestHiringRoles: [
    'Sales Development Representative',
    'Startup Operations Associate',
    'Business Development Intern'
  ],
  mostUnderratedPath: 'Startup Generalist',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Business Development Intern',
    'Startup Internship',
    'Product Management Intern'
  ]
},
  careers: [
    { career: 'Business Development Manager', growth: '12%', why: 'Find and grow new business opportunities — entrepreneurial thinking fits naturally here', salary: '$60k-90k' },
    { career: 'Product Manager', growth: '19%', why: 'Build products people actually want — founder mindset makes you stronger here', salary: '$80k-120k' },
    { career: 'Sales Development Representative', growth: '15%', why: 'Revenue generation is the core of every business — strong path for entrepreneurial students', salary: '$45k-65k + commission' },
    { career: 'Startup Generalist', growth: '15%', why: 'Early-stage companies need people who can wear multiple hats and move fast', salary: '$55k-80k' },
    { career: 'Management Consultant', growth: '11%', why: 'Solve business problems and think strategically across industries', salary: '$70k-110k' },
    { career: 'Operations Manager', growth: '10%', why: 'Entrepreneurs understand how businesses actually run — strong fit for operations leadership', salary: '$65k-95k' },
  ],

  morePaths: {
    'Sales + Growth': [
      'Business Development Manager',
      'Sales Development Representative',
      'Account Executive',
      'Partnerships Manager',
      'Growth Marketing Specialist'
    ],
    'Product + Startups': [
      'Product Manager',
      'Startup Generalist',
      'Product Analyst',
      'Founder’s Associate',
      'Operations Associate'
    ],
    'Strategy + Business': [
      'Management Consultant',
      'Business Analyst',
      'Operations Manager',
      'Strategy Analyst',
      'Corporate Development Associate'
    ],
    'Build Your Own Path': [
      'Small Business Owner',
      'Freelancer',
      'Agency Founder',
      'E-commerce Operator',
      'Side Hustle Builder'
    ]
  },

  searchTerms: [
    'Business Development Intern',
    'Startup Intern',
    'Product Management Intern',
    'Sales Intern',
    'Operations Intern',
    'Founder Associate Intern',
    'Consulting Intern',
    'Growth Marketing Intern',
    'Business Analyst Intern'
  ],

  struggles: 'Entrepreneurship degrees are not always well understood by traditional employers. Many recruiters prefer finance, accounting, or marketing because they feel more concrete. You have to translate your experience into clear business results.',

  honest: 'Entrepreneurship is a strong degree for people who are proactive and self-directed, but weak for people waiting to be handed structure. It works best when paired with real startup experience, internships, side projects, freelancing, or something you actually built and can point to.',
},
'finance': {
  title: 'Finance',
  intro: 'Finance is one of the highest-paying business degrees at entry level. You learn how money moves, how companies make decisions, and how risk gets managed — skills valued across banking, corporate finance, investing, and fintech.',

  quickReality: {
  bestPayingPivots: [
    'Investment Banking Analyst',
    'Corporate Finance Analyst',
    'Risk Analyst'
  ],
  fastestHiringRoles: [
    'Financial Analyst',
    'Credit Analyst',
    'Operations Analyst'
  ],
  mostUnderratedPath: 'Corporate Finance Analyst',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Financial Analyst Intern',
    'Corporate Finance Intern',
    'Risk Management Intern'
  ]
},
  careers: [
    { career: 'Financial Analyst', growth: '9%', why: 'Core finance path — analyze performance, build models, and support business decisions', salary: '$65k-90k' },
    { career: 'Investment Banking Analyst', growth: '6%', why: 'Highest-paying entry-level finance role — intense hours but exceptional compensation', salary: '$100k-150k' },
    { career: 'Corporate Finance Analyst', growth: '9%', why: 'Work inside companies on budgeting, forecasting, and strategic planning', salary: '$65k-90k' },
    { career: 'Risk Analyst', growth: '11%', why: 'Assess and manage financial, operational, and compliance risk', salary: '$65k-90k' },
    { career: 'Financial Advisor', growth: '13%', why: 'Help individuals and businesses manage money and long-term planning', salary: '$50k-80k + commission' },
    { career: 'FP&A Analyst', growth: '10%', why: 'Financial planning and analysis is one of the strongest corporate finance paths', salary: '$70k-95k' },
  ],

  morePaths: {
    'Banking + Investments': [
      'Financial Analyst',
      'Investment Banking Analyst',
      'Equity Research Analyst',
      'Portfolio Analyst',
      'Private Wealth Associate'
    ],
    'Corporate Finance': [
      'Corporate Finance Analyst',
      'FP&A Analyst',
      'Treasury Analyst',
      'Revenue Analyst',
      'Budget Analyst'
    ],
    'Risk + Advisory': [
      'Risk Analyst',
      'Compliance Analyst',
      'Internal Auditor',
      'Fraud Analyst',
      'Financial Consultant'
    ],
    'Client + Growth Roles': [
      'Financial Advisor',
      'Account Executive',
      'Fintech Sales Specialist',
      'Business Development Associate',
      'Relationship Manager'
    ]
  },

  searchTerms: [
    'Finance Intern',
    'Financial Analyst Intern',
    'Investment Banking Intern',
    'Corporate Finance Intern',
    'FP&A Intern',
    'Risk Analyst Intern',
    'Treasury Intern',
    'Wealth Management Intern',
    'Fintech Intern'
  ],

  struggles: 'Investment banking is extremely competitive and not for everyone — 70–80 hour weeks are common and burnout is real. Many students chase IB when corporate finance, FP&A, or fintech would actually fit their life and goals better.',

  honest: 'Finance has some of the strongest starting salaries in business, but prestige can distort decision-making. Wall Street is not the only path. Corporate finance, fintech, and FP&A often provide better balance with strong pay. CFA helps, but internships matter first.',
},
'urban-planning': {
  title: 'Urban Planning',
  intro: 'Urban planning shapes how cities and communities grow — transportation, housing, land use, sustainability, and economic development. It is meaningful work with steady public-sector demand and strong private-sector crossover.',
quickReality: {
  bestPayingPivots: [
    'Transportation Planner',
    'Urban Planner',
    'Real Estate Development Associate'
  ],
  fastestHiringRoles: [
    'GIS Analyst',
    'Planning Assistant',
    'Community Development Coordinator'
  ],
  mostUnderratedPath: 'GIS Analyst',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Urban Planning Internship',
    'GIS Internship',
    'Transportation Planning Intern'
  ]
},
  careers: [
    { career: 'Urban Planner', growth: '4%', why: 'Work for cities and municipalities planning land use, zoning, and development', salary: '$60k-85k' },
    { career: 'Transportation Planner', growth: '6%', why: 'Plan roads, transit systems, and infrastructure — strong demand with infrastructure investment', salary: '$60k-85k' },
    { career: 'Community Development Specialist', growth: '7%', why: 'Support housing, revitalization, and economic development projects', salary: '$55k-75k' },
    { career: 'GIS Analyst', growth: '14%', why: 'Spatial data analysis is one of the strongest transferable technical skills in planning', salary: '$55k-80k' },
    { career: 'Real Estate Development Associate', growth: '5%', why: 'Planning knowledge translates well to private development and land use decisions', salary: '$55k-80k' },
    { career: 'Sustainability Coordinator', growth: '12%', why: 'Cities and companies increasingly need planners focused on climate and resilience', salary: '$60k-85k' },
  ],

  morePaths: {
    'City + Government': [
      'Urban Planner',
      'Transportation Planner',
      'Zoning Administrator',
      'Public Works Coordinator',
      'Housing Program Specialist'
    ],
    'GIS + Technical': [
      'GIS Analyst',
      'Mapping Specialist',
      'Land Use Analyst',
      'Environmental Planning Analyst',
      'Infrastructure Planning Associate'
    ],
    'Development + Real Estate': [
      'Real Estate Development Associate',
      'Community Development Specialist',
      'Property Development Coordinator',
      'Site Selection Analyst',
      'Construction Project Coordinator'
    ],
    'Sustainability + Future Growth': [
      'Sustainability Coordinator',
      'Climate Resilience Planner',
      'Environmental Consultant',
      'ESG Analyst',
      'Smart Cities Project Associate'
    ]
  },

  searchTerms: [
    'Urban Planning Intern',
    'City Planning Intern',
    'GIS Intern',
    'Transportation Planning Intern',
    'Community Development Intern',
    'Real Estate Development Intern',
    'Sustainability Intern',
    'Public Works Intern',
    'Land Use Planning Intern'
  ],

  struggles: 'Urban planning is heavily government-dependent, which means hiring can be slow and tied to budgets and election cycles. Many students also discover that advancement increasingly favors a master’s degree (MUP/MURP).',

  honest: 'Urban planning offers stable and meaningful work, but starting salaries are usually modest compared to business or engineering majors. GIS is the single best skill multiplier in this field — it improves both salary and flexibility. Many planners eventually pursue graduate school, but strong internships matter first.',
},
'sports-management': {
  title: 'Sports Management',
  intro: 'Sports management combines business, marketing, operations, and leadership within the sports industry. It prepares you for careers in events, facilities, athletic departments, sponsorships, and sports business operations — but competition is much higher than most students expect.',
quickReality: {
  bestPayingPivots: [
    'Corporate Event Manager',
    'Facility Manager',
    'Sports Marketing Manager'
  ],
  fastestHiringRoles: [
    'Event Coordinator',
    'Athletic Department Assistant',
    'Guest Services Coordinator'
  ],
  mostUnderratedPath: 'Corporate Event Manager',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Sports Management Internship',
    'Event Management Intern',
    'Athletic Department Internship'
  ]
},
  careers: [
    { career: 'Event Coordinator', growth: '18%', why: 'Manage sports events and venue operations — often the most accessible entry point', salary: '$40k-60k' },
    { career: 'Assistant Athletic Director', growth: '6%', why: 'Support athletic departments at schools and universities', salary: '$45k-65k' },
    { career: 'Sports Marketing Coordinator', growth: '8%', why: 'Marketing for teams, brands, and sponsors — competitive but strong fit for passionate students', salary: '$40k-60k' },
    { career: 'Facility Manager', growth: '6%', why: 'Manage arenas, stadiums, gyms, and sports facilities', salary: '$50k-70k' },
    { career: 'Corporate Event Manager', growth: '18%', why: 'Your event management skills transfer well outside sports with better pay and less competition', salary: '$50k-75k' },
    { career: 'Partnerships Coordinator', growth: '10%', why: 'Work with sponsors, brand deals, and business partnerships for teams and organizations', salary: '$50k-75k' },
  ],

  morePaths: {
    'Sports Industry Core': [
      'Event Coordinator',
      'Sports Marketing Coordinator',
      'Facility Manager',
      'Assistant Athletic Director',
      'Partnerships Coordinator'
    ],
    'School + College Athletics': [
      'Athletic Department Coordinator',
      'Compliance Assistant',
      'Student-Athlete Services',
      'Athletic Operations Coordinator',
      'Recreation Program Manager'
    ],
    'Better Paying Pivots': [
      'Corporate Event Manager',
      'Customer Success Manager',
      'Sales Development Representative',
      'Account Manager',
      'Brand Partnerships Associate'
    ],
    'Business + Revenue': [
      'Sponsorship Sales',
      'Ticket Sales Manager',
      'Corporate Partnerships',
      'Marketing Manager',
      'Operations Manager'
    ]
  },

  searchTerms: [
    'Sports Management Intern',
    'Sports Marketing Intern',
    'Athletic Department Intern',
    'Event Management Intern',
    'Corporate Events Intern',
    'Facility Operations Intern',
    'Partnerships Intern',
    'Recreation Management Intern',
    'Sports Sales Intern'
  ],

  struggles: 'The sports industry has far more applicants than openings. Starting salaries are often low, unpaid internships are common, and prestige makes people accept bad opportunities they would reject elsewhere.',

  honest: 'Sports management is one of the hardest business fields to break into and sustain financially. Many graduates build better long-term careers by pivoting into corporate events, partnerships, or sales where the skills transfer and the pay improves significantly. Networking matters enormously in sports.',
},
'hospitality-management': {
  title: 'Hospitality Management',
  intro: 'Hospitality management teaches operations, customer experience, leadership, and people management at a level most business degrees never touch. These skills apply far beyond hotels and restaurants — especially in events, operations, customer success, and business leadership roles.',
quickReality: {
  bestPayingPivots: [
    'Customer Success Manager',
    'Operations Manager',
    'Sales Manager'
  ],
  fastestHiringRoles: [
    'Event Coordinator',
    'Hotel Management Trainee',
    'Guest Services Manager'
  ],
  mostUnderratedPath: 'Customer Success Manager',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Hospitality Internship',
    'Event Management Intern',
    'Customer Success Intern'
  ]
},
  careers: [
    { career: 'Hotel/Resort Manager', growth: '8%', why: 'Direct path — manage day-to-day operations of hotels, resorts, and hospitality venues', salary: '$50k-80k' },
    { career: 'Event Manager', growth: '18%', why: 'Plan and run conferences, corporate events, and large experiences', salary: '$45k-70k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Service, retention, and relationship-building make this a strong pivot into tech', salary: '$55k-80k' },
    { career: 'Operations Manager', growth: '10%', why: 'Hospitality operations experience transfers well into business operations roles', salary: '$55k-80k' },
    { career: 'Sales Manager', growth: '5%', why: 'Relationship-driven and service-focused — hospitality grads often excel in sales', salary: '$60k-90k' },
    { career: 'Venue Operations Manager', growth: '12%', why: 'Manage stadiums, conference centers, and entertainment venues', salary: '$55k-85k' },
  ],

  morePaths: {
    'Hospitality Core': [
      'Hotel Manager',
      'Resort Operations',
      'Restaurant Operations',
      'Venue Operations Manager',
      'Guest Experience Manager'
    ],
    'Events + Experiences': [
      'Event Manager',
      'Conference Coordinator',
      'Corporate Events Manager',
      'Wedding/Event Planner',
      'Experiential Marketing Coordinator'
    ],
    'Business + Client Roles': [
      'Customer Success Manager',
      'Sales Manager',
      'Account Manager',
      'Business Development Associate',
      'Client Services Manager'
    ],
    'Operations + Leadership': [
      'Operations Manager',
      'Program Coordinator',
      'Regional Operations',
      'Project Coordinator',
      'Facilities Manager'
    ]
  },

  searchTerms: [
    'Hospitality Intern',
    'Hotel Management Intern',
    'Event Management Intern',
    'Operations Intern',
    'Customer Success Intern',
    'Venue Operations Intern',
    'Sales Intern',
    'Conference Services Intern',
    'Guest Experience Intern'
  ],

  struggles: 'Hospitality was hit hard by COVID and recovery has been uneven. Starting salaries are often lower than other business majors, and the hours can be demanding — nights, weekends, holidays, and high-pressure service environments are common.',

  honest: 'Hospitality skills are genuinely transferable, but many students underestimate how valuable they are outside the industry. Customer success, operations, and event management often offer better pay and more stable hours than traditional hospitality paths while using the exact same strengths.',
},
'information-systems': {
  title: 'Information Systems',
  intro: 'Information systems sits at the intersection of business and technology — you understand both sides, which makes you valuable in roles that require translating between technical teams and business stakeholders.',
quickReality: {
  bestPayingPivots: [
    'ERP Consultant',
    'IT Project Manager',
    'Business Analyst'
  ],
  fastestHiringRoles: [
    'Systems Analyst',
    'Data Analyst',
    'Business Analyst'
  ],
  mostUnderratedPath: 'ERP Consultant',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Business Analyst Intern',
    'Systems Analyst Intern',
    'ERP Consulting Intern'
  ]
},
  careers: [
    { career: 'Business Analyst', growth: '14%', why: 'Bridge business needs and technical solutions — your IS background is ideal here', salary: '$60k-85k' },
    { career: 'Systems Analyst', growth: '9%', why: 'Analyze and improve business systems inside organizations', salary: '$65k-90k' },
    { career: 'Project Manager (IT)', growth: '9%', why: 'Manage technology projects with credibility on both the business and technical side', salary: '$70k-100k' },
    { career: 'Data Analyst', growth: '23%', why: 'Database and systems knowledge translates directly into strong analytics work', salary: '$60k-85k' },
    { career: 'ERP Consultant', growth: '10%', why: 'Implement and improve SAP, Oracle, and enterprise systems — underrated and well-paid', salary: '$70k-100k' },
    { career: 'Product Operations Analyst', growth: '15%', why: 'Support how products and systems actually run inside modern companies', salary: '$65k-90k' },
  ],

  morePaths: {
    'Business + Systems': [
      'Business Analyst',
      'Systems Analyst',
      'ERP Consultant',
      'Implementation Specialist',
      'Solutions Consultant'
    ],
    'Projects + Operations': [
      'IT Project Manager',
      'Product Operations Analyst',
      'Program Coordinator',
      'Operations Analyst',
      'Process Improvement Specialist'
    ],
    'Data + Reporting': [
      'Data Analyst',
      'Business Intelligence Analyst',
      'Reporting Analyst',
      'SQL Analyst',
      'Database Administrator'
    ],
    'Growth + Enterprise': [
      'Salesforce Administrator',
      'CRM Analyst',
      'Product Support Manager',
      'Enterprise Account Specialist',
      'Technology Consultant'
    ]
  },

  searchTerms: [
    'Information Systems Intern',
    'Business Analyst Intern',
    'Systems Analyst Intern',
    'ERP Intern',
    'IT Project Management Intern',
    'Data Analyst Intern',
    'Product Operations Intern',
    'Technology Consulting Intern',
    'CRM Analyst Intern'
  ],

  struggles: 'IS students sometimes feel stuck between business and tech — not technical enough for engineering roles, not specialized enough for pure finance or consulting. This is usually a misunderstanding. The hybrid skill set is exactly what many employers want.',

  honest: 'Information systems has strong job prospects and reliable starting salaries. ERP consulting, Salesforce, CRM systems, and product operations are some of the most underrated high-paying paths. Being the person who understands both business and systems is incredibly valuable.',
},
'international-business': {
  title: 'International Business',
  intro: 'International business prepares you to work across borders — managing global markets, supply chains, trade, operations, and cross-cultural communication. It works best when paired with language skills, real international experience, or a clear business specialization.',
quickReality: {
  bestPayingPivots: [
    'Business Development Manager',
    'Global Supply Chain Analyst',
    'Government Relations Specialist'
  ],
  fastestHiringRoles: [
    'Import Export Coordinator',
    'Supply Chain Analyst',
    'Market Research Assistant'
  ],
  mostUnderratedPath: 'Global Supply Chain Analyst',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'International Business Intern',
    'Global Supply Chain Intern',
    'Trade Compliance Intern'
  ]
},
  careers: [
    { career: 'International Trade Specialist', growth: '6%', why: 'Help companies manage import/export regulations and global trade operations', salary: '$55k-80k' },
    { career: 'Global Supply Chain Analyst', growth: '18%', why: 'International logistics and sourcing make this one of the strongest practical paths', salary: '$60k-85k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Research international markets, customer behavior, and expansion opportunities', salary: '$55k-75k' },
    { career: 'Business Development Manager', growth: '12%', why: 'Help companies grow into new markets and build international partnerships', salary: '$65k-95k' },
    { career: 'Foreign Service Officer', growth: '5%', why: 'Government path representing U.S. interests abroad — highly competitive but meaningful', salary: '$60k-90k' },
    { career: 'Global Operations Coordinator', growth: '10%', why: 'Support vendors, teams, and operations across multiple countries and regions', salary: '$55k-80k' },
  ],

  morePaths: {
    'Global Business Core': [
      'International Trade Specialist',
      'Global Supply Chain Analyst',
      'Global Operations Coordinator',
      'Import Export Specialist',
      'Procurement Specialist'
    ],
    'Markets + Growth': [
      'Market Research Analyst',
      'Business Development Manager',
      'International Sales Coordinator',
      'Partnerships Associate',
      'Regional Account Manager'
    ],
    'Government + Policy': [
      'Foreign Service Officer',
      'Government Relations Associate',
      'Trade Compliance Specialist',
      'Policy Analyst',
      'Economic Development Coordinator'
    ],
    'Strong Career Multipliers': [
      'Language Fluency',
      'Study Abroad Experience',
      'Supply Chain Specialization',
      'Finance + Trade Knowledge',
      'International Internship Experience'
    ]
  },

  searchTerms: [
    'International Business Intern',
    'Global Supply Chain Intern',
    'Trade Compliance Intern',
    'International Sales Intern',
    'Business Development Intern',
    'Market Research Intern',
    'Global Operations Intern',
    'Import Export Intern',
    'Foreign Affairs Intern'
  ],

  struggles: 'International business can feel too broad if you do not build a specialization. Without language fluency, international experience, or a clear functional focus like supply chain or finance, it can end up feeling like general business with a different label.',

  honest: 'International business works best when paired with something concrete — supply chain, finance, sales, or operations. Language fluency and real global experience matter far more than the degree title alone. Without those, employers may not see much difference from general business.',
},
'management': {
  title: 'Management',
  intro: 'Management focuses on leading people, organizing resources, and driving results — skills every organization needs. The catch is that most people do not get hired directly into management; they grow into it.',
quickReality: {
  bestPayingPivots: [
    'Project Manager',
    'Sales Manager',
    'Operations Manager'
  ],
  fastestHiringRoles: [
    'Operations Coordinator',
    'Management Trainee',
    'Sales Development Representative'
  ],
  mostUnderratedPath: 'Operations Manager',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Management Internship',
    'Operations Intern',
    'Project Management Intern'
  ]
},
  careers: [
    { career: 'Operations Manager', growth: '10%', why: 'Run day-to-day business operations across industries and teams', salary: '$55k-80k' },
    { career: 'Human Resources Manager', growth: '5%', why: 'Lead hiring, employee development, and workplace systems', salary: '$60k-90k' },
    { career: 'Sales Manager', growth: '5%', why: 'Lead revenue teams — strong upside for people who like people and performance', salary: '$65k-100k' },
    { career: 'Project Manager', growth: '9%', why: 'Coordinate people, timelines, and execution across departments', salary: '$65k-95k' },
    { career: 'Retail / Store Manager', growth: '3%', why: 'Direct leadership path managing teams, operations, and customer experience', salary: '$45k-70k' },
    { career: 'Program Manager', growth: '10%', why: 'A strong corporate path managing ongoing business functions and initiatives', salary: '$65k-95k' },
  ],

  morePaths: {
    'Operations + Leadership': [
      'Operations Manager',
      'Program Manager',
      'Project Manager',
      'Business Operations Analyst',
      'Regional Manager'
    ],
    'People + Teams': [
      'HR Manager',
      'Recruiter',
      'Training Manager',
      'Employee Experience Specialist',
      'People Operations Coordinator'
    ],
    'Revenue + Growth': [
      'Sales Manager',
      'Account Executive',
      'Customer Success Manager',
      'Business Development Associate',
      'Partnerships Manager'
    ],
    'Fast Entry Paths': [
      'Retail Manager',
      'Supervisor',
      'Operations Coordinator',
      'Administrative Manager',
      'Office Manager'
    ]
  },

  searchTerms: [
    'Management Intern',
    'Operations Intern',
    'Project Management Intern',
    'HR Intern',
    'Sales Intern',
    'Business Operations Intern',
    'Program Coordinator Intern',
    'Customer Success Intern',
    'Leadership Development Program'
  ],

  struggles: 'Management is one of the most common business concentrations, which means heavy competition. Entry-level management roles are rare — most people need to prove themselves first before leading others.',

  honest: 'You usually do not get hired into management right away. Most management careers start with individual contributor roles where you show leadership naturally. The degree helps, but performance and trust matter much more than the title of your major.',
},
'management-information-systems': {
  title: 'Management Information Systems',
  intro: 'MIS is consistently one of the highest-paying business degrees. You combine business understanding with technical skills, which makes you valuable in roles where companies need both — and most companies do.',
quickReality: {
  bestPayingPivots: [
    'ERP Consultant',
    'IT Project Manager',
    'Business Intelligence Analyst'
  ],
  fastestHiringRoles: [
    'Business Analyst',
    'Systems Analyst',
    'Data Analyst'
  ],
  mostUnderratedPath: 'ERP Consultant',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Business Analyst Intern',
    'MIS Internship',
    'ERP Consulting Intern'
  ]
},
  careers: [
    { career: 'Business Analyst', growth: '14%', why: 'Ideal MIS role — understand business problems and help design technical solutions', salary: '$65k-90k' },
    { career: 'Data Analyst', growth: '23%', why: 'Database and reporting skills translate directly into strong analytics roles', salary: '$65k-90k' },
    { career: 'IT Project Manager', growth: '9%', why: 'Manage technology projects with credibility on both the technical and business side', salary: '$75k-105k' },
    { career: 'Systems Analyst', growth: '9%', why: 'Analyze and improve business systems across organizations', salary: '$65k-90k' },
    { career: 'ERP Consultant', growth: '10%', why: 'SAP, Oracle, and enterprise systems work is underrated and pays very well', salary: '$75k-105k' },
    { career: 'Product Operations Analyst', growth: '15%', why: 'Modern companies need people who understand how products and systems actually run', salary: '$70k-95k' },
  ],

  morePaths: {
    'Business + Systems': [
      'Business Analyst',
      'Systems Analyst',
      'ERP Consultant',
      'Implementation Specialist',
      'Solutions Consultant'
    ],
    'Data + Reporting': [
      'Data Analyst',
      'Business Intelligence Analyst',
      'Reporting Analyst',
      'SQL Analyst',
      'Dashboard Specialist'
    ],
    'Projects + Operations': [
      'IT Project Manager',
      'Product Operations Analyst',
      'Program Manager',
      'Operations Analyst',
      'Process Improvement Specialist'
    ],
    'High ROI Pivots': [
      'Salesforce Administrator',
      'CRM Analyst',
      'Technology Consultant',
      'Product Analyst',
      'Enterprise Account Manager'
    ]
  },

  searchTerms: [
    'MIS Intern',
    'Business Analyst Intern',
    'Data Analyst Intern',
    'ERP Intern',
    'Systems Analyst Intern',
    'IT Project Management Intern',
    'Product Operations Intern',
    'Technology Consulting Intern',
    'Salesforce Intern'
  ],

  struggles: 'MIS is often confused with IT or computer science by employers. Students need to clearly explain what makes MIS valuable — you understand systems, data, and business decisions, not just technical support.',

  honest: 'MIS has one of the best salary-to-competition ratios in business. It is less crowded than finance and less saturated than software engineering. ERP consulting, Salesforce, and analytics are especially strong paths where practical skills matter more than prestige.',
},
'marketing': {
  title: 'Marketing',
  intro: 'Marketing has changed completely — the strongest roles today are digital, data-driven, and tied directly to revenue. Creativity still matters, but the students who win know how to measure results.',
quickReality: {
  bestPayingPivots: [
    'Product Marketing Manager',
    'Growth Marketing Manager',
    'Customer Success Manager'
  ],
  fastestHiringRoles: [
    'Digital Marketing Specialist',
    'Sales Development Representative',
    'Content Marketing Coordinator'
  ],
  mostUnderratedPath: 'Product Marketing Manager',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Digital Marketing Intern',
    'Product Marketing Intern',
    'Content Marketing Intern'
  ]
},
  careers: [
    { career: 'Digital Marketing Specialist', growth: '17%', why: 'SEO, paid ads, analytics, and performance marketing drive modern business growth', salary: '$45k-65k' },
    { career: 'Content Marketing Manager', growth: '15%', why: 'Create and manage content strategy across brands and platforms', salary: '$50k-70k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Retention and relationship-building are strong fits for marketing-minded people', salary: '$55k-80k' },
    { career: 'Sales Development Representative', growth: '15%', why: 'Often the fastest path to strong income growth for marketing grads', salary: '$45k-65k + commission' },
    { career: 'Product Marketing Manager', growth: '16%', why: 'Bridge product teams and customers — strategic and significantly better paid', salary: '$70k-95k' },
    { career: 'Growth Marketing Specialist', growth: '18%', why: 'Focus on customer acquisition and revenue growth using experiments and data', salary: '$60k-85k' },
  ],

  morePaths: {
    'Digital + Performance': [
      'Digital Marketing Specialist',
      'Growth Marketing Specialist',
      'Paid Media Specialist',
      'SEO Specialist',
      'Marketing Analyst'
    ],
    'Content + Brand': [
      'Content Marketing Manager',
      'Brand Strategist',
      'Social Media Manager',
      'Copywriter',
      'Creative Strategist'
    ],
    'Revenue + Client Roles': [
      'Sales Development Representative',
      'Customer Success Manager',
      'Account Manager',
      'Partnerships Coordinator',
      'Business Development Associate'
    ],
    'Higher-Paying Pivots': [
      'Product Marketing Manager',
      'Product Manager',
      'Revenue Operations Analyst',
      'Marketing Operations Manager',
      'Lifecycle Marketing Manager'
    ]
  },

  searchTerms: [
    'Marketing Intern',
    'Digital Marketing Intern',
    'Product Marketing Intern',
    'Growth Marketing Intern',
    'Content Marketing Intern',
    'Sales Intern',
    'Customer Success Intern',
    'Marketing Analytics Intern',
    'Brand Marketing Intern'
  ],

  struggles: 'Traditional marketing roles are being disrupted by digital platforms and AI tools. Marketing graduates without SEO, paid media, analytics, CRM, or data skills are at a major disadvantage.',

  honest: 'Marketing starting salaries can feel low compared to other business majors. Product marketing, growth marketing, and revenue-focused roles pay much more. Learning Google Analytics, HubSpot, Meta Ads, and basic Excel/data skills is one of the highest ROI moves you can make.',
},
'supply-chain-management': {
  title: 'Supply Chain Management',
  intro: 'Supply chain management went from invisible to essential after COVID exposed how fragile global operations really are. Companies now pay serious attention to logistics, sourcing, procurement, and resilience.',
quickReality: {
  bestPayingPivots: [
    'Operations Research Analyst',
    'Supply Chain Manager',
    'Procurement Manager'
  ],
  fastestHiringRoles: [
    'Supply Chain Analyst',
    'Logistics Coordinator',
    'Procurement Specialist'
  ],
  mostUnderratedPath: 'Procurement Specialist',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Supply Chain Intern',
    'Procurement Intern',
    'Operations Intern'
  ]
},
  careers: [
    { career: 'Supply Chain Analyst', growth: '18%', why: 'Core SCM role — analyze and improve operations across sourcing, production, and delivery', salary: '$60k-85k' },
    { career: 'Logistics Coordinator', growth: '10%', why: 'Coordinate transportation, warehousing, and shipping operations', salary: '$50k-70k' },
    { career: 'Procurement Specialist', growth: '8%', why: 'Source vendors, negotiate pricing, and manage supplier relationships', salary: '$55k-80k' },
    { career: 'Operations Research Analyst', growth: '23%', why: 'Use data and models to optimize systems — one of the strongest-paying paths', salary: '$70k-100k' },
    { career: 'Inventory Manager', growth: '6%', why: 'Manage stock levels, forecasting, and cost control across operations', salary: '$55k-75k' },
    { career: 'Demand Planner', growth: '14%', why: 'Forecast customer demand and help businesses avoid costly inventory mistakes', salary: '$65k-90k' },
  ],

  morePaths: {
    'Core Supply Chain': [
      'Supply Chain Analyst',
      'Logistics Coordinator',
      'Inventory Manager',
      'Demand Planner',
      'Procurement Specialist'
    ],
    'Operations + Analytics': [
      'Operations Research Analyst',
      'Operations Analyst',
      'Process Improvement Specialist',
      'Business Operations Analyst',
      'Production Planner'
    ],
    'Vendor + Global Work': [
      'Procurement Specialist',
      'Sourcing Analyst',
      'Vendor Manager',
      'Import Export Specialist',
      'Global Operations Coordinator'
    ],
    'High ROI Pivots': [
      'Project Manager',
      'Manufacturing Analyst',
      'Consulting Track',
      'ERP Consultant',
      'Supply Chain Consulting'
    ]
  },

  searchTerms: [
    'Supply Chain Intern',
    'Logistics Intern',
    'Procurement Intern',
    'Operations Intern',
    'Demand Planning Intern',
    'Inventory Analyst Intern',
    'Global Supply Chain Intern',
    'Manufacturing Intern',
    'SCM Analyst Intern'
  ],

  struggles: 'Supply chain roles vary a lot in quality. Entry-level logistics coordinator jobs can feel repetitive and operational. The strategic, analytical, and higher-paying roles usually take time and experience to reach.',

  honest: 'Supply chain is one of the best underrated business majors right now. Strong job security, real demand, and solid salaries. APICS certifications like CPIM or CSCP can noticeably improve both hiring chances and long-term earning potential.',
},
'mathematics': {
  title: 'Mathematics',
  intro: 'Mathematics is one of the strongest degrees for today’s job market. Analytical thinking and quantitative problem-solving are valuable across finance, tech, insurance, consulting, and nearly every data-heavy industry.',
quickReality: {
  bestPayingPivots: [
    'Data Scientist',
    'Actuarial Analyst',
    'Quantitative Analyst'
  ],
  fastestHiringRoles: [
    'Data Analyst',
    'Financial Analyst',
    'Operations Research Analyst'
  ],
  mostUnderratedPath: 'Actuarial Analyst',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Data Analyst Intern',
    'Actuarial Intern',
    'Financial Analyst Intern'
  ]
},
  careers: [
    { career: 'Data Analyst', growth: '23%', why: 'Your statistical and analytical skills are directly in demand across industries', salary: '$65k-90k' },
    { career: 'Actuarial Analyst', growth: '21%', why: 'Math is the perfect foundation for risk modeling — clear exam path and strong pay', salary: '$70k-100k' },
    { career: 'Financial Analyst', growth: '9%', why: 'Forecasting, modeling, and decision support reward strong quantitative thinkers', salary: '$65k-95k' },
    { career: 'Operations Research Analyst', growth: '23%', why: 'Use mathematical models to optimize business systems and decisions', salary: '$70k-100k' },
    { career: 'Data Scientist', growth: '35%', why: 'Fastest-growing field where math is often more valuable than flashy titles', salary: '$85k-120k' },
    { career: 'Quantitative Analyst', growth: '11%', why: 'High-paying finance path for students who love math and modeling', salary: '$90k-150k' },
  ],

  morePaths: {
    'Data + Analytics': [
      'Data Analyst',
      'Data Scientist',
      'Business Intelligence Analyst',
      'Analytics Consultant',
      'Machine Learning Track'
    ],
    'Finance + Risk': [
      'Actuarial Analyst',
      'Financial Analyst',
      'Quantitative Analyst',
      'Risk Analyst',
      'Investment Analyst'
    ],
    'Optimization + Strategy': [
      'Operations Research Analyst',
      'Strategy Analyst',
      'Supply Chain Analyst',
      'Consulting Track',
      'Business Analyst'
    ],
    'Academic + Technical': [
      'Research Assistant',
      'Statistician',
      'Applied Mathematician',
      'Software Engineering Pivot',
      'Graduate School Path'
    ]
  },

  searchTerms: [
    'Math Intern',
    'Data Analyst Intern',
    'Actuarial Intern',
    'Financial Analyst Intern',
    'Operations Research Intern',
    'Quantitative Analyst Intern',
    'Analytics Intern',
    'Business Intelligence Intern',
    'Research Assistant Math'
  ],

  struggles: 'Math majors often undersell themselves because they assume employers only want computer science or finance students. In reality, many employers actively want strong mathematical thinkers — but you have to translate your skills clearly.',

  honest: 'Mathematics is quietly one of the highest ROI degrees available. Actuarial science offers excellent job security, while analytics and data science offer the fastest growth. Learning Python, SQL, Excel, and either R or Tableau is basically non-negotiable.',
},
'neuroscience': {
  title: 'Neuroscience',
  intro: 'Neuroscience is a rigorous major that develops scientific thinking, research skills, and an understanding of human behavior — but the direct career path is less obvious than students expect.',
quickReality: {
  bestPayingPivots: [
    'UX Researcher',
    'Healthcare Data Analyst',
    'Medical Science Liaison'
  ],
  fastestHiringRoles: [
    'Clinical Research Coordinator',
    'Behavioral Health Technician',
    'Research Assistant'
  ],
  mostUnderratedPath: 'UX Researcher',
  gradSchoolRequired: 'Usually',
  strongestInternshipSearches: [
    'Clinical Research Intern',
    'Neuroscience Research Intern',
    'Healthcare Data Internship'
  ]
},
  careers: [
    { career: 'Clinical Research Coordinator', growth: '14%', why: 'Your research training and scientific background are directly applicable', salary: '$50k-70k' },
    { career: 'UX Researcher', growth: '18%', why: 'Understanding behavior, attention, and decision-making translates well to product research', salary: '$70k-95k' },
    { career: 'Healthcare Data Analyst', growth: '23%', why: 'Healthcare and neuroscience data analysis is a growing specialization', salary: '$60k-85k' },
    { career: 'Pharmaceutical Sales Rep', growth: '6%', why: 'Your neuroscience knowledge gives you credibility with CNS and neuro-related products', salary: '$55k-75k + commission' },
    { career: 'Behavioral Health Technician', growth: '15%', why: 'Direct patient care role accessible with a bachelor’s degree', salary: '$35k-50k' },
    { career: 'Research Associate', growth: '10%', why: 'Labs, hospitals, universities, and biotech companies need strong research support', salary: '$50k-70k' },
  ],

  morePaths: {
    'Clinical + Research': [
      'Clinical Research Coordinator',
      'Research Associate',
      'Clinical Trial Assistant',
      'Lab Technician',
      'Research Assistant'
    ],
    'Behavior + People': [
      'Behavioral Health Technician',
      'Case Manager',
      'Mental Health Technician',
      'Patient Care Coordinator',
      'Rehabilitation Specialist'
    ],
    'Tech + Data': [
      'UX Researcher',
      'Healthcare Data Analyst',
      'Research Data Coordinator',
      'Data Analyst',
      'Product Researcher'
    ],
    'Pharma + Healthcare': [
      'Pharmaceutical Sales Rep',
      'Medical Science Liaison Track',
      'Regulatory Affairs Specialist',
      'Medical Writer',
      'Clinical Operations Associate'
    ]
  },

  searchTerms: [
    'Neuroscience Intern',
    'Clinical Research Intern',
    'Research Assistant Intern',
    'UX Research Intern',
    'Healthcare Data Analyst Intern',
    'Behavioral Health Intern',
    'Pharmaceutical Intern',
    'Lab Technician Intern',
    'Clinical Trial Intern'
  ],

  struggles: 'Neuroscience attracts many pre-med students who do not get into medical school and then feel lost. Clinical neuroscience careers almost always require graduate degrees. Direct employment with a bachelor’s degree is possible, but it requires deliberate planning.',

  honest: 'Neuroscience is intellectually rich, but the direct career path without grad school requires pivot thinking. UX research, clinical research coordination, healthcare data, and pharma roles are often stronger bachelor-level paths than students realize.',
},
'nursing': {
  title: 'Nursing',
  intro: 'Nursing is one of the most reliable and meaningful career paths available. The job market is consistently strong, salaries are competitive, and the work directly helps people.',
quickReality: {
  bestPayingPivots: [
    'Travel Nurse',
    'Informatics Nurse',
    'Healthcare Administrator'
  ],
  fastestHiringRoles: [
    'Registered Nurse',
    'Clinical Support Roles',
    'Patient Care Coordinator'
  ],
  mostUnderratedPath: 'Informatics Nurse',
  gradSchoolRequired: 'Yes',
  strongestInternshipSearches: [
    'Nurse Extern',
    'Clinical Nursing Internship',
    'Hospital Student Nurse Program'
  ]
},
  quickReality: {
  bestPayingPivots: [
    'Travel Nurse',
    'Informatics Nurse',
    'Nurse Case Manager'
  ],
  fastestHiringRoles: [
    'Registered Nurse',
    'Patient Care Coordinator',
    'Clinical Support Roles'
  ],
  mostUnderratedPath: 'Informatics Nurse',
  gradSchoolRequired: 'Yes',
  strongestInternshipSearches: [
    'Nurse Extern',
    'Clinical Nursing Internship',
    'Hospital Nursing Student Program'
  ]
},
  careers: [
    { career: 'Registered Nurse (RN)', growth: '6%', why: 'Core nursing path — hospitals, clinics, and healthcare systems always need RNs', salary: '$65k-90k' },
    { career: 'Travel Nurse', growth: '10%', why: 'Work at different hospitals on contract — often pays more than staff nursing', salary: '$80k-120k' },
    { career: 'Nurse Case Manager', growth: '9%', why: 'Coordinate patient care across settings — less bedside, more planning and advocacy', salary: '$70k-95k' },
    { career: 'Informatics Nurse', growth: '14%', why: 'Bridge nursing and health technology — growing specialty with strong pay', salary: '$75k-100k' },
    { career: 'Healthcare Administrator', growth: '29%', why: 'Clinical credibility makes you a stronger healthcare leader than non-clinicians', salary: '$70k-100k' },
    { career: 'Public Health Nurse', growth: '7%', why: 'Use nursing skills in community health, prevention, education, and outreach', salary: '$65k-90k' },
  ],

  morePaths: {
    'Bedside + Clinical': [
      'Registered Nurse',
      'Emergency Room Nurse',
      'ICU Nurse',
      'Pediatric Nurse',
      'Operating Room Nurse'
    ],
    'Less Bedside / Care Coordination': [
      'Nurse Case Manager',
      'Care Coordinator',
      'Utilization Review Nurse',
      'Patient Advocate',
      'Discharge Planner'
    ],
    'Tech + Administration': [
      'Informatics Nurse',
      'Healthcare Administrator',
      'Clinical Operations Manager',
      'Quality Improvement Coordinator',
      'Healthcare Analyst'
    ],
    'Advanced Practice + Specialization': [
      'Nurse Practitioner Track',
      'Nurse Educator',
      'Travel Nurse',
      'Public Health Nurse',
      'Clinical Nurse Specialist'
    ]
  },

  searchTerms: [
    'Nursing Intern',
    'Student Nurse Intern',
    'Nurse Extern',
    'Clinical Operations Intern',
    'Public Health Intern',
    'Healthcare Administration Intern',
    'Patient Care Intern',
    'Nurse Informatics Intern',
    'Case Management Intern'
  ],

  struggles: 'Nursing school is demanding, and many students underestimate the emotional and physical toll of bedside nursing. Burnout is real, especially in high-pressure hospital settings.',

  honest: 'Nursing has excellent job security and salaries that improve significantly with experience and specialization. Travel nursing, informatics, case management, and advanced practice roles can change both income and lifestyle dramatically.',
},
'music': {
  title: 'Music',
  intro: 'Music develops discipline, performance under pressure, collaboration, creative problem-solving, and strong listening skills. The best career paths often come from applying those strengths to production, education, training, media, and people-focused work — not only traditional performance careers.',
quickReality: {
  bestPayingPivots: [
    'Instructional Designer',
    'Corporate Trainer',
    'Audio / Video Producer'
  ],
  fastestHiringRoles: [
    'Events Assistant',
    'Production Assistant',
    'Teaching Assistant'
  ],
  mostUnderratedPath: 'Instructional Designer',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Audio Production Intern',
    'Instructional Design Intern',
    'Event Management Intern'
  ]
},
  careers: [
    { career: 'Audio / Video Producer', growth: '12%', why: 'Corporate media, podcasting, branded content, and digital production need strong technical and creative skills', salary: '$50k-75k' },
    { career: 'Corporate Trainer', growth: '11%', why: 'Teaching, presenting, and audience engagement make this a strong pivot', salary: '$55k-80k' },
    { career: 'Instructional Designer', growth: '9%', why: 'Creating engaging learning experiences draws on performance and teaching instincts', salary: '$60k-90k' },
    { career: 'Music Therapist', growth: '9%', why: 'Clinical work using music to support health and recovery — requires certification (MT-BC)', salary: '$45k-65k' },
    { career: 'Events Manager', growth: '18%', why: 'Production planning and live performance coordination transfer naturally', salary: '$50k-70k' },
    { career: 'Creative Producer', growth: '10%', why: 'Coordinate content, talent, and production across creative teams and projects', salary: '$55k-80k' },
  ],

  morePaths: {
    'Performance + Creative': [
      'Performance Career',
      'Session Musician',
      'Production Coordinator',
      'Creative Producer',
      'Live Event Production'
    ],
    'Media + Production': [
      'Audio Producer',
      'Video Producer',
      'Podcast Production',
      'Content Production',
      'Studio Operations'
    ],
    'Teaching + Learning': [
      'Corporate Trainer',
      'Instructional Designer',
      'Music Education',
      'Learning & Development',
      'Training Specialist'
    ],
    'Healthcare + Wellness': [
      'Music Therapist',
      'Recreation Therapy Support',
      'Community Arts Programs',
      'Wellness Programming',
      'Healthcare Education'
    ]
  },

  searchTerms: [
    'Music Intern',
    'Audio Production Intern',
    'Creative Production Intern',
    'Corporate Training Intern',
    'Instructional Design Intern',
    'Events Intern',
    'Media Production Intern',
    'Content Production Intern',
    'Learning and Development Intern'
  ],

  struggles: 'Performance careers are genuinely competitive and financially unstable for many people, especially early on. Most musicians build careers through a mix of teaching, production work, freelance projects, and multiple income streams rather than one single performance job.',

  honest: 'If performing is your goal, pursue it — but treat production, education, and media skills as part of the same career, not a backup plan. Audio production, instructional design, and corporate training often provide the financial stability that allows people to keep music in their life long-term.',
},
'philosophy': {
  title: 'Philosophy',
  intro: 'Philosophy trains you to think clearly, argue rigorously, identify weak logic, and understand complex ethical systems — skills that are far more practical in business, law, and tech than most people realize.',
quickReality: {
  bestPayingPivots: [
    'Business Analyst',
    'UX Researcher',
    'Compliance Officer'
  ],
  fastestHiringRoles: [
    'Policy Assistant',
    'Research Assistant',
    'Operations Coordinator'
  ],
  mostUnderratedPath: 'UX Researcher',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'UX Research Intern',
    'Policy Intern',
    'Business Analyst Intern'
  ]
},
  careers: [
    { career: 'Business Analyst', growth: '14%', why: 'Critical thinking and structured problem-solving are exactly what this role requires', salary: '$70k-95k' },
    { career: 'UX Researcher', growth: '18%', why: 'Understanding how people think and make decisions translates directly to product research', salary: '$75k-105k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Ethical reasoning and systems thinking fit government and nonprofit work well', salary: '$60k-90k' },
    { career: 'Compliance Officer', growth: '8%', why: 'Understanding rule systems and ethical frameworks makes this a strong fit', salary: '$65k-90k' },
    { career: 'Technical Writer', growth: '7%', why: 'Explaining complex ideas clearly is one of your strongest transferable skills', salary: '$60k-85k' },
    { career: 'Consulting Analyst', growth: '11%', why: 'Structured reasoning and argumentation are highly valued in consulting', salary: '$70k-110k' },
  ],

  morePaths: {
    'Business + Strategy': [
      'Business Analyst',
      'Consulting Analyst',
      'Operations Analyst',
      'Strategy Associate',
      'Product Operations Analyst'
    ],
    'Law + Policy': [
      'Policy Analyst',
      'Compliance Officer',
      'Legal Assistant',
      'Government Relations Associate',
      'Law School Track'
    ],
    'Research + Writing': [
      'Technical Writer',
      'Grant Writer',
      'Content Strategist',
      'Editorial Assistant',
      'Research Associate'
    ],
    'People + Product': [
      'UX Researcher',
      'Customer Success Manager',
      'Program Coordinator',
      'HR Specialist',
      'Community Outreach Manager'
    ]
  },

  searchTerms: [
    'Business Analyst Intern',
    'Policy Intern',
    'Research Intern',
    'UX Research Intern',
    'Compliance Intern',
    'Consulting Intern',
    'Legal Assistant Intern',
    'Content Strategy Intern',
    'Program Coordinator Intern'
  ],

  struggles: 'Philosophy majors face the classic translation problem — your skills are real, but employers do not automatically understand how they apply. Academic philosophy careers are also extremely limited and competitive.',

  honest: 'Philosophy actually has stronger outcomes than its reputation suggests, especially for law school, consulting, and business analysis. The key is learning to explain your value in practical terms. Philosophy majors also consistently score among the highest on the LSAT.',
},
'physics': {
  title: 'Physics',
  intro: 'Physics is one of the most versatile STEM degrees. Your problem-solving, mathematical modeling, and analytical skills are valuable across finance, tech, engineering, research, and data-heavy industries.',
quickReality: {
  bestPayingPivots: [
    'Quantitative Analyst',
    'Data Scientist',
    'Software Engineer'
  ],
  fastestHiringRoles: [
    'Data Analyst',
    'Research Assistant',
    'Software Engineering Intern'
  ],
  mostUnderratedPath: 'Quantitative Analyst',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Data Science Intern',
    'Research Internship',
    'Software Engineering Intern'
  ]
},
  careers: [
    { career: 'Data Scientist', growth: '35%', why: 'Physics problem-solving and math skills are ideal for advanced data work', salary: '$85k-120k' },
    { career: 'Software Engineer', growth: '22%', why: 'Analytical problem-solving transfers extremely well into coding and systems work', salary: '$80k-130k' },
    { career: 'Quantitative Analyst', growth: '11%', why: 'Finance firms actively recruit physics grads for modeling and trading roles', salary: '$90k-150k' },
    { career: 'Cybersecurity Analyst', growth: '32%', why: 'Systems thinking and analytical reasoning are strong advantages here', salary: '$70k-100k' },
    { career: 'Research Scientist (Industry)', growth: '8%', why: 'Labs, R&D teams, and advanced manufacturing value physics training', salary: '$75k-110k' },
    { career: 'Systems Engineer', growth: '9%', why: 'Complex technical systems need strong modeling and structured thinking', salary: '$75k-105k' },
  ],

  morePaths: {
    'Data + Quant': [
      'Data Scientist',
      'Quantitative Analyst',
      'Data Analyst',
      'Machine Learning Engineer',
      'Business Intelligence Analyst'
    ],
    'Tech + Engineering': [
      'Software Engineer',
      'Systems Engineer',
      'Cybersecurity Analyst',
      'Embedded Systems Engineer',
      'Simulation Engineer'
    ],
    'Research + R&D': [
      'Research Scientist',
      'Lab Engineer',
      'R&D Associate',
      'Optics Engineer',
      'Photonics Specialist'
    ],
    'High ROI Pivots': [
      'Actuarial Analyst',
      'Financial Analyst',
      'Consulting Track',
      'Patent Examiner',
      'Graduate School Path'
    ]
  },

  searchTerms: [
    'Physics Intern',
    'Data Science Intern',
    'Software Engineering Intern',
    'Research Intern',
    'Quantitative Analyst Intern',
    'Systems Engineering Intern',
    'Cybersecurity Intern',
    'R&D Intern',
    'Lab Research Assistant'
  ],

  struggles: 'Physics graduates often assume they need a PhD to do meaningful work. You do not. The bigger issue is that students sometimes fail to translate physics skills into business or tech language employers understand.',

  honest: 'Physics is one of the strongest degrees for long-term salary potential. Data science, software engineering, and quant finance are the highest-paying paths. The main non-negotiable skill is coding — if you are not learning Python, you are limiting yourself.',
},

'public-health': {
  title: 'Public Health',
  intro: 'Public health focuses on improving health outcomes at the population level — through prevention, policy, education, and data. It is meaningful work with strong long-term demand, but students should understand the salary reality early.',
quickReality: {
  bestPayingPivots: [
    'Healthcare Data Analyst',
    'Epidemiologist',
    'Public Health Program Manager'
  ],
  fastestHiringRoles: [
    'Community Health Worker',
    'Health Educator',
    'Clinical Research Coordinator'
  ],
  mostUnderratedPath: 'Healthcare Data Analyst',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Public Health Internship',
    'Community Health Intern',
    'Healthcare Data Intern'
  ]
},
  careers: [
    { career: 'Health Educator', growth: '7%', why: 'Design and deliver health education programs in communities and organizations', salary: '$50k-70k' },
    { career: 'Epidemiologist', growth: '26%', why: 'Track disease patterns and public health risks — one of the strongest growth paths', salary: '$60k-90k' },
    { career: 'Healthcare Data Analyst', growth: '23%', why: 'Use data to improve health outcomes and healthcare systems', salary: '$60k-85k' },
    { career: 'Community Health Worker', growth: '12%', why: 'Connect people with health resources and frontline support', salary: '$40k-60k' },
    { career: 'Public Health Program Manager', growth: '9%', why: 'Run health programs in nonprofits, hospitals, and government agencies', salary: '$55k-80k' },
    { career: 'Healthcare Compliance Specialist', growth: '12%', why: 'Policy and healthcare systems knowledge make this a strong underrated path', salary: '$60k-85k' },
  ],

  morePaths: {
    'Community + Outreach': [
      'Health Educator',
      'Community Health Worker',
      'Program Coordinator',
      'Patient Advocate',
      'Wellness Coordinator'
    ],
    'Data + Analysis': [
      'Healthcare Data Analyst',
      'Epidemiologist',
      'Research Assistant',
      'Quality Improvement Analyst',
      'Clinical Data Coordinator'
    ],
    'Healthcare Systems': [
      'Public Health Program Manager',
      'Healthcare Compliance Specialist',
      'Healthcare Administrator',
      'Clinical Operations Associate',
      'Hospital Program Coordinator'
    ],
    'Graduate School Paths': [
      'MPH Track',
      'Healthcare Policy',
      'Epidemiology Specialization',
      'Hospital Administration',
      'Medical School Alternative'
    ]
  },

  searchTerms: [
    'Public Health Intern',
    'Healthcare Data Intern',
    'Clinical Research Intern',
    'Community Health Intern',
    'Hospital Administration Intern',
    'Healthcare Compliance Intern',
    'Program Coordinator Intern',
    'Epidemiology Intern',
    'Health Education Intern'
  ],

  struggles: 'Public health starting salaries at the bachelor’s level are often lower than students expect. Government hiring can be slow, and many higher-level roles strongly prefer or require an MPH.',

  honest: 'Public health has strong long-term stability and meaningful work, but the early-career pay is modest. Healthcare data analytics is usually the highest-paying bachelor-level path. If you want leadership roles, an MPH often becomes the unlock.',
},

'statistics': {
  title: 'Statistics',
  intro: 'Statistics is one of the most employable quantitative degrees available. Companies everywhere are trying to make better decisions with data, and statisticians are the people who know whether the numbers actually mean anything.',
quickReality: {
  bestPayingPivots: [
    'Data Scientist',
    'Biostatistician',
    'Actuarial Analyst'
  ],
  fastestHiringRoles: [
    'Data Analyst',
    'Research Analyst',
    'Business Intelligence Analyst'
  ],
  mostUnderratedPath: 'Biostatistician',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Data Analyst Intern',
    'Biostatistics Intern',
    'Research Analytics Intern'
  ]
},
  careers: [
    { career: 'Data Analyst', growth: '23%', why: 'Your statistical foundation is exactly what modern analytics roles require', salary: '$65k-90k' },
    { career: 'Data Scientist', growth: '35%', why: 'Statistics is the real backbone of data science, not just coding', salary: '$85k-120k' },
    { career: 'Biostatistician', growth: '26%', why: 'Clinical trials, pharma, and healthcare rely heavily on strong statistical modeling', salary: '$75k-105k' },
    { career: 'Actuarial Analyst', growth: '21%', why: 'Risk modeling in insurance is one of the clearest high-paying paths for stats majors', salary: '$70k-100k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Use data to understand customer behavior and business decisions', salary: '$55k-80k' },
    { career: 'Business Intelligence Analyst', growth: '18%', why: 'Turn raw data into dashboards and decisions for leadership teams', salary: '$65k-95k' },
  ],

  morePaths: {
    'Data + Analytics': [
      'Data Analyst',
      'Data Scientist',
      'Business Intelligence Analyst',
      'Analytics Consultant',
      'Product Analyst'
    ],
    'Healthcare + Research': [
      'Biostatistician',
      'Clinical Data Analyst',
      'Research Statistician',
      'Healthcare Analyst',
      'Epidemiology Track'
    ],
    'Finance + Risk': [
      'Actuarial Analyst',
      'Risk Analyst',
      'Financial Analyst',
      'Quantitative Analyst',
      'Fraud Analytics Specialist'
    ],
    'Business + Strategy': [
      'Market Research Analyst',
      'Operations Research Analyst',
      'Revenue Analyst',
      'Strategy Analyst',
      'Consulting Track'
    ]
  },

  searchTerms: [
    'Statistics Intern',
    'Data Analyst Intern',
    'Biostatistics Intern',
    'Actuarial Intern',
    'Business Intelligence Intern',
    'Healthcare Analytics Intern',
    'Research Analyst Intern',
    'Market Research Intern',
    'Quantitative Analyst Intern'
  ],

  struggles: 'Statistics without programming skills is increasingly limiting. R, Python, SQL, and Excel are basically expected now. Pure statisticians without coding skills often lose opportunities to data science or analytics candidates.',

  honest: 'Statistics plus Python or R is one of the strongest degree combinations in the job market. Biostatistics is especially strong for students near pharma and healthcare hubs. Your edge is not just math — it is proving you can apply it in real business decisions.',
},
'political-science': {
  title: 'Political Science',
  intro: 'Political science teaches you how institutions work, how policy gets made, and how power, incentives, and communication shape decisions. Those skills apply far beyond government and law school.',
quickReality: {
  bestPayingPivots: [
    'Government Relations Specialist',
    'Compliance Officer',
    'Policy Analyst'
  ],
  fastestHiringRoles: [
    'Legislative Assistant',
    'Program Coordinator',
    'Communications Associate'
  ],
  mostUnderratedPath: 'Government Relations Specialist',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Government Affairs Intern',
    'Policy Intern',
    'Legislative Intern'
  ]
},
  careers: [
    { career: 'Policy Analyst', growth: '6%', why: 'Analyze policy for government agencies, nonprofits, and think tanks', salary: '$60k-90k' },
    { career: 'Government Relations Specialist', growth: '7%', why: 'Help companies navigate regulation and public policy — strong corporate path', salary: '$70k-110k' },
    { career: 'Compliance Officer', growth: '8%', why: 'Rules, systems, and regulation make this a natural fit', salary: '$65k-90k' },
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Political communication skills transfer directly into corporate messaging', salary: '$55k-80k' },
    { career: 'Nonprofit Manager', growth: '9%', why: 'Lead advocacy organizations and mission-driven programs', salary: '$50k-75k' },
    { career: 'Public Affairs Coordinator', growth: '8%', why: 'Bridge organizations, media, and government stakeholders', salary: '$55k-80k' },
  ],

  morePaths: {
    'Government + Policy': [
      'Policy Analyst',
      'Legislative Assistant',
      'Public Affairs Coordinator',
      'Government Relations Specialist',
      'Campaign Staffer'
    ],
    'Corporate + Compliance': [
      'Compliance Officer',
      'Risk Analyst',
      'Corporate Communications Specialist',
      'Regulatory Affairs Associate',
      'ESG Analyst'
    ],
    'Nonprofit + Advocacy': [
      'Nonprofit Manager',
      'Program Coordinator',
      'Community Organizer',
      'Grant Writer',
      'Advocacy Specialist'
    ],
    'Strong Long-Term Paths': [
      'Law School Track',
      'Consulting Track',
      'Public Administration',
      'Foreign Service',
      'Political Consulting'
    ]
  },

  searchTerms: [
    'Political Science Intern',
    'Policy Intern',
    'Government Relations Intern',
    'Compliance Intern',
    'Public Affairs Intern',
    'Legislative Intern',
    'Nonprofit Intern',
    'Campaign Intern',
    'Corporate Communications Intern'
  ],

  struggles: 'Many political science students assume law school is the default next step. It is not. Government roles can start slowly and law school is expensive, competitive, and not automatically worth it.',

  honest: 'Government relations and compliance are some of the best hidden career paths for political science majors. They pay well, use your degree directly, and do not require law school debt. Worth serious consideration before defaulting to a JD.',
},
'psychology': {
  title: 'Psychology',
  intro: 'Psychology teaches you to understand human behavior — one of the most valuable skills in the modern workplace. People, motivation, decision-making, and behavior drive almost every industry.',
quickReality: {
  bestPayingPivots: [
    'UX Researcher',
    'Market Research Analyst',
    'Training & Development Specialist'
  ],
  fastestHiringRoles: [
    'Behavioral Health Technician',
    'Case Manager',
    'Human Resources Assistant'
  ],
  mostUnderratedPath: 'UX Researcher',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'UX Research Intern',
    'Behavioral Health Intern',
    'Human Resources Intern'
  ]
},
  careers: [
    { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior is exactly what product and tech teams need', salary: '$70k-95k' },
    { career: 'Human Resources Specialist', growth: '10%', why: 'People systems, hiring, and employee development are strong fits', salary: '$50k-70k' },
    { career: 'Case Manager', growth: '12%', why: 'Healthcare and social services rely heavily on behavioral understanding', salary: '$40k-55k' },
    { career: 'Behavioral Health Technician', growth: '15%', why: 'Accessible bachelor-level role with high demand and direct relevance', salary: '$35k-50k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Consumer behavior is psychology applied to business', salary: '$55k-75k' },
    { career: 'Training & Development Specialist', growth: '11%', why: 'Helping people learn and grow is rooted in psychology', salary: '$55k-80k' },
  ],

  morePaths: {
    'People + Support': [
      'Case Manager',
      'Behavioral Health Technician',
      'Community Outreach Coordinator',
      'Patient Advocate',
      'Youth Services Specialist'
    ],
    'Business + People': [
      'Human Resources Specialist',
      'Training & Development Specialist',
      'Recruiter',
      'Customer Success Manager',
      'Employee Experience Coordinator'
    ],
    'Research + Behavior': [
      'UX Researcher',
      'Market Research Analyst',
      'Research Assistant',
      'Behavioral Data Analyst',
      'Consumer Insights Associate'
    ],
    'Graduate School Paths': [
      'Clinical Psychology Track',
      'Counseling Psychology',
      'School Psychology',
      'Social Work',
      'Therapy Licensure Path'
    ]
  },

  searchTerms: [
    'Psychology Intern',
    'UX Research Intern',
    'HR Intern',
    'Behavioral Health Intern',
    'Case Management Intern',
    'Market Research Intern',
    'Training and Development Intern',
    'Community Outreach Intern',
    'Mental Health Intern'
  ],

  struggles: 'Most clinical psychology careers require graduate degrees. Many psychology majors feel stuck between therapy paths that require years of school and not knowing what strong bachelor-level options exist.',

  honest: 'UX research and market research often pay significantly more than bachelor-level clinical roles. If you are not fully committed to becoming a therapist or psychologist, those paths deserve serious attention before taking on graduate school debt.',
},
'sociology': {
  title: 'Sociology',
  intro: 'Sociology teaches you to understand how people, groups, and systems work — skills that apply directly to HR, market research, policy, community development, and organizational strategy.',
quickReality: {
  bestPayingPivots: [
    'Diversity & Inclusion Manager',
    'Policy Analyst',
    'Market Research Analyst'
  ],
  fastestHiringRoles: [
    'Human Resources Assistant',
    'Case Manager',
    'Community Outreach Coordinator'
  ],
  mostUnderratedPath: 'Market Research Analyst',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Human Resources Intern',
    'Community Services Intern',
    'Market Research Intern'
  ]
},
  careers: [
    { career: 'Human Resources Specialist', growth: '10%', why: 'Understanding group dynamics and workplace behavior makes HR a strong fit', salary: '$50k-75k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Study social trends, behavior patterns, and consumer decision-making', salary: '$55k-80k' },
    { career: 'Case Manager', growth: '12%', why: 'Social services and healthcare rely heavily on understanding people and systems', salary: '$40k-55k' },
    { career: 'Diversity & Inclusion Manager', growth: '11%', why: 'Create stronger and more equitable workplaces using social science insight', salary: '$65k-95k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Understanding institutions and social systems translates well to policy work', salary: '$55k-80k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Relationship-building, empathy, and problem-solving make this a strong business pivot', salary: '$55k-80k' },
  ],

  morePaths: {
    'People + Organizations': [
      'Human Resources Specialist',
      'Recruiter',
      'Employee Experience Coordinator',
      'Customer Success Manager',
      'Training & Development Specialist'
    ],
    'Research + Analysis': [
      'Market Research Analyst',
      'Research Assistant',
      'Consumer Insights Associate',
      'Data Analyst',
      'Program Evaluation Specialist'
    ],
    'Community + Social Impact': [
      'Case Manager',
      'Community Outreach Coordinator',
      'Nonprofit Program Manager',
      'Youth Services Specialist',
      'Social Services Coordinator'
    ],
    'Policy + Systems': [
      'Policy Analyst',
      'Diversity & Inclusion Manager',
      'Compliance Specialist',
      'Government Program Coordinator',
      'Public Affairs Associate'
    ]
  },

  searchTerms: [
    'Sociology Intern',
    'HR Intern',
    'Market Research Intern',
    'Case Management Intern',
    'Community Outreach Intern',
    'Policy Intern',
    'Customer Success Intern',
    'Research Assistant Intern',
    'Nonprofit Program Intern'
  ],

  struggles: 'Sociology has the same translation problem as many social science majors — employers do not automatically understand how your degree solves business problems. You need to connect your skills to clear outcomes and roles.',

  honest: 'Sociology has stronger outcomes than people assume, especially in HR, research, and customer-facing business roles. Adding practical tools like Excel, SPSS, SQL, R, or project management experience can change both salary and opportunity quickly.',
},

'aerospace-engineering': {
  title: 'Aerospace Engineering',
  intro: 'Aerospace engineering is one of the most specialized and prestigious engineering degrees. The skills you build — thermodynamics, fluid mechanics, systems thinking — transfer well beyond aviation and defense.',
quickReality: {
  bestPayingPivots: [
    'Systems Engineer',
    'Project Engineer',
    'Technical Sales Engineer'
  ],
  fastestHiringRoles: [
    'Manufacturing Engineer',
    'Quality Engineer',
    'Data Analyst (Engineering)'
  ],
  mostUnderratedPath: 'Technical Sales Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Aerospace Engineering Intern',
    'Systems Engineering Intern',
    'Manufacturing Engineering Intern'
  ]
},
  careers: [
    { career: 'Systems Engineer', growth: '6%', why: 'Your systems thinking applies to any complex product — defense, tech, manufacturing', salary: '$75k-105k' },
    { career: 'Project Engineer', growth: '8%', why: 'Managing technical projects is a natural fit for your structured training', salary: '$70k-95k' },
    { career: 'Manufacturing Engineer', growth: '8%', why: 'Aerospace companies need engineers who can improve production, testing, and assembly systems', salary: '$70k-95k' },
    { career: 'Test Engineer', growth: '9%', why: 'Critical role in validating aircraft, defense systems, and high-performance products', salary: '$72k-98k' },
    { career: 'Technical Sales Engineer', growth: '6%', why: 'Companies pay well for engineers who can explain complex products to customers', salary: '$75k-110k' },
    { career: 'Data Analyst (Engineering)', growth: '23%', why: 'Your analytical background is highly valued in operations, manufacturing, and systems roles', salary: '$65k-90k' },
  ],

  morePaths: {
    'Design / Systems': [
      'Controls Engineer',
      'Systems Integration Engineer',
      'Simulation Engineer',
      'R&D Engineer',
      'Embedded Systems Engineer'
    ],
    'Hands-On / Testing': [
      'Reliability Engineer',
      'Validation Engineer',
      'Quality Engineer',
      'Field Service Engineer',
      'Process Engineer'
    ],
    'Business + Engineering': [
      'Project Engineer',
      'Program Manager',
      'Technical Sales Engineer',
      'Supply Chain Analyst',
      'Operations Manager'
    ],
    'Tech + Data': [
      'Manufacturing Data Analyst',
      'Automation Engineer',
      'Industrial Engineer',
      'Business Intelligence Analyst',
      'Operations Analyst'
    ]
  },

  searchTerms: [
    'Aerospace Engineering Intern',
    'Systems Engineer Intern',
    'Manufacturing Engineer Intern',
    'Test Engineer Intern',
    'Reliability Engineer Intern',
    'Project Engineer Intern',
    'Process Engineer Intern',
    'Operations Intern',
    'Technical Sales Engineer Intern'
  ],

  struggles: 'Aerospace grads often feel locked into defense or aviation — two industries that can be slow to hire and heavily dependent on government contracts. The skills transfer much more broadly than most students realize.',

  honest: 'Starting salaries are strong ($70-85k average) but the industry is cyclical. Defense spending fluctuates, and commercial aviation is sensitive to economic downturns. Having transferable skills across manufacturing, systems, and operations is important insurance.',
},
  'biomedical-engineering': {
  title: 'Biomedical Engineering',
  intro: 'Biomedical engineering sits at the intersection of engineering and medicine — one of the fastest growing fields as healthcare technology expands rapidly.',
quickReality: {
  bestPayingPivots: [
    'Research & Development Engineer',
    'Regulatory Affairs Specialist',
    'Quality Engineer (Medical Devices)'
  ],
  fastestHiringRoles: [
    'Clinical Engineer',
    'Quality Engineer',
    'Regulatory Affairs Intern'
  ],
  mostUnderratedPath: 'Regulatory Affairs Specialist',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Biomedical Engineering Intern',
    'Medical Device Intern',
    'Clinical Engineering Intern'
  ]
},
  careers: [
    { career: 'Clinical Engineer', growth: '10%', why: 'Maintain and improve medical equipment in hospitals — high demand everywhere', salary: '$60k-85k' },
    { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA approval for medical devices — your technical background is essential', salary: '$65k-95k' },
    { career: 'Quality Engineer (Medical Devices)', growth: '9%', why: 'Ensure medical products meet safety standards — critical and well-paid role', salary: '$65k-90k' },
    { career: 'Research & Development Engineer', growth: '8%', why: 'Develop new medical technologies at device companies', salary: '$70k-100k' },
    { career: 'Healthcare Data Analyst', growth: '23%', why: 'Healthcare data is exploding — your technical background helps you understand it', salary: '$65k-90k' },
    { career: 'Technical Sales Engineer', growth: '6%', why: 'Medical device companies value engineers who can explain complex products to hospitals and providers', salary: '$75k-110k' },
  ],

  morePaths: {
    'Medical Devices + Quality': [
      'Validation Engineer',
      'Manufacturing Engineer',
      'Process Engineer',
      'Reliability Engineer',
      'Test Engineer'
    ],
    'Clinical + Hospital': [
      'Clinical Specialist',
      'Field Service Engineer',
      'Applications Engineer',
      'Healthcare Administrator',
      'Clinical Research Coordinator'
    ],
    'Business + Engineering': [
      'Technical Sales Engineer',
      'Product Manager',
      'Project Engineer',
      'Regulatory Compliance Specialist',
      'Operations Analyst'
    ],
    'Tech + Data': [
      'Healthcare Data Analyst',
      'Systems Engineer',
      'Automation Engineer',
      'Business Intelligence Analyst',
      'Operations Analyst'
    ]
  },

  searchTerms: [
    'Biomedical Engineering Intern',
    'Clinical Engineer Intern',
    'Quality Engineer Intern',
    'Regulatory Affairs Intern',
    'Medical Device Engineer Intern',
    'Validation Engineer Intern',
    'Healthcare Data Analyst Intern',
    'Manufacturing Engineer Intern',
    'Technical Sales Engineer Intern'
  ],

  struggles: 'Many BME grads expect to go straight into exciting medical device development but entry-level roles are often in quality, regulatory, or clinical support. These are strong career foundations, not dead ends.',

  honest: 'BME has strong job prospects but many graduates underestimate how much regulatory knowledge matters. Learning FDA processes early gives you a significant advantage. Quality, validation, and regulatory roles are often the fastest way into strong medical device careers. Grad school is common but not required for good roles.',
},
'chemical-engineering': {
  title: 'Chemical Engineering',
  intro: 'Chemical engineering is one of the highest-paying engineering degrees at entry level. Your process thinking, thermodynamics, and analytical skills are valuable across energy, pharma, food, and manufacturing.',
quickReality: {
  bestPayingPivots: [
    'Process Engineer',
    'Data Scientist (Manufacturing)',
    'Petroleum Engineer'
  ],
  fastestHiringRoles: [
    'Process Engineer Intern',
    'Quality Engineer',
    'Manufacturing Engineer'
  ],
  mostUnderratedPath: 'Regulatory Affairs Specialist',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Chemical Engineering Intern',
    'Process Engineer Intern',
    'Manufacturing Engineering Intern'
  ]
},
  careers: [
    { career: 'Process Engineer', growth: '8%', why: 'Optimize manufacturing and production processes — core ChemE role, high demand', salary: '$70k-95k' },
    { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Your chemistry knowledge is essential for FDA/EPA compliance roles', salary: '$65k-95k' },
    { career: 'Quality Engineer', growth: '9%', why: 'Ensure products meet safety, quality, and compliance standards in pharma, food, and manufacturing', salary: '$65k-90k' },
    { career: 'Environmental Engineer', growth: '4%', why: 'Apply chemical and process knowledge to water, waste, emissions, and sustainability work', salary: '$60k-85k' },
    { career: 'Manufacturing Engineer', growth: '8%', why: 'Improve production systems, reduce waste, and support scale-up in industrial settings', salary: '$68k-92k' },
    { career: 'Data Scientist (Manufacturing)', growth: '35%', why: 'Use process and production data to improve yield, efficiency, and reliability', salary: '$80k-115k' },
  ],

  morePaths: {
    'Process + Manufacturing': [
      'Production Engineer',
      'Plant Engineer',
      'Process Improvement Engineer',
      'Validation Engineer',
      'Packaging Engineer'
    ],
    'Pharma + Regulated Industries': [
      'Regulatory Affairs Specialist',
      'Quality Control Analyst',
      'GMP Specialist',
      'Validation Engineer',
      'Technical Operations Associate'
    ],
    'Energy + Environment': [
      'Environmental Engineer',
      'Sustainability Engineer',
      'Water Treatment Engineer',
      'Energy Analyst',
      'EHS Specialist'
    ],
    'Tech + Data': [
      'Manufacturing Data Analyst',
      'Process Data Analyst',
      'Automation Engineer',
      'Operations Research Analyst',
      'Data Scientist'
    ]
  },

  searchTerms: [
    'Chemical Engineering Intern',
    'Process Engineer Intern',
    'Manufacturing Engineer Intern',
    'Quality Engineer Intern',
    'Validation Engineer Intern',
    'Regulatory Affairs Intern',
    'Environmental Engineer Intern',
    'Process Improvement Intern',
    'Manufacturing Data Analyst Intern'
  ],

  struggles: 'Chemical engineering salaries are strong but many students end up in industries they did not expect — food production, pharmaceuticals, consumer goods — rather than the exciting tech or energy roles they imagined.',

  honest: 'ChemE has one of the highest average starting salaries of any engineering degree ($75-85k). Petroleum engineering pays the most but is extremely volatile. Pharma, food manufacturing, quality, validation, and process roles often offer more stable paths.',
},
  'civil-engineering': {
  title: 'Civil Engineering',
  intro: 'Civil engineering builds the infrastructure that society runs on. The job market is steady and driven significantly by government spending on infrastructure — making it more recession-resistant than many fields.',
quickReality: {
  bestPayingPivots: [
    'Construction Project Manager',
    'Transportation Engineer',
    'Structural Engineer'
  ],
  fastestHiringRoles: [
    'Civil Engineering Intern',
    'Field Engineer',
    'Project Engineer'
  ],
  mostUnderratedPath: 'GIS Analyst',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Civil Engineering Intern',
    'Construction Management Intern',
    'Transportation Engineering Intern'
  ]
},
  careers: [
    { career: 'Structural Engineer', growth: '5%', why: 'Design buildings, bridges, and infrastructure — core civil engineering path', salary: '$65k-90k' },
    { career: 'Transportation Engineer', growth: '6%', why: 'Plan and design roads, highways, transit systems, and mobility projects', salary: '$65k-90k' },
    { career: 'Environmental Engineer', growth: '4%', why: 'Work on water treatment, waste systems, stormwater, and environmental compliance', salary: '$60k-85k' },
    { career: 'Construction Project Manager', growth: '8%', why: 'Oversee construction projects from planning to completion', salary: '$70k-100k' },
    { career: 'GIS Analyst', growth: '14%', why: 'Use spatial data to support planning, infrastructure, environmental, and transportation projects', salary: '$55k-80k' },
    { career: 'Water Resources Engineer', growth: '5%', why: 'Design and manage systems for stormwater, flood control, drinking water, and wastewater', salary: '$65k-90k' },
  ],

  morePaths: {
    'Design + Infrastructure': [
      'Bridge Engineer',
      'Site/Civil Engineer',
      'Geotechnical Engineer',
      'Water Resources Engineer',
      'Land Development Engineer'
    ],
    'Construction + Field': [
      'Field Engineer',
      'Construction Engineer',
      'Project Engineer',
      'Estimator',
      'Construction Project Manager'
    ],
    'Planning + Public Sector': [
      'Transportation Planner',
      'Urban Planner',
      'Public Works Engineer',
      'Traffic Engineer',
      'GIS Analyst'
    ],
    'Environment + Sustainability': [
      'Environmental Engineer',
      'Stormwater Engineer',
      'Sustainability Analyst',
      'EHS Specialist',
      'Resilience Planner'
    ]
  },

  searchTerms: [
    'Civil Engineering Intern',
    'Structural Engineer Intern',
    'Transportation Engineer Intern',
    'Construction Intern',
    'Project Engineer Intern',
    'Field Engineer Intern',
    'Water Resources Intern',
    'Environmental Engineer Intern',
    'GIS Intern'
  ],

  struggles: 'Civil engineering salaries start lower than some other engineering disciplines. PE licensure is expected for career advancement and takes years to achieve.',

  honest: 'Civil engineering is stable but not flashy. Infrastructure spending drives demand, and field/project experience matters a lot early on. The path to PE licensure takes 4+ years post-graduation, so students should understand that timeline before judging their progress.',
},
'computer-engineering': {
  title: 'Computer Engineering',
  intro: 'Computer engineering combines electrical engineering and computer science — making you one of the most versatile engineers in the job market. You can work on hardware, software, or the critical layer between them.',
quickReality: {
  bestPayingPivots: [
    'Embedded Systems Engineer',
    'Cybersecurity Engineer',
    'Systems Architect'
  ],
  fastestHiringRoles: [
    'Hardware Test Engineer',
    'Embedded Systems Intern',
    'QA Automation Engineer'
  ],
  mostUnderratedPath: 'Embedded Systems Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Embedded Systems Intern',
    'Hardware Engineering Intern',
    'Firmware Engineering Intern'
  ]
},
  careers: [
    { career: 'Embedded Systems Engineer', growth: '7%', why: 'Program the computers inside devices — cars, appliances, medical equipment, robotics, and IoT products', salary: '$80k-115k' },
    { career: 'Hardware Engineer', growth: '5%', why: 'Design and test computer chips, circuit boards, and hardware systems', salary: '$80k-115k' },
    { career: 'Software Engineer', growth: '22%', why: 'Your CS background qualifies you for many software roles', salary: '$85k-120k' },
    { career: 'Cybersecurity Engineer', growth: '32%', why: 'Your hardware and systems knowledge is valuable for security at the device and network level', salary: '$85k-120k' },
    { career: 'Systems Engineer', growth: '6%', why: 'Work across hardware, software, testing, and integration for complex technical systems', salary: '$75k-105k' },
    { career: 'Test Engineer', growth: '9%', why: 'Validate hardware, firmware, and software systems before they reach users', salary: '$70k-100k' },
  ],

  morePaths: {
    'Hardware + Embedded': [
      'Firmware Engineer',
      'FPGA Engineer',
      'Robotics Engineer',
      'PCB Design Engineer',
      'IoT Engineer'
    ],
    'Software + Systems': [
      'Software Engineer',
      'Systems Engineer',
      'DevOps Engineer',
      'Platform Engineer',
      'Cloud Engineer'
    ],
    'Security + Networks': [
      'Cybersecurity Analyst',
      'Security Engineer',
      'Network Engineer',
      'Incident Response Analyst',
      'Systems Administrator'
    ],
    'Testing + Product': [
      'QA Engineer',
      'Test Engineer',
      'Product Engineer',
      'Applications Engineer',
      'Technical Support Engineer'
    ]
  },

  searchTerms: [
    'Computer Engineering Intern',
    'Embedded Systems Intern',
    'Firmware Engineer Intern',
    'Hardware Engineer Intern',
    'Software Engineer Intern',
    'Cybersecurity Intern',
    'Systems Engineer Intern',
    'Test Engineer Intern',
    'Robotics Intern'
  ],

  struggles: 'Computer engineering students sometimes feel caught between two worlds — not quite a software engineer, not quite an electrical engineer. This is actually a strength in roles that require understanding both.',

  honest: 'Computer engineering has some of the strongest starting salaries of any engineering degree. Embedded systems is a particularly underrated path — high demand, less competition than pure software roles, and strong pay.',
},
  'electrical-engineering': {
  title: 'Electrical Engineering',
  intro: 'Electrical engineering is foundational to nearly every technology industry. From power grids to consumer electronics to autonomous vehicles — EEs are in demand across more sectors than almost any other engineering discipline.',
quickReality: {
  bestPayingPivots: [
    'Embedded Systems Engineer',
    'Power Systems Engineer',
    'RF/Communications Engineer'
  ],
  fastestHiringRoles: [
    'Electrical Design Engineer',
    'Test Engineer',
    'Controls Engineer'
  ],
  mostUnderratedPath: 'Power Systems Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Electrical Engineering Intern',
    'Embedded Systems Intern',
    'Power Systems Intern'
  ]
},
  careers: [
    { career: 'Electrical Design Engineer', growth: '6%', why: 'Design electrical systems for buildings, products, and infrastructure', salary: '$75k-105k' },
    { career: 'Power Systems Engineer', growth: '5%', why: 'Grid modernization and renewable energy are driving significant demand', salary: '$75k-105k' },
    { career: 'Embedded Systems Engineer', growth: '7%', why: 'Program electronics inside devices — cars, IoT, consumer products', salary: '$80k-115k' },
    { career: 'RF/Communications Engineer', growth: '5%', why: '5G expansion and wireless systems create strong demand for RF expertise', salary: '$80k-115k' },
    { career: 'Test Engineer', growth: '6%', why: 'Validate that electrical systems work correctly — high demand across manufacturing and hardware', salary: '$65k-90k' },
    { career: 'Controls Engineer', growth: '8%', why: 'Automation, robotics, and industrial systems rely heavily on EE fundamentals', salary: '$75k-100k' },
  ],

  morePaths: {
    'Power + Infrastructure': [
      'Substation Engineer',
      'Protection Engineer',
      'Grid Operations Engineer',
      'Renewable Energy Engineer',
      'Power Systems Engineer'
    ],
    'Embedded + Hardware': [
      'Embedded Systems Engineer',
      'Hardware Engineer',
      'PCB Design Engineer',
      'Firmware Engineer',
      'IoT Engineer'
    ],
    'Automation + Controls': [
      'Controls Engineer',
      'Automation Engineer',
      'PLC Engineer',
      'Instrumentation Engineer',
      'Manufacturing Engineer'
    ],
    'Testing + Product': [
      'Test Engineer',
      'Validation Engineer',
      'Reliability Engineer',
      'Field Service Engineer',
      'Applications Engineer'
    ]
  },

  searchTerms: [
    'Electrical Engineering Intern',
    'Power Systems Intern',
    'Embedded Systems Intern',
    'Controls Engineer Intern',
    'Test Engineer Intern',
    'Automation Engineer Intern',
    'Hardware Engineer Intern',
    'Manufacturing Engineer Intern',
    'RF Engineer Intern'
  ],

  struggles: 'EE is broad and students often feel unsure which specialization to pursue. Power, RF, embedded, and control systems are very different tracks — the sooner you specialize the better.',

  honest: 'Electrical engineering has strong salaries ($75-90k average starting) and stable demand. The renewable energy transition is creating especially strong demand for power systems engineers. PE licensure matters for some infrastructure and power roles.',
},
  'engineering-physics': {
  title: 'Engineering Physics',
  intro: 'Engineering physics is one of the most rigorous and flexible degrees available. You graduate with deep analytical skills that apply to cutting-edge fields — quantum computing, photonics, advanced materials, and more.',

  quickReality: {
  bestPayingPivots: [
    'Quantitative Analyst',
    'Data Scientist',
    'Optical / Photonics Engineer'
  ],
  fastestHiringRoles: [
    'Research Engineer',
    'Data Analyst',
    'Systems Engineer'
  ],
  mostUnderratedPath: 'Optical / Photonics Engineer',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Research Engineering Intern',
    'Data Science Intern',
    'Photonics Internship'
  ]
},
  careers: [
    { career: 'Research Engineer', growth: '8%', why: 'National labs, R&D departments, and tech companies need your analytical depth', salary: '$75k-110k' },
    { career: 'Data Scientist', growth: '35%', why: 'Your mathematical and physics background is ideal for complex data problems', salary: '$85k-120k' },
    { career: 'Optical/Photonics Engineer', growth: '10%', why: 'Lasers, fiber optics, imaging systems — growing field with specialized demand', salary: '$80k-115k' },
    { career: 'Quantitative Analyst', growth: '11%', why: 'Finance firms actively recruit physics and engineering physics graduates', salary: '$90k-150k' },
    { career: 'Systems Engineer', growth: '6%', why: 'Your ability to understand complex technical systems transfers extremely well', salary: '$75k-105k' },
    { career: 'Simulation Engineer', growth: '9%', why: 'Modeling and computational analysis are major strengths for engineering physics grads', salary: '$80k-115k' },
  ],

  morePaths: {
    'Research + Advanced Tech': [
      'R&D Engineer',
      'Materials Engineer',
      'Optical Engineer',
      'Semiconductor Engineer',
      'Research Scientist'
    ],
    'Math + Data': [
      'Data Scientist',
      'Quantitative Analyst',
      'Machine Learning Engineer',
      'Operations Research Analyst',
      'Business Intelligence Analyst'
    ],
    'Systems + Engineering': [
      'Systems Engineer',
      'Simulation Engineer',
      'Test Engineer',
      'Reliability Engineer',
      'Process Engineer'
    ],
    'Business + Strategy': [
      'Technical Consultant',
      'Product Manager',
      'Technical Sales Engineer',
      'Patent Analyst',
      'Strategy Analyst'
    ]
  },

  searchTerms: [
    'Engineering Physics Intern',
    'Research Engineer Intern',
    'Data Science Intern',
    'Photonics Intern',
    'Systems Engineer Intern',
    'Simulation Engineer Intern',
    'Quantitative Analyst Intern',
    'R&D Engineer Intern',
    'Materials Engineering Intern'
  ],

  struggles: 'Engineering physics is genuinely hard to explain to employers. Most recruiters do not know what it is. You need to be very good at translating your skills into terms hiring managers understand.',

  honest: 'Engineering physics grads who can communicate their skills well have excellent outcomes. Grad school is common and often the clearest path. Without grad school, leading with your math, modeling, and programming skills creates the strongest opportunities.',
},
  'environmental-engineering': {
  title: 'Environmental Engineering',
  intro: 'Environmental engineering is growing steadily as climate change, sustainability regulations, and infrastructure investment create ongoing demand. You sit at the intersection of engineering, science, and policy.',
quickReality: {
  bestPayingPivots: [
    'Water Resources Engineer',
    'Sustainability Engineer',
    'Environmental Consultant'
  ],
  fastestHiringRoles: [
    'Environmental Engineer',
    'EHS Specialist',
    'Remediation Engineer'
  ],
  mostUnderratedPath: 'Water Resources Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Environmental Engineering Intern',
    'Water Resources Intern',
    'EHS Internship'
  ]
},
  careers: [
    { career: 'Environmental Engineer', growth: '4%', why: 'Water treatment, air quality, waste management — core environmental engineering roles', salary: '$60k-85k' },
    { career: 'Sustainability Engineer', growth: '12%', why: 'Companies increasingly need engineers who understand environmental impact and ESG goals', salary: '$65k-90k' },
    { career: 'Remediation Engineer', growth: '6%', why: 'Clean up contaminated sites — steady government and private sector demand', salary: '$60k-85k' },
    { career: 'Environmental Consultant', growth: '8%', why: 'Help companies comply with environmental regulations and permitting requirements', salary: '$60k-90k' },
    { career: 'Water Resources Engineer', growth: '5%', why: 'Water infrastructure is critically underfunded and needs engineers urgently', salary: '$65k-90k' },
    { career: 'GIS Analyst', growth: '14%', why: 'Spatial and environmental data play a huge role in land use, remediation, and infrastructure planning', salary: '$55k-80k' },
  ],

  morePaths: {
    'Water + Infrastructure': [
      'Water Resources Engineer',
      'Stormwater Engineer',
      'Wastewater Engineer',
      'Civil/Environmental Engineer',
      'Public Works Engineer'
    ],
    'Consulting + Compliance': [
      'Environmental Consultant',
      'EHS Specialist',
      'Permitting Specialist',
      'Regulatory Compliance Specialist',
      'Environmental Planner'
    ],
    'Sustainability + Climate': [
      'Sustainability Analyst',
      'Sustainability Engineer',
      'Energy Analyst',
      'Carbon Accounting Specialist',
      'ESG Analyst'
    ],
    'Field + Site Work': [
      'Remediation Engineer',
      'Site Assessment Engineer',
      'Field Engineer',
      'Geotechnical Technician',
      'Environmental Scientist'
    ]
  },

  searchTerms: [
    'Environmental Engineering Intern',
    'Water Resources Intern',
    'Environmental Consultant Intern',
    'Sustainability Intern',
    'Remediation Engineer Intern',
    'EHS Intern',
    'GIS Intern',
    'Stormwater Intern',
    'Environmental Compliance Intern'
  ],

  struggles: 'Environmental engineering salaries start lower than other engineering disciplines. Many roles are government or consulting sector which can feel less dynamic than tech or product companies.',

  honest: 'Environmental engineering has strong long-term prospects as climate regulations tighten globally. Starting salaries are lower ($60-70k), but PE licensure and specialization in water, remediation, and sustainability significantly improve long-term earnings.',
},
  'industrial-engineering': {
  title: 'Industrial Engineering',
  intro: 'Industrial engineering is one of the most versatile engineering degrees — you optimize systems, processes, and operations. This applies to manufacturing, healthcare, logistics, tech, and consulting.',
quickReality: {
  bestPayingPivots: [
    'Operations Research Analyst',
    'Management Consultant',
    'Supply Chain Engineer'
  ],
  fastestHiringRoles: [
    'Process Improvement Engineer',
    'Supply Chain Analyst',
    'Operations Analyst'
  ],
  mostUnderratedPath: 'Supply Chain Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Industrial Engineering Intern',
    'Operations Intern',
    'Supply Chain Intern'
  ]
},
  careers: [
    { career: 'Operations Research Analyst', growth: '23%', why: 'Optimize complex systems using mathematical models — exactly what IE trains you for', salary: '$70k-100k' },
    { career: 'Supply Chain Analyst', growth: '18%', why: 'Improve sourcing, logistics, inventory, and flow across complex operations', salary: '$60k-85k' },
    { career: 'Process Improvement Engineer', growth: '10%', why: 'Use Lean, Six Sigma, and systems thinking to make work faster, safer, and more efficient', salary: '$65k-90k' },
    { career: 'Manufacturing Engineer', growth: '8%', why: 'Improve production layouts, workflows, throughput, and quality in manufacturing environments', salary: '$68k-92k' },
    { career: 'Data Analyst', growth: '23%', why: 'Your analytical background translates directly to data, dashboards, and operational decision-making', salary: '$65k-90k' },
    { career: 'Management Consultant', growth: '11%', why: 'Your systems thinking is extremely valuable in consulting and operations strategy', salary: '$75k-110k' },
  ],

  morePaths: {
    'Operations + Process': [
      'Operations Analyst',
      'Process Improvement Engineer',
      'Continuous Improvement Specialist',
      'Lean Six Sigma Analyst',
      'Industrial Engineer'
    ],
    'Supply Chain + Logistics': [
      'Supply Chain Analyst',
      'Logistics Analyst',
      'Inventory Analyst',
      'Procurement Analyst',
      'Distribution Analyst'
    ],
    'Manufacturing + Quality': [
      'Manufacturing Engineer',
      'Quality Engineer',
      'Production Planner',
      'Facilities Engineer',
      'Reliability Engineer'
    ],
    'Data + Strategy': [
      'Data Analyst',
      'Operations Research Analyst',
      'Business Analyst',
      'Management Consultant',
      'Business Intelligence Analyst'
    ]
  },

  searchTerms: [
    'Industrial Engineering Intern',
    'Operations Intern',
    'Supply Chain Intern',
    'Process Improvement Intern',
    'Manufacturing Engineer Intern',
    'Quality Engineer Intern',
    'Data Analyst Intern',
    'Business Analyst Intern',
    'Continuous Improvement Intern'
  ],

  struggles: 'Industrial engineers sometimes feel their degree is less prestigious than other engineering disciplines. This is wrong — IE is one of the most versatile and consistently employed engineering fields.',

  honest: 'Industrial engineering has one of the broadest applications of any engineering degree. If you are unsure what industry you want to work in, IE gives you flexibility across manufacturing, healthcare, logistics, tech, and consulting. Starting salaries average $68-78k.',
},
'materials-science-engineering': {
  title: 'Materials Science Engineering',
  intro: 'Materials science engineering is foundational to every physical product — from semiconductors to medical implants to aerospace components. The field is growing rapidly with clean energy and advanced manufacturing.',
quickReality: {
  bestPayingPivots: [
    'Process Engineer (Semiconductor)',
    'Materials Engineer',
    'Research Scientist (Industry)'
  ],
  fastestHiringRoles: [
    'Quality Engineer',
    'Materials Lab Technician',
    'Manufacturing Engineer'
  ],
  mostUnderratedPath: 'Process Engineer (Semiconductor)',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Materials Engineering Intern',
    'Semiconductor Process Intern',
    'Quality Engineering Intern'
  ]
},
  careers: [
    { career: 'Materials Engineer', growth: '6%', why: 'Develop, test, and improve materials for products across industries', salary: '$70k-95k' },
    { career: 'Process Engineer (Semiconductor)', growth: '9%', why: 'Semiconductor manufacturing needs materials expertise urgently', salary: '$80k-110k' },
    { career: 'Quality Engineer', growth: '9%', why: 'Ensure materials meet specifications — high demand in manufacturing and regulated industries', salary: '$65k-90k' },
    { career: 'Manufacturing Engineer', growth: '8%', why: 'Support production processes for advanced materials, devices, and components', salary: '$68k-95k' },
    { career: 'Research Engineer', growth: '8%', why: 'Work in R&D roles at materials companies, national labs, and advanced manufacturing firms', salary: '$70k-100k' },
    { career: 'Battery Engineer', growth: '12%', why: 'Clean energy, EVs, and grid storage are creating demand for materials-focused battery roles', salary: '$75k-110k' },
  ],

  morePaths: {
    'Materials + R&D': [
      'Materials Engineer',
      'Research Engineer',
      'Polymer Engineer',
      'Metallurgical Engineer',
      'Ceramics Engineer'
    ],
    'Semiconductors + Electronics': [
      'Process Engineer',
      'Semiconductor Engineer',
      'Failure Analysis Engineer',
      'Thin Film Engineer',
      'Manufacturing Engineer'
    ],
    'Manufacturing + Quality': [
      'Quality Engineer',
      'Test Engineer',
      'Validation Engineer',
      'Supplier Quality Engineer',
      'Reliability Engineer'
    ],
    'Energy + Advanced Tech': [
      'Battery Engineer',
      'Solar Materials Engineer',
      'Clean Energy Analyst',
      'Aerospace Materials Engineer',
      'Biomedical Materials Engineer'
    ]
  },

  searchTerms: [
    'Materials Engineering Intern',
    'Materials Science Intern',
    'Process Engineer Intern',
    'Semiconductor Intern',
    'Quality Engineer Intern',
    'Manufacturing Engineer Intern',
    'Research Engineer Intern',
    'Battery Engineer Intern',
    'Failure Analysis Intern'
  ],

  struggles: 'Materials science is not well understood by most employers outside of manufacturing and research. Students often need to be proactive about connecting their skills to industry needs.',

  honest: 'Materials science is genuinely niche but has strong demand in semiconductor, aerospace, medical device, and clean energy sectors. Grad school is common but not required. Semiconductor and battery-related roles are especially strong because of chip manufacturing and clean energy investment.',
},
  'mechanical-engineering': {
  title: 'Mechanical Engineering',
  intro: 'Mechanical engineering is the broadest and most foundational engineering degree. If something moves, has parts, or uses energy — a mechanical engineer was involved. The degree opens doors across virtually every industry.',
quickReality: {
  bestPayingPivots: [
    'Product Development Engineer',
    'Technical Sales Engineer',
    'Systems Engineer'
  ],
  fastestHiringRoles: [
    'Manufacturing Engineer',
    'Quality Engineer',
    'Process Engineer'
  ],
  mostUnderratedPath: 'Technical Sales Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Mechanical Engineering Intern',
    'Manufacturing Engineer Intern',
    'Process Engineer Intern'
  ]
},
  careers: [
    { career: 'Mechanical Design Engineer', growth: '7%', why: 'Design physical products — from consumer goods to industrial equipment', salary: '$70k-95k' },
    { career: 'Manufacturing Engineer', growth: '8%', why: 'Improve how products are made — high demand in reshoring and advanced manufacturing', salary: '$68k-90k' },
    { career: 'Product Development Engineer', growth: '8%', why: 'Bring new products from concept to production', salary: '$72k-100k' },
    { career: 'Technical Sales Engineer', growth: '6%', why: 'Sell complex equipment — great for engineers who like people, problem-solving, and business', salary: '$75k-115k' },
    { career: 'Supply Chain Analyst', growth: '18%', why: 'Use engineering thinking to improve sourcing, logistics, costs, and operations', salary: '$60k-85k' },
    { career: 'Data Analyst (Manufacturing)', growth: '23%', why: 'Use production and operations data to improve quality, output, and efficiency', salary: '$65k-90k' },
  ],

  morePaths: {
    'Hands-On / Plant Floor': [
      'Quality Engineer',
      'Reliability Engineer',
      'Validation Engineer',
      'Process Engineer',
      'Field Service Engineer'
    ],
    'Design / Product': [
      'R&D Engineer',
      'Test Engineer',
      'CAD Designer',
      'Applications Engineer',
      'Packaging Engineer'
    ],
    'Business + Engineering': [
      'Sales Engineer',
      'Project Engineer',
      'Product Manager',
      'Procurement Specialist',
      'Operations Analyst'
    ],
    'Tech + Data': [
      'Automation Engineer',
      'Controls Engineer',
      'Manufacturing Data Analyst',
      'Systems Engineer',
      'Industrial Engineer'
    ]
  },

  searchTerms: [
    'Mechanical Engineering Intern',
    'Manufacturing Intern',
    'Product Development Intern',
    'Process Engineer Intern',
    'Quality Engineer Intern',
    'Reliability Intern',
    'Operations Intern',
    'Supply Chain Intern',
    'Technical Sales Engineer Intern'
  ],

  struggles: 'Mechanical engineering is the most common engineering degree which means more competition for the same roles. Standing out requires either strong internship experience, a specialty, or both.',

  honest: 'ME is stable and versatile but starting salaries ($68-78k) are lower than CS or ChemE. The strongest career paths are in product development, automotive, and aerospace. Manufacturing is seeing a renaissance with reshoring investment.',
},
'software-engineering': {
  title: 'Software Engineering',
  intro: 'Software engineering is one of the most in-demand degrees in the world. Unlike computer science, which is more theoretical, software engineering is specifically designed for building production software systems.',
quickReality: {
  bestPayingPivots: [
    'Software Engineer',
    'DevOps / Platform Engineer',
    'Product Manager (Technical)'
  ],
  fastestHiringRoles: [
    'QA Engineer',
    'Full Stack Developer',
    'Support Engineer'
  ],
  mostUnderratedPath: 'DevOps / Platform Engineer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Software Engineering Intern',
    'Full Stack Developer Intern',
    'DevOps Intern'
  ]
},
  careers: [
    { career: 'Software Engineer', growth: '22%', why: 'Core role — building applications, systems, and platforms', salary: '$90k-130k' },
    { career: 'DevOps/Platform Engineer', growth: '19%', why: 'Build and maintain the infrastructure that software runs on', salary: '$90k-130k' },
    { career: 'Full Stack Developer', growth: '22%', why: 'Build both front-end and back-end systems — highly versatile', salary: '$85k-120k' },
    { career: 'Quality Assurance Engineer', growth: '9%', why: 'Ensure software works correctly — often overlooked but valuable path', salary: '$70k-95k' },
    { career: 'Cybersecurity Engineer', growth: '32%', why: 'Protect systems and applications from security threats — strong demand across industries', salary: '$85k-120k' },
    { career: 'Product Manager (Technical)', growth: '19%', why: 'Your engineering background makes you a stronger PM than most', salary: '$90k-130k' },
  ],

  morePaths: {
    'Software Development': [
      'Backend Engineer',
      'Frontend Engineer',
      'Full Stack Developer',
      'Mobile App Developer',
      'Application Developer'
    ],
    'Infrastructure + Cloud': [
      'DevOps Engineer',
      'Platform Engineer',
      'Cloud Engineer',
      'Site Reliability Engineer',
      'Systems Engineer'
    ],
    'Quality + Security': [
      'QA Engineer',
      'Test Automation Engineer',
      'Cybersecurity Engineer',
      'Security Analyst',
      'Release Engineer'
    ],
    'Product + Data': [
      'Technical Product Manager',
      'Data Engineer',
      'Machine Learning Engineer',
      'Business Intelligence Analyst',
      'Solutions Engineer'
    ]
  },

  searchTerms: [
    'Software Engineering Intern',
    'Software Developer Intern',
    'Full Stack Intern',
    'Frontend Intern',
    'Backend Intern',
    'DevOps Intern',
    'Cloud Engineer Intern',
    'QA Engineer Intern',
    'Cybersecurity Intern'
  ],

  struggles: 'The software engineering job market tightened significantly in 2023-2024 after a period of massive over-hiring. Entry-level roles are more competitive than they were a few years ago.',

  honest: 'Software engineering still has excellent long-term prospects and among the highest starting salaries of any degree ($90-100k average). The immediate market is more competitive than 2020-2022. Internships, portfolio projects, GitHub activity, and networking matter more than ever.',
},
'creative-writing': {
  title: 'Creative Writing',
  intro: 'Creative writing develops your ability to communicate with precision, empathy, and clarity — skills that are genuinely rare and valuable in the professional world, even if the path is not obvious.',
quickReality: {
  bestPayingPivots: [
    'UX Writer',
    'Content Strategist',
    'Technical Writer'
  ],
  fastestHiringRoles: [
    'Copywriting Intern',
    'Content Marketing Intern',
    'Technical Writing Intern'
  ],
  mostUnderratedPath: 'Technical Writer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'UX Writing Intern',
    'Technical Writing Intern',
    'Content Strategy Intern'
  ]
},
  careers: [
    { career: 'UX Writer', growth: '23%', why: 'Write the words inside apps and websites — storytelling applied to digital products', salary: '$75k-100k' },
    { career: 'Content Strategist', growth: '15%', why: 'Plan and manage content across organizations — your writing judgment is central', salary: '$60k-85k' },
    { career: 'Technical Writer', growth: '7%', why: 'Explain complex things clearly — your writing skills are directly applicable', salary: '$60k-80k' },
    { career: 'Copywriter', growth: '8%', why: 'Write marketing and advertising copy — creative writing is ideal preparation', salary: '$50k-75k' },
    { career: 'Grant Writer', growth: '8%', why: 'Write compelling funding proposals for nonprofits and research organizations', salary: '$50k-70k' },
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Every company needs strong internal and external communication — clear writing wins here', salary: '$55k-80k' },
  ],

  morePaths: {
    'Writing + Strategy': [
      'Editorial Assistant',
      'Content Strategist',
      'Content Marketing Specialist',
      'SEO Content Writer',
      'Brand Storyteller'
    ],
    'Tech + Product': [
      'UX Writer',
      'Technical Writer',
      'Documentation Specialist',
      'Knowledge Base Manager',
      'Product Content Designer'
    ],
    'Business + Communications': [
      'Corporate Communications Specialist',
      'Public Relations Specialist',
      'Internal Communications Manager',
      'Employer Branding Specialist',
      'Communications Coordinator'
    ],
    'Nonprofit + Mission-Driven': [
      'Grant Writer',
      'Development Coordinator',
      'Nonprofit Communications Manager',
      'Fundraising Writer',
      'Community Outreach Coordinator'
    ]
  },

  searchTerms: [
    'UX Writer Intern',
    'Content Writing Intern',
    'Technical Writing Intern',
    'Copywriting Intern',
    'Communications Intern',
    'Grant Writing Intern',
    'Editorial Intern',
    'Marketing Content Intern',
    'Content Strategy Intern'
  ],

  struggles: 'Publishing, screenwriting, and literary careers are extremely competitive with very limited openings. Most creative writing grads who thrive professionally pivot to applied writing roles in tech, business, or nonprofits.',

  honest: 'Being a professional novelist or screenwriter is genuinely difficult — not impossible, but the odds are long. UX writing, technical writing, and content strategy often offer stronger pay, stability, and still let you use the same core skill: writing that makes people feel or understand something. Many successful creative writers do both.',
},
'english': {
  title: 'English',
  intro: 'English teaches writing, research, analysis, and clear communication — skills that transfer into tech, business, nonprofits, education, and media. The strongest paths usually come from applying writing to a specific industry, not just searching for “English jobs.”',

  quickReality: {
    bestPayingPivots: [
      'UX Writer',
      'Content Strategist',
      'Technical Writer'
    ],
    fastestHiringRoles: [
      'Technical Writer',
      'Customer Education Specialist',
      'Content Marketing'
    ],
    mostUnderratedPath: 'Technical Writer',
    gradSchoolRequired: 'No',
    strongestInternshipSearches: [
      'Technical Writing Intern',
      'UX Writing Intern',
      'Content Strategy Intern'
    ]
  },

  careers: [
    { career: 'UX Writer', growth: '23%', why: 'Write the words inside digital products — one of the strongest tech pivots for English majors', salary: '$75k-100k' },
    { career: 'Content Strategist', growth: '15%', why: 'Plan content across websites, brands, and organizations — editorial judgment becomes business value', salary: '$65k-90k' },
    { career: 'Technical Writer', growth: '7%', why: 'Explain complex systems clearly — one of the smartest and most underrated writing careers', salary: '$60k-80k' },
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Write internal updates, leadership messages, and brand communications for organizations', salary: '$55k-80k' },
    { career: 'Grant Writer', growth: '8%', why: 'Use research and persuasive writing to help nonprofits, schools, and universities secure funding', salary: '$50k-70k' },
    { career: 'Copywriter', growth: '8%', why: 'Write marketing and advertising copy that drives attention, trust, and action', salary: '$50k-75k' },
  ],

  morePaths: {
    'Writing + Content': [
      'UX Writer',
      'Content Strategist',
      'Copywriter',
      'Technical Writer',
      'Editorial Assistant'
    ],
    'Business + Communications': [
      'Corporate Communications Specialist',
      'Public Relations Specialist',
      'Internal Communications Specialist',
      'Brand Strategist',
      'Marketing Coordinator'
    ],
    'Nonprofit + Education': [
      'Grant Writer',
      'Development Associate',
      'Program Coordinator',
      'Academic Advisor',
      'Education Program Coordinator'
    ],
    'Tech + Product': [
      'Product Content Designer',
      'Documentation Specialist',
      'Knowledge Base Manager',
      'UX Research Assistant',
      'Content Operations Specialist'
    ]
  },

  searchTerms: [
    'Technical Writing Intern',
    'UX Writing Intern',
    'Content Strategy Intern',
    'Communications Intern',
    'Content Marketing Intern',
    'Copywriting Intern',
    'Grant Writing Intern',
    'Editorial Intern',
    'Customer Education Intern'
  ],

  struggles: 'Traditional publishing and journalism careers have contracted significantly. English grads who only look for “English jobs” often run into low pay and limited openings because the better opportunities usually use different titles.',

  honest: 'UX writing, content strategy, and technical writing often pay far more than traditional editorial roles. If you are an English major, learning basic UX, SEO, documentation tools, and content strategy can make your degree much more marketable.',
},
'film-media-studies': {
  title: 'Film / Media Studies',
  intro: 'Film and media studies teaches storytelling, audience psychology, content production, and how media shapes behavior. The strongest career paths usually come from applying those skills to business, marketing, content strategy, and digital experiences — not relying only on traditional film and TV industry jobs.',
quickReality: {
  bestPayingPivots: [
    'UX Researcher',
    'Content Marketing Manager',
    'Video Producer'
  ],
  fastestHiringRoles: [
    'Social Media Coordinator',
    'Production Assistant',
    'Communications Assistant'
  ],
  mostUnderratedPath: 'UX Researcher',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Content Marketing Intern',
    'Video Production Intern',
    'Social Media Internship'
  ]
},
  careers: [
    { career: 'Content Marketing Manager', growth: '15%', why: 'Every company needs strong video, storytelling, and content strategy', salary: '$55k-80k' },
    { career: 'Social Media Manager', growth: '10%', why: 'Visual storytelling and audience engagement are directly transferable', salary: '$50k-75k' },
    { career: 'UX Researcher', growth: '18%', why: 'Understanding how people engage with media translates well to product behavior research', salary: '$70k-95k' },
    { career: 'Video Producer', growth: '12%', why: 'Corporate video, branded content, and digital media are growing fast', salary: '$50k-75k' },
    { career: 'Communications Specialist', growth: '8%', why: 'Strong storytelling and media literacy make you valuable in business communication', salary: '$50k-70k' },
    { career: 'Brand Content Strategist', growth: '14%', why: 'Companies need people who understand story, audience, and digital attention', salary: '$60k-85k' },
  ],

  morePaths: {
    'Content + Media': [
      'Video Producer',
      'Content Marketing Manager',
      'Social Media Manager',
      'Brand Content Strategist',
      'Creative Producer'
    ],
    'Business + Communication': [
      'Communications Specialist',
      'Corporate Communications',
      'Internal Communications',
      'PR Coordinator',
      'Marketing Operations'
    ],
    'Research + Product': [
      'UX Researcher',
      'Audience Research',
      'Consumer Insights',
      'Market Research Analyst',
      'Product Research Support'
    ],
    'Creative Industry + Production': [
      'Production Coordinator',
      'Post-Production Support',
      'Studio Operations',
      'Agency Project Coordinator',
      'Creative Project Manager'
    ]
  },

  searchTerms: [
    'Media Intern',
    'Content Marketing Intern',
    'Video Production Intern',
    'Social Media Intern',
    'Communications Intern',
    'Creative Producer Intern',
    'UX Research Intern',
    'Marketing Content Intern',
    'Production Coordinator Intern'
  ],

  struggles: 'Traditional film and TV industry jobs are extremely competitive, concentrated in a few cities like LA and NYC, and have become less stable with streaming disruption, strikes, and shrinking studio budgets. Many students underestimate how difficult that path can be.',

  honest: 'Film industry careers are real, but they are hard to break into and often unstable early on. Corporate video, content strategy, brand storytelling, and UX research usually offer better pay, more stability, and still let you use the exact same creative skills.',
},
'fine-arts': {
  title: 'Fine Arts / Studio Art',
  intro: 'Fine arts develops visual thinking, creative problem-solving, design judgment, and the ability to communicate through imagery. The strongest professional paths usually come from applying those skills to business, tech, branding, and digital experiences — not relying only on traditional gallery or studio work.',
quickReality: {
  bestPayingPivots: [
    'UX/UI Designer',
    'Art Director',
    'Exhibit / Experience Designer'
  ],
  fastestHiringRoles: [
    'Graphic Design Intern',
    'Content Creator',
    'Marketing Design Assistant'
  ],
  mostUnderratedPath: 'Exhibit / Experience Designer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'UX Design Intern',
    'Graphic Design Intern',
    'Creative Design Internship'
  ]
},
  careers: [
    { career: 'UX/UI Designer', growth: '16%', why: 'Visual design and creative problem-solving transfer directly to digital product design', salary: '$70k-100k' },
    { career: 'Graphic Designer', growth: '3%', why: 'Apply artistic skills to branding, marketing, and commercial design work', salary: '$50k-70k' },
    { career: 'Art Director', growth: '6%', why: 'Lead creative strategy and visual direction for campaigns and brands', salary: '$75k-110k' },
    { career: 'Social Media Content Creator', growth: '10%', why: 'Brands pay for strong visual storytelling and original content', salary: '$45k-70k' },
    { career: 'Exhibit / Experience Designer', growth: '8%', why: 'Design physical and digital experiences for museums, events, and branded spaces', salary: '$50k-75k' },
    { career: 'Brand Designer', growth: '8%', why: 'Create visual identity systems for companies and products', salary: '$55k-80k' },
  ],

  morePaths: {
    'Design + Digital': [
      'UX/UI Designer',
      'Graphic Designer',
      'Brand Designer',
      'Product Design Support',
      'Motion Graphics Designer'
    ],
    'Creative Leadership': [
      'Art Director',
      'Creative Strategist',
      'Visual Content Lead',
      'Marketing Design Manager',
      'Experience Designer'
    ],
    'Media + Content': [
      'Social Media Content Creator',
      'Content Producer',
      'Visual Storytelling Specialist',
      'Video Production Support',
      'Creative Marketing Coordinator'
    ],
    'Applied Creative Paths': [
      'Exhibit Designer',
      'Retail Display Designer',
      'Museum Programs',
      'Event Experience Design',
      'Corporate Creative Services'
    ]
  },

  searchTerms: [
    'Design Intern',
    'UX Design Intern',
    'Graphic Design Intern',
    'Creative Intern',
    'Brand Design Intern',
    'Marketing Design Intern',
    'Content Creation Intern',
    'Art Direction Intern',
    'Experience Design Intern'
  ],

  struggles: 'Fine arts has one of the hardest direct career paths when students focus only on being a traditional artist. Freelance instability is real, gallery careers are limited, and pure studio art rarely provides reliable income early on.',

  honest: 'The fine arts graduates who do best financially usually make a deliberate pivot into applied design — UX, branding, creative strategy, and digital product work. Learning Figma, Adobe Creative Suite, and basic web or motion design can change your entire career trajectory.',
},
'gender-womens-studies': {
  title: "Gender / Women's Studies",
  intro: "Gender and women's studies teaches you to analyze systems, understand power dynamics, communicate across differences, and advocate for equity. The strongest career paths are usually in HR, nonprofit leadership, policy, program management, and organizational operations — not just traditional DEI roles.",
quickReality: {
  bestPayingPivots: [
    'Policy Analyst',
    'Human Resources Specialist',
    'Diversity, Equity & Inclusion Specialist'
  ],
  fastestHiringRoles: [
    'Program Coordinator',
    'Community Outreach Assistant',
    'HR Assistant'
  ],
  mostUnderratedPath: 'Human Resources Specialist',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Policy Intern',
    'Human Resources Intern',
    'Nonprofit Program Internship'
  ]
},
  careers: [
    { career: 'Human Resources Specialist', growth: '10%', why: 'Workplace culture, policy, and people systems make HR a strong and practical fit', salary: '$50k-70k' },
    { career: 'Nonprofit Program Manager', growth: '9%', why: 'Lead advocacy, education, and social service programs aligned with mission-driven work', salary: '$50k-75k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Analyze and improve policy for government agencies, nonprofits, and think tanks', salary: '$55k-80k' },
    { career: 'Diversity, Equity & Inclusion Specialist', growth: '15%', why: 'Apply your equity framework directly inside organizations and institutions', salary: '$60k-90k' },
    { career: 'Community Outreach Coordinator', growth: '8%', why: 'Build relationships, advocacy efforts, and community-based programs', salary: '$45k-65k' },
    { career: 'Program Coordinator', growth: '10%', why: 'Operations and leadership role supporting mission-driven teams and organizations', salary: '$50k-70k' },
  ],

  morePaths: {
    'People + Organizations': [
      'Human Resources Specialist',
      'DEI Specialist',
      'Recruiter',
      'Employee Experience Coordinator',
      'Training & Development Specialist'
    ],
    'Nonprofit + Advocacy': [
      'Nonprofit Program Manager',
      'Community Outreach Coordinator',
      'Grant Writer',
      'Advocacy Specialist',
      'Volunteer Program Manager'
    ],
    'Policy + Government': [
      'Policy Analyst',
      'Government Program Coordinator',
      'Legislative Assistant',
      'Public Affairs Associate',
      'Compliance Specialist'
    ],
    'Higher ROI Pivots': [
      'Corporate HR',
      'Healthcare Program Management',
      'University Administration',
      'Consulting Track',
      'Graduate School Path'
    ]
  },

  searchTerms: [
    'HR Intern',
    'Nonprofit Intern',
    'Policy Intern',
    'Program Coordinator Intern',
    'Community Outreach Intern',
    'Government Affairs Intern',
    'DEI Intern',
    'University Administration Intern',
    'Advocacy Internship'
  ],

  struggles: 'This degree often requires stronger translation than students expect because employers do not hire for the major title — they hire for skills like project management, policy analysis, operations, and people leadership. DEI roles alone are also narrower and more volatile than many students realize.',

  honest: 'This degree works best when paired with practical skills like Excel, project management, grant writing, HR systems, or data analysis. HR, program management, and policy roles are often stronger and more stable than relying only on dedicated DEI roles.',
},
'theater': {
  title: 'Theater / Drama',
  intro: 'Theater develops communication, presence, adaptability, collaboration, and the ability to connect with people under pressure. Those skills translate far beyond acting — especially in training, client-facing roles, events, leadership, and communication-heavy careers.',
quickReality: {
  bestPayingPivots: [
    'UX Researcher',
    'Corporate Trainer',
    'Customer Success Manager'
  ],
  fastestHiringRoles: [
    'Events Coordinator',
    'Communications Assistant',
    'Training Coordinator'
  ],
  mostUnderratedPath: 'Corporate Trainer',
  gradSchoolRequired: 'No',
  strongestInternshipSearches: [
    'Event Management Intern',
    'Training and Development Intern',
    'Communications Intern'
  ]
},
  careers: [
    { career: 'Corporate Trainer', growth: '11%', why: 'Presentation, facilitation, and audience engagement make this one of the strongest theater pivots', salary: '$55k-80k' },
    { career: 'UX Researcher', growth: '18%', why: 'Observation, empathy, and understanding human behavior translate directly to product research', salary: '$70k-95k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Connecting with people and adapting to your audience is a major advantage here', salary: '$55k-80k' },
    { career: 'Communications Specialist', growth: '8%', why: 'Public speaking, storytelling, and message delivery are core theater strengths', salary: '$50k-70k' },
    { career: 'Events Manager', growth: '18%', why: 'Production coordination and live event experience transfer naturally', salary: '$50k-70k' },
    { career: 'Sales Enablement Specialist', growth: '12%', why: 'Training teams, presenting ideas, and communication-heavy work fit theater grads well', salary: '$60k-85k' },
  ],

  morePaths: {
    'Performance + Creative': [
      'Acting',
      'Production Coordinator',
      'Stage Management',
      'Casting Support',
      'Creative Producer'
    ],
    'People + Communication': [
      'Corporate Trainer',
      'Customer Success Manager',
      'Communications Specialist',
      'Sales Enablement',
      'Public Speaking Roles'
    ],
    'Research + Human Behavior': [
      'UX Researcher',
      'Market Research',
      'Consumer Insights',
      'Employee Experience',
      'Learning & Development'
    ],
    'Events + Operations': [
      'Events Manager',
      'Conference Coordinator',
      'Experiential Marketing',
      'Program Coordinator',
      'Corporate Event Management'
    ]
  },

  searchTerms: [
    'Theater Intern',
    'Corporate Training Intern',
    'Events Intern',
    'Communications Intern',
    'Customer Success Intern',
    'Production Intern',
    'UX Research Intern',
    'Sales Enablement Intern',
    'Program Coordinator Intern'
  ],

  struggles: 'Professional acting and performance careers are among the most competitive in any field. Most performers work multiple jobs, freelance heavily, and face real financial instability. The gap between passion and paycheck can be significant.',

  honest: 'If performance is your passion, pursue it — but build parallel skills that pay consistently. Corporate training, UX research, customer success, and communications often offer stronger financial stability while still using the same strengths that made theater a good fit in the first place.',
},
'religious-studies': {
  title: 'Religious Studies',
  intro: 'Religious studies teaches critical thinking, ethics, cultural understanding, deep reading, and how people build meaning and community. The strongest career paths usually come through nonprofit leadership, education, counseling support, policy, and people-focused organizational work — not just ministry or academia.',
quickReality: {
  bestPayingPivots: [
    'Policy Analyst',
    'Nonprofit Program Manager',
    'Community Outreach Director'
  ],
  fastestHiringRoles: [
    'Program Coordinator',
    'Community Outreach Assistant',
    'Case Manager'
  ],
  mostUnderratedPath: 'Policy Analyst',
  gradSchoolRequired: 'Sometimes',
  strongestInternshipSearches: [
    'Nonprofit Internship',
    'Policy Intern',
    'Community Outreach Internship'
  ]
},
  careers: [
    { career: 'Nonprofit Program Manager', growth: '9%', why: 'Many nonprofits are mission-driven and values-based — your background fits naturally', salary: '$50k-75k' },
    { career: 'Chaplain / Counselor', growth: '8%', why: 'Hospitals, military, prisons, and universities employ chaplains and support roles', salary: '$50k-75k' },
    { career: 'Community Outreach Coordinator', growth: '8%', why: 'Build relationships and programs across diverse communities', salary: '$45k-65k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Religion intersects with law, ethics, politics, and public policy', salary: '$55k-80k' },
    { career: 'Teacher / Educator', growth: '5%', why: 'Social studies, ethics, philosophy, and humanities education', salary: '$45k-65k' },
    { career: 'University Program Coordinator', growth: '10%', why: 'Student affairs, campus life, and mission-driven higher education roles fit well', salary: '$50k-70k' },
  ],

  morePaths: {
    'Mission + Nonprofit Work': [
      'Nonprofit Program Manager',
      'Community Outreach Coordinator',
      'Grant Writing',
      'Advocacy Programs',
      'Faith-Based Organizations'
    ],
    'Counseling + Support': [
      'Chaplain',
      'Counselor Support Roles',
      'Campus Ministry',
      'Student Support Services',
      'Community Services'
    ],
    'Education + Institutions': [
      'Teacher',
      'University Program Coordinator',
      'Student Affairs',
      'Academic Advising',
      'Humanities Education'
    ],
    'Long-Term Growth Paths': [
      'Graduate School',
      'Divinity School',
      'Law School',
      'Social Work',
      'Public Administration'
    ]
  },

  searchTerms: [
    'Nonprofit Intern',
    'Community Outreach Intern',
    'Student Affairs Intern',
    'Program Coordinator Intern',
    'Policy Intern',
    'University Administration Intern',
    'Campus Ministry Internship',
    'Education Internship',
    'Social Services Internship'
  ],

  struggles: 'Religious studies has one of the narrowest direct bachelor-level career paths if students expect ministry or academia to be the only options. Seminary and academic careers require significant additional education, and many employers will need you to clearly explain how your skills apply.',

  honest: 'This degree works best when paired with practical experience — internships, nonprofit work, counseling support, education, or program management. Ministry is not the only path. Nonprofit leadership, higher education, and community-based work are often stronger and more stable professional homes.',
},
};

const formatJobCount = (count) => {
  if (!count) return null;
  if (count >= 100000) return `${(count / 1000).toFixed(0)}k+`;
  if (count >= 10000) return `${(count / 1000).toFixed(0)}k+`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toLocaleString();
};

const MajorPage = ({ setCurrentPage }) => {
  const { majorSlug } = useParams();
  const navigate = useNavigate();
   const navigateTo = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };
  const [jobCounts, setJobCounts] = useState(null);
  const [jobsUpdated, setJobsUpdated] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const majorData = CAREER_PIVOTS[majorSlug];

useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  useEffect(() => {
    const fetchJobCounts = async () => {
      try {
        const response = await fetch('https://adzuna-jobs-updater.msroper2.workers.dev/data');
        const data = await response.json();
        if (data.counts) {
          setJobCounts(data.counts);
          setJobsUpdated(data.updated);
        }
      } catch (e) {
        // silently fail - job counts are optional
      } finally {
        setLoadingJobs(false);
      }
    };
    fetchJobCounts();
  }, []);

  if (!majorData) {
    return (
      <div className="bg-[#FFFBF7] min-h-screen">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Major not found</h1>
          <button onClick={() => navigate('/pivot')} className="text-teal-600 font-semibold">
            ← Browse all career paths
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>What Can I Do With a {majorData.title} Degree? | MoreThanOneWay.org</title>
        <meta name="description" content={`Real career paths for ${majorData.title} majors — with salary data, job growth rates, and live job counts. No grad school required for most.`} />
        <meta name="keywords" content={`${majorData.title} degree jobs, what to do with ${majorData.title} degree, ${majorData.title} major careers, ${majorData.title} degree career paths`} />
        <meta property="og:title" content={`What Can I Do With a ${majorData.title} Degree? | MoreThanOneWay.org`} />
        <link rel="canonical" href={`https://morethanoneway.org/major/${majorSlug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": `Career Paths for ${majorData.title} Majors`,
          "description": `Real career paths, salary data, and job counts for ${majorData.title} degree graduates.`,
          "url": `https://morethanoneway.org/major/${majorSlug}`
        })}</script>
      </Helmet>

      <div className="bg-[#FFFBF7] min-h-screen">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">

          <button onClick={() => setCurrentPage('pivot')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Career Paths
          </button>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
              What Can I Do With a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-orange-400">
                {majorData.title} Degree?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl leading-relaxed">
              {majorData.intro}
            </p>
          </div>

          {/* Job counts updated badge */}
          {jobsUpdated && (
            <div className="mb-6 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-sm text-green-800">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Job counts updated {jobsUpdated === new Date().toISOString().split('T')[0] ? 'today' : `on ${jobsUpdated}`}
            </div>
          )}

{/* Traditional Intern Search Block */}
<div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
  <h3 className="font-bold text-xl text-gray-900 mb-1">
    Search: {majorData.title.replace(' Degree', '')} Intern
  </h3>
  <p className="text-gray-600 text-sm mb-4">
    Run this search on major job boards:
  </p>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    <a href={`https://www.indeed.com/jobs?q=${encodeURIComponent(majorData.title.replace(' Degree', '') + ' intern')}&fromage=30`}
      target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-3 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-sm">
      Indeed <ExternalLink className="w-3 h-3" />
    </a>
    <a href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(majorData.title.replace(' Degree', '') + ' intern')}`}
      target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-3 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-sm">
      LinkedIn <ExternalLink className="w-3 h-3" />
    </a>
    <a href="https://app.joinhandshake.com/"
      target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-3 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-sm">
      Handshake <ExternalLink className="w-3 h-3" />
    </a>
    <a href={`https://www.ziprecruiter.com/jobs-search?q=${encodeURIComponent(majorData.title.replace(' Degree', '') + ' intern')}`}
      target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-3 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-sm">
      ZipRecruiter <ExternalLink className="w-3 h-3" />
    </a>
  </div>
  <p className="text-xs text-[#006581]/60 mt-3 flex items-center gap-1">
    <Info className="w-3 h-3" />
    Each button opens a pre-filtered search for this exact job title — not a general search.
  </p>
</div>
{majorData.quickReality && (
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">
      Quick Reality Check
    </h2>
    <p className="text-sm text-gray-600 mb-6">
      A faster way to understand the smartest paths for this major.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-green-50 border border-green-100 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-2">Best Paying Pivots</h3>
        <p className="text-sm text-gray-700">
          {majorData.quickReality.bestPayingPivots.join(' • ')}
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-2">Fastest Hiring Roles</h3>
        <p className="text-sm text-gray-700">
          {majorData.quickReality.fastestHiringRoles.join(' • ')}
        </p>
      </div>

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-2">Most Underrated Path</h3>
        <p className="text-sm text-gray-700">
          {majorData.quickReality.mostUnderratedPath}
        </p>
      </div>

      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-2">Grad School Required?</h3>
        <p className="text-sm text-gray-700">
          {majorData.quickReality.gradSchoolRequired}
        </p>
      </div>

      <div className="md:col-span-2 bg-gray-50 border border-gray-200 rounded-xl p-4">
        <h3 className="font-bold text-gray-900 mb-2">Best Internship Searches</h3>
        <div className="flex flex-wrap gap-2">
          {majorData.quickReality.strongestInternshipSearches.map((term) => (
            <span
              key={term}
              className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-gray-700"
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
)}

          {/* Career Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {majorData.careers.map((career, idx) => {
              const jobKey = CAREER_KEY_MAP[career.career];
              const jobCount = jobKey && jobCounts ? jobCounts[jobKey] : null;
              const formattedCount = formatJobCount(jobCount);

              return (
                <div key={idx} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight">{career.career}</h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 flex-shrink-0">
                      +{career.growth}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{career.why}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <DollarSign className="w-4 h-4 text-teal-600 flex-shrink-0" />
                      <span className="font-semibold">{career.salary}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>{career.growth} projected growth</span>
                    </div>

                    {formattedCount && (
                      <div className="flex items-start gap-2 text-sm">
                        <Briefcase className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-orange-700">{formattedCount} open jobs today</span>
                          <span className="text-gray-500 text-xs block">includes all experience levels • via Adzuna</span>
                        </div>
                      </div>
                    )}

                    {loadingJobs && !jobCounts && (
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Briefcase className="w-3 h-3" />
                        <span>Loading job counts...</span>
                      </div>
                    )}
                  </div>
                  {/* Per-career search buttons */}
<div className="mt-4 pt-4 border-t border-gray-100">
  <p className="text-xs text-gray-500 mb-2">Search "{career.career} intern":</p>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
    <a href={`https://www.indeed.com/jobs?q=${encodeURIComponent(career.career + ' intern')}&fromage=30`}
      target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-2 py-1.5 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-xs">
      Indeed <ExternalLink className="w-3 h-3" />
    </a>
    <a href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(career.career + ' intern')}`}
      target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-2 py-1.5 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-xs">
      LinkedIn <ExternalLink className="w-3 h-3" />
    </a>
    <a href="https://app.joinhandshake.com/"
      target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-2 py-1.5 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-xs">
      Handshake <ExternalLink className="w-3 h-3" />
    </a>
    <a href={`https://www.ziprecruiter.com/jobs-search?q=${encodeURIComponent(career.career + ' intern')}`}
      target="_blank" rel="noopener noreferrer"
      className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-2 py-1.5 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-xs">
      ZipRecruiter <ExternalLink className="w-3 h-3" />
    </a>
  </div>
</div>
                </div>
              );
            })}
          </div>

          {/* More Paths + Search Terms */}
{(majorData.morePaths || majorData.searchTerms) && (
  <div className="grid md:grid-cols-2 gap-6 mb-12">

    {majorData.morePaths && (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-xl text-gray-900 mb-2">
          More Paths You Can Pivot Into
        </h3>
        <p className="text-sm text-gray-600 mb-5">
          These may not be the first titles students search, but they often use similar skills.
        </p>

        <div className="space-y-5">
          {Object.entries(majorData.morePaths).map(([category, paths]) => (
            <div key={category}>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {paths.map((path) => (
                  <span
                    key={path}
                    className="bg-teal-50 text-teal-800 border border-teal-100 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {path}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {majorData.searchTerms && (
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h3 className="font-bold text-xl text-gray-900 mb-2">
          Search These Job Titles Too
        </h3>
        <p className="text-sm text-gray-600 mb-5">
          Employers use different titles. Try these on LinkedIn, Indeed, Handshake, and company career pages.
        </p>

        <div className="flex flex-wrap gap-2">
          {majorData.searchTerms.map((term) => (
            <span
              key={term}
              className="bg-orange-50 text-orange-800 border border-orange-100 px-3 py-1 rounded-full text-xs font-medium"
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    )}

  </div>
)}

          {/* Honest talk section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Common Struggles for {majorData.title} Majors</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{majorData.struggles}</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-3">Honest Reality Check</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{majorData.honest}</p>
            </div>
          </div>
{/* Small Companies Section */}
<div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
  <h3 className="font-bold text-xl text-gray-900 mb-1">Don't overlook smaller companies</h3>
  <p className="text-gray-600 text-sm mb-4">Startups and smaller teams can be less competitive — and they often give interns real work, not just shadowing.</p>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-teal-600"></div>
      </div>
      Fewer applicants
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-teal-600"></div>
      </div>
      More responsibility
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-teal-600"></div>
      </div>
      Direct access to senior people
    </div>
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <div className="w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-teal-600"></div>
      </div>
      Your work actually ships
    </div>
  </div>

  <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 mb-4">
    <p className="text-xs text-gray-500 mb-3">Where to look (good for small-company internships):</p>
    <div className="grid grid-cols-3 gap-3 mb-3">
      <a href="https://wellfound.com/jobs"
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-3 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-sm">
        Wellfound <ExternalLink className="w-3 h-3" />
      </a>
      <a href="https://builtin.com/jobs"
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-3 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-sm">
        Built In <ExternalLink className="w-3 h-3" />
      </a>
      <a href="https://www.ycombinator.com/jobs"
        target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 rounded-xl border border-[#006581]/25 bg-white px-3 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 transition-colors text-sm">
        YC Companies <ExternalLink className="w-3 h-3" />
      </a>
    </div>
    <p className="text-xs text-gray-400">Tip: add your city + "intern" (ex: "Boston startup intern") and check each company's careers page directly.</p>
  </div>

  <div className="flex items-start gap-2">
    <Info className="w-4 h-4 text-[#006581] flex-shrink-0 mt-0.5" />
    <p className="text-xs text-gray-500">Most summer internships post between September and February. Co-ops often post earlier. Set up job alerts so you don't miss the window.</p>
  </div>
</div>
          {/* Next Steps */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <h3 className="font-bold text-xl text-gray-900 mb-5">Your Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => navigateTo('/tracker')}
              className="flex items-center gap-3 bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-700 transition-all text-left">
              <Briefcase className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Application Tracker</p>
                <p className="text-xs text-gray-300">Track every application</p>
              </div>
            </button>
              <button onClick={() => navigateTo('/resume-builder')}
                className="flex items-center gap-3 bg-teal-600 text-white p-4 rounded-xl hover:bg-teal-700 transition-all text-left">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Build Your Resume</p>
                  <p className="text-xs text-teal-100">Free, ATS-friendly</p>
                </div>
              </button>
              <button onClick={() => navigateTo('/cover-letter')}
                className="flex items-center gap-3 bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 transition-all text-left">
                <BookOpen className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Cover Letter Generator</p>
                  <p className="text-xs text-purple-100">Free, no sign-up</p>
                </div>
              </button>
            </div>
          </div>

          {/* All majors link */}
          <div className="text-center">
            <button onClick={() => navigateTo('/pivot')}
              className="text-teal-600 font-semibold hover:text-teal-800 flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" /> Browse all majors
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default MajorPage;

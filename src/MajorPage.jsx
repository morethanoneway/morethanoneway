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
    careers: [
      { career: 'Lab Technician', growth: '5%', why: 'Your lab skills apply directly across pharma, food, and manufacturing', salary: '$45k-60k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA/EPA compliance — chemistry knowledge is essential', salary: '$65k-90k' },
      { career: 'Pharmaceutical Sales Rep', growth: '6%', why: 'Your chemistry background gives credibility with medical professionals', salary: '$55k-75k + commission' },
      { career: 'Quality Control Analyst', growth: '9%', why: 'Every pharma, food, and manufacturing company needs QC', salary: '$50k-70k' },
      { career: 'Environmental Scientist', growth: '6%', why: 'Apply chemistry to address pollution and sustainability challenges', salary: '$55k-80k' },
    ],
    struggles: 'Many chemistry grads feel pressure to go to graduate school. You do not have to. Regulatory affairs and pharma sales are strong paths that value your degree without requiring more school.',
    honest: 'Chemistry entry-level roles often start lower than other STEM fields but grow well with experience. Regulatory affairs is the highest-paying non-grad-school path for most chemistry majors.',
  },

'computer-information-systems': {
  title: 'Computer Information Systems',
  intro: 'Computer information systems is a practical, applied degree that prepares you to work with technology in business contexts. You are more immediately job-ready than CS grads in many business-facing roles.',

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

'communications': {
  title: 'Communications',
  intro: 'Communications teaches you to craft messages, understand audiences, and navigate media — skills every organization needs. The field has shifted heavily toward digital, analytics, and content strategy.',

  careers: [
    { career: 'Social Media Manager', growth: '10%', why: 'Your understanding of messaging and audience engagement applies directly', salary: '$50k-75k' },
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Every company needs internal and external communication strategy', salary: '$55k-80k' },
    { career: 'Content Marketing Manager', growth: '15%', why: 'Plan and create content that drives business results and brand growth', salary: '$55k-80k' },
    { career: 'Digital Marketing Specialist', growth: '17%', why: 'Data-driven marketing with strong growth and better earning potential', salary: '$50k-70k' },
    { career: 'Public Relations Specialist', growth: '8%', why: 'Manage company reputation, press relationships, and public messaging', salary: '$50k-70k' },
    { career: 'UX Writer', growth: '23%', why: 'Clear communication inside apps and products is a strong modern path for strong writers', salary: '$75k-100k' },
  ],

  morePaths: {
    'Content + Marketing': [
      'Content Marketing Manager',
      'Social Media Manager',
      'Digital Marketing Specialist',
      'SEO Specialist',
      'Brand Strategist'
    ],
    'Corporate + PR': [
      'Corporate Communications Specialist',
      'Public Relations Specialist',
      'Media Relations Coordinator',
      'Internal Communications Manager',
      'Crisis Communications Specialist'
    ],
    'Product + Writing': [
      'UX Writer',
      'Content Strategist',
      'Technical Writer',
      'Product Content Designer',
      'Documentation Specialist'
    ],
    'Analytics + Strategy': [
      'Marketing Analyst',
      'Audience Development Manager',
      'Communications Analyst',
      'Campaign Strategist',
      'Consumer Insights Analyst'
    ]
  },

  searchTerms: [
    'Communications Intern',
    'Marketing Intern',
    'Content Marketing Intern',
    'Social Media Intern',
    'PR Intern',
    'Corporate Communications Intern',
    'UX Writing Intern',
    'Digital Marketing Intern',
    'Brand Marketing Intern'
  ],

  struggles: 'Traditional PR and journalism have been heavily disrupted by digital media. Communications grads without digital skills like SEO, analytics, paid media, and content strategy are at a disadvantage.',

  honest: 'Starting salaries in communications can feel low for a degree, especially early on. Specializing in digital marketing, content strategy, analytics, or UX writing can significantly improve earning potential and long-term career stability.',
},
'data-science': {
  title: 'Data Science',
  intro: 'Data science is one of the fastest growing fields in the economy. Companies across every industry are trying to make sense of their data — and they need people who can do it.',

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
  intro: 'Architecture combines technical precision, creative design, and project management — skills that apply both to traditional architectural practice and to adjacent fields in design, construction, and tech.',

  careers: [
    { career: 'Architectural Designer', growth: '5%', why: 'Design buildings and spaces at architecture firms — core path, licensure matters long-term', salary: '$50k-70k' },
    { career: 'Interior Designer', growth: '4%', why: 'Design interior spaces for residential and commercial clients', salary: '$50k-75k' },
    { career: 'Construction Project Manager', growth: '8%', why: 'Your technical knowledge makes you a strong construction PM', salary: '$70k-100k' },
    { career: 'BIM Specialist', growth: '10%', why: 'Building Information Modeling is transforming architecture and construction workflows', salary: '$60k-85k' },
    { career: 'UX/Product Designer', growth: '16%', why: 'Design thinking and spatial reasoning transfer surprisingly well to digital product design', salary: '$70k-100k' },
    { career: 'Facilities Planner', growth: '7%', why: 'Corporate campuses, hospitals, and universities need people who understand how spaces function', salary: '$60k-85k' },
  ],

  morePaths: {
    'Design + Architecture': [
      'Architectural Designer',
      'Interior Designer',
      'Urban Designer',
      'Landscape Designer',
      'Exhibit Designer'
    ],
    'Construction + Project Work': [
      'Construction Project Manager',
      'Project Engineer',
      'Estimator',
      'Field Coordinator',
      'Owner’s Rep'
    ],
    'Digital + Technical': [
      'BIM Specialist',
      'CAD Manager',
      'Facilities Planner',
      'Building Systems Coordinator',
      'Visualization Specialist'
    ],
    'Design Pivots': [
      'UX/Product Designer',
      'Brand Designer',
      'Experience Designer',
      'Retail Space Planner',
      'Product Designer'
    ]
  },

  searchTerms: [
    'Architecture Intern',
    'Architectural Design Intern',
    'BIM Intern',
    'Construction Management Intern',
    'Interior Design Intern',
    'Project Engineer Intern',
    'Facilities Planning Intern',
    'UX Design Intern',
    'Urban Design Intern'
  ],

  struggles: 'Architecture starting salaries are lower than many other professional degrees despite the length and intensity of the program. Licensure takes years after graduation, and many architects earn less than engineers with similar education.',

  honest: 'Architecture requires real passion because the early-career pay often does not match the workload. Students who pivot into construction management, BIM, facilities planning, or UX design often earn more faster. Licensure significantly improves long-term earning potential.',
},

'communication-sciences': {
  title: 'Communication Sciences / Speech Pathology',
  intro: 'Communication sciences and disorders prepares you to assess and support speech, language, and hearing development. It is a meaningful and growing field, but students need to understand the education path clearly.',

  careers: [
    { career: 'Speech-Language Pathologist', growth: '19%', why: 'Treat communication disorders in schools, hospitals, and private practice — requires a master’s degree', salary: '$70k-95k' },
    { career: 'Audiologist', growth: '11%', why: 'Assess and treat hearing disorders — requires a doctoral degree (AuD)', salary: '$75k-100k' },
    { career: 'Early Intervention Specialist', growth: '12%', why: 'Work with young children with developmental delays — some roles accessible with a bachelor’s degree', salary: '$45k-65k' },
    { career: 'Rehabilitation Specialist', growth: '10%', why: 'Help patients regain communication abilities after injury or illness', salary: '$50k-70k' },
    { career: 'Clinical Research Coordinator', growth: '14%', why: 'Support communication disorders research without requiring a clinical license', salary: '$50k-70k' },
    { career: 'Behavioral Therapist', growth: '13%', why: 'Strong path in developmental support and therapy settings, especially with children', salary: '$45k-65k' },
  ],

  morePaths: {
    'Clinical + Therapy': [
      'Speech-Language Pathologist',
      'Audiologist',
      'Behavioral Therapist',
      'Rehabilitation Specialist',
      'Occupational Therapy Assistant'
    ],
    'Education + Early Support': [
      'Early Intervention Specialist',
      'School Support Specialist',
      'Special Education Assistant',
      'Child Development Specialist',
      'Educational Therapist'
    ],
    'Healthcare + Research': [
      'Clinical Research Coordinator',
      'Patient Care Coordinator',
      'Healthcare Administrator',
      'Clinical Trial Assistant',
      'Medical Office Manager'
    ],
    'Alternative People-Focused Paths': [
      'HR Specialist',
      'Customer Success Manager',
      'Patient Advocate',
      'Program Coordinator',
      'Community Outreach Coordinator'
    ]
  },

  searchTerms: [
    'Speech Pathology Intern',
    'Clinical Research Intern',
    'Early Intervention Intern',
    'Behavioral Therapy Intern',
    'Rehabilitation Intern',
    'Healthcare Intern',
    'Patient Care Intern',
    'School Support Intern',
    'Child Development Intern'
  ],

  struggles: 'You cannot practice as a speech-language pathologist with only a bachelor’s degree. This is one of the biggest things students misunderstand — graduate school is required.',

  honest: 'SLP is a strong, stable, and meaningful career with good job security, but graduate school is not optional. Plan financially and academically for that reality early. The bachelor’s degree alone does not qualify you for most clinical positions.',
},
'criminal-justice': {
  title: 'Criminal Justice',
  intro: 'Criminal justice teaches you how legal systems, enforcement, investigations, and compliance work. Those skills transfer well beyond policing into corporate compliance, security, investigations, and risk management.',

  careers: [
    { career: 'Compliance Officer', growth: '8%', why: 'Ensure companies follow laws and regulations — underrated and often better paid than expected', salary: '$60k-85k' },
    { career: 'Corporate Security Analyst', growth: '9%', why: 'Risk assessment, investigations, and security planning for organizations', salary: '$55k-80k' },
    { career: 'Probation/Parole Officer', growth: '4%', why: 'Government role supervising offenders in the community with steady demand', salary: '$50k-70k' },
    { career: 'Loss Prevention Manager', growth: '6%', why: 'Retail and corporate asset protection, investigations, and fraud prevention', salary: '$50k-75k' },
    { career: 'Emergency Management Specialist', growth: '6%', why: 'Disaster planning, crisis response, and operational coordination', salary: '$55k-80k' },
    { career: 'Fraud Analyst', growth: '12%', why: 'Banks, insurance, and fintech companies need investigators who understand risk and behavior', salary: '$60k-85k' },
  ],

  morePaths: {
    'Compliance + Corporate': [
      'Compliance Officer',
      'Fraud Analyst',
      'Risk Analyst',
      'Corporate Security Analyst',
      'Internal Investigator'
    ],
    'Government + Public Service': [
      'Probation Officer',
      'Parole Officer',
      'Emergency Management Specialist',
      'Court Services Coordinator',
      'Victim Advocate'
    ],
    'Security + Investigations': [
      'Loss Prevention Manager',
      'Security Operations Analyst',
      'Private Investigator',
      'Background Investigator',
      'Asset Protection Manager'
    ],
    'Law + Policy Paths': [
      'Legal Assistant',
      'Policy Analyst',
      'Government Relations Assistant',
      'Public Affairs Coordinator',
      'Law School Track'
    ]
  },

  searchTerms: [
    'Criminal Justice Intern',
    'Compliance Intern',
    'Fraud Analyst Intern',
    'Security Intern',
    'Emergency Management Intern',
    'Government Intern',
    'Legal Assistant Intern',
    'Investigations Intern',
    'Policy Intern'
  ],

  struggles: 'Many criminal justice grads default to law enforcement without realizing those roles require physical testing, background checks, shift work, and can be difficult to break into. Corporate paths are often overlooked.',

  honest: 'Law enforcement is only one path. Corporate compliance, fraud analysis, investigations, and security often offer better starting pay and less physical risk. Law school is also a strong path if you want to significantly expand long-term options.',
},
'education': {
  title: 'Education',
  intro: 'Education majors develop the ability to teach, facilitate learning, communicate complex ideas, and understand how people develop — skills valued far beyond K-12 classrooms.',

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
  intro: 'Kinesiology is the study of human movement — giving you a foundation in exercise science, anatomy, and biomechanics that applies to healthcare, fitness, sports, rehabilitation, and wellness industries.',

  careers: [
    { career: 'Physical Therapist Assistant', growth: '24%', why: 'Support physical therapists in patient rehabilitation — strong growth and accessible path', salary: '$50k-65k' },
    { career: 'Occupational Therapist Assistant', growth: '24%', why: 'Help patients regain functional abilities and independence', salary: '$55k-70k' },
    { career: 'Athletic Trainer', growth: '14%', why: 'Prevent and treat sports injuries in schools, clinics, and athletics', salary: '$50k-65k' },
    { career: 'Corporate Wellness Coordinator', growth: '12%', why: 'Companies increasingly invest in employee health and wellness programs', salary: '$50k-70k' },
    { career: 'Personal Trainer / Fitness Coach', growth: '14%', why: 'Direct use of your movement and exercise knowledge — flexible but income varies', salary: '$40k-65k' },
    { career: 'Exercise Physiologist', growth: '10%', why: 'Use exercise science in clinical and rehab settings to improve patient outcomes', salary: '$50k-70k' },
  ],

  morePaths: {
    'Rehab + Clinical': [
      'Physical Therapist Assistant',
      'Occupational Therapist Assistant',
      'Exercise Physiologist',
      'Rehabilitation Specialist',
      'Patient Care Coordinator'
    ],
    'Sports + Performance': [
      'Athletic Trainer',
      'Strength and Conditioning Coach',
      'Sports Performance Coach',
      'Recreation Coordinator',
      'Sports Medicine Assistant'
    ],
    'Fitness + Wellness': [
      'Personal Trainer',
      'Corporate Wellness Coordinator',
      'Health Coach',
      'Wellness Program Manager',
      'Fitness Director'
    ],
    'Alternative Healthcare Paths': [
      'Physical Therapy Track',
      'Occupational Therapy Track',
      'Physician Assistant Track',
      'Healthcare Administration',
      'Clinical Research Coordinator'
    ]
  },

  searchTerms: [
    'Kinesiology Intern',
    'Athletic Training Intern',
    'Physical Therapy Intern',
    'Exercise Physiology Intern',
    'Corporate Wellness Intern',
    'Fitness Intern',
    'Sports Performance Intern',
    'Rehabilitation Intern',
    'Healthcare Intern'
  ],

  struggles: 'Kinesiology has a difficult direct career path at the bachelor’s level. Most high-paying clinical roles like PT and OT require graduate school, and many graduates end up in lower-paying fitness roles than they expected.',

  honest: 'If your goal is physical therapy, occupational therapy, or physician assistant work, plan for graduate school early — it is required. With only a bachelor’s degree, athletic training, wellness, and rehab-adjacent roles are usually the strongest paths. Personal training often pays less than students expect.',
},

'nutrition-dietetics': {
  title: 'Nutrition / Dietetics',
  intro: 'Nutrition and dietetics prepares you to help people improve health through food, lifestyle, and clinical care. It is meaningful work, but licensing requirements shape the entire career path.',

  careers: [
    { career: 'Registered Dietitian (RD)', growth: '11%', why: 'Core credential for clinical nutrition and counseling — requires internship and exam', salary: '$60k-80k' },
    { career: 'Nutrition Educator', growth: '7%', why: 'Teach nutrition in schools, wellness programs, and community health settings', salary: '$45k-65k' },
    { career: 'Food Service Manager', growth: '5%', why: 'Manage food operations in hospitals, schools, and institutional settings', salary: '$50k-70k' },
    { career: 'Health Coach', growth: '12%', why: 'Guide clients through nutrition and lifestyle changes — certification helps significantly', salary: '$40k-65k' },
    { career: 'Food Industry Specialist', growth: '6%', why: 'Work in product development, quality, and food compliance roles', salary: '$55k-75k' },
    { career: 'Wellness Program Coordinator', growth: '10%', why: 'Corporate and healthcare organizations need professionals focused on preventive health', salary: '$50k-70k' },
  ],

  morePaths: {
    'Clinical + Dietetics': [
      'Registered Dietitian',
      'Clinical Nutrition Specialist',
      'Patient Nutrition Coordinator',
      'Renal Dietitian',
      'Sports Nutrition Track'
    ],
    'Community + Wellness': [
      'Nutrition Educator',
      'Health Coach',
      'Wellness Program Coordinator',
      'Community Health Worker',
      'Corporate Wellness Specialist'
    ],
    'Food + Industry': [
      'Food Service Manager',
      'Food Industry Specialist',
      'Quality Assurance Specialist',
      'Regulatory Affairs Associate',
      'Product Development Assistant'
    ],
    'Alternative Health Paths': [
      'Healthcare Administration',
      'Public Health Analyst',
      'Clinical Research Coordinator',
      'Health Communications Specialist',
      'Medical Sales Representative'
    ]
  },

  searchTerms: [
    'Nutrition Intern',
    'Dietetic Intern',
    'Clinical Nutrition Intern',
    'Wellness Intern',
    'Food Science Intern',
    'Health Coach Intern',
    'Community Health Intern',
    'Healthcare Intern',
    'Food Service Intern'
  ],

  struggles: 'Becoming a Registered Dietitian requires completing an accredited internship and passing the RD exam. Without the RD credential, career options become much more limited and usually lower paying.',

  honest: 'The RD credential is basically required for clinical dietitian work. Plan for the internship early because it is competitive. Without RD, food industry, wellness, and health coaching are the strongest alternatives, but pay is usually lower.',
},

'social-work': {
  title: 'Social Work',
  intro: 'Social work is one of the most meaningful degrees — you help people navigate crisis, access resources, and build more stable lives. The demand is strong and the work matters deeply.',

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
  intro: 'Global companies need people who can navigate different cultures and languages — and there are far more opportunities than most students realize beyond teaching or translation.',

  careers: [
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Multilingual communication skills are increasingly valuable in global companies', salary: '$55k-80k' },
    { career: 'Content Marketing Specialist', growth: '15%', why: 'Companies need content adapted for international audiences and markets', salary: '$50k-70k' },
    { career: 'HR Specialist', growth: '10%', why: 'Multilingual HR professionals help support global teams and recruiting', salary: '$50k-70k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Serving international clients requires communication, empathy, and language skills', salary: '$55k-80k' },
    { career: 'International Sales Coordinator', growth: '12%', why: 'Global sales teams value people who can build trust across languages and cultures', salary: '$55k-80k' },
    { career: 'Localization Specialist', growth: '14%', why: 'Help companies adapt products, websites, and content for international markets', salary: '$60k-85k' },
  ],

  morePaths: {
    'Business + Global Work': [
      'International Sales Coordinator',
      'Customer Success Manager',
      'Account Manager',
      'Global Operations Specialist',
      'Procurement Coordinator'
    ],
    'Marketing + Communications': [
      'Corporate Communications Specialist',
      'Content Marketing Specialist',
      'Localization Specialist',
      'Brand Marketing Coordinator',
      'Public Relations Specialist'
    ],
    'People + Support': [
      'HR Specialist',
      'Recruiting Coordinator',
      'Community Outreach Coordinator',
      'Program Coordinator',
      'Employee Experience Specialist'
    ],
    'Traditional + Language-Focused': [
      'Translator',
      'Interpreter',
      'Language Instructor',
      'Study Abroad Advisor',
      'International Admissions Counselor'
    ]
  },

  searchTerms: [
    'International Business Intern',
    'Communications Intern',
    'Content Marketing Intern',
    'Customer Success Intern',
    'HR Intern',
    'Localization Intern',
    'Global Operations Intern',
    'Study Abroad Office Intern',
    'International Sales Intern'
  ],

  struggles: 'Foreign language majors often feel limited to teaching or translation. In reality, the strongest opportunities are usually in business roles where language is one advantage, not the entire job.',

  honest: 'Language skills alone rarely create high salaries. The strongest path is combining language ability with something else — business, tech, marketing, healthcare, or operations. Bilingual talent becomes much more valuable when paired with practical skills employers already need.',
},
'history': {
  title: 'History',
  intro: 'History trains you to analyze complex information, build strong arguments, understand systems over time, and write clearly — skills that are far more transferable than the degree’s reputation suggests.',

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
  intro: 'Business administration is the broadest business degree — and that is both its strength and its challenge. You can work in almost any industry, but you need a clear specialization to stand out.',

  careers: [
    { career: 'Operations Analyst', growth: '16%', why: 'Help businesses run more efficiently — broad business knowledge is a real advantage here', salary: '$55k-80k' },
    { career: 'Business Analyst', growth: '14%', why: 'Bridge business needs and technical solutions across teams and departments', salary: '$60k-85k' },
    { career: 'Sales Development Representative', growth: '15%', why: 'Most accessible high-earning entry point — often the fastest path to strong income growth', salary: '$45k-65k + commission' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Relationship-focused role helping clients succeed and stay with the company', salary: '$55k-80k' },
    { career: 'Project Manager', growth: '9%', why: 'Coordinate teams, timelines, and execution across business functions', salary: '$65k-95k' },
    { career: 'Human Resources Specialist', growth: '10%', why: 'Your broad understanding of how businesses operate applies well to HR', salary: '$50k-70k' },
  ],

  morePaths: {
    'Operations + Strategy': [
      'Operations Analyst',
      'Business Analyst',
      'Project Manager',
      'Program Coordinator',
      'Process Improvement Specialist'
    ],
    'Sales + Client-Facing': [
      'Sales Development Representative',
      'Account Executive',
      'Customer Success Manager',
      'Account Manager',
      'Partnerships Coordinator'
    ],
    'People + Internal Roles': [
      'Human Resources Specialist',
      'Recruiter',
      'Training Coordinator',
      'Employee Experience Specialist',
      'Office Operations Manager'
    ],
    'Growth + Business Pivots': [
      'Marketing Coordinator',
      'Procurement Analyst',
      'Supply Chain Analyst',
      'Financial Analyst',
      'Consulting Track'
    ]
  },

  searchTerms: [
    'Business Intern',
    'Business Analyst Intern',
    'Operations Intern',
    'Sales Intern',
    'Customer Success Intern',
    'Project Management Intern',
    'HR Intern',
    'Account Management Intern',
    'Operations Analyst Intern'
  ],

  struggles: 'Business administration is one of the most common degrees, which means heavy competition. Employers often prefer candidates with a more specific concentration like finance, marketing, supply chain, or MIS over general business.',

  honest: 'General business admin graduates need to work harder to differentiate themselves. Pick a lane early, get internships, and add something concrete like Excel, Salesforce, SQL, project management, or a certification. The degree opens doors, but specificity gets you hired.',
},
'economics': {
  title: 'Economics',
  intro: 'Economics teaches you to think analytically about how the world works — incentives, markets, trade-offs, and decision-making. Those skills transfer extremely well into finance, consulting, policy, and data-driven business roles.',

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
'hospitality-management': {
  title: 'Hospitality Management',
  intro: 'Hospitality management teaches operations, customer service, and people management at a level most business degrees never touch. Those skills transfer far beyond hotels and restaurants.',

  careers: [
    { career: 'Hotel / Resort Manager', growth: '8%', why: 'Direct path — manage operations at hotels, resorts, and hospitality venues', salary: '$50k-80k' },
    { career: 'Event Manager', growth: '18%', why: 'Plan and execute corporate events, conferences, and large experiences', salary: '$45k-70k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Your service mindset translates extremely well to SaaS and tech companies', salary: '$55k-80k' },
    { career: 'Operations Manager', growth: '10%', why: 'Run day-to-day operations across many industries using hospitality operations skills', salary: '$55k-80k' },
    { career: 'Sales Manager', growth: '5%', why: 'Relationship-driven selling is a natural fit for hospitality graduates', salary: '$60k-90k' },
    { career: 'Venue Manager', growth: '9%', why: 'Sports venues, event spaces, and entertainment locations need strong operators', salary: '$50k-75k' },
  ],

  morePaths: {
    'Hospitality + Events': [
      'Hotel Manager',
      'Event Manager',
      'Venue Manager',
      'Conference Coordinator',
      'Guest Experience Manager'
    ],
    'Operations + Leadership': [
      'Operations Manager',
      'Program Coordinator',
      'Facilities Manager',
      'Business Operations Associate',
      'Regional Manager'
    ],
    'Client + Service Roles': [
      'Customer Success Manager',
      'Account Manager',
      'Sales Manager',
      'Client Relations Manager',
      'Partnerships Coordinator'
    ],
    'Strong Pivots': [
      'Corporate Event Manager',
      'Recruiter',
      'HR Coordinator',
      'Training Manager',
      'Real Estate Operations'
    ]
  },

  searchTerms: [
    'Hospitality Intern',
    'Hotel Management Intern',
    'Event Planning Intern',
    'Customer Success Intern',
    'Operations Intern',
    'Venue Management Intern',
    'Sales Intern',
    'Guest Services Intern',
    'Corporate Events Intern'
  ],

  struggles: 'Hospitality was hit hard by COVID and recovery has been uneven. Starting salaries are often lower than other business degrees, and nights, weekends, and holiday work are common — students underestimate that lifestyle impact.',

  honest: 'Hospitality skills are genuinely transferable, but you may need to explain that to employers outside the industry. Customer success, operations, and corporate events are some of the strongest pivots because your service mindset becomes a major advantage there.',
},
'information-systems': {
  title: 'Information Systems',
  intro: 'Information systems sits at the intersection of business and technology — you understand both sides, which makes you valuable in roles that require translating between technical teams and business stakeholders.',

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
  intro: 'International business prepares you to work across borders — global markets, trade, cross-cultural communication, and international operations. The strongest opportunities come when you combine business skills with language ability and real global experience.',

  careers: [
    { career: 'International Trade Specialist', growth: '6%', why: 'Help companies navigate import/export regulations, compliance, and global shipping', salary: '$55k-80k' },
    { career: 'Global Supply Chain Analyst', growth: '18%', why: 'Manage supply chains across countries — one of the strongest practical paths for this degree', salary: '$60k-85k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Research international markets and customer behavior for expansion decisions', salary: '$55k-75k' },
    { career: 'Business Development Manager', growth: '12%', why: 'Help companies grow into new markets — strong fit for relationship-driven people', salary: '$65k-95k' },
    { career: 'Foreign Service Officer', growth: '5%', why: 'Represent the U.S. government abroad — competitive but meaningful public service path', salary: '$60k-90k' },
    { career: 'Procurement Specialist', growth: '10%', why: 'Global sourcing and vendor relationships make this a strong underrated path', salary: '$60k-85k' },
  ],

  morePaths: {
    'Global Operations': [
      'Global Supply Chain Analyst',
      'Procurement Specialist',
      'Operations Coordinator',
      'Import Export Specialist',
      'Logistics Manager'
    ],
    'Growth + Markets': [
      'Business Development Manager',
      'Market Research Analyst',
      'International Sales Representative',
      'Partnerships Coordinator',
      'Account Manager'
    ],
    'Government + Policy': [
      'Foreign Service Officer',
      'Trade Compliance Analyst',
      'Government Relations Associate',
      'Policy Analyst',
      'Economic Development Coordinator'
    ],
    'Strong Add-On Paths': [
      'Customer Success Manager',
      'Corporate Communications Specialist',
      'HR Specialist',
      'Localization Specialist',
      'Consulting Track'
    ]
  },

  searchTerms: [
    'International Business Intern',
    'Supply Chain Intern',
    'Trade Compliance Intern',
    'Global Operations Intern',
    'Procurement Intern',
    'Business Development Intern',
    'Market Research Intern',
    'International Sales Intern',
    'Government Affairs Intern'
  ],

  struggles: 'International business is broad and can feel vague. Employers often are not sure what to do with the degree unless you have specific language skills, regional expertise, study abroad experience, or strong internships.',

  honest: 'International business works best when paired with something concrete — language fluency, supply chain experience, analytics, or operations. Without that, it can feel like general business with better branding. The strongest students make the degree specific.',
},
'management': {
  title: 'Management',
  intro: 'Management focuses on leading people, organizing resources, and driving results — skills every organization needs. The catch is that most people do not get hired directly into management; they grow into it.',

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
  intro: 'Music training develops discipline, precision, collaboration, creative problem-solving, and the ability to perform under pressure — skills that transfer into surprising professional contexts.',

  careers: [
    { career: 'Corporate Trainer', growth: '11%', why: 'Teaching and performing skills make you strong at presenting and facilitating', salary: '$55k-80k' },
    { career: 'Instructional Designer', growth: '9%', why: 'Creating engaging learning experiences draws on your teaching and performance instincts', salary: '$60k-90k' },
    { career: 'Audio/Video Producer', growth: '12%', why: 'Every company needs multimedia content — your technical audio and production skills apply', salary: '$50k-75k' },
    { career: 'Music Therapist', growth: '9%', why: 'Clinical work using musical training — requires board certification', salary: '$45k-65k' },
    { career: 'Events Manager', growth: '18%', why: 'Production and performance management experience transfers well to corporate events', salary: '$50k-70k' },
    { career: 'Content Creator', growth: '10%', why: 'Music, audio, and storytelling skills can support brands, media, and digital platforms', salary: '$45k-70k' },
  ],

  morePaths: {
    'Teaching + Training': [
      'Music Teacher',
      'Corporate Trainer',
      'Instructional Designer',
      'Private Lesson Instructor',
      'Learning & Development Specialist'
    ],
    'Production + Media': [
      'Audio Producer',
      'Video Producer',
      'Podcast Producer',
      'Sound Designer',
      'Content Creator'
    ],
    'Events + Arts Admin': [
      'Events Manager',
      'Arts Administrator',
      'Program Coordinator',
      'Venue Coordinator',
      'Talent Coordinator'
    ],
    'Clinical + Community': [
      'Music Therapist',
      'Recreation Therapist',
      'Community Outreach Coordinator',
      'Youth Program Director',
      'Nonprofit Program Manager'
    ]
  },

  searchTerms: [
    'Music Intern',
    'Audio Production Intern',
    'Video Production Intern',
    'Events Intern',
    'Arts Administration Intern',
    'Instructional Design Intern',
    'Corporate Training Intern',
    'Podcast Intern',
    'Music Therapy Intern'
  ],

  struggles: 'Performance careers are genuinely competitive. Most musicians supplement with teaching, session work, production, or other income throughout their careers. Financial instability is real.',

  honest: 'If performance is your passion, pursue it — but build parallel skills. Music therapy requires additional certification. Corporate training, instructional design, events, and media production can provide stable income while still using your music background.',
},
'philosophy': {
  title: 'Philosophy',
  intro: 'Philosophy trains you to think clearly, argue rigorously, identify weak logic, and understand complex ethical systems — skills that are far more practical in business, law, and tech than most people realize.',

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
  intro: 'Strong writing and analytical thinking are genuinely rare. In a world flooded with content, the ability to write with clarity, structure, and precision is valuable — especially in tech, where many people cannot explain things well.',

  careers: [
    { career: 'UX Writer', growth: '23%', why: 'Write the words inside digital products — storytelling applied to technology', salary: '$75k-100k' },
    { career: 'Content Strategist', growth: '15%', why: 'Plan and manage content across organizations — your editorial judgment is central', salary: '$65k-90k' },
    { career: 'Technical Writer', growth: '7%', why: 'Explain complex things simply — your core skill applied to technical documentation', salary: '$60k-80k' },
    { career: 'Grant Writer', growth: '8%', why: 'Write compelling funding proposals — research and persuasion are your strengths', salary: '$50k-70k' },
    { career: 'Copywriter', growth: '8%', why: 'Write marketing and advertising copy — English grads often excel here', salary: '$50k-75k' },
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Companies need clear writers for internal messaging, leadership communication, and brand voice', salary: '$55k-80k' },
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
    'English Intern',
    'UX Writing Intern',
    'Content Strategy Intern',
    'Technical Writing Intern',
    'Copywriting Intern',
    'Grant Writing Intern',
    'Communications Intern',
    'Editorial Intern',
    'Content Marketing Intern'
  ],

  struggles: 'Traditional publishing and journalism careers have contracted significantly. English grads who only look for “English jobs” often run into low pay and limited openings. The pivot to digital, tech, nonprofit, and business writing opens much stronger options.',

  honest: 'UX writing, content strategy, and technical writing often pay far more than traditional editorial roles. If you are an English major, learning Figma basics, SEO, content strategy, and documentation tools can make your degree much more marketable.',
},
'film-media-studies': {
  title: 'Film / Media Studies',
  intro: 'Film and media studies teaches you to understand how stories are told, how audiences respond, and how media shapes culture. These analytical and creative skills apply in surprising ways.',

  careers: [
    { career: 'Content Marketing Manager', growth: '15%', why: 'Every brand needs compelling video and media content — your production skills apply', salary: '$55k-80k' },
    { career: 'Social Media Manager', growth: '10%', why: 'Your understanding of visual storytelling and audience engagement is directly applicable', salary: '$50k-75k' },
    { career: 'UX Researcher', growth: '18%', why: 'Your media analysis skills translate to understanding how people interact with products', salary: '$70k-95k' },
    { career: 'Video Producer', growth: '12%', why: 'Every company needs video content — corporate video is a growing field', salary: '$50k-75k' },
    { career: 'Communications Specialist', growth: '8%', why: 'Your storytelling and media literacy make you an effective communicator', salary: '$50k-70k' },
    { career: 'Public Relations Specialist', growth: '8%', why: 'Understanding audiences and messaging makes PR a strong fit', salary: '$50k-70k' },
  ],

  morePaths: {
    'Content + Marketing': [
      'Content Marketing Specialist',
      'Brand Strategist',
      'Social Media Manager',
      'Digital Marketing Specialist',
      'Campaign Coordinator'
    ],
    'Production + Creative': [
      'Video Producer',
      'Video Editor',
      'Creative Producer',
      'Podcast Producer',
      'Content Creator'
    ],
    'Research + Product': [
      'UX Researcher',
      'Consumer Insights Analyst',
      'Market Research Analyst',
      'Audience Development Specialist',
      'User Research Coordinator'
    ],
    'Communications + PR': [
      'Communications Specialist',
      'Public Relations Specialist',
      'Corporate Communications',
      'Media Relations Coordinator',
      'Internal Communications Specialist'
    ]
  },

  searchTerms: [
    'Media Intern',
    'Content Marketing Intern',
    'Social Media Intern',
    'Video Production Intern',
    'UX Research Intern',
    'Communications Intern',
    'PR Intern',
    'Marketing Intern',
    'Creative Producer Intern'
  ],

  struggles: 'Traditional film and TV industry jobs are extremely competitive, geographically concentrated (LA, NYC), and increasingly disrupted by streaming. The industry has contracted significantly with Hollywood strikes and streaming cutbacks.',

  honest: 'Film industry careers are genuinely difficult to break into and sustain. Corporate video production, content marketing, communications, and social media often offer more stable and accessible paths using the same storytelling skills. Many film grads build hybrid careers instead of one traditional film path.',
},
'fine-arts': {
  title: 'Fine Arts / Studio Art',
  intro: 'Fine arts develops your visual thinking, creative problem-solving, and ability to communicate through imagery — skills that are surprisingly in demand in the digital economy.',

  careers: [
    { career: 'UX/UI Designer', growth: '16%', why: 'Your visual training and design sensibility directly apply to digital product design', salary: '$70k-100k' },
    { career: 'Graphic Designer', growth: '3%', why: 'Apply visual skills to commercial design — corporate design often pays better than freelance', salary: '$50k-70k' },
    { career: 'Art Director', growth: '6%', why: 'Lead creative teams and visual strategy — requires experience but strong pay', salary: '$75k-110k' },
    { career: 'Social Media Content Creator', growth: '10%', why: 'Visual content creation is your strength — brands pay well for strong creative', salary: '$45k-70k' },
    { career: 'Exhibit/Experience Designer', growth: '8%', why: 'Design physical and digital experiences for museums, brands, and events', salary: '$50k-75k' },
    { career: 'Brand Designer', growth: '12%', why: 'Companies need strong visual identity across web, print, and campaigns', salary: '$60k-85k' },
  ],

  morePaths: {
    'Design + Digital': [
      'UX/UI Designer',
      'Brand Designer',
      'Visual Designer',
      'Product Designer',
      'Motion Graphics Designer'
    ],
    'Creative + Marketing': [
      'Graphic Designer',
      'Content Creator',
      'Social Media Designer',
      'Creative Strategist',
      'Marketing Designer'
    ],
    'Experiential + Physical': [
      'Exhibit Designer',
      'Experience Designer',
      'Retail Display Designer',
      'Event Designer',
      'Museum Coordinator'
    ],
    'Leadership + Direction': [
      'Art Director',
      'Creative Director',
      'Design Manager',
      'Studio Manager',
      'Creative Producer'
    ]
  },

  searchTerms: [
    'Graphic Design Intern',
    'UX Design Intern',
    'Visual Design Intern',
    'Creative Intern',
    'Brand Design Intern',
    'Content Creation Intern',
    'Exhibit Design Intern',
    'Marketing Design Intern',
    'Product Design Intern'
  ],

  struggles: 'Fine arts has one of the most challenging direct career paths of any degree. The starving artist stereotype exists for a reason — pure studio art careers are difficult to sustain financially.',

  honest: 'The fine arts grads who do best financially usually make a deliberate pivot to applied design — UX, branding, product design, and art direction. Learning Figma, Adobe Suite, portfolio presentation, and basic web design dramatically improves your options. Your aesthetic sense is genuinely valuable.',
},
'gender-womens-studies': {
  title: "Gender / Women's Studies",
  intro: "Gender and women's studies develops your ability to analyze systems, understand power dynamics, and advocate for equity — skills that are increasingly valuable in HR, nonprofit work, policy, advocacy, and organizational leadership.",

  careers: [
    { career: 'Diversity, Equity & Inclusion Specialist', growth: '15%', why: 'Your analytical framework for understanding equity and systems is directly applicable', salary: '$60k-90k' },
    { career: 'Nonprofit Program Manager', growth: '9%', why: 'Run advocacy, education, and social service programs aligned with your values', salary: '$50k-75k' },
    { career: 'Human Resources Specialist', growth: '10%', why: 'Your understanding of workplace equity, policy, and people systems fits HR well', salary: '$50k-70k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Analyze policy issues and advocate for change in government and nonprofit settings', salary: '$55k-80k' },
    { career: 'Community Outreach Coordinator', growth: '8%', why: 'Lead programs, partnerships, and advocacy work within communities', salary: '$45k-65k' },
    { career: 'Grant Writer', growth: '8%', why: 'Mission-driven organizations need strong writers who can secure funding and tell compelling stories', salary: '$50k-70k' },
  ],

  morePaths: {
    'People + HR': [
      'HR Specialist',
      'Talent Development Coordinator',
      'Employee Relations Specialist',
      'Recruiting Coordinator',
      'Learning & Development Specialist'
    ],
    'Policy + Advocacy': [
      'Policy Analyst',
      'Government Relations Specialist',
      'Legislative Assistant',
      'Advocacy Coordinator',
      'Public Affairs Associate'
    ],
    'Nonprofit + Community': [
      'Nonprofit Program Manager',
      'Community Outreach Coordinator',
      'Program Coordinator',
      'Volunteer Manager',
      'Development Associate'
    ],
    'Writing + Strategy': [
      'Grant Writer',
      'Communications Specialist',
      'Corporate Social Responsibility Coordinator',
      'Content Strategist',
      'Program Evaluation Analyst'
    ]
  },

  searchTerms: [
    'Human Resources Intern',
    'Policy Intern',
    'Nonprofit Intern',
    'Community Outreach Intern',
    'Program Coordinator Intern',
    'Grant Writing Intern',
    'DEI Intern',
    'Advocacy Intern',
    'Government Relations Intern'
  ],

  struggles: 'Gender studies is not well understood by many employers and requires strong translation work. DEI roles, while important, have also faced political backlash and hiring shifts in some corporate environments.',

  honest: 'This degree works best when combined with practical skills like data analysis, project management, grant writing, and program operations. The strongest careers usually come from showing measurable impact, not just good intentions. Graduate school is common for higher-level leadership roles.',
},
'journalism': {
  title: 'Journalism',
  intro: 'Journalism trains you to find truth, communicate clearly, work under pressure, and make complex ideas understandable. These skills are genuinely valuable — even as traditional newsroom careers have contracted dramatically.',

  careers: [
    { career: 'Content Strategist', growth: '15%', why: 'Your editorial judgment and audience understanding apply directly to content strategy', salary: '$60k-85k' },
    { career: 'Communications Manager', growth: '8%', why: 'Write and manage communications for organizations — your journalism skills transfer well', salary: '$60k-85k' },
    { career: 'UX Writer', growth: '23%', why: 'Journalism trains you to write clearly for audiences — UX writing is a strong modern fit', salary: '$75k-100k' },
    { career: 'Public Relations Specialist', growth: '8%', why: 'Understanding how journalists think makes you much stronger in PR and media relations', salary: '$50k-70k' },
    { career: 'Technical Writer', growth: '7%', why: 'Explaining complex topics clearly is one of the strongest transferable journalism skills', salary: '$60k-80k' },
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Companies need strong internal and external storytelling far beyond the newsroom', salary: '$55k-80k' },
  ],

  morePaths: {
    'Writing + Editorial': [
      'Content Strategist',
      'Editorial Assistant',
      'Copy Editor',
      'Technical Writer',
      'Content Marketing Specialist'
    ],
    'Communications + PR': [
      'Communications Manager',
      'Public Relations Specialist',
      'Corporate Communications',
      'Media Relations Coordinator',
      'Internal Communications Specialist'
    ],
    'Digital + Product': [
      'UX Writer',
      'SEO Content Specialist',
      'Newsletter Editor',
      'Audience Development Manager',
      'Product Content Designer'
    ],
    'Research + Analysis': [
      'Market Research Analyst',
      'Research Associate',
      'Policy Research Assistant',
      'Consumer Insights Analyst',
      'Communications Analyst'
    ]
  },

  searchTerms: [
    'Editorial Intern',
    'Communications Intern',
    'Content Writing Intern',
    'PR Intern',
    'Corporate Communications Intern',
    'UX Writing Intern',
    'Technical Writing Intern',
    'Marketing Content Intern',
    'Research Intern'
  ],

  struggles: 'Traditional journalism jobs — newspapers, magazines, broadcast — have contracted dramatically. Thousands of newsroom jobs have disappeared in the past decade, and local news is in genuine crisis.',

  honest: 'If your goal is traditional journalism, go in with clear eyes — the industry is difficult and pay is often lower than people expect. Content strategy, communications, UX writing, and technical writing often offer similar intellectual work with significantly better pay and stability.',
},
'theater': {
  title: 'Theater / Drama',
  intro: 'Theater training develops discipline, presence, collaboration, and the ability to connect with audiences — skills that translate into surprising places in the professional world.',

  careers: [
    { career: 'Corporate Trainer', growth: '11%', why: 'Your performance and teaching skills make you exceptional at presenting, facilitating, and leading workshops', salary: '$55k-80k' },
    { career: 'User Experience Researcher', growth: '18%', why: 'Empathy, observation, and human behavior — core theater skills applied to product design', salary: '$70k-95k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Your ability to connect with people and adapt to your audience is a real differentiator', salary: '$55k-80k' },
    { career: 'Communications Specialist', growth: '8%', why: 'Comfort speaking, presenting, and storytelling translates strongly to professional communication roles', salary: '$50k-70k' },
    { career: 'Events Manager', growth: '18%', why: 'Production, logistics, and live coordination transfer directly to event planning and operations', salary: '$50k-70k' },
    { career: 'Sales Engineer', growth: '6%', why: 'Confidence, presentation, and relationship-building make theater grads surprisingly strong in people-facing sales roles', salary: '$75k-110k' },
  ],

  morePaths: {
    'People + Communication': [
      'Corporate Trainer',
      'Customer Success Manager',
      'Communications Specialist',
      'Recruiter',
      'Learning & Development Specialist'
    ],
    'Research + Product': [
      'UX Researcher',
      'Market Research Analyst',
      'User Research Coordinator',
      'Consumer Insights Analyst',
      'Community Manager'
    ],
    'Events + Production': [
      'Events Manager',
      'Event Coordinator',
      'Production Coordinator',
      'Creative Producer',
      'Program Manager'
    ],
    'Performance + Business': [
      'Sales Engineer',
      'Account Executive',
      'Public Relations Specialist',
      'Brand Ambassador',
      'Corporate Facilitator'
    ]
  },

  searchTerms: [
    'Communications Intern',
    'Customer Success Intern',
    'Corporate Training Intern',
    'UX Research Intern',
    'Event Planning Intern',
    'Recruiting Intern',
    'Marketing Intern',
    'Sales Intern',
    'Program Coordinator Intern'
  ],

  struggles: 'Professional acting and performance careers are among the most competitive in any field. Most actors supplement with other work throughout their careers. The financial instability is real.',

  honest: 'If performance is your passion, pursue it — but build parallel skills that pay the bills. Many theater grads build deeply satisfying careers in training, UX research, communications, and events while keeping performance as a serious side pursuit instead of their only source of income.',
},
'religious-studies': {
  title: 'Religious Studies',
  intro: 'Religious studies teaches you to analyze texts, understand diverse cultures, think philosophically, and engage with humanity’s deepest questions. These skills are more transferable than most people realize.',

  careers: [
    { career: 'Nonprofit Program Manager', growth: '9%', why: 'Many nonprofits are faith-based or values-driven — your background is directly relevant', salary: '$50k-75k' },
    { career: 'Chaplain/Counselor', growth: '8%', why: 'Hospitals, military, universities, and prisons employ chaplains — meaningful work with steady demand', salary: '$50k-75k' },
    { career: 'Community Outreach Coordinator', growth: '8%', why: 'Your understanding of diverse communities is valuable in outreach and relationship-building roles', salary: '$45k-65k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Religion intersects with law, politics, ethics, and culture — your analytical skills apply well', salary: '$55k-80k' },
    { career: 'Teacher/Educator', growth: '5%', why: 'Ethics, humanities, history, and social studies education are natural fits', salary: '$45k-65k' },
    { career: 'Grant Writer', growth: '8%', why: 'Faith-based and nonprofit organizations need strong writers who can secure funding and tell meaningful stories', salary: '$50k-70k' },
  ],

  morePaths: {
    'Nonprofit + Community': [
      'Nonprofit Program Manager',
      'Community Outreach Coordinator',
      'Volunteer Coordinator',
      'Program Director',
      'Development Associate'
    ],
    'Faith + Counseling': [
      'Chaplain',
      'Campus Ministry Coordinator',
      'Pastoral Counselor',
      'Youth Program Director',
      'Spiritual Care Coordinator'
    ],
    'Policy + Education': [
      'Policy Analyst',
      'Teacher/Educator',
      'Legislative Assistant',
      'Public Affairs Associate',
      'Government Relations Specialist'
    ],
    'Writing + Administration': [
      'Grant Writer',
      'Communications Specialist',
      'Program Coordinator',
      'Administrative Manager',
      'Corporate Social Responsibility Coordinator'
    ]
  },

  searchTerms: [
    'Nonprofit Intern',
    'Community Outreach Intern',
    'Program Coordinator Intern',
    'Policy Intern',
    'Grant Writing Intern',
    'Campus Ministry Intern',
    'Communications Intern',
    'Education Intern',
    'Government Relations Intern'
  ],

  struggles: 'Religious studies has one of the narrowest direct career paths of any humanities degree. Seminary and academic careers require significant additional education, and translating the degree into secular careers takes deliberate effort.',

  honest: 'Religious studies works best as preparation for graduate school (divinity, law, counseling, social work) or when paired with practical skills like project management, grant writing, or nonprofit operations. Nonprofit and faith-based organizations are often the strongest professional starting points.',
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
  const [jobCounts, setJobCounts] = useState(null);
  const [jobsUpdated, setJobsUpdated] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const majorData = CAREER_PIVOTS[majorSlug];

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
    <a href={`https://www.ziprecruiter.com/candidate/search?search=${encodeURIComponent(majorData.title.replace(' Degree', '') + ' intern')}`}
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
    <a href={`https://www.ziprecruiter.com/candidate/search?search=${encodeURIComponent(career.career + ' intern')}`}
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
              <button onClick={() => navigate('/tracker')}
              className="flex items-center gap-3 bg-gray-900 text-white p-4 rounded-xl hover:bg-gray-700 transition-all text-left">
              <Briefcase className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Application Tracker</p>
                <p className="text-xs text-gray-300">Track every application</p>
              </div>
            </button>
              <button onClick={() => setCurrentPage('resume-builder')}
                className="flex items-center gap-3 bg-teal-600 text-white p-4 rounded-xl hover:bg-teal-700 transition-all text-left">
                <FileText className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Build Your Resume</p>
                  <p className="text-xs text-teal-100">Free, ATS-friendly</p>
                </div>
              </button>
              <button onClick={() => setCurrentPage('cover-letter')}
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
            <button onClick={() => setCurrentPage('pivot')}
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

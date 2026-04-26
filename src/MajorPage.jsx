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
    intro: 'Anthropology teaches you to understand human behavior, culture, and systems — skills that translate surprisingly well into tech, business, and social sectors.',
    careers: [
      { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior and culture is exactly what product teams need', salary: '$70k-95k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Study consumer behavior and cultural trends for companies', salary: '$55k-80k' },
      { career: 'Diversity & Inclusion Specialist', growth: '11%', why: 'Your cultural competency is directly applicable to building inclusive workplaces', salary: '$60k-85k' },
      { career: 'Nonprofit Program Manager', growth: '9%', why: 'Work with communities and cultural organizations', salary: '$50k-75k' },
      { career: 'Human Resources Specialist', growth: '10%', why: 'Your understanding of people and organizational culture is valuable in HR', salary: '$50k-70k' },
    ],
    struggles: 'Anthropology is genuinely versatile but requires significant translation work. Most employers do not immediately understand how an anthropology degree applies to their business. You need to make that case clearly.',
    honest: 'Anthropology has better outcomes than its reputation suggests — especially for UX research. Companies like Google, Microsoft, and Meta actively hire anthropologists for user research. Double majoring in business or CS significantly expands options.',
  },
  'biochemistry': {
    title: 'Biochemistry',
    intro: 'Biochemistry sits at the intersection of biology and chemistry — giving you one of the strongest science foundations for careers in pharma, biotech, medicine, and research.',
    careers: [
      { career: 'Research Associate', growth: '10%', why: 'Lab research roles at pharma, biotech, and university labs — most direct path', salary: '$50k-70k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA approval processes — your biochem knowledge is essential', salary: '$65k-95k' },
      { career: 'Quality Control Analyst', growth: '9%', why: 'Ensure products meet standards in pharma and food manufacturing', salary: '$50k-70k' },
      { career: 'Medical Science Liaison', growth: '8%', why: 'Bridge between pharma companies and medical professionals — requires scientific credibility', salary: '$90k-130k' },
      { career: 'Clinical Research Coordinator', growth: '14%', why: 'Manage clinical trials — your science background without needing a PhD', salary: '$50k-70k' },
    ],
    struggles: 'Many biochemistry grads feel stuck between needing a PhD for research and not knowing what else to do. There are strong career paths that do not require additional degrees.',
    honest: 'Biochemistry starting salaries are lower than engineering ($50-65k for most lab roles) but grow well. Medical science liaison is one of the highest-paying non-PhD paths — typically requires 2-3 years of lab experience first.',
  },

  'biology': {
    title: 'Biology',
    intro: 'A biology degree opens more doors than most students realize — especially if you are not going to medical school. Life sciences employment hit a record in 2025 with strong demand across pharma, biotech, and healthcare.',
    careers: [
      { career: 'Clinical Research Coordinator', growth: '14%', why: 'Your science background without needing a PhD — manages clinical trials', salary: '$50k-70k' },
      { career: 'Pharmaceutical Sales Rep', growth: '6%', why: 'Biology knowledge plus communication skills — accessible with strong pay', salary: '$55k-75k + commission' },
      { career: 'Lab Technician', growth: '5%', why: 'Most accessible entry point — openings in pharma, biotech, hospitals, food industry', salary: '$40k-55k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA processes — underrated, well-paid, and your biology background is essential', salary: '$65k-90k' },
      { career: 'Healthcare Data Analyst', growth: '23%', why: 'Health data is exploding — your science background helps you understand it', salary: '$60k-85k' },
      { career: 'Health Educator', growth: '7%', why: 'Teach communities about health — meaningful work with steady government demand', salary: '$50k-65k' },
    ],
    struggles: 'Many biology students feel stuck between med school (expensive, competitive) and not knowing what else to do. There are strong career paths that do not require additional degrees.',
    honest: 'Entry-level biology salaries start lower than some fields ($40-55k for lab roles) but grow significantly. Pharma sales and healthcare data analytics pay the most at entry level without additional degrees.',
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
    ],
    struggles: 'CIS is sometimes seen as less rigorous than CS by tech employers. For business-facing roles it is actually a better fit. For pure software engineering roles, CS grads have an advantage.',
    honest: 'CIS has solid job prospects and starting salaries ($60-75k). Adding cloud certifications (AWS, Azure) dramatically improves your options. For business-facing tech roles, CIS is often preferred over CS.',
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
    ],
    struggles: 'Environmental science starting salaries are lower than engineering-focused environmental roles. Many positions require field work in sometimes remote locations. Government hiring can be slow.',
    honest: 'Environmental science has strong long-term prospects as climate regulations tighten. Starting salaries ($55-70k) are modest but grow with experience. Sustainability roles at corporations are a growing and better-paid alternative to government work.',
  },

   'communications': {
    title: 'Communications',
    intro: 'Communications teaches you to craft messages, understand audiences, and navigate media — skills that every organization needs. The field has shifted dramatically toward digital and data-driven approaches.',
    careers: [
      { career: 'Social Media Manager', growth: '10%', why: 'Your understanding of messaging and audience engagement applies directly', salary: '$50k-75k' },
      { career: 'Corporate Communications Specialist', growth: '8%', why: 'Every company needs internal and external communication strategy', salary: '$55k-80k' },
      { career: 'Content Marketing Manager', growth: '15%', why: 'Plan and create content that drives business results', salary: '$55k-80k' },
      { career: 'Digital Marketing Specialist', growth: '17%', why: 'Data-driven marketing — less saturated than traditional communications roles', salary: '$50k-70k' },
      { career: 'Public Relations Specialist', growth: '8%', why: 'Manage company reputation and media relationships', salary: '$50k-70k' },
    ],
    struggles: 'Traditional PR and journalism have been disrupted by digital media. Communications grads without digital skills — SEO, analytics, content strategy — are at a disadvantage in the current market.',
    honest: 'Starting salaries in communications are often $40-55k which feels low for a college degree. Specializing in digital marketing or content strategy, and learning analytics tools, significantly improves earning potential.',
  },
  'data-science': {
    title: 'Data Science',
    intro: 'Data science is one of the fastest growing fields in the economy. Companies across every industry are trying to make sense of their data — and they need people who can do it.',
    careers: [
      { career: 'Data Scientist', growth: '35%', why: 'Build models and extract insights from complex datasets', salary: '$85k-120k' },
      { career: 'Data Analyst', growth: '23%', why: 'More accessible entry point — analyze data and communicate findings', salary: '$65k-90k' },
      { career: 'Machine Learning Engineer', growth: '40%', why: 'Build and deploy ML models at scale — fastest growing tech role', salary: '$100k-140k' },
      { career: 'Business Intelligence Analyst', growth: '18%', why: 'Turn data into business decisions using dashboards and reporting', salary: '$65k-90k' },
      { career: 'Data Engineer', growth: '21%', why: 'Build the pipelines that make data usable — less saturated than data scientist', salary: '$85k-120k' },
    ],
    struggles: 'Data science is one of the most hyped fields — which means the entry-level market is crowded. Pure data science roles are competitive. Data engineering and ML engineering have better entry-level opportunities right now.',
    honest: 'Data science salaries are excellent but the field bifurcated — senior roles pay very well, entry-level is competitive. Data engineering is less glamorous but has better entry-level hiring. Strong Python and SQL skills are non-negotiable.',
  },

  'cybersecurity': {
    title: 'Cybersecurity',
    intro: 'Cybersecurity has one of the largest talent shortages of any field — there are literally hundreds of thousands of unfilled positions globally. If you can do the work, you will find a job.',
    careers: [
      { career: 'Cybersecurity Analyst', growth: '32%', why: 'Monitor and protect systems from threats — high demand everywhere', salary: '$70k-95k' },
      { career: 'Penetration Tester', growth: '28%', why: 'Ethically hack systems to find vulnerabilities — specialized and well-paid', salary: '$80k-120k' },
      { career: 'Security Engineer', growth: '32%', why: 'Build secure systems from the ground up', salary: '$90k-130k' },
      { career: 'Incident Response Analyst', growth: '30%', why: 'Respond to and recover from security breaches — high pressure, high pay', salary: '$75k-105k' },
      { career: 'Compliance/Risk Analyst', growth: '15%', why: 'Ensure organizations meet security regulations — less technical, still well-paid', salary: '$65k-90k' },
    ],
    struggles: 'Cybersecurity requires continuous learning — threats evolve constantly. Certifications (CompTIA Security+, CEH, CISSP) matter as much as your degree in this field.',
    honest: 'Cybersecurity is one of the best job markets in tech right now. Starting salaries are strong ($70-85k) and grow quickly. Get your Security+ certification early — it opens doors significantly.',
  },

  'ai-machine-learning': {
    title: 'AI / Machine Learning',
    intro: 'AI and machine learning is the most rapidly evolving field in tech. The explosion of generative AI has created massive demand for people who understand how these systems work at a deep level.',
    careers: [
      { career: 'Machine Learning Engineer', growth: '40%', why: 'Build and deploy ML models at scale — fastest growing role in tech', salary: '$100k-145k' },
      { career: 'AI Research Scientist', growth: '35%', why: 'Push the boundaries of what AI can do — usually requires graduate degree', salary: '$110k-160k' },
      { career: 'Data Scientist', growth: '35%', why: 'Apply ML to business problems — more accessible than pure research', salary: '$85k-120k' },
      { career: 'MLOps Engineer', growth: '38%', why: 'Deploy and maintain ML systems in production — emerging critical role', salary: '$100k-140k' },
      { career: 'AI Product Manager', growth: '25%', why: 'Guide AI product development — technical background essential', salary: '$100k-140k' },
    ],
    struggles: 'AI/ML is extremely competitive at the top. The most exciting research roles require graduate degrees. However, applied ML engineering roles are accessible with a strong bachelor degree and portfolio.',
    honest: 'AI/ML has the highest salary ceiling of any field right now. Research roles almost always require a PhD. Applied engineering roles are accessible with a strong bachelor degree. Python, PyTorch/TensorFlow, and math are non-negotiable.',
  },

  'information-technology': {
    title: 'Information Technology',
    intro: 'IT is the backbone of every organization. Unlike CS which is more theoretical, IT is focused on keeping systems running, secure, and efficient — making IT graduates immediately useful from day one.',
    careers: [
      { career: 'IT Support Specialist', growth: '6%', why: 'Most accessible entry point — help organizations keep systems running', salary: '$45k-65k' },
      { career: 'Systems Administrator', growth: '3%', why: 'Manage servers, networks, and IT infrastructure', salary: '$60k-85k' },
      { career: 'Cloud Engineer', growth: '22%', why: 'Companies moving to cloud need people who understand both IT and cloud platforms', salary: '$80k-115k' },
      { career: 'IT Project Manager', growth: '9%', why: 'Manage technology projects — your IT knowledge makes you a credible PM', salary: '$75k-100k' },
      { career: 'Cybersecurity Analyst', growth: '32%', why: 'Your IT infrastructure knowledge is directly applicable to security', salary: '$70k-95k' },
    ],
    struggles: 'IT starting salaries are lower than CS or software engineering. The field is also changing rapidly — traditional sysadmin roles are shrinking while cloud and security roles are growing.',
    honest: 'IT is a practical, accessible degree with solid job prospects. Starting salaries are lower ($45-65k) but cloud certifications (AWS, Azure, GCP) dramatically improve your earning potential. Get cloud certified early.',
  },
  'computer-science': {
    title: 'Computer Science',
    intro: 'Computer science is one of the most in-demand degrees in the world. The theoretical foundation you build — algorithms, data structures, systems — opens doors across every sector of the economy.',
    careers: [
      { career: 'Software Engineer', growth: '22%', why: 'Core CS path — building products and systems at companies of all sizes', salary: '$90k-130k' },
      { career: 'Data Scientist', growth: '35%', why: 'Your CS foundation is ideal for building and deploying ML models', salary: '$85k-120k' },
      { career: 'Cybersecurity Analyst', growth: '32%', why: 'Massive shortage of qualified people — your CS background qualifies you', salary: '$75k-105k' },
      { career: 'Product Manager', growth: '19%', why: 'Technical background makes you a far more effective PM than non-technical peers', salary: '$90k-130k' },
      { career: 'Technical Writer', growth: '7%', why: 'Less competitive path — your CS knowledge lets you explain complex tech clearly', salary: '$60k-85k' },
    ],
    struggles: 'The CS job market is more competitive than it was in 2020-2022. Big tech laid off tens of thousands of engineers in 2022-2024. Entry-level is harder but far from impossible — internships matter enormously.',
    honest: 'CS still has excellent outcomes overall — among the highest starting salaries of any degree. The market is more selective now. Strong internship experience, real projects, and networking matter more than GPA.',
  },
 'architecture': {
    title: 'Architecture',
    intro: 'Architecture combines technical precision, creative design, and project management — skills that apply both to traditional architectural practice and to adjacent fields in design, construction, and tech.',
    careers: [
      { career: 'Architectural Designer', growth: '5%', why: 'Design buildings and spaces at architecture firms — core path, requires licensure eventually', salary: '$50k-70k' },
      { career: 'Interior Designer', growth: '4%', why: 'Design interior spaces for residential and commercial clients', salary: '$50k-75k' },
      { career: 'Construction Project Manager', growth: '8%', why: 'Your technical knowledge makes you a credible construction PM', salary: '$70k-100k' },
      { career: 'UX/Product Designer', growth: '16%', why: 'Your design thinking and spatial reasoning translate to digital product design', salary: '$70k-100k' },
      { career: 'BIM Specialist', growth: '10%', why: 'Building Information Modeling — digital design tools are transforming architecture', salary: '$60k-85k' },
    ],
    struggles: 'Architecture starting salaries are lower than almost any other professional degree given the length and difficulty of the program. Licensure (ARE exams) takes years to complete after graduation. Many architects earn less than engineers with similar education.',
    honest: 'Architecture requires genuine passion — the pay is not commensurate with the education level early in your career. Those who pivot to construction management or UX design often earn more. Licensure significantly improves long-term earning potential.',
  },

  'communication-sciences': {
    title: 'Communication Sciences / Speech Pathology',
    intro: 'Communication sciences and disorders prepares you to assess and treat speech, language, and hearing conditions. It is a meaningful and growing field — but you need to know the full picture before committing.',
    careers: [
      { career: 'Speech-Language Pathologist', growth: '19%', why: 'Treat communication disorders in schools, hospitals, and private practice — requires master\'s degree', salary: '$70k-95k' },
      { career: 'Audiologist', growth: '11%', why: 'Assess and treat hearing disorders — requires doctoral degree (AuD)', salary: '$75k-100k' },
      { career: 'Early Intervention Specialist', growth: '12%', why: 'Work with young children with developmental delays — some positions accessible with BS', salary: '$45k-65k' },
      { career: 'Rehabilitation Specialist', growth: '10%', why: 'Help patients regain communication abilities after injury or illness', salary: '$50k-70k' },
      { career: 'Clinical Research Coordinator', growth: '14%', why: 'Support communication disorders research without requiring a clinical degree', salary: '$50k-70k' },
    ],
    struggles: 'This is one of the most important things to know: you cannot practice as a speech-language pathologist with only a bachelor\'s degree. Graduate school is required. Make sure you know this before committing to the major.',
    honest: 'SLP is a rewarding career with strong job security and decent pay — but graduate school (2 years + clinical hours) is not optional, it is required. Plan accordingly. The bachelor\'s degree alone does not qualify you for most clinical positions.',
  },

  'criminal-justice': {
    title: 'Criminal Justice',
    intro: 'Criminal justice teaches you how legal and enforcement systems work, how to analyze risk, and how to navigate complex regulations — skills that transfer well beyond law enforcement into corporate compliance and security.',
    careers: [
      { career: 'Compliance Officer', growth: '8%', why: 'Ensure companies follow laws and regulations — underrated and well-paid', salary: '$60k-85k' },
      { career: 'Corporate Security Analyst', growth: '9%', why: 'Risk assessment and security planning for businesses', salary: '$55k-80k' },
      { career: 'Probation/Parole Officer', growth: '4%', why: 'Supervise offenders in the community — government role with steady demand', salary: '$50k-70k' },
      { career: 'Loss Prevention Manager', growth: '6%', why: 'Retail and corporate asset protection', salary: '$50k-75k' },
      { career: 'Emergency Management Specialist', growth: '6%', why: 'Disaster planning and response coordination', salary: '$55k-80k' },
    ],
    struggles: 'Many criminal justice grads default to law enforcement without considering that the field requires physical fitness tests, background checks, and can be difficult to break into. Corporate paths are often overlooked.',
    honest: 'Law enforcement careers are competitive and specific. Corporate compliance and security offer better starting pay and less physical risk for most graduates. Law school is a viable path that significantly expands options.',
  },
  'education': {
    title: 'Education',
    intro: 'Education majors develop the ability to teach, facilitate learning, communicate complex ideas, and understand how people develop — skills valued far beyond K-12 classrooms.',
    careers: [
      { career: 'Teacher (K-12)', growth: '4%', why: 'Direct path — teaching positions in public and private schools', salary: '$45k-65k' },
      { career: 'Corporate Trainer', growth: '11%', why: 'Companies need people who can teach — often pays significantly better than K-12', salary: '$55k-85k' },
      { career: 'Instructional Designer', growth: '9%', why: 'Create online courses and training programs for businesses — growing with remote work', salary: '$60k-90k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Helping customers succeed is teaching in a business context — your skills transfer', salary: '$55k-80k' },
      { career: 'Learning & Development Specialist', growth: '10%', why: 'Build and manage employee training programs in corporate settings', salary: '$60k-85k' },
    ],
    struggles: 'K-12 teaching salaries have improved but remain below what education and experience level would command in other fields. Teacher burnout is real and has worsened significantly since 2020.',
    honest: 'If teaching is your calling, pursue it — it is meaningful work. But know that corporate training and instructional design typically pay $15-25k more for similar work. Both are valid paths.',
  },

  'graphic-design': {
    title: 'Graphic Design',
    intro: 'Graphic design gives you visual communication skills that are genuinely in demand — every company needs design. The field has expanded well beyond print into digital, UX, and motion.',
    careers: [
      { career: 'Graphic Designer', growth: '3%', why: 'Core path — design for brands, marketing, and communications', salary: '$45k-65k' },
      { career: 'UX/UI Designer', growth: '16%', why: 'Apply your visual skills to digital product design — higher pay than traditional graphic design', salary: '$70k-100k' },
      { career: 'Art Director', growth: '6%', why: 'Lead creative direction for campaigns and brands — requires experience', salary: '$75k-110k' },
      { career: 'Motion Graphics Designer', growth: '10%', why: 'Animation and video graphics — growing demand for digital content', salary: '$55k-80k' },
      { career: 'Brand Designer', growth: '8%', why: 'Develop visual identity systems for companies', salary: '$55k-80k' },
    ],
    struggles: 'Graphic design is highly competitive and freelance work is precarious. Entry-level salaries are low. AI design tools are beginning to change the lower end of the market.',
    honest: 'UX/UI design pays significantly more than traditional graphic design ($70-100k vs $45-65k). Learning Figma and basic UX principles is the single best career move for graphic design graduates. Your visual foundation is an asset — build on it.',
  },

  'healthcare-administration': {
    title: 'Healthcare Administration',
    intro: 'Healthcare administration is one of the fastest-growing fields in the economy. As healthcare systems grow more complex, the need for people who can manage them — without being clinicians — is exploding.',
    careers: [
      { career: 'Healthcare Administrator', growth: '29%', why: 'Manage operations at hospitals, clinics, and healthcare systems — fastest growing management role', salary: '$60k-90k' },
      { career: 'Health Information Manager', growth: '17%', why: 'Manage patient data and health records — growing field with privacy and tech components', salary: '$55k-85k' },
      { career: 'Medical Practice Manager', growth: '20%', why: 'Run the business side of medical practices', salary: '$55k-80k' },
      { career: 'Healthcare Analyst', growth: '23%', why: 'Analyze healthcare data to improve operations and outcomes', salary: '$60k-85k' },
      { career: 'Compliance Officer (Healthcare)', growth: '12%', why: 'Ensure healthcare organizations meet regulatory requirements — HIPAA and beyond', salary: '$60k-85k' },
    ],
    struggles: 'Healthcare administration starting roles can involve a lot of administrative work before reaching management. The field requires patience — leadership positions take time to reach.',
    honest: 'Healthcare administration has 29% projected job growth — one of the fastest of any field. Starting salaries ($55-70k) are solid and grow well. MHA or MBA degrees accelerate advancement significantly.',
  },

  'kinesiology': {
    title: 'Kinesiology',
    intro: 'Kinesiology is the study of human movement — giving you a foundation in exercise science, anatomy, and biomechanics that applies to healthcare, fitness, sports, and wellness industries.',
    careers: [
      { career: 'Physical Therapist Assistant', growth: '24%', why: 'Support physical therapists in patient rehabilitation — accessible with a 2-year program', salary: '$50k-65k' },
      { career: 'Personal Trainer/Fitness Coach', growth: '14%', why: 'Direct application of your knowledge — certification required, flexible career', salary: '$40k-65k' },
      { career: 'Occupational Therapist Assistant', growth: '24%', why: 'Help patients regain functional abilities — strong demand and growth', salary: '$55k-70k' },
      { career: 'Athletic Trainer', growth: '14%', why: 'Prevent and treat sports injuries — schools, professional teams, and clinics', salary: '$50k-65k' },
      { career: 'Corporate Wellness Coordinator', growth: '12%', why: 'Companies increasingly invest in employee wellness programs', salary: '$50k-70k' },
    ],
    struggles: 'Kinesiology has a challenging direct career path at the bachelor level. Most clinical roles (PT, OT) require graduate degrees. Many graduates end up in fitness roles that do not fully utilize their education.',
    honest: 'If you want to be a physical or occupational therapist, plan for graduate school — it is required. With only a bachelor degree, athletic training and corporate wellness are the strongest paths. Personal training pays less than most kinesiology grads expect.',
  },

  'nutrition-dietetics': {
    title: 'Nutrition / Dietetics',
    intro: 'Nutrition and dietetics prepares you to help people improve their health through food and lifestyle. It is a meaningful field with growing demand — but there are important licensing requirements to understand.',
    careers: [
      { career: 'Registered Dietitian (RD)', growth: '11%', why: 'Core credential for clinical and counseling work — requires internship and RD exam', salary: '$60k-80k' },
      { career: 'Nutrition Educator', growth: '7%', why: 'Teach nutrition in community settings, schools, or wellness programs', salary: '$45k-65k' },
      { career: 'Food Service Manager', growth: '5%', why: 'Manage food operations at hospitals, schools, and institutions', salary: '$50k-70k' },
      { career: 'Health Coach', growth: '12%', why: 'Guide clients in lifestyle and nutrition changes — certification strengthens this path', salary: '$40k-65k' },
      { career: 'Food Industry Specialist', growth: '6%', why: 'Work in food product development, quality, or regulatory compliance at food companies', salary: '$55k-75k' },
    ],
    struggles: 'Becoming a Registered Dietitian requires completing an accredited internship program (very competitive) and passing the RD exam. Without the RD credential, your career options are significantly more limited.',
    honest: 'The RD credential is essentially required for clinical dietitian work — and the internship is competitive. Plan early. Without RD, food industry and health coaching are viable paths but pay less. The field is meaningful but the path has real obstacles.',
  },

  'social-work': {
    title: 'Social Work',
    intro: 'Social work is one of the most meaningful degrees — you help people navigate crisis, access resources, and build better lives. The demand is high and the work matters deeply.',
    careers: [
      { career: 'Case Manager', growth: '12%', why: 'Connect clients with services and resources — core social work role', salary: '$40k-55k' },
      { career: 'Child Protective Services Worker', growth: '8%', why: 'Investigate and respond to child abuse and neglect reports', salary: '$40k-55k' },
      { career: 'School Social Worker', growth: '10%', why: 'Support students with social, emotional, and family challenges', salary: '$50k-65k' },
      { career: 'Clinical Social Worker', growth: '11%', why: 'Provide therapy and counseling — requires MSW and licensure (LCSW)', salary: '$55k-80k' },
      { career: 'Nonprofit Program Director', growth: '9%', why: 'Lead community programs and social services organizations', salary: '$50k-75k' },
    ],
    struggles: 'Social work starting salaries are among the lowest of any professional degree — and the emotional demands are among the highest. Burnout is a serious and well-documented problem in the field.',
    honest: 'Social work is a calling, not just a career. If you are drawn to it, pursue it — but go in with clear eyes about the pay and emotional demands. MSW significantly improves earning potential and opens clinical practice. The work is genuinely important.',
  },

  'sports-management': {
    title: 'Sports Management',
    intro: 'Sports management is one of the most popular business degrees — and one of the most competitive. The sports industry is small relative to the number of people who want to work in it.',
    careers: [
      { career: 'Event Coordinator', growth: '18%', why: 'Manage sports events and venue operations — more accessible than front office roles', salary: '$40k-60k' },
      { career: 'Athletic Director (Assistant)', growth: '6%', why: 'Support athletic departments at schools and universities', salary: '$45k-65k' },
      { career: 'Sports Marketing Coordinator', growth: '8%', why: 'Marketing for sports teams and brands — competitive but your passion helps', salary: '$40k-60k' },
      { career: 'Facility Manager', growth: '6%', why: 'Manage sports facilities — arenas, stadiums, fitness centers', salary: '$50k-70k' },
      { career: 'Corporate Event Manager', growth: '18%', why: 'Your event management skills transfer to corporate events — better pay, less competition', salary: '$50k-75k' },
    ],
    struggles: 'The sports industry has far more applicants than openings. Starting salaries are low. Unpaid internships are common. The glamour of sports conceals the reality of entry-level work.',
    honest: 'Sports management is one of the hardest fields to break into and sustain financially. Many grads pivot to corporate event management or marketing where their skills transfer and pay is better. Networking is essential — who you know matters enormously in sports.',
  },

  'urban-planning': {
    title: 'Urban Planning',
    intro: 'Urban planning shapes how cities and communities grow — transportation, housing, land use, and sustainability. It is a meaningful field with steady government demand and growing private sector interest.',
    careers: [
      { career: 'Urban Planner', growth: '4%', why: 'Work for local governments planning land use, transportation, and development', salary: '$60k-85k' },
      { career: 'Transportation Planner', growth: '6%', why: 'Plan transit systems and transportation infrastructure — strong demand with infrastructure investment', salary: '$60k-85k' },
      { career: 'Community Development Specialist', growth: '7%', why: 'Support housing and economic development in communities', salary: '$55k-75k' },
      { career: 'GIS Analyst', growth: '14%', why: 'Spatial data analysis is central to planning — strong transferable skill', salary: '$55k-80k' },
      { career: 'Real Estate Developer (Entry Level)', growth: '5%', why: 'Your planning knowledge is valuable in private real estate development', salary: '$55k-80k' },
    ],
    struggles: 'Urban planning is heavily government-dependent which means hiring is tied to government budgets and can be slow. Master\'s degrees (MUP/MURP) are increasingly expected for advancement.',
    honest: 'Urban planning has steady demand and meaningful work. Starting salaries ($55-70k) are modest. GIS skills are highly transferable and improve your options significantly. Many planners pursue a master\'s degree within a few years of starting work.',
  },
  'english': {
    title: 'English',
    intro: 'Strong writing and analytical thinking are genuinely rare. In a world flooded with content, the ability to write with clarity and precision is valuable — especially in tech, where most people cannot write well.',
    careers: [
      { career: 'UX Writer', growth: '23%', why: 'Write the words inside digital products — storytelling applied to technology', salary: '$75k-100k' },
      { career: 'Content Strategist', growth: '15%', why: 'Plan and manage content across organizations — your editorial judgment is central', salary: '$65k-90k' },
      { career: 'Technical Writer', growth: '7%', why: 'Explain complex things simply — your core skill applied to technical documentation', salary: '$60k-80k' },
      { career: 'Grant Writer', growth: '8%', why: 'Write compelling funding proposals — research and persuasion are your strengths', salary: '$50k-70k' },
      { career: 'Copywriter', growth: '8%', why: 'Write marketing and advertising copy — English grads often excel at this', salary: '$50k-75k' },
    ],
    struggles: 'Traditional publishing and journalism careers have contracted significantly. English grads who stay in "English careers" often face low pay. The pivot to digital and tech writing opens much better opportunities.',
    honest: 'UX writing and content strategy pay $30-40k more than traditional editorial roles. If you are an English grad, learn Figma basics and study UX — you can position yourself as a UX writer faster than you think.',
  },
  'foreign-languages': {
    title: 'Foreign Languages',
    intro: 'Global companies need people who can navigate different cultures and languages — and there are more opportunities than you might think beyond translation.',
    careers: [
      { career: 'Corporate Communications Specialist', growth: '8%', why: 'Multilingual communication skills are increasingly valued', salary: '$55k-80k' },
      { career: 'Content Marketing Specialist', growth: '15%', why: 'Companies need content created for global markets', salary: '$50k-70k' },
      { career: 'HR Specialist', growth: '10%', why: 'Multilingual HR professionals are in demand at global companies', salary: '$50k-70k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Serving international clients requires exactly your skills', salary: '$55k-80k' },
    ],
    struggles: 'Foreign language majors often feel limited to teaching or translation. The most valuable application of language skills is in global business roles where language is one skill among several.',
    honest: 'Language skills alone rarely command premium salaries. The strongest path is combining language skills with another area — business, tech, marketing — where bilingual ability is a differentiator.',
  },
  'history': {
    title: 'History',
    intro: 'History trains you to analyze complex information, construct arguments, think critically about causation, and write clearly — skills that are more transferable than the degree\'s reputation suggests.',
    careers: [
      { career: 'Content Strategist', growth: '15%', why: 'Research, analysis, and storytelling — your core skills applied to business content', salary: '$60k-85k' },
      { career: 'Compliance Officer', growth: '8%', why: 'Understanding regulations, documentation, and institutional systems — your analytical skills fit', salary: '$60k-85k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Historical context and research skills are directly applicable to policy work', salary: '$55k-80k' },
      { career: 'Archivist/Records Manager', growth: '5%', why: 'Manage and preserve information for organizations and government', salary: '$45k-65k' },
      { career: 'Grant Writer', growth: '8%', why: 'Research and persuasive writing — nonprofits need this combination', salary: '$50k-70k' },
    ],
    struggles: 'The academic history career path — professor, researcher — is extremely competitive with very few openings. Most history PhD graduates do not get tenure-track positions. The undergraduate degree requires strong translation to non-academic careers.',
    honest: 'History is one of the harder degrees for immediate career translation. Starting salaries tend to be lower. Adding data skills (SQL, Python basics) or a business minor dramatically improves your outcomes. Law school is a common and viable path.',
  },
  'accounting': {
    title: 'Accounting',
    intro: 'Accounting is one of the most stable and recession-resistant degrees available. Every organization — business, nonprofit, government — needs accountants. The CPA credential dramatically increases your earning potential.',
    careers: [
      { career: 'Staff Accountant', growth: '6%', why: 'Most accessible entry point — public accounting firms hire large classes every year', salary: '$50k-65k' },
      { career: 'Auditor', growth: '6%', why: 'Review financial records for accuracy and compliance — steady demand', salary: '$55k-75k' },
      { career: 'Tax Analyst', growth: '5%', why: 'Corporate and individual tax preparation — busy season intense but stable field', salary: '$55k-75k' },
      { career: 'Financial Analyst', growth: '9%', why: 'Your accounting foundation makes you stronger than most finance grads', salary: '$65k-90k' },
      { career: 'Forensic Accountant', growth: '8%', why: 'Investigate financial fraud — specialized and well-paid', salary: '$70k-100k' },
    ],
    struggles: 'Accounting starting salaries feel low relative to other business degrees. The CPA exam is difficult and time-consuming. Many students underestimate how much the CPA credential matters for career advancement.',
    honest: 'Accounting has some of the most reliable employment of any business degree. Starting salaries ($50-65k) are lower than finance or MIS but grow steadily. CPA certification can add $20-30k to your salary and opens senior doors.',
  },
  'business-administration': {
    title: 'Business Administration',
    intro: 'Business administration is the broadest business degree — and that is both its strength and its challenge. You are qualified for many roles but you need to specialize to stand out.',
    careers: [
      { career: 'Operations Analyst', growth: '16%', why: 'Make businesses run more efficiently — broad business knowledge is an asset', salary: '$55k-80k' },
      { career: 'Business Analyst', growth: '14%', why: 'Bridge between business needs and technical solutions', salary: '$60k-85k' },
      { career: 'Sales Development Representative', growth: '15%', why: 'Most accessible high-earning entry point — fastest path to $80k+', salary: '$45k-65k + commission' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Help clients succeed — relationship focused and growing rapidly', salary: '$55k-80k' },
      { career: 'Project Manager', growth: '9%', why: 'Coordinate teams and deliver projects — PMP certification strengthens this path', salary: '$65k-95k' },
      { career: 'Human Resources Specialist', growth: '10%', why: 'Your broad business understanding applies well to HR', salary: '$50k-70k' },
    ],
    struggles: 'Business administration is one of the most common degrees which means significant competition. Employers often prefer candidates with a more specific concentration — finance, marketing, MIS — over general business.',
    honest: 'General business admin grads need to work harder to differentiate themselves. Pick a specialization, get internship experience, and consider adding a relevant certification. Starting salaries average $55-65k.',
  },
  'economics': {
    title: 'Economics',
    intro: 'Economics teaches you to think analytically about how the world works — supply and demand, incentives, trade-offs. These skills are surprisingly valuable in finance, consulting, policy, and tech.',
    careers: [
      { career: 'Financial Analyst', growth: '9%', why: 'Your quantitative economics training is strong preparation for finance roles', salary: '$65k-90k' },
      { career: 'Data Analyst', growth: '23%', why: 'Econometrics and statistical analysis translate directly to data roles', salary: '$60k-85k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Government and think tanks need economic analysts', salary: '$55k-80k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Understanding markets and consumer behavior is your core strength', salary: '$55k-75k' },
      { career: 'Management Consultant', growth: '11%', why: 'Economics grads are well-represented in consulting — analytical and structured thinking', salary: '$70k-110k' },
    ],
    struggles: 'Economics is more theoretical than most employers expect. Pure econ grads without strong quantitative skills (econometrics, statistics, Python/R) struggle to compete with finance and accounting grads for business roles.',
    honest: 'Economics has excellent outcomes for students who develop quantitative skills. Without those skills it can feel like a frustrating degree. Adding Python, SQL, or R skills dramatically improves your job prospects.',
  },
  'entrepreneurship': {
    title: 'Entrepreneurship',
    intro: 'Entrepreneurship teaches you to identify opportunities, build things from scratch, and think like an owner. These skills are valuable whether you start your own company or work inside one.',
    careers: [
      { career: 'Business Development Manager', growth: '12%', why: 'Find and close new business opportunities — your entrepreneurial thinking is an asset', salary: '$60k-90k' },
      { career: 'Product Manager', growth: '19%', why: 'Build products people want — your founder mindset makes you a stronger PM', salary: '$80k-120k' },
      { career: 'Sales Development Representative', growth: '15%', why: 'Revenue generation — entrepreneurs understand value and selling naturally', salary: '$45k-65k + commission' },
      { career: 'Startup Generalist', growth: '15%', why: 'Early-stage startups need people who can do everything — this is your degree', salary: '$55k-80k' },
      { career: 'Management Consultant', growth: '11%', why: 'Help companies solve problems — your big-picture thinking applies', salary: '$70k-110k' },
    ],
    struggles: 'Entrepreneurship degrees are not well understood by traditional employers. Many corporate recruiters do not know what to do with them. You need to translate your experience into concrete skills and results.',
    honest: 'Entrepreneurship is a great degree if you are self-directed and proactive. It works best when combined with real startup experience, side projects, or internships that demonstrate what you can actually build.',
  },
  'finance': {
    title: 'Finance',
    intro: 'Finance is one of the highest-paying business degrees at entry level. You understand capital, risk, and how money moves through organizations — skills that are valued across banking, corporate finance, and fintech.',
    careers: [
      { career: 'Financial Analyst', growth: '9%', why: 'Core finance path — analyze investments, build models, support decisions', salary: '$65k-90k' },
      { career: 'Investment Banking Analyst', growth: '6%', why: 'Highest-paying entry-level role — extremely demanding but exceptional pay', salary: '$100k-150k' },
      { career: 'Corporate Finance Analyst', growth: '9%', why: 'Work inside a company on budgeting, forecasting, and financial planning', salary: '$65k-90k' },
      { career: 'Risk Analyst', growth: '11%', why: 'Assess and manage financial risk — growing field especially in banking', salary: '$65k-90k' },
      { career: 'Financial Advisor', growth: '13%', why: 'Help individuals and businesses manage money — commission-based growth path', salary: '$50k-80k + commission' },
    ],
    struggles: 'Investment banking is extremely competitive and not for everyone — 80-hour weeks are common. Many finance grads burn out chasing IB when corporate finance or fintech would have been a better fit.',
    honest: 'Finance has among the highest starting salaries of business degrees ($65-75k average, much higher in IB). CFA certification significantly improves earning potential. Wall Street is not the only path — fintech and corporate finance are growing faster.',
  },
  'hospitality-management': {
    title: 'Hospitality Management',
    intro: 'Hospitality management teaches operations, customer service, and people management at a level most business degrees never touch. These skills transfer well beyond hotels and restaurants.',
    careers: [
      { career: 'Hotel/Resort Manager', growth: '8%', why: 'Direct path — manage operations at hotels, resorts, and hospitality venues', salary: '$50k-80k' },
      { career: 'Event Manager', growth: '18%', why: 'Plan and execute corporate events, conferences, and experiences', salary: '$45k-70k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Your customer service instincts translate perfectly to tech and SaaS companies', salary: '$55k-80k' },
      { career: 'Operations Manager', growth: '10%', why: 'Run operations for businesses of all types — your hospitality ops training applies', salary: '$55k-80k' },
      { career: 'Sales Manager', growth: '5%', why: 'Hospitality grads are natural salespeople — relationship driven and service oriented', salary: '$60k-90k' },
    ],
    struggles: 'Hospitality was devastated by COVID-19 and recovery has been uneven. Starting salaries are lower than other business degrees and hours can be demanding — nights, weekends, and holidays are common.',
    honest: 'Hospitality management skills are genuinely transferable but you may need to make the case for yourself in non-hospitality roles. Customer success in tech companies is one of the best pivots — your service orientation is a real differentiator.',
  },
  'information-systems': {
    title: 'Information Systems',
    intro: 'Information systems sits at the intersection of business and technology — you understand both sides, which makes you valuable in roles that require translating between technical teams and business stakeholders.',
    careers: [
      { career: 'Business Analyst', growth: '14%', why: 'Bridge between IT and business — your IS background is ideal for this role', salary: '$60k-85k' },
      { career: 'Systems Analyst', growth: '9%', why: 'Analyze and improve information systems within organizations', salary: '$65k-90k' },
      { career: 'Project Manager (IT)', growth: '9%', why: 'Manage technology projects — you understand both sides of the conversation', salary: '$70k-100k' },
      { career: 'Data Analyst', growth: '23%', why: 'Your database and systems knowledge applies directly to data roles', salary: '$60k-85k' },
      { career: 'ERP Consultant', growth: '10%', why: 'Implement and optimize SAP, Oracle, and other enterprise systems', salary: '$70k-100k' },
    ],
    struggles: 'IS grads sometimes feel stuck between business and tech — not technical enough for pure IT roles, not business-focused enough for pure business roles. This is a false problem — the hybrid skill set is actually in high demand.',
    honest: 'Information systems has strong job prospects and starting salaries ($60-75k average). ERP consulting is an underrated path — SAP and Oracle skills are in high demand and companies pay well for them.',
  },
  'international-business': {
    title: 'International Business',
    intro: 'International business prepares you to work across borders — understanding global markets, trade, cross-cultural communication, and international operations. Globalization makes these skills increasingly relevant.',
    careers: [
      { career: 'International Trade Specialist', growth: '6%', why: 'Help companies navigate import/export regulations and global trade', salary: '$55k-80k' },
      { career: 'Global Supply Chain Analyst', growth: '18%', why: 'Manage supply chains across countries — your international knowledge is essential', salary: '$60k-85k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Research international markets and consumer behavior', salary: '$55k-75k' },
      { career: 'Business Development Manager', growth: '12%', why: 'Expand companies into new markets — your cross-cultural skills are an asset', salary: '$65k-95k' },
      { career: 'Foreign Service Officer', growth: '5%', why: 'Represent the US government abroad — highly competitive but meaningful work', salary: '$60k-90k' },
    ],
    struggles: 'International business is broad and can feel unfocused. Many employers are not sure what to do with the degree unless you have specific language skills, regional expertise, or relevant internship experience.',
    honest: 'International business works best when combined with language fluency and actual international experience. Without those, it is a general business degree with an international focus — not necessarily a differentiator.',
  },
  'management': {
    title: 'Management',
    intro: 'Management focuses on leading people, organizing resources, and driving results — skills that every organization needs at every level.',
    careers: [
      { career: 'Operations Manager', growth: '10%', why: 'Run day-to-day operations for businesses of all sizes', salary: '$55k-80k' },
      { career: 'Human Resources Manager', growth: '5%', why: 'Lead people functions — your management training is directly applicable', salary: '$60k-90k' },
      { career: 'Sales Manager', growth: '5%', why: 'Lead sales teams — management skills plus revenue focus', salary: '$65k-100k' },
      { career: 'Project Manager', growth: '9%', why: 'Coordinate teams to deliver projects on time and budget', salary: '$65k-95k' },
      { career: 'Retail/Store Manager', growth: '3%', why: 'Direct path — manage retail operations and teams', salary: '$45k-70k' },
    ],
    struggles: 'Management is one of the most common business concentrations which means significant competition. Entry-level management roles are rare — most people manage after proving themselves in individual contributor roles.',
    honest: 'You rarely get hired directly into management. Most management careers start with individual contributor roles where you demonstrate leadership potential. The degree helps but experience matters more.',
  },
  'management-information-systems': {
    title: 'Management Information Systems',
    intro: 'MIS is consistently one of the highest-paying business degrees. You combine business acumen with technical skills — making you valuable in roles that require both.',
    careers: [
      { career: 'Business Analyst', growth: '14%', why: 'Your MIS background is ideal — you understand both business needs and technical solutions', salary: '$65k-90k' },
      { career: 'Data Analyst', growth: '23%', why: 'Database and systems knowledge applies directly to data roles', salary: '$65k-90k' },
      { career: 'IT Project Manager', growth: '9%', why: 'Manage technology projects with business and technical credibility', salary: '$75k-105k' },
      { career: 'Systems Analyst', growth: '9%', why: 'Analyze and improve business systems — core MIS role', salary: '$65k-90k' },
      { career: 'ERP Consultant', growth: '10%', why: 'SAP/Oracle implementation — MIS grads are preferred for these roles', salary: '$75k-105k' },
    ],
    struggles: 'MIS is sometimes confused with IT or computer science by employers. You need to clearly communicate what you bring — the business side plus the technical side.',
    honest: 'MIS has one of the best salary-to-competition ratios of any business degree. Average starting salary is $65-75k. ERP consulting is particularly strong — SAP skills alone can add $15-20k to starting salary.',
  },
  'marketing': {
    title: 'Marketing',
    intro: 'Marketing has transformed dramatically — today the strongest roles are data-driven, digital-first, and require analytical skills alongside creativity. The students who thrive combine both.',
    careers: [
      { career: 'Digital Marketing Specialist', growth: '17%', why: 'Data-driven marketing — fastest growing area of the field', salary: '$45k-65k' },
      { career: 'Content Marketing Manager', growth: '15%', why: 'Create and manage content strategy — high demand across industries', salary: '$50k-70k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Help clients succeed — your marketing skills make you effective at retention', salary: '$55k-80k' },
      { career: 'Sales Development Representative', growth: '15%', why: 'Revenue generation — fastest path to high earnings for marketing grads', salary: '$45k-65k + commission' },
      { career: 'Product Marketing Manager', growth: '16%', why: 'Bridge between product and customer — strategic and well-paid', salary: '$70k-95k' },
    ],
    struggles: 'Traditional marketing roles are being disrupted by digital and AI tools. Marketing grads without digital skills — SEO, analytics, paid media — are at a serious disadvantage.',
    honest: 'Marketing starting salaries are often $40-50k which feels low. Product marketing and growth marketing pay much more. Learning Google Analytics, Meta Ads, and basic data skills dramatically improves your starting salary and career trajectory.',
  },
  'supply-chain-management': {
    title: 'Supply Chain Management',
    intro: 'Supply chain management emerged from relative obscurity to become one of the most in-demand business specializations after COVID-19 exposed how fragile global supply chains are.',
    careers: [
      { career: 'Supply Chain Analyst', growth: '18%', why: 'Analyze and optimize supply chain operations — core SCM role, high demand', salary: '$60k-85k' },
      { career: 'Logistics Coordinator', growth: '10%', why: 'Coordinate transportation and warehousing operations', salary: '$50k-70k' },
      { career: 'Procurement Specialist', growth: '8%', why: 'Source and negotiate with suppliers — critical function in every organization', salary: '$55k-80k' },
      { career: 'Operations Research Analyst', growth: '23%', why: 'Optimize supply chain systems using data and mathematical models', salary: '$70k-100k' },
      { career: 'Inventory Manager', growth: '6%', why: 'Manage stock levels and reduce costs — steady demand across industries', salary: '$55k-75k' },
    ],
    struggles: 'Supply chain roles vary enormously in quality. Entry-level logistics coordinator roles can feel unglamorous. The strategic analytical roles take time to reach but pay much better.',
    honest: 'Supply chain management has strong job prospects and is increasingly well-paid as companies prioritize resilience. APICS certification (CSCP or CPIM) significantly boosts your credentials and salary.',
  },
'mathematics': {
    title: 'Mathematics',
    intro: 'Mathematics is one of the strongest degrees for the current job market. Analytical and quantitative skills are in high demand across finance, tech, insurance, and consulting.',
    careers: [
      { career: 'Data Analyst', growth: '23%', why: 'Your analytical and statistical skills are in extremely high demand', salary: '$65k-90k' },
      { career: 'Actuarial Analyst', growth: '21%', why: 'Math background is perfect for risk assessment — well-paid with clear exam path', salary: '$70k-100k' },
      { career: 'Financial Analyst', growth: '9%', why: 'Modeling and forecasting — your quantitative skills shine', salary: '$65k-95k' },
      { career: 'Operations Research Analyst', growth: '23%', why: 'Optimize business processes using mathematical models', salary: '$70k-100k' },
      { career: 'Data Scientist', growth: '35%', why: 'Fastest growing field — math background is the ideal foundation', salary: '$85k-120k' },
    ],
    struggles: 'Math majors sometimes undersell themselves because they think employers only want CS degrees. Data analyst and data science roles actively seek strong math backgrounds.',
    honest: 'Mathematics is genuinely one of the best degrees for salary potential right now. Actuarial science has very strong job security. Data science and analytics are the highest-growth paths. Learning Python or R is essentially required.',
  },

  'neuroscience': {
    title: 'Neuroscience',
    intro: 'Neuroscience is a popular and rigorous major that develops strong analytical thinking, research skills, and scientific understanding — but the direct career path is less obvious than students expect.',
    careers: [
      { career: 'Clinical Research Coordinator', growth: '14%', why: 'Your research training and scientific background are directly applicable', salary: '$50k-70k' },
      { career: 'UX Researcher', growth: '18%', why: 'Understanding how brains work applies directly to understanding user behavior', salary: '$70k-95k' },
      { career: 'Data Analyst (Healthcare)', growth: '23%', why: 'Healthcare and neuroscience data analysis is a growing specialization', salary: '$60k-85k' },
      { career: 'Pharmaceutical Sales Rep', growth: '6%', why: 'Your neuroscience knowledge gives you credibility selling CNS drugs', salary: '$55k-75k + commission' },
      { career: 'Behavioral Health Technician', growth: '15%', why: 'Direct care with patients — accessible with a bachelor degree', salary: '$35k-50k' },
    ],
    struggles: 'Neuroscience attracts many pre-med students who do not get into medical school and then feel lost. Clinical neuroscience careers almost all require graduate degrees. Direct employment with a BS is possible but requires deliberate planning.',
    honest: 'Neuroscience is intellectually rich but the direct career path without grad school requires pivot thinking. UX research is an underrated and well-paid path. Pre-med students who do not get into med school should look seriously at clinical research coordination.',
  },

  'nursing': {
    title: 'Nursing',
    intro: 'Nursing is one of the most reliable and meaningful career paths available. The job market is consistently strong, salaries are competitive, and the work directly helps people.',
    careers: [
      { career: 'Registered Nurse (RN)', growth: '6%', why: 'Core nursing path — hospitals, clinics, and healthcare systems always need RNs', salary: '$65k-90k' },
      { career: 'Travel Nurse', growth: '10%', why: 'Work at different hospitals on contract — pays significantly more than staff nursing', salary: '$80k-120k' },
      { career: 'Nurse Case Manager', growth: '9%', why: 'Coordinate patient care across settings — less bedside, more coordination', salary: '$70k-95k' },
      { career: 'Informatics Nurse', growth: '14%', why: 'Bridge nursing and health technology — growing specialty with strong pay', salary: '$75k-100k' },
      { career: 'Healthcare Administrator', growth: '29%', why: 'Your clinical credibility makes you a stronger healthcare manager than non-clinicians', salary: '$70k-100k' },
    ],
    struggles: 'Nursing school is demanding and many students underestimate the emotional and physical toll of bedside nursing. Burnout is real — the pandemic significantly worsened nurse burnout rates.',
    honest: 'Nursing has excellent job security and salaries that improve significantly with experience and specialization. Travel nursing pays premium rates. Nurse practitioners (NP) who pursue graduate degrees dramatically increase their earning potential.',
  },
  'music': {
    title: 'Music',
    intro: 'Music training develops discipline, precision, collaboration, creative problem-solving, and the ability to perform under pressure — skills that transfer into surprising professional contexts.',
    careers: [
      { career: 'Corporate Trainer', growth: '11%', why: 'Teaching and performing skills make you exceptional at presenting and facilitating', salary: '$55k-80k' },
      { career: 'Instructional Designer', growth: '9%', why: 'Creating engaging learning experiences draws on your performance and teaching instincts', salary: '$60k-90k' },
      { career: 'Audio/Video Producer', growth: '12%', why: 'Every company needs multimedia content — your technical audio skills apply', salary: '$50k-75k' },
      { career: 'Music Therapist', growth: '9%', why: 'Clinical work using musical training — requires board certification (MT-BC)', salary: '$45k-65k' },
      { career: 'Events Manager', growth: '18%', why: 'Your production and performance management experience applies to corporate events', salary: '$50k-70k' },
    ],
    struggles: 'Performance careers are genuinely competitive. Most musicians supplement with teaching, session work, or other income throughout their careers. Financial instability is real and the industry is difficult.',
    honest: 'If performance is your passion, pursue it — but build parallel skills. Music therapy requires additional certification. Corporate training and instructional design offer stable incomes using your teaching and performance skills.',
  },
  'philosophy': {
    title: 'Philosophy',
    intro: 'Philosophy trains you to think clearly, argue rigorously, identify logical fallacies, and understand complex ethical systems — surprisingly valuable in business, law, and tech.',
    careers: [
      { career: 'Business Analyst', growth: '14%', why: 'Your logic and critical thinking skills are exactly what companies need', salary: '$70k-95k' },
      { career: 'UX Researcher', growth: '18%', why: 'Understanding how people think and make decisions — philosophy applied to products', salary: '$75k-105k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Ethical reasoning and systematic analysis fit government and nonprofit work', salary: '$60k-90k' },
      { career: 'Compliance Officer', growth: '8%', why: 'Understanding rule systems and ethical frameworks fits compliance work perfectly', salary: '$65k-90k' },
      { career: 'Technical Writer', growth: '7%', why: 'Breaking down complex ideas clearly — your core philosophical skill', salary: '$60k-85k' },
    ],
    struggles: 'Philosophy majors face the classic translation challenge — your skills are real but require active translation into terms employers understand. Academic philosophy careers are extremely limited.',
    honest: 'Philosophy actually has stronger outcomes than its reputation suggests — particularly for law school and consulting. LSAT scores for philosophy majors are among the highest of any major. Business analyst and UX researcher are the strongest direct paths.',
  },
'physics': {
    title: 'Physics',
    intro: 'Physics is one of the most versatile STEM degrees. Your problem-solving, mathematical modeling, and analytical skills are in high demand in finance, tech, data science, and engineering.',
    careers: [
      { career: 'Data Scientist', growth: '35%', why: 'Physics problem-solving and math skills are ideal for data science', salary: '$85k-120k' },
      { career: 'Software Engineer', growth: '22%', why: 'Strong analytical problem-solving transfers directly to coding', salary: '$80k-130k' },
      { career: 'Quantitative Analyst', growth: '11%', why: 'Finance firms actively recruit physics graduates for modeling roles', salary: '$90k-150k' },
      { career: 'Cybersecurity Analyst', growth: '32%', why: 'Analytical and systems thinking is essential for security work', salary: '$70k-100k' },
      { career: 'Research Scientist (Industry)', growth: '8%', why: 'National labs and R&D departments value physics training', salary: '$75k-110k' },
    ],
    struggles: 'Physics graduates sometimes feel they need a graduate degree to do anything meaningful. You do not. Data science and software engineering actively recruit strong physics bachelor graduates.',
    honest: 'Physics is genuinely one of the strongest degrees for salary potential. Data science and quant finance are the highest-paying paths. The main challenge is learning to code if you have not already — Python is non-negotiable.',
  },

  'public-health': {
    title: 'Public Health',
    intro: 'Public health focuses on improving health outcomes at the population level — through policy, prevention, data, and community programs. Post-pandemic demand for public health professionals has never been stronger.',
    careers: [
      { career: 'Health Educator', growth: '7%', why: 'Design and deliver health education programs in communities and organizations', salary: '$50k-70k' },
      { career: 'Epidemiologist', growth: '26%', why: 'Track and analyze disease patterns — COVID dramatically increased demand', salary: '$60k-90k' },
      { career: 'Healthcare Data Analyst', growth: '23%', why: 'Apply your public health training to analyzing health data at scale', salary: '$60k-85k' },
      { career: 'Community Health Worker', growth: '12%', why: 'Connect communities with health resources — meaningful frontline work', salary: '$40k-60k' },
      { career: 'Public Health Program Manager', growth: '9%', why: 'Manage public health programs at government agencies and nonprofits', salary: '$55k-80k' },
    ],
    struggles: 'Public health starting salaries at the bachelor level are often lower than students expect. Government hiring can be slow. Many higher-level roles prefer or require an MPH degree.',
    honest: 'Public health has strong long-term prospects but starting salaries are modest ($45-65k). An MPH significantly improves earning potential. Healthcare data analytics is the highest-paying path accessible with a bachelor degree.',
  },

  'statistics': {
    title: 'Statistics',
    intro: 'Statistics is one of the most employable quantitative degrees available. Data-driven decision making has made statisticians essential in tech, healthcare, finance, government, and research.',
    careers: [
      { career: 'Data Analyst', growth: '23%', why: 'Your statistical foundation is exactly what data roles need', salary: '$65k-90k' },
      { career: 'Data Scientist', growth: '35%', why: 'Statistics is the theoretical backbone of data science', salary: '$85k-120k' },
      { career: 'Biostatistician', growth: '26%', why: 'Analyze clinical trial and health data — strong demand in pharma and research', salary: '$75k-105k' },
      { career: 'Actuarial Analyst', growth: '21%', why: 'Risk assessment in insurance — your statistical training is ideal', salary: '$70k-100k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Apply statistical methods to understand consumer behavior', salary: '$55k-80k' },
    ],
    struggles: 'Statistics without programming skills is increasingly limited. R and Python are essentially required in most data roles. Pure statisticians without coding skills compete poorly against data science graduates.',
    honest: 'Statistics with Python or R is one of the strongest degree combinations in the job market. Starting salaries are excellent ($65-85k). Biostatistics is particularly well-paid and has strong demand in pharma and clinical research.',
  },
  'political-science': {
    title: 'Political Science',
    intro: 'Political science teaches you how institutions work, how to analyze policy, and how to communicate persuasively — more applicable to business and beyond government than most students realize.',
    careers: [
      { career: 'Policy Analyst', growth: '6%', why: 'Work for government agencies, nonprofits, or think tanks analyzing policy', salary: '$60k-90k' },
      { career: 'Government Relations Specialist', growth: '7%', why: 'Help companies navigate regulation and policy — well-paid corporate role', salary: '$70k-110k' },
      { career: 'Compliance Officer', growth: '8%', why: 'Your understanding of regulations and institutions fits compliance perfectly', salary: '$65k-90k' },
      { career: 'Corporate Communications Specialist', growth: '8%', why: 'Political communications skills translate directly to corporate messaging', salary: '$55k-80k' },
      { career: 'Nonprofit Manager', growth: '9%', why: 'Lead advocacy organizations and social impact programs', salary: '$50k-75k' },
    ],
    struggles: 'Many polisci grads default to law school or government without considering corporate paths. Government entry-level salaries can be low and advancement slow. Law school is expensive and competitive.',
    honest: 'Government relations and compliance are well-paying corporate roles that directly use your degree without requiring law school. Worth seriously considering before assuming JD is your only option.',
  },


  'psychology': {
    title: 'Psychology',
    intro: 'Psychology teaches you to understand human behavior — one of the most valuable skills in the modern workplace. You do not need a graduate degree to build a strong career using it.',
    careers: [
      { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior is exactly what tech product teams need', salary: '$70k-95k' },
      { career: 'Human Resources Specialist', growth: '10%', why: 'Your understanding of people is valuable in every organization', salary: '$50k-70k' },
      { career: 'Case Manager', growth: '12%', why: 'High demand in healthcare and social services — directly uses your degree', salary: '$40k-55k' },
      { career: 'Behavioral Health Technician', growth: '15%', why: 'Tons of openings, directly accessible with a bachelor\'s degree', salary: '$35k-50k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Study consumer behavior and trends — psychology applied to business', salary: '$55k-75k' },
      { career: 'Training & Development Specialist', growth: '11%', why: 'Help employees learn and grow — understanding behavior is central', salary: '$55k-80k' },
    ],
    struggles: 'Most clinical work requires graduate degrees. Many psychology grads feel stuck between clinical paths (require grad school) and not knowing what else to do with the degree.',
    honest: 'UX research pays significantly more than most clinical positions at the bachelor level. If you are not committed to clinical work, UX research and market research offer strong careers without grad school debt.',
  },
  'sociology': {
    title: 'Sociology',
    intro: 'Sociology teaches you to understand how groups and systems work — directly applicable to HR, organizational behavior, market research, community development, and policy.',
    careers: [
      { career: 'Human Resources Specialist', growth: '10%', why: 'Understanding group dynamics and organizational behavior is core to HR', salary: '$50k-75k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Study social trends and consumer behavior patterns', salary: '$55k-80k' },
      { career: 'Case Manager', growth: '12%', why: 'High demand in social services — directly uses your degree', salary: '$40k-55k' },
      { career: 'Diversity & Inclusion Manager', growth: '11%', why: 'Create equitable workplaces using your social science background', salary: '$65k-95k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Your understanding of social systems applies directly to policy work', salary: '$55k-80k' },
    ],
    struggles: 'Sociology shares the translation challenge of other social sciences. Learning to connect your understanding of social systems to specific business or organizational problems is key.',
    honest: 'Sociology has similar outcomes to psychology at the bachelor level. HR and market research are the strongest direct paths. Adding data skills (SPSS, R, or Python) significantly improves starting salary and career trajectory.',
  },

   'aerospace-engineering': {
    title: 'Aerospace Engineering',
    intro: 'Aerospace engineering is one of the most specialized and prestigious engineering degrees. The skills you build — thermodynamics, fluid mechanics, systems thinking — transfer well beyond aviation and defense.',
    careers: [
      { career: 'Systems Engineer', growth: '6%', why: 'Your systems thinking applies to any complex product — defense, tech, manufacturing', salary: '$75k-105k' },
      { career: 'Project Engineer', growth: '8%', why: 'Managing technical projects is a natural fit for your structured training', salary: '$70k-95k' },
      { career: 'Data Analyst (Engineering)', growth: '23%', why: 'Your analytical background is highly valued in data roles across industries', salary: '$65k-90k' },
      { career: 'Technical Sales Engineer', growth: '6%', why: 'Companies pay well for engineers who can explain complex products to customers', salary: '$75k-110k' },
    ],
    struggles: 'Aerospace grads often feel locked into defense or aviation — two industries that can be slow to hire and heavily dependent on government contracts. The skills transfer much more broadly than most students realize.',
    honest: 'Starting salaries are strong ($70-85k average) but the industry is cyclical. Defense spending fluctuates, and commercial aviation is sensitive to economic downturns. Having transferable skills is important insurance.',
  },
  'biomedical-engineering': {
    title: 'Biomedical Engineering',
    intro: 'Biomedical engineering sits at the intersection of engineering and medicine — one of the fastest growing fields as healthcare technology expands rapidly.',
    careers: [
      { career: 'Clinical Engineer', growth: '10%', why: 'Maintain and improve medical equipment in hospitals — high demand everywhere', salary: '$60k-85k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA approval for medical devices — your technical background is essential', salary: '$65k-95k' },
      { career: 'Quality Engineer (Medical Devices)', growth: '9%', why: 'Ensure medical products meet safety standards — critical and well-paid role', salary: '$65k-90k' },
      { career: 'Research & Development Engineer', growth: '8%', why: 'Develop new medical technologies at device companies', salary: '$70k-100k' },
      { career: 'Data Analyst (Healthcare)', growth: '23%', why: 'Healthcare data is exploding — your technical background helps you understand it', salary: '$65k-90k' },
    ],
    struggles: 'Many BME grads expect to go straight into exciting medical device development but entry-level roles are often in quality, regulatory, or clinical support. These are strong career foundations, not dead ends.',
    honest: 'BME has strong job prospects but many graduates underestimate how much regulatory knowledge matters. Learning FDA processes early gives you a significant advantage. Grad school is common but not required for good roles.',
  },
  'chemical-engineering': {
    title: 'Chemical Engineering',
    intro: 'Chemical engineering is one of the highest-paying engineering degrees at entry level. Your process thinking, thermodynamics, and analytical skills are valuable across energy, pharma, food, and manufacturing.',
    careers: [
      { career: 'Process Engineer', growth: '8%', why: 'Optimize manufacturing and production processes — core ChemE role, high demand', salary: '$70k-95k' },
      { career: 'Petroleum Engineer', growth: '2%', why: 'High pay but volatile field — oil prices directly impact hiring', salary: '$85k-120k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Your chemistry knowledge is essential for FDA/EPA compliance roles', salary: '$65k-95k' },
      { career: 'Environmental Engineer', growth: '4%', why: 'Growing field as sustainability regulations tighten', salary: '$60k-85k' },
      { career: 'Data Scientist (Manufacturing)', growth: '35%', why: 'Process optimization using data — your analytical skills translate directly', salary: '$80k-115k' },
    ],
    struggles: 'Chemical engineering salaries are strong but many students end up in industries they did not expect — food production, pharmaceuticals, consumer goods — rather than the exciting tech or energy roles they imagined.',
    honest: 'ChemE has one of the highest average starting salaries of any engineering degree ($75-85k). Petroleum engineering pays the most but is extremely volatile. Pharma and food manufacturing offer stability.',
  },
  'civil-engineering': {
    title: 'Civil Engineering',
    intro: 'Civil engineering builds the infrastructure that society runs on. The job market is steady and driven significantly by government spending on infrastructure — making it more recession-resistant than many fields.',
    careers: [
      { career: 'Structural Engineer', growth: '5%', why: 'Design buildings, bridges, and infrastructure — core civil engineering path', salary: '$65k-90k' },
      { career: 'Transportation Engineer', growth: '6%', why: 'Plan and design roads, highways, and transit systems', salary: '$65k-90k' },
      { career: 'Environmental Engineer', growth: '4%', why: 'Water treatment, waste management, environmental compliance', salary: '$60k-85k' },
      { career: 'Construction Project Manager', growth: '8%', why: 'Oversee construction projects from planning to completion', salary: '$70k-100k' },
      { career: 'GIS Analyst', growth: '14%', why: 'Geographic information systems — your spatial thinking applies directly', salary: '$55k-80k' },
    ],
    struggles: 'Civil engineering salaries start lower than other engineering disciplines ($60-70k average vs $75-85k for CS or ChemE). PE licensure is expected for career advancement and takes years to achieve.',
    honest: 'Civil engineering is stable but not flashy. Infrastructure spending drives demand and that has been strong in recent years. The path to PE licensure takes 4+ years post-graduation — factor this into your planning.',
  },
  'computer-engineering': {
    title: 'Computer Engineering',
    intro: 'Computer engineering combines electrical engineering and computer science — making you one of the most versatile engineers in the job market. You can work on hardware, software, or the critical layer between them.',
    careers: [
      { career: 'Embedded Systems Engineer', growth: '7%', why: 'Program the computers inside devices — cars, appliances, medical equipment', salary: '$80k-115k' },
      { career: 'Hardware Engineer', growth: '5%', why: 'Design and test computer chips, circuit boards, and hardware systems', salary: '$80k-115k' },
      { career: 'Software Engineer', growth: '22%', why: 'Your CS background qualifies you for most software roles', salary: '$85k-120k' },
      { career: 'Cybersecurity Engineer', growth: '32%', why: 'Your hardware knowledge is valuable for security at the system level', salary: '$85k-120k' },
      { career: 'Systems Architect', growth: '9%', why: 'Design complex technical systems — requires both hardware and software understanding', salary: '$95k-135k' },
    ],
    struggles: 'Computer engineering students sometimes feel caught between two worlds — not quite a software engineer, not quite an electrical engineer. This is actually a strength in roles that require understanding both.',
    honest: 'Computer engineering has some of the strongest starting salaries of any engineering degree. Embedded systems is a particularly underrated path — high demand, less competition than pure software roles, strong pay.',
  },
  'electrical-engineering': {
    title: 'Electrical Engineering',
    intro: 'Electrical engineering is foundational to nearly every technology industry. From power grids to consumer electronics to autonomous vehicles — EEs are in demand across more sectors than almost any other engineering discipline.',
    careers: [
      { career: 'Electrical Design Engineer', growth: '6%', why: 'Design electrical systems for buildings, products, and infrastructure', salary: '$75k-105k' },
      { career: 'Power Systems Engineer', growth: '5%', why: 'Grid modernization and renewable energy are driving significant demand', salary: '$75k-105k' },
      { career: 'Embedded Systems Engineer', growth: '7%', why: 'Program electronics inside devices — cars, IoT, consumer products', salary: '$80k-115k' },
      { career: 'RF/Communications Engineer', growth: '5%', why: '5G expansion is creating strong demand for RF engineering expertise', salary: '$80k-115k' },
      { career: 'Test Engineer', growth: '6%', why: 'Validate that electrical systems work correctly — high demand in manufacturing', salary: '$65k-90k' },
    ],
    struggles: 'EE is broad and students often feel unsure which specialization to pursue. Power, RF, embedded, and control systems are very different tracks — the sooner you specialize the better.',
    honest: 'Electrical engineering has strong salaries ($75-90k average starting) and stable demand. The renewable energy transition is creating particularly strong demand for power systems engineers. PE licensure matters for some roles.',
  },
  'engineering-physics': {
    title: 'Engineering Physics',
    intro: 'Engineering physics is one of the most rigorous and flexible degrees available. You graduate with deep analytical skills that apply to cutting-edge fields — quantum computing, photonics, advanced materials, and more.',
    careers: [
      { career: 'Research Engineer', growth: '8%', why: 'National labs, R&D departments, and tech companies need your analytical depth', salary: '$75k-110k' },
      { career: 'Data Scientist', growth: '35%', why: 'Your mathematical and physics background is ideal for complex data problems', salary: '$85k-120k' },
      { career: 'Optical/Photonics Engineer', growth: '10%', why: 'Lasers, fiber optics, imaging systems — growing field with specialized demand', salary: '$80k-115k' },
      { career: 'Quantitative Analyst', growth: '11%', why: 'Finance firms actively recruit physics and engineering physics graduates', salary: '$90k-150k' },
    ],
    struggles: 'Engineering physics is genuinely hard to explain to employers. Most recruiters do not know what it is. You need to be very good at translating your skills into terms hiring managers understand.',
    honest: 'Engineering physics grads who can communicate their skills well have excellent outcomes. Grad school is common and often the clearest path. Without grad school, leading with your math and programming skills gets the best results.',
  },
  'environmental-engineering': {
    title: 'Environmental Engineering',
    intro: 'Environmental engineering is growing steadily as climate change, sustainability regulations, and infrastructure investment create ongoing demand. You sit at the intersection of engineering, science, and policy.',
    careers: [
      { career: 'Environmental Engineer', growth: '4%', why: 'Water treatment, air quality, waste management — core environmental engineering roles', salary: '$60k-85k' },
      { career: 'Sustainability Engineer', growth: '12%', why: 'Companies increasingly need engineers who understand environmental impact', salary: '$65k-90k' },
      { career: 'Remediation Engineer', growth: '6%', why: 'Clean up contaminated sites — steady government and private sector demand', salary: '$60k-85k' },
      { career: 'Environmental Consultant', growth: '8%', why: 'Help companies comply with environmental regulations', salary: '$60k-90k' },
      { career: 'Water Resources Engineer', growth: '5%', why: 'Water infrastructure is critically underfunded and needs engineers urgently', salary: '$65k-90k' },
    ],
    struggles: 'Environmental engineering salaries start lower than other engineering disciplines. Many roles are government or consulting sector which can feel less dynamic than tech or product companies.',
    honest: 'Environmental engineering has strong long-term prospects as climate regulations tighten globally. Starting salaries are lower ($60-70k) but PE licensure and specialization in water or remediation improve earnings significantly.',
  },
  'industrial-engineering': {
    title: 'Industrial Engineering',
    intro: 'Industrial engineering is one of the most versatile engineering degrees — you optimize systems, processes, and operations. This applies to manufacturing, healthcare, logistics, tech, and consulting.',
    careers: [
      { career: 'Operations Research Analyst', growth: '23%', why: 'Optimize complex systems using mathematical models — exactly what IE trains you for', salary: '$70k-100k' },
      { career: 'Supply Chain Engineer', growth: '18%', why: 'Design and optimize supply chain systems — massive demand post-pandemic', salary: '$65k-95k' },
      { career: 'Process Improvement Engineer', growth: '10%', why: 'Lean/Six Sigma process optimization across industries', salary: '$65k-90k' },
      { career: 'Management Consultant', growth: '11%', why: 'Your systems thinking is extremely valuable in consulting', salary: '$75k-110k' },
      { career: 'Data Analyst', growth: '23%', why: 'Your analytical background translates directly to data roles', salary: '$65k-90k' },
    ],
    struggles: 'Industrial engineers sometimes feel their degree is less prestigious than other engineering disciplines. This is wrong — IE is one of the most versatile and consistently employed engineering fields.',
    honest: 'Industrial engineering has one of the broadest applicability of any engineering degree. If you are unsure what industry you want to work in, IE gives you the most flexibility. Starting salaries average $68-78k.',
  },
  'materials-science-engineering': {
    title: 'Materials Science Engineering',
    intro: 'Materials science engineering is foundational to every physical product — from semiconductors to medical implants to aerospace components. The field is growing rapidly with clean energy and advanced manufacturing.',
    careers: [
      { career: 'Materials Engineer', growth: '6%', why: 'Develop and test materials for products across industries', salary: '$70k-95k' },
      { career: 'Process Engineer (Semiconductor)', growth: '9%', why: 'Semiconductor manufacturing needs materials expertise urgently', salary: '$80k-110k' },
      { career: 'Quality Engineer', growth: '9%', why: 'Ensure materials meet specifications — high demand in manufacturing', salary: '$65k-90k' },
      { career: 'Research Scientist (Industry)', growth: '8%', why: 'R&D roles at materials companies, national labs, and tech firms', salary: '$70k-100k' },
    ],
    struggles: 'Materials science is not well understood by most employers outside of manufacturing and research. Students often need to be proactive about connecting their skills to industry needs.',
    honest: 'Materials science is genuinely niche but has strong demand in semiconductor, aerospace, and clean energy sectors. Grad school is common but not required. Semiconductor roles are particularly hot right now due to chip manufacturing investment.',
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
    intro: 'Software engineering is one of the most in-demand degrees in the world. Unlike computer science which is more theoretical, software engineering is specifically designed for building production software systems.',
    careers: [
      { career: 'Software Engineer', growth: '22%', why: 'Core role — building applications, systems, and platforms', salary: '$90k-130k' },
      { career: 'DevOps/Platform Engineer', growth: '19%', why: 'Build and maintain the infrastructure that software runs on', salary: '$90k-130k' },
      { career: 'Full Stack Developer', growth: '22%', why: 'Build both front-end and back-end systems — highly versatile', salary: '$85k-120k' },
      { career: 'Quality Assurance Engineer', growth: '9%', why: 'Ensure software works correctly — often overlooked but well-paid path', salary: '$70k-95k' },
      { career: 'Product Manager (Technical)', growth: '19%', why: 'Your engineering background makes you a stronger PM than most', salary: '$90k-130k' },
    ],
    struggles: 'The software engineering job market tightened significantly in 2023-2024 after a period of massive over-hiring. Entry-level roles are more competitive than they were two years ago.',
    honest: 'Software engineering still has excellent long-term prospects and among the highest starting salaries of any degree ($90-100k average). The immediate market is more competitive than 2020-2022. Internships and portfolio projects matter more than ever.',
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
    ],
    struggles: 'Publishing, screenwriting, and literary careers are extremely competitive with very limited openings. Most creative writing grads who thrive professionally pivot to applied writing roles in tech or business.',
    honest: 'Being a professional novelist or screenwriter is genuinely difficult — not impossible, but the odds are long. UX writing and content strategy offer strong salaries using the same core skills. Many successful creative writers do both.',
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
    ],
    struggles: 'Traditional film and TV industry jobs are extremely competitive, geographically concentrated (LA, NYC), and increasingly disrupted by streaming. The industry has contracted significantly with Hollywood strikes and streaming cutbacks.',
    honest: 'Film industry careers are genuinely difficult to break into and sustain. Corporate video production, content marketing, and social media offer more accessible paths using similar skills. Many film grads build hybrid careers.',
  },
  'fine-arts': {
    title: 'Fine Arts / Studio Art',
    intro: 'Fine arts develops your visual thinking, creative problem-solving, and ability to communicate through imagery — skills that are surprisingly in demand in the digital economy.',
    careers: [
      { career: 'UX/UI Designer', growth: '16%', why: 'Your visual training and design sensibility directly apply to digital product design', salary: '$70k-100k' },
      { career: 'Graphic Designer', growth: '3%', why: 'Apply visual skills to commercial design — corporate design pays better than freelance', salary: '$50k-70k' },
      { career: 'Art Director', growth: '6%', why: 'Lead creative teams and visual strategy — requires experience but strong pay', salary: '$75k-110k' },
      { career: 'Social Media Content Creator', growth: '10%', why: 'Visual content creation is your strength — brands pay well for quality creative', salary: '$45k-70k' },
      { career: 'Exhibit/Experience Designer', growth: '8%', why: 'Design physical and digital experiences for museums, brands, and events', salary: '$50k-75k' },
    ],
    struggles: 'Fine arts has one of the most challenging direct career paths of any degree. The starving artist stereotype exists for a reason — pure studio art careers are difficult to sustain financially.',
    honest: 'The fine arts grads who do best financially make a deliberate pivot to applied design — UX, graphic design, art direction. Learning Figma, Adobe Suite, and basic web design dramatically improves your options. Your aesthetic sense is genuinely valuable.',
  },
  'gender-womens-studies': {
    title: "Gender / Women's Studies",
    intro: "Gender and women's studies develops your ability to analyze systems, understand power dynamics, and advocate for equity — skills that are increasingly valued in HR, nonprofit, policy, and corporate DEI work.",
    careers: [
      { career: 'Diversity, Equity & Inclusion Specialist', growth: '15%', why: 'Your analytical framework for understanding equity is directly applicable', salary: '$60k-90k' },
      { career: 'Nonprofit Program Manager', growth: '9%', why: 'Run advocacy and social service programs aligned with your values', salary: '$50k-75k' },
      { career: 'Human Resources Specialist', growth: '10%', why: 'Your understanding of workplace equity and policy fits HR well', salary: '$50k-70k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Analyze and advocate for policy at government agencies and think tanks', salary: '$55k-80k' },
      { career: 'Community Organizer/Advocate', growth: '8%', why: 'Lead advocacy campaigns and community programs', salary: '$40k-60k' },
    ],
    struggles: 'Gender studies is not well understood by many employers and requires significant translation work. DEI roles, while growing, have also faced backlash in some corporate environments in recent years.',
    honest: 'This degree works best when combined with practical skills — data analysis, project management, grant writing — that make your advocacy work measurable and fundable. Graduate school is common for higher-level roles.',
  },
  'journalism': {
    title: 'Journalism',
    intro: 'Journalism trains you to find truth, communicate clearly, work under pressure, and hold the powerful accountable. These skills are genuinely valuable — even as the traditional journalism industry has contracted dramatically.',
    careers: [
      { career: 'Content Strategist', growth: '15%', why: 'Your editorial judgment and audience understanding apply directly to content strategy', salary: '$60k-85k' },
      { career: 'Communications Manager', growth: '8%', why: 'Write and manage communications for organizations — your journalism skills transfer', salary: '$60k-85k' },
      { career: 'UX Writer', growth: '23%', why: 'Journalism trains you to write clearly for audiences — UX writing is similar', salary: '$75k-100k' },
      { career: 'Public Relations Specialist', growth: '8%', why: 'Understanding how journalists think makes you a more effective PR professional', salary: '$50k-70k' },
      { career: 'Technical Writer', growth: '7%', why: 'Explain complex topics clearly — core journalism skill applied to technical content', salary: '$60k-80k' },
    ],
    struggles: 'Traditional journalism jobs — newspapers, magazines, broadcast — have contracted dramatically. Thousands of newsroom jobs have disappeared in the past decade. Local news is in genuine crisis.',
    honest: 'If your goal is traditional journalism, go in with clear eyes — the industry is difficult and pay is often low. Content strategy, communications, and UX writing offer similar intellectual work with significantly better pay and stability.',
  },
  'theater': {
    title: 'Theater / Drama',
    intro: 'Theater training develops discipline, presence, collaboration, and the ability to connect with audiences — skills that translate into surprising places in the professional world.',
    careers: [
      { career: 'Corporate Trainer', growth: '11%', why: 'Your performance and teaching skills make you exceptional at presenting and facilitating', salary: '$55k-80k' },
      { career: 'User Experience Researcher', growth: '18%', why: 'Empathy, observation, and human behavior — core theater skills applied to product design', salary: '$70k-95k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Your ability to connect with people and adapt to your audience is a real differentiator', salary: '$55k-80k' },
      { career: 'Communications Specialist', growth: '8%', why: 'Comfort speaking, presenting, and storytelling in professional contexts', salary: '$50k-70k' },
      { career: 'Events Manager', growth: '18%', why: 'Your production experience translates directly to corporate events', salary: '$50k-70k' },
    ],
    struggles: 'Professional acting and performance careers are among the most competitive in any field. Most actors supplement with other work throughout their careers. The financial instability is real.',
    honest: 'If performance is your passion, pursue it — but build parallel skills that pay the bills. Many theater grads build deeply satisfying careers in training, UX research, or communications while keeping performance as a serious side pursuit.',
  },
  'religious-studies': {
    title: 'Religious Studies',
    intro: 'Religious studies teaches you to analyze texts, understand diverse cultures, think philosophically, and engage with humanity\'s deepest questions. These skills are more transferable than most people realize.',
    careers: [
      { career: 'Nonprofit Program Manager', growth: '9%', why: 'Many nonprofits are faith-based or values-driven — your background is directly relevant', salary: '$50k-75k' },
      { career: 'Chaplain/Counselor', growth: '8%', why: 'Hospitals, military, and prisons employ chaplains — meaningful work with steady demand', salary: '$50k-75k' },
      { career: 'Community Outreach Coordinator', growth: '8%', why: 'Your understanding of diverse communities is valuable in outreach roles', salary: '$45k-65k' },
      { career: 'Policy Analyst', growth: '6%', why: 'Religion intersects with law, politics, and culture — your analytical skills apply', salary: '$55k-80k' },
      { career: 'Teacher/Educator', growth: '5%', why: 'Social studies, ethics, and humanities education at secondary level', salary: '$45k-65k' },
    ],
    struggles: 'Religious studies has one of the narrowest direct career paths of any humanities degree. Seminary and academic careers require significant additional education. Translation to secular careers requires deliberate effort.',
    honest: 'Religious studies works best as preparation for graduate school (divinity, law, social work) or in combination with practical skills. Nonprofit and faith-based organizations are the most natural professional homes.',
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

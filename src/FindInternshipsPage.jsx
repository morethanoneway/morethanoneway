import React, { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const FindInternshipsPage = ({ setCurrentPage }) => {
  const [selectedMajor, setSelectedMajor] = useState('');

  // Handle major selection
  const handleMajorChange = (major) => {
    setSelectedMajor(major);

    // Track major selection in Google Analytics
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'major_selected', {
        'event_category': 'Find Internships',
        'event_label': major,
        'value': 1
      });
    }
  };

  const majorData = {
    // BUSINESS MAJORS
    'Finance': {
      traditional: 'Finance Intern',
      alternatives: [
        { title: 'Financial Analyst Intern', why: 'Steady field with clear career progression', growth: '9%', pay: '$20-28/hr' },
        { title: 'Business Analyst Intern', why: 'Bridge between business needs and tech solutions', growth: '14%', pay: '$22-30/hr' },
        { title: 'Operations Analyst Intern', why: 'Make businesses run more efficiently', growth: '16%', pay: '$20-28/hr' },
        { title: 'Data Analyst Intern', why: 'Financial data analysis - growing rapidly', growth: '23%', pay: '$22-30/hr' },
        { title: 'Investment Banking Intern', why: 'High-paying path for finance majors', growth: '8%', pay: '$30-45/hr' },
        { title: 'Corporate Finance Intern', why: 'Work on company financial strategy and planning', growth: '10%', pay: '$22-32/hr' }
      ]
    },
    'Accounting': {
      traditional: 'Accounting Intern',
      alternatives: [
        { title: 'Tax Intern', why: 'Specialized accounting role - always in demand', growth: '6%', pay: '$18-26/hr' },
        { title: 'Audit Intern', why: 'Big 4 accounting firms hire many interns', growth: '6%', pay: '$20-28/hr' },
        { title: 'Financial Analyst Intern', why: 'Accounting skills translate to financial analysis', growth: '9%', pay: '$20-28/hr' },
        { title: 'Data Analyst Intern', why: 'Analyze financial data and identify trends', growth: '23%', pay: '$22-30/hr' },
        { title: 'Compliance Intern', why: 'Ensure companies follow financial regulations', growth: '8%', pay: '$20-26/hr' },
        { title: 'Business Operations Intern', why: 'Use accounting knowledge to optimize business processes', growth: '11%', pay: '$20-28/hr' }
      ]
    },
    'Marketing': {
      traditional: 'Marketing Intern',
      alternatives: [
        { title: 'Sales Operations Intern', why: 'Your communication skills + analytics, growing rapidly', growth: '23%', pay: '$20-28/hr' },
        { title: 'Customer Success Intern', why: 'Help clients succeed, relationship-focused', growth: '20%', pay: '$18-26/hr' },
        { title: 'Digital Marketing Analyst Intern', why: 'Data-driven marketing, less saturated than traditional marketing', growth: '17%', pay: '$18-26/hr' },
        { title: 'Product Marketing Intern', why: 'Bridge between product teams and customers', growth: '16%', pay: '$22-30/hr' },
        { title: 'Social Media Marketing Intern', why: 'Growing field - every company needs social presence', growth: '10%', pay: '$16-24/hr' },
        { title: 'Content Marketing Intern', why: 'Create content strategy and campaigns', growth: '15%', pay: '$18-26/hr' }
      ]
    },
    'Management': {
      traditional: 'Management Intern',
      alternatives: [
        { title: 'Operations Intern', why: 'Optimize business processes and efficiency', growth: '16%', pay: '$20-28/hr' },
        { title: 'Project Management Intern', why: 'Coordinate teams and timelines across projects', growth: '11%', pay: '$22-30/hr' },
        { title: 'Business Analyst Intern', why: 'Bridge business strategy and execution', growth: '14%', pay: '$22-30/hr' },
        { title: 'Human Resources Intern', why: 'People management and organizational development', growth: '10%', pay: '$18-26/hr' },
        { title: 'Supply Chain Intern', why: 'Growing field managing logistics and operations', growth: '18%', pay: '$20-28/hr' },
        { title: 'Consulting Intern', why: 'Problem-solving for diverse business challenges', growth: '13%', pay: '$26-36/hr' }
      ]
    },
    'Information Systems': {
      traditional: 'Information Systems Intern',
      alternatives: [
        { title: 'Business Analyst Intern', why: 'Bridge between business needs and tech solutions', growth: '14%', pay: '$22-30/hr' },
        { title: 'Data Analyst Intern', why: 'Analyze business data and create insights', growth: '23%', pay: '$22-32/hr' },
        { title: 'IT Project Coordinator Intern', why: 'Manage technology projects and implementations', growth: '11%', pay: '$20-28/hr' },
        { title: 'Systems Analyst Intern', why: 'Evaluate and improve business systems', growth: '10%', pay: '$22-30/hr' },
        { title: 'Product Manager Intern', why: 'Tech + business skills perfect for product management', growth: '19%', pay: '$24-34/hr' },
        { title: 'Technical Consultant Intern', why: 'Help companies implement technology solutions', growth: '13%', pay: '$24-32/hr' }
      ]
    },
    'Hospitality Management': {
      traditional: 'Hospitality Management Intern',
      alternatives: [
        { title: 'Event Coordinator Intern', why: 'Plan and execute events for companies', growth: '18%', pay: '$16-24/hr' },
        { title: 'Operations Intern', why: 'Service operations skills apply beyond hospitality', growth: '16%', pay: '$18-26/hr' },
        { title: 'Customer Experience Intern', why: 'Your service mindset helps improve customer journeys', growth: '15%', pay: '$18-26/hr' },
        { title: 'Sales Intern', why: 'Relationship skills from hospitality translate to sales', growth: '7%', pay: '$18-26/hr' },
        { title: 'Human Resources Intern', why: 'People management skills are core to HR', growth: '10%', pay: '$18-24/hr' },
        { title: 'Marketing Intern', why: 'Understanding customer experience helps marketing', growth: '10%', pay: '$17-24/hr' }
      ]
    },
    'Supply Chain Management': {
      traditional: 'Supply Chain Intern',
      alternatives: [
        { title: 'Operations Analyst Intern', why: 'Optimize processes and workflows', growth: '16%', pay: '$20-28/hr' },
        { title: 'Logistics Coordinator Intern', why: 'Manage transportation and distribution', growth: '12%', pay: '$18-26/hr' },
        { title: 'Data Analyst Intern', why: 'Analyze supply chain data and metrics', growth: '23%', pay: '$22-30/hr' },
        { title: 'Procurement Intern', why: 'Sourcing and vendor management', growth: '8%', pay: '$18-26/hr' },
        { title: 'Inventory Analyst Intern', why: 'Optimize stock levels and forecasting', growth: '10%', pay: '$18-26/hr' },
        { title: 'Business Analyst Intern', why: 'Process improvement and systems thinking', growth: '14%', pay: '$22-30/hr' }
      ]
    },
    'International Business': {
      traditional: 'International Business Intern',
      alternatives: [
        { title: 'Business Development Intern', why: 'Global perspective valuable for growth roles', growth: '10%', pay: '$20-28/hr' },
        { title: 'Market Research Analyst Intern', why: 'Research international markets and trends', growth: '13%', pay: '$20-28/hr' },
        { title: 'Trade Compliance Intern', why: 'Navigate international regulations and customs', growth: '9%', pay: '$20-28/hr' },
        { title: 'Global Supply Chain Intern', why: 'Manage international logistics', growth: '18%', pay: '$20-28/hr' },
        { title: 'International Sales Intern', why: 'Cultural understanding helps in global sales', growth: '7%', pay: '$18-26/hr' },
        { title: 'Consulting Intern', why: 'Global business knowledge valued in consulting', growth: '13%', pay: '$26-36/hr' }
      ]
    },
    'Entrepreneurship': {
      traditional: 'Business Development Intern',
      alternatives: [
        { title: 'Startup Operations Intern', why: 'Get hands-on experience in growing companies', growth: '22%', pay: '$18-28/hr' },
        { title: 'Product Manager Intern', why: 'Entrepreneurial thinking essential for product roles', growth: '19%', pay: '$24-34/hr' },
        { title: 'Marketing Intern', why: 'Growth mindset applies to marketing roles', growth: '10%', pay: '$17-24/hr' },
        { title: 'Sales Development Intern', why: 'Drive business growth through sales', growth: '8%', pay: '$18-26/hr' },
        { title: 'Venture Capital Intern', why: 'Work with startups and investors', growth: '15%', pay: '$22-32/hr' },
        { title: 'Business Analyst Intern', why: 'Analyze opportunities and business models', growth: '14%', pay: '$22-30/hr' }
      ]
    },
    'Economics': {
      traditional: 'Economics Research Intern',
      alternatives: [
        { title: 'Data Analyst Intern', why: 'Quantitative skills perfect for data analysis', growth: '23%', pay: '$22-30/hr' },
        { title: 'Financial Analyst Intern', why: 'Economic analysis applies directly to finance', growth: '9%', pay: '$20-28/hr' },
        { title: 'Policy Analyst Intern', why: 'Work for government, nonprofits, or think tanks', growth: '6%', pay: '$18-26/hr' },
        { title: 'Market Research Analyst Intern', why: 'Study economic trends and consumer behavior', growth: '13%', pay: '$20-28/hr' },
        { title: 'Business Intelligence Intern', why: 'Analyze business data for strategic decisions', growth: '15%', pay: '$22-30/hr' },
        { title: 'Quantitative Analyst Intern', why: 'Finance firms value economics backgrounds', growth: '11%', pay: '$26-36/hr' }
      ]
    },

    // LIBERAL ARTS MAJORS
    'Communications': {
      traditional: 'Communications Intern',
      alternatives: [
        { title: 'Corporate Communications Intern', why: 'Every company needs internal/external communication strategy', growth: '8%', pay: '$18-26/hr' },
        { title: 'Public Relations Intern', why: 'Manage company reputation and media relations', growth: '8%', pay: '$18-24/hr' },
        { title: 'Social Media Manager Intern', why: 'Your understanding of messaging applies to digital platforms', growth: '10%', pay: '$16-24/hr' },
        { title: 'Content Strategist Intern', why: 'Plan and manage content across organizations', growth: '15%', pay: '$20-28/hr' },
        { title: 'Marketing Intern', why: 'Communication skills essential for marketing', growth: '10%', pay: '$17-24/hr' },
        { title: 'UX Writer Intern', why: 'Write clear copy for apps and websites', growth: '23%', pay: '$22-32/hr' }
      ]
    },
    'Psychology': {
      traditional: 'Psychology Research Intern',
      alternatives: [
        { title: 'UX Research Intern', why: 'Understanding human behavior is exactly what tech companies need', growth: '18%', pay: '$22-32/hr' },
        { title: 'HR Intern', why: 'Your understanding of people is valuable in every organization', growth: '10%', pay: '$18-26/hr' },
        { title: 'Market Research Analyst Intern', why: 'Study consumer behavior and trends', growth: '13%', pay: '$20-28/hr' },
        { title: 'Data Analyst Intern', why: 'Analyze behavioral data and patterns', growth: '23%', pay: '$22-30/hr' },
        { title: 'Training & Development Intern', why: 'Help employees learn and grow', growth: '11%', pay: '$18-26/hr' },
        { title: 'Customer Success Intern', why: 'Use psychology knowledge to help clients', growth: '20%', pay: '$18-26/hr' }
      ]
    },
    'English': {
      traditional: 'Editorial Intern',
      alternatives: [
        { title: 'Technical Writer Intern', why: 'Your writing skills are desperately needed in tech companies', growth: '7%', pay: '$20-28/hr' },
        { title: 'UX Writer Intern', why: 'Make apps and websites easier to understand - storytelling for digital', growth: '23%', pay: '$22-32/hr' },
        { title: 'Content Strategist Intern', why: 'Plan and manage content across organizations', growth: '15%', pay: '$20-28/hr' },
        { title: 'Marketing Content Intern', why: 'Write compelling marketing copy and campaigns', growth: '10%', pay: '$18-26/hr' },
        { title: 'Communications Intern', why: 'Strong writing skills valuable for corporate communications', growth: '8%', pay: '$18-26/hr' },
        { title: 'Social Media Content Intern', why: 'Create engaging content for social platforms', growth: '10%', pay: '$16-24/hr' }
      ]
    },
    'History': {
      traditional: 'Museum/Archives Intern',
      alternatives: [
        { title: 'Research Analyst Intern', why: 'Your research skills apply beyond academia - companies need deep analysis', growth: '11%', pay: '$20-28/hr' },
        { title: 'Content Writer Intern', why: 'Research and writing skills for content creation', growth: '8%', pay: '$18-26/hr' },
        { title: 'Policy Analyst Intern', why: 'Government and nonprofits need research and analytical skills', growth: '6%', pay: '$18-26/hr' },
        { title: 'Data Analyst Intern', why: 'Historical analysis skills transfer to data analysis', growth: '23%', pay: '$22-30/hr' },
        { title: 'Compliance Intern', why: 'Understanding regulations and documentation', growth: '8%', pay: '$20-26/hr' },
        { title: 'Market Research Intern', why: 'Research methodology applies to business insights', growth: '13%', pay: '$20-28/hr' }
      ]
    },
    'Sociology': {
      traditional: 'Social Research Intern',
      alternatives: [
        { title: 'Market Research Analyst Intern', why: 'Study social trends and consumer behavior patterns', growth: '13%', pay: '$20-28/hr' },
        { title: 'HR Intern', why: 'Understanding group dynamics and organizational behavior', growth: '10%', pay: '$18-26/hr' },
        { title: 'Data Analyst Intern', why: 'Analyze social data and identify patterns', growth: '23%', pay: '$22-30/hr' },
        { title: 'UX Research Intern', why: 'Study user behavior and social interactions', growth: '18%', pay: '$22-32/hr' },
        { title: 'Community Outreach Intern', why: 'Work with nonprofits and government on social programs', growth: '8%', pay: '$16-24/hr' },
        { title: 'Policy Analyst Intern', why: 'Analyze social policy and programs', growth: '6%', pay: '$18-26/hr' }
      ]
    },
    'Political Science': {
      traditional: 'Policy Research Intern',
      alternatives: [
        { title: 'Government Relations Intern', why: 'Work with companies on public policy and advocacy', growth: '8%', pay: '$18-26/hr' },
        { title: 'Campaign Analyst Intern', why: 'Political campaigns need data and strategy', growth: '12%', pay: '$16-24/hr' },
        { title: 'Policy Analyst Intern', why: 'Research and analyze public policy', growth: '6%', pay: '$18-26/hr' },
        { title: 'Compliance Intern', why: 'Navigate regulations and government requirements', growth: '8%', pay: '$20-26/hr' },
        { title: 'Nonprofit Program Intern', why: 'Work on advocacy and social programs', growth: '9%', pay: '$16-24/hr' },
        { title: 'Market Research Intern', why: 'Research and analytical skills apply to business', growth: '13%', pay: '$20-28/hr' }
      ]
    },
    'Philosophy': {
      traditional: 'Research Assistant Intern',
      alternatives: [
        { title: 'UX Research Intern', why: 'Critical thinking about human experience applies to product design', growth: '18%', pay: '$22-32/hr' },
        { title: 'Content Strategist Intern', why: 'Logical thinking helps structure information', growth: '15%', pay: '$20-28/hr' },
        { title: 'Consulting Intern', why: 'Problem-solving and analytical skills valued', growth: '13%', pay: '$26-36/hr' },
        { title: 'Technical Writer Intern', why: 'Clarity in communication - philosophy trains this', growth: '7%', pay: '$20-28/hr' },
        { title: 'Data Analyst Intern', why: 'Logical reasoning applies to data interpretation', growth: '23%', pay: '$22-30/hr' },
        { title: 'Ethics Compliance Intern', why: 'Philosophical training perfect for ethics roles', growth: '9%', pay: '$18-26/hr' }
      ]
    },
    'Anthropology': {
      traditional: 'Research Assistant Intern',
      alternatives: [
        { title: 'UX Research Intern', why: 'Understanding human behavior and culture is exactly what product teams need', growth: '18%', pay: '$22-32/hr' },
        { title: 'Market Research Analyst Intern', why: 'Study consumer behavior and cultural trends', growth: '13%', pay: '$20-28/hr' },
        { title: 'Diversity & Inclusion Intern', why: 'Your cultural understanding helps create inclusive workplaces', growth: '11%', pay: '$18-26/hr' },
        { title: 'Content Strategist Intern', why: 'Understanding audiences for better content', growth: '15%', pay: '$20-28/hr' },
        { title: 'Nonprofit Program Intern', why: 'Work with communities and cultural organizations', growth: '9%', pay: '$16-24/hr' },
        { title: 'HR Intern', why: 'Understanding people and culture fits HR perfectly', growth: '10%', pay: '$18-26/hr' }
      ]
    },
    'Journalism': {
      traditional: 'Journalism Intern',
      alternatives: [
        { title: 'Content Writer Intern', why: 'Writing and storytelling skills in demand everywhere', growth: '8%', pay: '$18-26/hr' },
        { title: 'Communications Intern', why: 'Media skills apply to corporate communications', growth: '8%', pay: '$18-26/hr' },
        { title: 'Social Media Manager Intern', why: 'Understanding narrative for digital platforms', growth: '10%', pay: '$16-24/hr' },
        { title: 'Public Relations Intern', why: 'Media relationships and storytelling', growth: '8%', pay: '$18-24/hr' },
        { title: 'Marketing Content Intern', why: 'Create compelling marketing narratives', growth: '10%', pay: '$18-26/hr' },
        { title: 'UX Writer Intern', why: 'Clear communication for digital products', growth: '23%', pay: '$22-32/hr' }
      ]
    },
    'Art': {
      traditional: 'Graphic Design Intern',
      alternatives: [
        { title: 'UX/UI Designer Intern', why: 'Your design skills translate directly - tech needs visual designers desperately', growth: '16%', pay: '$22-32/hr' },
        { title: 'Brand Designer Intern', why: 'Every company needs branding and visual identity', growth: '8%', pay: '$18-28/hr' },
        { title: 'Marketing Designer Intern', why: 'Create visual content for marketing campaigns', growth: '10%', pay: '$18-26/hr' },
        { title: 'Motion Graphics Intern', why: 'Video and animation increasingly important', growth: '14%', pay: '$20-28/hr' },
        { title: 'Product Designer Intern', why: 'Design digital products and experiences', growth: '16%', pay: '$22-32/hr' },
        { title: 'Art Director Intern', why: 'Lead creative vision for campaigns', growth: '6%', pay: '$20-30/hr' }
      ]
    },
    'Music': {
      traditional: 'Music Production Intern',
      alternatives: [
        { title: 'Audio Engineer Intern', why: 'Technical audio skills for various industries', growth: '9%', pay: '$16-24/hr' },
        { title: 'Content Creator Intern', why: 'Create audio/video content for brands', growth: '15%', pay: '$16-24/hr' },
        { title: 'Marketing Intern', why: 'Creative mindset helps in marketing roles', growth: '10%', pay: '$17-24/hr' },
        { title: 'Event Coordinator Intern', why: 'Experience with performances translates to events', growth: '18%', pay: '$16-24/hr' },
        { title: 'Social Media Manager Intern', why: 'Creative content for digital platforms', growth: '10%', pay: '$16-24/hr' },
        { title: 'Music Therapy Intern', why: 'Growing field using music for wellness', growth: '12%', pay: '$16-22/hr' }
      ]
    },
    'Theater': {
      traditional: 'Theater Production Intern',
      alternatives: [
        { title: 'Event Coordinator Intern', why: 'Production experience applies to event planning', growth: '18%', pay: '$16-24/hr' },
        { title: 'Video Production Intern', why: 'Storytelling and production skills', growth: '13%', pay: '$18-26/hr' },
        { title: 'Communications Intern', why: 'Performance skills help in public speaking/presenting', growth: '8%', pay: '$18-26/hr' },
        { title: 'HR Training Intern', why: 'Facilitation and presentation skills', growth: '10%', pay: '$18-24/hr' },
        { title: 'Marketing Intern', why: 'Creative thinking and audience understanding', growth: '10%', pay: '$17-24/hr' },
        { title: 'Social Media Content Intern', why: 'Create engaging video content', growth: '10%', pay: '$16-24/hr' }
      ]
    },

    // STEM (NON-ENGINEERING) MAJORS
    'Biology': {
      traditional: 'Biology Research Intern',
      alternatives: [
        { title: 'Clinical Research Coordinator Intern', why: 'Your science background without needing a PhD', growth: '14%', pay: '$18-26/hr' },
        { title: 'Laboratory Technician Intern', why: 'Hands-on lab work in various industries', growth: '7%', pay: '$16-24/hr' },
        { title: 'Regulatory Affairs Intern', why: 'Navigate FDA processes for biotech/pharma', growth: '12%', pay: '$20-28/hr' },
        { title: 'Data Analyst Intern (Healthcare)', why: 'Health data is exploding, science background helps', growth: '23%', pay: '$22-30/hr' },
        { title: 'Quality Assurance Intern', why: 'Ensure product quality in biotech/pharma', growth: '9%', pay: '$20-28/hr' },
        { title: 'Medical Writer Intern', why: 'Write about science for various audiences', growth: '9%', pay: '$20-28/hr' }
      ]
    },
    'Chemistry': {
      traditional: 'Chemistry Research Intern',
      alternatives: [
        { title: 'Quality Control Analyst Intern', why: 'Lab skills apply to pharma, food, manufacturing', growth: '9%', pay: '$18-26/hr' },
        { title: 'Laboratory Technician Intern', why: 'Conduct tests and experiments in various industries', growth: '7%', pay: '$16-24/hr' },
        { title: 'Regulatory Affairs Intern', why: 'Navigate FDA/EPA compliance - chemistry knowledge essential', growth: '12%', pay: '$20-28/hr' },
        { title: 'Environmental Science Intern', why: 'Use chemistry to address pollution and sustainability', growth: '6%', pay: '$18-26/hr' },
        { title: 'Data Analyst Intern', why: 'Analyze chemical data and experimental results', growth: '23%', pay: '$22-30/hr' },
        { title: 'Materials Science Intern', why: 'Study material properties and applications', growth: '8%', pay: '$20-28/hr' }
      ]
    },
    'Computer Science': {
      traditional: 'Software Engineering Intern',
      alternatives: [
        { title: 'Data Analyst Intern', why: 'Uses your logic and problem-solving skills, less coding-intensive', growth: '23%', pay: '$24-34/hr' },
        { title: 'Product Manager Intern', why: 'Technical background helps you understand what teams are building', growth: '19%', pay: '$26-36/hr' },
        { title: 'Technical Writer Intern', why: 'Explain complex tech concepts - your CS knowledge is an asset', growth: '7%', pay: '$20-28/hr' },
        { title: 'UX Researcher Intern', why: 'Analytical thinking applied to user behavior', growth: '18%', pay: '$22-32/hr' },
        { title: 'Data Science Intern', why: 'Programming skills + statistics and analysis', growth: '35%', pay: '$28-38/hr' },
        { title: 'Cybersecurity Intern', why: 'Growing field protecting systems and data', growth: '33%', pay: '$26-36/hr' }
      ]
    },
    'Mathematics': {
      traditional: 'Mathematics Research Intern',
      alternatives: [
        { title: 'Data Analyst Intern', why: 'Quantitative skills perfect for data analysis', growth: '23%', pay: '$22-32/hr' },
        { title: 'Actuarial Intern', why: 'Math skills essential for risk assessment', growth: '22%', pay: '$24-34/hr' },
        { title: 'Data Science Intern', why: 'Statistics and modeling at the core', growth: '35%', pay: '$28-38/hr' },
        { title: 'Financial Analyst Intern', why: 'Quantitative analysis for finance', growth: '9%', pay: '$22-30/hr' },
        { title: 'Operations Research Intern', why: 'Optimize systems using mathematical models', growth: '25%', pay: '$24-34/hr' },
        { title: 'Quantitative Analyst Intern', why: 'Finance firms desperately need math skills', growth: '11%', pay: '$28-40/hr' }
      ]
    },
    'Physics': {
      traditional: 'Physics Research Intern',
      alternatives: [
        { title: 'Data Scientist Intern', why: 'Modeling and analytical skills transfer perfectly', growth: '35%', pay: '$28-38/hr' },
        { title: 'Engineering Intern', why: 'Problem-solving skills apply across engineering', growth: '10%', pay: '$24-32/hr' },
        { title: 'Quantitative Analyst Intern', why: 'Physics background valued in finance', growth: '11%', pay: '$28-40/hr' },
        { title: 'Software Engineering Intern', why: 'Logical thinking translates to coding', growth: '22%', pay: '$28-40/hr' },
        { title: 'Data Analyst Intern', why: 'Analyze complex systems and data', growth: '23%', pay: '$24-32/hr' },
        { title: 'Technical Consulting Intern', why: 'Problem-solving expertise valued', growth: '13%', pay: '$26-36/hr' }
      ]
    },
    'Statistics': {
      traditional: 'Statistical Analyst Intern',
      alternatives: [
        { title: 'Data Analyst Intern', why: 'Core statistics skills in high demand', growth: '23%', pay: '$22-32/hr' },
        { title: 'Data Science Intern', why: 'Statistics is foundation of data science', growth: '35%', pay: '$28-38/hr' },
        { title: 'Business Intelligence Intern', why: 'Analyze business data and trends', growth: '15%', pay: '$22-30/hr' },
        { title: 'Market Research Analyst Intern', why: 'Survey design and analysis', growth: '13%', pay: '$20-28/hr' },
        { title: 'Actuarial Intern', why: 'Statistical modeling for risk assessment', growth: '22%', pay: '$24-34/hr' },
        { title: 'Biostatistics Intern', why: 'Apply statistics to healthcare and research', growth: '34%', pay: '$24-32/hr' }
      ]
    },
    'Data Science': {
      traditional: 'Data Science Intern',
      alternatives: [
        { title: 'Machine Learning Intern', why: 'Natural extension of data science skills', growth: '33%', pay: '$30-42/hr' },
        { title: 'Data Analyst Intern', why: 'Core analytical skills with less coding', growth: '23%', pay: '$24-32/hr' },
        { title: 'Business Intelligence Intern', why: 'Turn data into business insights', growth: '15%', pay: '$22-32/hr' },
        { title: 'Data Engineering Intern', why: 'Build data pipelines and infrastructure', growth: '21%', pay: '$28-38/hr' },
        { title: 'Product Analyst Intern', why: 'Use data to improve products', growth: '19%', pay: '$24-34/hr' },
        { title: 'Quantitative Analyst Intern', why: 'Data skills valued in finance', growth: '11%', pay: '$28-40/hr' }
      ]
    },
    'Information Technology': {
      traditional: 'IT Support Intern',
      alternatives: [
        { title: 'Systems Administrator Intern', why: 'Manage and maintain IT infrastructure', growth: '4%', pay: '$18-26/hr' },
        { title: 'Network Engineer Intern', why: 'Build and maintain network systems', growth: '5%', pay: '$22-30/hr' },
        { title: 'Cybersecurity Intern', why: 'Growing field with high demand', growth: '33%', pay: '$24-34/hr' },
        { title: 'Cloud Engineer Intern', why: 'Cloud infrastructure increasingly important', growth: '21%', pay: '$26-36/hr' },
        { title: 'IT Project Coordinator Intern', why: 'Manage technology implementation projects', growth: '11%', pay: '$20-28/hr' },
        { title: 'Business Analyst Intern', why: 'Bridge tech and business needs', growth: '14%', pay: '$22-30/hr' }
      ]
    },
    'Nursing': {
      traditional: 'Nursing Intern',
      alternatives: [
        { title: 'Clinical Research Coordinator Intern', why: 'Healthcare knowledge valuable for research', growth: '14%', pay: '$18-26/hr' },
        { title: 'Healthcare Analyst Intern', why: 'Analyze patient data and outcomes', growth: '16%', pay: '$20-28/hr' },
        { title: 'Public Health Intern', why: 'Community health and wellness programs', growth: '13%', pay: '$16-24/hr' },
        { title: 'Medical Device Sales Intern', why: 'Clinical knowledge helps explain products', growth: '8%', pay: '$20-28/hr' },
        { title: 'Health Education Intern', why: 'Teach patients and communities', growth: '11%', pay: '$16-24/hr' },
        { title: 'Case Management Intern', why: 'Coordinate patient care and resources', growth: '15%', pay: '$18-26/hr' }
      ]
    },

    // ENGINEERING MAJORS
    'Aerospace Engineering': {
      traditional: 'Aerospace Engineering Intern',
      alternatives: [
        { title: 'Systems Engineering Intern', why: 'Complex system integration applies beyond aerospace', growth: '12%', pay: '$24-34/hr' },
        { title: 'Data Analyst Intern', why: 'Test data analysis skills transfer perfectly', growth: '23%', pay: '$22-32/hr' },
        { title: 'Project Management Intern', why: 'Experience with complex timelines is valuable everywhere', growth: '11%', pay: '$22-30/hr' },
        { title: 'Technical Program Manager Intern', why: 'Coordinate between engineering teams at any company', growth: '15%', pay: '$26-36/hr' },
        { title: 'Manufacturing Engineering Intern', why: 'Production and process optimization skills', growth: '10%', pay: '$22-30/hr' },
        { title: 'Consulting Intern', why: 'Problem-solving and technical skills valued in consulting', growth: '13%', pay: '$28-38/hr' }
      ]
    },
    'Biomedical Engineering': {
      traditional: 'Biomedical Engineering Intern',
      alternatives: [
        { title: 'Clinical Engineering Intern', why: 'Work with medical equipment in hospital settings', growth: '10%', pay: '$20-28/hr' },
        { title: 'Regulatory Affairs Intern', why: 'Medical device approval process - growing field', growth: '12%', pay: '$22-30/hr' },
        { title: 'Quality Assurance Intern', why: 'Device safety and compliance - critical role', growth: '9%', pay: '$20-28/hr' },
        { title: 'Medical Device Sales Intern', why: 'Technical knowledge helps sell complex products', growth: '8%', pay: '$20-30/hr' },
        { title: 'Research Coordinator Intern', why: 'Clinical trials and research studies', growth: '14%', pay: '$18-26/hr' },
        { title: 'Healthcare Consulting Intern', why: 'Technical healthcare knowledge is valuable', growth: '11%', pay: '$25-35/hr' }
      ]
    },
    'Chemical Engineering': {
      traditional: 'Chemical Engineering Intern',
      alternatives: [
        { title: 'Process Engineering Intern', why: 'Pharma, food, cosmetics need process engineers', growth: '14%', pay: '$24-32/hr' },
        { title: 'Environmental Engineering Intern', why: 'Apply chemistry to sustainability projects', growth: '6%', pay: '$22-30/hr' },
        { title: 'Quality Engineering Intern', why: 'Ensure processes work correctly', growth: '9%', pay: '$22-30/hr' },
        { title: 'Regulatory Affairs Intern', why: 'Navigate FDA/EPA requirements', growth: '12%', pay: '$22-32/hr' },
        { title: 'Materials Science Intern', why: 'Material properties and testing', growth: '8%', pay: '$22-30/hr' },
        { title: 'Technical Sales Intern', why: 'Technical knowledge helps sell chemical products', growth: '7%', pay: '$20-28/hr' }
      ]
    },
    'Civil Engineering': {
      traditional: 'Civil Engineering Intern',
      alternatives: [
        { title: 'Construction Management Intern', why: 'Project coordination without constant calculations', growth: '11%', pay: '$22-30/hr' },
        { title: 'Urban Planning Intern', why: 'Shape communities and infrastructure', growth: '6%', pay: '$18-26/hr' },
        { title: 'Sustainability Consulting Intern', why: 'Growing field - green building and infrastructure', growth: '15%', pay: '$20-30/hr' },
        { title: 'Transportation Engineering Intern', why: 'Roads, transit, traffic systems', growth: '8%', pay: '$22-30/hr' },
        { title: 'Environmental Engineering Intern', why: 'Water, waste, environmental systems', growth: '6%', pay: '$22-30/hr' },
        { title: 'GIS Analyst Intern', why: 'Mapping and spatial analysis for civil projects', growth: '7%', pay: '$18-26/hr' }
      ]
    },
    'Computer Engineering': {
      traditional: 'Computer Engineering Intern',
      alternatives: [
        { title: 'Software Engineering Intern', why: 'Your hardware knowledge helps with embedded/systems', growth: '22%', pay: '$28-40/hr' },
        { title: 'Systems Engineering Intern', why: 'Bridge hardware and software systems', growth: '12%', pay: '$26-36/hr' },
        { title: 'Network Engineering Intern', why: 'Infrastructure and connectivity', growth: '5%', pay: '$24-34/hr' },
        { title: 'Embedded Systems Intern', why: 'Perfect fit for computer engineering background', growth: '10%', pay: '$26-36/hr' },
        { title: 'DevOps/SRE Intern', why: 'Systems thinking and automation', growth: '20%', pay: '$28-38/hr' },
        { title: 'Technical Product Manager Intern', why: 'Technical background helps manage product development', growth: '19%', pay: '$26-38/hr' }
      ]
    },
    'Electrical Engineering': {
      traditional: 'Electrical Engineering Intern',
      alternatives: [
        { title: 'Systems Engineering Intern', why: 'Bigger picture - integrate components vs design circuits', growth: '12%', pay: '$26-34/hr' },
        { title: 'Technical Product Manager Intern', why: 'Guide product strategy for hardware/software', growth: '19%', pay: '$28-38/hr' },
        { title: 'Data Engineering Intern', why: 'Logic and systems thinking transfer to data infrastructure', growth: '21%', pay: '$26-36/hr' },
        { title: 'Automation Engineering Intern', why: 'Control systems and manufacturing automation', growth: '10%', pay: '$24-32/hr' },
        { title: 'Technical Consulting Intern', why: 'Solve varied problems across industries', growth: '13%', pay: '$24-34/hr' },
        { title: 'Power Systems Intern', why: 'Energy, utilities, renewable power', growth: '8%', pay: '$24-32/hr' }
      ]
    },
    'Engineering Physics': {
      traditional: 'General Engineering Intern',
      alternatives: [
        { title: 'Data Scientist Intern', why: 'Math and modeling skills are exactly what data science needs', growth: '35%', pay: '$28-38/hr' },
        { title: 'Quantitative Analyst Intern', why: 'Physics background perfect for financial modeling', growth: '11%', pay: '$30-45/hr' },
        { title: 'Software Engineering Intern', why: 'Problem-solving and math translate perfectly', growth: '22%', pay: '$28-40/hr' },
        { title: 'Research Intern (Various)', why: 'Academic or industry research roles', growth: '8%', pay: '$20-30/hr' },
        { title: 'Technical Consulting Intern', why: 'Solve complex technical problems', growth: '13%', pay: '$26-36/hr' },
        { title: 'Machine Learning Intern', why: 'Physics and math background is highly valued', growth: '33%', pay: '$30-42/hr' }
      ]
    },
    'Environmental Engineering': {
      traditional: 'Environmental Engineering Intern',
      alternatives: [
        { title: 'Sustainability Consultant Intern', why: 'Help companies meet environmental goals', growth: '15%', pay: '$20-30/hr' },
        { title: 'Water Resources Engineer Intern', why: 'Water treatment, conservation, management', growth: '8%', pay: '$22-30/hr' },
        { title: 'Environmental Compliance Intern', why: 'Ensure regulatory compliance', growth: '7%', pay: '$20-28/hr' },
        { title: 'Renewable Energy Intern', why: 'Solar, wind, clean energy projects', growth: '11%', pay: '$22-30/hr' },
        { title: 'Climate Analysis Intern', why: 'Data analysis for environmental impact', growth: '14%', pay: '$22-32/hr' },
        { title: 'Green Building Consultant Intern', why: 'LEED certification and sustainable construction', growth: '10%', pay: '$20-28/hr' }
      ]
    },
    'Industrial Engineering': {
      traditional: 'Industrial Engineering Intern',
      alternatives: [
        { title: 'Operations Analyst Intern', why: 'Optimize business processes - your core skill', growth: '11%', pay: '$22-32/hr' },
        { title: 'Supply Chain Analyst Intern', why: 'Growing rapidly, uses optimization skills', growth: '18%', pay: '$20-30/hr' },
        { title: 'Business Analyst Intern', why: 'Bridge tech and business with systems thinking', growth: '14%', pay: '$22-32/hr' },
        { title: 'Data Analyst Intern', why: 'Process optimization with data', growth: '23%', pay: '$22-32/hr' },
        { title: 'Management Consulting Intern', why: 'Help companies improve efficiency', growth: '13%', pay: '$26-38/hr' },
        { title: 'Quality Engineering Intern', why: 'Process improvement and quality systems', growth: '9%', pay: '$22-30/hr' }
      ]
    },
    'Materials Science Engineering': {
      traditional: 'Materials Science Engineering Intern',
      alternatives: [
        { title: 'Process Engineering Intern', why: 'Material processing in manufacturing', growth: '14%', pay: '$24-32/hr' },
        { title: 'Quality Engineering Intern', why: 'Material testing and quality control', growth: '9%', pay: '$22-30/hr' },
        { title: 'Research & Development Intern', why: 'New material development', growth: '8%', pay: '$22-32/hr' },
        { title: 'Failure Analysis Engineer Intern', why: 'Investigate why materials/products fail', growth: '7%', pay: '$22-30/hr' },
        { title: 'Manufacturing Engineering Intern', why: 'Production processes for materials', growth: '10%', pay: '$22-30/hr' },
        { title: 'Technical Sales Intern', why: 'Sell materials/products with technical knowledge', growth: '7%', pay: '$20-28/hr' }
      ]
    },
    'Mechanical Engineering': {
      traditional: 'Mechanical Engineering Intern',
      alternatives: [
        { title: 'Technical Product Manager Intern', why: 'Engineering mindset for product development', growth: '19%', pay: '$26-36/hr' },
        { title: 'Project Management Intern', why: 'Lead teams using technical knowledge', growth: '11%', pay: '$22-32/hr' },
        { title: 'Technical Sales Engineer Intern', why: 'Explain complex products - engineers who communicate are rare', growth: '8%', pay: '$22-32/hr' },
        { title: 'Data Analyst Intern (Manufacturing)', why: 'Analyze production data and optimize processes', growth: '23%', pay: '$22-32/hr' },
        { title: 'Quality Engineering Intern', why: 'Testing, validation, process improvement', growth: '9%', pay: '$22-30/hr' },
        { title: 'Manufacturing Engineering Intern', why: 'Production processes and systems', growth: '10%', pay: '$22-30/hr' }
      ]
    },
    'Software Engineering': {
      traditional: 'Software Engineering Intern',
      alternatives: [
        { title: 'Data Engineering Intern', why: 'Build data pipelines and infrastructure', growth: '21%', pay: '$28-38/hr' },
        { title: 'DevOps/SRE Intern', why: 'Automation, infrastructure, and reliability', growth: '20%', pay: '$28-38/hr' },
        { title: 'Product Manager Intern (Technical)', why: 'Your coding background helps manage tech products', growth: '19%', pay: '$26-38/hr' },
        { title: 'QA/Test Engineer Intern', why: 'Ensure software quality - needs coding skills', growth: '9%', pay: '$24-34/hr' },
        { title: 'Technical Consultant Intern', why: 'Solve diverse problems for different clients', growth: '13%', pay: '$26-36/hr' },
        { title: 'Security Engineering Intern', why: 'Growing field - protect systems and data', growth: '33%', pay: '$28-40/hr' }
      ]
    },

    // OTHER MAJORS
    'Education': {
      traditional: 'Teaching Intern',
      alternatives: [
        { title: 'Instructional Designer Intern', why: 'Create educational content for companies', growth: '10%', pay: '$18-26/hr' },
        { title: 'Training & Development Intern', why: 'Corporate training programs', growth: '11%', pay: '$18-26/hr' },
        { title: 'EdTech Product Intern', why: 'Educational technology companies need your expertise', growth: '18%', pay: '$20-28/hr' },
        { title: 'Curriculum Developer Intern', why: 'Design learning programs', growth: '9%', pay: '$18-24/hr' },
        { title: 'HR Learning Intern', why: 'Employee development and training', growth: '10%', pay: '$18-24/hr' },
        { title: 'Content Writer Intern', why: 'Create educational content', growth: '8%', pay: '$18-26/hr' }
      ]
    },
    'Kinesiology': {
      traditional: 'Exercise Science Intern',
      alternatives: [
        { title: 'Corporate Wellness Intern', why: 'Companies investing in employee health programs', growth: '13%', pay: '$16-24/hr' },
        { title: 'Physical Therapy Aide Intern', why: 'Support rehabilitation and recovery', growth: '18%', pay: '$16-22/hr' },
        { title: 'Athletic Training Intern', why: 'Work with sports teams and athletes', growth: '17%', pay: '$16-24/hr' },
        { title: 'Health Education Intern', why: 'Teach wellness and fitness', growth: '11%', pay: '$16-24/hr' },
        { title: 'Ergonomics Specialist Intern', why: 'Improve workplace physical health', growth: '9%', pay: '$18-26/hr' },
        { title: 'Fitness Product Development Intern', why: 'Help design fitness equipment and apps', growth: '12%', pay: '$18-26/hr' }
      ]
    },
    'Graphic Design': {
      traditional: 'Graphic Design Intern',
      alternatives: [
        { title: 'UX/UI Designer Intern', why: 'Digital product design - tech companies always hiring', growth: '16%', pay: '$22-32/hr' },
        { title: 'Brand Designer Intern', why: 'Create visual identity for companies', growth: '8%', pay: '$18-28/hr' },
        { title: 'Marketing Designer Intern', why: 'Design for campaigns and content', growth: '10%', pay: '$18-26/hr' },
        { title: 'Motion Graphics Designer Intern', why: 'Video and animation increasingly important', growth: '14%', pay: '$20-28/hr' },
        { title: 'Product Designer Intern', why: 'Design digital products and interfaces', growth: '16%', pay: '$22-32/hr' },
        { title: 'Social Media Designer Intern', why: 'Create visual content for social platforms', growth: '10%', pay: '$16-24/hr' }
      ]
    },
    'Criminal Justice': {
      traditional: 'Criminal Justice Intern',
      alternatives: [
        { title: 'Compliance Intern', why: 'Corporate compliance and investigations', growth: '8%', pay: '$18-26/hr' },
        { title: 'Fraud Analyst Intern', why: 'Detect and prevent fraud for companies', growth: '12%', pay: '$20-28/hr' },
        { title: 'Security Analyst Intern', why: 'Corporate security and risk management', growth: '8%', pay: '$18-26/hr' },
        { title: 'Legal Assistant Intern', why: 'Support legal teams and investigations', growth: '10%', pay: '$16-24/hr' },
        { title: 'Risk Management Intern', why: 'Assess and mitigate organizational risks', growth: '9%', pay: '$20-28/hr' },
        { title: 'Cybersecurity Intern', why: 'Digital forensics and security', growth: '33%', pay: '$24-34/hr' }
      ]
    },
    'Social Work': {
      traditional: 'Social Work Intern',
      alternatives: [
        { title: 'Case Manager Intern', why: 'Coordinate services and support for clients', growth: '15%', pay: '$16-24/hr' },
        { title: 'Nonprofit Program Intern', why: 'Run programs serving communities', growth: '9%', pay: '$16-24/hr' },
        { title: 'HR Intern', why: 'Employee assistance and support programs', growth: '10%', pay: '$18-24/hr' },
        { title: 'Community Outreach Intern', why: 'Connect communities with resources', growth: '8%', pay: '$16-22/hr' },
        { title: 'Healthcare Navigator Intern', why: 'Help patients access care and services', growth: '16%', pay: '$18-26/hr' },
        { title: 'Victim Advocate Intern', why: 'Support and advocacy for those in need', growth: '12%', pay: '$16-24/hr' }
      ]
    }
  };

  const data = selectedMajor ? majorData[selectedMajor] : null;

  // Group majors by category (in specific order, not alphabetical)
  const businessMajors = ['Accounting', 'Economics', 'Entrepreneurship', 'Finance', 'Hospitality Management', 'Information Systems', 'International Business', 'Management', 'Marketing', 'Supply Chain Management'];
  const liberalArtsMajors = ['Anthropology', 'Art', 'Communications', 'English', 'History', 'Journalism', 'Music', 'Philosophy', 'Political Science', 'Psychology', 'Sociology', 'Theater'];
  const stemMajors = ['Biology', 'Chemistry', 'Computer Science', 'Data Science', 'Information Technology', 'Mathematics', 'Nursing', 'Physics', 'Statistics'];
  const engineeringMajors = [
    'Aerospace Engineering',
    'Biomedical Engineering',
    'Chemical Engineering',
    'Civil Engineering',
    'Computer Engineering',
    'Electrical Engineering',
    'Engineering Physics',
    'Environmental Engineering',
    'Industrial Engineering',
    'Materials Science Engineering',
    'Mechanical Engineering',
    'Software Engineering'
  ];
  const otherMajors = ['Criminal Justice', 'Education', 'Graphic Design', 'Kinesiology', 'Social Work'];

  return (
   <> 
    <Helmet>
    <title>Find Engineering Internships & Co-ops | MoreThanOneWay.org</title>
    <meta name="description" content="Find internships and co-ops for engineering students. Search top job boards, company portals, and niche sites all in one place — free." />
    <meta name="keywords" content="engineering internships, co-op programs, find internships college students, internship search, engineering jobs" />
    <meta property="og:title" content="Find Engineering Internships & Co-ops | MoreThanOneWay.org" />
    <meta property="og:description" content="Search top job boards and company portals for engineering internships and co-ops — all in one place." />
   </Helmet>
    <div className="bg-[#FFFBF7]">
      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10 space-y-8">

        {/* Page Hero (same system as Home) */}
        <header className="text-center max-w-5xl mx-auto pt-2">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Find Internships{" "}
            <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">&amp; Co-Ops</span>
          </h1>

          <p className="mt-4 text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
            Pick your major to get the obvious search term —{" "}
            <span className="font-semibold">plus</span> a few adjacent roles that hire the same skills,
            <span className="text-gray-600"> often with less competition.</span>
          </p>

          <p className="mt-2 text-sm md:text-base text-gray-500">
            No fluff — just searches you can actually use.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentPage("search-guide")}
              className="px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
            >
              Search guide
            </button>
            <button
              onClick={() => setCurrentPage("job-tools-hub")}
              className="px-5 py-3 rounded-xl border border-gray-200 bg-white font-semibold text-gray-900 hover:bg-gray-50 transition"
            >
              Job tools hub
            </button>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Timing card (new style, not the blue block) */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-sm">
            <p className="font-semibold text-gray-900 mb-1">Timing matters</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Most summer internships post <span className="font-semibold">Sep–Feb</span>. Co-ops often post earlier.
              <button
                onClick={() => setCurrentPage("search-guide")}
                className="ml-1 font-semibold text-[#006581] hover:text-[#005A73] underline underline-offset-2"
              >
                See the Search Guide →
              </button>
            </p>
          </div>

          {/* Major selector */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Select your major:
            </label>
            <select
              value={selectedMajor}
              onChange={(e) => handleMajorChange(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#006581]/25"
            >
              <option value="">Choose your major...</option>

              <optgroup label="BUSINESS MAJORS">
                {businessMajors.map((major) => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </optgroup>

              <optgroup label="LIBERAL ARTS MAJORS">
                {liberalArtsMajors.map((major) => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </optgroup>

              <optgroup label="STEM MAJORS">
                {stemMajors.map((major) => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </optgroup>

              <optgroup label="ENGINEERING MAJORS">
                {engineeringMajors.map((major) => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </optgroup>

              <optgroup label="OTHER MAJORS">
                {otherMajors.map((major) => (
                  <option key={major} value={major}>{major}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>


        {data && (
          <div className="space-y-7 rounded-3xl bg-[#006581]/5 p-6 md:p-8">
            {/* Traditional Role */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Traditional: {data.traditional}
              </h3>
              <p className="text-gray-600 mb-4">
                Run this search on major boards:
              </p>

              <div className="grid md:grid-cols-4 gap-3">
                <a
                  href={`https://www.indeed.com/jobs?q=${encodeURIComponent(data.traditional)}&l=&fromage=30`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#006581]/25 bg-white px-4 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 hover:border-[#006581]/40 transition text-sm"
                >
                  Indeed <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(data.traditional)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#006581]/25 bg-white px-4 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 hover:border-[#006581]/40 transition text-sm"
                >
                  LinkedIn <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href="https://app.joinhandshake.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#006581]/25 bg-white px-4 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 hover:border-[#006581]/40 transition text-sm"
                >
                  Handshake <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={`https://www.ziprecruiter.com/candidate/search?search=${encodeURIComponent(data.traditional)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#006581]/25 bg-white px-4 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 hover:border-[#006581]/40 transition text-sm"
                >
                  ZipRecruiter <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Alternative Paths */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Alternative paths that value the same skills.
              </h3>
              <p className="text-gray-600 mb-4">
                These roles value your {selectedMajor} skills and often have fewer applicants.
              </p>

              <div className="space-y-4">
                {data.alternatives.map((alt, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <h4 className="text-lg font-bold text-gray-900">{alt.title}</h4>
                      <div className="text-right">
                        <span className="bg-[#006581]/10 text-[#006581] px-2 py-1 rounded text-sm font-semibold block ring-1 ring-[#006581]/15">
                          +{alt.growth} Projected job growth
                        </span>
                        <span className="text-sm text-gray-600 mt-1 block">{alt.pay}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{alt.why}</p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                      <a
                        href={`https://www.indeed.com/jobs?q=${encodeURIComponent(alt.title)}&l=&fromage=30`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#006581]/25 bg-white px-4 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 hover:border-[#006581]/40 transition text-sm"
                      >
                        Indeed <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(alt.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#006581]/25 bg-white px-4 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 hover:border-[#006581]/40 transition text-sm"
                      >
                        LinkedIn <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href="https://app.joinhandshake.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#006581]/25 bg-white px-4 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 hover:border-[#006581]/40 transition text-sm"
                      >
                        Handshake <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href={`https://www.ziprecruiter.com/candidate/search?search=${encodeURIComponent(alt.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl border border-[#006581]/25 bg-white px-4 py-2 font-semibold text-[#006581] hover:bg-[#006581]/10 hover:border-[#006581]/40 transition text-sm"
                      >
                        ZipRecruiter <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keep your remaining sections below (Small companies, Research, etc.) for now */}
            {/* We'll restyle those next to match the same system. */}
            {/* Small companies (restyled) */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm space-y-5">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Don’t ignore small companies
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Startups and smaller teams can be less competitive — and they often give interns real work (not just “shadowing”).
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 text-gray-700">
                {[
                  "Fewer applicants (often way less crowded)",
                  "More responsibility, faster learning",
                  "Direct access to senior people",
                  "Your work actually ships / matters",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#006581]/10 text-[#006581] ring-1 ring-[#006581]/15 text-sm font-bold">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl bg-[#006581]/5 border border-[#006581]/10 p-5">
                <p className="font-semibold text-gray-900">
                  Where to look (good for small-company internships):
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Wellfound", href: "https://wellfound.com/jobs" },
                    { label: "Built In", href: "https://builtin.com/jobs" },
                    { label: "YC Companies", href: "https://www.ycombinator.com/jobs" },
                  ].map((x) => (
                    <a
                      key={x.label}
                      href={x.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
            flex items-center justify-center gap-2
            rounded-xl
            border border-gray-200
            bg-white
            px-4 py-3
            font-semibold text-gray-900
            shadow-sm
            hover:-translate-y-[1px]
            hover:shadow-md
            hover:border-gray-300
            transition-all
          "
                    >
                      {x.label} <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>

                <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                  Tip: add your city + “intern” (ex: <span className="font-medium">“Boston startup intern”</span>) and check each
                  company’s careers page. Small teams don’t always post everywhere.
                </p>
              </div>
            </div>
            {/* Research before you apply */}
            <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  Research before you apply
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Ten minutes of research can save you months of frustration — and help you write better applications.
                </p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 text-gray-700">
                {[
                  "Avoid toxic teams and bad intern experiences",
                  "Spot red flags early (high turnover, vague roles)",
                  "Write more targeted, less generic applications",
                  "Walk into interviews knowing what to expect",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#006581]/10 text-[#006581] ring-1 ring-[#006581]/15 text-sm font-bold">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tools */}
              <div className="rounded-xl bg-[#006581]/5 border border-[#006581]/10 p-6 space-y-4">
                <p className="font-semibold text-gray-900">
                  Quick tools that are actually worth using:
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Glassdoor */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Glassdoor
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      Reviews, salary ranges, and interview experiences from real employees and interns.
                    </p>
                    <a
                      href="https://www.glassdoor.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
            inline-flex items-center gap-2
            font-semibold text-[#006581]
            hover:text-[#005A73]
            underline underline-offset-2
          "
                    >
                      Visit Glassdoor <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Company site */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Company websites
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Check the careers page, read recent news, and look at how clearly the role is described.
                      If it’s vague, that’s a signal.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  If something feels off, trust that instinct. You’re allowed to be selective — even as a student.
                </p>
              </div>
            </div>


          </div>
        )}

        {!selectedMajor && (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-700 font-medium">
              Pick a major to generate searches.
            </p>
            <p className="text-gray-600 mt-2">
              Don’t see yours? Email{" "}
              <a href="mailto:support@morethanoneway.org" className="text-[#006581] underline">
                support@morethanoneway.org
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
</>
  );
};

export default FindInternshipsPage;
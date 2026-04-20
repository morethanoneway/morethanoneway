
import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Phone, TrendingUp, Briefcase, Users, ChevronRight, Menu, X, BookOpen, Search, ExternalLink, ChevronDown, ChevronUp, Edit2, Trash2, FileText, Target, ArrowLeft } from 'lucide-react';
import ResumeBuilder from './ResumeBuilder';
import YoureNotAlone from './YoureNotAlone';
import Contact from './Contact';
import StudyResources from './StudyResources';


// Dropdown Menu Component
const DropdownMenu = ({ title, items, currentPage, setCurrentPage, isMobile = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    // Mobile version - just show items in a list
    return (
      <>
        <div className="text-xs text-blue-200 mb-1 mt-2 border-t border-blue-500 pt-2">{title.toUpperCase()}</div>
        {items.map((item) => (
          <button
            key={item.page}
            onClick={() => {
              setCurrentPage(item.page);
            }}
            className="block w-full text-left hover:text-blue-200 py-2 pl-4"
          >
            {item.label}
          </button>
        ))}
      </>
    );
  }

  
  // Desktop version - dropdown on hover
return (
  <div 
    className="relative"
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
  >
    <button 
      className="hover:text-blue-200 flex items-center gap-1"
      onClick={() => setIsOpen(!isOpen)}
    >
      {title}
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    
    {isOpen && (
      <div className="absolute top-full left-0 pt-2 z-50">
        <div className="bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-[200px]">
          {items.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setCurrentPage(item.page);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);
};  

const NavBar = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const findOpportunitiesItems = [
    { page: 'find-internships', label: 'Find Internships', icon: <Search className="w-4 h-4" /> },
    { page: 'search-guide', label: 'Search Guide', icon: <BookOpen className="w-4 h-4" /> }
  ];

  const applicationToolsItems = [
    { page: 'resume-builder', label: 'Resume Builder', icon: <FileText className="w-4 h-4" /> },
    { page: 'tracker', label: 'Application Tracker', icon: <Target className="w-4 h-4" /> },
    { page: 'interview-prep', label: 'Interview Prep', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  const supportItems = [
    { page: 'youre-not-alone', label: "Struggling with College?", icon: <Heart className="w-4 h-4" /> },
    { page: 'crisis', label: 'Crisis Resources', icon: <Phone className="w-4 h-4" /> },
    { page: 'stories', label: 'Real Stories', icon: <Users className="w-4 h-4" /> }
  ];
  
  const resourcesItems = [
    { page: 'resources', label: 'Career Resources', icon: <Briefcase className="w-4 h-4" /> },
    { page: 'study-resources', label: 'Free Study Help', icon: <BookOpen className="w-4 h-4" /> }
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6" />
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>
              More Than One Way
            </h1>
          </div>
          
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
  <button onClick={() => setCurrentPage('home')} className="hover:text-blue-200">Home</button>
  
  <DropdownMenu 
    title="Support"
    items={supportItems}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
  />
  
  <DropdownMenu 
    title="Resources"
    items={resourcesItems}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
  />
  
  <DropdownMenu 
    title="Find Opportunities"
    items={findOpportunitiesItems}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
  />
  
  <DropdownMenu 
    title="Application Tools"
    items={applicationToolsItems}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
  />
  
  <button onClick={() => setCurrentPage('pivot')} className="hover:text-blue-200 whitespace-nowrap">Career Paths</button>
  
  <button onClick={() => setCurrentPage('crisis')} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 whitespace-nowrap">Need Help Now?</button>
</div>

          {/* Mobile Navigation */}
       {mobileMenuOpen && (
  <div className="absolute top-full left-0 right-0 bg-blue-600 md:hidden pb-4 space-y-2 px-4">
    <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Home</button>
    
    <DropdownMenu 
      title="Support"
      items={supportItems}
      currentPage={currentPage}
      setCurrentPage={(page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
      }}
      isMobile={true}
    />
    
    <DropdownMenu 
      title="Resources"
      items={resourcesItems}
      currentPage={currentPage}
      setCurrentPage={(page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
      }}
      isMobile={true}
    />
    
    <DropdownMenu 
      title="Find Opportunities"
      items={findOpportunitiesItems}
      currentPage={currentPage}
      setCurrentPage={(page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
      }}
      isMobile={true}
    />
    
    <DropdownMenu 
      title="Application Tools"
      items={applicationToolsItems}
      currentPage={currentPage}
      setCurrentPage={(page) => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
      }}
      isMobile={true}
    />
    
    <button onClick={() => { setCurrentPage('pivot'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2 border-t border-blue-500 pt-2">Career Paths</button>
    
    <button onClick={() => { setCurrentPage('crisis'); setMobileMenuOpen(false); }} className="block w-full text-left bg-red-500 px-4 py-2 rounded hover:bg-red-600 mt-2">Need Help Now?</button>
  </div>
)}
           </div>
      </div>
    </nav>
  );
};

<div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-5 rounded-xl shadow-soft">
  <div className="flex items-start gap-3">
    <span className="text-3xl">🫂</span>
    <div>
      <h3 className="font-bold text-red-800 mb-1">Need someone right now?</h3>
      <p className="text-red-700 text-sm mb-2">
        <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (24/7)<br />
        <strong>Crisis Text Line:</strong> Text HOME to 741741
      </p>
      <p className="text-xs text-red-600 italic">
        You matter. This feeling is temporary. People want to help. ❤️
      </p>
    </div>
  </div>
</div>

const HomePage = ({ setCurrentPage }) => (
  <div className="space-y-8">
    <CrisisBanner />
    
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">You Have More Choices Than You Think</h2>
      <p className="text-xl mb-6">Whether you're struggling with school, job searching, or just feeling overwhelmed - there are more paths forward than you realize.</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
       
<button 
  onClick={() => setCurrentPage('youre-not-alone')}
  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
>
  Struggling with College?
</button>

 <button 
          onClick={() => setCurrentPage('find-internships')}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Find Internships
        </button>
        <button 
          onClick={() => setCurrentPage('search-guide')}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 flex items-center justify-center"
        >
          <BookOpen className="w-5 h-5 mr-2" />
          Job Search Guide
        </button>
        <button 
          onClick={() => setCurrentPage('stories')}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
        >
          Read Real Stories
        </button>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
        <Users className="w-10 h-10 text-green-500 mb-3" />
        <h3 className="text-xl font-bold mb-2">You're Not Alone</h3>
        <p className="text-gray-600">Thousands of students feel exactly like you do. Read their stories and see how they made it through.</p>
        <button onClick={() => setCurrentPage('stories')} className="text-green-600 font-semibold mt-3 flex items-center">
          Read Stories <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
        <TrendingUp className="w-10 h-10 text-purple-500 mb-3" />
        <h3 className="text-xl font-bold mb-2">Different Paths Work</h3>
        <p className="text-gray-600">Your major doesn't lock you in. See what adjacent careers are actually hiring.</p>
        <button onClick={() => setCurrentPage('pivot')} className="text-purple-600 font-semibold mt-3 flex items-center">
          Find Your Path <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
        <Briefcase className="w-10 h-10 text-blue-500 mb-3" />
        <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
        <p className="text-gray-600">Job searching is brutal. Track your applications and celebrate small wins.</p>
        <button onClick={() => setCurrentPage('tracker')} className="text-blue-600 font-semibold mt-3 flex items-center">
          Start Tracking <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>

    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-3">The Honest Truth</h3>
      <ul className="space-y-2 text-gray-700">
        <li>• The average job search takes 6-8 months. That's normal.</li>
        <li>• Most students send 100+ applications before getting offers. You're not doing it wrong.</li>
        <li>• Some fields are genuinely oversaturated. That's not your fault.</li>
        <li>• Taking a non-linear path doesn't mean you failed. It means you're adapting.</li>
        <li>• Your worth is not determined by your job, your GPA, or your major.</li>
      </ul>
    </div>
  </div>
);

const FindInternshipsPage = ({ setCurrentPage }) => {  // Add setCurrentPage prop
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
       traditional: 'General Engineering Intern', // Changed to avoid CS/IT confusion and find broader engineering roles
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
    }
  };

  const data = selectedMajor ? majorData[selectedMajor] : null;
  
  // Group majors by category (in specific order, not alphabetical)
  const businessMajors = ['Accounting', 'Economics', 'Finance', 'Management', 'Marketing'];
  const liberalArtsMajors = ['Communications', 'English', 'History', 'Psychology', 'Sociology'];
  const stemMajors = ['Biology', 'Chemistry', 'Computer Science'];
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

  return (
    <div className="space-y-6">
      <CrisisBanner />
      
      <h2 className="text-3xl font-bold mb-2">Find Internships & Co-ops</h2>
      <p className="text-gray-600 mb-6">Search for traditional roles in your major AND explore alternative paths that value your skills.</p>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
  <p className="font-semibold text-blue-800 mb-2">📅 Timing Matters!</p>
  <p className="text-sm text-blue-700">
    Companies hire 4-6 months in advance. Summer internships post Sept-Feb. Co-ops (4-6 month terms) post even earlier. 
    <button 
      onClick={() => setCurrentPage('search-guide')} 
      className="text-blue-900 underline font-semibold ml-1 hover:text-blue-950"
    >
      Check our Search Guide for detailed timelines
    </button>
  </p>
</div>

      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-semibold mb-2">Select Your Major:</label>
        <select 
          value={selectedMajor}
          onChange={(e) => handleMajorChange(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Choose your major...</option>
          
          <optgroup label="BUSINESS MAJORS">
            {businessMajors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </optgroup>
          
          <optgroup label="LIBERAL ARTS MAJORS">
            {liberalArtsMajors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </optgroup>
          
          <optgroup label="STEM MAJORS">
            {stemMajors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </optgroup>
          
          <optgroup label="ENGINEERING MAJORS">
            {engineeringMajors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {data && (
        <div className="space-y-6">
          {/* Traditional Role */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-4">Traditional: {data.traditional}</h3>
            <p className="text-gray-600 mb-4">Search for {data.traditional} positions on major job boards:</p>
            <div className="grid md:grid-cols-4 gap-3">
              <a 
                href={`https://www.indeed.com/jobs?q=${encodeURIComponent(data.traditional)}&l=&fromage=30`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                >
                Search Indeed <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a 
                href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(data.traditional)}`}
                target="_blank"
                rel="noopener noreferrer"
               className="flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 font-semibold"
                >
                Search LinkedIn <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a 
                href={`https://app.joinhandshake.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-900 font-semibold"
                >
                Search Handshake <ExternalLink className="w-4 h-4 ml-2" />
              </a>
	      <a 
  		href={`https://www.ziprecruiter.com/candidate/search?search=${encodeURIComponent(data.traditional)}`}
  		target="_blank"
  		rel="noopener noreferrer"
 		className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
                >
  		 Search ZipRecruiter <ExternalLink className="w-4 h-4 ml-2" />
	      </a>
            </div>
          </div>

          {/* Alternative Paths */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Alternative Paths (Often Less Competitive)</h3>
            <p className="text-gray-600 mb-4">These roles value your {selectedMajor} skills but may be easier to get and offer great experience:</p>
            <div className="space-y-4">
              {data.alternatives.map((alt, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-lg font-bold">{alt.title}</h4>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold block">
                        +{alt.growth} growth
                      </span>
                      <span className="text-sm text-gray-600 mt-1 block">{alt.pay}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{alt.why}</p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <a 
                      href={`https://www.indeed.com/jobs?q=${encodeURIComponent(alt.title)}&l=&fromage=30`}
                      target="_blank"
                      rel="noopener noreferrer"
                       className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm"
                      >
                      Indeed <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <a 
                      href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(alt.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 font-medium text-sm"
                      >
                      LinkedIn <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <a 
                      href={`https://app.joinhandshake.com/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 font-medium text-sm"
                      >
                      Handshake <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <a 
			href={`https://www.ziprecruiter.com/candidate/search?search=${encodeURIComponent(alt.title)}`}
  			target="_blank"
  			rel="noopener noreferrer"
  			className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium text-sm"
                      >
  				ZipRecruiter <ExternalLink className="w-3 h-3 ml-1" />
		     </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

   
          {/* Small Companies */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Don't Ignore Small Companies</h3>
            <p className="text-gray-700 mb-3">Startups and small companies (under 100 employees) often provide:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
              <li>Less competitive hiring (fewer applicants)</li>
              <li>More responsibility and learning</li>
              <li>Direct access to senior engineers</li>
              <li>Better chance to make real impact</li>
            </ul>
            <div className="grid md:grid-cols-3 gap-3">
              <a 
                href="https://wellfound.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Wellfound <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="https://builtin.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Built In <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="https://www.ycombinator.com/jobs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                YC Companies <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>

  {/* Research Section */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📊 Research Before You Apply
              </h2>
              <p className="text-gray-700 mb-4">
                Once you find opportunities that interest you, spend 10 minutes researching each company. This helps you:
              </p>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>✓ Avoid toxic workplaces and bad intern experiences</li>
                <li>✓ Write targeted, personalized applications</li>
                <li>✓ Prepare better for interviews</li>
                <li>✓ Know what salary and benefits to expect</li>
              </ul>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Glassdoor - Company Reviews & Salaries</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Read reviews from current employees and past interns. Check salary data and interview questions.
                  </p>
                  <a
                    href="https://www.glassdoor.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
                    Visit Glassdoor <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-2">Company Websites</h3>
                  <p className="text-sm text-gray-700">
                    • Visit the company's career page to learn about their internship program<br/>
                    • Check recent company news to mention in your application
                  </p>
                </div>
              </div>
            </div>
            
            {/* Other Resources */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3">Other Helpful Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.ripplematch.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
                  RippleMatch
                </a>
                <p className="text-sm text-gray-600">Matches you with companies based on your profile</p>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); alert('Search "[your school name] career center" to find your school\'s career services'); }} className="text-blue-600 hover:underline font-semibold">
                  Your School's Career Center
                </a>
                <p className="text-sm text-gray-600">Free resume reviews, mock interviews, job boards</p>
              </li>
            </ul>
          </div>
        </div>
      )}

      {!selectedMajor && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Select your major above to see internship opportunities!</p>
        </div>
      )}
    </div>
    );
};

const StoriesPage = ({ setCurrentPage }) => {
  const [filterMajor, setFilterMajor] = useState('');
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Your Google Sheet ID (corrected - removed the "/" at the start)
  const SHEET_ID = '1YkJVlGtn9I4YLqqRc_9KWaeEYf6BeeosmKjoOt1QJkM';
  const SHEET_NAME = 'Form Responses 1'; // Default name from Google Forms
  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`
        );
        const text = await response.text();
        
        // Google returns JSONP, we need to extract the JSON
        const json = JSON.parse(text.substring(47).slice(0, -2));
        
        const rows = json.table.rows;
        const loadedStories = [];
        
        rows.forEach(row => {
          // Columns: Timestamp(0), Name(1), Major(2), Email(3), Timeframe(4), Struggle(5), Outcome(6), Approved(7)
          const approved = row.c[7]?.v || 'NO'; // Column H (index 7) - your "Approved" column
          
          if (approved === 'YES') {
            loadedStories.push({
  name: row.c[1]?.v || 'Anonymous',
  major: row.c[3]?.v || '',        // Changed from [2] to [3] - Column D
  timeframe: row.c[4]?.v || '',    // Column E - stays the same
  struggle: row.c[5]?.v || '',     // Column F - stays the same
  outcome: row.c[6]?.v || ''       // Column G - stays the same
});
          }
        });
        
        setStories(loadedStories);
        setError(null);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Could not load stories. Please refresh the page.');
        // Fallback to hardcoded stories if fetch fails
        setStories([
          {
            name: 'Alex M.',
            major: 'Computer Science',
            struggle: 'Failed my first two CS classes. Felt like everyone else "got it" and I didn\'t. Almost dropped out.',
            outcome: 'Switched to Information Systems, graduated in 5 years. Now a Business Analyst at a startup. Love my job.',
            timeframe: 'Graduated 2 years ago'
          },
          {
            name: 'Sarah K.',
            major: 'English',
            struggle: 'Sent 200+ applications for editing jobs. Got 3 interviews. Was convinced my degree was worthless.',
            outcome: 'A friend suggested technical writing. Got hired at a software company. They desperately needed someone who could write clearly.',
            timeframe: 'Job search took 8 months'
          },
          {
            name: 'Marcus T.',
            major: 'Biology',
            struggle: 'Didn\'t get into med school. Felt like a complete failure. My whole identity was "pre-med."',
            outcome: 'Took a year off, worked as a research coordinator. Realized I love research more than I would have loved being a doctor. Now in a PhD program.',
            timeframe: '3 years post-grad'
          },
          {
            name: 'Jamie L.',
            major: 'Psychology',
            struggle: 'Week 2 of freshman year, my professor told me I "wasn\'t cut out for this field" after I asked a question.',
            outcome: 'That professor was wrong. Graduated, now a UX researcher. Make $85k and love going to work.',
            timeframe: 'Graduated last year'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStories();
  }, []);

  const majors = [...new Set(stories.map(s => s.major))].sort();
  const filteredStories = filterMajor 
    ? stories.filter(s => s.major === filterMajor)
    : stories;

 return (
  <div className="space-y-6">
    <CrisisBanner />
    
    <button
  onClick={() => setCurrentPage('home')}
  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
>
  <ArrowLeft className="w-5 h-5" />
  Back
</button>
    
    <h2 className="text-3xl font-bold mb-2">You're Not Alone</h2>
    <p className="text-gray-600 mb-6">Real stories from students who navigated setbacks and uncertainty.These aren't success stories - they're survival stories.</p>
      
	{loading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-800">Loading stories...</p>
        </div>
      )}

      {error && (
        <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <p className="text-yellow-800">{error}</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold mb-2">Filter by major:</label>
            <select 
              value={filterMajor}
              onChange={(e) => setFilterMajor(e.target.value)}
              className="w-full md:w-64 p-3 border rounded-lg"
            >
              <option value="">All majors ({stories.length} stories)</option>
              {majors.map(major => (
                <option key={major} value={major}>
                  {major} ({stories.filter(s => s.major === major).length})
                </option>
              ))}
            </select>
          </div>

          {filteredStories.length > 0 ? (
            filteredStories.map((story, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{story.name}</h3>
                    <p className="text-sm text-gray-500">{story.major} • {story.timeframe}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">The Struggle:</p>
                    <p className="text-gray-700">{story.struggle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">What Happened:</p>
                    <p className="text-gray-700">{story.outcome}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              No stories yet for {filterMajor}. Be the first to share your story!
            </div>
          )}
        </>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-4 text-center">Share Your Story</h3>
        <p className="text-gray-600 mb-6 text-center">Your experience could help another student who's struggling right now.</p>
        
        <div className="text-center">
  
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSex5f-hLh3ygRkdsLeE33vxmE7WUiajozBZtpFCczxBK8SpMQ/viewform"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
  	>
 	   Submit Your Story
  	</a>
  	<p className="text-xs text-gray-500 mt-4">
    	By submitting, you allow us to share your story to help other students. 
    	If you provide an email, we'll send you a preview before posting.
  	</p>
 	</div>
      </div>
    </div>
  );
};

const PivotPage = ({ setCurrentPage }) => {
  const [selectedMajor, setSelectedMajor] = useState('');
  
  const careerPivots = {
  'Anthropology': [
    { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior and culture is exactly what product teams need', salary: '$70k-95k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Study consumer behavior and cultural trends', salary: '$55k-80k' },
    { career: 'Nonprofit Program Manager', growth: '9%', why: 'Work with communities and cultural organizations', salary: '$50k-75k' },
    { career: 'Diversity & Inclusion Specialist', growth: '11%', why: 'Your cultural understanding helps create inclusive workplaces', salary: '$60k-85k' }
  ],
  'Art/Fine Arts': [
    { career: 'UX/UI Designer', growth: '16%', why: 'Your design skills translate directly - tech needs visual designers desperately', salary: '$70k-100k' },
    { career: 'Graphic Designer (Corporate)', growth: '3%', why: 'Every company needs internal design - marketing, presentations, branding', salary: '$50k-70k' },
    { career: 'Art Director (Advertising)', growth: '6%', why: 'Lead creative teams, less hands-on creation, more strategy', salary: '$75k-110k' },
    { career: 'Museum/Gallery Coordinator', growth: '10%', why: 'Behind-the-scenes work in arts - events, collections, education', salary: '$40k-60k' }
  ],
  'Biology': [
    { career: 'Clinical Research Coordinator', growth: '14%', why: 'Your science background without needing a PhD', salary: '$50k-70k' },
    { career: 'Medical Writer', growth: '9%', why: 'Write about science for various audiences', salary: '$60k-85k' },
    { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA processes for biotech/pharma', salary: '$65k-90k' },
    { career: 'Data Analyst (Healthcare)', growth: '23%', why: 'Health data is exploding, science background helps', salary: '$60k-85k' }
  ],
  'Business': [
    { career: 'Operations Analyst', growth: '16%', why: 'Make businesses run more efficiently', salary: '$60k-80k' },
    { career: 'Business Analyst', growth: '14%', why: 'Bridge between business needs and tech solutions', salary: '$65k-90k' },
    { career: 'Financial Analyst', growth: '9%', why: 'Steady field with clear career progression', salary: '$65k-85k' },
    { career: 'Supply Chain Analyst', growth: '18%', why: 'Growing field, especially post-pandemic', salary: '$60k-85k' }
  ],
  'Chemistry': [
    { career: 'Quality Control Analyst', growth: '9%', why: 'Lab skills apply to pharma, food, manufacturing', salary: '$50k-70k' },
    { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA/EPA compliance - chemistry knowledge essential', salary: '$65k-90k' },
    { career: 'Environmental Scientist', growth: '6%', why: 'Use chemistry to address pollution and sustainability', salary: '$55k-80k' },
    { career: 'Patent Examiner', growth: '3%', why: 'Government job reviewing chemistry/pharma patents', salary: '$60k-90k' }
  ],
  'Communications': [
    { career: 'Corporate Communications Specialist', growth: '8%', why: 'Every company needs internal/external communication strategy', salary: '$55k-80k' },
    { career: 'Public Relations Specialist', growth: '8%', why: 'Manage company reputation and media relations', salary: '$55k-75k' },
    { career: 'Social Media Manager', growth: '10%', why: 'Your understanding of messaging applies to digital platforms', salary: '$50k-75k' },
    { career: 'Employee Communications', growth: '12%', why: 'Help companies communicate with their workforce - growing field', salary: '$60k-85k' }
  ],
  'Computer Science': [
    { career: 'Data Analyst', growth: '23%', why: 'Uses your logic and problem-solving skills, less coding-intensive', salary: '$65k-85k' },
    { career: 'Product Manager', growth: '19%', why: 'Technical background helps you understand what teams are building', salary: '$80k-120k' },
    { career: 'Technical Writer', growth: '7%', why: 'Explain complex tech concepts - your CS knowledge is an asset', salary: '$60k-80k' },
    { career: 'UX Researcher', growth: '18%', why: 'Analytical thinking applied to user behavior', salary: '$70k-95k' }
  ],
  'Criminal Justice': [
    { career: 'Compliance Officer', growth: '8%', why: 'Ensure companies follow laws and regulations', salary: '$60k-85k' },
    { career: 'Corporate Security Analyst', growth: '9%', why: 'Risk assessment and security planning for businesses', salary: '$55k-80k' },
    { career: 'Loss Prevention Manager', growth: '6%', why: 'Retail and corporate asset protection', salary: '$50k-75k' },
    { career: 'Emergency Management Specialist', growth: '6%', why: 'Disaster planning and response coordination', salary: '$55k-80k' }
  ],
  'Education': [
    { career: 'Corporate Trainer', growth: '11%', why: 'Companies need people who can teach - better pay than K-12', salary: '$55k-85k' },
    { career: 'Instructional Designer', growth: '9%', why: 'Create online courses and training programs for businesses', salary: '$60k-90k' },
    { career: 'Curriculum Developer (EdTech)', growth: '15%', why: 'Education companies need people who understand teaching', salary: '$60k-85k' },
    { career: 'Learning & Development Specialist', growth: '10%', why: 'Help employees grow - your teaching skills in a corporate setting', salary: '$60k-85k' }
  ],
  'English/Journalism': [
    { career: 'Technical Writer', growth: '7%', why: 'Your writing skills are desperately needed in tech companies', salary: '$60k-80k' },
    { career: 'UX Writer', growth: '23%', why: 'Make apps and websites easier to understand - storytelling for digital', salary: '$75k-100k' },
    { career: 'Content Strategist', growth: '15%', why: 'Plan and manage content across organizations', salary: '$65k-90k' },
    { career: 'Grant Writer', growth: '8%', why: 'Nonprofits need great writers, less competitive field', salary: '$50k-70k' }
  ],
  'Foreign Languages': [
    { career: 'Localization Specialist', growth: '13%', why: 'Tech companies need content translated and culturally adapted', salary: '$55k-80k' },
    { career: 'International Business Coordinator', growth: '10%', why: 'Help companies expand globally - language skills are valuable', salary: '$55k-85k' },
    { career: 'Technical Writer (Multilingual)', growth: '7%', why: 'Create documentation in multiple languages', salary: '$60k-85k' },
    { career: 'UX Researcher (International Markets)', growth: '18%', why: 'Research users in different countries and cultures', salary: '$70k-95k' }
  ],
  'History': [
    { career: 'Researcher (Market/Policy)', growth: '11%', why: 'Your research skills apply beyond academia - companies need deep analysis', salary: '$55k-80k' },
    { career: 'Compliance Specialist', growth: '8%', why: 'Understanding regulations and documentation - your analytical skills fit', salary: '$60k-85k' },
    { career: 'Archives/Records Manager', growth: '5%', why: 'Organize and preserve information for corporations, government, nonprofits', salary: '$50k-70k' },
    { career: 'Grant Writer', growth: '8%', why: 'Nonprofits need writers who can research and build compelling cases', salary: '$50k-70k' }
  ],
  'Marketing': [
    { career: 'Sales Operations', growth: '23%', why: 'Your communication skills + analytics, growing rapidly', salary: '$60k-85k' },
    { career: 'Customer Success Manager', growth: '20%', why: 'Help clients succeed, relationship-focused', salary: '$55k-80k' },
    { career: 'Digital Marketing Analyst', growth: '17%', why: 'Data-driven marketing, less saturated than traditional marketing', salary: '$55k-75k' },
    { career: 'Product Marketing', growth: '16%', why: 'Bridge between product teams and customers', salary: '$70k-95k' }
  ],
  'Mathematics': [
    { career: 'Data Analyst', growth: '23%', why: 'Your analytical and statistical skills are in high demand', salary: '$65k-90k' },
    { career: 'Actuarial Analyst', growth: '21%', why: 'Math background perfect for risk assessment and insurance', salary: '$70k-100k' },
    { career: 'Financial Analyst', growth: '9%', why: 'Modeling and forecasting - your quantitative skills shine', salary: '$65k-95k' },
    { career: 'Operations Research Analyst', growth: '23%', why: 'Optimize business processes using mathematical models', salary: '$70k-100k' }
  ],
  'Music/Theater': [
    { career: 'Audio/Video Production', growth: '12%', why: 'Every company needs video content - your performance skills translate', salary: '$50k-75k' },
    { career: 'Event Coordinator', growth: '18%', why: 'Your experience managing performances applies to corporate events', salary: '$45k-65k' },
    { career: 'Music Therapist', growth: '9%', why: 'Clinical work using your musical training - requires certification', salary: '$50k-70k' },
    { career: 'Corporate Trainer', growth: '11%', why: 'Teaching and performing skills make you great at presentations', salary: '$55k-80k' }
  ],
  'Philosophy': [
    { career: 'Business Analyst', growth: '14%', why: 'Your logic and critical thinking skills are exactly what companies need', salary: '$70k-95k' },
    { career: 'UX Researcher', growth: '18%', why: 'Understanding how people think and make decisions - philosophy in practice', salary: '$75k-105k' },
    { career: 'Technical Writer', growth: '7%', why: 'Break down complex ideas clearly - your core skill', salary: '$60k-85k' },
    { career: 'Policy Analyst', growth: '6%', why: 'Government and think tanks need ethical reasoning and analysis', salary: '$60k-90k' }
  ],
  'Physics': [
    { career: 'Data Scientist', growth: '35%', why: 'Physics problem-solving and math skills are perfect for data science', salary: '$85k-120k' },
    { career: 'Quantitative Analyst', growth: '11%', why: 'Finance firms love physics backgrounds for modeling', salary: '$90k-150k' },
    { career: 'Software Engineer', growth: '22%', why: 'Strong problem-solving transfers to coding', salary: '$80k-130k' },
    { career: 'Data Engineer', growth: '21%', why: 'Build data systems using analytical thinking', salary: '$85k-120k' }
  ],
  'Political Science': [
    { career: 'Policy Analyst', growth: '6%', why: 'Work for government, nonprofits, or think tanks analyzing policy', salary: '$60k-90k' },
    { career: 'Campaign Manager/Political Consultant', growth: '8%', why: 'Electoral politics - project management with real impact', salary: '$50k-100k' },
    { career: 'Nonprofit Program Manager', growth: '9%', why: 'Run programs for advocacy organizations using your policy knowledge', salary: '$55k-80k' },
    { career: 'Government Relations Specialist', growth: '7%', why: 'Help companies navigate regulation and policy', salary: '$70k-110k' }
  ],
  'Psychology': [
    { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior is exactly what tech companies need', salary: '$70k-95k' },
    { career: 'HR Specialist', growth: '10%', why: 'Your understanding of people is valuable in every organization', salary: '$50k-70k' },
    { career: 'Market Research Analyst', growth: '13%', why: 'Study consumer behavior and trends', salary: '$55k-75k' },
    { career: 'Training & Development', growth: '11%', why: 'Help employees learn and grow', salary: '$55k-80k' }
  ],
  'Sociology': [
    { career: 'Market Research Analyst', growth: '13%', why: 'Study social trends and consumer behavior patterns', salary: '$55k-80k' },
    { career: 'HR Specialist', growth: '10%', why: 'Understanding group dynamics and organizational behavior', salary: '$50k-75k' },
    { career: 'Diversity & Inclusion Manager', growth: '11%', why: 'Create equitable workplaces using your social science background', salary: '$65k-95k' },
    { career: 'Community Outreach Coordinator', growth: '8%', why: 'Work with nonprofits and government on social programs', salary: '$45k-65k' }
  ]
};

return (
  <div className="space-y-6">
    <CrisisBanner />
    
    <button
      onClick={() => setCurrentPage('home')}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>
    
    <h2 className="text-3xl font-bold mb-2">Find Your Path</h2>
      <p className="text-gray-600 mb-6">Your major doesn't define your career. See what adjacent fields are actually hiring - and how your skills transfer.</p>

      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-semibold mb-2">Select Your Major:</label>
        <select 
          value={selectedMajor}
          onChange={(e) => setSelectedMajor(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Choose your major...</option>
          {Object.keys(careerPivots).map(major => (
            <option key={major} value={major}>{major}</option>
          ))}
        </select>
      </div>

      {selectedMajor && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Alternative Career Paths for {selectedMajor}:</h3>
          {careerPivots[selectedMajor].map((pivot, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl font-bold text-gray-800">{pivot.career}</h4>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  +{pivot.growth} growth
                </span>
              </div>
              <p className="text-gray-700 mb-2">{pivot.why}</p>
              <p className="text-sm text-gray-500">Typical salary: {pivot.salary}</p>
            </div>
          ))}

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-bold mb-2">Remember:</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• These are real career paths that value your existing skills</li>
              <li>• Growth rates from Bureau of Labor Statistics (2023-2033 projections)</li>
              <li>• Many people who succeed in these fields didn't start there</li>
              <li>• Your "non-traditional" background can be an advantage</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const ResourcesPage = () => (
  <div className="space-y-6">
    <CrisisBanner />
    
    <h2 className="text-3xl font-bold mb-2">Resources to Help You Move Forward</h2>
    <p className="text-gray-600 mb-6">Free tools, guides, and resources for job searching, career building, and mental health.</p>

    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Briefcase className="w-6 h-6 mr-2 text-blue-600" />
        Job Search & Applications
      </h3>
      <ul className="space-y-3">
        <li>
          <a href="https://www.indeed.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            Indeed
          </a>
          <p className="text-sm text-gray-600">Major job board - filter by entry level and location</p>
        </li>
        <li>
          <a href="https://wellfound.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            Wellfound (formerly AngelList)
          </a>
          <p className="text-sm text-gray-600">Startup jobs - often more open to new grads than big companies</p>
        </li>
        <li>
          <a href="https://builtin.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            Built In
          </a>
          <p className="text-sm text-gray-600">Tech jobs at growing companies across the US</p>
        </li>
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
        Resume & Interview Prep
      </h3>
      <ul className="space-y-3">
        <li>
          <a href="https://www.canva.com/resumes/templates/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            Canva Resume Templates
          </a>
          <p className="text-sm text-gray-600">Free, professional resume templates</p>
        </li>
        <li>
          <a href="https://resumeworded.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            Resume Worded
          </a>
          <p className="text-sm text-gray-600">Free resume scanner shows how ATS will read your resume</p>
        </li>
        <li>
          <a href="https://www.themuse.com/advice/interview-questions-and-answers" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            The Muse - Interview Prep
          </a>
          <p className="text-sm text-gray-600">Common interview questions and how to answer them</p>
        </li>
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Heart className="w-6 h-6 mr-2 text-red-600" />
        Mental Health Support
      </h3>
      <ul className="space-y-3">
        <li>
          <a href="https://www.nami.org/Your-Journey/Teens-Young-Adults/College-Students" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            NAMI - College Students
          </a>
          <p className="text-sm text-gray-600">Mental health resources specifically for college students</p>
        </li>
        <li>
          <p className="font-semibold">Your Campus Counseling Center</p>
          <p className="text-sm text-gray-600">Most colleges offer free counseling - search "[your school] counseling"</p>
        </li>
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Users className="w-6 h-6 mr-2 text-purple-600" />
        Career Exploration
      </h3>
      <ul className="space-y-3">
        <li>
          <a href="https://www.bls.gov/ooh/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            Bureau of Labor Statistics
          </a>
          <p className="text-sm text-gray-600">Official data on job growth and salaries</p>
        </li>
        <li>
          <a href="https://www.onetonline.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
            O*NET Online
          </a>
          <p className="text-sm text-gray-600">Explore careers by skills and interests</p>
        </li>
      </ul>
    </div>
  </div>
);


const TrackerPage = () => {
  const [applications, setApplications] = useState([]);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  
  const [newApp, setNewApp] = useState({
    company: '',
    position: '',
    website: '',
    location: '',
    workType: 'Remote',
    dateApplied: '',
    status: 'Waiting to Hear Back',
    applyByDate: '',
    followUpDate: '',
    contactName: '',
    contactEmail: '',
    salary: '',
    notes: ''
  });

  const statusColors = {
    'Waiting to Hear Back': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'Interview Scheduled': 'bg-green-100 text-green-800 border-green-300',
    'Rejected': 'bg-red-100 text-red-800 border-red-300',
    'Withdrew Application': 'bg-blue-100 text-blue-800 border-blue-300'
  };

  const addOrUpdateApplication = () => {
    // Validate required fields
    if (!newApp.company || !newApp.position || !newApp.website || !newApp.location) {
      alert('Please fill out all required fields: Company Name, Position, Job Posting URL, and Location');
      return;
    }

    if (editingId) {
      // Update existing application
      setApplications(applications.map(app => 
        app.id === editingId ? { ...newApp, id: editingId } : app
      ));
      setEditingId(null);
    } else {
      // Add new application
      setApplications([...applications, { ...newApp, id: Date.now() }]);
    }
    
    // Reset form
    setNewApp({
      company: '',
      position: '',
      website: '',
      location: '',
      workType: 'Remote',
      dateApplied: '',
      status: 'Waiting to Hear Back',
      applyByDate: '',
      followUpDate: '',
      contactName: '',
      contactEmail: '',
      salary: '',
      notes: ''
    });
    setShowMoreDetails(false);
  };

  const editApplication = (app) => {
    setNewApp(app);
    setEditingId(app.id);
    setShowMoreDetails(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNewApp({
      company: '',
      position: '',
      website: '',
      location: '',
      workType: 'Remote',
      dateApplied: '',
      status: 'Waiting to Hear Back',
      applyByDate: '',
      followUpDate: '',
      contactName: '',
      contactEmail: '',
      salary: '',
      notes: ''
    });
    setShowMoreDetails(false);
  };

  const deleteApplication = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const toggleCardExpansion = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const downloadCSV = () => {
    if (applications.length === 0) {
      alert('No applications to download. Add some applications first!');
      return;
    }

    const headers = [
      'Company', 'Position', 'Job Posting URL', 'Location', 'Work Type',
      'Date Applied', 'Status', 'Apply By Date', 'Follow-up Date',
      'Contact Name', 'Contact Email', 'Salary/Pay', 'Notes'
    ];
    
    const rows = applications.map(app => [
      app.company,
      app.position,
      app.website,
      app.location,
      app.workType,
      app.dateApplied || '',
      app.status,
      app.applyByDate || '',
      app.followUpDate || '',
      app.contactName || '',
      app.contactEmail || '',
      app.salary || '',
      app.notes ? `"${app.notes.replace(/"/g, '""')}"` : ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-applications-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <CrisisBanner />
      
      <h2 className="text-3xl font-bold mb-2">Track Your Progress</h2>
      <p className="text-gray-600 mb-6">Job searching is a marathon, not a sprint. Track your applications and celebrate every step forward.</p>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Your application data is only saved in your browser and will be lost if you refresh the page. 
          Use the "Download CSV" button to save your list, or consider using a spreadsheet for permanent tracking.
        </p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4">
          {editingId ? 'Edit Application' : 'Add New Application'}
        </h3>
        
        {/* Core Fields - Always Visible */}
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Google"
                value={newApp.company}
                onChange={(e) => setNewApp({...newApp, company: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">
                Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Software Engineer Intern"
                value={newApp.position}
                onChange={(e) => setNewApp({...newApp, position: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Job Posting URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={newApp.website}
                onChange={(e) => setNewApp({...newApp, website: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., San Francisco, CA"
                value={newApp.location}
                onChange={(e) => setNewApp({...newApp, location: e.target.value})}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Work Type</label>
              <div className="flex gap-4">
                {['Remote', 'Hybrid', 'Onsite'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value={type}
                      checked={newApp.workType === type}
                      onChange={(e) => setNewApp({...newApp, workType: e.target.value})}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Date Applied</label>
              <input
                type="date"
                value={newApp.dateApplied}
                onChange={(e) => setNewApp({...newApp, dateApplied: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select
                value={newApp.status}
                onChange={(e) => setNewApp({...newApp, status: e.target.value})}
                className="w-full p-3 border rounded-lg"
              >
                <option>Need to Apply</option>
		<option>Waiting to Hear Back</option>
                <option>Interview Scheduled</option>
                <option>Rejected</option>
                <option>Withdrew Application</option>
              </select>
            </div>
          </div>

          {/* More Details Toggle */}
          <button
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            {showMoreDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {showMoreDetails ? 'Hide' : 'Show'} More Details (Optional)
          </button>

          {/* Additional Fields - Collapsible */}
          {showMoreDetails && (
            <div className="space-y-4 pt-4 border-t">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Apply By Date</label>
                  <input
                    type="date"
                    value={newApp.applyByDate}
                    onChange={(e) => setNewApp({...newApp, applyByDate: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-1">Follow-up Reminder Date</label>
                  <input
                    type="date"
                    value={newApp.followUpDate}
                    onChange={(e) => setNewApp({...newApp, followUpDate: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Contact Person Name</label>
                  <input
                    type="text"
                    placeholder="e.g., John Smith"
                    value={newApp.contactName}
                    onChange={(e) => setNewApp({...newApp, contactName: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-1">Contact Email</label>
                  <input
                    type="email"
                    placeholder="recruiter@company.com"
                    value={newApp.contactEmail}
                    onChange={(e) => setNewApp({...newApp, contactEmail: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Salary/Pay Information</label>
                <input
                  type="text"
                  placeholder="e.g., $25-30/hr or $80k-90k"
                  value={newApp.salary}
                  onChange={(e) => setNewApp({...newApp, salary: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Notes</label>
                <textarea
                  placeholder="Additional notes, interview details, etc."
                  value={newApp.notes}
                  onChange={(e) => setNewApp({...newApp, notes: e.target.value})}
                  rows="3"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={addOrUpdateApplication}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              {editingId ? 'Update Application' : 'Add Application'}
            </button>
            
            {editingId && (
              <button 
                onClick={cancelEdit}
                className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Applications List */}
      {applications.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Your Applications ({applications.length})</h3>
            <button
              onClick={downloadCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold"
            >
              Download CSV
            </button>
          </div>
          
          <div className="space-y-3">
            {applications.map(app => (
              <div key={app.id} className="border-l-4 border-blue-500 bg-gray-50 rounded">
                {/* Card Header - Always Visible */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{app.company}</h4>
                      <p className="text-gray-700">{app.position}</p>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${statusColors[app.status]}`}>
                          {app.status}
                        </span>
                        <span className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-700">
                          {app.workType}
                        </span>
                        {app.dateApplied && (
                          <span className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-700">
                            Applied: {app.dateApplied}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => editApplication(app)}
                        className="text-blue-600 hover:text-blue-800 p-2"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteApplication(app.id)}
                        className="text-red-600 hover:text-red-800 p-2"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleCardExpansion(app.id)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1 mt-2"
                  >
                    {expandedCards[app.id] ? (
                      <>
                        <ChevronUp className="w-4 h-4" /> Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" /> Show All Details
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Details */}
                {expandedCards[app.id] && (
                  <div className="px-4 pb-4 border-t pt-3 space-y-2 text-sm">
                    <div><strong>Location:</strong> {app.location}</div>
                    {app.website && (
                      <div>
                        <strong>Job Posting:</strong>{' '}
                        <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          View →
                        </a>
                      </div>
                    )}
                    {app.applyByDate && <div><strong>Apply By:</strong> {app.applyByDate}</div>}
                    {app.followUpDate && <div><strong>Follow-up:</strong> {app.followUpDate}</div>}
                    {app.contactName && <div><strong>Contact:</strong> {app.contactName}</div>}
                    {app.contactEmail && (
                      <div>
                        <strong>Email:</strong>{' '}
                        <a href={`mailto:${app.contactEmail}`} className="text-blue-600 hover:underline">
                          {app.contactEmail}
                        </a>
                      </div>
                    )}
                    {app.salary && <div><strong>Salary:</strong> {app.salary}</div>}
                    {app.notes && (
                      <div>
                        <strong>Notes:</strong>
                        <p className="mt-1 text-gray-700 whitespace-pre-wrap">{app.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Encouragement Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h4 className="font-bold mb-3">Celebrate Small Wins 🎉</h4>
        <p className="text-gray-700 mb-3">Every application is progress. Every customized cover letter is practice. Every interview is a learning experience.</p>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Applied to 10 jobs? That's 10 chances you didn't have before.</li>
          <li>• Got a rejection? You're one step closer to the right fit.</li>
          <li>• Didn't get the job after an interview? You got interview practice.</li>
        </ul>
      </div>
    </div>
  );
};

const CrisisPage = ({ setCurrentPage }) => (
  <div className="space-y-6">
    <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded">
      <h2 className="text-2xl font-bold text-red-800 mb-4">If You're In Crisis</h2>
      <p className="text-red-700 mb-4 text-lg">If you're thinking about hurting yourself, please reach out right now. This feeling is temporary. You matter.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <Phone className="w-10 h-10 text-red-500 mb-3" />
        <h3 className="text-xl font-bold mb-2">988 Suicide & Crisis Lifeline</h3>
        <p className="text-3xl font-bold text-red-600 mb-2">Call or Text: 988</p>
        <p className="text-gray-600">Available 24/7. Free. Confidential. Someone will listen.</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
        <MessageCircle className="w-10 h-10 text-red-500 mb-3" />
        <h3 className="text-xl font-bold mb-2">Crisis Text Line</h3>
        <p className="text-3xl font-bold text-red-600 mb-2">Text HOME to 741741</p>
        <p className="text-gray-600">If you prefer texting. 24/7. Trained counselors.</p>
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-3">Other Resources</h3>
      <ul className="space-y-3">
        <li>
          <strong>Campus Counseling Center:</strong> Most colleges offer free counseling services. Check your school's health services website.
        </li>
        <li>
          <strong>National Alliance on Mental Illness (NAMI):</strong> Text "NAMI" to 741741 or visit nami.org
        </li>
        <li>
          <strong>The Trevor Project (LGBTQ+ Youth):</strong> 1-866-488-7386 or text START to 678-678
        </li>
      </ul>
    </div>

    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 className="font-bold text-lg mb-3">Things That Might Help Right Now</h3>
      <ul className="space-y-2 text-gray-700">
        <li>• Call or text someone - a friend, family member, roommate. Just say "I'm not doing well."</li>
        <li>• Go somewhere public - a coffee shop, library, campus center. Being around people helps.</li>
        <li>• Take a walk outside, even for 5 minutes. Movement can shift your mental state.</li>
        <li>• Remember: This feeling is temporary. You've survived 100% of your worst days so far.</li>
        <li>• You are not a burden. People want to help. Let them.</li>
      </ul>
    </div>

    <div className="bg-white rounded-lg shadow p-6 text-center">
      <h3 className="text-xl font-bold mb-3">You Are Not Alone</h3>
      <p className="text-gray-700 mb-4">Many students have felt exactly like you do right now. Many have gotten through it and gone on to live meaningful lives. You can too.</p>
      <button 
        onClick={() => setCurrentPage('stories')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Read Their Stories
      </button>
    </div>
  </div>
);

const ResumeBuilderPage = () => (
  <div className="space-y-6">
    <CrisisBanner />
    <h2 className="text-3xl font-bold mb-2">Resume Builder</h2>
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
      <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">Coming Soon!</h3>
      <p className="text-gray-700">We're building an interactive guide that teaches you how to create a resume that showcases YOUR experiences effectively.</p>
    </div>
  </div>
);

const InterviewPrepPage = () => (
  <div className="space-y-6">
    <CrisisBanner />
    <h2 className="text-3xl font-bold mb-2">Interview Prep Guide</h2>
    <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
      <MessageCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">Coming Soon!</h3>
      <p className="text-gray-700">Interview preparation guide with common questions, STAR method examples, and tips for success.</p>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [newApp, setNewApp] = useState({ company: '', position: '', date: '', website: '' });

  // Handle SearchGuide page separately since it's a different component
  if (currentPage === 'search-guide') {
    return <SearchGuide onBack={() => setCurrentPage('home')} />;
  }

 // Handle ResumeBuilder page separately since it's a different component
  if (currentPage === 'resume-builder') {
    return <ResumeBuilder onBack={() => setCurrentPage('home')} />;
  }

 // Handle YoureNotAlone page separately since it's a different component
  if (currentPage === 'youre-not-alone') {
    return <YoureNotAlone onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />;
  }

// Handle Contact page
if (currentPage === 'contact') {
  return <Contact onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />;
}

// Handle StudyResources page
if (currentPage === 'study-resources') {
  return <StudyResources onBack={() => setCurrentPage('home')} />;
}
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentPage === 'home' && <WarmHomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'find-internships' && <FindInternshipsPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'resume-builder' && <ResumeBuilderPage />}
        {currentPage === 'interview-prep' && <InterviewPrepPage />}
        {currentPage === 'stories' && <StoriesPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'pivot' && <PivotPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'resources' && <ResourcesPage />}
        {currentPage === 'tracker' && (
          <TrackerPage 
            applications={applications}
            setApplications={setApplications}
            newApp={newApp}
            setNewApp={setNewApp}
          />
        )}
        {currentPage === 'crisis' && <CrisisPage setCurrentPage={setCurrentPage} />}
      </main>

      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-4">
            <h3 className="font-bold mb-2">About This Site</h3>
           <p className="text-gray-300 text-sm">
        Created by someone who wanted to help students see they have more choices than they think. 
        This is a passion project, not a corporation - just someone who cares.
      </p>
      <p className="text-gray-300 text-sm mt-2">
        Questions?{' '}
        <a href="mailto:support@morethanoneway.org" className="text-blue-300 hover:text-blue-200 underline">
          support@morethanoneway.org
        </a>
        {' '}|{' '}
        <button 
          onClick={() => setCurrentPage('contact')} 
          className="text-blue-300 hover:text-blue-200 underline"
        >
          Contact Us
        </button>
      </p>
    </div>
    <div className="text-center text-sm text-gray-400">
      <p>If you're in crisis: Call or text 988 | Text HOME to 741741</p>
      <p className="mt-2">© 2025 MoreThanOneWay.org</p>
    </div>
  </div>
</footer>
    </div>
  );
}


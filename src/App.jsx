import React, { useState } from "react";
import { useNavigate, Routes, Route, useParams, Navigate } from 'react-router-dom';

import { Heart, MessageCircle, Sparkles, GraduationCap, Phone, TrendingUp, Briefcase, Users, ChevronRight, Menu, X, BookOpen, Search, ExternalLink, Building, DollarSign, HelpCircle, AlertCircle, ChevronDown, ChevronUp, Edit2, Trash2, FileText, Target, ArrowLeft, Newspaper, Smile, Instagram, Facebook } from 'lucide-react';
import ResumeBuilder from './ResumeBuilder';
import YoureNotAlone from './YoureNotAlone';
import Contact from './Contact';
import SearchGuide from './SearchGuide';
import StudyResources from './StudyResources';
import InterviewPrep from './InterviewPrep';
import JobAlertGuide from './Jobalertguide';
import ShareButtons from './Sharebuttons';
import RecommendedReading from './RecommendedReading';
import ResourcesPage from "./ResourcesPage";
import StoriesPage from './StoriesPage';
import WarmHomePage from './WarmHomePage';
import AboutPage from './Aboutpage';
import JobToolsHub from './JobToolsHub';
import NeedALaugh from './NeedALaugh';
import Volunteer from './Volunteer';
import BlogPage from './BlogPage';
import BlogPost from './BlogPost';
import PageHero from "./components/PageHero";
import ATSGuide from './Atsguide';
import FindInternshipsPage from './FindInternshipsPage';
import './warm-design.css';
import StoryDetail from './StoryDetail';
import FindOpportunitiesHub from './FindOpportunitiesHub';
import ResourcesHub from './ResourcesHub';
import CoverLetterGenerator from './CoverLetterGenerator';
import StrugglingInClasses from './StrugglingInClasses';
import FamilyNotSupportive from './FamilyNotSupportive';
import FeelingAlone from './FeelingAlone';
import DontWantToBeHere from './DontWantToBeHere';
import CantAffordCollege from './CantAffordCollege';
import NoIdeaWhatToDo from './NoIdeaWhatToDo';
import EverythingIsTooMuch from './EverythingIsTooMuch';
import CareerServicesNoIdea from './CareerServicesNoIdea';
import HateMyMajor from './HateMyMajor';
import FirstGenerationStudent from './FirstGenerationStudent';
import AcademicProbation from './AcademicProbation';
import BurntOut from './BurntOut';
import ThinkingAboutTransferring from './ThinkingAboutTransferring';

const SectionHeader = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-10">
    <div className="flex items-center gap-4 mb-2">
      <div className="w-11 h-11 rounded-xl bg-[#006581]/10 ring-1 ring-[#006581]/15 flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#006581]" strokeWidth={1.75} />
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
        {title}
      </h2>
    </div>
    <p className="text-gray-600 max-w-3xl">
      {subtitle}
    </p>
  </div>
);


const DropdownMenu = ({ title, items, groups, currentPage, setCurrentPage, isMobile = false, onTitleClick }) => {
  const [open, setOpen] = useState(false);

  const go = (page) => {
    setCurrentPage(page);
    setOpen(false);
  };

  if (isMobile) {
    return (
      <div className="mt-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-2 text-left hover:text-blue-200"
        >
          <span>{title}</span>
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {open && (
          <div className="pl-3 space-y-1">
            {groups ? groups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-3 pt-2 pb-1">{group.label}</p>
                {group.items.map((item) => (
                  <button key={item.page} type="button" onClick={() => go(item.page)}
                    className="block w-full text-left py-2 px-3 rounded hover:text-blue-200">
                    <span className="inline-flex items-center gap-2">{item.icon}{item.label}</span>
                  </button>
                ))}
              </div>
            )) : items.map((item) => (
              <button key={item.page} type="button" onClick={() => go(item.page)}
                className={`block w-full text-left py-2 px-3 rounded ${currentPage === item.page ? "bg-white/10 text-blue-200 font-semibold" : "hover:text-blue-200"}`}>
                <span className="inline-flex items-center gap-2">{item.icon}{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button"
        onClick={() => onTitleClick ? onTitleClick() : setOpen(!open)}
        className="hover:text-blue-200 flex items-center gap-1">
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 z-50">
          <div className="bg-white text-gray-800 rounded-lg shadow-lg py-2 min-w-[300px]">
            {groups ? groups.map((group) => (
              <div key={group.label}>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide px-4 pt-3 pb-1">{group.label}</p>
                {group.items.map((item) => (
                  <button key={item.page} type="button" onClick={() => go(item.page)}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-sm">
                    {item.icon}{item.label}
                  </button>
                ))}
              </div>
            )) : items.map((item) => (
              <button key={item.page} type="button" onClick={() => go(item.page)}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2 text-sm">
                {item.icon}{item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// Crisis Banner Component
const CrisisBanner = () => (
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
);

const NavBar = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const findOpportunitiesItems = [
    { page: 'find-internships', label: 'Find Internships', icon: <Search className="w-4 h-4" /> },
    { page: 'search-guide', label: 'Search Guide', icon: <BookOpen className="w-4 h-4" /> },
    { page: 'job-alert', label: 'Job Alert Guide', icon: <Target className="w-4 h-4" /> },
  ];

  const jobToolsItems = [
    { page: 'job-tools-hub', label: 'Job Tools Hub', icon: <Briefcase className="w-4 h-4" /> },
    { page: 'resume-builder', label: 'Resume Builder', icon: <FileText className="w-4 h-4" /> },
    { page: 'cover-letter', label: 'Cover Letter Generator', icon: <FileText className="w-4 h-4" /> },
    { page: 'ats-guide', label: 'ATS Guide', icon: <Search className="w-4 h-4" /> },
    { page: 'tracker', label: 'Application Tracker', icon: <Target className="w-4 h-4" /> },
    { page: 'interview-prep', label: 'Interview Prep', icon: <MessageCircle className="w-4 h-4" /> },
    { page: 'pivot', label: 'Career Paths', icon: <TrendingUp className="w-4 h-4" /> },
  ];

const supportGroups = [
  {
    label: 'Academic',
    items: [
      { page: 'struggling-in-classes', label: 'Failing or Struggling in Classes', icon: <BookOpen className="w-4 h-4" /> },
      { page: 'academic-probation', label: 'Failed a Class / Academic Probation', icon: <AlertCircle className="w-4 h-4" /> },
      { page: 'hate-my-major', label: 'I Hate My Major', icon: <BookOpen className="w-4 h-4" /> },
      { page: 'thinking-about-transferring', label: 'Thinking About Transferring', icon: <Building className="w-4 h-4" /> },
    ]
  },
  {
    label: 'Career & Future',
    items: [
      { page: 'career-services-no-idea', label: 'Career Services No Help', icon: <Building className="w-4 h-4" /> },
      { page: 'no-idea-what-to-do', label: 'No Idea What to Do', icon: <HelpCircle className="w-4 h-4" /> },
    ]
  },
  {
    label: 'Personal',
    items: [
      { page: 'family-not-supportive', label: "Family Isn't Supportive", icon: <Heart className="w-4 h-4" /> },
      { page: 'feeling-alone', label: 'Feeling Completely Alone', icon: <Users className="w-4 h-4" /> },
      { page: 'burnt-out', label: "I'm Burnt Out", icon: <Heart className="w-4 h-4" /> },
      { page: 'cant-afford-college', label: "Can't Afford College", icon: <DollarSign className="w-4 h-4" /> },
      { page: 'first-generation-student', label: "I'm a First-Gen Student", icon: <GraduationCap className="w-4 h-4" /> },
      { page: 'dont-want-to-be-here', label: "Don't Want to Be Here", icon: <AlertCircle className="w-4 h-4" /> },
      { page: 'everything-is-too-much', label: "It's Just... Everything", icon: <AlertCircle className="w-4 h-4" /> },
      { page: 'crisis', label: 'In Crisis Right Now', icon: <Phone className="w-4 h-4" /> },
    ]
  },
];

  const resourcesItems = [
    { page: 'resources', label: 'Career Resources', icon: <Briefcase className="w-4 h-4" /> },
    { page: 'study-resources', label: 'Free Study Help', icon: <BookOpen className="w-4 h-4" /> },
    { page: 'blog', label: 'Blog', icon: <Newspaper className="w-4 h-4" /> },
    { page: 'need-a-laugh', label: 'Need a Laugh?', icon: <Smile className="w-4 h-4" /> },
    { page: 'volunteer', label: 'Volunteer Opportunities', icon: <Heart className="w-4 h-4" /> }
  ];

  return (
    <nav className="bg-[#FFFBF7] text-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200">

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold cursor-pointer" onClick={() => setCurrentPage('home')}>
              More Than One Way
            </h1>
          </div>

          {/* Right side - Desktop Nav + Mobile Controls */}
          <div className="flex items-center gap-3">

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-8">

              <button
                onClick={() => setCurrentPage('home')}
                className="hover:text-blue-200"
              >
                Home
              </button>

              <DropdownMenu
                title="Find Opportunities"
                onTitleClick={() => setCurrentPage('find-opportunities-hub')}
                items={findOpportunitiesItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isMobile={false}
              />

              <DropdownMenu
                title="Job Tools"
                onTitleClick={() => setCurrentPage('job-tools-hub')}
                items={jobToolsItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isMobile={false}
              />

              <DropdownMenu
                title="Support"
                onTitleClick={() => setCurrentPage('youre-not-alone')}
                items={supportItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isMobile={false}
              />

              <button
                onClick={() => setCurrentPage('stories')}
                className="hover:text-blue-200"
              >
                Stories
              </button>

              <DropdownMenu
                title="Resources"
                onTitleClick={() => setCurrentPage('resources-hub')}
                items={resourcesItems}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                isMobile={false}
              />

              <button
                onClick={() => setCurrentPage('about')}
                className="hover:text-blue-200"
              >
                About
              </button>

              <button
                onClick={() => setCurrentPage('crisis')}
                className="bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-400 whitespace-nowrap transition-colors"
              >
                Need Help Now
              </button>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <button
                onClick={() => setCurrentPage('crisis')}
                className="bg-orange-500 px-3 py-2 rounded text-sm font-semibold hover:bg-orange-400 whitespace-nowrap transition-colors"
              >
                Need Help Now
              </button>
            </div>

          </div>

        </div>

        {/* Unified Navigation Menu - Works on Desktop AND Mobile */}
        {mobileMenuOpen && (
          <div
            className="
      fixed z-40
      top-[64px]          /* just below the navbar */
      left-0 right-0
      w-full              /* full width on mobile */
      md:left-auto md:right-4 md:w-80 md:rounded-xl
      bg-[#FFFBF7] 
      border border-gray-200
      shadow-soft
      max-h-[80vh] overflow-y-auto 
      pb-4 space-y-2 px-4
    "
          >
            <button
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left hover:text-blue-200 py-2"
            >
              Home
            </button>

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
              title="Job Tools"
              items={jobToolsItems}
              currentPage={currentPage}
              setCurrentPage={(page) => {
                setCurrentPage(page);
                setMobileMenuOpen(false);
              }}
              isMobile={true}
            />

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

            <button
              onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
              className="block w-full text-left hover:text-blue-200 py-2 border-t border-blue-500 pt-2 mt-2"
            >
              About
            </button>

            <button
              onClick={() => { setCurrentPage('crisis'); setMobileMenuOpen(false); }}
              className="block w-full text-left bg-orange-500 px-4 py-2 rounded hover:bg-orange-400 mt-2"
            >
              Need Help Now?
            </button>

            {/* ⬇⬇ ADD THIS SOCIAL SECTION ⬇⬇ */}
            <div className="mt-4 border-t border-white/25 pt-4">

              <div className="flex justify-center gap-6 mb-2">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/morethanonewayproject/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-white/90 hover:text-pink-300 transition-all hover:scale-105"
                  aria-label="Follow us on Instagram"
                >
                  <div className="bg-white/10 p-3 rounded-xl hover:bg-pink-600/80 transition-all">
                    <Instagram className="w-6 h-6" />
                  </div>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/morethanonewayproject"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 text-white/90 hover:text-blue-300 transition-all hover:scale-105"
                  aria-label="Follow us on Facebook"
                >
                  <div className="bg-white/10 p-3 rounded-xl hover:bg-blue-600/80 transition-all">
                    <Facebook className="w-6 h-6" />
                  </div>
                </a>
              </div>
            </div>
            {/* ⬆⬆ END SOCIAL SECTION ⬆⬆ */}

          </div>
        )}


      </div>
    </nav>
  );
};


const HomePage = ({ setCurrentPage }) => (
  <div className="space-y-8">


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

      {/* Hero Section */}
      <div>
        <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">Explore {" "}
          <span className="block md:inline text-tealBrand">
            Career Paths</span> </h1>
        <p className="mt-3 text-center text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
          Your major doesn't lock you in. See adjacent roles that value the same skills — even if the title looks different.
        </p>


        <div className="mt-10 flex flex-col md:flex-row gap-3 justify-center">


          <button
            onClick={() => setCurrentPage("search-guide")}
            className="bg-gray-900 text-white px-7 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all"
          >
            Search guide
          </button>

          <button
            onClick={() => setCurrentPage("find-internships")}
            className="bg-white text-gray-700 px-7 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-100 transition-all"
          >
            Find internships
          </button>

        </div>
      </div>

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
              <li>‣ These are real career paths that value your existing skills</li>
              <li>‣ Growth rates from Bureau of Labor Statistics (2023-2033 projections)</li>
              <li>‣ Many people who succeed in these fields didn't start there</li>
              <li>‣ Your "non-traditional" background can be an advantage</li>
            </ul>
          </div>
        </div>
      )}

      {/* Share Buttons */}
      <ShareButtons
        title="Career Path Alternatives - MoreThanOneWay.org"
        message="Know someone questioning their major?"
      />
    </div>
  );
};

const TrackerPage = ({ setCurrentPage }) => {
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
    document.body.appendChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">

      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10 ">
        {/* Hero Section - Cleaner + More Professional */}
        <header className="text-center max-w-5xl mx-auto pt-2">
          <h2 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Application {" "}
            <span className="block md:inline text-tealBrand">
              Tracker
            </span>
          </h2>

          <p className="mt-3 text-center text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
            Because someone wanted you to know there's more than one way forward.
          </p>
        </header>
      </div>
      <div className="mt-10 flex flex-col md:flex-row gap-3 justify-center">
        <button
          onClick={() => setCurrentPage("find-internships")}
          className="bg-gray-900 text-white px-7 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all"
        >
          Find opportunities
        </button>

        <button
          onClick={() => setCurrentPage("job-tools-hub")}
          className="bg-white text-gray-700 px-7 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-100 transition-all"
        >
          Job tools hub
        </button>

      </div>

      <div className="rounded-xl bg-tealBrand/5 border border-gray-200 p-3">
        <p className="text-sm text-gray-800">
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
                onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
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
                onChange={(e) => setNewApp({ ...newApp, position: e.target.value })}
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
                onChange={(e) => setNewApp({ ...newApp, website: e.target.value })}
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
                onChange={(e) => setNewApp({ ...newApp, location: e.target.value })}
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
                      onChange={(e) => setNewApp({ ...newApp, workType: e.target.value })}
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
                onChange={(e) => setNewApp({ ...newApp, dateApplied: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select
                value={newApp.status}
                onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
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
                    onChange={(e) => setNewApp({ ...newApp, applyByDate: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Follow-up Reminder Date</label>
                  <input
                    type="date"
                    value={newApp.followUpDate}
                    onChange={(e) => setNewApp({ ...newApp, followUpDate: e.target.value })}
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
                    onChange={(e) => setNewApp({ ...newApp, contactName: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Contact Email</label>
                  <input
                    type="email"
                    placeholder="recruiter@company.com"
                    value={newApp.contactEmail}
                    onChange={(e) => setNewApp({ ...newApp, contactEmail: e.target.value })}
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
                  onChange={(e) => setNewApp({ ...newApp, salary: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Notes</label>
                <textarea
                  placeholder="Additional notes, interview details, etc."
                  value={newApp.notes}
                  onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })}
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
              className="bg-tealBrand text-white px-6 py-2 rounded-lg hover:bg-tealBrand/70 font-semibold"
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
      <div className="mt-8 rounded-3xl bg-[#006581] text-white p-10 md:p-12 shadow-lg shadow-black/10">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          <div className="flex justify-center">
            <div className="rounded-xl bg-white/10 ring-1 ring-white/20 p-4">
              <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Celebrate Small Wins</h3>
          <p className="text-base md:text-lg leading-relaxed text-white/90">Every application is progress. Every customized cover letter is practice. Every interview is a learning experience.</p>
          <ul className="text-base md:text-lg leading-relaxed text-white/90">
            <li>• Applied to 10 jobs? That's 10 chances you didn't have before.</li>
            <li>• Got a rejection? You're one step closer to the right fit.</li>
            <li>• Didn't get the job after an interview? You got interview practice.</li>
          </ul>

        </div>
      </div>
    </div>
  );
};


const CrisisPage = ({ setCurrentPage }) => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl shadow-soft">
      <div className="flex items-start gap-3">
        <Heart className="w-10 h-10 text-red-500 mb-3" fill="currentColor" />
        <div>
          <h3 className="font-bold text-red-800 mb-1">If You're In Crisis</h3>
          <p className="text-red-700 text-sm mb-2">
            <strong>It may not seem like it now, but this feeling is temporary. You matter.</strong><br />
          </p>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-soft p-8 border-l-4 border-red-500 p-5 rounded-xl shadow-soft">
        <Phone className="w-10 h-10 text-red-500 mb-3" />
        <h3 className="text-xl font-bold mb-2">988 Suicide & Crisis Lifeline</h3>
        <p className="text-3xl font-bold text-red-600 mb-2">Call or Text: 988</p>
        <p className="text-gray-600">Available 24/7. Free. Confidential. Someone will listen.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-8 border-l-4 border-red-500 p-5 rounded-xl shadow-soft">
        <MessageCircle className="w-10 h-10 text-red-500 mb-3" />
        <h3 className="text-xl font-bold mb-2">Crisis Text Line</h3>
        <p className="text-3xl font-bold text-red-600 mb-2">Text HOME to 741741</p>
        <p className="text-gray-600">If you prefer texting. 24/7. Trained counselors.</p>
      </div>
    </div>

    <div className="bg-blue-50 rounded-2xl shadow-soft p-8 border-l-4 border-blue-200 p-5 rounded-xl shadow-soft">
      <h3 className="text-xl font-bold mb-3">More Crisis Support</h3>
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
        <li>
          <strong>Trans Lifeline:</strong> 1-877-565-8860
        </li>
        <li>
          <strong>National Domestic Violence Hotline: </strong> 1-800-799-SAFE(7233)
        </li>
        <li>
          <strong>National Maternal Mental Health Hotline: </strong> 1-833-TLC-MAMA (833-852-6262)
        </li>
        <li>
          <strong>Blackline (Black, Brown, Native & Muslim Support): </strong> 1-800-604-5841
        </li>
        <li>
          <strong>National Substance Abuse & Mental Health Services Administration Helpline:</strong> 1-800-622-HELP (4357)
        </li>
      </ul>
    </div>

    <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-soft p-8 border-l-4 border-green-400">
      <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
        <span className="text-2xl">📱</span>
        Helpful Apps (100% Free)
      </h3>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-1">Calm Harm</h4>
          <p className="text-gray-700 text-sm mb-2">Helps when you want to self-harm. Provides distractions and activities when you're overwhelmed.</p>
          <a href="https://calmharm.co.uk/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline text-sm">Download here</a>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-1">Sanvello (formerly Pacifica)</h4>
          <p className="text-gray-700 text-sm mb-2">Anxiety and mood tracking with coping tools. Free basic features.</p>
          <a href="https://www.sanvello.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline text-sm">Visit Sanvello.com</a>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-1">MindShift</h4>
          <p className="text-gray-700 text-sm mb-2">CBT-based app for anxiety management. Made by Anxiety Canada - completely free.</p>
          <a href="https://anxietycanada.com/resources/mindshift-app/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline text-sm">Download MindShift</a>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-1">PTSD Coach</h4>
          <p className="text-gray-700 text-sm mb-2">From the VA - helps manage PTSD symptoms. Completely free.</p>
          <a href="https://www.ptsd.va.gov/appvid/mobile/ptsdcoach_app.asp" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline text-sm">Get PTSD Coach</a>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-200">
          <h4 className="font-bold text-gray-900 mb-1">Rethink</h4>
          <p className="text-gray-700 text-sm mb-2">For stress, anxiety, and depression management. Basic features are free.</p>
          <a href="https://rethinkcareapp.com/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline text-sm">Visit RethinkCare</a>
        </div>
      </div>
    </div>

    <div className="bg-yellow-50 rounded-2xl shadow-soft p-8 border-l-4 border-yellow-200 p-5 rounded-xl shadow-soft">
      <h3 className="font-bold text-lg mb-3">Things That Might Help Right Now</h3>
      <ul className="space-y-2 text-gray-700">
        <li>• Call or text someone - a friend, family member, roommate. Just say "I'm not doing well."</li>
        <li>• Go somewhere public - a coffee shop, library, campus center. Being around people helps.</li>
        <li>• Take a walk outside, even for 5 minutes. Movement can shift your mental state.</li>
        <li>• Remember: This feeling is temporary. You've survived 100% of your worst days so far.</li>
        <li>• You are not a burden. People want to help. Let them.</li>
      </ul>
    </div>

    <div className="bg-white rounded-2xl shadow-soft p-8 rounded-xl shadow-soft text-center">
      <h3 className="text-xl font-bold mb-3">You Are Not Alone</h3>
      <p className="text-gray-700 mb-4">
        Many students have felt exactly like you do right now. Many have gotten through it and gone on to live meaningful lives. You can too.
      </p>
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

    <h2 className="text-3xl font-bold mb-2">Resume Builder</h2>
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
      <FileText className="w-16 h-16 text-blue-500 mx-auto mb-4" />
      <h3 className="text-xl font-bold mb-2">Coming Soon!</h3>
      <p className="text-gray-700">We're building an interactive guide that teaches you how to create a resume that showcases YOUR experiences effectively.</p>
    </div>
  </div>
);

// Wrapper for BlogPost that reads the slug from the URL
const BlogPostWrapper = ({ setCurrentPage }) => {
  const { slug } = useParams();
  return (
    <BlogPost
      setCurrentPage={setCurrentPage}
      selectedPostSlug={slug}
      setSelectedPostSlug={(newSlug) => setCurrentPage('blog/' + newSlug)}
    />
  );
};

export default function App() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // setCurrentPage is a drop-in replacement — all child components keep working unchanged
  const setCurrentPage = (page) => {
    setMobileMenuOpen(false);
    if (page === 'home') {
      navigate('/');
    } else {
      navigate('/' + page);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-gray-900">
      <NavBar
        currentPage={null}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="w-full px-6 lg:px-12 py-10">
        <Routes>
          <Route path="/" element={<WarmHomePage setCurrentPage={setCurrentPage} />} />
          <Route path="/find-internships" element={<FindInternshipsPage setCurrentPage={setCurrentPage} />} />
          <Route path="/resume-builder" element={<ResumeBuilder onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />} />
          <Route path="/ats-guide" element={<ATSGuide setCurrentPage={setCurrentPage} />} />
          <Route path="/study-resources" element={<StudyResources onBack={() => setCurrentPage('home')} />} />
          <Route path="/youre-not-alone" element={<YoureNotAlone onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />} />
          <Route path="/interview-prep" element={<InterviewPrep />} />
          <Route path="/job-alert" element={<JobAlertGuide onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />} />
          <Route path="/search-guide" element={<SearchGuide onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />} />
          <Route path="/need-a-laugh" element={<NeedALaugh onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />} />
          <Route path="/volunteer" element={<Volunteer onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />} />
          <Route path="/stories" element={<StoriesPage setCurrentPage={setCurrentPage} />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/pivot" element={<PivotPage setCurrentPage={setCurrentPage} />} />
          <Route path="/about" element={<AboutPage setCurrentPage={setCurrentPage} />} />
          <Route path="/contact" element={<Contact onBack={() => setCurrentPage('home')} setCurrentPage={setCurrentPage} />} />
          <Route path="/job-tools-hub" element={<JobToolsHub setCurrentPage={setCurrentPage} />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/tracker" element={<TrackerPage setCurrentPage={setCurrentPage} />} />
          <Route path="/crisis" element={<CrisisPage setCurrentPage={setCurrentPage} />} />
          <Route path="/blog" element={<BlogPage setCurrentPage={setCurrentPage} setSelectedPostSlug={(slug) => navigate('/blog/' + slug)} />} />
          <Route path="/blog/:slug" element={<BlogPostWrapper setCurrentPage={setCurrentPage} />} />
          <Route path="/cover-letter" element={<CoverLetterGenerator setCurrentPage={setCurrentPage} />} />
          <Route path="/find-opportunities-hub" element={<FindOpportunitiesHub setCurrentPage={setCurrentPage} />} />
          <Route path="/resources-hub" element={<ResourcesHub setCurrentPage={setCurrentPage} />} />
          <Route path="/struggling-in-classes" element={<StrugglingInClasses setCurrentPage={setCurrentPage} />} />
          <Route path="/family-not-supportive" element={<FamilyNotSupportive />} />
          <Route path="/feeling-alone" element={<FeelingAlone setCurrentPage={setCurrentPage} />} />
          <Route path="/dont-want-to-be-here" element={<DontWantToBeHere setCurrentPage={setCurrentPage} />} />
          <Route path="/cant-afford-college" element={<CantAffordCollege />} />
          <Route path="/no-idea-what-to-do" element={<NoIdeaWhatToDo setCurrentPage={setCurrentPage} />} />
          <Route path="/everything-is-too-much" element={<EverythingIsTooMuch setCurrentPage={setCurrentPage} />} />
          <Route path="/career-services-no-idea" element={<CareerServicesNoIdea setCurrentPage={setCurrentPage} />} />
          <Route path="/hate-my-major" element={<HateMyMajor setCurrentPage={setCurrentPage} />} />
          <Route path="/first-generation-student" element={<FirstGenerationStudent setCurrentPage={setCurrentPage} />} />
          <Route path="/academic-probation" element={<AcademicProbation setCurrentPage={setCurrentPage} />} />
          <Route path="/burnt-out" element={<BurntOut setCurrentPage={setCurrentPage} />} />
          <Route path="/thinking-about-transferring" element={<ThinkingAboutTransferring setCurrentPage={setCurrentPage} />} />
          {/* Catch-all: redirect unknown URLs to home */}
        </Routes>
      </main>
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h3 className="font-bold mb-4">Follow Our Journey</h3>
            <div className="flex justify-center gap-6 mb-6">
              <a
                href="https://www.instagram.com/morethanonewayproject/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-gray-300 hover:text-pink-400 transition-all hover:scale-110"
                aria-label="Follow us on Instagram"
              >
                <div className="bg-gray-700 p-3 rounded-xl hover:bg-pink-600 transition-all">
                  <Instagram className="w-6 h-6" />
                </div>
              </a>

              <a
                href="https://www.facebook.com/morethanonewayproject"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-gray-300 hover:text-blue-400 transition-all hover:scale-110"
                aria-label="Follow us on Facebook"
              >
                <div className="bg-gray-700 p-3 rounded-xl hover:bg-blue-600 transition-all">
                  <Facebook className="w-6 h-6" />
                </div>
              </a>
            </div>
          </div>

          <div className="text-center mb-4">
            <h3 className="font-bold mb-2">About This Site</h3>
            <p className="text-gray-300 text-sm">
              Created to help students see that there's more than one way forward.
            </p>
            <p className="text-gray-300 text-sm">
              A free, student-focused project — not a corporation, not therapy.
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
            <p className="mt-2">© 2026 MoreThanOneWay.org</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

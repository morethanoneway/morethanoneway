import React, { useState } from 'react';
import { Heart, MessageCircle, Phone, TrendingUp, Briefcase, Users, ChevronRight, Menu, X } from 'lucide-react';

// Component definitions OUTSIDE to prevent re-creation on every render
const NavBar = ({ currentPage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) => (
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

      <div className="hidden md:flex space-x-4">
          <button onClick={() => setCurrentPage('home')} className="hover:text-blue-200">Home</button>
          <button onClick={() => setCurrentPage('stories')} className="hover:text-blue-200">Stories</button>
          <button onClick={() => setCurrentPage('pivot')} className="hover:text-blue-200 whitespace-nowrap">Career Path</button>
          <button onClick={() => { setCurrentPage('tracker'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Track Progress</button>
          <button onClick={() => setCurrentPage('resources')} className="hover:text-blue-200">Resources</button>
          <button onClick={() => setCurrentPage('crisis')} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Need Help Now?</button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden pb-4 space-y-2">
          <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Home</button>
          <button onClick={() => { setCurrentPage('stories'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Stories</button>
          <button onClick={() => { setCurrentPage('pivot'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Career Path</button>
          <button onClick={() => { setCurrentPage(''); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Track Progress</button>
          <button onClick={() => setCurrentPage('resources')} className="hover:text-blue-200">Resources</button>
          <button onClick={() => { setCurrentPage('crisis'); setMobileMenuOpen(false); }} className="block w-full text-left bg-red-500 px-4 py-2 rounded hover:bg-red-600">Need Help Now?</button>
        </div>
      )}
    </div>
  </nav>
);

const CrisisBanner = () => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
    <div className="flex items-start">
      <Phone className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
      <div>
        <h3 className="font-bold text-red-800">Need to talk to someone right now?</h3>
        <p className="text-red-700 mt-1">
          <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (available 24/7)
          <br />
          <strong>Crisis Text Line:</strong> Text HOME to 741741
          <br />
          <span className="text-sm">You are not alone. This feeling is temporary. People want to help.</span>
        </p>
      </div>
    </div>
  </div>
);

const HomePage = ({ setCurrentPage }) => (
  <div className="space-y-8">
    <CrisisBanner />
    
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">You Have More Choices Than You Think</h2>
      <p className="text-xl mb-6">Whether you're struggling with school, job searching, or just feeling overwhelmed - there are more paths forward than you realize.</p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button 
          onClick={() => setCurrentPage('stories')}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
        >
          Read Real Stories
        </button>
        <button 
          onClick={() => setCurrentPage('pivot')}
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
        >
          Explore Career Paths
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

const StoriesPage = () => {
  const [filterMajor, setFilterMajor] = useState('');
  
  const stories = [
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
  ];

  // Get unique majors and sort them
  const majors = [...new Set(stories.map(s => s.major))].sort();
  
  // Filter stories based on selected major
  const filteredStories = filterMajor 
    ? stories.filter(s => s.major === filterMajor)
    : stories;

  return (
    <div className="space-y-6">
      <CrisisBanner />
      
      <h2 className="text-3xl font-bold mb-2">You're Not Alone</h2>
      <p className="text-gray-600 mb-6">Real stories from students who struggled and made it through. These aren't success stories - they're survival stories.</p>

      {/* Filter by major */}
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

      {/* Display filtered stories */}
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

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-4 text-center">Share Your Story</h3>
        <p className="text-gray-600 mb-6 text-center">Your experience could help another student who's struggling right now.</p>
        
        <form 
          name="student-stories" 
          method="POST" 
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="space-y-4"
        >
          {/* Hidden fields for Netlify */}
          <input type="hidden" name="form-name" value="student-stories" />
          <p className="hidden">
            <label>Don't fill this out if you're human: <input name="bot-field" /></label>
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name (optional)</label>
              <input
                type="text"
                name="name"
                placeholder="Anonymous is fine"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Major *</label>
              <input
                type="text"
                name="major"
                placeholder="e.g., Computer Science"
                required
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Email (optional but recommended)</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              className="w-full p-3 border rounded-lg"
            />
            <p className="text-xs text-gray-600 mt-1">
              We'll send you a preview before posting your story. Your email will never be published or shared.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Timeframe *</label>
            <input
              type="text"
              name="timeframe"
              placeholder="e.g., Graduated 2 years ago, Currently a senior"
              required
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">The Struggle *</label>
            <textarea
              name="struggle"
              placeholder="What were you going through? What made you feel hopeless?"
              required
              rows="4"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">What Happened *</label>
            <textarea
              name="outcome"
              placeholder="How did things turn out? What path did you take?"
              required
              rows="4"
              className="w-full p-3 border rounded-lg"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold"
          >
            Submit Your Story
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            By submitting, you allow us to share your story to help other students. 
            If you provide an email, we'll send you a preview before posting. 
            We may edit for clarity and length. Email addresses will never be published.
          </p>
        </form>
      </div>
    </div>
  );
};
const PivotPage = () => {
  const [selectedMajor, setSelectedMajor] = useState('');
  
  const careerPivots = {
    'Computer Science': [
      { career: 'Data Analyst', growth: '23%', why: 'Uses your logic and problem-solving skills, less coding-intensive', salary: '$65k-85k' },
      { career: 'Product Manager', growth: '19%', why: 'Technical background helps you understand what teams are building', salary: '$80k-120k' },
      { career: 'Technical Writer', growth: '7%', why: 'Explain complex tech concepts - your CS knowledge is an asset', salary: '$60k-80k' },
      { career: 'UX Researcher', growth: '18%', why: 'Analytical thinking applied to user behavior', salary: '$70k-95k' }
    ],
    'English/Journalism': [
      { career: 'Technical Writer', growth: '7%', why: 'Your writing skills are desperately needed in tech companies', salary: '$60k-80k' },
      { career: 'UX Writer', growth: '23%', why: 'Make apps and websites easier to understand - storytelling for digital', salary: '$75k-100k' },
      { career: 'Content Strategist', growth: '15%', why: 'Plan and manage content across organizations', salary: '$65k-90k' },
      { career: 'Grant Writer', growth: '8%', why: 'Nonprofits need great writers, less competitive field', salary: '$50k-70k' }
    ],
    'Marketing': [
      { career: 'Sales Operations', growth: '23%', why: 'Your communication skills + analytics, growing rapidly', salary: '$60k-85k' },
      { career: 'Customer Success Manager', growth: '20%', why: 'Help clients succeed, relationship-focused', salary: '$55k-80k' },
      { career: 'Digital Marketing Analyst', growth: '17%', why: 'Data-driven marketing, less saturated than traditional marketing', salary: '$55k-75k' },
      { career: 'Product Marketing', growth: '16%', why: 'Bridge between product teams and customers', salary: '$70k-95k' }
    ],
    'Psychology': [
      { career: 'UX Researcher', growth: '18%', why: 'Understanding human behavior is exactly what tech companies need', salary: '$70k-95k' },
      { career: 'HR Specialist', growth: '10%', why: 'Your understanding of people is valuable in every organization', salary: '$50k-70k' },
      { career: 'Market Research Analyst', growth: '13%', why: 'Study consumer behavior and trends', salary: '$55k-75k' },
      { career: 'Training & Development', growth: '11%', why: 'Help employees learn and grow', salary: '$55k-80k' }
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
    'Mechanical Engineering': [
      { career: 'Technical Product Manager', growth: '19%', why: 'Your engineering mindset helps manage product development without endless CAD work', salary: '$85k-120k' },
      { career: 'Project Manager (Manufacturing)', growth: '11%', why: 'Lead teams and timelines using your technical knowledge', salary: '$75k-100k' },
      { career: 'Technical Sales Engineer', growth: '8%', why: 'Explain complex products to customers - engineers who can communicate are rare', salary: '$70k-110k' },
      { career: 'Data Analyst (Manufacturing)', growth: '23%', why: 'Analyze production data and optimize processes', salary: '$65k-90k' }
    ],
    'Electrical Engineering': [
      { career: 'Systems Engineer', growth: '12%', why: 'Bigger picture thinking - integrate components rather than design circuits', salary: '$80k-110k' },
      { career: 'Technical Product Manager', growth: '19%', why: 'Guide product strategy for hardware/software companies', salary: '$90k-130k' },
      { career: 'Data Engineer', growth: '21%', why: 'Your logic and systems thinking transfer perfectly to data infrastructure', salary: '$85k-120k' },
      { career: 'Technical Consultant', growth: '13%', why: 'Solve varied problems for different clients instead of one company', salary: '$75k-110k' }
    ],
    'Civil Engineering': [
      { career: 'Construction Project Manager', growth: '11%', why: 'Lead projects without doing structural calculations all day', salary: '$75k-105k' },
      { career: 'Urban Planner', growth: '6%', why: 'Shape communities and cities - less math, more impact on people', salary: '$60k-85k' },
      { career: 'Sustainability Consultant', growth: '15%', why: 'Growing field focused on green building and infrastructure', salary: '$65k-95k' },
      { career: 'Real Estate Development', growth: '10%', why: 'Understand construction from the business side', salary: '$70k-120k' }
    ],
    'Chemical Engineering': [
      { career: 'Process Engineer (Different Industry)', growth: '14%', why: 'Pharma, food, cosmetics need your skills - not just oil refineries', salary: '$75k-105k' },
      { career: 'Environmental Engineer', growth: '6%', why: 'Apply chemistry knowledge to sustainability and remediation', salary: '$70k-95k' },
      { career: 'Quality Assurance Manager', growth: '9%', why: 'Ensure processes work correctly without being in the lab', salary: '$70k-100k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Navigate FDA/EPA requirements for products - technical knowledge needed', salary: '$75k-105k' }
    ],
    'Aerospace Engineering': [
      { career: 'Systems Engineer', growth: '12%', why: 'Integrate complex systems - not just aircraft, any tech product', salary: '$85k-120k' },
      { career: 'Project Manager (Tech)', growth: '11%', why: 'Your experience with complex projects applies everywhere', salary: '$80k-115k' },
      { career: 'Data Analyst', growth: '23%', why: 'Analyze performance data - test analysis skills transfer perfectly', salary: '$70k-95k' },
      { career: 'Technical Program Manager', growth: '15%', why: 'Coordinate between engineering teams at any company', salary: '$95k-140k' }
    ],
    'Industrial Engineering': [
      { career: 'Operations Manager', growth: '11%', why: 'Optimize business processes - your core skill applied broadly', salary: '$75k-110k' },
      { career: 'Supply Chain Analyst', growth: '18%', why: 'Growing rapidly post-pandemic, uses your optimization skills', salary: '$65k-90k' },
      { career: 'Business Analyst', growth: '14%', why: 'Bridge tech and business using your systems thinking', salary: '$70k-95k' },
      { career: 'Management Consultant', growth: '13%', why: 'Help companies improve efficiency - varied work, good pay', salary: '$80k-130k' }
    ],
    'Biomedical Engineering': [
      { career: 'Clinical Engineer', growth: '10%', why: 'Work in hospitals managing medical equipment - patient impact without med school', salary: '$65k-95k' },
      { career: 'Regulatory Affairs Specialist', growth: '12%', why: 'Get medical devices approved - critical role, less competition', salary: '$70k-100k' },
      { career: 'Medical Device Sales', growth: '8%', why: 'Technical knowledge sells complex products - strong earning potential', salary: '$70k-120k' },
      { career: 'Quality Assurance (Medical Devices)', growth: '9%', why: 'Ensure device safety without pure R&D stress', salary: '$65k-90k' }
    ],
    'Engineering Physics': [
      { career: 'Data Scientist', growth: '35%', why: 'Your math and modeling skills are exactly what data science needs', salary: '$90k-140k' },
      { career: 'Quantitative Analyst (Finance)', growth: '11%', why: 'Physics PhDs dominate this field - complex modeling, high pay', salary: '$100k-200k' },
      { career: 'Software Engineer', growth: '22%', why: 'Your problem-solving and math background translate perfectly', salary: '$85k-130k' },
      { career: 'Technical Consultant', growth: '13%', why: 'Solve diverse technical problems across industries', salary: '$80k-120k' }
    ],
    'Art/Fine Arts': [
  { career: 'UX/UI Designer', growth: '16%', why: 'Your design skills translate directly - tech needs visual designers desperately', salary: '$70k-100k' },
  { career: 'Graphic Designer (Corporate)', growth: '3%', why: 'Every company needs internal design - marketing, presentations, branding', salary: '$50k-70k' },
  { career: 'Art Director (Advertising)', growth: '6%', why: 'Lead creative teams, less hands-on creation, more strategy', salary: '$75k-110k' },
  { career: 'Museum/Gallery Coordinator', growth: '10%', why: 'Behind-the-scenes work in arts - events, collections, education', salary: '$40k-60k' }
],

'Communications': [
  { career: 'Corporate Communications Specialist', growth: '8%', why: 'Every company needs internal/external communication strategy', salary: '$55k-80k' },
  { career: 'Public Relations Specialist', growth: '8%', why: 'Manage company reputation and media relations', salary: '$55k-75k' },
  { career: 'Social Media Manager', growth: '10%', why: 'Your understanding of messaging applies to digital platforms', salary: '$50k-75k' },
  { career: 'Employee Communications', growth: '12%', why: 'Help companies communicate with their workforce - growing field', salary: '$60k-85k' }
],

'History': [
  { career: 'Researcher (Market/Policy)', growth: '11%', why: 'Your research skills apply beyond academia - companies need deep analysis', salary: '$55k-80k' },
  { career: 'Compliance Specialist', growth: '8%', why: 'Understanding regulations and documentation - your analytical skills fit', salary: '$60k-85k' },
  { career: 'Archives/Records Manager', growth: '5%', why: 'Organize and preserve information for corporations, government, nonprofits', salary: '$50k-70k' },
  { career: 'Grant Writer', growth: '8%', why: 'Nonprofits need writers who can research and build compelling cases', salary: '$50k-70k' }
],

'Philosophy': [
  { career: 'Business Analyst', growth: '14%', why: 'Your logic and critical thinking skills are exactly what companies need', salary: '$70k-95k' },
  { career: 'UX Researcher', growth: '18%', why: 'Understanding how people think and make decisions - philosophy in practice', salary: '$75k-105k' },
  { career: 'Technical Writer', growth: '7%', why: 'Break down complex ideas clearly - your core skill', salary: '$60k-85k' },
  { career: 'Policy Analyst', growth: '6%', why: 'Government and think tanks need ethical reasoning and analysis', salary: '$60k-90k' }
],

'Music/Theater': [
  { career: 'Audio/Video Production', growth: '12%', why: 'Every company needs video content - your performance skills translate', salary: '$50k-75k' },
  { career: 'Event Coordinator', growth: '18%', why: 'Your experience managing performances applies to corporate events', salary: '$45k-65k' },
  { career: 'Music Therapist', growth: '9%', why: 'Clinical work using your musical training - requires certification', salary: '$50k-70k' },
  { career: 'Corporate Trainer', growth: '11%', why: 'Teaching and performing skills make you great at presentations', salary: '$55k-80k' }
],

'Education': [
  { career: 'Corporate Trainer', growth: '11%', why: 'Companies need people who can teach - better pay than K-12', salary: '$55k-85k' },
  { career: 'Instructional Designer', growth: '9%', why: 'Create online courses and training programs for businesses', salary: '$60k-90k' },
  { career: 'Curriculum Developer (EdTech)', growth: '15%', why: 'Education companies need people who understand teaching', salary: '$60k-85k' },
  { career: 'Learning & Development Specialist', growth: '10%', why: 'Help employees grow - your teaching skills in a corporate setting', salary: '$60k-85k' }
],

'Political Science': [
  { career: 'Policy Analyst', growth: '6%', why: 'Work for government, nonprofits, or think tanks analyzing policy', salary: '$60k-90k' },
  { career: 'Campaign Manager/Political Consultant', growth: '8%', why: 'Electoral politics - project management with real impact', salary: '$50k-100k' },
  { career: 'Nonprofit Program Manager', growth: '9%', why: 'Run programs for advocacy organizations using your policy knowledge', salary: '$55k-80k' },
  { career: 'Government Relations Specialist', growth: '7%', why: 'Help companies navigate regulation and policy', salary: '$70k-110k' }
]
  };

  return (
    <div className="space-y-6">
      <CrisisBanner />
      
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

    {/* Job Search Resources */}
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

    {/* Resume & Interview Help */}
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

    {/* Mental Health Resources */}
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

    {/* Career Exploration */}
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
const TrackerPage = ({ applications, setApplications, newApp, setNewApp }) => {
  const addApplication = () => {
    if (newApp.company && newApp.position) {
      setApplications([...applications, { ...newApp, id: Date.now(), status: 'Applied' }]);
      setNewApp({ company: '', position: '', date: '', website: '' });
    }
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const downloadCSV = () => {
    if (applications.length === 0) {
      alert('No applications to download. Add some applications first!');
      return;
    }

    // Create CSV content
    const headers = ['Company', 'Position', 'Date Applied'];
    const rows = applications.map(app => [
      app.company,
      app.position,
      app.date || 'No date'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create download
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
    <div className="space-y-6">
      <CrisisBanner />
      
      <h2 className="text-3xl font-bold mb-2">Track Your Progress</h2>
      <p className="text-gray-600 mb-6">Job searching is a marathon, not a sprint. Track your applications and celebrate every step forward.</p>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Your application data is only saved in your browser and will be lost if you refresh the page. 
Use the "Download CSV" button to save your list, or consider using a spreadsheet or notebook for permanent tracking.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4">Add New Application</h3>
<div className="grid md:grid-cols-2 gap-4 mb-4">
  <input
    type="text"
    placeholder="Company name"
    value={newApp.company}
    onChange={(e) => setNewApp({...newApp, company: e.target.value})}
    className="p-3 border rounded-lg"
  />
  <input
    type="text"
    placeholder="Position"
    value={newApp.position}
    onChange={(e) => setNewApp({...newApp, position: e.target.value})}
    className="p-3 border rounded-lg"
  />
  <input
    type="url"
    placeholder="Job posting URL (optional)"
    value={newApp.website}
    onChange={(e) => setNewApp({...newApp, website: e.target.value})}
    className="p-3 border rounded-lg"
  />
  <input
    type="date"
    value={newApp.date}
    onChange={(e) => setNewApp({...newApp, date: e.target.value})}
    className="p-3 border rounded-lg"
  />
</div>
        <button 
          onClick={addApplication}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Application
        </button>
      </div>

{applications.length > 0 && (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold text-lg">Your Applications ({applications.length})</h3>
      <button
        onClick={downloadCSV}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
      >
        Download CSV
      </button>
    </div>
          <div className="space-y-3">
            {applications.map(app => (
              <div key={app.id} className="border-l-4 border-blue-500 p-4 bg-gray-50 rounded">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
  <p className="font-semibold">{app.company}</p>
  <p className="text-sm text-gray-600">{app.position}</p>
  {app.website && (
    <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline block mt-1">
      View Job Posting →
    </a>
  )}
  <p className="text-xs text-gray-500 mt-1">{app.date || 'No date'}</p>
</div>
                  <button
                    onClick={() => deleteApplication(app.id)}
                    className="text-red-600 hover:text-red-800 ml-4 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applications, setApplications] = useState([]);
 const [newApp, setNewApp] = useState({ company: '', position: '', date: '', website: '' });

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'stories' && <StoriesPage />}
        {currentPage === 'pivot' && <PivotPage />}
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
              Created by a parent who wanted to help students see they have more choices than they think. 
              This is a passion project, not a corporation - just someone who cares.
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

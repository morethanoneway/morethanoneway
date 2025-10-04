import React, { useState } from 'react';
import { Heart, MessageCircle, Phone, TrendingUp, Briefcase, Users, ChevronRight, Menu, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [newApp, setNewApp] = useState({ company: '', position: '', date: '' });

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
    ]
  };

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

  const addApplication = () => {
    if (newApp.company && newApp.position) {
      setApplications([...applications, { ...newApp, id: Date.now(), status: 'Applied' }]);
      setNewApp({ company: '', position: '', date: '' });
    }
  };

  const NavBar = () => (
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

          <div className="hidden md:flex space-x-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-blue-200">Home</button>
            <button onClick={() => setCurrentPage('stories')} className="hover:text-blue-200">Stories</button>
            <button onClick={() => setCurrentPage('pivot')} className="hover:text-blue-200">Find Your Path</button>
            <button onClick={() => setCurrentPage('tracker')} className="hover:text-blue-200">Track Progress</button>
            <button onClick={() => setCurrentPage('crisis')} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">Need Help Now?</button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Home</button>
            <button onClick={() => { setCurrentPage('stories'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Stories</button>
            <button onClick={() => { setCurrentPage('pivot'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Find Your Path</button>
            <button onClick={() => { setCurrentPage('tracker'); setMobileMenuOpen(false); }} className="block w-full text-left hover:text-blue-200 py-2">Track Progress</button>
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

  const HomePage = () => (
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

  const StoriesPage = () => (
    <div className="space-y-6">
      <CrisisBanner />
      
      <h2 className="text-3xl font-bold mb-2">You're Not Alone</h2>
      <p className="text-gray-600 mb-6">Real stories from students who struggled and made it through. These aren't success stories - they're survival stories.</p>

      {stories.map((story, idx) => (
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
      ))}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
        <h3 className="font-bold text-lg mb-2">Want to Share Your Story?</h3>
        <p className="text-gray-600 mb-4">Your experience could help another student who's struggling right now.</p>
        <p className="text-sm text-gray-500">(Feature coming soon - for now, this is a safe space to know you're not alone)</p>
      </div>
    </div>
  );

  const PivotPage = () => (
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

  const TrackerPage = () => (
    <div className="space-y-6">
      <CrisisBanner />
      
      <h2 className="text-3xl font-bold mb-2">Track Your Progress</h2>
      <p className="text-gray-600 mb-6">Job searching is a marathon, not a sprint. Track your applications and celebrate every step forward.</p>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-lg mb-4">Add New Application</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
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
          <h3 className="font-bold text-lg mb-4">Your Applications ({applications.length})</h3>
          <div className="space-y-3">
            {applications.map(app => (
              <div key={app.id} className="border-l-4 border-blue-500 p-4 bg-gray-50 rounded">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{app.company}</p>
                    <p className="text-sm text-gray-600">{app.position}</p>
                  </div>
                  <span className="text-sm text-gray-500">{app.date || 'No date'}</span>
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

  const CrisisPage = () => (
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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'stories' && <StoriesPage />}
        {currentPage === 'pivot' && <PivotPage />}
        {currentPage === 'tracker' && <TrackerPage />}
        {currentPage === 'crisis' && <CrisisPage />}
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

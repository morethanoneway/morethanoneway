import React, { useState } from 'react';
import { ArrowLeft, Calendar, Search, FileText, MessageSquare, TrendingUp, CheckSquare, Heart, Phone, Target, Lightbulb, AlertCircle } from 'lucide-react';

const SearchGuide = ({ onBack }) => {
  const [expandedPhase, setExpandedPhase] = useState(null);

  const togglePhase = (phase) => {
    setExpandedPhase(expandedPhase === phase ? null : phase);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="flex items-center hover:text-blue-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </nav>

      {/* Crisis Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-6xl mx-auto mt-4 mx-4">
        <div className="flex items-start">
          <Phone className="w-5 h-5 text-red-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-800">Need to talk to someone right now?</h3>
            <p className="text-red-700 mt-1 text-sm">
              <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 | <strong>Crisis Text Line:</strong> Text HOME to 741741
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Your Complete Job Search Guide</h1>
          <p className="text-xl text-gray-600">A step-by-step roadmap from "I need a job" to "I got an offer" - with realistic expectations and mental health check-ins along the way.</p>
        </div>

        {/* Introduction */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-3">Why This Guide Exists</h2>
          <p className="mb-3">Most students know WHERE to apply (Indeed, LinkedIn, etc.) but not HOW to search effectively. This guide teaches you the process - not just the tools.</p>
          <p className="text-blue-100 text-sm">This isn't about getting a job in 2 weeks. It's about building a sustainable strategy that works even when the job market is brutal.</p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="font-bold text-lg mb-4">Jump to a Phase:</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <button onClick={() => togglePhase('phase1')} className="text-left p-3 border border-blue-200 rounded hover:bg-blue-50">
              <span className="font-semibold text-blue-600">Phase 1:</span> Prepare
            </button>
            <button onClick={() => togglePhase('phase2')} className="text-left p-3 border border-green-200 rounded hover:bg-green-50">
              <span className="font-semibold text-green-600">Phase 2:</span> Search
            </button>
            <button onClick={() => togglePhase('phase3')} className="text-left p-3 border border-purple-200 rounded hover:bg-purple-50">
              <span className="font-semibold text-purple-600">Phase 3:</span> Apply
            </button>
            <button onClick={() => togglePhase('phase4')} className="text-left p-3 border border-orange-200 rounded hover:bg-orange-50">
              <span className="font-semibold text-orange-600">Phase 4:</span> Interview
            </button>
            <button onClick={() => togglePhase('phase5')} className="text-left p-3 border border-red-200 rounded hover:bg-red-50">
              <span className="font-semibold text-red-600">Phase 5:</span> Handle Rejection
            </button>
            <button onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })} className="text-left p-3 border border-gray-200 rounded hover:bg-gray-50">
              <span className="font-semibold text-gray-600">Timeline by Year</span>
            </button>
          </div>
        </div>

        {/* When to Start */}
        <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded mb-8">
          <h3 className="text-xl font-bold mb-3 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
            Timeline: When to Start & Types of Positions
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded p-4 border border-blue-200">
              <p className="font-bold text-blue-800 mb-2">Understanding Position Types:</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Summer Internships:</strong> 3 months during summer (May-August). Most common type.</li>
                <li><strong>Spring/Summer Co-ops:</strong> 4-6 months (January - end of June). You take off a semester but stay enrolled.</li>
                <li><strong>Summer/Winter Co-ops:</strong> 4-6 months (July - end of December). You take off a semester but stay enrolled.</li>
              </ul>
              <p className="text-sm text-blue-700 mt-3 font-semibold">
                ⚠️ During your co-op, you’re still considered an enrolled student — which means you keep full university access (email, ID, library, etc.) and your student loans remain deferred—repayment won’t start!
		Always double-check with your university’s Career Center or Co-op Office, as they may have specific eligibility criteria and paperwork you’ll need to complete.
              </p>
            </div>

            <div>
              <p className="font-semibold">When Positions Are Posted:</p>
              <ul className="space-y-2 text-gray-700 mt-2">
                <li>• <strong>August-September:</strong> Co-ops and internships start posting for next year</li>
                <li>• <strong>September-November:</strong> Large companies post summer internships</li>
                <li>• <strong>December-February:</strong> Peak posting season - most positions go live</li>
                <li>• <strong>January-April:</strong> Small companies and late-posting opportunities</li>
                <li>• <strong>Year-round:</strong> Rolling positions, especially at startups</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold">When YOU Should Start Applying:</p>
              <div className="space-y-2 mt-2">
                <div>
                  <p className="font-semibold text-gray-800">Freshmen & Sophomores:</p>
                  <p className="text-gray-700">Start looking in <strong>August-September</strong> if possible, but January-February works too. Don't stress if you don't get one - building skills through projects or a regular job is valuable.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Juniors & Seniors:</p>
                  <p className="text-gray-700">Start <strong>as early as August</strong>, no later than December. This is your critical year. Apply to 40-60 positions minimum across all three position types.</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-sm font-semibold text-yellow-800">Right Now (October):</p>
              <p className="text-sm text-yellow-700">All three types are posting! Summer internships and Summer/Winter co-ops will increase heavily over the next couple months. Start applying NOW if you haven't already.</p>
            </div>
          </div>
        </section>

        {/* The 5 Phases */}
        <div className="space-y-6">
          
          {/* PHASE 1: PREPARE */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase1')}
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-blue-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 1: Prepare (Before You Apply)</h2>
                <p className="text-gray-600">Week 1-4 | Get your materials and systems ready</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </button>
            
            {expandedPhase === 'phase1' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Week 1-2: Self-Assessment</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>List your skills (from classes, projects, part-time jobs, clubs)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Identify what interests you (you don't need passion, just "not terrible")</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Use our Career Paths tool to see traditional + alternative options</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Decide which types of positions to pursue (cast a wide net)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Week 3: Resume & Materials</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Create resume using free templates (Canva, Google Docs, or your school's template)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Even with "no experience" - list coursework, projects, volunteer work, leadership</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Get it reviewed at your career center (free service!)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Create 1-2 cover letter templates you can customize quickly</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Week 4: Set Up Systems</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Set up application tracker (use ours, or a simple spreadsheet)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Set realistic goals (2-5 applications per week to start)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Block out "application time" on your calendar</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                      <span>Prepare mental health plan (who to talk to when things get hard)</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-4">
                  <p className="font-semibold flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Mental Health Check-In
                  </p>
                  <p className="text-sm text-gray-700 mt-2">Feeling overwhelmed before you even start? That's normal. This process is hard. Take it one step at a time. You don't have to do everything in one week.</p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 2: SEARCH & RESEARCH */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase2')}
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-green-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 2: Search & Research</h2>
                <p className="text-gray-600">Ongoing | Find opportunities and research companies</p>
              </div>
              <Search className="w-8 h-8 text-green-500" />
            </button>
            
            {expandedPhase === 'phase2' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Step 1: Find 10-15 Opportunities</h3>
                  <p className="text-gray-700 mb-2">Search on:</p>
                  <ul className="space-y-2 text-gray-700 ml-4">
                    <li>• <strong>Indeed</strong> - Filter by "entry level" and your location/remote</li>
                    <li>• <strong>LinkedIn</strong> - Use "Easy Apply" filter to save time</li>
                    <li>• <strong>Handshake</strong> - Your school's job board (free access)</li>
                    <li>• <strong>Wellfound</strong> - Startup jobs (often less competitive)</li>
                    <li>• <strong>Built In</strong> - Tech companies by city</li>
                    <li>• <strong>Company websites</strong> - Check "Careers" pages directly</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2 italic">Include traditional AND alternative paths. Don't just apply to big-name companies.</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Step 2: Research Each Company (10 min each)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Glassdoor reviews</strong> - Is it a good place to work? How do they treat interns?</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Company website</strong> - What do they do? What's their mission? Does it sound interesting?</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>LinkedIn</strong> - Do they have current interns? Can you message one to ask about their experience?</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Is this somewhere you actually want to work? (It's okay if it's just "fine" - not every job needs to be your dream)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Step 3: Prioritize Your List</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>"Dream" companies</strong> - Reach, low odds, apply anyway (FAANG, top companies)</p>
                    <p><strong>"Target" companies</strong> - Good fit, realistic chance (mid-size companies, good reviews)</p>
                    <p><strong>"Safety" companies</strong> - Smaller, less competitive (startups, local companies, less prestigious)</p>
                    <p className="text-sm text-green-700 font-semibold mt-2">Apply to all three types. Diversify your odds. Most students focus too much on "dream" companies.</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <p className="font-semibold flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Pro Tip
                  </p>
                  <p className="text-sm text-gray-700 mt-2">Small companies (under 100 employees) often provide better learning experiences, more responsibility, and are easier to get into. Don't ignore them just because you haven't heard of them.</p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 3: APPLY STRATEGICALLY */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase3')}
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-purple-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 3: Apply Strategically</h2>
                <p className="text-gray-600">Ongoing | Submit quality applications consistently</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </button>
            
            {expandedPhase === 'phase3' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Customize Each Application</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Change 2-3 lines in resume to include keywords from job posting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Personalize cover letter with company-specific details (if required)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Answer application questions thoughtfully, not generically</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Don't spend more than 20-30 minutes per application</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2 italic">Quality > Quantity, but don't spend 2 hours on one application. Find the balance.</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Track Everything</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Company, position, date applied, application deadline</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Set reminder to follow up in 2 weeks (if no response)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>Celebrate small wins: "I submitted one - that's progress!"</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-400 rounded p-4">
                  <h4 className="font-semibold flex items-center mb-2">
                    <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                    Manage Expectations
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• <strong>10-20% response rate is NORMAL</strong> - You won't hear back from most applications</li>
                    <li>• This is not personal. The system is broken, not you.</li>
                    <li>• Many companies use AI screening that rejects qualified candidates</li>
                    <li>• Some postings aren't even real (companies keeping options open)</li>
                    <li>• Keep going. Every application is a lottery ticket.</li>
                  </ul>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded p-4">
                  <p className="font-semibold flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    Mental Health Check-In
                  </p>
                  <p className="text-sm text-gray-700 mt-2">After 10-15 applications with no response, it's normal to feel discouraged. Remember: the average student applies to 30-50 positions before getting interviews. You're not behind - you're in the middle of the process.</p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 4: INTERVIEW & FOLLOW-UP */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase4')}
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-orange-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 4: Interview & Follow-Up</h2>
                <p className="text-gray-600">When you get a response | Prepare and perform well</p>
              </div>
              <MessageSquare className="w-8 h-8 text-orange-500" />
            </button>
            
            {expandedPhase === 'phase4' && (
              <div className="p-6 border-t space-y-4">
                <div className="bg-green-100 border border-green-300 rounded p-4">
                  <p className="font-bold text-green-800">🎉 YOU GOT AN INTERVIEW! Celebrate this - it means your application worked!</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Before the Interview</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Research company deeply</strong> (30+ minutes) - mission, products, recent news</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Check Glassdoor</strong> for actual interview questions they've asked</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Prepare STAR stories</strong> (Situation, Task, Action, Result) from your experience</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Prepare questions to ask them</strong> - shows genuine interest and helps you evaluate the role</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Practice</strong> - with a friend, career center, or in front of a mirror</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Good Questions to Ask Them</h3>
                  <ul className="space-y-1 text-gray-700 text-sm ml-4">
                    <li>• "What does a typical day look like for someone in this role?"</li>
                    <li>• "What projects would I work on?"</li>
                    <li>• "What do successful interns/employees have in common here?"</li>
                    <li>• "What are the biggest challenges facing the team right now?"</li>
                    <li>• "What's the culture like? How would you describe the team dynamic?"</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">After the Interview</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Send thank-you email within 24 hours</strong> - brief, genuine, mention something specific from conversation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Add follow-up date to tracker</strong> (usually 1-2 weeks)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span><strong>Keep applying elsewhere</strong> - don't put all eggs in one basket</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded p-4">
                  <p className="font-semibold flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Remember
                  </p>
                  <p className="text-sm text-gray-700 mt-2">Interviews are a two-way street. They're evaluating you, but you're also evaluating them. Ask questions that help you understand if this is somewhere you'd actually want to work.</p>
                </div>
              </div>
            )}
          </div>

          {/* PHASE 5: HANDLE REJECTION */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <button
              onClick={() => togglePhase('phase5')}
              className="w-full p-6 text-left hover:bg-gray-50 flex justify-between items-center border-l-4 border-red-500"
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Phase 5: Manage Rejection & Keep Going</h2>
                <p className="text-gray-600">The hardest part | Building resilience</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </button>
            
            {expandedPhase === 'phase5' && (
              <div className="p-6 border-t space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">When You Get Rejected (and you will)</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>It's okay to feel disappointed.</strong> That's normal and healthy.</li>
                    <li>• <strong>One rejection ≠ you're not good enough.</strong> It means this specific role at this specific time wasn't the right fit.</li>
                    <li>• <strong>Ask yourself:</strong> Did I do something wrong, or was it just bad luck/timing?</li>
                    <li>• <strong>Take a break if needed</strong> (1-2 days), then keep applying.</li>
                    <li>• <strong>Don't spiral.</strong> One "no" doesn't predict future outcomes.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">After 20+ Applications with Few Responses</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Read our "The Honest Truth" page - you're not alone in this</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Read success stories from students who struggled too</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Talk to someone (career center, friend, family, counselor)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Consider alternative paths you haven't tried yet</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Get your resume reviewed again - fresh eyes can help</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-300 rounded p-4">
                  <p className="font-semibold flex items-center text-red-800">
                    <Heart className="w-5 h-5 mr-2" />
                    If You're Feeling Hopeless
                  </p>
                  <p className="text-sm text-gray-700 mt-2 mb-3">Job searching can trigger serious mental health struggles. If you're feeling depressed, anxious, or having thoughts of self-harm:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988</li>
                    <li>• <strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                    <li>• <strong>Campus Counseling:</strong> Free for students - use it</li>
                  </ul>
                  <p className="text-sm text-red-700 mt-3 font-semibold">Your life is worth more than any job. Please reach out.</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">When You Get an Offer 🎉</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span><strong>CELEBRATE!</strong> This is a big deal. You did it.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Research fair pay on Glassdoor before accepting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Ask questions before accepting (day-to-day work, manager, expectations)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>You can negotiate (even interns can negotiate pay, start date, remote options)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckSquare className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Prepare for your first day - this is the beginning, not the end</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Timeline by Year */}
        <div id="timeline" className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Timeline by Year</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-400 pl-4">
              <h3 className="font-bold text-lg">Freshmen</h3>
              <p className="text-gray-700">Don't stress if you don't get an internship. Use summer to build skills (personal projects, online courses), get a regular job, or just rest. Sophomore year is when it really starts to matter.</p>
            </div>

            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-bold text-lg">Sophomores</h3>
              <p className="text-gray-700">Start early (August-September, no later than January). Apply to 30-50 positions across all types. Include smaller companies and alternative paths. This is your practice year - even if you don't get one, you're learning the process.</p>
            </div>

            <div className="border-l-4 border-orange-400 pl-4">
              <h3 className="font-bold text-lg">Juniors</h3>
              <p className="text-gray-700 font-semibold">This is THE critical year before graduation. Start in August if possible, no later than December. Follow the full process carefully. Apply to 40-60 positions minimum. Don't give up - this internship/co-op can lead to a full-time offer.</p>
            </div>

            <div className="border-l-4 border-purple-400 pl-4">
              <h3 className="font-bold text-lg">Seniors</h3>
              <p className="text-gray-700">Whether looking for last internship or full-time roles, same process applies. Start early, apply broadly, don't limit yourself to "dream" companies. Many companies hire new grads year-round, not just in spring.</p>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Common Mistakes to Avoid</h2>
          <ul className="space-y-2 text-gray-700">
            <li>❌ <strong>Only applying to big-name companies</strong> → Try small companies! Less competitive, better learning.</li>
            <li>❌ <strong>Generic, one-size-fits-all applications</strong> → Customize each one (just a little).</li>
            <li>❌ <strong>Not tracking applications</strong> → You'll forget what you applied to.</li>
            <li>❌ <strong>Giving up after 10 rejections</strong> → 30-50 applications is completely normal!</li>
            <li>❌ <strong>Ignoring mental health</strong> → Take breaks. Talk to people. This is hard.</li>
            <li>❌ <strong>Only looking at traditional roles</strong> → Explore alternative paths in your field.</li>
            <li>❌ <strong>Waiting until February to start</strong> → By then, many positions are already filled.</li>
          </ul>
        </div>

        {/* Real Example */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Real Example Timeline</h2>
          <div className="bg-white rounded p-4 border border-green-300">
            <p className="font-bold mb-2">Sarah - Mechanical Engineering Sophomore</p>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• <strong>August:</strong> Created resume, set up tracker, researched companies</li>
              <li>• <strong>September:</strong> Applied to 15 positions (mix of traditional ME + alternatives like Quality Engineering)</li>
              <li>• <strong>October:</strong> Applied to 20 more. Got 2 rejections, felt discouraged but kept going.</li>
              <li>• <strong>November:</strong> Applied to 15 more. Got 3 interviews! One went badly, one went okay, one went great.</li>
              <li>• <strong>December:</strong> Got 1 offer from small manufacturing company for Quality Engineering co-op</li>
              <li>• <strong>January:</strong> Negotiated pay from $18/hr to $20/hr (they said yes!)</li>
              <li>• <strong>May:</strong> Started 4-month co-op, loved it, got full-time offer before graduating</li>
            </ul>
            <p className="text-sm text-gray-600 mt-3 italic">Total applications: 50 | Interviews: 3 | Offers: 1 | Time to offer: 4 months</p>
          </div>
        </div>

        {/* Final Encouragement */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">You Can Do This</h2>
          <p className="text-lg mb-3">This process is hard. It's supposed to be hard. The job market is brutal, and it's not your fault.</p>
          <p className="mb-3">But thousands of students before you have walked this path and made it through. You will too.</p>
          <p className="mb-4">Every application is progress. Every rejection is practice. Every interview is a learning experience.</p>
          <p className="font-bold text-xl">Keep going. You're closer than you think.</p>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">If you're in crisis: Call or text 988 | Text HOME to 741741</p>
          <p className="text-sm text-gray-400 mt-2">© 2025 MoreThanOneWay.org</p>
        </div>
      </footer>
    </div>
  );
};

export default SearchGuide;
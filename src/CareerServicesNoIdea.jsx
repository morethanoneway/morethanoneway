import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, ExternalLink, CheckSquare } from 'lucide-react';

const CareerServicesNoIdea = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Went to Career Services and Still Have No Idea — What to Do Next | MoreThanOneWay.org</title>
        <meta name="description" content="Went to career services and left more confused? How to get better answers, ask the right questions, and actually make progress — with major-specific guidance for business, liberal arts, psychology, CS, and more." />
        <meta name="keywords" content="career services didn't help, still don't know what to do after college, career counselor no help, what to do with my major, college career advice" />
        <link rel="canonical" href="https://morethanoneway.org/career-services-no-idea" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Building className="w-5 h-5 text-indigo-700" />
              </div>
              <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">Career Guidance</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Went to Career Services, Still Have No Idea</h1>
            <p className="mt-3 text-lg text-gray-600">You did the responsible thing. But you left feeling just as lost. That's not because you failed — knowing what questions to ask is a skill nobody teaches you.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-6 rounded-xl">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" /> Before Your Next Appointment: Do This Prep
              </h2>
              <p className="font-semibold text-gray-900 text-sm mb-3">Career counselors can't read your mind. The more specific you are, the more they can help.</p>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-lg border-l-2 border-green-400">
                  <p className="font-bold text-gray-900 mb-2 text-sm">Come prepared with:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>3-5 skills you're good at (even if they feel basic)</li>
                    <li>2-3 things you definitely DON'T want to do</li>
                    <li>Your biggest concern (money? job security? not being bored?)</li>
                    <li>Whether you want to stay local or are willing to relocate</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-2 border-red-400">
                  <p className="font-bold text-gray-900 mb-2 text-sm">Don't say:</p>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>"I don't know what I want to do" (too vague)</li>
                    <li>"I'll do anything" (not helpful for them either)</li>
                    <li>"Whatever pays well" (doesn't narrow it down)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 rounded-xl">
              <h2 className="font-bold text-gray-900 mb-4">Specific Questions That Get Better Answers</h2>
              <div className="space-y-4">
                {[
                  { instead: 'What jobs can I get with my major?', ask: ['Can you show me LinkedIn profiles of 5 recent grads from our school?', 'What are 3 jobs I could apply to RIGHT NOW with my current skills?', 'Which of these paths has the most open entry-level positions?'] },
                  { instead: 'Help me find an internship', ask: ['What companies hired interns from our school last year?', 'Are there smaller local companies I should look at that aren\'t on Handshake?', 'Can you connect me with a student who got an internship in [specific field]?'] },
                  { instead: 'I don\'t know what career path to choose', ask: ['I\'m good at [X] and [Y] but hate [Z]. What roles match that?', 'Can we look at 3 different career paths and map what I\'d need for each?', 'Which paths have the best work-life balance / highest pay / most remote options?'] },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg">
                    <p className="font-semibold text-gray-900 mb-2 text-sm">Instead of: "{item.instead}"</p>
                    <p className="text-sm text-gray-700 font-bold mb-1">Ask:</p>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      {item.ask.map((q, j) => <li key={j}>• {q}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-400 p-6 rounded-xl">
              <h2 className="font-bold text-gray-900 mb-4">How to Advocate for Yourself</h2>
              <div className="space-y-3 text-sm">
                {[
                  { num: '1', title: 'If the advice is too vague, ask for specifics', they: '"You should network more"', you: '"Can you give me 3 specific people I should reach out to and what to say?"' },
                  { num: '2', title: 'If you don\'t understand, say so', they: '"You need to leverage your transferable skills"', you: '"Can we go through my resume line by line and identify what those are?"' },
                  { num: '3', title: 'If one counselor isn\'t helpful, try another', they: null, you: 'Ask: "Who\'s the best person to talk to about [your specific situation]?"' },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg">
                    <p className="font-bold text-gray-900 mb-2">{item.num}. {item.title}</p>
                    {item.they && <p><strong>They say:</strong> "{item.they}"</p>}
                    <p><strong>You say:</strong> {item.you}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Still Stuck After Career Services?</h3>
              <div className="space-y-3 text-sm">
                {[
                  { title: 'Use our tools to explore on your own', bg: 'bg-blue-50', items: [{ label: 'Search actual internship postings by major', page: 'find-internships' }, { label: 'See what jobs your major leads to (with salary data)', page: 'pivot' }, { label: 'Step-by-step internship search guide', page: 'search-guide' }] },
                ].map((opt, i) => (
                  <div key={i} className={`${opt.bg} p-4 rounded-lg`}>
                    <p className="font-semibold text-gray-900 mb-2">{opt.title}</p>
                    <div className="space-y-1">
                      {opt.items.map((item, j) => (
                        <button key={j} onClick={() => setCurrentPage(item.page)} className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1 text-sm">
                          → {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Talk to people doing actual jobs</p>
                  <p className="text-gray-700">LinkedIn informational interviews beat career counselor advice. Find 5 people working in roles that sound interesting. Message: "I'm a [major] student trying to learn about [field]. Could I ask you 3 quick questions?"</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 text-sm italic leading-relaxed">
                "I went to career services three times and kept leaving more confused. Then I started asking 'Can you show me exactly what that looks like?' instead of just nodding along. The fourth appointment was way more helpful."
              </p>
              <p className="text-xs text-gray-600 mt-2">— Alex, Business Major, Junior</p>
            </div>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">Career clarity is earned through motion, not thinking.</p>
            <p className="text-white/85 text-sm">Apply to things. Talk to people. Try stuff. Direction appears when you start moving.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default CareerServicesNoIdea;

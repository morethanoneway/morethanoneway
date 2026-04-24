import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building, CheckSquare } from 'lucide-react';

const CareerServicesNoIdea = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Went to Career Services and Still Have No Idea — What to Do Next | MoreThanOneWay.org</title>
        <meta
          name="description"
          content="Went to career services and left more confused? How to get better answers, ask the right questions, and actually make progress — with major-specific guidance for business, liberal arts, psychology, CS, and more."
        />
        <meta
          name="keywords"
          content="career services didn't help, still don't know what to do after college, career counselor no help, what to do with my major, college career advice"
        />
        <link rel="canonical" href="https://morethanoneway.org/career-services-no-idea" />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button
            onClick={() => navigate('/youre-not-alone')}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Support Hub
          </button>

          <header className="mb-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                <Building className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                Career Guidance
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Went to Career Services, Still Have No Idea
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              You did the responsible thing. But you left feeling just as lost. That’s not because you failed — knowing what questions to ask is a skill nobody teaches you.
            </p>
          </header>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-600" />
                Before Your Next Appointment: Do This Prep
              </h2>

              <p className="font-semibold text-gray-900 text-sm mb-3">
                Career counselors can't read your mind. The more specific you are, the more they can help.
              </p>

              <div className="space-y-3">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="font-bold text-gray-900 mb-2 text-sm">Come prepared with:</p>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700 leading-relaxed">3–5 skills you're good at (even if they feel basic)</li>
                    <li className="text-sm text-gray-700 leading-relaxed">2–3 things you definitely DON'T want to do</li>
                    <li className="text-sm text-gray-700 leading-relaxed">Your biggest concern (money? job security? not being bored?)</li>
                    <li className="text-sm text-gray-700 leading-relaxed">Whether you want to stay local or are willing to relocate</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="font-bold text-gray-900 mb-2 text-sm">Don't say:</p>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700 leading-relaxed">“I don't know what I want to do” (too vague)</li>
                    <li className="text-sm text-gray-700 leading-relaxed">“I'll do anything” (not helpful for them either)</li>
                    <li className="text-sm text-gray-700 leading-relaxed">“Whatever pays well” (doesn't narrow it down)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h2 className="font-bold text-gray-900 mb-4">Specific Questions That Get Better Answers</h2>
              <div className="space-y-4">
                {[
                  {
                    instead: 'What jobs can I get with my major?',
                    ask: [
                      'Can you show me LinkedIn profiles of 5 recent grads from our school?',
                      'What are 3 jobs I could apply to RIGHT NOW with my current skills?',
                      'Which of these paths has the most open entry-level positions?',
                    ],
                  },
                  {
                    instead: 'Help me find an internship',
                    ask: [
                      'What companies hired interns from our school last year?',
                      'Are there smaller local companies I should look at that aren’t on Handshake?',
                      'Can you connect me with a student who got an internship in a specific field?',
                    ],
                  },
                  {
                    instead: 'I don’t know what career path to choose',
                    ask: [
                      'I’m good at X and Y but hate Z. What roles match that?',
                      'Can we look at 3 different career paths and map what I’d need for each?',
                      'Which paths have the best work-life balance, highest pay, or most remote options?',
                    ],
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <p className="font-semibold text-gray-900 mb-2 text-sm">Instead of: “{item.instead}”</p>
                    <p className="text-sm text-gray-700 font-bold mb-2">Ask:</p>
                    <ul className="space-y-2">
                      {item.ask.map((q, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                          <span className="text-indigo-600 font-bold mt-0.5">•</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h2 className="font-bold text-gray-900 mb-4">How to Advocate for Yourself</h2>
              <div className="space-y-3 text-sm">
                {[
                  {
                    num: '1',
                    title: 'If the advice is too vague, ask for specifics',
                    they: 'You should network more',
                    you: 'Can you give me 3 specific people I should reach out to and what to say?',
                  },
                  {
                    num: '2',
                    title: 'If you don’t understand, say so',
                    they: 'You need to leverage your transferable skills',
                    you: 'Can we go through my resume line by line and identify what those are?',
                  },
                  {
                    num: '3',
                    title: 'If one counselor isn’t helpful, try another',
                    they: null,
                    you: 'Ask: Who’s the best person to talk to about your specific situation?',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                    <p className="font-bold text-gray-900 mb-2">{item.num}. {item.title}</p>
                    {item.they && <p><strong>They say:</strong> “{item.they}”</p>}
                    <p><strong>You say:</strong> {item.you}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-4">Still Stuck After Career Services?</h3>
              <div className="space-y-4 text-sm">
                <div className="bg-blue-50 rounded-2xl p-5">
                  <p className="font-semibold text-gray-900 mb-3">Use our tools to explore on your own</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Search actual internship postings by major', page: 'find-internships' },
                      { label: 'See what jobs your major leads to (with salary data)', page: 'pivot' },
                      { label: 'Step-by-step internship search guide', page: 'search-guide' },
                    ].map((item, j) => (
                      <button
                        key={j}
                        onClick={() => setCurrentPage(item.page)}
                        className="text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1 text-sm"
                      >
                        → {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 rounded-2xl p-5">
                  <p className="font-semibold text-gray-900 mb-2">Talk to people doing actual jobs</p>
                  <p className="text-gray-700">
                    LinkedIn informational interviews beat career counselor advice. Find 5 people working in roles that sound interesting.
                    Message: “I’m a student trying to learn about this field. Could I ask you 3 quick questions?”
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <p className="text-gray-700 text-base italic leading-relaxed max-w-3xl">
                “I went to career services three times and kept leaving more confused. Then I started asking ‘Can you show me exactly what that looks like?’ instead of just nodding along. The fourth appointment was way more helpful.”
              </p>
              <p className="text-xs text-gray-600 mt-2">— Alex, Business Major, Junior</p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <Building className="w-6 h-6 text-indigo-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Career clarity is earned through motion, not thinking.
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Apply to things. Talk to people. Try stuff. Direction appears when you start moving.
            </p>

            <button
              onClick={() => navigate('/youre-not-alone')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Support Hub
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerServicesNoIdea;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building } from 'lucide-react';

const ThinkingAboutTransferring = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Thinking About Transferring Colleges — What to Know Before You Decide | MoreThanOneWay.org</title>
        <meta name="description" content="Thinking about transferring colleges? What to consider before you decide, how the process works, common mistakes to avoid, and how to know if it's the right move." />
        <meta name="keywords" content="thinking about transferring colleges, should I transfer colleges, college transfer process, transfer student resources, community college transfer" />
        <link rel="canonical" href="https://morethanoneway.org/thinking-about-transferring" />
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
    <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center">
      <Building className="w-5 h-5 text-teal-600" />
    </div>
    <span className="text-sm font-semibold text-teal-700 uppercase tracking-wide">
      Transfer
    </span>
  </div>

  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
    I'm Thinking About Transferring
  </h1>

  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
    Transferring is a legitimate option — not a failure. But it’s worth making sure you’re doing it for the right reasons.
  </p>
</header>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-3"><strong>About 1 in 3 college students transfer at least once.</strong> It's extremely common and often the right move. The key is being honest with yourself about why you want to transfer — because the reason determines whether transferring will actually solve the problem.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Good reasons to transfer:</h3>
                <ul className="space-y-2">
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>Your school doesn't have your major</strong> or the program is weak in your area</li>
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>Financial reasons</strong> — moving to a less expensive school makes real financial sense</li>
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>Location</strong> — you need to be closer to family, a job, or a specific opportunity</li>
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>Wrong fit</strong> — school is too big, too small, wrong culture, and it's genuinely affecting your ability to function</li>
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>Better program</strong> — a specific school has significantly better resources for your goals</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Reasons that probably won't be solved by transferring:</h3>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>You're unhappy</strong> — unhappiness often follows you if you don't address the root cause</li>
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>You don't have friends</strong> — making friends is hard everywhere, not just your current school</li>
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>You're struggling academically</strong> — a new school won't fix the underlying issues</li>
                  <li className="text-sm text-gray-700 leading-relaxed"><strong>You just want a fresh start</strong> — valid feeling, but hard to achieve by moving schools alone</li>
                </ul>
              </div>
              {[
                { title: 'How the transfer process works', border: 'border-blue-400', items: ['Most transfers happen after freshman or sophomore year', 'You apply through the Common App or directly to the school', 'Your college GPA matters more than your high school record now', 'Not all credits transfer — get a credit evaluation before deciding', 'Transfer admissions timelines are different from freshman admissions — check early'] },
                { title: 'Community college as a transfer strategy', border: 'border-purple-400', content: 'Going to community college for 1-2 years and then transferring to a 4-year school is a legitimate and financially smart path. Many states have guaranteed transfer agreements. You graduate with the same degree. Nobody asks where you started.' },
                { title: 'Before you apply, do these things', border: 'border-teal-400', items: ['Talk to your current advisor about your credits and what would transfer', 'Visit or do a virtual tour of the school you\'re considering', 'Talk to current students there — not just the admissions office', 'Run the actual financial numbers including lost scholarships', 'Give yourself at least one full semester at your current school before deciding — adjusting takes time'] },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                  {item.content && <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>}
                  {item.items && (
  <ul className="space-y-2">
    {item.items.map((l, j) => (
      <li key={j} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
        <span className="text-teal-600 font-bold mt-0.5">•</span>
        <span>{l}</span>
      </li>
    ))}
  </ul>
)}
                </div>
              ))}
            </div>
          </div>
        <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
  <div className="mx-auto w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mb-4">
    <Building className="w-6 h-6 text-teal-600" />
  </div>

  <h3 className="text-2xl font-bold text-gray-900 mb-3">
    Transferring is a tool, not a solution.
  </h3>

  <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
    Used for the right reasons, it can genuinely change your trajectory. Make sure you know which kind of situation you're in.
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
export default ThinkingAboutTransferring;

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
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <Building className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-sm font-semibold text-teal-700 uppercase tracking-wide">Transfer</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">I'm Thinking About Transferring</h1>
            <p className="mt-3 text-lg text-gray-600">Transferring is a legitimate option — not a failure. But it's worth making sure you're doing it for the right reasons.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-teal-50 border-l-4 border-teal-400 p-6 rounded-xl">
              <p className="text-gray-700 leading-relaxed mb-3"><strong>About 1 in 3 college students transfer at least once.</strong> It's extremely common and often the right move. The key is being honest with yourself about why you want to transfer — because the reason determines whether transferring will actually solve the problem.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border-l-4 border-green-400 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Good reasons to transfer:</h3>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li><strong>Your school doesn't have your major</strong> or the program is weak in your area</li>
                  <li><strong>Financial reasons</strong> — moving to a less expensive school makes real financial sense</li>
                  <li><strong>Location</strong> — you need to be closer to family, a job, or a specific opportunity</li>
                  <li><strong>Wrong fit</strong> — school is too big, too small, wrong culture, and it's genuinely affecting your ability to function</li>
                  <li><strong>Better program</strong> — a specific school has significantly better resources for your goals</li>
                </ul>
              </div>
              <div className="bg-white p-5 rounded-xl border-l-4 border-orange-400 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">Reasons that probably won't be solved by transferring:</h3>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li><strong>You're unhappy</strong> — unhappiness often follows you if you don't address the root cause</li>
                  <li><strong>You don't have friends</strong> — making friends is hard everywhere, not just your current school</li>
                  <li><strong>You're struggling academically</strong> — a new school won't fix the underlying issues</li>
                  <li><strong>You just want a fresh start</strong> — valid feeling, but hard to achieve by moving schools alone</li>
                </ul>
              </div>
              {[
                { title: 'How the transfer process works', border: 'border-blue-400', items: ['Most transfers happen after freshman or sophomore year', 'You apply through the Common App or directly to the school', 'Your college GPA matters more than your high school record now', 'Not all credits transfer — get a credit evaluation before deciding', 'Transfer admissions timelines are different from freshman admissions — check early'] },
                { title: 'Community college as a transfer strategy', border: 'border-purple-400', content: 'Going to community college for 1-2 years and then transferring to a 4-year school is a legitimate and financially smart path. Many states have guaranteed transfer agreements. You graduate with the same degree. Nobody asks where you started.' },
                { title: 'Before you apply, do these things', border: 'border-teal-400', items: ['Talk to your current advisor about your credits and what would transfer', 'Visit or do a virtual tour of the school you\'re considering', 'Talk to current students there — not just the admissions office', 'Run the actual financial numbers including lost scholarships', 'Give yourself at least one full semester at your current school before deciding — adjusting takes time'] },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  {item.content && <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>}
                  {item.items && <ul className="text-gray-700 text-sm space-y-1">{item.items.map((l, j) => <li key={j}>• {l}</li>)}</ul>}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">Transferring is a tool, not a solution.</p>
            <p className="text-white/85 text-sm">Used for the right reasons, it can genuinely change your trajectory. Make sure you know which kind of situation you're in.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default ThinkingAboutTransferring;

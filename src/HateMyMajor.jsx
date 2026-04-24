import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ExternalLink } from 'lucide-react';

const HateMyMajor = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>I Hate My Major — What to Do When You're in the Wrong Program | MoreThanOneWay.org</title>
        <meta name="description" content="Hating your major doesn't mean you're stuck. Real options for college students who want to change majors, switch programs, or figure out what they actually want to study." />
        <meta name="keywords" content="hate my major, want to change my major, wrong major college, switch majors college, college major change, undecided major help" />
        <link rel="canonical" href="https://morethanoneway.org/hate-my-major" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-yellow-700" />
              </div>
              <span className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Major Change</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">I Hate My Major</h1>
            <p className="mt-3 text-lg text-gray-600">Hating your major is more common than you think — and it doesn't mean you're stuck.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-xl">
              <p className="text-gray-700 leading-relaxed mb-3"><strong>First, figure out what you actually hate.</strong> Is it the subject? The workload? Your professors? The job prospects? Knowing which one helps you figure out your next move.</p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>I hate the subject itself</strong> → Changing majors is probably the right move</p>
                <p><strong>I hate the workload but like the subject</strong> → Talk to an advisor about course load adjustments</p>
                <p><strong>I hate my professors</strong> → Try different sections or professors before deciding</p>
                <p><strong>I hate the job prospects</strong> → Look at our Career Paths tool — you might be surprised</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Changing majors is more common than you think', border: 'border-blue-400', content: 'About 1 in 3 college students change their major at least once. Many change twice. You are not behind, you are not wasting time — you are figuring out what actually fits you. That is a good thing.' },
                { title: 'How to actually change your major', border: 'border-green-400', content: 'Talk to your academic advisor first — they can map out what credits transfer and what new requirements you need. Most major changes don\'t add as much time as you think. Even if it adds a semester, graduating in 4.5 years in a major you don\'t hate is better than graduating in 4 years miserable.' },
                { title: 'What if you don\'t know what to switch to?', border: 'border-purple-400', content: 'You don\'t have to know your destination before you leave your current major. Talk to an advisor about going "undeclared" or "exploratory" for a semester while you figure it out. Take courses in different departments. See what doesn\'t feel like suffering.' },
                { title: 'What if switching costs money or time?', border: 'border-orange-400', content: 'Have an honest conversation with financial aid. Some scholarships are major-specific, but many aren\'t. A semester or two extra is often worth it. Run the actual math before assuming the worst.' },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-blue-400">
              <h3 className="font-bold text-gray-900 mb-3">Questions to ask yourself before switching:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Have I taken upper-level courses in this major, or just intro courses? (Intro courses often misrepresent the major)</li>
                <li>Is there one specific aspect I could focus on that I'd enjoy more?</li>
                <li>Am I comparing my major to a romanticized idea of another one?</li>
                <li>Have I talked to people who work in careers my major leads to?</li>
                <li>Would a minor in something I love solve this?</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 text-sm italic leading-relaxed">
                "I hated my engineering major junior year. Switched to information systems. Took an extra semester. Nobody has ever asked me why. I love my job."
              </p>
              <p className="text-xs text-gray-600 mt-2">— Alex, from our Stories page</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button onClick={() => setCurrentPage('pivot')} className="bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all text-center text-sm">
                Explore Career Paths by Major →
              </button>
              <button onClick={() => navigate('/career-services-no-idea')} className="bg-white border border-gray-200 text-gray-900 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all text-center text-sm">
                Career Services Still No Idea →
              </button>
            </div>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">Hating your major is information, not failure.</p>
            <p className="text-white/85 text-sm">It means you're paying attention. Use it to find something that actually fits.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default HateMyMajor;

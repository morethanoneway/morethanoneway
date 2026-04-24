import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const EverythingIsTooMuch = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>When Everything is Falling Apart — College Survival Guide | MoreThanOneWay.org</title>
        <meta name="description" content="When everything is overwhelming at once, you need a triage plan — not more advice. A practical guide for college students when it all feels like too much." />
        <meta name="keywords" content="everything is too much college, overwhelmed college student, college burnout everything falling apart, college mental health overwhelmed" />
        <link rel="canonical" href="https://morethanoneway.org/everything-is-too-much" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-rose-700" />
              </div>
              <span className="text-sm font-semibold text-rose-700 uppercase tracking-wide">Overwhelmed</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">It's Just... Everything</h1>
            <p className="mt-3 text-lg text-gray-600">When everything is falling apart at once, you need to triage. You can't fix everything today — and that's okay.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border-l-4 border-orange-400">
              <h2 className="font-bold text-gray-900 mb-4">Today's Priority: Survival</h2>
              <div className="space-y-3 text-sm">
                {[
                  'Are you safe? Do you have somewhere to sleep tonight? Enough food? If no, use the campus resource finder for emergency help.',
                  'Are you in danger of hurting yourself? If yes, call or text 988 or go to the emergency room. Everything else can wait.',
                  'Can you do ONE small thing today? Schedule one appointment. Send one email. Eat one meal. That is enough.',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold flex-shrink-0">{i + 1}.</span>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">This Week's Goal: Ask One Person for Help</h3>
              <p className="text-gray-700 text-sm mb-3">You can't fix everything alone. Pick ONE person to tell what's going on:</p>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>Wellness center counselor</li>
                <li>Academic advisor</li>
                <li>Trusted professor</li>
                <li>Parent or family member</li>
                <li>Friend who has been through something hard</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">How to triage when everything is urgent</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-1">Physical safety first</p>
                  <p>Sleep, food, shelter. If any of these are not covered, that's the only thing that matters right now.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-1">Mental health second</p>
                  <p>If you're in crisis, that needs to be addressed before grades, jobs, or any other problem. Call 988 or your campus counseling center.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-1">Academic third</p>
                  <p>Email professors. Talk to your advisor about incomplete grades or hardship withdrawals. Most academic problems have more options than you think.</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-1">Everything else can wait</p>
                  <p>Job applications, long-term plans, other people's problems — these are real, but they can wait a week while you stabilize.</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-l-4 border-green-400">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Remember:</strong> The fact that you're here, reading this, looking for help — that means you haven't given up. That's huge. Keep going. One day, one hour, one minute at a time.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button onClick={() => navigate('/crisis')}
                className="bg-red-50 border border-red-200 p-4 rounded-xl text-left hover:bg-red-100 transition-all">
                <p className="font-bold text-red-800 text-sm">In crisis right now?</p>
                <p className="text-red-700 text-xs mt-1">Immediate resources including 988</p>
              </button>
              <button onClick={() => setCurrentPage('youre-not-alone')}
                className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-left hover:bg-gray-100 transition-all">
                <p className="font-bold text-gray-900 text-sm">Explore specific struggles</p>
                <p className="text-gray-600 text-xs mt-1">Find help for your specific situation</p>
              </button>
            </div>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">You've survived 100% of your worst days so far.</p>
            <p className="text-white/85 text-sm">This one is hard. But you're still here. That matters. Keep going.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default EverythingIsTooMuch;

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
        <meta
          name="description"
          content="When everything is overwhelming at once, you need a triage plan — not more advice. A practical guide for college students when it all feels like too much."
        />
        <meta
          name="keywords"
          content="everything is too much college, overwhelmed college student, college burnout everything falling apart, college mental health overwhelmed"
        />
        <link rel="canonical" href="https://morethanoneway.org/everything-is-too-much" />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button
            onClick={() => navigate('/youre-not-alone')}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-tealBrand mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Support Hub
          </button>

          <header className="mb-10 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-rose-600" />
              </div>
              <span className="text-sm font-semibold text-rose-700 uppercase tracking-wide">
                Overwhelmed
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              It’s Just… Everything
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              When everything is falling apart at once, you need triage. You can’t fix everything today — and that’s okay.
            </p>
          </header>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8">
              <h2 className="font-bold text-gray-900 mb-4">Today’s Priority: Survival</h2>
              <div className="space-y-4">
                {[
                  'Are you safe? Do you have somewhere to sleep tonight? Enough food? If no, use the campus resource finder for emergency help.',
                  'Are you in danger of hurting yourself? If yes, call or text 988 or go to the emergency room. Everything else can wait.',
                  'Can you do ONE small thing today? Schedule one appointment. Send one email. Eat one meal. That is enough.',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-rose-600 font-bold flex-shrink-0">{i + 1}.</span>
                    <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-3">This Week’s Goal: Ask One Person for Help</h3>
              <p className="text-gray-700 text-sm mb-3">
                You can’t fix everything alone. Pick ONE person to tell what’s going on:
              </p>
              <ul className="space-y-2">
                {[
                  'Wellness center counselor',
                  'Academic advisor',
                  'Trusted professor',
                  'Parent or family member',
                  'Friend who has been through something hard',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
                    <span className="text-rose-500 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">How to triage when everything feels urgent</h3>

              {[
                {
                  title: 'Physical safety first',
                  content:
                    'Sleep, food, shelter. If any of these are not covered, that’s the only thing that matters right now.',
                },
                {
                  title: 'Mental health second',
                  content:
                    'If you’re in crisis, that needs to be addressed before grades, jobs, or any other problem. Call 988 or your campus counseling center.',
                },
                {
                  title: 'Academic third',
                  content:
                    'Email professors. Talk to your advisor about incomplete grades or hardship withdrawals. Most academic problems have more options than you think.',
                },
                {
                  title: 'Everything else can wait',
                  content:
                    'Job applications, long-term plans, other people’s problems — these are real, but they can wait a week while you stabilize.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Remember:</strong> The fact that you’re here, reading this, looking for help — that means you haven’t given up. That’s huge. Keep going. One day, one hour, one minute at a time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => navigate('/crisis')}
                className="w-full bg-white p-5 rounded-2xl text-left hover:bg-teal-50 hover:border-teal-200 hover:shadow-sm hover:-translate-y-[1px] transition-all border border-gray-200"
              >
                <div className="font-semibold text-gray-900 mb-1">In crisis right now?</div>
                <div className="text-sm text-gray-600">Immediate resources including 988</div>
              </button>

              <button
                onClick={() => setCurrentPage('youre-not-alone')}
                className="w-full bg-white p-5 rounded-2xl text-left hover:bg-teal-50 hover:border-teal-200 hover:shadow-sm hover:-translate-y-[1px] transition-all border border-gray-200"
              >
                <div className="font-semibold text-gray-900 mb-1">Explore specific struggles</div>
                <div className="text-sm text-gray-600">Find help for your specific situation</div>
              </button>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-rose-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              You’ve survived 100% of your worst days so far.
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              This one is hard. But you’re still here. That matters. Keep going.
            </p>

            <button
              onClick={() => navigate('/youre-not-alone')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-teal-500 transition-all"
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

export default EverythingIsTooMuch;

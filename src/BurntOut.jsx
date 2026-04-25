import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

const BurntOut = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>College Burnout — What It Is and How to Recover | MoreThanOneWay.org</title>
        <meta
          name="description"
          content="College burnout is real and different from just being tired. Signs you're burnt out, why it happens, and practical ways to recover without dropping everything."
        />
        <meta
          name="keywords"
          content="college burnout, burnt out college student, college exhaustion, academic burnout, college mental health burnout, how to recover from burnout college"
        />
        <link rel="canonical" href="https://morethanoneway.org/burnt-out" />
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
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center">
                <Heart className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                Burnout Recovery
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              I'm Burnt Out
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              Not just tired. Actually burnt out. There’s a difference — and how you recover depends on which one it is.
            </p>
          </header>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8">
              <h3 className="font-bold text-gray-900 mb-4">Tired vs. Burnt Out — how to tell the difference</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="font-bold text-gray-900 mb-3">Just tired:</p>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700 leading-relaxed">Sleep helps</li>
                    <li className="text-sm text-gray-700 leading-relaxed">A break recharges you</li>
                    <li className="text-sm text-gray-700 leading-relaxed">You still care about things</li>
                    <li className="text-sm text-gray-700 leading-relaxed">You can still feel excited about some things</li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="font-bold text-gray-900 mb-3">Actually burnt out:</p>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-700 leading-relaxed">Sleep doesn’t fix it</li>
                    <li className="text-sm text-gray-700 leading-relaxed">Breaks feel pointless</li>
                    <li className="text-sm text-gray-700 leading-relaxed">You feel nothing about things you used to care about</li>
                    <li className="text-sm text-gray-700 leading-relaxed">Cynicism about everything</li>
                    <li className="text-sm text-gray-700 leading-relaxed">Even small tasks feel impossible</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Why burnout happens in college',
                  content:
                    'Burnout is what happens when you run on empty for too long — academically, emotionally, socially, financially. College piles all of these on simultaneously. It’s especially common in junior and senior year when the novelty has worn off and the pressure has increased. It’s not weakness. It’s a physiological response to chronic stress.',
                },
                {
                  title: 'What actually helps',
                  items: [
                    'Talk to a counselor — burnout often masks or overlaps with depression',
                    'Reduce your course load if possible — one harder semester is better than two failed ones',
                    'Protect non-negotiable rest — actual sleep, not just lying in bed on your phone',
                    'Find one thing that isn’t school — a hobby, a walk, something that has nothing to do with grades',
                    'Tell someone what’s happening — isolation makes burnout worse',
                  ],
                },
                {
                  title: 'What doesn’t help',
                  items: [
                    'Pushing through and hoping it gets better on its own',
                    'Caffeinating your way through it',
                    'Telling yourself you’ll rest when the semester is over (it doesn’t work that way)',
                    'Comparing yourself to people who seem fine',
                    'Dropping everything impulsively — burnout makes catastrophic decisions feel rational',
                  ],
                },
                {
                  title: 'Talking to your school about it',
                  content:
                    'You can talk to your academic advisor about burnout without it going on your record. They can help you adjust your schedule, discuss incomplete grades, or connect you with campus counseling. Proactive conversations go much better than emergency ones.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>

                  {item.content && (
                    <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                  )}

                  {item.items && (
                    <ul className="space-y-2">
                      {item.items.map((l, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed"
                        >
                          <span className="text-orange-500 font-bold mt-0.5">•</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>If you're in crisis or feeling like you can't go on:</strong> Please reach out to 988 (call or text) or your campus counseling center. Burnout can tip into depression. Getting help early is always the right call.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-orange-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              You're not lazy. You're depleted.
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Those are different things. One is a character flaw. The other is a signal that something needs to change. Listen to it.
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

export default BurntOut;

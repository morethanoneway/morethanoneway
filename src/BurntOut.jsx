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
        <meta name="description" content="College burnout is real and different from just being tired. Signs you're burnt out, why it happens, and practical ways to recover without dropping everything." />
        <meta name="keywords" content="college burnout, burnt out college student, college exhaustion, academic burnout, college mental health burnout, how to recover from burnout college" />
        <link rel="canonical" href="https://morethanoneway.org/burnt-out" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-orange-700" />
              </div>
              <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Burnout Recovery</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">I'm Burnt Out</h1>
            <p className="mt-3 text-lg text-gray-600">Not just tired. Actually burnt out. There's a difference — and how you recover depends on which one it is.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Tired vs. Burnt Out — how to tell the difference</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-2">Just tired:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>Sleep helps</li>
                    <li>A break recharges you</li>
                    <li>You still care about things</li>
                    <li>You can still feel excited about some things</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-bold text-gray-900 mb-2">Actually burnt out:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>Sleep doesn't fix it</li>
                    <li>Breaks feel pointless</li>
                    <li>You feel nothing about things you used to care about</li>
                    <li>Cynicism about everything</li>
                    <li>Even small tasks feel impossible</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Why burnout happens in college', border: 'border-blue-400', content: 'Burnout is what happens when you run on empty for too long — academically, emotionally, socially, financially. College piles all of these on simultaneously. It\'s especially common in junior and senior year when the novelty has worn off and the pressure has increased. It\'s not weakness. It\'s a physiological response to chronic stress.' },
                { title: 'What actually helps', border: 'border-green-400', items: ['Talk to a counselor — burnout often masks or overlaps with depression', 'Reduce your course load if possible — one harder semester is better than two failed ones', 'Protect non-negotiable rest — actual sleep, not just lying in bed on your phone', 'Find one thing that isn\'t school — a hobby, a walk, something that has nothing to do with grades', 'Tell someone what\'s happening — isolation makes burnout worse'] },
                { title: 'What doesn\'t help', border: 'border-red-400', items: ['Pushing through and hoping it gets better on its own', 'Caffeinating your way through it', 'Telling yourself you\'ll rest when the semester is over (it doesn\'t work that way)', 'Comparing yourself to people who seem fine', 'Dropping everything impulsively — burnout makes catastrophic decisions feel rational'] },
                { title: 'Talking to your school about it', border: 'border-purple-400', content: 'You can talk to your academic advisor about burnout without it going on your record. They can help you adjust your schedule, discuss incomplete grades, or connect you with campus counseling. Proactive conversations go much better than emergency ones.' },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  {item.content && <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>}
                  {item.items && <ul className="text-gray-700 text-sm space-y-1">{item.items.map((l, j) => <li key={j}>• {l}</li>)}</ul>}
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-l-4 border-green-400">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>If you're in crisis or feeling like you can't go on:</strong> Please reach out to 988 (call or text) or your campus counseling center. Burnout can tip into depression. Getting help early is always the right call.
              </p>
            </div>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">You're not lazy. You're depleted.</p>
            <p className="text-white/85 text-sm">Those are different things. One is a character flaw. The other is a signal that something needs to change. Listen to it.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default BurntOut;

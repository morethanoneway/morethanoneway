import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckSquare, Mail, ExternalLink, BookOpen } from 'lucide-react';

const StrugglingInClasses = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      <Helmet>
        <title>Failing or Struggling in Classes? Here's What to Do | MoreThanOneWay.org</title>
        <meta name="description" content="Practical steps for college students who are failing or struggling in classes. Professor email templates, disability accommodations, ADHD help, scholarship worries, and more." />
        <meta name="keywords" content="failing college classes, struggling in college, academic probation help, ADHD college, professor email template, disability accommodations college" />
        <meta property="og:title" content="Failing or Struggling in Classes? Here's What to Do | MoreThanOneWay.org" />
        <meta property="og:description" content="Practical steps, email templates, and real options for college students who are struggling academically." />
        <link rel="canonical" href="https://morethanoneway.org/struggling-in-classes" />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">

          <button onClick={() => navigate('/youre-not-alone')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>

<header className="mb-10 max-w-4xl">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
      <BookOpen className="w-5 h-5 text-blue-600" />
    </div>
    <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
      Academic Struggles
    </span>
  </div>

  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
    I'm Failing or Struggling in Classes
  </h1>

  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
    You're not the only one. Here’s what to do today, what to ask for, and how to get support before things spiral.
  </p>
</header>

          <div className="space-y-6">

            {/* Do These 3 Things Today */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8">
              <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-orange-600" />
              </div>
              Do These 3 Things Today
            </h2>
              <div className="space-y-4">
                {[
                  { id: 'wellness', title: 'Schedule a wellness center appointment', desc: "When you're this overwhelmed, getting help IS the most productive thing you can do. A 50-minute appointment could save you dozens of hours of unproductive studying." },
                  { id: 'email', title: 'Email your professors', desc: 'Template below. Do this BEFORE grades are finalized. Most professors want to help students who are actively seeking support.' },
                  { id: 'disability', title: 'Contact disability services', desc: 'Even if you don\'t think you have a "disability" — ADHD, anxiety, depression all qualify. Extended test time, note-taking support, reduced-distraction testing. It\'s not too late.' },
                ].map(item => (
                  <div key={item.id} className="flex items-start gap-3">
                    <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)}
                      className="mt-1 w-5 h-5 text-orange-600 cursor-pointer" />
                    <div>
                      <p className={`font-semibold ${checked[item.id] ? 'line-through text-gray-400' : 'text-gray-900'}`}>{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specific scenarios */}
            <div className="space-y-4">
              {[
                { emoji: '💊', title: '"I think I have ADHD"', border: 'border-purple-400', content: 'Yes, most college wellness centers can evaluate and prescribe ADHD medication. There\'s usually an evaluation process first. Call and ask specifically about their ADHD assessment timeline — some schools can move quickly. If you\'ve been succeeding through sheer willpower but now you\'re maxed out, you need proper support.' },
                { emoji: '📊', title: '"My grades are slipping and I\'ll lose my scholarship"', border: 'border-blue-400', content: 'Most scholarships have more flexibility than students realize. They often look at cumulative GPA or give warnings before revoking anything. Check your specific scholarship terms — a couple of lower grades during the most stressful semester probably isn\'t the catastrophe you fear. Also, contact financial aid about emergency appeals.' },
                { emoji: '🚗', title: '"I had an emergency (car accident, family crisis, etc.)"', border: 'border-green-400', content: 'Document everything and contact your professors and financial aid immediately. Many schools have emergency funds specifically for situations like this. Don\'t wait on people who ghosted you — go directly to the offices. Ask about crisis funds, hardship withdrawals, or grade appeals.' },
                { emoji: '🧠', title: '"I can\'t focus or retain anything"', border: 'border-orange-400', content: 'This is what accommodations are for. When stress maxes out your coping capacity, you\'re not functioning at baseline. Register with disability services — accommodations like extended time, reduced-distraction environments, and note-taking support can make a huge difference. It\'s not "cheating" — it\'s leveling the playing field.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-lg flex-shrink-0">
    {item.emoji}
  </div>
  <h3 className="font-bold text-gray-900 pt-1">
    {item.title}
  </h3>
</div>
                  <p className="text-gray-700 text-sm leading-relaxed"><strong>{item.content.split('.')[0]}.</strong> {item.content.split('.').slice(1).join('.')}</p>
                </div>
              ))}
            </div>

            {/* Email Template */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">Email Template for Professors</h3>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 font-mono text-sm text-gray-700 leading-relaxed">
                <p>Subject: [Your Name] - Request for Meeting About [Course Name]</p><br />
                <p>Dear Professor [Name],</p><br />
                <p>I'm currently struggling in your class and wanted to reach out before grades are finalized. I've been dealing with [brief, honest explanation: overwhelming stress, family emergency, untreated ADHD, etc.] and it's impacting my ability to perform at my usual level.</p><br />
                <p>I'm actively seeking help through [wellness center/disability services/counseling] and want to discuss if there are any options for [make-up work/extra credit/incomplete grade/hardship withdrawal].</p><br />
                <p>I take full responsibility and am committed to improving. Could we schedule a brief meeting to discuss next steps?</p><br />
                <p>Thank you for your time.</p>
                <p>[Your Name]</p>
              </div>
              <p className="text-xs text-gray-600 mt-3 italic">Pro tip: Send this ASAP. Professors are more flexible when you're proactive about getting help.</p>
            </div>

            {/* Study resources */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-2">Can't understand your professor?</h3>
              <p className="text-gray-700 text-sm mb-3">Sometimes you just need someone to explain it differently.</p>
              <button onClick={() => setCurrentPage('study-resources')}
                className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-1 text-sm">
                View Free Study Resources <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>

<div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
  <div className="mx-auto w-12 h-12 rounded-2xl bg-tealBrand/10 flex items-center justify-center mb-4">
    <CheckSquare className="w-6 h-6 text-tealBrand" />
  </div>

  <h3 className="text-2xl font-bold text-gray-900 mb-3">
    You're not behind. You're just struggling right now.
  </h3>

  <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
    That’s different. And it’s fixable. One step at a time is still progress.
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

export default StrugglingInClasses;

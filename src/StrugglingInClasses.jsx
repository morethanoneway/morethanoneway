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

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-700" />
              </div>
              <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Academic Struggles</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              I'm Failing or Struggling in Classes
            </h1>
            <p className="mt-3 text-lg text-gray-600">You're not the only one. Here's what to actually do about it.</p>
          </div>

          <div className="space-y-6">

            {/* Do These 3 Things Today */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 rounded-xl">
              <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-orange-600" /> Do These 3 Things Today
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
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.emoji} {item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed"><strong>{item.content.split('.')[0]}.</strong> {item.content.split('.').slice(1).join('.')}</p>
                </div>
              ))}
            </div>

            {/* Email Template */}
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <h3 className="font-bold text-gray-900">Email Template for Professors</h3>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 font-mono text-sm text-gray-700 leading-relaxed">
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
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-l-4 border-green-400">
              <h3 className="font-bold text-gray-900 mb-2">Can't understand your professor?</h3>
              <p className="text-gray-700 text-sm mb-3">Sometimes you just need someone to explain it differently.</p>
              <button onClick={() => setCurrentPage('study-resources')}
                className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-1 text-sm">
                View Free Study Resources <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>

          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">You're not behind. You're just struggling right now.</p>
            <p className="text-white/85 text-sm">That's different. And it's fixable. One step at a time.</p>
          </div>

          <button onClick={() => navigate('/youre-not-alone')}
            className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>

        </div>
      </div>
    </>
  );
};

export default StrugglingInClasses;

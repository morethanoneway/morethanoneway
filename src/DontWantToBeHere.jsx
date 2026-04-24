import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const DontWantToBeHere = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>I Don't Even Want to Be in College Anymore — Real Options | MoreThanOneWay.org</title>
        <meta name="description" content="Not wanting to be in college is a valid feeling. Explore real options: leave of absence, changing majors, alternative paths, and how to make a decision without making it in crisis." />
        <meta name="keywords" content="don't want to be in college, leave of absence college, dropping out of college, hate college, college alternatives, taking a break from college" />
        <link rel="canonical" href="https://morethanoneway.org/dont-want-to-be-here" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-700" />
              </div>
              <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">Your Options</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">I Don't Even Want to Be Here</h1>
            <p className="mt-3 text-lg text-gray-600">That's a valid feeling. Not everyone needs to finish college right now — or at all. Let's figure out what makes sense for YOUR situation.</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { title: 'Option 1: Take a Leave of Absence', border: 'border-orange-400', content: 'Most schools allow 1-2 semesters off without losing your status. You can work, travel, figure things out, then return. Talk to your academic advisor about the process. This is not quitting — this is strategic.' },
                { title: 'Option 2: Change Your Major', border: 'border-blue-400', content: 'If you hate your classes but not college itself, maybe you\'re in the wrong program. Check out the Career Paths tool to see what else your skills could lead to. Changing majors is incredibly common and rarely as complicated as it feels.' },
                { title: 'Option 3: Transfer Schools', border: 'border-green-400', content: 'Wrong school for you is a real thing. Too big, too small, wrong culture, wrong location — these are legitimate reasons. Community college for a year while you figure it out is a valid and financially smart move.' },
                { title: 'Option 4: Alternative Paths', border: 'border-purple-400', content: 'Trade schools, bootcamps, apprenticeships, military — plenty of successful people never finished traditional college. That\'s okay. Not finishing doesn\'t mean you failed. It means college wasn\'t the right path for you right now.' },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
            <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
              <p className="text-gray-700 text-sm leading-relaxed"><strong>Important:</strong> Don't make major decisions while you're in crisis. Get some support first — wellness center, trusted advisor, family — THEN decide your next move. Depression tells lies about your options.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-blue-400">
              <h3 className="font-bold text-gray-900 mb-3">Before you decide anything, ask yourself:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Is this feeling new or has it been building for a while?</li>
                <li>Is it this school, this major, or college in general?</li>
                <li>Would a break help, or would it make things worse?</li>
                <li>What would you do instead — is there a real plan or just escape?</li>
                <li>Have you talked to a counselor about what you're feeling?</li>
              </ul>
            </div>
            <button onClick={() => setCurrentPage('pivot')} className="w-full bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all text-center">
              Explore Alternative Career Paths →
            </button>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">There is no one right path.</p>
            <p className="text-white/85 text-sm">The goal isn't to finish college. The goal is to build a life that works for you. College is one tool — not the only one.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default DontWantToBeHere;

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';

const NoIdeaWhatToDo = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>No Idea What I Want to Do With My Life — College Career Help | MoreThanOneWay.org</title>
        <meta name="description" content="Not knowing what you want to do after college is completely normal. Practical ways to explore careers, find direction, and stop panicking — without the pressure." />
        <meta name="keywords" content="no idea what to do after college, undecided college student, don't know what career to choose, college major no idea, career exploration college" />
        <link rel="canonical" href="https://morethanoneway.org/no-idea-what-to-do" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-teal-700" />
              </div>
              <span className="text-sm font-semibold text-teal-700 uppercase tracking-wide">Career Direction</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">No Idea What I Want to Do</h1>
            <p className="mt-3 text-lg text-gray-600">Good news: you don't have to have it figured out. Most people change careers 3-7 times anyway.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 text-sm italic leading-relaxed">
                "I spent 3 years panicking about not having a 'passion.' Then I realized most people just pick something they're decent at and don't hate. That's okay. Work doesn't have to be your identity."
              </p>
              <p className="text-xs text-gray-600 mt-2">— Marcus, Recent Grad</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-blue-400">
              <h3 className="font-bold text-gray-900 mb-4">Start here — no pressure:</h3>
              <div className="space-y-3">
                <button onClick={() => setCurrentPage('pivot')}
                  className="w-full bg-white p-4 rounded-lg text-left hover:shadow-md transition-all border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-1">Career Path Explorer</p>
                  <p className="text-sm text-gray-600">See what your major could lead to — including non-obvious paths with salary data</p>
                </button>
                <button onClick={() => setCurrentPage('find-internships')}
                  className="w-full bg-white p-4 rounded-lg text-left hover:shadow-md transition-all border border-gray-200">
                  <p className="font-semibold text-gray-900 mb-1">Try Internships</p>
                  <p className="text-sm text-gray-600">Best way to figure out what you don't want — that's progress too</p>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">Practical ways to find direction:</h3>
              {[
                { title: 'Ask what you don\'t hate', content: 'You don\'t need a passion. You need something you don\'t dread doing. What classes have you not hated? What work tasks haven\'t felt like torture? Start there.' },
                { title: 'Try informational interviews', content: 'Find 5 people on LinkedIn doing jobs that sound vaguely interesting. Message them: "I\'m a college student trying to learn about your field. Could I ask you 3 questions?" Most people say yes.' },
                { title: 'Apply to things and see what excites you', content: 'Apply to 10-15 internships in different areas. Which ones make you nervous to hear back from (in a good way)? That\'s data about what matters to you.' },
                { title: 'Stop waiting for a calling', content: 'Most people don\'t have a calling. They have interests, skills, and circumstances that shape their career over time. The career you end up in at 35 might not even exist right now.' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">Not knowing is not the same as being lost.</p>
            <p className="text-white/85 text-sm">You're figuring it out. That's different. Keep moving — direction becomes clearer through motion, not through thinking harder.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default NoIdeaWhatToDo;

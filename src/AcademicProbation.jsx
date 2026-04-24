import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const AcademicProbation = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Failed a Class or Academic Probation in College — What to Do | MoreThanOneWay.org</title>
        <meta name="description" content="Failing a class or getting put on academic probation feels catastrophic. Here's what it actually means, what your real options are, and how students come back from it." />
        <meta name="keywords" content="failed a class college, academic probation college, failing college class what to do, academic probation help, college grade appeal" />
        <link rel="canonical" href="https://morethanoneway.org/academic-probation" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-700" />
              </div>
              <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">Academic Recovery</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">I Failed a Class or Got Put on Academic Probation</h1>
            <p className="mt-3 text-lg text-gray-600">This feels catastrophic. It's not. Here's what it actually means and what you can do about it.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-xl">
              <p className="text-gray-700 leading-relaxed mb-3"><strong>First: breathe.</strong> Failing a class or landing on academic probation is not the end of your college career. Thousands of students have been exactly where you are and graduated. Some went on to have great careers. Nobody asks how many times you failed a class.</p>
              <p className="text-gray-700 leading-relaxed">What matters now is what you do next.</p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'What academic probation actually means', border: 'border-orange-400', content: 'Academic probation means your GPA has dropped below your school\'s minimum — usually 2.0. It\'s a warning, not an expulsion. You typically get 1-2 semesters to bring your GPA back up. Your school wants you to succeed — that\'s why they warn you instead of just dismissing you.' },
                { title: 'Do this immediately', border: 'border-blue-400', items: ['Meet with your academic advisor — this week, not next week', 'Find out exactly what GPA you need to get off probation', 'Identify which classes you can retake for grade replacement', 'Talk to financial aid about whether probation affects your aid', 'Contact the wellness center — academic struggles are usually connected to mental health struggles'] },
                { title: 'Grade appeals — you have more options than you think', border: 'border-green-400', content: 'If you failed due to a documented emergency, medical issue, or mental health crisis, you may be able to appeal the grade or request a hardship withdrawal (which removes the grade from your GPA entirely). Talk to your dean of students office. Document everything.' },
                { title: 'Retaking classes', border: 'border-purple-400', content: 'Most schools allow grade replacement — if you retake a class, the new grade replaces the old one in your GPA calculation. This is one of the fastest ways to recover. Ask your advisor which classes make the most sense to retake first.' },
                { title: 'Reducing your course load', border: 'border-teal-400', content: 'Taking 15 credits when you\'re struggling is how you fail more classes. Work with your advisor to reduce to 12 or even 9 credits while you stabilize. Yes, it may add time. A longer path to graduation beats another failed semester.' },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  {item.content && <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>}
                  {item.items && <ul className="text-gray-700 text-sm space-y-1">{item.items.map((l, j) => <li key={j}>• {l}</li>)}</ul>}
                </div>
              ))}
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <p className="text-gray-700 text-sm italic leading-relaxed">
                "I was put on academic probation after failing 3 classes sophomore year. Met with an advisor who helped me create a realistic course load. Graduated in 5.5 years instead of 4. Now working at a great company — nobody asks how long it took."
              </p>
              <p className="text-xs text-gray-600 mt-2">— David, Engineering, from our Stories page</p>
            </div>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">This is a setback, not a verdict.</p>
            <p className="text-white/85 text-sm">Your GPA does not define your potential. What you do next does.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default AcademicProbation;

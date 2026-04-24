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
<button
  onClick={() => navigate('/youre-not-alone')}
  className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 mb-8 transition-colors"
>
  <ArrowLeft className="w-4 h-4" />
  Back to Support Hub
</button>
<header className="mb-10 max-w-4xl">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
      <AlertCircle className="w-5 h-5 text-red-600" />
    </div>
    <span className="text-sm font-semibold text-red-700 uppercase tracking-wide">
      Academic Recovery
    </span>
  </div>

  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
    I Failed a Class or Got Put on Academic Probation
  </h1>

  <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
    This feels catastrophic. It’s not. Here’s what it actually means, what your real options are, and how students come back from this.
  </p>
</header>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8">
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
                <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                  {item.content && <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>}
                  {item.items && (
  <ul className="space-y-2">
    {item.items.map((l, j) => (
      <li key={j} className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed">
        <span className="text-red-500 font-bold mt-0.5">•</span>
        <span>{l}</span>
      </li>
    ))}
  </ul>
)}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <p className="text-gray-700 text-base italic leading-relaxed max-w-3xl">
                "I was put on academic probation after failing 3 classes sophomore year. Met with an advisor who helped me create a realistic course load. Graduated in 5.5 years instead of 4. Now working at a great company — nobody asks how long it took."
              </p>
              <p className="text-xs text-gray-600 mt-2">— David, Engineering, from our Stories page</p>
            </div>
          </div>
<div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
  <div className="mx-auto w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
    <AlertCircle className="w-6 h-6 text-red-600" />
  </div>

  <h3 className="text-2xl font-bold text-gray-900 mb-3">
    This is a setback, not a verdict.
  </h3>

  <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
    Your GPA does not define your potential. What you do next does.
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
export default AcademicProbation;

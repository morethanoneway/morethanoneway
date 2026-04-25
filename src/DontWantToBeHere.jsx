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
        <meta
          name="description"
          content="Not wanting to be in college is a valid feeling. Explore real options: leave of absence, changing majors, alternative paths, and how to make a decision without making it in crisis."
        />
        <meta
          name="keywords"
          content="don't want to be in college, leave of absence college, dropping out of college, hate college, college alternatives, taking a break from college"
        />
        <link rel="canonical" href="https://morethanoneway.org/dont-want-to-be-here" />
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
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
                Your Options
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              I Don’t Even Want to Be Here
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              That’s a valid feeling. Not everyone needs to finish college right now — or at all. Let’s figure out what makes sense for your situation.
            </p>
          </header>

          <div className="space-y-8">
            <div className="space-y-4">
              {[
                {
                  title: 'Option 1: Take a Leave of Absence',
                  content:
                    'Most schools allow 1–2 semesters off without losing your status. You can work, travel, figure things out, then return. Talk to your academic advisor about the process. This is not quitting — this is strategic.',
                },
                {
                  title: 'Option 2: Change Your Major',
                  content:
                    'If you hate your classes but not college itself, maybe you’re in the wrong program. Check out the Career Paths tool to see what else your skills could lead to. Changing majors is incredibly common and rarely as complicated as it feels.',
                },
                {
                  title: 'Option 3: Transfer Schools',
                  content:
                    'Wrong school for you is a real thing. Too big, too small, wrong culture, wrong location — these are legitimate reasons. Community college for a year while you figure it out is a valid and financially smart move.',
                },
                {
                  title: 'Option 4: Alternative Paths',
                  content:
                    'Trade schools, bootcamps, apprenticeships, military — plenty of successful people never finished traditional college. That’s okay. Not finishing doesn’t mean you failed. It means college wasn’t the right path for you right now.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Important:</strong> Don’t make major decisions while you’re in crisis. Get some support first — wellness center, trusted advisor, family — then decide your next move. Depression tells lies about your options.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-4">
                Before you decide anything, ask yourself:
              </h3>
              <ul className="space-y-2">
                {[
                  'Is this feeling new or has it been building for a while?',
                  'Is it this school, this major, or college in general?',
                  'Would a break help, or would it make things worse?',
                  'What would you do instead — is there a real plan or just escape?',
                  'Have you talked to a counselor about what you’re feeling?',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700 leading-relaxed"
                  >
                    <span className="text-amber-500 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setCurrentPage('pivot')}
              className="w-full bg-white p-5 rounded-2xl text-left hover:bg-teal-50 hover:border-teal-200 hover:shadow-sm hover:-translate-y-[1px] transition-all border border-gray-200"
            >
              <div className="font-semibold text-gray-900 mb-1">
                Explore Alternative Career Paths
              </div>
              <div className="text-sm text-gray-600">
                See what your skills could lead to beyond your current major or path
              </div>
            </button>
          </div>

          <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              There is no one right path.
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              The goal isn’t to finish college. The goal is to build a life that works for you. College is one tool — not the only one.
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

export default DontWantToBeHere;

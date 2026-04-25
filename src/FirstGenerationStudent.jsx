import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, ExternalLink } from 'lucide-react';

const FirstGenerationStudent = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>First-Generation College Student Resources & Support | MoreThanOneWay.org</title>
        <meta
          name="description"
          content="Being a first-generation college student means navigating a system nobody prepared you for. Real resources, programs, and practical help for first-gen students."
        />
        <meta
          name="keywords"
          content="first generation college student, first gen student resources, first generation student support, first gen college help, navigating college first generation"
        />
        <link rel="canonical" href="https://morethanoneway.org/first-generation-student" />
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
              <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
              </div>
              <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">
                First-Generation
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              I'm a First-Generation College Student
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              You’re navigating a system nobody in your family has mapped for you. That’s genuinely harder — and there’s real support for it.
            </p>
          </header>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Being first-gen means you’re doing everything from scratch.</strong> Figuring out financial aid, navigating professor relationships, understanding unwritten rules, managing family expectations — none of this was explained to you.
              </p>
              <p className="text-gray-700 leading-relaxed">
                That’s a significant disadvantage most people won’t acknowledge. But there are resources built specifically for you.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Find your school’s First-Gen program',
                  content:
                    'Most colleges have dedicated first-generation student programs with mentors, advisors, and community. Search "[your school] first generation student program" or ask your academic advisor. These programs often have scholarship money, priority registration, and direct access to faculty mentors.',
                },
                {
                  title: 'The unwritten rules nobody tells you',
                  items: [
                    'Office hours are for everyone — professors want you to come',
                    'You can email professors directly and they will usually respond',
                    'Academic advisors exist specifically to help you — use them every semester',
                    'You can negotiate deadlines when you’re struggling — ask before, not after',
                    'Most financial aid requires you to apply every year — don’t skip it',
                    'Networking is just talking to people — it doesn’t have to feel gross',
                  ],
                },
                {
                  title: 'Managing family who doesn’t understand college',
                  content:
                    'Your family may not understand why you can’t just come home every weekend, why you need quiet to study, or why college takes so much out of you. This disconnect is real and exhausting. Find a counselor or first-gen peer who gets it — you shouldn’t have to explain this alone.',
                },
                {
                  title: 'Imposter syndrome hits first-gen students harder',
                  content:
                    'The feeling that you don’t belong, that you got in by mistake, that everyone else knows something you don’t — this is extremely common among first-gen students. It’s a lie your brain tells you. You belong here.',
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
                          <span className="text-indigo-500 font-bold mt-0.5">•</span>
                          <span>{l}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-4">National First-Gen Resources</h3>
              <div className="space-y-3">
                {[
                  {
                    name: 'First Scholars Network',
                    desc: 'First-gen student community and resources',
                    url: 'https://firstscholars.org',
                  },
                  {
                    name: 'TRIO Programs (Federal)',
                    desc: 'Free tutoring, advising, and support for first-gen students',
                    url: 'https://www2.ed.gov/about/offices/list/ope/trio/index.html',
                  },
                  {
                    name: "I'm First",
                    desc: 'Community and stories from first-gen college students',
                    url: 'https://imfirst.org',
                  },
                ].map((r, i) => (
                  <a
                    key={i}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 hover:bg-teal-50 hover:border-teal-200 hover:shadow-sm transition-all"
                  >
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                      <p className="text-xs text-gray-600">{r.desc}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-indigo-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              You’re not behind. You’re blazing a trail.
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Nobody in your family has done this before. That means everything you figure out, you figured out yourself. That’s something to be proud of.
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

export default FirstGenerationStudent;

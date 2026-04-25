import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, ExternalLink } from 'lucide-react';

const CantAffordCollege = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Can't Afford College — Emergency Funds, Food Help & Financial Resources | MoreThanOneWay.org</title>
        <meta
          name="description"
          content="Struggling to afford college? Emergency grants, food pantries, SNAP benefits, textbook alternatives, and housing support that actually exist — but schools don't always advertise."
        />
        <meta
          name="keywords"
          content="can't afford college, college emergency fund, college food insecurity, SNAP college students, free textbooks college, college financial help"
        />
        <link rel="canonical" href="https://morethanoneway.org/cant-afford-college" />
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
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">
                Financial Help
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              I Can't Afford This
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              Financial stress is one of the top reasons students struggle. Here are resources that actually exist — but schools don’t always advertise.
            </p>
          </header>

          <div className="space-y-8">
            <div className="space-y-4">
              {[
                {
                  emoji: '💰',
                  title: 'Emergency Funds',
                  content:
                    'Most colleges have emergency grant programs for students facing unexpected hardship. Search "[your school] emergency fund" or ask financial aid directly. These are often GRANTS (not loans) ranging from $500–$5,000. Ask specifically — they won’t always offer them unprompted.',
                },
                {
                  emoji: '🍽️',
                  title: 'Food Insecurity Resources',
                  list: [
                    'Campus food pantries — usually free, no questions asked',
                    'SNAP benefits — many students qualify, apply at benefits.gov',
                    'Meal plan waivers if you live off-campus',
                    'Emergency meal vouchers from student affairs',
                    'Local food banks — you do not have to be a certain age or income level',
                  ],
                },
                {
                  emoji: '🏠',
                  title: 'Housing Support',
                  content:
                    'Some schools offer emergency housing, rent assistance, or can connect you with local resources. Check if you qualify for year-round housing — some schools offer this free or reduced for students who can’t go home. Call 211 for local emergency rental assistance.',
                },
                {
                  emoji: '📚',
                  title: 'Textbook Alternatives',
                  list: [
                    'Library reserves — many textbooks can be checked out',
                    'OpenStax — free textbooks for many courses (openstax.org)',
                    'Course reserves — ask your professor directly',
                    'Facebook groups for your school — students sell/give away textbooks',
                    'Older editions — often 90% identical at a fraction of the price',
                  ],
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 mb-3">
                    {item.emoji} {item.title}
                  </h3>

                  {item.content && (
                    <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>
                  )}

                  {item.list && (
                    <ul className="space-y-2">
                      {item.list.map((l, j) => (
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
              <h3 className="font-bold text-gray-900 mb-4">If you're facing immediate financial crisis:</h3>
              <ol className="space-y-2">
                <li className="text-sm text-gray-700 leading-relaxed"><strong>1.</strong> Contact financial aid office TODAY — explain your situation honestly</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>2.</strong> Ask specifically about emergency GRANTS, not just loans</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>3.</strong> Talk to your academic advisor about hardship withdrawal if needed</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>4.</strong> Check if your state has emergency rental assistance</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>5.</strong> Call <strong>211</strong> for local emergency resources (food, rent, utilities)</li>
              </ol>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-3">FAFSA Tips</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 leading-relaxed"><strong>File every year</strong> — even if you didn’t get much last year, your situation may have changed</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>File as early as possible</strong> — funds run out, earlier filers get more</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Special circumstances appeal</strong> — if your family’s income dropped significantly, ask financial aid about a professional judgment review</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Dependency override</strong> — if you’re estranged from your family, you may qualify as independent. Ask financial aid.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-4">External Resources</h3>
              <div className="space-y-3">
                {[
                  {
                    name: 'Benefits.gov',
                    desc: 'Find federal and state benefits you qualify for',
                    url: 'https://www.benefits.gov',
                  },
                  {
                    name: 'OpenStax',
                    desc: 'Free peer-reviewed textbooks',
                    url: 'https://openstax.org',
                  },
                  {
                    name: 'College Foundation of North Carolina',
                    desc: 'Emergency aid resources (national)',
                    url: 'https://www.cfnc.org',
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
            <div className="mx-auto w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Financial hardship is not a character flaw.
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Ask for help. Most of these resources exist specifically because schools know students need them — they’re just not always easy to find.
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

export default CantAffordCollege;

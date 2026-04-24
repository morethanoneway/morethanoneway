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
        <meta name="description" content="Struggling to afford college? Emergency grants, food pantries, SNAP benefits, textbook alternatives, and housing support that actually exist — but schools don't always advertise." />
        <meta name="keywords" content="can't afford college, college emergency fund, college food insecurity, SNAP college students, free textbooks college, college financial help" />
        <link rel="canonical" href="https://morethanoneway.org/cant-afford-college" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-orange-700" />
              </div>
              <span className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Financial Help</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">I Can't Afford This</h1>
            <p className="mt-3 text-lg text-gray-600">Financial stress is one of the top reasons students struggle. Here are resources that actually exist — but schools don't always advertise.</p>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { emoji: '💰', title: 'Emergency Funds', border: 'border-green-400', content: 'Most colleges have emergency grant programs for students facing unexpected hardship. Search "[your school] emergency fund" or ask financial aid directly. These are often GRANTS (not loans) ranging from $500-$5,000. Ask specifically — they won\'t always offer them unprompted.' },
                { emoji: '🍽️', title: 'Food Insecurity Resources', border: 'border-blue-400', content: null, list: ['Campus food pantries — usually free, no questions asked', 'SNAP benefits — many students qualify, apply at benefits.gov', 'Meal plan waivers if you live off-campus', 'Emergency meal vouchers from student affairs', 'Local food banks — you don\'t have to be a certain age or income level'] },
                { emoji: '🏠', title: 'Housing Support', border: 'border-purple-400', content: 'Some schools offer emergency housing, rent assistance, or can connect you with local resources. Check if you qualify for year-round housing — some schools offer this free or reduced for students who can\'t go home. Call 211 for local emergency rental assistance.' },
                { emoji: '📚', title: 'Textbook Alternatives', border: 'border-orange-400', content: null, list: ['Library reserves — many textbooks can be checked out', 'OpenStax — free textbooks for many courses (openstax.org)', 'Course reserves — ask your professor directly', 'Facebook groups for your school — students sell/give away textbooks', 'Older editions — often 90% identical at a fraction of the price'] },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.emoji} {item.title}</h3>
                  {item.content && <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>}
                  {item.list && <ul className="text-gray-700 text-sm space-y-1">{item.list.map((l, j) => <li key={j}>• {l}</li>)}</ul>}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl border-l-4 border-red-400">
              <h3 className="font-bold text-gray-900 mb-3">If you're facing immediate financial crisis:</h3>
              <ol className="text-gray-700 text-sm space-y-2">
                <li><strong>1.</strong> Contact financial aid office TODAY — explain your situation honestly</li>
                <li><strong>2.</strong> Ask specifically about emergency GRANTS, not just loans</li>
                <li><strong>3.</strong> Talk to your academic advisor about hardship withdrawal if needed</li>
                <li><strong>4.</strong> Check if your state has emergency rental assistance</li>
                <li><strong>5.</strong> Call <strong>211</strong> for local emergency resources (food, rent, utilities)</li>
              </ol>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-5 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-2">FAFSA Tips</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li><strong>File every year</strong> — even if you didn't get much last year, your situation may have changed</li>
                <li><strong>File as early as possible</strong> — funds run out, earlier filers get more</li>
                <li><strong>Special circumstances appeal</strong> — if your family's income dropped significantly, ask financial aid about a professional judgment review</li>
                <li><strong>Dependency override</strong> — if you're estranged from your family, you may qualify as independent. Ask financial aid.</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">External Resources</h3>
              <div className="space-y-2">
                {[
                  { name: 'Benefits.gov', desc: 'Find federal and state benefits you qualify for', url: 'https://www.benefits.gov' },
                  { name: 'OpenStax', desc: 'Free peer-reviewed textbooks', url: 'https://openstax.org' },
                  { name: 'College Foundation of North Carolina', desc: 'Emergency aid resources (national)', url: 'https://www.cfnc.org' },
                ].map((r, i) => (
                  <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
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
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">Financial hardship is not a character flaw.</p>
            <p className="text-white/85 text-sm">Ask for help. Most of these resources exist specifically because schools know students need them — they're just not always easy to find.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default CantAffordCollege;

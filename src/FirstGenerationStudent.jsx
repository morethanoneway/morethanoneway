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
        <meta name="description" content="Being a first-generation college student means navigating a system nobody prepared you for. Real resources, programs, and practical help for first-gen students." />
        <meta name="keywords" content="first generation college student, first gen student resources, first generation student support, first gen college help, navigating college first generation" />
        <link rel="canonical" href="https://morethanoneway.org/first-generation-student" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-indigo-700" />
              </div>
              <span className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">First-Generation</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">I'm a First-Generation College Student</h1>
            <p className="mt-3 text-lg text-gray-600">You're navigating a system nobody in your family has mapped for you. That's genuinely harder — and there's real support for it.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-6 rounded-xl">
              <p className="text-gray-700 leading-relaxed mb-3"><strong>Being first-gen means you're doing everything from scratch.</strong> Figuring out financial aid, navigating professor relationships, understanding unwritten rules, managing family expectations — none of this was explained to you, and you're figuring it out while also doing the actual work of college.</p>
              <p className="text-gray-700 leading-relaxed">That's a significant disadvantage that most people won't acknowledge. But there are resources built specifically for you.</p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Find your school\'s First-Gen program', border: 'border-blue-400', content: 'Most colleges have dedicated first-generation student programs with mentors, advisors, and community. Search "[your school] first generation student program" or ask your academic advisor. These programs often have scholarship money, priority registration, and direct access to faculty mentors.' },
                { title: 'The unwritten rules nobody tells you', border: 'border-green-400', items: ['Office hours are for everyone — professors want you to come', 'You can email professors directly and they will usually respond', 'Academic advisors exist specifically to help you — use them every semester', 'You can negotiate deadlines when you\'re struggling — ask before, not after', 'Most financial aid requires you to apply every year — don\'t skip it', 'Networking is just talking to people — it doesn\'t have to feel gross'] },
                { title: 'Managing family who doesn\'t understand college', border: 'border-purple-400', content: 'Your family may not understand why you can\'t just come home every weekend, why you need quiet to study, or why college takes so much out of you. This disconnect is real and it\'s exhausting. Find a counselor or first-gen peer who gets it — you shouldn\'t have to explain this alone.' },
                { title: 'Imposter syndrome hits first-gen students harder', border: 'border-orange-400', content: 'The feeling that you don\'t belong, that you got in by mistake, that everyone else knows something you don\'t — this is extremely common among first-gen students. It\'s a lie your brain tells you. The research is clear: first-gen students who graduate perform just as well professionally as their peers. You belong here.' },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  {item.content && <p className="text-gray-700 text-sm leading-relaxed">{item.content}</p>}
                  {item.items && <ul className="text-gray-700 text-sm space-y-1">{item.items.map((l, j) => <li key={j}>• {l}</li>)}</ul>}
                </div>
              ))}
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">National First-Gen Resources</h3>
              <div className="space-y-2">
                {[
                  { name: 'First Scholars Network', desc: 'First-gen student community and resources', url: 'https://firstscholars.org' },
                  { name: 'TRIO Programs (Federal)', desc: 'Free tutoring, advising, and support for first-gen students', url: 'https://www2.ed.gov/about/offices/list/ope/trio/index.html' },
                  { name: 'I\'m First', desc: 'Community and stories from first-gen college students', url: 'https://imfirst.org' },
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
            <p className="font-bold text-lg mb-2">You're not behind. You're blazing a trail.</p>
            <p className="text-white/85 text-sm">Nobody in your family has done this before. That means everything you figure out, you figured out yourself. That's something to be proud of.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default FirstGenerationStudent;

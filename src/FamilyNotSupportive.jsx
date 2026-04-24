import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ExternalLink } from 'lucide-react';

const FamilyNotSupportive = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>My Family Isn't Supportive — Chosen Family & First-Gen Resources | MoreThanOneWay.org</title>
        <meta name="description" content="Not having family support in college is more common than you think. Find chosen family resources, LGBTQ+ support, first-generation student programs, and holiday survival tips." />
        <meta name="keywords" content="family not supportive college, chosen family resources, PFLAG college, first generation student support, LGBTQ college student help" />
        <link rel="canonical" href="https://morethanoneway.org/family-not-supportive" />
      </Helmet>
      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => navigate('/youre-not-alone')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Heart className="w-5 h-5 text-purple-700" />
              </div>
              <span className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Family Support</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">My Family Isn't Supportive / I'm Doing This Alone</h1>
            <p className="mt-3 text-lg text-gray-600">Not having family support is more common than you think. You don't have to navigate college alone.</p>
          </div>
          <div className="space-y-6">
            <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-xl">
              <p className="text-gray-700 leading-relaxed mb-3"><strong>Not having family support is more common than you think.</strong> Whether it's because of your identity, your choices, or circumstances beyond your control — you don't have to navigate college alone.</p>
              <p className="text-gray-700 leading-relaxed">There are actual organizations run by real parents, grandparents, and adults who volunteer to be "chosen family" for students who need them.</p>
            </div>
            <div className="space-y-4">
              {[
                { emoji: '💙', title: 'PFLAG', border: 'border-pink-400', desc: 'Largest LGBTQ+ family support organization. Local chapters connect you with supportive parents who want to help students whose families rejected them.', link: 'https://pflag.org', linkText: 'Find Your Local Chapter' },
                { emoji: '🤗', title: 'Free Mom Hugs', border: 'border-blue-400', desc: 'Affirming moms for LGBTQ+ people. They show up at Pride events and college campuses offering literal hugs, emotional support, and "mom" advice.', link: 'https://freemomhugs.org', linkText: 'Visit Free Mom Hugs' },
                { emoji: '👨', title: 'Free Dad Hugs', border: 'border-green-400', desc: 'Supportive father figures for LGBTQ+ people. Dads who show up when biological dads can\'t or won\'t.', link: 'https://freedadhugs.org', linkText: 'Visit Free Dad Hugs' },
                { emoji: '📞', title: 'The Trevor Project (LGBTQ+ Youth)', border: 'border-purple-400', desc: 'Crisis support + resources for LGBTQ+ youth (13-24). 24/7 crisis line, plus connection to local support networks.\nCall: 1-866-488-7386 | Text: START to 678-678', link: 'https://www.thetrevorproject.org/get-help', linkText: 'Get Help' },
              ].map((item, i) => (
                <div key={i} className={`bg-white p-5 rounded-xl border-l-4 ${item.border} shadow-sm`}>
                  <h3 className="font-bold text-gray-900 mb-2">{item.emoji} {item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 whitespace-pre-line">{item.desc}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 font-semibold text-sm flex items-center gap-1">
                    {item.linkText} <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl border-l-4 border-blue-400">
              <h3 className="font-bold text-gray-900 mb-3">On Your Campus</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>LGBTQ+ Resource Center:</strong> Mentor programs, support groups, "chosen family" dinners</li>
                <li><strong>First-Generation Student Programs:</strong> If your family can't guide you through college</li>
                <li><strong>Campus Counseling:</strong> Support for navigating family rejection or estrangement</li>
                <li><strong>Student Organizations:</strong> Found family through communities that accept you</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl border-l-4 border-orange-400 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">First in Your Family to Go to College?</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3"><strong>First-generation students have specific challenges.</strong> Your family might be supportive but unable to help with college navigation. Many schools have dedicated first-gen programs with mentors who can fill that gap.</p>
              <p className="text-gray-700 text-sm">Search "[Your University] First-Generation Student Programs" or ask your academic advisor.</p>
            </div>
            <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-400">
              <h3 className="font-bold text-gray-900 mb-2">Holidays Are the Hardest</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>Some PFLAG families invite students for holidays</li>
                <li>Many campuses offer housing/meals for students who can't go home</li>
                <li>Create "Friendsgiving" with other students in similar situations</li>
                <li>Volunteer at shelters or soup kitchens — gives purpose and community</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3 italic">You're allowed to create new traditions.</p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-l-4 border-purple-400">
              <h3 className="font-bold text-gray-900 mb-2">You Deserve Support</h3>
              <p className="text-gray-700 text-sm leading-relaxed"><strong>If your family isn't there for you, it's not because you're unlovable.</strong> Sometimes families fail us because of their own biases, beliefs, or limitations. That's on them, not you. Thousands of students have found chosen family. You can too.</p>
            </div>
          </div>
          <div className="mt-10 bg-[#006581] rounded-2xl p-6 text-center text-white">
            <p className="font-bold text-lg mb-2">You deserve support.</p>
            <p className="text-white/85 text-sm">Not having family support doesn't mean you're alone. It means you have to build your own village. Thousands of students have. You can too.</p>
          </div>
          <button onClick={() => navigate('/youre-not-alone')} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Support Hub
          </button>
        </div>
      </div>
    </>
  );
};
export default FamilyNotSupportive;

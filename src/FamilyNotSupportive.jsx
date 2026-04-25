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
        <meta
          name="description"
          content="Not having family support in college is more common than you think. Find chosen family resources, LGBTQ+ support, first-generation student programs, and holiday survival tips."
        />
        <meta
          name="keywords"
          content="family not supportive college, chosen family resources, PFLAG college, first generation student support, LGBTQ college student help"
        />
        <link rel="canonical" href="https://morethanoneway.org/family-not-supportive" />
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
              <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
                Family Support
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              My Family Isn't Supportive / I'm Doing This Alone
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              Not having family support is more common than you think. You do not have to navigate college alone.
            </p>
          </header>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7 md:p-8">
              <p className="text-gray-700 leading-relaxed mb-3">
                <strong>Not having family support is more common than you think.</strong> Whether it’s because of your identity, your choices, or circumstances beyond your control — you do not have to navigate college alone.
              </p>
              <p className="text-gray-700 leading-relaxed">
                There are actual organizations run by real parents, grandparents, and adults who volunteer to be chosen family for students who need them.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  emoji: '💙',
                  title: 'PFLAG',
                  desc: 'Largest LGBTQ+ family support organization. Local chapters connect you with supportive parents who want to help students whose families rejected them.',
                  link: 'https://pflag.org',
                  linkText: 'Find Your Local Chapter',
                },
                {
                  emoji: '🤗',
                  title: 'Free Mom Hugs',
                  desc: 'Affirming moms for LGBTQ+ people. They show up at Pride events and college campuses offering literal hugs, emotional support, and mom advice.',
                  link: 'https://freemomhugs.org',
                  linkText: 'Visit Free Mom Hugs',
                },
                {
                  emoji: '👨',
                  title: 'Free Dad Hugs',
                  desc: 'Supportive father figures for LGBTQ+ people. Dads who show up when biological dads cannot or will not.',
                  link: 'https://freedadhugs.org',
                  linkText: 'Visit Free Dad Hugs',
                },
                {
                  emoji: '📞',
                  title: 'The Trevor Project (LGBTQ+ Youth)',
                  desc: 'Crisis support + resources for LGBTQ+ youth (13–24). 24/7 crisis line, plus connection to local support networks.\nCall: 1-866-488-7386 | Text: START to 678-678',
                  link: 'https://www.thetrevorproject.org/get-help',
                  linkText: 'Get Help',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 mb-3">
                    {item.emoji} {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 whitespace-pre-line">
                    {item.desc}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-tealBrand font-semibold text-sm flex items-center gap-1"
                  >
                    {item.linkText}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-3">On Your Campus</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 leading-relaxed"><strong>LGBTQ+ Resource Center:</strong> Mentor programs, support groups, chosen family dinners</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>First-Generation Student Programs:</strong> If your family cannot guide you through college</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Campus Counseling:</strong> Support for navigating family rejection or estrangement</li>
                <li className="text-sm text-gray-700 leading-relaxed"><strong>Student Organizations:</strong> Found family through communities that accept you</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">First in Your Family to Go to College?</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                <strong>First-generation students have specific challenges.</strong> Your family might be supportive but unable to help with college navigation. Many schools have dedicated first-gen programs with mentors who can fill that gap.
              </p>
              <p className="text-gray-700 text-sm">
                Search "[Your University] First-Generation Student Programs" or ask your academic advisor.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-3">Holidays Are the Hardest</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-700 leading-relaxed">Some PFLAG families invite students for holidays</li>
                <li className="text-sm text-gray-700 leading-relaxed">Many campuses offer housing and meals for students who cannot go home</li>
                <li className="text-sm text-gray-700 leading-relaxed">Create Friendsgiving with other students in similar situations</li>
                <li className="text-sm text-gray-700 leading-relaxed">Volunteer at shelters or soup kitchens — gives purpose and community</li>
              </ul>
              <p className="text-sm text-gray-700 mt-4 italic">
                You’re allowed to create new traditions.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
              <h3 className="font-bold text-gray-900 mb-2">You Deserve Support</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>If your family isn’t there for you, it’s not because you’re unlovable.</strong> Sometimes families fail us because of their own biases, beliefs, or limitations. That’s on them, not you. Thousands of students have found chosen family. You can too.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 md:p-10 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              You deserve support.
            </h3>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Not having family support does not mean you are alone. It means you may need to build your own village. Thousands of students have. You can too.
            </p>

            <button
              onClick={() => navigate('/youre-not-alone')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-tealBrand/90 transition-all"
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

export default FamilyNotSupportive;

import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, Users, AlertCircle, Building, DollarSign, HelpCircle, Phone, Search, X, LifeBuoy, GraduationCap } from 'lucide-react';
import ShareButtons from './Sharebuttons';

const TILES = [
 {
    id: 'failing',
    icon: <BookOpen />,
    title: "I'm Failing or Struggling in Classes",
    desc: "Practical steps, professor email templates, accommodation help",
    path: '/struggling-in-classes',
    bg: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-white text-blue-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'family',
    icon: <Heart />,
    title: "My Family Isn't Supportive",
    desc: "Chosen family resources, first-gen support, holiday survival",
    path: '/family-not-supportive',
    bg: 'bg-purple-50 border-purple-200',
    iconBg: 'bg-white text-purple-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'alone',
    icon: <Users />,
    title: "I Feel Completely Alone",
    desc: "Where to find real connection — on campus and off",
    path: '/feeling-alone',
    bg: 'bg-emerald-50 border-emerald-200',
    iconBg: 'bg-white text-emerald-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'dont-want',
    icon: <AlertCircle />,
    title: "I Don't Even Want to Be Here",
    desc: "Leave of absence, major changes, alternative paths — real options",
    path: '/dont-want-to-be-here',
    bg: 'bg-amber-50 border-amber-200',
    iconBg: 'bg-white text-amber-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'career-services',
    icon: <Building />,
    title: "Went to Career Services, Still Have No Idea",
    desc: "How to ask better questions and actually get somewhere",
    path: '/career-services-no-idea',
    bg: 'bg-indigo-50 border-indigo-200',
    iconBg: 'bg-white text-indigo-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'afford',
    icon: <DollarSign />,
    title: "I Can't Afford This",
    desc: "Emergency funds, food resources, textbook help — free",
    path: '/cant-afford-college',
    bg: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-white text-orange-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'no-idea',
    icon: <HelpCircle />,
    title: "No Idea What I Want to Do",
    desc: "Career exploration without the pressure or the lectures",
    path: '/no-idea-what-to-do',
    bg: 'bg-cyan-50 border-cyan-200',
    iconBg: 'bg-white text-cyan-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'everything',
    icon: <AlertCircle />,
    title: "It's Just... Everything",
    desc: "When everything is falling apart at once — triage guide",
    path: '/everything-is-too-much',
    bg: 'bg-rose-50 border-rose-200',
    iconBg: 'bg-white text-rose-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'hate-major',
    icon: <BookOpen />,
    title: "I Hate My Major",
    desc: "Changing majors is more common than you think — here's how to decide",
    path: '/hate-my-major',
    bg: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-white text-yellow-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'first-gen',
    icon: <GraduationCap />,
    title: "I'm a First-Generation Student",
    desc: "Navigating a system nobody prepared you for — real resources",
    path: '/first-generation-student',
    bg: 'bg-sky-50 border-sky-200',
    iconBg: 'bg-white text-sky-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'probation',
    icon: <AlertCircle />,
    title: "I Failed a Class or Got Put on Probation",
    desc: "This feels catastrophic. It's not. Here's what to do next.",
    path: '/academic-probation',
    bg: 'bg-red-50 border-red-200',
    iconBg: 'bg-white text-red-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'burnout',
    icon: <Heart />,
    title: "I'm Burnt Out",
    desc: "Not just tired — actually depleted. Signs and real recovery steps.",
    path: '/burnt-out',
    bg: 'bg-orange-50 border-orange-200',
    iconBg: 'bg-white text-orange-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'transfer',
    icon: <Building />,
    title: "I'm Thinking About Transferring",
    desc: "What to consider before you decide — and common mistakes to avoid",
    path: '/thinking-about-transferring',
    bg: 'bg-teal-50 border-teal-200',
    iconBg: 'bg-white text-teal-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
  {
    id: 'crisis',
    icon: <Phone />,
    title: "I'm in Crisis Right Now",
    desc: "Immediate crisis resources — call or text 988 right now",
    path: '/crisis',
    bg: 'bg-red-50 border-red-200',
    iconBg: 'bg-white text-red-600',
    text: 'text-gray-900',
    desc_color: 'text-gray-600',
  },
];

const YoureNotAlone = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [openQuick, setOpenQuick] = useState(null);
  const [universityName, setUniversityName] = useState('');

  const closeQuick = () => setOpenQuick(null);

  const findCampusResources = () => {
    if (!universityName.trim()) return;
    const query = encodeURIComponent(`${universityName} counseling center wellness disability services`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Struggling with College? You're Not Alone | MoreThanOneWay.org</title>
        <meta name="description" content="Feeling overwhelmed, burnt out, or like you're the only one struggling? Real support and honest resources for college students going through a hard time." />
        <meta name="keywords" content="struggling in college, college burnout, overwhelmed student, college mental health, academic stress, you are not alone" />
        <meta property="og:title" content="You're Not Alone | MoreThanOneWay.org" />
        <meta property="og:description" content="Feeling overwhelmed or burnt out in college? Real support for students going through a hard time." />
        <link rel="canonical" href="https://morethanoneway.org/youre-not-alone" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "You're Not Alone - College Student Support",
          "description": "Real support and honest resources for college students struggling with academics, finances, mental health, and more.",
          "url": "https://morethanoneway.org/youre-not-alone"
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              You Are{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                Not Alone
              </span>
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
              Real support for real struggles. No judgment, just options.
            </p>

            {/* Quick action buttons */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              <button onClick={() => setOpenQuick('crisis')}
                className="bg-gray-900 text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all text-sm">
                Need help right now?
              </button>
              <button onClick={() => setOpenQuick('campus')}
                className="bg-white text-gray-700 px-5 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-sm">
                Find help at your school
              </button>
              <button onClick={() => setOpenQuick('more')}
                className="bg-white text-gray-700 px-5 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-all text-sm">
                Explore more resources
              </button>
            </div>
          </div>

          {/* Intro */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
            <p className="text-gray-700 leading-relaxed mb-3">
              We're not here to judge or tell you to "just push through." We're here to remind you that you have more options — and more strength — than you might realize.
            </p>
            <p className="font-semibold text-gray-900">
              Click on what you're going through below. Each page has real options — not platitudes, not judgment, just practical paths forward.
            </p>
          </div>

          {/* Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {TILES.map((tile) => (
              <button key={tile.id} onClick={() => navigate(tile.path)}
                className={`group w-full text-left rounded-2xl border p-6 transition-all hover:-translate-y-[1px] hover:shadow-sm ${tile.bg}`}>
                <div className="flex items-start gap-4">
                  <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl flex-shrink-0 ${tile.iconBg}`}>
                    {React.cloneElement(tile.icon, { className: 'w-5 h-5' })}
                  </span>
                  <div>
                    <p className={`font-bold text-base leading-tight ${tile.text}`}>{tile.title}</p>
                    <p className={`mt-2 text-sm leading-relaxed ${tile.desc_color}`}>{tile.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl bg-[#006581] text-white px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 ring-1 ring-white/20 mb-5">
              <Heart className="w-6 h-6 text-white" strokeWidth={1.75} />
            </div>
            <h3 className="font-bold text-white text-xl mb-3">You're Still Here</h3>
            <p className="text-white/90 leading-relaxed mb-2 max-w-xl mx-auto">
              The fact that you're on this page, looking for resources, asking for help — that takes courage. You haven't given up. That matters more than you realize.
            </p>
            <p className="text-white/90 leading-relaxed max-w-xl mx-auto">
              Keep going. One day at a time. One hour at a time. You've got this.
            </p>
          </div>

          <div className="mt-6">
            <ShareButtons
              title="Support Resources for Struggling Students - MoreThanOneWay.org"
              message="If you know someone who's struggling, share this with them"
            />
          </div>

        </div>
      </div>

      {/* Modals */}
      {openQuick && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={closeQuick}>
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeQuick} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>

            {openQuick === 'crisis' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-500" /> In Crisis Right Now?
                </h3>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-gray-800 space-y-2">
                  <p><strong>988 Suicide & Crisis Lifeline:</strong> Call or text <strong>988</strong> (24/7)</p>
                  <p><strong>Crisis Text Line:</strong> Text <strong>HOME</strong> to <strong>741741</strong></p>
                </div>
                <button onClick={() => { closeQuick(); navigate('/crisis'); }}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all">
                  See all crisis resources →
                </button>
              </div>
            )}

            {openQuick === 'campus' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <LifeBuoy className="w-5 h-5 text-orange-500" /> Find Help at Your School
                </h3>
                <div className="bg-orange-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">University name</label>
                  <input type="text" placeholder="Enter your university name" value={universityName}
                    onChange={(e) => setUniversityName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm mb-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
                    onKeyDown={(e) => e.key === 'Enter' && findCampusResources()} />
                  <button onClick={findCampusResources}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm">
                    <Search className="w-4 h-4" /> Search Resources
                  </button>
                  <p className="text-xs mt-2 text-gray-600">Opens: Wellness Center, Counseling, Disability Services, Emergency Aid</p>
                </div>
              </div>
            )}

            {openQuick === 'more' && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" /> More Resources
                </h3>
                {[
                  { label: 'Real Stories', desc: 'Students who struggled and made it through', page: 'stories', bg: 'bg-purple-50 border-purple-100' },
                  { label: 'Free Study Help', desc: 'Different explanations, at your pace', page: 'study-resources', bg: 'bg-green-50 border-green-100' },
                  { label: 'Career Paths', desc: "Your major doesn't lock you in", page: 'pivot', bg: 'bg-blue-50 border-blue-100' },
                ].map(item => (
                  <button key={item.page} onClick={() => { closeQuick(); setCurrentPage(item.page); }}
                    className={`w-full ${item.bg} p-5 rounded-2xl text-left hover:shadow-sm hover:-translate-y-[1px] transition-all border`}>
                    <div className="font-semibold text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default YoureNotAlone;

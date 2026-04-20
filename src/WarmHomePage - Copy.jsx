import React from 'react';
import ShareButtons from './ShareButtons';
import { Heart, Users, TrendingUp, Briefcase, ChevronRight, Phone, MessageCircle, BookOpen, Search, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const WarmHomePage = ({ setCurrentPage }) => {
  return (
    <>
      <Helmet>
         <title>Free College Student Support - Mental Health & Career Resources | MoreThanOneWay.org</title>
        <meta name="description" content="You have more choices than you think. Free resources for struggling students: job search help, mental health support, career guidance, and real stories from students who made it through." />
        <meta property="og:title" content="More Than One Way - Free College Student Support" />
        <meta property="og:description" content="Real help for students struggling with school, career stress, and mental health. Free resources, tools, and support." />
        <meta name="keywords" content="college student mental health, struggling in college, career help for students, free study resources, job search support" />
      </Helmet>
      
      <div className="space-y-0">
      {/* Warm Crisis Banner */}
      {/* Warm Crisis Banner (disabled) */}
{false && (
  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 p-5 rounded-xl shadow-soft">
    <div className="flex items-start gap-3">
      <span className="text-3xl">☎️</span>
      <div>
        <h3 className="font-bold text-red-800 mb-1">Need someone right now?</h3>
        <p className="text-red-700 text-sm mb-2">
          <strong>988 Suicide & Crisis Lifeline:</strong> Call or text 988 (24/7)<br />
          <strong>Crisis Text Line:</strong> Text HOME to 741741
        </p>
        <p className="text-xs text-red-600 italic">
          You matter. This feeling is temporary. People want to help. ❤️
        </p>
      </div>
    </div>
  </div>
)}

<section className="py-14">
{/* Hero Section - Cleaner + More Professional */}
<div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white">
  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-400 opacity-[0.07]" />
  <div className="relative px-8 py-14 md:px-12 md:py-16 text-center">
    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-5 leading-tight text-gray-900">
      You have more choices <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
        than you think.
      </span>
    </h1>
 
    <p className="text-lg md:text-xl text-gray-700 mb-3 max-w-3xl mx-auto leading-relaxed">
      Struggling with school? Job search going nowhere? Feeling stuck?
      <br className="hidden md:block" />
      <span className="font-semibold">You’re not alone.</span> Let’s make the next step feel doable.
    </p>

    <p className="text-sm md:text-base text-gray-500 max-w-3xl mx-auto mb-8">
      Free resources, tools, and real student stories. Not therapy — just practical support.
    </p>

    <div className="flex flex-col md:flex-row gap-3 justify-center">
      <button
        onClick={() => setCurrentPage('youre-not-alone')}
        className="bg-gray-900 text-white px-7 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all"
      >
        Get support & guidance
      </button>

      <button
        onClick={() => setCurrentPage('job-tools-hub')}
        className="bg-white text-gray-900 px-7 py-4 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
      >
        Job tools hub
      </button>

      <button
        onClick={() => setCurrentPage('stories')}
        className="bg-white text-gray-900 px-7 py-4 rounded-xl font-semibold border border-gray-300 hover:bg-gray-50 transition-all"
      >
        Read real stories
      </button>
    </div>
  </div>
</div>
</section>

      {/* Student Quote */}
<section className="py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-10">

    {/* Student Quote — NO BOX */}
    <div className="flex gap-3 max-w-3xl">
      <span className="text-3xl">💭</span>
      <div>
        <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-2">
          "I thought I was the only one drowning. Everyone else seemed fine. 
          Struggling doesn't mean failing—it just means I'm human."
        </p>
        <p className="text-sm text-gray-600">— Alex M., Junior, Computer Science</p>
      </div>
    </div>

      {/* Three Main Cards with Warm Colors */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">You're Not Alone</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            College can be hard. If you’re struggling right now, this page offers practical paths forward — not judgment, not platitudes.
          </p>
          <button 
           onClick={() => setCurrentPage('youre-not-alone')}
            className="text-purple-600 font-semibold hover:text-purple-700 flex items-center group"
          >
           Start here <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <div className="bg-gradient-to-br from-orange-100 to-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-orange-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Different Paths Work</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Your major doesn't lock you in. See what adjacent careers are actually hiring—
            and how your "wrong" degree might be exactly what they need.
          </p>
          <button 
            onClick={() => setCurrentPage('pivot')} 
            className="text-orange-600 font-semibold hover:text-orange-700 flex items-center group"
          >
           Find Your Path <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

 <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">Track Your Progress</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Job searching is brutal. Track your applications and celebrate small wins—
            every single one is progress, even when it doesn't feel like it. 
          </p>
          <button 
            onClick={() => setCurrentPage('tracker')} 
            className="text-blue-600 font-semibold hover:text-blue-700 flex items-center group"
          >
           Start Tracking <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
      </div>
</section>


{/* Explore Tiles (Beacon-style navigation) */}
<section className="py-10">
  <div className="flex items-end justify-between gap-6 mb-5">
    <div>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
        Explore the site
      </h2>
      <p className="text-gray-600 mt-2">
        Pick what you need right now — no digging.
      </p>
    </div>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <Tile
      title="Real student stories"
      desc="Proof you’re not the only one."
      onClick={() => setCurrentPage("stories")}
      icon={<Users className="w-6 h-6" />}
    />

    <Tile
      title="Job tools hub"
      desc="Track progress, reduce overwhelm."
      onClick={() => setCurrentPage("job-tools-hub")}
      icon={<Briefcase className="w-6 h-6" />}
    />

    <Tile
      title="Find internships & co-ops"
      desc="Pre-filtered searches that don’t waste your time."
      onClick={() => setCurrentPage("find-internships")}
      icon={<Search className="w-6 h-6" />}
    />

    <Tile
      title="Resume builder"
      desc="Turn projects into strong bullet points."
      onClick={() => setCurrentPage("resume-builder")}
      icon={<FileText className="w-6 h-6" />}
    />

    <Tile
      title="Interview prep"
      desc="Answer well without sounding scripted."
      onClick={() => setCurrentPage("interview-prep")}
      icon={<MessageCircle className="w-6 h-6" />}
    />

    <Tile
      title="Free study resources"
      desc="When the lecture isn’t clicking."
      onClick={() => setCurrentPage("study-resources")}
      icon={<BookOpen className="w-6 h-6" />}
    />
  </div>
</section>

      {/* Another Student Quote */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-400 p-6 rounded-2xl shadow-soft">
        <div className="flex gap-3">
          <span className="text-4xl">💪</span>
          <div>
            <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-2">
              "After 200+ applications with barely any responses, I was ready to give up. 
              The system is broken, not me. Two months later, I got three offers."
            </p>
            <p className="text-sm text-gray-600">- Sarah K., Recent Grad, English Major → Technical Writer</p>
          </div>
        </div>
      </div>

      {/* Resources Grid - Warm Version */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-8 shadow-soft">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Everything You Need in One Place 📚</h2>
        <p className="text-gray-600 mb-6">Because you shouldn't have to search 50 websites when you're already overwhelmed.</p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setCurrentPage('find-internships')}
            className="bg-white p-5 rounded-xl text-left hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-gray-800">Find Internships & Co-ops</h3>
            </div>
            <p className="text-sm text-gray-600">Pre-filtered searches so you don't waste time on "5 years experience required"</p>
          </button>

          <button
            onClick={() => setCurrentPage('study-resources')}
            className="bg-white p-5 rounded-xl text-left hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <h3 className="font-bold text-gray-800">Free Study Resources</h3>
            </div>
            <p className="text-sm text-gray-600">Can't understand your professor? Try these YouTube channels (100% free)</p>
          </button>

          <button
            onClick={() => setCurrentPage('resume-builder')}
            className="bg-white p-5 rounded-xl text-left hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-purple-600" />
              <h3 className="font-bold text-gray-800">Resume Builder</h3>
            </div>
            <p className="text-sm text-gray-600">Turn your class projects into professional experience (yes, really)</p>
          </button>

          <button
            onClick={() => setCurrentPage('interview-prep')}
            className="bg-white p-5 rounded-xl text-left hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold text-gray-800">Interview Prep</h3>
            </div>
            <p className="text-sm text-gray-600">Common questions + how to answer them without sounding like a robot</p>
          </button>
        </div>
      </div>

      {/* The Honest Truth Section - Warmer Version */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-soft">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-4xl">💯</span>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">The Honest Truth</h3>
            <p className="text-sm text-gray-600 italic">Because sugarcoating doesn't help when you're struggling</p>
          </div>
        </div>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start gap-3">
            <span className="text-lg">📅</span>
            <span>The average job search takes <strong>6-8 months</strong>. That's normal. You're not slow.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg">📧</span>
            <span>Most students send <strong>100+ applications</strong> before getting offers. You're not doing it wrong.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg">📚</span>
            <span>Some fields are genuinely oversaturated. That's <strong>not your fault</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg">🛤️</span>
            <span>Taking a non-linear path doesn't mean you failed. It means you're <strong>adapting</strong>.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-lg">❤️</span>
            <span>Your worth is <strong>not</strong> determined by your job, your GPA, or your major.</span>
          </li>
        </ul>
      </div>

      {/* Final Encouragement */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white rounded-2xl p-10 text-center shadow-xl">
        <div className="text-5xl mb-4">🌈</div>
        <h3 className="text-3xl font-bold mb-4">There's More Than One Way</h3>
        <p className="text-xl mb-6 max-w-2xl mx-auto leading-relaxed opacity-95">
          Failed a class? 200 rejections? Feeling lost? None of that means your story is over. 
          It just means you're on a different path than you expected — <br />and that's okay.
        </p>
        <p className="text-lg opacity-90">
          Keep going. You're doing better than you think. 
        </p>
      </div>

      {/* Need Help Now - Always Visible */}
<div className="bg-white border border-red-200 rounded-2xl p-7 md:p-8 text-center">
  <div className="flex items-center justify-center gap-3 mb-3">
    <Phone className="w-6 h-6 text-red-600" />
    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
      In crisis? Help is available 24/7
    </h3>
  </div>

  <p className="text-base md:text-lg text-gray-700 mb-5">
    <strong>988 Suicide &amp; Crisis Lifeline:</strong> Call or text 988<br />
    <strong>Crisis Text Line:</strong> Text HOME to 741741
  </p>

  <button
    onClick={() => setCurrentPage('crisis')}
    className="bg-red-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all"
  >
    View all crisis resources →
  </button>
</div>

    {/* Share Buttons */}
      <ShareButtons 
        title="Career Path Alternatives for Engineering Majors - MoreThanOneWay.org"
        message="Know someone who might find this site useful?"
      />
    </div>
    </>
  );
};
const Tile = ({ title, desc, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="
        group text-left w-full
        rounded-2xl border border-gray-200 bg-white
        p-6
        hover:border-gray-300 hover:bg-gray-50
        transition-colors
        focus:outline-none focus:ring-2 focus:ring-gray-900/10
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-gray-900 font-semibold">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 text-gray-700">
              {icon}
            </span>
            <span className="text-base md:text-lg">{title}</span>
          </div>
          <p className="text-gray-600 mt-3 leading-relaxed">{desc}</p>
        </div>

        <span className="text-gray-400 group-hover:text-gray-600 transition-colors">
          →
        </span>
      </div>
    </button>
  );
};


export default WarmHomePage;
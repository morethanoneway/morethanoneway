import React from 'react';
import ShareButtons from './Sharebuttons';
import { Heart, Users, Mail, TrendingUp, Compass, Shuffle, HeartHandshake, Briefcase, Clock, GraduationCap, ArrowUpRight, ChevronRight, Phone, MessageSquare, ClipboardList, Bell, MessageCircle, BookOpen, Search, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Tile from "./components/Tile";


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

{/* Hero Section - Cleaner + More Professional */}
<section className="pt-14 pb-6 bg-[#FFFBF7]">
  <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
    <div className="mx-auto max-w-5xl text-center">

      <h1 className="text-[3.25rem] leading-[1.05] md:text-[4.5rem] md:leading-[1.05] font-extrabold tracking-tight text-gray-900">
  You have more choices<br></br>{" "}
  <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
    than you think.
  </span>
</h1>

     <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
  Struggling with school? Job search going nowhere? Feeling stuck?
  <br className="hidden md:block" />
  <span className="font-semibold">You’re not alone.</span> Let’s make the next step feel doable.
</p>

      <p className="mt-4 text-sm md:text-base text-gray-500">
        Free resources, tools, and real student stories. Not therapy — just practical support.
      </p>

      <div className="mt-10 flex flex-col md:flex-row gap-3 justify-center">
        <button
          onClick={() => setCurrentPage('youre-not-alone')}
          className="bg-gray-900 text-white px-7 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all"
        >
          Get support & guidance
        </button>

        <button
          onClick={() => setCurrentPage('job-tools-hub')}
          className="bg-white text-gray-700 px-7 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-100 transition-all"
        >
          Job tools hub
        </button>

        <button
          onClick={() => setCurrentPage('stories')}
          className="bg-white text-gray-700 px-7 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-100 transition-all"
        >
          Read real stories
        </button>
      </div>
    </div>
  </div>
</section>

{/* Explore Tiles (Beacon-style navigation) */}
<section className="pt-6 pb-12 bg-[#FFFBF7]">
  <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      <Tile
        title="You're Not Alone"
        desc="College can be hard. If you’re struggling right now, this page offers practical paths forward — not judgment, not platitudes."
        onClick={() => setCurrentPage("youre-not-alone")}
        icon={<Users />}
              />

      <Tile
        title="Different Paths Work"
        desc="Your major doesn't lock you in. See what adjacent careers are actually hiring — and how your degree might be exactly what they need."
        onClick={() => setCurrentPage("pivot")}
        icon={<TrendingUp />}
      />

      <Tile
        title="Find Internships & Co-Ops"
        desc="Pre-filtered searches that don’t waste your time. Search for traditional roles in your major AND explore alternative paths that value your skills."
        onClick={() => setCurrentPage("find-internships")}
        icon={<Search />}
      />

      <Tile
        title="Resume Builder"
        desc="Turn projects into strong bullet points. Build an ATS-friendly resume that showcases YOUR experience."
        onClick={() => setCurrentPage("resume-builder")}
        icon={<FileText />}
      />

      <Tile
        title="Application Tracker"
        desc="Track your applications and celebrate small wins — every single one is progress."
        onClick={() => setCurrentPage("tracker")}
        icon={<ClipboardList />}
      />

      <Tile
        title="Interview Prep"
        desc="Everything you need to walk into your interview confident and prepared. Answer well without sounding scripted."
        onClick={() => setCurrentPage("interview-prep")}
        icon={<MessageCircle />}
      />

      <Tile
        title="Search Guide"
        desc="How to search smarter (not longer). It's about building a sustainable strategy that works even when the job market is brutal."
        onClick={() => setCurrentPage("search-guide")}
        icon={<BookOpen />}
      />

      <Tile
        title="Job Alert Guide"
        desc="Let alerts do the heavy lifting. Set up automated job alerts and let opportunities come to you instead of constantly searching."
        onClick={() => setCurrentPage("job-alert")}
        icon={<Bell />}
      />

      <Tile
        title="Job Tools Hub"
        desc="Everything you need to find opportunities, apply effectively, and track your progress — resumes, tracking, interviews, and more. "
        onClick={() => setCurrentPage("job-tools-hub")}
        icon={<Briefcase />}
      />
    </div>
  </div>
</section>

<section className="py-12 bg-[#FFFBF7]">
  <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12">
   <div className="grid gap-10 lg:grid-cols-12 items-stretch">

      {/* Left: Honest truth */}
      <div className="lg:col-span-8">
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            The Honest Truth
          </h3>
          <p className="mt-1 text-base text-gray-600 italic">
            Because sugarcoating doesn't help when you're struggling
          </p>
            </div>

        <ul className="space-y-3 text-gray-700">
  <li className="flex items-start gap-3">
    <Clock className="w-5 h-5 text-gray-500 mt-0.5" />
    <span>The average job search takes <strong>6–8 months</strong>. That's normal. You're not slow.</span>
  </li>

  <li className="flex items-start gap-3">
    <Mail className="w-5 h-5 text-gray-500 mt-0.5" />
    <span>Most students send <strong>100+ applications</strong> before getting offers. You're not doing it wrong.</span>
  </li>

  <li className="flex items-start gap-3">
    <Users className="w-5 h-5 text-gray-500 mt-0.5" />
    <span>Some fields are genuinely oversaturated. That's <strong>not your fault</strong>.</span>
  </li>

  <li className="flex items-start gap-3">
    <Shuffle className="w-5 h-5 text-gray-500 mt-0.5" />
    <span>Taking a non-linear path doesn't mean you failed. It means you're <strong>adapting</strong>.</span>
  </li>

  <li className="flex items-start gap-3">
    <HeartHandshake className="w-5 h-5 text-gray-500 mt-0.5" />
    <span>Your worth is <strong>not</strong> determined by your job, your GPA, or your major.</span>
  </li>
</ul>
</div>
   {/* Right: mini card */}
<div className="lg:col-span-4">
  <div className="h-full rounded-2xl bg-white border border-gray-200 p-7 shadow-sm flex flex-col">
    <h4 className="text-lg font-semibold text-gray-900">
      If you’re stuck today
    </h4>

    <p className="mt-2 text-gray-600">
      Pick one small next step. Not a life overhaul.
    </p>

    <div className="mt-6 space-y-3">
      <button
        onClick={() => setCurrentPage("job-tools-hub")}
        className="w-full px-4 py-2.5 rounded-lg bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
      >
        Open job tools
      </button>

      <button
        onClick={() => setCurrentPage("youre-not-alone")}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50 transition"
      >
        Get support
      </button>
        {/* Need a laugh */}
    
      <button
        onClick={() => setCurrentPage("need-a-laugh")}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 font-semibold hover:bg-gray-50 hover:text-gray-900 transition"
      >
        Need a laugh?
      </button>
      <p className="mt-1 text-xs text-gray-500">
        Low-stakes distraction. Zero guilt.
      </p>
    </div>
  </div>
</div>


    </div>
  </div>
</section>

<section className="py-12 bg-[#FFFBF7]">
  <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 space-y-8">

    {/* Teal Statement Card */}
    <div className="rounded-3xl bg-[#006581] text-white px-8 py-12 md:px-14 text-center shadow-lg shadow-black/30">
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="rounded-xl bg-white/10 ring-1 ring-white/20 p-4">
          <Compass className="w-8 h-8 text-white" strokeWidth={1.75} />
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
        There’s More Than One Way
      </h3>

      <p className="mt-5 max-w-3xl mx-auto text-base md:text-lg leading-relaxed text-white/90">
        Failed a class? 200 rejections? Feeling lost?
        <br className="hidden md:block" />
        None of that means your story is over. It just means you’re on a different
        path than you expected — and that’s okay.
      </p>

      <p className="mt-6 text-sm md:text-base font-medium text-white/75">
        Keep going. You’re doing better than you think.
      </p>
    </div>

    {/* Need Help Now */}
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
        className="bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-400 transition-all"
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
</section>

      </div>
     
     </>
  );
};

export default WarmHomePage;
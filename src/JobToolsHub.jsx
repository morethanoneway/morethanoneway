import React from 'react';
import { Search, BookOpen, FileText, MessageCircle, Compass, TrendingUp, Bell, Newspaper, Sparkles, Target } from 'lucide-react';
import Tile from "./components/Tile";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';




const JobToolsHub = ({ setCurrentPage }) => {
    const navigate = useNavigate();
  const navigateTo = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };
  return (
    <>
    <Helmet>
  <title>Job Tools Hub - Free Tools for Your Job Search | MoreThanOneWay.org</title>
  <meta name="description" content="All the free job search tools you need in one place — resume builder, ATS guide, interview prep, application tracker, and more." />
  <meta name="keywords" content="job search tools students, free resume builder, ATS guide, interview prep, application tracker, college job tools" />
  <meta property="og:title" content="Job Tools Hub | MoreThanOneWay.org" />
  <meta property="og:description" content="Free job search tools for college students — resume builder, ATS guide, interview prep, and more." />
</Helmet>
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">
        {/* Hero Section */}
        <div>
          <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">Job Tools {" "}
            <span className="text-gray-900">Hub</span></h1>
          <p className="mt-3 text-center text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
            Everything you need to find opportunities, apply effectively, and track your progress.
          </p>        
        </div>

{/* Start Here Section */}
<div className="mb-8 mt-8">
  <div className="flex items-center gap-3 mb-3">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center">
      <Target className="w-6 h-6 text-tealBrand/60" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800">
      Start Here
    </h2>
  </div>

  <p className="text-gray-600 max-w-2xl ml-15">
    Not sure what to do first? Follow this simple path: get direction, see real options, then start applying with a system.
  </p>
</div>

<div className="grid gap-6 md:grid-cols-3 mb-12">
  {/* Step 1 */}
  <div
    onClick={() => navigateTo("/career-map")}
    className="cursor-pointer bg-[#006581] text-white rounded-2xl p-8 ring-2 ring-[#006581]/20 scale-[1.01] hover:shadow-lg hover:-translate-y-1 transition-all"
  >
    <div className="text-xs font-bold tracking-wide uppercase text-white/70 mb-4">
      Step 1 · Get Clear
    </div>
    <Compass className="w-7 h-7 mb-5 text-white" />
    <h3 className="text-xl font-bold mb-3">
      Career Clarity & Decision System
    </h3>
    <p className="text-white/90 leading-relaxed mb-5">
      Not sure what direction to take? Answer questions about your real situation and get a career map built around your life.
    </p>
    <span className="font-semibold text-white">
      Start Career Map →
    </span>
  </div>

  {/* Step 2 */}
  <div
    onClick={() => navigateTo("/pivot")}
    className="cursor-pointer bg-[#006581] text-white rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
  >
    <div className="text-xs font-bold tracking-wide uppercase text-white/70 mb-4">
      Step 2 · Explore Options
    </div>
    <TrendingUp className="w-7 h-7 mb-5 text-white" />
    <h3 className="text-xl font-bold mb-3">
      Career Paths
    </h3>
    <p className="text-white/90 leading-relaxed mb-5">
      See what your degree can actually lead to — including adjacent careers, live job counts, and realistic options.
    </p>
    <span className="font-semibold text-white">
      Explore Career Paths →
    </span>
  </div>

  {/* Step 3 */}
  <div
    onClick={() => navigateTo("/job-search-playbook")}
    className="cursor-pointer bg-[#006581] text-white rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
  >
    <div className="text-xs font-bold tracking-wide uppercase text-white/70 mb-4">
      Step 3 · Start Applying
    </div>
    <BookOpen className="w-7 h-7 mb-5 text-white" />
    <h3 className="text-xl font-bold mb-3">
      Job Search Playbook 
    </h3>
    <p className="text-white/90 leading-relaxed mb-5">
      Follow a step-by-step system for resumes, applications, interviews, tracking, and follow-up.
    </p>
    <span className="font-semibold text-white">
      Open the Playbook →
    </span>
  </div>
</div>

{/* All Tools Section */}
<div className="mb-4 mt-10">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">
    Tools for Each Step
  </h2>
</div>

<div className="mt-0 grid gap-6 md:grid-cols-3">
  <Tile
    title="Resume Builder"
    desc="Turn experience into strong bullets and build an ATS-friendly resume that still sounds human."
    icon={<FileText />}
    onClick={() => navigateTo("/resume-builder")}
  />

  <Tile
    title="Cover Letter Generator"
    desc="Free cover letter builder with AI flag checker and keyword matcher. No sign-up."
    icon={<BookOpen />}
    onClick={() => navigateTo("/cover-letter")}
  />

  <Tile
    title="ATS Guide"
    desc="Make sure your resume gets through applicant tracking systems before a human sees it."
    icon={<Search />}
    onClick={() => navigateTo("/ats-guide")}
  />

  <Tile
    title="Application Tracker"
    desc="Log every application. Never lose a posting link. Track your progress."
    icon={<Bell />}
    onClick={() => navigateTo("/tracker")}
  />

  <Tile
    title="Search Guide"
    desc="A realistic job-search process — from preparation through rejection — built for today's market."
    icon={<MessageCircle />}
    onClick={() => navigateTo("/search-guide")}
  />

  <Tile
    title="Job Alert Guide"
    desc="Set alerts once on Indeed, LinkedIn, Handshake, and ZipRecruiter so opportunities come to you."
    icon={<Bell />}
    onClick={() => navigateTo("/job-alert")}
  />

  <Tile
    title="Interview Prep"
    desc="Common questions, real answers, and prep without sounding scripted."
    icon={<MessageCircle />}
    onClick={() => navigateTo("/interview-prep")}
  />
</div>


        {/* Additional Resources */}
        <div className=" bg-teal rounded-2xl shadow-soft p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-tealBrand/60" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Additional Resources</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
{/* Blog */}
<div className="bg-white rounded-xl p-6 border-2 border-tealBrand/20 hover:border-tealBrand/40 transition-all">
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
      <Newspaper className="w-6 h-6 text-tealBrand/60" />
    </div>
    <div className="flex-1">
      <h3 className="text-lg font-bold text-gray-800 mb-2">Blog</h3>
      <p className="text-sm text-gray-600 mb-4">
        Real advice, honest takes, and practical tips for students navigating school, job searching, and everything in between.
      </p>
      <button
        onClick={() => navigateTo('/blog')}
        className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all"
      >
        Read the Blog
      </button>
    </div>
  </div>
</div>

            {/* Free Study Help */}
            <div className="bg-white rounded-xl p-6 border-2 border-tealBrand/20 hover:border-tealBrand/40 transition-all">
              <div className="flex items-start gap-4">
                <div className=" w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-tealBrand/60" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Free Study Resources</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Free tutoring, study materials, and academic support to help you succeed in classes.
                  </p>
                  <button
                    onClick={() => navigateTo('/study-resources')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-400 transition-all"
                  >
                    Get Study Help
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Encouragement – You Can Do This */}
        <div className="mt-8 rounded-3xl bg-[#006581] text-white p-10 md:p-12 shadow-lg shadow-black/10">
          <div className="max-w-3xl mx-auto text-center space-y-5">

            <div className="flex justify-center">
              <div className="rounded-xl bg-white/10 ring-1 ring-white/20 p-4">
                <Sparkles className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
              You've Got This
            </h3>

            <p className="text-base md:text-lg leading-relaxed text-white/90">
              Job searching is hard. These tools are here to make it easier.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-white/90">
              Take it one step at a time.{" "}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"> Every application is progress</span>.
            </p>



            <p className="mt-8 text-lg md:text-xl font-semibold tracking-tight">
              Keep going. You’re closer than you think.
            </p>
          </div>
        </div>


      </div>
    </div>
   </>
  );
};
export default JobToolsHub;
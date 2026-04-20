// src/ResourcesPage.jsx
import React from "react";
import { Briefcase, TrendingUp, Users, Heart } from "lucide-react";
import { Helmet } from 'react-helmet-async';

const ResourcesPage = () => (
  <>
    <Helmet>
      <title>Free Career Resources for College Students | MoreThanOneWay.org</title>
      <meta name="description" content="Free career resources for college students — job boards, networking tips, resume help, and more. Everything in one place." />
      <meta name="keywords" content="free career resources students, college career center, job search resources, networking tips students, free resume help" />
      <meta property="og:title" content="Free Career Resources | MoreThanOneWay.org" />
      <meta property="og:description" content="Free career resources for college students — job boards, networking tips, resume help, and more." />
    </Helmet>
    <section className="bg-[#FFFBF7] py-10">
    <div className="mx-auto w-full max-w-6xl space-y-10">
      {/* Header */}
      <header className="text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Career Development
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
            Resources
          </span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
          Free tools, guides, and resources for job searching, career building, and mental health.
        </p>
      </header>

      {/* Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Job Search & Applications */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Briefcase className="w-6 h-6 text-tealBrand/80" />
            Job Search & Applications
          </h3>

          <ul className="divide-y divide-gray-100">
            <li className="py-3">
              <a
                href="https://www.indeed.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      Indeed
                    </p>
                    <p className="text-sm text-gray-600">
                      Major job board — filter by entry level and location
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for volume</span>
                </div>
              </a>
            </li>

            <li className="py-3">
              <a
                href="https://wellfound.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      Wellfound <span className="text-gray-400">(formerly AngelList)</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Startup jobs — often more open to new grads than large companies
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for startups</span>
                </div>
              </a>
            </li>

            <li className="py-3">
              <a
                href="https://builtin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      Built In
                    </p>
                    <p className="text-sm text-gray-600">
                      Tech jobs at growing companies across the U.S.
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for tech</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* Resume & Interview Prep */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <TrendingUp className="w-6 h-6 text-tealBrand/80" />
            Resume & Interview Prep
          </h3>

          <ul className="divide-y divide-gray-100">
            <li className="py-3">
              <a
                href="https://www.canva.com/resumes/templates/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      Canva Resume Templates
                    </p>
                    <p className="text-sm text-gray-600">
                      Free templates you can customize quickly
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for design</span>
                </div>
              </a>
            </li>

            <li className="py-3">
              <a
                href="https://resumeworded.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      Resume Worded
                    </p>
                    <p className="text-sm text-gray-600">
                      ATS-style feedback on what recruiters may see
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for ATS</span>
                </div>
              </a>
            </li>

            <li className="py-3">
              <a
                href="https://www.themuse.com/advice/interview-questions-and-answers"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      The Muse — Interview Prep
                    </p>
                    <p className="text-sm text-gray-600">
                      Common questions + frameworks for strong answers
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for practice</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* Career Exploration */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Users className="w-6 h-6 text-tealBrand/80" />
            Career Exploration
          </h3>

          <ul className="divide-y divide-gray-100">
            <li className="py-3">
              <a
                href="https://www.bls.gov/ooh/"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      Bureau of Labor Statistics (OOH)
                    </p>
                    <p className="text-sm text-gray-600">
                      Reliable info on growth, pay, and job outlook
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for data</span>
                </div>
              </a>
            </li>

            <li className="py-3">
              <a
                href="https://www.onetonline.org"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      O*NET Online
                    </p>
                    <p className="text-sm text-gray-600">
                      Explore careers by skills, interests, and tasks
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for fit</span>
                </div>
              </a>
            </li>
          </ul>
        </div>

        {/* Mental Health Support */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Heart className="w-6 h-6 text-tealBrand/80" />
            Mental Health Support
          </h3>

          <ul className="divide-y divide-gray-100">
            <li className="py-3">
              <a
                href="https://www.nami.org/Your-Journey/Teens-Young-Adults/College-Students"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-tealBrand transition">
                      NAMI — College Students
                    </p>
                    <p className="text-sm text-gray-600">
                      Mental health resources made for college life
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">Best for info</span>
                </div>
              </a>
            </li>

            <li className="py-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">Your Campus Counseling Center</p>
                  <p className="text-sm text-gray-600">
                    Most colleges offer free counseling. Search: “your school counseling center”
                  </p>
                </div>
                <span className="text-xs text-gray-500 mt-1">Best for support</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</section>
  </>
);

export default ResourcesPage;

import React from 'react';
import { Briefcase, BookOpen, Newspaper, Smile, Heart } from 'lucide-react';
import Tile from "./components/Tile";
import { Helmet } from 'react-helmet-async';

const ResourcesHub = ({ setCurrentPage }) => {
  return (
    <>
      <Helmet>
        <title>Free Resources for College Students | MoreThanOneWay.org</title>
        <meta name="description" content="Free career resources, study help, blog posts, and volunteer opportunities for college students. Everything in one place." />
        <meta name="keywords" content="free college resources, career resources students, free study help, college student blog, volunteer opportunities students" />
        <meta property="og:title" content="Resources | MoreThanOneWay.org" />
        <meta property="og:description" content="Free resources for college students — career guides, study help, blog, and more." />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">

          {/* Hero */}
          <div>
            <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Free{" "}
              <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                Resources
              </span>
            </h1>
            <p className="mt-3 text-center text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              Everything free. No sign-up, no paywall. Just practical support for students who need it.
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-3 justify-center">
              <button
                onClick={() => setCurrentPage('job-tools-hub')}
                className="bg-gray-900 text-white px-7 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all"
              >
                Job tools hub
              </button>
              <button
                onClick={() => setCurrentPage('stories')}
                className="bg-white text-gray-700 px-7 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-100 transition-all"
              >
                Read real stories
              </button>
              <button
                onClick={() => setCurrentPage('youre-not-alone')}
                className="bg-white text-gray-700 px-7 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-100 transition-all"
              >
                Get support & guidance
              </button>
            </div>
          </div>

          {/* Tiles */}
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Tile
              title="Career Resources"
              desc="Templates, guides, and tools to help you navigate your career — from resume to job offer."
              icon={<Briefcase />}
              onClick={() => setCurrentPage('resources')}
            />
            <Tile
              title="Free Study Help"
              desc="YouTube channels, websites, and study tools for every subject. Better explanations, at your own pace."
              icon={<BookOpen />}
              onClick={() => setCurrentPage('study-resources')}
            />
            <Tile
              title="Blog"
              desc="Real talk about college, careers, and mental health. Written for students who are figuring it out."
              icon={<Newspaper />}
              onClick={() => setCurrentPage('blog')}
            />
            <Tile
              title="Need a Break?"
              desc="Sometimes you just need a break. Low-stakes distraction. Zero guilt."
              icon={<Smile />}
              onClick={() => setCurrentPage('need-a-laugh')}
            />
            <Tile
              title="Volunteer Opportunities"
              desc="Build experience, give back, and find community — all at the same time."
              icon={<Heart />}
              onClick={() => setCurrentPage('volunteer')}
            />
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-tealBrand rounded-2xl p-10 text-center text-white">
            <h2 className="text-2xl font-extrabold mb-3">There's More Than One Way</h2>
            <p className="text-white/80 mb-1">Failed a class? 200 rejections? Feeling lost?</p>
            <p className="text-white/80">None of that means your story is over.</p>
            <p className="text-white/90 font-semibold mt-3">Keep going. You're doing better than you think.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default ResourcesHub;

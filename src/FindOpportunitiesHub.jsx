import React from 'react';
import { Search, BookOpen, Bell } from 'lucide-react';
import Tile from "./components/Tile";
import { Helmet } from 'react-helmet-async';

const FindOpportunitiesHub = ({ setCurrentPage }) => {
  return (
    <>
      <Helmet>
        <title>Find Internships & Opportunities | MoreThanOneWay.org</title>
        <meta name="description" content="Find internships, co-ops, and job opportunities. Search guides, job alert setup, and pre-filtered searches for college students." />
        <meta name="keywords" content="find internships college students, co-op search, job search guide, job alerts, engineering internships" />
        <meta property="og:title" content="Find Opportunities | MoreThanOneWay.org" />
        <meta property="og:description" content="Tools and guides to help college students find internships, co-ops, and jobs." />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-screen-2xl px-6 lg:px-12 py-10">

          {/* Hero */}
          <div>
            <h1 className="text-center text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Find{" "}
              <span className="block md:inline text-tealBrand">
                Opportunities
              </span>
            </h1>
            <p className="mt-3 text-center text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              Tools and guides to help you find internships, co-ops, and jobs — without wasting hours on dead ends.
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-3 justify-center">
              <button
                onClick={() => setCurrentPage('job-tools-hub')}
                className="bg-gray-900 text-white px-7 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all"
              >
                All job tools
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
              title="Find Internships & Co-ops"
              desc="Pre-filtered searches by major. Traditional roles plus adjacent paths that hire the same skills."
              icon={<Search />}
              onClick={() => setCurrentPage('find-internships')}
            />
            <Tile
              title="Search Guide"
              desc="A realistic job-search process — from preparation through rejection — built for today's market."
              icon={<BookOpen />}
              onClick={() => setCurrentPage('search-guide')}
            />
            <Tile
              title="Job Alert Guide"
              desc="Set alerts once on Indeed, LinkedIn, Handshake, and ZipRecruiter so opportunities come to you."
              icon={<Bell />}
              onClick={() => setCurrentPage('job-alert')}
            />
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 bg-tealBrand rounded-2xl p-10 text-center text-white">
            <h2 className="text-2xl font-extrabold mb-3">You've Got This</h2>
            <p className="text-white/80 mb-1">Finding opportunities takes time. That's normal.</p>
            <p className="text-white/80 mb-1">Most students send 100+ applications before getting offers.</p>
            <p className="text-white/90 font-semibold mt-3">Keep going. Every application is progress.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default FindOpportunitiesHub;

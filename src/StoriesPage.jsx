import React, { useState } from 'react';
import { MessageCircle, ExternalLink, Filter, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const StoriesPage = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterMajor, setFilterMajor] = useState('');

  const stories = [
    {
      name: 'Alex M.',
      major: 'Computer Science',
      category: 'Academic Struggles',
      struggle: 'Failed my first two CS classes. Felt like everyone else "got it" and I didn\'t. Almost dropped out.',
      outcome: 'Switched to Information Systems, graduated in 5 years. Now a Business Analyst at a startup. Love my job.',
      timeframe: 'Graduated 2 years ago',
      color: 'purple'
    },
    {
      name: 'Sarah K.',
      major: 'English',
      category: 'Job Search',
      struggle: 'Sent 200+ applications for editing jobs. Got 3 interviews. Was convinced my degree was worthless.',
      outcome: 'A friend suggested technical writing. Got hired at a software company. They desperately needed someone who could write clearly.',
      timeframe: 'Job search took 8 months',
      color: 'orange'
    },
    {
      name: 'Marcus T.',
      major: 'Biology',
      category: 'Career Change',
      struggle: 'Didn\'t get into med school. Felt like a complete failure. My whole identity was "pre-med."',
      outcome: 'Took a year off, worked as a research coordinator. Realized I love research more than I would have loved being a doctor. Now in a PhD program.',
      timeframe: '3 years post-grad',
      color: 'blue'
    },
    {
      name: 'Jamie L.',
      major: 'Psychology',
      category: 'Identity/Belonging',
      struggle: 'Week 2 of freshman year, my professor told me I "wasn\'t cut out for this field" after I asked a question.',
      outcome: 'That professor was wrong. Graduated, now a UX researcher. Make $85k and love going to work.',
      timeframe: 'Graduated last year',
      color: 'green'
    },
    {
      name: 'David R.',
      major: 'Engineering',
      category: 'Academic Struggles',
      struggle: 'Put on academic probation after failing 3 classes sophomore year. Thought my college career was over. Parents were devastated.',
      outcome: 'Met with an advisor who helped me create a realistic course load. Graduated in 5.5 years instead of 4. Now working at a great company—nobody asks how long it took.',
      timeframe: 'Graduated 18 months ago',
      color: 'pink'
    },
    {
      name: 'Priya S.',
      major: 'Business',
      category: 'Mental Health',
      struggle: 'Severe imposter syndrome junior year. Convinced everyone was smarter than me. Stopped participating in class, stopped going to office hours. My GPA tanked.',
      outcome: 'Started therapy through campus counseling. Learned that everyone feels this way sometimes. Got involved in a study group. Got my GPA to 3.2 and have landed a co-op.',
      timeframe: 'Senior year now',
      color: 'teal'
    },
    {
      name: 'Chris H.',
      major: 'Communications',
      category: 'Mental Health',
      struggle: 'Had to take a medical leave sophomore year for severe depression. Felt like I was falling behind everyone. Was terrified to come back.',
      outcome: 'Took a full year off to focus on mental health. Came back stronger. Graduated on time by taking summer classes. Now working in corporate communications and doing well.',
      timeframe: 'Graduated last spring',
      color: 'purple'
    },
    {
      name: 'Maya P.',
      major: 'Undecided → Art → Marketing',
      category: 'Changed Majors',
      struggle: 'Changed majors 3 times. Felt like I was wasting time and money. Parents were frustrated. I was lost.',
      outcome: 'Finally found marketing—combined my creative side with business skills. Each "wrong" major taught me something. Now a creative director at an ad agency.',
      timeframe: 'Graduated 3 years ago (took 5 years)',
      color: 'orange'
    },
    {
      name: 'Amir K.',
      major: 'Biology → Computer Science',
      category: 'Family Pressure',
      struggle: 'Parents wanted me to go to med school. I wanted to code. Felt like I was disappointing them. The guilt was crushing.',
      outcome: 'Had a hard conversation with my family. Switched to CS junior year. They came around when they saw how happy I was. Now a software engineer—they\'re proud.',
      timeframe: 'Graduated 1 year ago',
      color: 'blue'
    },
    {
      name: 'Jessica T.',
      major: 'Nursing',
      category: 'Financial Stress',
      struggle: 'Working 30 hours/week while taking 15 credits. Exhausted all the time. Grades were suffering. Felt like I had to choose between paying rent and passing classes.',
      outcome: 'Applied for emergency grants through the financial aid office—didn\'t even know they existed. Got help. Reduced work hours. Graduated. The struggle was real, but I made it.',
      timeframe: 'Graduated 6 months ago',
      color: 'green'
    }
  ];

  // Color configurations
  const colorSchemes = {
    purple: {
      border: 'border-purple-500',
      badge: 'bg-purple-100 text-purple-800'
    },
    orange: {
      border: 'border-orange-500',
      badge: 'bg-orange-100 text-orange-800'
    },
    blue: {
      border: 'border-blue-500',
      badge: 'bg-blue-100 text-blue-800'
    },
    green: {
      border: 'border-green-500',
      badge: 'bg-green-100 text-green-800'
    },
    pink: {
      border: 'border-pink-500',
      badge: 'bg-pink-100 text-pink-800'
    },
    teal: {
      border: 'border-teal-500',
      badge: 'bg-teal-100 text-teal-800'
    }
  };

  // Get unique categories
  const categories = ['All Stories', ...new Set(stories.map(s => s.category))].sort();
  const majors = ['All Majors', ...new Set(stories.map(s => s.major))].sort();

  // Filter stories by both category AND major
  const filteredStories = stories.filter(story => {
    const matchesCategory = !filterCategory || filterCategory === 'All Stories' || story.category === filterCategory;
    const matchesMajor = !filterMajor || filterMajor === 'All Majors' || story.major === filterMajor;
    return matchesCategory && matchesMajor;
  });

  return (
    <>
    <Helmet>
      <title>Find Engineering Internships & Co-ops | MoreThanOneWay.org</title>
      <meta name="description" content="Find internships and co-ops for engineering students. Search top job boards, company portals, and niche sites all in one place — free." />
      <meta name="keywords" content="engineering internships, co-op programs, find internships college students, internship search, engineering jobs" />
      <meta property="og:title" content="Find Engineering Internships & Co-ops | MoreThanOneWay.org" />
      <meta property="og:description" content="Search top job boards and company portals for engineering internships and co-ops — all in one place." />
    </Helmet>
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_22rem] gap-8">

          {/* MAIN */}
          <section className="bg-[#FFFBF7] py-10 rounded-2xl min-w-0">
            <main className="mx-auto w-full max-w-5xl px-4 space-y-10 mb-20 lg:mb-8">

              {/* Header */}
              <div className="px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                  They Made It{" "}
                  <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400">
                    Through
                  </span>
                </h1>
                <p className="mt-6 mb-0 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
                  Not because they had some superpower — <br className="hidden md:block" />because they kept going.
                  <br className="hidden md:block" />
                  You can too.
                </p>
              </div>
              {/* Share Your Story (moved into main) */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-8 h-8 text-tealBrand/80 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 leading-tight">
                      Your Story Could Save Someone
                    </h3>

                    <p className="mt-2 text-gray-700 text-sm leading-relaxed">
                      Right now, there's a student staring at their screen, convinced they're the only one struggling.
                      <span className="font-semibold text-gray-900"> Your story can show them they're not alone.</span>
                    </p>

                    <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                      <p className="text-gray-800 text-sm font-semibold italic mb-1">
                        Your 5 minutes could be the thing that makes someone choose to keep going.
                      </p>
                      <p className="text-xs text-gray-700">
                        We share survival stories—the messy truth—so students see there's more than one way forward.
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSex5f-hLh3ygRkdsLeE33vxmE7WUiajozBZtpFCczxBK8SpMQ/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-tealBrand/90 text-white px-6 py-3 rounded-xl font-bold hover:bg-tealBrand transition shadow-soft"
                      >
                        Share Your Story <ExternalLink className="w-4 h-4" />
                      </a>

                      <p className="text-xs text-gray-600 italic">
                        Anonymous option available • Preview before we post • It doesn&apos;t need to be perfect
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Dual Filter Section */}
              <div className="bg-[#FFFDF9] rounded-2xl border border-gray-200 p-6">

                <h3 className="text-lg font-bold mb-4 text-gray-800  leading-tight">Filter Stories</h3>
                <div className="grid md:grid-cols-2 gap-4">

                  {/* Filter by Struggle */}
                  <div>

                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category} {category === 'All Stories'
                            ? `(${stories.length})`
                            : `(${stories.filter((s) => s.category === category).length})`}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filter by Major */}
                  <div>

                    <select
                      value={filterMajor}
                      onChange={(e) => setFilterMajor(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-all"
                    >
                      {majors.map((major) => (
                        <option key={major} value={major}>
                          {major} {major === 'All Majors'
                            ? `(${stories.length})`
                            : `(${stories.filter((s) => s.major === major).length})`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Smart Related Filters */}
                {filterCategory && filterCategory !== 'All Stories' && !filterMajor && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      📚 Majors in &quot;{filterCategory}&quot;:{' '}
                      <span className="text-xs text-gray-500">(click to filter)</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(
                        stories
                          .filter((s) => s.category === filterCategory)
                          .map((s) => s.major)
                      )]
                        .sort()
                        .map((major) => {
                          const count = stories.filter(
                            (s) => s.category === filterCategory && s.major === major
                          ).length;

                          return (
                            <button
                              key={major}
                              onClick={() => setFilterMajor(major)}
                              className="bg-white hover:bg-orange-100 border-2 border-orange-300 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold transition-all hover:scale-105"
                            >
                              {major} ({count})
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}

                {filterMajor && filterMajor !== 'All Majors' && !filterCategory && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      🎯 Struggles in &quot;{filterMajor}&quot;:{' '}
                      <span className="text-xs text-gray-500">(click to filter)</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(
                        stories
                          .filter((s) => s.major === filterMajor)
                          .map((s) => s.category)
                      )]
                        .sort()
                        .map((category) => {
                          const count = stories.filter(
                            (s) => s.major === filterMajor && s.category === category
                          ).length;

                          return (
                            <button
                              key={category}
                              onClick={() => setFilterCategory(category)}
                              className="bg-white hover:bg-purple-100 border-2 border-purple-300 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold transition-all hover:scale-105"
                            >
                              {category} ({count})
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* Active Filters Display */}
                {(filterCategory && filterCategory !== 'All Stories') || (filterMajor && filterMajor !== 'All Majors') ? (
                  <div className="mt-4 flex flex-wrap gap-2 items-center">
                    <span className="text-sm text-gray-600 font-semibold">Active filters:</span>

                    {filterCategory && filterCategory !== 'All Stories' && (
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 font-semibold">
                        {filterCategory}
                        <button
                          onClick={() => setFilterCategory('')}
                          className="hover:text-purple-900 text-lg leading-none"
                        >
                          ×
                        </button>
                      </span>
                    )}

                    {filterMajor && filterMajor !== 'All Majors' && (
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 font-semibold">
                        {filterMajor}
                        <button
                          onClick={() => setFilterMajor('')}
                          className="hover:text-orange-900 text-lg leading-none"
                        >
                          ×
                        </button>
                      </span>
                    )}

                    <button
                      onClick={() => { setFilterCategory(''); setFilterMajor(''); }}
                      className="text-sm text-blue-600 hover:text-blue-800 underline font-semibold"
                    >
                      Clear all
                    </button>
                  </div>
                ) : null}

                <p className="mt-4 text-sm text-gray-600">
                  Showing <strong>{filteredStories.length}</strong> {filteredStories.length === 1 ? 'story' : 'stories'}
                </p>
              </div>
              <div className="space-y-4">
                <div className="pt-2 flex items-center gap-3">
                  <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
                    Stories
                  </p>

                  <div className="h-px flex-1 bg-gray-200" />
                </div>


              {/* Stories */}
{filteredStories.length > 0 ? (
  <div className="space-y-6">
    {filteredStories.map((story, idx) => {
      const colors = colorSchemes[story.color];

      return (
         <div
          key={idx}
          className="bg-white rounded-2xl border border-gray-200 p-8"
        >
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-xl text-gray-800">{story.name}</h3>
              <p className="text-sm text-gray-500">{story.major}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-semibold`}>
                {story.category}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                {story.timeframe}
              </span>
            </div>
          </div>

          {/* Story text (constrained line length) */}
          <div className="max-w-3xl space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                The Struggle
              </p>
              <p className="text-gray-700 leading-[1.7] font-normal">
                {story.struggle}
              </p>
            </div>

            <div className="border-l-2 border-gray-200 pl-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                What Happened
              </p>
              <p className="text-gray-700 leading-[1.7] font-normal">
                {story.outcome}
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
) : (
  <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-500">
    No stories yet for this category. Be the first to share your story!
  </div>
)}

              </div>
            </main>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="hidden xl:block self-start">
            <div className="mt-[320px]">
              <div className="bg-white rounded-2xl border border-gray-200 p-6">

                {/* Crisis */}
                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
                    In Crisis <span className="block text-gray-900">Right Now?</span>
                  </h3>

                  <div className="mt-4 space-y-4 text-sm">
                    <div>
                      <p className="font-bold text-gray-900">988 Suicide & Crisis Lifeline</p>
                      <p className="text-gray-600">Call or text 988 (24/7)</p>
                    </div>

                    <div>
                      <p className="font-bold text-gray-900">Crisis Text Line</p>
                      <p className="text-gray-600">Text HOME to 741741</p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs text-gray-600 italic text-center border-t border-gray-100 pt-4">
                    You matter. This feeling is temporary.<br />People want to help. ❤️
                  </p>
                </div>

                <div className="h-px bg-gray-100" />

                {/* More Support */}
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-tealBrand/80" />
                    <h3 className="font-bold text-gray-900">More Support</h3>
                  </div>

                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <a
                        href="https://www.nami.org/Your-Journey/Teens-Young-Adults/College-Students"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tealBrand/90 hover:text-orange-600 font-semibold flex items-center gap-1"
                      >
                        NAMI for College Students <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-gray-600 text-xs mt-1">Mental health support & resources</p>
                    </div>

                    <div>
                      <a
                        href="https://www.thetrevorproject.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tealBrand/90 hover:text-orange-600 font-semibold flex items-center gap-1"
                      >
                        The Trevor Project <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-gray-600 text-xs mt-1">Crisis support for LGBTQ+ youth</p>
                    </div>

                    <div>
                      <a
                        href="https://miresource.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tealBrand/90 hover:text-orange-600 font-semibold flex items-center gap-1"
                      >
                        MIResource <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-gray-600 text-xs mt-1">Free mental health resources</p>
                    </div>

                    <div>
                      <a
                        href="https://togetherall.com/en-us/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-tealBrand/90 hover:text-orange-600 font-semibold flex items-center gap-1"
                      >
                        Togetherall <ExternalLink className="w-3 h-3" />
                      </a>
                      <p className="text-gray-600 text-xs mt-1">Online peer support community</p>
                    </div>

                    <div className="mt-5 border-t border-gray-100 pt-4">
                      <p className="font-semibold text-gray-900 mb-1">Campus Counseling</p>
                      <p className="text-gray-600 text-xs">
                        Most colleges offer free counseling. Search: &quot;[your school name] counseling center&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
</>
  );
};

export default StoriesPage;
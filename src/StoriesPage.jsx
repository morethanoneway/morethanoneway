import React, { useState } from 'react';
import { MessageCircle, ExternalLink, Heart } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { stories } from './stories';

const colorSchemes = {
  purple: { border: 'border-purple-500', badge: 'bg-purple-100 text-purple-800' },
  orange: { border: 'border-orange-500', badge: 'bg-orange-100 text-orange-800' },
  blue: { border: 'border-blue-500', badge: 'bg-blue-100 text-blue-800' },
  green: { border: 'border-green-500', badge: 'bg-green-100 text-green-800' },
  pink: { border: 'border-pink-500', badge: 'bg-pink-100 text-pink-800' },
  teal: { border: 'border-teal-500', badge: 'bg-teal-100 text-teal-800' }
};

const StoriesPage = () => {
  const [filterCategory, setFilterCategory] = useState('');
  const [filterMajor, setFilterMajor] = useState('');
  const navigate = useNavigate();

  const categories = ['All Stories', ...new Set(stories.map(s => s.category))].sort();
  const majors = ['All Majors', ...new Set(stories.map(s => s.major))].sort();

  const filteredStories = stories.filter(story => {
    const matchesCategory = !filterCategory || filterCategory === 'All Stories' || story.category === filterCategory;
    const matchesMajor = !filterMajor || filterMajor === 'All Majors' || story.major === filterMajor;
    return matchesCategory && matchesMajor;
  });

  return (
    <>
      <Helmet>
        <title>Real College Student Survival Stories | MoreThanOneWay.org</title>
        <meta name="description" content="Real stories from college students who struggled and made it through. Academic failure, job search anxiety, mental health challenges — you're not alone." />
        <meta name="keywords" content="college student stories, struggling in college, academic failure stories, student mental health, college survival" />
        <meta property="og:title" content="Real College Student Survival Stories | MoreThanOneWay.org" />
        <meta property="og:description" content="Real stories from students who struggled and made it through. You're not alone — read their experiences." />
        <meta property="og:url" content="https://morethanoneway.org/stories" />
        <link rel="canonical" href="https://morethanoneway.org/stories" />
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
  Not because they had it figured out — because they kept going. You can too.
</p>
                </div>

                {/* Share Your Story */}
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
                         We share the real version — not the highlight reel — so students see there's more than one way through.
                        </p>
                      </div>
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSex5f-hLh3ygRkdsLeE33vxmE7WUiajozBZtpFCczxBK8SpMQ/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition-colors"
                      >
                        Share Your Story →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                        Filter by Category
                      </label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                        Filter by Major
                      </label>
                      <select
                        value={filterMajor}
                        onChange={(e) => setFilterMajor(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                      >
                        {majors.map(major => (
                          <option key={major} value={major}>{major}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">
                    Showing <strong>{filteredStories.length}</strong> {filteredStories.length === 1 ? 'story' : 'stories'}
                  </p>
                </div>

                {/* Stories */}
                <div className="space-y-4">
                  <div className="pt-2 flex items-center gap-3">
                    <p className="text-xs font-semibold text-gray-500 tracking-widest uppercase">Stories</p>
                    <div className="h-px flex-1 bg-gray-200" />
                  </div>

                  {filteredStories.length > 0 ? (
                    <div className="space-y-6">
                      {filteredStories.map((story) => {
                        const colors = colorSchemes[story.color] || colorSchemes.blue;
                        return (
                          <div
                            key={story.slug}
                            onClick={() => navigate(`/stories/${story.slug}`)}
                            className="bg-white rounded-2xl border border-gray-200 p-8 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all"
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

                            {/* Story text */}
                            <div className="max-w-3xl space-y-6">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                                  The Struggle
                                </p>
                                <p className="text-gray-700 leading-[1.7]">{story.struggle}</p>
                              </div>
                              <div className="border-l-2 border-gray-200 pl-4">
                                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                                  What Happened
                                </p>
                                <p className="text-gray-700 leading-[1.7]">{story.outcome}</p>
                              </div>
                            </div>

                            <p className="mt-4 text-sm font-semibold text-teal-600">Read full story →</p>
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
                        <a href="https://www.nami.org/Your-Journey/Teens-Young-Adults/College-Students" target="_blank" rel="noopener noreferrer" className="text-tealBrand/90 hover:text-orange-600 font-semibold flex items-center gap-1">
                          NAMI for College Students <ExternalLink className="w-3 h-3" />
                        </a>
                        <p className="text-gray-600 text-xs mt-1">Mental health support & resources</p>
                      </div>
                      <div>
                        <a href="https://www.thetrevorproject.org/" target="_blank" rel="noopener noreferrer" className="text-tealBrand/90 hover:text-orange-600 font-semibold flex items-center gap-1">
                          The Trevor Project <ExternalLink className="w-3 h-3" />
                        </a>
                        <p className="text-gray-600 text-xs mt-1">Crisis support for LGBTQ+ youth</p>
                      </div>
                      <div>
                        <a href="https://miresource.com/" target="_blank" rel="noopener noreferrer" className="text-tealBrand/90 hover:text-orange-600 font-semibold flex items-center gap-1">
                          MIResource <ExternalLink className="w-3 h-3" />
                        </a>
                        <p className="text-gray-600 text-xs mt-1">Free mental health resources</p>
                      </div>
                      <div>
                        <a href="https://togetherall.com/en-us/" target="_blank" rel="noopener noreferrer" className="text-tealBrand/90 hover:text-orange-600 font-semibold flex items-center gap-1">
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

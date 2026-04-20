import React, { useState } from 'react';
import { MessageCircle, ExternalLink, Heart } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      {/* Share Your Story Sidebar - Desktop Only - LEFT SIDE */}
      <div className="hidden xl:block fixed left-8 top-24 w-80 z-40">
        <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 border-2 border-orange-300 rounded-2xl p-6 shadow-xl">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <MessageCircle className="w-10 h-10 text-orange-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-2xl text-gray-900 leading-tight">Your Story Could Save Someone</h3>
            </div>
          </div>

          {/* Core Message */}
          <div className="bg-white rounded-xl p-4 mb-4 border-l-4 border-orange-400">
            <p className="text-gray-800 text-sm leading-relaxed mb-2">
              Right now, there's a student staring at their screen, convinced they're the only one struggling.
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              Your story can show them they're not alone.
            </p>
          </div>

          {/* Why it Matters */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
            <p className="text-gray-800 text-sm font-semibold italic mb-2">
              Your 5 minutes could be the thing that makes someone choose to keep going.
            </p>
            <p className="text-xs text-gray-700">
              We share survival stories—the messy truth—so students see there's more than one way forward.
            </p>
          </div>

          {/* Privacy + CTA */}
          <div className="text-center mb-3">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSex5f-hLh3ygRkdsLeE33vxmE7WUiajozBZtpFCczxBK8SpMQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-lg"
            >
              Share Your Story <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-gray-600 mt-2 italic">
              Anonymous option available • Preview before we post
            </p>
          </div>
        </div>
      </div>

      {/* Crisis Resources Sidebar - Desktop Only - RIGHT SIDE */}
      <div className="hidden xl:block fixed right-8 top-24 w-80 z-40">
        <div className="space-y-4">
          {/* Main Crisis Resources */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 leading-tight">In Crisis</h3>
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 leading-tight">
                Right Now?
              </h3>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-bold text-gray-900">988 Suicide & Crisis Lifeline:</p>
                <p className="text-gray-600">Call or text 988 (24/7)</p>
              </div>

              <div>
                <p className="font-bold text-gray-900">Crisis Text Line:</p>
                <p className="text-gray-600">Text HOME to 741741</p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600 italic text-center">
                  You matter. This feeling is temporary. People want to help. ❤️
                </p>
              </div>
            </div>
          </div>

          {/* Additional Mental Health Resources */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
              <h3 className="font-bold text-gray-800">More Support</h3>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <a
                  href="https://www.nami.org/Your-Journey/Teens-Young-Adults/College-Students"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
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
                  className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
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
                  className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
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
                  className="text-purple-600 hover:text-purple-700 font-semibold flex items-center gap-1"
                >
                  Togetherall <ExternalLink className="w-3 h-3" />
                </a>
                <p className="text-gray-600 text-xs mt-1">Online peer support community</p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="font-semibold text-gray-800 mb-1">Campus Counseling</p>
                <p className="text-gray-600 text-xs">
                  Most colleges offer free counseling. Search: "[your school name] counseling center"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* Main Content - Add padding on sides for sidebars on desktop */}
      <section className="bg-[#FFFBF7] py-10">
        <main className="mx-auto w-full max-w-5xl px-4 space-y-8 mb-20 lg:mb-8">

          {/* Header */}
          
            <div className="px-6 text-center">
               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              They Made It{" "}
                <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                  Through
                </span>
              </h1>
             <p className="mt-6 mb-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
                Not because they had some superpower — because they kept going.
                <br className="hidden md:block" />
                You can too.
              </p>
            </div>
          


          {/* Dual Filter Section */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Filter Stories</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Filter by Struggle */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">By struggle type:</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category} {category === 'All Stories' ? `(${stories.length})` : `(${stories.filter(s => s.category === category).length})`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter by Major */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">By major:</label>
                <select
                  value={filterMajor}
                  onChange={(e) => setFilterMajor(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none transition-all"
                >
                  {majors.map(major => (
                    <option key={major} value={major}>
                      {major} {major === 'All Majors' ? `(${stories.length})` : `(${stories.filter(s => s.major === major).length})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Smart Related Filters */}
            {filterCategory && filterCategory !== 'All Stories' && !filterMajor && (
              <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  📚 Majors in "{filterCategory}": <span className="text-xs text-gray-500">(click to filter)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(stories
                    .filter(s => s.category === filterCategory)
                    .map(s => s.major))]
                    .sort()
                    .map(major => {
                      const count = stories.filter(s => s.category === filterCategory && s.major === major).length;
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
                  🎯 Struggles in "{filterMajor}": <span className="text-xs text-gray-500">(click to filter)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(stories
                    .filter(s => s.major === filterMajor)
                    .map(s => s.category))]
                    .sort()
                    .map(category => {
                      const count = stories.filter(s => s.major === filterMajor && s.category === category).length;
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
                    <button onClick={() => setFilterCategory('')} className="hover:text-purple-900 text-lg leading-none">×</button>
                  </span>
                )}
                {filterMajor && filterMajor !== 'All Majors' && (
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 font-semibold">
                    {filterMajor}
                    <button onClick={() => setFilterMajor('')} className="hover:text-orange-900 text-lg leading-none">×</button>
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

            {/* Results count */}
            <p className="mt-4 text-sm text-gray-600">
              Showing <strong>{filteredStories.length}</strong> {filteredStories.length === 1 ? 'story' : 'stories'}
            </p>
          </div>

          {/* Stories */}
          {filteredStories.length > 0 ? (
            <div className="space-y-4">
              {filteredStories.map((story, idx) => {
                const colors = colorSchemes[story.color];
                return (
                  <div
                    key={idx}
                    className={`bg-white rounded-2xl shadow-soft p-8 border-l-4 ${colors.border} hover:shadow-lg transition-all`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">{story.name}</h3>
                        <p className="text-sm text-gray-600">{story.major}</p>
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

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">The Struggle:</p>
                        <p className="text-gray-800 leading-relaxed">{story.struggle}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 mb-1">What Happened:</p>
                        <p className="text-gray-800 leading-relaxed">{story.outcome}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-soft p-8 text-center text-gray-500">
              No stories yet for this category. Be the first to share your story!
            </div>
          )}

         </main>
      </section>
    </div>
  );
};

export default StoriesPage;
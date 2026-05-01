import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { posts } from './posts';

const RedditStoriesPage = ({ setCurrentPage }) => {
  const navigate = useNavigate();

  const redditPosts = posts.filter(post => post.category === 'Stranger on Reddit');

  const handlePostClick = (slug) => {
    window.scrollTo(0, 0);
    navigate('/blog/' + slug);
  };

  return (
    <>
      <Helmet>
        <title>Things I Told a Stranger on Reddit | MoreThanOneWay.org</title>
        <meta name="description" content="Real questions from real people. Career advice, life decisions, and honest replies from someone who's been around. No agenda, just help." />
        <meta property="og:title" content="Things I Told a Stranger on Reddit | MoreThanOneWay.org" />
        <meta property="og:description" content="Real questions from real people. Honest replies from someone with no agenda." />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">

          {/* Intro */}
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#006581] mb-4">
              Real Talk
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              Things I Told a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">Stranger on Reddit</span>
            </h1>

            <div className="text-gray-700 text-lg leading-relaxed space-y-4">
              <p>
                Reddit is a powerful tool. You can go there and find out just about anything.
                Need trip advice, got it. Need to know how to stop your dog from barking, got it.
                Want to see bread stapled to trees, got it. Seriously, there is a{' '}
                <a
                  href="https://reddit.com/r/breadstapledtotrees"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#006581] underline hover:text-[#005470]"
                >
                  r/breadstapledtotrees
                </a>.
              </p>
              <p>
                But there is another side of Reddit. The communities where people show up and ask
                for help. Real help. Career advice, life decisions, moments where someone feels
                completely stuck and doesn't know where to turn. I spend time in those communities
                because the questions are real and sometimes a stranger with no agenda is exactly
                what someone needs to hear from.
              </p>
              <p>These are some of those stories.</p>
            </div>

            <div className="mt-8 border-t border-gray-200" />
          </div>

          {/* Posts grid - 3 per row */}
          {redditPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {redditPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => handlePostClick(post.slug)}
                  className="bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] overflow-hidden"
                >
                  {post.image && (
                    <div className="w-full h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 hover:text-[#006581] transition-colors mb-3">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="text-[#006581] font-medium text-sm flex items-center gap-1 group">
                      Read the full story
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">More stories coming soon.</p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 bg-[#006581] text-white rounded-2xl px-8 py-10 text-center">
            <h3 className="text-xl font-bold mb-3">Recognize yourself in any of these?</h3>
            <p className="text-white/90 mb-6 text-sm leading-relaxed">
              You're not alone in feeling stuck. There are more resources on this site built
              specifically for moments like this.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => { window.scrollTo(0, 0); navigate('/youre-not-alone'); }}
                className="bg-white text-[#006581] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
              >
                Get support
              </button>
              <button
                onClick={() => { window.scrollTo(0, 0); navigate('/job-tools-hub'); }}
                className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all"
              >
                Explore job tools
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default RedditStoriesPage;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Heart, ExternalLink } from 'lucide-react';
import { getPostBySlug as getStoryBySlug } from './posts';

const colorSchemes = {
  purple: { border: 'border-purple-500', badge: 'bg-purple-100 text-purple-800', accent: 'text-purple-600' },
  orange: { border: 'border-orange-500', badge: 'bg-orange-100 text-orange-800', accent: 'text-orange-600' },
  blue: { border: 'border-blue-500', badge: 'bg-blue-100 text-blue-800', accent: 'text-blue-600' },
  green: { border: 'border-green-500', badge: 'bg-green-100 text-green-800', accent: 'text-green-600' },
  pink: { border: 'border-pink-500', badge: 'bg-pink-100 text-pink-800', accent: 'text-pink-600' },
  teal: { border: 'border-teal-500', badge: 'bg-teal-100 text-teal-800', accent: 'text-teal-600' }
};

const StoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const story = getStoryBySlug(slug);

  if (!story) {
    return (
      <div className="min-h-screen bg-[#FFFBF7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Story not found</h1>
          <button
            onClick={() => navigate('/stories')}
            className="text-teal-600 font-semibold hover:underline"
          >
            ← Back to all stories
          </button>
        </div>
      </div>
    );
  }

  const colors = colorSchemes[story.color] || colorSchemes.blue;

  return (
    <>
      <Helmet>
        <title>{story.metaTitle}</title>
        <meta name="description" content={story.metaDescription} />
        <meta property="og:title" content={story.metaTitle} />
        <meta property="og:description" content={story.metaDescription} />
        <meta property="og:url" content={`https://morethanoneway.org/stories/${story.slug}`} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`https://morethanoneway.org/stories/${story.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-[#FFFBF7]">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10">

          {/* Back button */}
          <button
            onClick={() => navigate('/stories')}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Stories
          </button>

          {/* Story card */}
          <div className={`bg-white rounded-2xl border-l-4 ${colors.border} border border-gray-200 p-8 shadow-sm`}>

            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
              <div>
                <h1 className="font-bold text-2xl text-gray-900">{story.name}</h1>
                <p className="text-sm text-gray-500 mt-1">{story.major}</p>
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

            {/* Story content */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  The Struggle
                </p>
                <p className="text-gray-700 leading-[1.8] text-lg">
                  {story.struggle}
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
                  What Happened
                </p>
                <p className="text-gray-700 leading-[1.8] text-lg">
                  {story.outcome}
                </p>
              </div>
            </div>
          </div>

          {/* You're not alone message */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <p className="font-bold text-gray-900 text-lg mb-2">You're not alone.</p>
            <p className="text-gray-600 text-sm">
              Every person on this page felt exactly like you do right now — and made it through.
            </p>
            <button
              onClick={() => navigate('/stories')}
              className="mt-4 inline-block text-sm font-semibold text-teal-600 hover:underline"
            >
              Read more stories →
            </button>
          </div>

          {/* Crisis resources */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Need support right now?</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold text-gray-900">988 Suicide & Crisis Lifeline</p>
                <p className="text-gray-600">Call or text 988 (24/7)</p>
              </div>
              <div>
                <p className="font-bold text-gray-900">Crisis Text Line</p>
                <p className="text-gray-600">Text HOME to 741741</p>
              </div>
              <div className="pt-2">
                <a
                  href="https://www.nami.org/Your-Journey/Teens-Young-Adults/College-Students"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-orange-600 font-semibold flex items-center gap-1"
                >
                  NAMI for College Students <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default StoryDetail;

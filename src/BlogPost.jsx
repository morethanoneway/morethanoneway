import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { getPostBySlug, posts } from './posts';
import BlogShareButtons from './BlogShareButtons';
import { Helmet } from 'react-helmet-async';

/**
 * BlogPost - Individual blog post viewer
 * State-based navigation version (no React Router)
 */
const BlogPost = ({ setCurrentPage, selectedPostSlug, setSelectedPostSlug }) => {
  const post = getPostBySlug(selectedPostSlug);

  // Scroll to top when post loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPostSlug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <button
            onClick={() => setCurrentPage('blog')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  // Get related posts (same category, exclude current)
  const relatedPosts = posts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Handle related post click
  const handleRelatedPostClick = (slug) => {
    setSelectedPostSlug(slug);
    window.scrollTo(0, 0);
  };

  // Handle internal link clicks to site pages
  const handleInternalLink = (e, href) => {
    // Check if it's an internal link (starts with /)
    if (href && href.startsWith('/')) {
      e.preventDefault();
      // Map URLs to page names
      const pageMap = {
        '/study-resources': 'study-resources',
        '/crisis': 'crisis',
        '/stories': 'stories',
        '/find-internships': 'find-internships',
        '/resume-builder': 'resume-builder',
        '/search-guide': 'search-guide',
        '/interview-prep': 'interview-prep',
        '/youre-not-alone': 'youre-not-alone',
        '/job-tools': 'job-tools-hub',
        '/tracker': 'tracker',
        '/career-map': 'career-map',
        '/contact': 'contact',
      };
      const pageName = pageMap[href];
      if (pageName) {
        setCurrentPage(pageName);
      }
    }
  };

  return (
    <>
    <Helmet>
  <title>{post.title} | MoreThanOneWay.org</title>
  <meta name="description" content={post.excerpt} />
  <meta property="og:title" content={post.title} />
  <meta property="og:description" content={post.excerpt} />
  <meta name="keywords" content={post.tags ? post.tags.join(', ') : ''} />
  <script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "url": `https://morethanoneway.org/blog/${post.slug}`,
  "datePublished": post.date,
  "author": {
    "@type": "Organization",
    "name": post.author || "MoreThanOneWay Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "More Than One Way",
    "url": "https://morethanoneway.org"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://morethanoneway.org/blog/${post.slug}`
  }
})}</script>
</Helmet>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => setCurrentPage('blog')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </button>

        {/* Post Header */}
        <article className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {/* Featured Image */}
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}

          {/* Post Content */}
          <div className="p-6 md:p-12">
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span
                className={`
                  text-sm font-medium px-4 py-2 rounded-full
                  ${post.category === 'Wellness' ? 'bg-teal-100 text-teal-700' : ''}
                  ${post.category === 'Career Development' ? 'bg-orange-100 text-orange-700' : ''}
                  ${post.category === 'Student Life' ? 'bg-yellow-100 text-yellow-700' : ''}
                  ${post.category === 'Guides & Tools' ? 'bg-indigo-100 text-indigo-700' : ''}
                  ${post.category === 'Stories' ? 'bg-green-100 text-green-700' : ''}
                `}
              >
                {post.category}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              {post.title}
            </h1>

            {/* Author & Share */}
            <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
              <p className="text-gray-600">By {post.author}</p>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // Custom styling for markdown elements
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-gray-700" {...props} />,
                  a: ({ node, href, ...props }) => (
                    <a
                      href={href}
                      onClick={(e) => handleInternalLink(e, href)}
                      className="text-purple-600 hover:text-purple-700 underline"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-6 space-y-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-6 space-y-2" {...props} />,
                  li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                  blockquote: ({ node, ...props }) => (
                    <blockquote className="border-l-4 border-purple-500 pl-4 italic my-6 text-gray-700" {...props} />
                  ),
                  code: ({ node, inline, ...props }) =>
                    inline ? (
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm" {...props} />
                    ) : (
                      <code className="block bg-gray-100 p-4 rounded-lg my-6 overflow-x-auto" {...props} />
                    ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border border-gray-200" {...props} />
                    </div>
                  ),
                  th: ({ node, ...props }) => (
                    <th className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-bold" {...props} />
                  ),
                  td: ({ node, ...props }) => (
                    <td className="border border-gray-200 px-4 py-2" {...props} />
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Social Share Buttons */}
            <BlogShareButtons title={post.title} slug={post.slug} />
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <button
                  key={relatedPost.id}
                  onClick={() => handleRelatedPostClick(relatedPost.slug)}
                  className="bg-white rounded-xl shadow-soft p-6 hover:shadow-lg transition-all hover:scale-[1.02] text-left"
                >
                  <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold mt-3 mb-2 text-gray-900">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default BlogPost;
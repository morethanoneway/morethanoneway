import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BlogCard from './BlogCard';
import { posts, getCategories } from './posts';
import { Helmet } from 'react-helmet-async';

/**
 * BlogPage - Main blog listing page
 * State-based navigation version (no React Router)
 */
const BlogPage = ({ setCurrentPage, setSelectedPostSlug }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const categories = getCategories();

  // Get all tags with counts
  const getTags = () => {
    const tagCounts = {};
    posts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1]) // Sort by count (descending)
      .map(([tag, count]) => ({ tag, count }));
  };

  const tags = getTags();

  // Filter posts based on category, tag, and search
  const filteredPosts = posts
    .filter(post => !selectedCategory || post.category === selectedCategory)
    .filter(post => !selectedTag || (post.tags && post.tags.includes(selectedTag)))
    .filter(post =>
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  // Separate featured and regular posts
  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
    <Helmet>
  <title>Blog - Real Advice for College Students | MoreThanOneWay.org</title>
  <meta name="description" content="Real stories, honest advice, and practical resources for college students navigating school, job searching, and mental health." />
  <meta name="keywords" content="college student blog, student advice, college mental health blog, internship tips blog, student life articles" />
  <meta property="og:title" content="MTOW Blog | MoreThanOneWay.org" />
  <meta property="og:description" content="Real stories, honest advice, and practical resources for college students." />
</Helmet>
        <div className="min-h-screen bg-[#FFFBF7]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-8 items-start">

          {/* MAIN */}
          <main className="min-w-0">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                MTOW {" "}
                <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                   Blog
                </span>
              </h1>

              <p className="mt-6 mb-8 max-w-3xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed">
                Real stories, honest advice, and resources from students who've been there.
              </p>
            </div>

            {/* Mobile Categories - Show only on mobile */}
            <div className="lg:hidden mb-8">
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`
                  px-4 py-2 rounded-full font-medium transition-all
                  ${!selectedCategory
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                `}
                  >
                    All Posts
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`
                    px-4 py-2 rounded-full font-medium transition-all
                    ${selectedCategory === category
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                  `}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Count */}
            {(selectedCategory || selectedTag || searchTerm) && (
              <p className="text-gray-600 mb-6">
                Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                {selectedCategory && ` in ${selectedCategory}`}
                {selectedTag && ` tagged with #${selectedTag}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            )}

            {/* Featured Post */}
            {featuredPost && !searchTerm && !selectedCategory && !selectedTag && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Post</h2>
                <BlogCard
                  post={featuredPost}
                  featured={true}
                  setCurrentPage={setCurrentPage}
                  setSelectedPostSlug={setSelectedPostSlug}
                />
              </div>
            )}

            {/* Regular Posts Grid */}
            {regularPosts.length > 0 ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {featuredPost && !searchTerm && !selectedCategory && !selectedTag ? 'Recent Posts' : 'All Posts'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map(post => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      setCurrentPage={setCurrentPage}
                      setSelectedPostSlug={setSelectedPostSlug}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No posts found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedTag(null);
                    setSearchTerm('');
                  }}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-transform"
                >
                  View All Posts
                </button>
              </div>
            )}
          </main>

          {/* RIGHT SIDEBAR (Desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl p-6 max-h-[calc(100vh-120px)] overflow-y-auto">

                {/* Categories */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Categories</h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`
              px-4 py-2 rounded-lg font-medium transition-all text-left
              ${!selectedCategory
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
            `}
                    >
                      All Posts
                    </button>

                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`
                px-4 py-2 rounded-lg font-medium transition-all text-left
                ${selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }
              `}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Tags */}
                {tags.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">Filter by Tag</h3>
                      {selectedTag && (
                        <button
                          onClick={() => setSelectedTag(null)}
                          className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {tags.map(({ tag, count }) => (
                        <button
                          key={tag}
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                          className={`
                  px-3 py-2 rounded-lg text-sm font-medium transition-all text-left
                  ${selectedTag === tag
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                              : 'bg-gray-50 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100'
                            }
                `}
                        >
                          <span className="flex items-center justify-between">
                            <span>#{tag}</span>
                            <span className="text-xs opacity-75 ml-2">({count})</span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
    </>
  );
};

export default BlogPage;
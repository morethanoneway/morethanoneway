import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import BlogCard from './BlogCard';
import { posts, getCategories } from './posts';
import { Helmet } from 'react-helmet-async';

const BlogPage = ({ setCurrentPage, setSelectedPostSlug }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const categories = getCategories();

  const filteredPosts = posts
    .filter(post => !selectedCategory || post.category === selectedCategory)
    .filter(post => !selectedTag || (post.tags && post.tags.includes(selectedTag)))
    .filter(post =>
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const isFiltering = selectedCategory || selectedTag || searchTerm;

  const clearAll = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
    setSearchTerm('');
  };

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

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              MTOW{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
                Blog
              </span>
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed">
              Real stories, honest advice, and resources from students who've been there.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#006581] focus:ring-1 focus:ring-[#006581] bg-white text-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                !selectedCategory
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              All Posts
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Active filters */}
          {isFiltering && (
            <div className="flex items-center gap-3 mb-6">
              <p className="text-sm text-gray-600">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                {selectedTag && <span> tagged <strong>#{selectedTag}</strong></span>}
                {searchTerm && <span> matching <strong>"{searchTerm}"</strong></span>}
              </p>
              <button onClick={clearAll}
                className="text-xs text-[#006581] underline hover:text-[#005470]">
                Clear filters
              </button>
            </div>
          )}

          {/* Featured Post */}
          {featuredPost && !isFiltering && (
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Featured Post</h2>
              <BlogCard
                post={featuredPost}
                featured={true}
                setCurrentPage={setCurrentPage}
                setSelectedPostSlug={setSelectedPostSlug}
                onTagClick={(tag) => setSelectedTag(tag)}
              />
            </div>
          )}

          {/* Posts grid */}
          {regularPosts.length > 0 ? (
            <>
              {!isFiltering && (
                <h2 className="text-xl font-bold mb-4 text-gray-900">
                  {featuredPost ? 'Recent Posts' : 'All Posts'}
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map(post => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    setCurrentPage={setCurrentPage}
                    setSelectedPostSlug={setSelectedPostSlug}
                    onTagClick={(tag) => setSelectedTag(tag)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">No posts found.</p>
              <button onClick={clearAll}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all">
                View all posts
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default BlogPage;
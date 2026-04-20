import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BlogCard from './BlogCard';
import { posts, getCategories } from './posts';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories, honest advice, and resources from students who've been there.
          </p>
        </div>

        {/* Category Tabs & Search */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-4">
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

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Tags Section */}
          {tags.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Filter by Tag</h3>
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Clear tag filter
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map(({ tag, count }) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`
                      px-3 py-1.5 rounded-full text-sm font-medium transition-all
                      ${selectedTag === tag
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100'
                      }
                    `}
                  >
                    #{tag} <span className="text-xs opacity-75">({count})</span>
                  </button>
                ))}
              </div>
            </div>
          )}
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

      </div>
    </div>
  );
};

export default BlogPage;
import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const BlogCard = ({ post, featured = false, setCurrentPage, setSelectedPostSlug, onTagClick }) => {
  const handleClick = () => {
    setSelectedPostSlug(post.slug);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        bg-white rounded-2xl shadow-soft hover:shadow-lg 
        transition-all duration-300 cursor-pointer
        hover:scale-[1.02] overflow-hidden
        ${featured ? 'md:col-span-2' : ''}
      `}
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
        <div className="flex items-center justify-between mb-3">
          <span className={`
            text-xs font-medium px-3 py-1 rounded-full
            ${post.category === 'Wellness' ? 'bg-teal-100 text-teal-700' : ''}
            ${post.category === 'Career Development' ? 'bg-orange-100 text-orange-700' : ''}
            ${post.category === 'Career' ? 'bg-orange-100 text-orange-700' : ''}
            ${post.category === 'Student Life' ? 'bg-yellow-100 text-yellow-700' : ''}
            ${post.category === 'Guides & Tools' ? 'bg-indigo-100 text-indigo-700' : ''}
            ${post.category === 'Stories' ? 'bg-green-100 text-green-700' : ''}
          `}>
            {post.category}
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {post.date}
          </span>
        </div>

        <h3 className={`font-bold mb-3 text-gray-900 hover:text-[#006581] transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
          {post.title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Clickable tags */}
        {post.tags && post.tags.length > 0 && onTagClick && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <button
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-[#006581] hover:text-white transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readTime}
          </span>
          <span className="text-[#006581] font-medium flex items-center gap-1 group">
            Read More
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
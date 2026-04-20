/**
 * Blog Posts - Markdown File System
 * 
 * Each blog post is now its own .md file in the /posts/ directory.
 * This file automatically imports and processes them.
 * 
 * TO ADD A NEW POST:
 * 1. Create a new .md file in src/posts/ directory
 * 2. Add frontmatter at the top (see existing posts for format)
 * 3. Write your content in markdown
 * 4. That's it! The post will automatically appear.
 */

// Import all markdown files from the posts directory
const postFiles = import.meta.glob('./posts/*.md', { eager: true, query: '?raw', import: 'default' });

// Process markdown files into post objects
export const posts = Object.entries(postFiles).map(([filepath, content]) => {
  // Extract frontmatter (the YAML between --- markers)
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    console.error(`No frontmatter found in ${filepath}`);
    return null;
  }

  const [, frontmatter, markdown] = match;
  
  // Parse frontmatter with proper array handling
  const metadata = {};
  let currentArrayKey = null;
  
  frontmatter.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) return;
    
    // Handle array items (lines starting with -)
    if (trimmedLine.startsWith('-') && currentArrayKey) {
      const value = trimmedLine.substring(1).trim();
      metadata[currentArrayKey].push(value);
      return;
    }
    
    // Handle key: value pairs
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return; // Skip lines without colons
    
    const key = line.substring(0, colonIndex).trim();
    const value = line.substring(colonIndex + 1).trim();
    
    // Check if this starts an array (value is empty)
    if (value === '' && (key === 'tags' || key.endsWith('s'))) {
      metadata[key] = [];
      currentArrayKey = key;
    }
    // Handle booleans
    else if (value === 'true') {
      metadata[key] = true;
      currentArrayKey = null;
    }
    else if (value === 'false') {
      metadata[key] = false;
      currentArrayKey = null;
    }
    // Handle numbers
    else if (!isNaN(value) && value !== '') {
      metadata[key] = Number(value);
      currentArrayKey = null;
    }
    // Handle strings (remove quotes if present)
    else if (value) {
      metadata[key] = value.replace(/^["']|["']$/g, '');
      currentArrayKey = null;
    }
  });

  return {
    id: metadata.id,
    title: metadata.title,
    slug: metadata.slug,
    date: metadata.date,
    category: metadata.category,
    tags: metadata.tags || [],
    excerpt: metadata.excerpt,
    author: metadata.author || 'MoreThanOneWay Team',
    readTime: metadata.readTime,
    featured: metadata.featured || false,
    image: metadata.image || null,
    content: markdown.trim()
  };
}).filter(Boolean); // Remove any null entries

// Sort by date (descending - newest first)
posts.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB - dateA; // Newest first
});

// Helper functions
export const getPostBySlug = (slug) => {
  return posts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category) => {
  return posts.filter(post => post.category === category);
};

export const getFeaturedPosts = () => {
  return posts.filter(post => post.featured);
};

export const getCategories = () => {
  const categories = [...new Set(posts.map(post => post.category))];
  return categories;
};
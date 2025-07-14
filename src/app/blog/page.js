'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';
import Contact from '@/components/Contact';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real blog data from API
    Promise.all([
      fetch('/api/blogs').then((res) => res.json()),
      fetch('/api/blogs/tags').then((res) => res.json()),
    ])
      .then(([blogsData, tagsData]) => {
        setBlogs(blogsData);
        setAllTags(tagsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading blogs:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      console.log(blog.title, blog.slug);
      // Defensive check: ensure title exists before calling toLowerCase()
      const title = blog.title || '';
      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTag =
        selectedTags.length === 0 ||
        (blog.tags && selectedTags.some((tag) => blog.tags.includes(tag)));
      return matchesSearch && matchesTag;
    });
    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedTags]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  if (loading) {
    return (
      <div className='py-8'>
        <h1 className='text-2xl mb-6 text-custom-bright-fg'>blog</h1>
        <p className='text-custom-comment text-sm'>Loading blog posts...</p>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <h1 className='text-2xl mb-6 text-custom-bright-fg'>blog</h1>

      {/* Search and Filter */}
      <div className='mb-6 space-y-2'>
        <div className='relative'>
          <input
            id='blog-search'
            type='text'
            placeholder='search... (press / to focus)'
            className='w-full p-2 bg-custom-dark-bg border border-custom-border text-sm font-mono text-custom-soft-white placeholder-custom-comment focus:outline-none focus:border-custom-fg'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label='Search blog posts'
          />
        </div>
        <div className='flex flex-wrap gap-2 items-center'>
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 text-xs font-mono border transition-colors focus:outline-none focus:ring-1 focus:ring-custom-fg ${
                  isSelected
                    ? 'bg-custom-fg text-custom-bg border-custom-fg hover:bg-custom-bright-fg'
                    : 'bg-custom-dark-bg text-custom-soft-white border-custom-border hover:border-custom-fg hover:text-custom-bright-fg'
                }`}
                aria-label={`${isSelected ? 'Remove' : 'Add'} ${tag} filter`}
                aria-pressed={isSelected}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className='px-2 py-1 text-xs text-custom-comment hover:text-custom-fg transition-colors border-l border-custom-border ml-2 pl-3'
              aria-label='Clear all tag filters'
            >
              clear all
            </button>
          )}
        </div>
      </div>

      <div className='space-y-1 pb-8'>
        {filteredBlogs.map((blog, index) => (
          <BlogCard key={blog.slug || index} blog={blog} />
        ))}
        {filteredBlogs.length === 0 && !loading && (
          <p className='text-custom-comment text-sm py-4'>
            No blogs found matching your criteria.
          </p>
        )}
      </div>
      <Contact />
    </div>
  );
}

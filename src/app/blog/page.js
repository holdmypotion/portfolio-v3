'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';
import Contact from '@/components/Contact';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [allTags, setAllTags] = useState(['all']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real blog data from API
    Promise.all([
      fetch('/api/blogs').then((res) => res.json()),
      fetch('/api/blogs/tags').then((res) => res.json()),
    ])
      .then(([blogsData, tagsData]) => {
        setBlogs(blogsData);
        setAllTags(['all', ...tagsData]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading blogs:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTag =
        selectedTag === 'all' || (blog.tags && blog.tags.includes(selectedTag));
      return matchesSearch && matchesTag;
    });
    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, selectedTag]);

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
        <select
          className='p-2 bg-custom-dark-bg border border-custom-border text-sm font-mono text-custom-soft-white focus:outline-none focus:border-custom-fg'
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          aria-label='Filter by tag'
        >
          {allTags.map((tag) => (
            <option
              key={tag}
              value={tag}
              className='bg-custom-dark-bg text-custom-soft-white'
            >
              {tag === 'all' ? 'all tags' : tag}
            </option>
          ))}
        </select>
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

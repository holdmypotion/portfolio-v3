'use client';

import { useState, useEffect } from 'react';
import BlogCard from '@/components/BlogCard';
import SearchAndFilter from '@/components/SearchAndFilter';
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

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        allTags={allTags}
        searchInputId='blog-search'
        searchPlaceholder='search blogs... (press / to focus)'
        searchAriaLabel='Search blog posts'
      />

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

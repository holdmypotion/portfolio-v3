'use client';

import { useState, useEffect } from 'react';
import SystemsDesignCard from '@/components/SystemsDesignCard';
import SearchAndFilter from '@/components/SearchAndFilter';
import Contact from '@/components/Contact';

export default function SystemsDesignPage() {
  const [systemsDesign, setSystemsDesign] = useState([]);
  const [filteredSystemsDesign, setFilteredSystemsDesign] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load real systems design data from API
    Promise.all([
      fetch('/api/systems-design').then((res) => res.json()),
      fetch('/api/systems-design/tags').then((res) => res.json()),
    ])
      .then(([systemsDesignData, tagsData]) => {
        setSystemsDesign(systemsDesignData);
        setAllTags(tagsData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading systems design:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = systemsDesign.filter((diagram) => {
      // Defensive check: ensure title exists before calling toLowerCase()
      const title = diagram.title || '';
      const matchesSearch = title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTag =
        selectedTags.length === 0 ||
        (diagram.tags &&
          selectedTags.some((tag) => diagram.tags.includes(tag)));
      return matchesSearch && matchesTag;
    });
    setFilteredSystemsDesign(filtered);
  }, [systemsDesign, searchTerm, selectedTags]);

  if (loading) {
    return (
      <div className='py-8'>
        <h1 className='text-2xl mb-6 text-custom-bright-fg'>systems design</h1>
        <p className='text-custom-comment text-sm'>Loading systems design...</p>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <h1 className='text-2xl mb-6 text-custom-bright-fg'>systems design</h1>

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        allTags={allTags}
        searchInputId='systems-design-search'
        searchPlaceholder='search systems design... (press / to focus)'
        searchAriaLabel='Search systems design'
      />

      <div className='space-y-1 pb-8'>
        {filteredSystemsDesign.map((diagram, index) => (
          <SystemsDesignCard key={diagram.slug || index} diagram={diagram} />
        ))}
        {filteredSystemsDesign.length === 0 && !loading && (
          <p className='text-custom-comment text-sm py-4'>
            No systems design found matching your criteria.
          </p>
        )}
      </div>
      <Contact />
    </div>
  );
}

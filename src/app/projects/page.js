'use client';

import { useState, useEffect, useMemo } from 'react';
import ProjectCard from '@/components/ProjectCard';
import Contact from '@/components/Contact';
import SearchAndFilter from '@/components/SearchAndFilter';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load real project data from API
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading projects:', error);
        setLoading(false);
      });
  }, []);

  // Filter projects based on search term
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      return (
        searchTerm === '' ||
        project.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [projects, searchTerm]);

  if (loading) {
    return (
      <div className='py-8'>
        <h1 className='text-2xl mb-6 text-custom-bright-fg'>projects</h1>
        <p className='text-custom-comment text-sm'>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <h1 className='text-2xl mb-6 text-custom-bright-fg'>projects</h1>

      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTags={[]}
        setSelectedTags={() => {}}
        allTags={[]}
        searchInputId='projects-search'
        searchPlaceholder='search projects... (press / to focus)'
        searchAriaLabel='Search projects'
      />

      <div className='space-y-6 pb-8'>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.slug || index} project={project} />
        ))}
        {filteredProjects.length === 0 && projects.length > 0 && (
          <p className='text-custom-comment text-sm py-4'>
            No projects match your search criteria.
          </p>
        )}
        {projects.length === 0 && (
          <p className='text-custom-comment text-sm py-4'>No projects found.</p>
        )}
      </div>
      <Contact />
    </div>
  );
}

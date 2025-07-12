'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import Contact from '@/components/Contact';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className='py-8'>
        <h2 className='text-2xl mb-6 text-custom-bright-fg'>projects</h2>
        <p className='text-custom-comment text-sm'>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <h2 className='text-2xl mb-6 text-custom-bright-fg'>projects</h2>
      <div className='space-y-6 pb-8'>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug || index} project={project} />
        ))}
        {projects.length === 0 && (
          <p className='text-custom-comment text-sm py-4'>No projects found.</p>
        )}
      </div>
      <Contact />
    </div>
  );
}

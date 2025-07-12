import Link from 'next/link';

export default function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'production':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className='py-4 border-b border-custom-border'>
      <div className='flex items-start justify-between mb-2'>
        <Link href={`/projects/${project.slug}`}>
          <h3 className='text-base font-medium hover:underline cursor-pointer'>
            {project.name}
          </h3>
        </Link>
        <span className={`text-xs px-2 py-1 ${getStatusColor(project.status)}`}>
          {project.status}
        </span>
      </div>
      <p className='text-sm text-gray-700 mb-2'>{project.description}</p>
      <div className='text-xs text-gray-600 mb-3'>
        <strong>Tech:</strong> {project.tech}
      </div>
      <div className='flex space-x-4 text-sm'>
        {project.github && (
          <a
            href={project.github}
            className='underline hover:no-underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            github
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            className='underline hover:no-underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            live
          </a>
        )}
      </div>
    </div>
  );
}

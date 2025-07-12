import Link from 'next/link';

export default function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'production':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'active':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'archived':
        return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
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
        <span
          className={`text-xs px-2 py-1 rounded-md ${getStatusColor(
            project.status,
          )}`}
        >
          {project.status}
        </span>
      </div>
      <p className='text-sm text-gray-300 mb-2'>{project.description}</p>
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

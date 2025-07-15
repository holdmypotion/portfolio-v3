import Link from 'next/link';

export default function ProjectCard({ project }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'production':
        return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'active':
        return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
      case 'maintenance':
        return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'archived':
        return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='py-4 border-b border-custom-border'>
      <div className='flex items-start justify-between mb-2'>
        <Link href={`/projects/${project.slug}`}>
          <h3 className='text-base font-medium hover:underline cursor-pointer'>
            {project.name}
          </h3>
        </Link>
        <div className='flex items-center space-x-2'>
          <span
            className={`text-xs px-2 py-1 rounded-md ${getStatusColor(
              project.status,
            )}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      <p className='text-sm text-gray-300 mb-2'>{project.description}</p>

      <div className='text-xs text-gray-600 mb-3'>
        <strong>Tech:</strong> {project.tech}
      </div>

      {/* GitHub-specific stats */}
      {(project.stars !== undefined ||
        project.forks !== undefined ||
        project.language) && (
        <div className='flex items-center space-x-4 text-xs text-gray-500 mb-3'>
          {project.language && (
            <div className='flex items-center space-x-1'>
              <span className='w-2 h-2 bg-blue-400 rounded-full'></span>
              <span>{project.language}</span>
            </div>
          )}
          {project.stars !== undefined && (
            <div className='flex items-center space-x-1'>
              <span>⭐</span>
              <span>{project.stars}</span>
            </div>
          )}
          {project.forks !== undefined && (
            <div className='flex items-center space-x-1'>
              <span>🍴</span>
              <span>{project.forks}</span>
            </div>
          )}
          {project.updated_at && (
            <div className='flex items-center space-x-1'>
              <span>📅</span>
              <span>Updated {formatDate(project.updated_at)}</span>
            </div>
          )}
        </div>
      )}

      {/* Topics/Tags */}
      {project.topics && project.topics.length > 0 && (
        <div className='flex flex-wrap gap-1 mb-3'>
          {project.topics.slice(0, 5).map((topic) => (
            <span
              key={topic}
              className='text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-md'
            >
              {topic}
            </span>
          ))}
          {project.topics.length > 5 && (
            <span className='text-xs text-gray-500'>
              +{project.topics.length - 5} more
            </span>
          )}
        </div>
      )}

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

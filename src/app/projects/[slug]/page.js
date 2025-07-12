import Link from 'next/link';
import { getProjectBySlug } from '@/lib/projects';
import { notFound } from 'next/navigation';
import CodeHighlighter from '@/components/CodeHighlighter';
import Contact from '@/components/Contact';

export default async function ProjectPage({ params }) {
  const { slug } = params;

  let project;
  try {
    const projectData = await getProjectBySlug(slug);
    project = {
      ...projectData.frontmatter,
      content: projectData.content,
      slug: projectData.slug,
    };
  } catch (error) {
    console.error('Error loading project:', error);
    notFound();
  }

  if (!project) {
    notFound();
  }

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
    <div className='py-8'>
      <div className='mb-6'>
        <Link
          href='/projects'
          className='text-sm text-custom-comment hover:text-custom-fg transition-colors'
        >
          ← back to projects
        </Link>
      </div>

      <article>
        <header className='mb-8'>
          <div className='flex items-start justify-between mb-4'>
            <h1 className='text-2xl font-medium text-custom-bright-fg'>
              {project.name}
            </h1>
            <span
              className={`text-xs px-2 py-1 ${getStatusColor(project.status)}`}
            >
              {project.status}
            </span>
          </div>

          <p className='text-custom-soft-white mb-4'>{project.description}</p>

          {project.tech && (
            <div className='text-sm text-custom-comment mb-4'>
              <strong className='text-custom-fg'>Tech:</strong> {project.tech}
            </div>
          )}

          <div className='flex space-x-4 text-sm mb-6'>
            {project.github && (
              <a
                href={project.github}
                className='underline text-custom-func hover:text-custom-bright-fg transition-colors'
                target='_blank'
                rel='noopener noreferrer'
              >
                github
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                className='underline text-custom-func hover:text-custom-bright-fg transition-colors'
                target='_blank'
                rel='noopener noreferrer'
              >
                live demo
              </a>
            )}
          </div>
        </header>

        <CodeHighlighter>
          <div
            className='prose text-sm leading-relaxed max-w-none'
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </CodeHighlighter>
      </article>
      <Contact />
    </div>
  );
}

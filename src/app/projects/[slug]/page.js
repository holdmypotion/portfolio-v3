import Link from 'next/link';
import { getGitHubProjectBySlug, getAllGitHubProjects } from '@/lib/github';
import { markdownToHtml } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import CodeHighlighter from '@/components/CodeHighlighter';
import Contact from '@/components/Contact';

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const project = await getGitHubProjectBySlug(slug);

    return {
      title: project.name,
      description:
        project.description ||
        `Learn about ${project.name} - A ${
          project.tech || 'software'
        } project by Rahul Sharma`,
      keywords: [
        project.name,
        ...(project.tech?.split(', ') || []),
        ...(project.topics || []),
        'Software Project',
        'Portfolio',
        'Development',
        'Rahul Sharma',
      ],
      authors: [{ name: 'Rahul Sharma' }],
      openGraph: {
        title: `${project.name} | Rahul Sharma`,
        description:
          project.description ||
          `Learn about ${project.name} - A software project by Rahul Sharma`,
        type: 'website',
        images: [
          {
            url: '/wallpaper.jpg',
            width: 1200,
            height: 630,
            alt: `${project.name} - Project by Rahul Sharma`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${project.name} | Rahul Sharma`,
        description:
          project.description ||
          `Learn about ${project.name} - A software project by Rahul Sharma`,
        images: ['/wallpaper.jpg'],
      },
      alternates: {
        canonical: `https://www.holdmypotion.tech/projects/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    const githubProjects = await getAllGitHubProjects();
    return githubProjects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params from GitHub:', error);
    return [];
  }
}

export default async function ProjectPage({ params }) {
  const { slug } = params;

  let project;

  try {
    project = await getGitHubProjectBySlug(slug);

    // Convert README markdown to HTML
    if (project.readme_content) {
      project.content = await markdownToHtml(project.readme_content);
    } else {
      project.content = '<p>No README content available for this project.</p>';
    }
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
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800/20 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800/20 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // JSON-LD structured data for project
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    url: project.live || `https://www.holdmypotion.tech/projects/${slug}`,
    codeRepository: project.github,
    programmingLanguage: project.tech?.split(', ') || [],
    author: {
      '@type': 'Person',
      name: 'Rahul Sharma',
      url: 'https://www.holdmypotion.tech',
    },
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web Browser',
    keywords: project.topics,
    dateCreated: project.created_at,
    dateModified: project.updated_at,
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

            <p className='text-custom-soft-white mb-4'>{project.description}</p>

            {/* GitHub-specific stats */}
            <div className='flex items-center space-x-4 text-sm text-custom-comment mb-4'>
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

            {project.tech && (
              <div className='text-sm text-custom-comment mb-4'>
                <strong className='text-custom-fg'>Tech:</strong> {project.tech}
              </div>
            )}

            {project.topics && project.topics.length > 0 && (
              <div className='flex flex-wrap gap-1 mb-4'>
                {project.topics.map((topic) => (
                  <span
                    key={topic}
                    className='text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-md'
                  >
                    {topic}
                  </span>
                ))}
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
    </>
  );
}

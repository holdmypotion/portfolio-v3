import Link from 'next/link';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import CodeHighlighter from '@/components/CodeHighlighter';
import Contact from '@/components/Contact';

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const projectData = await getProjectBySlug(slug);
    const project = projectData.frontmatter;

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
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

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
              <span
                className={`text-xs px-2 py-1 ${getStatusColor(
                  project.status,
                )}`}
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
    </>
  );
}

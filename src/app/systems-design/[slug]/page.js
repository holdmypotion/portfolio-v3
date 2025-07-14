import Link from 'next/link';
import {
  getSystemsDesignBySlug,
  getAllSystemsDesignSlugs,
} from '@/lib/systems-design';
import { notFound } from 'next/navigation';
import ExcalidrawViewer from '@/components/ExcalidrawViewer';
import { markdownToHtml } from '@/lib/markdown';
import Contact from '@/components/Contact';

export async function generateStaticParams() {
  const slugs = getAllSystemsDesignSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }) {
  const diagram = getSystemsDesignBySlug(params.slug);

  if (!diagram) {
    return {
      title: 'Diagram Not Found',
    };
  }

  return {
    title: `${diagram.title} | Systems Design`,
    description:
      diagram.description || `System design diagram: ${diagram.title}`,
    openGraph: {
      title: `${diagram.title} | Systems Design`,
      description:
        diagram.description || `System design diagram: ${diagram.title}`,
      type: 'article',
      publishedTime: diagram.date,
    },
  };
}

export default async function SystemsDesignDiagramPage({ params }) {
  const diagram = getSystemsDesignBySlug(params.slug);

  if (!diagram) {
    notFound();
  }

  let textContent = '';
  if (diagram.type === 'markdown' && diagram.content) {
    textContent = await markdownToHtml(diagram.content);
  }

  return (
    <div className='py-8'>
      <div className='mb-6'>
        <Link
          href='/systems-design'
          className='text-sm text-custom-comment hover:text-custom-fg transition-colors'
        >
          ← back to systems design
        </Link>
      </div>

      <article>
        <header className='mb-8'>
          <h1 className='text-2xl font-medium mb-3 text-custom-bright-fg'>
            {diagram.title}
          </h1>

          {diagram.description && (
            <p className='text-sm text-custom-description mb-4 leading-relaxed'>
              {diagram.description}
            </p>
          )}

          <div className='flex items-center space-x-2 text-sm text-custom-comment'>
            <time dateTime={diagram.date}>{diagram.date}</time>
            {diagram.tags && diagram.tags.length > 0 && (
              <>
                <span>•</span>
                <span>{diagram.tags.join(', ')}</span>
              </>
            )}
          </div>
        </header>

        <div className='mb-8'>
          <ExcalidrawViewer
            excalidrawData={diagram.excalidrawData}
            title={diagram.title}
          />
        </div>

        {textContent && (
          <div
            className='prose prose-custom text-sm leading-relaxed max-w-none'
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        )}
      </article>
      <Contact />
    </div>
  );
}

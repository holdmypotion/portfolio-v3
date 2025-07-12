import Link from 'next/link';
import { getBlogBySlug } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import CodeHighlighter from '@/components/CodeHighlighter';
import Contact from '@/components/Contact';

export default async function BlogPostPage({ params }) {
  const { slug } = params;

  let blog;
  try {
    const blogData = await getBlogBySlug(slug);
    blog = {
      ...blogData.frontmatter,
      content: blogData.content,
      slug: blogData.slug,
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className='py-8'>
      <div className='mb-6'>
        <Link
          href='/blog'
          className='text-sm text-custom-comment hover:text-custom-fg transition-colors'
        >
          ← back to blog
        </Link>
      </div>

      <article>
        <header className='mb-8'>
          <h1 className='text-2xl font-medium mb-2 text-custom-bright-fg'>
            {blog.title}
          </h1>
          <div className='flex items-center space-x-2 text-sm text-custom-comment'>
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.tags ? blog.tags.join(', ') : ''}</span>
          </div>
          {/* {blog.description && (
            <p className='text-custom-comment mt-4 text-sm leading-relaxed'>
              {blog.description}
            </p>
          )} */}
        </header>

        <CodeHighlighter>
          <div
            className='prose prose-custom text-sm leading-relaxed max-w-none'
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </CodeHighlighter>
      </article>
      <Contact />
    </div>
  );
}

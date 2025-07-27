import Link from 'next/link';
import { getBlogBySlug, getAllBlogs } from '@/lib/blogs';
import { notFound } from 'next/navigation';
import BlogImage from '@/components/BlogImage';
import CodeHighlighter from '@/components/CodeHighlighter';
import Contact from '@/components/Contact';

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    const blogData = await getBlogBySlug(slug);
    const blog = blogData.frontmatter;

    return {
      title: blog.title,
      description:
        blog.description ||
        `Read about ${blog.title} - ${
          blog.tags?.join(', ') || 'Technical article'
        } by Rahul Sharma`,
      keywords: [
        ...(blog.tags || []),
        'Technical Blog',
        'Software Engineering',
        'Programming',
        'Rahul Sharma',
      ],
      authors: [{ name: 'Rahul Sharma' }],
      publishedTime: blog.date,
      openGraph: {
        title: `${blog.title} | Rahul Sharma`,
        description:
          blog.description ||
          `Read about ${blog.title} - Technical article by Rahul Sharma`,
        type: 'article',
        publishedTime: blog.date,
        authors: ['Rahul Sharma'],
        tags: blog.tags || [],
        images: [
          {
            url: blog.featuredImage || '/LandingPage.jpeg',
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${blog.title} | Rahul Sharma`,
        description:
          blog.description ||
          `Read about ${blog.title} - Technical article by Rahul Sharma`,
        images: [blog.featuredImage || '/LandingPage.jpeg'],
      },
      alternates: {
        canonical: `https://www.holdmypotion.tech/blog/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.description || `Technical article about ${blog.title}`,
    image: blog.featuredImage || '/LandingPage.jpeg',
    author: {
      '@type': 'Person',
      name: 'Rahul Sharma',
      url: 'https://www.holdmypotion.tech',
    },
    publisher: {
      '@type': 'Person',
      name: 'Rahul Sharma',
    },
    datePublished: blog.date,
    dateModified: blog.date,
    keywords: blog.tags?.join(', ') || '',
    url: `https://www.holdmypotion.tech/blog/${slug}`,
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
              <div className='flex items-center space-x-1'>
                <span className='text-[10px]'>📅</span>
                <time dateTime={blog.date}>{blog.date}</time>
              </div>
              <span>•</span>
              <div className='flex items-center space-x-1'>
                <span className='text-[10px]'>🔖</span>
                <span>{blog.tags ? blog.tags.join(', ') : ''}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {blog.featuredImage && (
            <div className='mb-8'>
              <BlogImage
                src={blog.featuredImage}
                alt={`Featured image for ${blog.title}`}
                width={1200}
                height={630}
              />
            </div>
          )}

          <CodeHighlighter>
            <div
              className='prose prose-custom text-sm leading-relaxed max-w-none'
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </CodeHighlighter>
        </article>
        <Contact />
      </div>
    </>
  );
}

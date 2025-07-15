import Link from 'next/link';

export default function BlogCard({ blog }) {
  const handleBlogClick = () => {
    // Track blog post engagement with GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'blog_post_click', {
        blog_title: blog.title,
        blog_slug: blog.slug,
        blog_tags: blog.tags ? blog.tags.join(', ') : '',
        event_category: 'engagement',
        event_label: blog.title,
      });
    }
  };
  return (
    <div className='py-4 border-b border-custom-border'>
      <div className='flex items-start justify-between mb-2'>
        <div className='flex-1'>
          <Link href={`/blog/${blog.slug}`} onClick={handleBlogClick}>
            <h3 className='text-sm font-medium hover:underline cursor-pointer text-custom-soft-white hover:text-custom-bright-fg transition-colors'>
              {blog.title}
            </h3>
          </Link>

          {blog.description && (
            <p className='text-xs text-custom-description mt-2 mb-3 line-clamp-2'>
              {blog.description}
            </p>
          )}

          <div className='flex items-center space-x-2 mt-3'>
            <div className='flex items-center space-x-1'>
              <span className='text-[10px]'>📅</span>
              <span className='text-xs text-custom-comment'>{blog.date}</span>
            </div>
            <span className='text-xs text-custom-comment'>•</span>
            <div className='flex items-center space-x-1'>
              <span className='text-[10px]'>🔖</span>
              <span className='text-xs text-custom-comment'>
                {blog.tags ? blog.tags.join(', ') : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <div className='py-3 border-b border-custom-border'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <Link href={`/blog/${blog.slug}`}>
            <h3 className='text-sm font-medium hover:underline cursor-pointer text-custom-soft-white hover:text-custom-bright-fg transition-colors'>
              {blog.title}
            </h3>
          </Link>

          {blog.description && (
            <p className='text-xs text-custom-description mt-2 line-clamp-2'>
              {blog.description}
            </p>
          )}

          <div className='flex items-center space-x-2 mt-2'>
            <span className='text-xs text-custom-comment'>{blog.date}</span>
            <span className='text-xs text-custom-comment'>•</span>
            <span className='text-xs text-custom-comment'>
              {blog.tags ? blog.tags.join(', ') : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

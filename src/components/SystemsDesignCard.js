import Link from 'next/link';

export default function SystemsDesignCard({ diagram }) {
  return (
    <div className='py-3 border-b border-custom-border'>
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <Link href={`/systems-design/${diagram.slug}`}>
            <h3 className='text-sm font-medium hover:underline cursor-pointer text-custom-soft-white hover:text-custom-bright-fg transition-colors'>
              {diagram.title}
            </h3>
          </Link>

          {diagram.description && (
            <p className='text-xs text-custom-description mt-2 line-clamp-2'>
              {diagram.description}
            </p>
          )}

          <div className='flex items-center space-x-2 mt-2'>
            <span className='text-xs text-custom-comment'>{diagram.date}</span>
            {diagram.tags && diagram.tags.length > 0 && (
              <>
                <span className='text-xs text-custom-comment'>•</span>
                <span className='text-xs text-custom-comment'>
                  {diagram.tags.join(', ')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

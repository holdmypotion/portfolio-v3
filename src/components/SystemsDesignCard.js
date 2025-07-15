import Link from 'next/link';

export default function SystemsDesignCard({ diagram }) {
  const handleDiagramClick = () => {
    // Track systems design diagram engagement with GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'systems_design_click', {
        diagram_title: diagram.title,
        diagram_slug: diagram.slug,
        diagram_tags: diagram.tags ? diagram.tags.join(', ') : '',
        event_category: 'engagement',
        event_label: diagram.title,
      });
    }
  };
  return (
    <div className='py-4 border-b border-custom-border'>
      <div className='flex items-start justify-between mb-2'>
        <div className='flex-1'>
          <Link
            href={`/systems-design/${diagram.slug}`}
            onClick={handleDiagramClick}
          >
            <h3 className='text-sm font-medium hover:underline cursor-pointer text-custom-soft-white hover:text-custom-bright-fg transition-colors'>
              {diagram.title}
            </h3>
          </Link>

          {diagram.description && (
            <p className='text-xs text-custom-description mt-2 mb-3 line-clamp-2'>
              {diagram.description}
            </p>
          )}

          <div className='flex items-center space-x-2 mt-3'>
            <div className='flex items-center space-x-1'>
              <span className='text-[10px]'>📅</span>
              <span className='text-xs text-custom-comment'>
                {diagram.date}
              </span>
            </div>
            {diagram.tags && diagram.tags.length > 0 && (
              <>
                <span className='text-xs text-custom-comment'>•</span>
                <div className='flex items-center space-x-1'>
                  <span className='text-[10px]'>🔖</span>
                  <span className='text-xs text-custom-comment'>
                    {diagram.tags.join(', ')}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

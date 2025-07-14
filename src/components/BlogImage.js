'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function BlogImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <figure className='my-8'>
        <div className='relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center min-h-[200px]'>
          <div className='text-center text-gray-500'>
            <div className='text-sm'>Image could not be loaded</div>
            <div className='text-xs mt-1'>{alt}</div>
          </div>
        </div>
        {caption && (
          <figcaption className='mt-2 text-sm text-gray-600 text-center italic'>
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className='my-8'>
      <div className='relative overflow-hidden rounded-lg border border-gray-200'>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className='w-full h-auto'
          style={{ objectFit: 'contain' }}
          onError={() => setImageError(true)}
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
        />
      </div>
      {caption && (
        <figcaption className='mt-2 text-sm text-gray-600 text-center italic'>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

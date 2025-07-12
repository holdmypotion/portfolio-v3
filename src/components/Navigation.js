'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navigation() {
  const pathname = usePathname();
  const [profileName, setProfileName] = useState('');

  useEffect(() => {
    // Load profile data to get the display name
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        const displayName = data.name.toLowerCase().replace(' ', '.');
        setProfileName(displayName);
      })
      .catch(() => {
        // Fallback name
        setProfileName('rahul.sharma');
      });
  }, []);

  const isActive = (path) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header className='border-b border-custom-border bg-custom-dark-bg'>
      <div className='max-w-4xl mx-auto p-4'>
        <div className='flex items-center justify-between mb-2'>
          <h1 className='text-lg font-normal'>
            <Link href='/' className='text-custom-bright-fg'>
              {profileName || 'rahul.sharma'}
            </Link>
          </h1>
          <ThemeSwitcher />
        </div>
        <nav className='space-x-6'>
          <Link
            href='/'
            className={`text-sm ${
              isActive('/') && pathname === '/'
                ? 'text-custom-bright-fg'
                : 'text-custom-soft-white hover:text-custom-fg'
            }`}
          >
            home <span className='text-custom-comment'>(h)</span>
          </Link>
          <Link
            href='/resume'
            className={`text-sm ${
              isActive('/resume')
                ? 'text-custom-bright-fg'
                : 'text-custom-soft-white hover:text-custom-fg'
            }`}
          >
            resume <span className='text-custom-comment'>(r)</span>
          </Link>
          <Link
            href='/blog'
            className={`text-sm ${
              isActive('/blog')
                ? 'text-custom-bright-fg'
                : 'text-custom-soft-white hover:text-custom-fg'
            }`}
          >
            blog <span className='text-custom-comment'>(b)</span>
          </Link>
          <Link
            href='/projects'
            className={`text-sm ${
              isActive('/projects')
                ? 'text-custom-bright-fg'
                : 'text-custom-soft-white hover:text-custom-fg'
            }`}
          >
            projects <span className='text-custom-comment'>(p)</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch(() => {
        // Fallback contact data
        setProfile({
          contact: {
            email: 'holdmypotion@gmail.com',
            github: 'https://github.com/holdmypotion',
            linkedin: 'https://linkedin.com/in/holdmypotion',
          },
        });
      });
  }, []);

  if (!profile) {
    return null; // Don't render until data is loaded
  }

  return (
    <section className='py-4 mt-8'>
      <h3 className='text-lg mb-3 text-custom-fg'>Contact</h3>
      <div className='space-y-1 text-sm'>
        <div>
          <span className='text-custom-fg'>email:</span>{' '}
          <span className='text-custom-soft-white'>
            {profile.contact.email}
          </span>
        </div>
        <div>
          <span className='text-custom-fg'>github:</span>{' '}
          <a
            href={profile.contact.github}
            className='underline text-custom-func hover:text-custom-bright-fg transition-colors'
            target='_blank'
            rel='noopener noreferrer'
          >
            {profile.contact.github.replace('https://', '')}
          </a>
        </div>
        <div>
          <span className='text-custom-fg'>linkedin:</span>{' '}
          <a
            href={profile.contact.linkedin}
            className='underline text-custom-func hover:text-custom-bright-fg transition-colors'
            target='_blank'
            rel='noopener noreferrer'
          >
            {profile.contact.linkedin.replace('https://', '')}
          </a>
        </div>
      </div>
    </section>
  );
}

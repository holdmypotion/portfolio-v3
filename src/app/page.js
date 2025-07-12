import fs from 'fs';
import path from 'path';
import Contact from '@/components/Contact';

export default function HomePage() {
  // Read profile data from config
  let profile;
  try {
    const profilePath = path.join(process.cwd(), 'content/config/profile.json');
    const profileData = fs.readFileSync(profilePath, 'utf8');
    profile = JSON.parse(profileData);
  } catch (error) {
    console.error('Error loading profile data:', error);
    // Fallback profile data
    profile = {
      name: 'Rahul Sharma',
      title: 'Full Stack Developer',
      description:
        'I build scalable web applications and APIs. Experienced in React, Node.js, and modern web technologies.',
      skills: {
        languages: ['JavaScript', 'TypeScript', 'Python'],
        frameworks: ['React', 'Next.js', 'Node.js'],
        databases: ['PostgreSQL', 'MongoDB'],
        tools: ['Git', 'Docker', 'VS Code'],
      },
      contact: {
        email: 'rahul@example.com',
        github: 'https://github.com/rahulsharma',
        linkedin: 'https://linkedin.com/in/rahulsharma',
      },
    };
  }

  return (
    <div className='py-8'>
      <section className='pb-4'>
        <h2 className='text-2xl mb-4 text-custom-bright-fg'>{profile.title}</h2>
        <p className='text-custom-soft-white max-w-2xl'>
          {profile.description}
        </p>
      </section>

      <section className='py-4'>
        <h3 className='text-lg mb-3 text-custom-fg'>Skills</h3>
        <div className='space-y-2 text-sm'>
          <div>
            <strong className='text-custom-fg'>Languages:</strong>{' '}
            <span className='text-custom-soft-white'>
              {profile.skills.languages.join(', ')}
            </span>
          </div>
          {profile.skills.frameworks && (
            <div>
              <strong className='text-custom-fg'>Frameworks:</strong>{' '}
              <span className='text-custom-soft-white'>
                {profile.skills.frameworks.join(', ')}
              </span>
            </div>
          )}
          <div>
            <strong className='text-custom-fg'>Databases:</strong>{' '}
            <span className='text-custom-soft-white'>
              {profile.skills.databases.join(', ')}
            </span>
          </div>
          {profile.skills.infrastructure && (
            <div>
              <strong className='text-custom-fg'>Infrastructure:</strong>{' '}
              <span className='text-custom-soft-white'>
                {profile.skills.infrastructure.join(', ')}
              </span>
            </div>
          )}
          <div>
            <strong className='text-custom-fg'>Tools:</strong>{' '}
            <span className='text-custom-soft-white'>
              {profile.skills.tools.join(', ')}
            </span>
          </div>
        </div>
      </section>

      {profile.experience && (
        <section className='py-4'>
          <h3 className='text-lg mb-4 text-custom-fg'>Experience</h3>
          <div className='space-y-4'>
            {profile.experience.map((exp, index) => (
              <div
                key={index}
                className='pb-4 border-b border-custom-border last:border-b-0'
              >
                <div className='flex justify-between items-start mb-2'>
                  <div>
                    <h4 className='font-medium text-base text-custom-bright-fg'>
                      {exp.role}
                    </h4>
                    <p className='text-sm text-custom-func'>{exp.company}</p>
                  </div>
                  <span className='text-sm text-custom-comment'>
                    {exp.period}
                  </span>
                </div>
                <ul className='text-sm text-custom-soft-white space-y-1 ml-4'>
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className='list-disc'>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      <Contact />
    </div>
  );
}

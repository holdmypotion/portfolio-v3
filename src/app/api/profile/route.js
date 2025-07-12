import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const profilePath = path.join(process.cwd(), 'content/config/profile.json');
    const profileData = fs.readFileSync(profilePath, 'utf8');
    const profile = JSON.parse(profileData);

    return NextResponse.json(profile);
  } catch (error) {
    // Fallback profile data
    const fallbackProfile = {
      name: 'Rahul Sharma',
      title: 'Full Stack Developer',
      description: 'I build scalable web applications and APIs.',
      experience: [
        {
          company: 'TechCorp',
          role: 'Senior Software Engineer',
          period: '2023 - Present',
          highlights: [
            'Led development of microservices architecture',
            'Implemented CI/CD pipelines',
            'Mentored junior developers',
          ],
        },
      ],
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

    return NextResponse.json(fallbackProfile);
  }
}

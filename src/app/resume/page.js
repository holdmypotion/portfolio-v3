import { getAllResumes } from '@/lib/resumes';
import ResumeCard from '@/components/ResumeCard';
import Contact from '@/components/Contact';

export default function ResumePage() {
  let resumes;
  try {
    resumes = getAllResumes();
  } catch (error) {
    // Fallback resume data
    resumes = [
      {
        version: 'v2024.1',
        date: '2024-01-15',
        latest: true,
        filename: 'resume-v2024.1.pdf',
        changes: 'Added Docker and Kubernetes experience',
      },
      {
        version: 'v2023.4',
        date: '2023-12-08',
        latest: false,
        filename: 'resume-v2023.4.pdf',
        changes: 'Updated with recent Node.js projects',
      },
      {
        version: 'v2023.3',
        date: '2023-09-22',
        latest: false,
        filename: 'resume-v2023.3.pdf',
        changes: 'Added backend project highlights',
      },
    ];
  }

  return (
    <div className='py-8'>
      <h1 className='text-2xl mb-6 text-custom-bright-fg'>resume</h1>
      <div className='space-y-2 pb-8' role='list' aria-label='Resume versions'>
        {resumes.map((resume, index) => (
          <ResumeCard key={index} resume={resume} />
        ))}
      </div>
      <Contact />
    </div>
  );
}

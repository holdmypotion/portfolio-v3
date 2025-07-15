'use client';

export default function ResumeCard({ resume }) {
  const handleDownload = () => {
    // Track resume download event with GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resume_download', {
        file_name: resume.filename,
        file_extension: 'pdf',
        resume_version: resume.version,
        event_category: 'engagement',
        event_label: resume.version,
      });
    }

    window.open(`/resumes/${resume.filename}`, '_blank');
  };

  return (
    <div className='flex items-center justify-between py-2 border-b border-custom-border'>
      <div className='flex items-center space-x-4'>
        <span className='text-sm font-medium'>{resume.version}</span>
        <span className='text-xs text-gray-600'>{resume.date}</span>
        {resume.latest && (
          <span className='text-xs bg-black text-white px-2 py-1'>latest</span>
        )}
        {resume.changes && (
          <span className='text-xs text-gray-500'>{resume.changes}</span>
        )}
      </div>
      <button
        onClick={handleDownload}
        className='text-sm underline hover:no-underline'
      >
        download
      </button>
    </div>
  );
}

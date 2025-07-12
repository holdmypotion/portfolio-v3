'use client';

export default function ResumeCard({ resume }) {
  const handleDownload = () => {
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

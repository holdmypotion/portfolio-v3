export const metadata = {
  title: 'Resume',
  description:
    'Professional resume and CV of Rahul Sharma, Software Development Engineer with experience in Python, AI, cloud infrastructure, and full-stack development.',
  keywords: [
    'Resume',
    'CV',
    'Software Engineer Resume',
    'Python Developer',
    'AI Engineer',
    'Full Stack Developer',
    'DevOps Engineer',
    'Career',
    'Professional Experience',
  ],
  openGraph: {
    title: 'Resume | Rahul Sharma',
    description:
      'Professional resume and CV of Rahul Sharma, Software Development Engineer with experience in Python, AI, and cloud infrastructure.',
    type: 'profile',
    images: [
      {
        url: '/LandingPage.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rahul Sharma Resume',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume | Rahul Sharma',
    description:
      'Professional resume and CV of Rahul Sharma, Software Development Engineer with experience in Python, AI, and cloud infrastructure.',
    images: ['/LandingPage.jpeg'],
  },
  alternates: {
    canonical: 'https://www.holdmypotion.com/resume',
  },
};

export default function ResumeLayout({ children }) {
  return children;
}

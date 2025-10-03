export const metadata = {
  title: 'Projects',
  description:
    'Showcase of software projects including AI-powered applications, web development, and infrastructure solutions by Rahul Sharma.',
  keywords: [
    'Software Projects',
    'AI Applications',
    'Web Development',
    'React Projects',
    'Python Projects',
    'Full Stack Development',
    'Portfolio',
    'GitHub Projects',
    'Open Source',
  ],
  openGraph: {
    title: 'Projects | Rahul Sharma',
    description:
      'Showcase of software projects including AI-powered applications, web development, and infrastructure solutions.',
    type: 'website',
    images: [
      {
        url: '/LandingPage.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rahul Sharma Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects | Rahul Sharma',
    description:
      'Showcase of software projects including AI-powered applications, web development, and infrastructure solutions.',
    images: ['/LandingPage.jpeg'],
  },
  alternates: {
    canonical: 'https://www.holdmypotion.com/projects',
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}

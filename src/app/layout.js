import './globals.css';
import Navigation from '@/components/Navigation';
import KeyboardNavigation from '@/components/KeyboardNavigation';
import { ThemeProvider } from '@/components/ThemeContext';

export const metadata = {
  metadataBase: new URL('https://www.holdmypotion.tech/'),
  title: {
    default: 'Rahul Sharma - Software Engineer',
    template: '%s | Rahul Sharma',
  },
  description:
    'Software Development Engineer with expertise in building scalable, AI-driven solutions and optimizing cloud infrastructure. Experienced in Python, Ruby, TypeScript, and modern web technologies.',
  keywords: [
    'Software Engineer',
    'Full Stack Developer',
    'Python Developer',
    'React Developer',
    'AI Engineering',
    'Cloud Infrastructure',
    'DevOps',
    'Backend Development',
    'Rahul Sharma',
    'Software Development',
  ],
  authors: [{ name: 'Rahul Sharma' }],
  creator: 'Rahul Sharma',
  publisher: 'Rahul Sharma',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.holdmypotion.tech',
    title: 'Rahul Sharma - Software Engineer',
    description:
      'Software Development Engineer with expertise in building scalable, AI-driven solutions and optimizing cloud infrastructure.',
    siteName: 'Rahul Sharma Portfolio',
    images: [
      {
        url: '/wallpaper.jpg',
        width: 1200,
        height: 630,
        alt: 'Rahul Sharma - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rahul Sharma - Software Engineer',
    description:
      'Software Development Engineer with expertise in building scalable, AI-driven solutions and optimizing cloud infrastructure.',
    images: ['/wallpaper.jpg'],
    creator: '@holdmypotion', // Replace with actual Twitter handle
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: 'https://www.holdmypotion.tech',
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: 'Rahul Sharma Blog RSS Feed' },
      ],
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rahul Sharma',
    jobTitle: 'Software Development Engineer II',
    description:
      'Software Development Engineer with expertise in building scalable, AI-driven solutions and optimizing cloud infrastructure.',
    url: 'https://www.holdmypotion.tech',
    sameAs: [
      'https://github.com/holdmypotion',
      'https://linkedin.com/in/holdmypotion',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Scaler/Interviewbit',
    },
    knowsAbout: [
      'Software Engineering',
      'Python',
      'Ruby',
      'TypeScript',
      'React',
      'Next.js',
      'AWS',
      'Docker',
      'Machine Learning',
      'AI',
      'DevOps',
      'Cloud Infrastructure',
    ],
    email: 'holdmypotion@gmail.com',
  };

  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='canonical' href='https://www.holdmypotion.tech' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('portfolio-theme');
                  if (theme && (theme === 'light' || theme === 'dark')) {
                    document.documentElement.setAttribute('data-theme', theme);
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    var systemTheme = prefersDark ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', systemTheme);
                    localStorage.setItem('portfolio-theme', systemTheme);
                  }
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className='min-h-screen bg-custom-bg text-custom-fg font-mono'>
        <ThemeProvider>
          <KeyboardNavigation />
          <Navigation />
          <main className='max-w-4xl mx-auto p-4'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

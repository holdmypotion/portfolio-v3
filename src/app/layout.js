import './globals.css';
import Navigation from '@/components/Navigation';
import KeyboardNavigation from '@/components/KeyboardNavigation';
import { ThemeProvider } from '@/components/ThemeContext';
import { GoogleAnalytics } from '@next/third-parties/google';
import fs from 'fs';
import path from 'path';

let profile;
try {
  const profilePath = path.join(process.cwd(), 'content/config/profile.json');
  const profileData = fs.readFileSync(profilePath, 'utf8');
  profile = JSON.parse(profileData);
} catch (error) {
  profile = {
    name: 'Rahul Sharma',
    title: 'Software Engineer',
    description:
      'Software Development Engineer with expertise in building scalable, AI-driven solutions and optimizing cloud infrastructure. Experienced in Python, Ruby, TypeScript, and modern web technologies.',
    contact: {
      email: 'holdmypotion@gmail.com',
      github: 'https://github.com/holdmypotion',
      linkedin: 'https://linkedin.com/in/holdmypotion',
    },
  };
}

export const metadata = {
  metadataBase: new URL('https://www.holdmypotion.com/'),
  title: {
    default: `${profile.name} - ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.description,
  keywords: [
    profile.title,
    'Software Engineer',
    'Full Stack Developer',
    ...((profile.skills && profile.skills.languages) || []),
    ...((profile.skills && profile.skills.frameworks) || []),
    ...((profile.skills && profile.skills.databases) || []),
    ...((profile.skills && profile.skills.tools) || []),
    profile.name,
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
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
    url: 'https://www.holdmypotion.com',
    title: `${profile.name} - ${profile.title}`,
    description: profile.description,
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: '/LandingPage.jpeg',
        width: 1200,
        height: 630,
        alt: `${profile.name} - ${profile.title} Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} - ${profile.title}`,
    description: profile.description,
    images: ['/LandingPage.jpeg'],
    creator: '@holdmypotion', // Replace with actual Twitter handle if available
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: 'https://www.holdmypotion.com',
    types: {
      'application/rss+xml': [
        { url: '/feed.xml', title: `${profile.name} Blog RSS Feed` },
      ],
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.title,
    description: profile.description,
    url: 'https://www.holdmypotion.com',
    sameAs: [profile.contact.github, profile.contact.linkedin],
    email: profile.contact.email,
    worksFor:
      profile.experience && profile.experience[0]
        ? {
            '@type': 'Organization',
            name: profile.experience[0].company,
          }
        : undefined,
    knowsAbout: [
      ...(profile.skills?.languages || []),
      ...(profile.skills?.frameworks || []),
      ...(profile.skills?.databases || []),
      ...(profile.skills?.tools || []),
    ],
  };

  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='canonical' href='https://www.holdmypotion.com' />
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
        {process.env.NODE_ENV === 'production' &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Blog',
  description:
    'Technical articles and insights on software engineering, web development, React, Python, and modern programming practices by Rahul Sharma.',
  keywords: [
    'Technical Blog',
    'Software Engineering',
    'Web Development',
    'React',
    'Python',
    'JavaScript',
    'Programming',
    'Tech Articles',
    'Coding Tutorials',
  ],
  openGraph: {
    title: 'Blog | Rahul Sharma',
    description:
      'Technical articles and insights on software engineering, web development, and modern programming practices.',
    type: 'website',
    images: [
      {
        url: '/LandingPage.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rahul Sharma Blog - Technical Articles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Rahul Sharma',
    description:
      'Technical articles and insights on software engineering, web development, and modern programming practices.',
    images: ['/LandingPage.jpeg'],
  },
  alternates: {
    canonical: 'https://www.holdmypotion.tech/blog',
  },
};

export default function BlogLayout({ children }) {
  return children;
}

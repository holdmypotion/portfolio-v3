export const metadata = {
  title: 'Systems Design',
  description:
    'Interactive system design diagrams and architectural solutions. Explore complex systems through visual representations and detailed breakdowns.',
  keywords: [
    'Systems Design',
    'System Architecture',
    'Excalidraw',
    'Technical Diagrams',
    'Software Architecture',
    'Distributed Systems',
    'Scalability',
    'Engineering Design',
    'Rahul Sharma',
  ],
  openGraph: {
    title: 'Systems Design | Rahul Sharma',
    description:
      'Interactive system design diagrams and architectural solutions. Explore complex systems through visual representations.',
    type: 'website',
    images: [
      {
        url: '/LandingPage.jpeg',
        width: 1200,
        height: 630,
        alt: 'Rahul Sharma Systems Design Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Systems Design | Rahul Sharma',
    description:
      'Interactive system design diagrams and architectural solutions. Explore complex systems through visual representations.',
    images: ['/LandingPage.jpeg'],
  },
  alternates: {
    canonical: 'https://www.holdmypotion.com/systems-design',
  },
};

export default function SystemsDesignLayout({ children }) {
  return children;
}

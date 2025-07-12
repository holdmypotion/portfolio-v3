import './globals.css';
import Navigation from '@/components/Navigation';
import KeyboardNavigation from '@/components/KeyboardNavigation';
import { ThemeProvider } from '@/components/ThemeContext';

export const metadata = {
  title: 'Rahul Sharma - Software Engineer',
  description:
    'Software Development Engineer with a passion for building scalable, AI-driven solutions and optimizing cloud infrastructure. With a strong foundation in both software development and DevOps practices',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
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

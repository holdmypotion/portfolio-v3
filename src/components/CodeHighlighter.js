'use client';

import { useEffect } from 'react';

export default function CodeHighlighter({ children }) {
  useEffect(() => {
    const loadPrismAndHighlight = async () => {
      try {
        // Import Prism.js and its components
        const Prism = (await import('prismjs')).default;

        // Import commonly used languages
        await import('prismjs/components/prism-javascript');
        await import('prismjs/components/prism-typescript');
        await import('prismjs/components/prism-jsx');
        await import('prismjs/components/prism-tsx');
        await import('prismjs/components/prism-python');
        await import('prismjs/components/prism-css');
        await import('prismjs/components/prism-scss');
        await import('prismjs/components/prism-bash');
        await import('prismjs/components/prism-json');
        await import('prismjs/components/prism-sql');
        await import('prismjs/components/prism-yaml');
        await import('prismjs/components/prism-markdown');
        await import('prismjs/components/prism-go');
        await import('prismjs/components/prism-ruby');

        // Find all code blocks and add proper language classes
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach((codeBlock) => {
          const pre = codeBlock.parentElement;

          // Try to detect language from various sources
          let language = null;

          // Check if there's already a language class
          const existingLangClass = Array.from(codeBlock.classList).find(
            (cls) => cls.startsWith('language-'),
          );
          if (existingLangClass) {
            language = existingLangClass.replace('language-', '');
          } else {
            // Try to detect from content or guess from context
            const code = codeBlock.textContent || '';
            if (
              code.includes('function') ||
              code.includes('const') ||
              code.includes('let')
            ) {
              language = 'javascript';
            } else if (
              code.includes('class=') ||
              code.includes('<div') ||
              code.includes('</div>')
            ) {
              language = 'html';
            } else if (
              code.includes('font-size:') ||
              code.includes('color:') ||
              code.includes('{')
            ) {
              language = 'css';
            } else if (
              code.includes('npm') ||
              code.includes('yarn') ||
              code.includes('git')
            ) {
              language = 'bash';
            }
          }

          if (language) {
            codeBlock.className = `language-${language}`;
            if (pre) {
              pre.className = `language-${language}`;
            }
          }
        });

        // Highlight all code blocks
        Prism.highlightAll();
      } catch (error) {
        console.error('Error loading Prism.js:', error);
      }
    };

    // Use setTimeout to ensure DOM is ready
    setTimeout(loadPrismAndHighlight, 100);
  }, [children]);

  return <>{children}</>;
}

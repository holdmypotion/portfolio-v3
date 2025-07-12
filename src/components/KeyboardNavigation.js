'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function KeyboardNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger shortcuts if user is typing in an input field
      const activeElement = document.activeElement;
      const isInputFocused =
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true';

      // Handle blog search with '/' - this should work even when not in input
      if (event.key === '/' && pathname.startsWith('/blog')) {
        event.preventDefault();
        const searchInput = document.querySelector('#blog-search');
        if (searchInput) {
          searchInput.focus();
        }
        return;
      }

      // Skip other shortcuts if user is typing
      if (isInputFocused) return;

      // Skip shortcuts if any modifier keys are pressed (CMD, Ctrl, Alt, Shift)
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey)
        return;

      // Handle navigation shortcuts
      switch (event.key.toLowerCase()) {
        case 'h':
          event.preventDefault();
          router.push('/');
          break;
        case 'r':
          event.preventDefault();
          router.push('/resume');
          break;
        case 'b':
          event.preventDefault();
          router.push('/blog');
          break;
        case 'p':
          event.preventDefault();
          router.push('/projects');
          break;
        case 'escape':
          // Clear focus from any input field
          if (isInputFocused) {
            activeElement.blur();
          }
          break;
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, pathname]);

  return null; // This component doesn't render anything
}

'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';
import { useTheme } from './ThemeContext';

const ExcalidrawWrapper = ({ initialData, isFullscreen = false }) => {
  const [Excalidraw, setExcalidraw] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    import('@excalidraw/excalidraw').then((module) => {
      setExcalidraw(() => module.Excalidraw);
    });
  }, []);

  if (!Excalidraw) {
    return (
      <div
        className={`flex items-center justify-center ${
          isFullscreen ? 'h-[80vh]' : 'h-[500px]'
        } bg-custom-dark-bg border border-custom-border rounded`}
      >
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-custom-fg mx-auto mb-4'></div>
          <p className='text-custom-comment text-sm'>Loading Excalidraw...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: isFullscreen ? '80vh' : '500px', width: '100%' }}>
      <Excalidraw
        initialData={initialData}
        viewModeEnabled={true}
        zenModeEnabled={false}
        theme={theme}
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            toggleTheme: false,
            changeViewBackgroundColor: false,
          },
          tools: {
            image: false,
          },
        }}
      />
    </div>
  );
};

const DynamicExcalidrawWrapper = dynamic(
  async () => Promise.resolve(ExcalidrawWrapper),
  {
    ssr: false,
  },
);

const DiagramModal = ({ isOpen, onClose, diagramData, title }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black bg-opacity-75'
        onClick={onClose}
      />

      <div
        className={`relative w-[95vw] h-[90vh] max-w-7xl ${
          theme === 'dark' ? 'bg-custom-dark-bg' : 'bg-white'
        } rounded-lg shadow-2xl overflow-hidden`}
      >
        <div className='flex items-center justify-between p-4 border-b border-gray-200 bg-custom-dark-bg'>
          <h2 className='text-lg font-medium text-custom-bright-fg truncate'>
            {title}
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-custom-border rounded-full transition-colors'
            aria-label='Close modal'
          >
            <svg
              className='w-5 h-5 text-custom-fg'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <div
          className={`w-full h-full ${
            theme === 'dark' ? 'bg-custom-dark-bg' : 'bg-white'
          }`}
        >
          <DynamicExcalidrawWrapper
            initialData={diagramData}
            isFullscreen={true}
          />
        </div>
      </div>
    </div>
  );
};

export default function ExcalidrawViewer({ excalidrawData, title }) {
  const [diagramData, setDiagramData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const loadAndProcessData = async () => {
      try {
        if (!excalidrawData) {
          throw new Error('No diagram data provided');
        }

        let parsedData;
        try {
          parsedData = JSON.parse(excalidrawData);
        } catch (parseError) {
          throw new Error(
            `Failed to parse diagram data: ${parseError.message}`,
          );
        }

        if (!parsedData || typeof parsedData !== 'object') {
          throw new Error('Invalid diagram data structure');
        }

        const elements = parsedData.elements || [];

        const appState = {
          viewModeEnabled: true,
          zenModeEnabled: false,
          gridSize: null,
          scrollX: 0,
          scrollY: 0,
          zoom: {
            value: 1,
          },
          ...parsedData.appState,
          viewModeEnabled: true,
          zenModeEnabled: false,
        };

        const finalData = {
          elements,
          appState,
          scrollToContent: true,
        };

        setDiagramData(finalData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Excalidraw:', err);
        setError(`Failed to load diagram: ${err.message}`);
        setIsLoading(false);
      }
    };

    loadAndProcessData();
  }, [excalidrawData, theme]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-[500px] bg-custom-dark-bg border border-custom-border rounded'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-custom-fg mx-auto mb-4'></div>
          <p className='text-custom-comment text-sm'>Loading diagram...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-[500px] bg-custom-dark-bg border border-custom-border rounded'>
        <div className='text-center'>
          <div className='text-custom-comment text-xl mb-2'>⚠️</div>
          <h3 className='text-custom-bright-fg font-medium mb-2 text-sm'>
            Unable to load diagram
          </h3>
          <p className='text-custom-comment text-xs max-w-md'>{error}</p>
          <p className='text-custom-comment text-xs mt-2'>
            Check browser console for more details
          </p>
        </div>
      </div>
    );
  }

  if (!diagramData || !diagramData.elements.length) {
    return (
      <div className='flex items-center justify-center h-[500px] bg-custom-dark-bg border border-custom-border rounded'>
        <div className='text-center'>
          <div className='text-custom-comment text-xl mb-2'>⚠️</div>
          <h3 className='text-custom-bright-fg font-medium mb-2 text-sm'>
            No diagram elements
          </h3>
          <p className='text-custom-comment text-xs'>
            {diagramData
              ? `Data loaded but no elements found`
              : 'Diagram data not ready'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`relative w-full h-[500px] border border-custom-border rounded overflow-hidden ${
          theme === 'dark' ? 'bg-custom-dark-bg' : 'bg-white'
        } group`}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className={`absolute top-4 right-4 z-10 p-2 ${
            theme === 'dark'
              ? 'bg-custom-dark-bg bg-opacity-90 hover:bg-opacity-100 border border-custom-border text-custom-fg'
              : 'bg-white bg-opacity-90 hover:bg-opacity-100 border border-gray-300 text-gray-600'
          } rounded-lg shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100`}
          aria-label='Open diagram in fullscreen'
          title='Open in fullscreen'
        >
          <svg
            className='w-5 h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4'
            />
          </svg>
        </button>

        <DynamicExcalidrawWrapper initialData={diagramData} />
      </div>

      <DiagramModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        diagramData={diagramData}
        title={title}
      />
    </>
  );
}

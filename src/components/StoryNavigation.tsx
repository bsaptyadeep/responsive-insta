import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface StoryPage {
  imageUrl: string;
  text: string;
  audioUrl: string;
}

interface StoryProps {
  title?: string;
  pages?: StoryPage[];
  onClose: () => void;
}

// Dummy story data
const dummyStories: StoryPage[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1729424004701-cac6289119a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Welcome to our first story! This is an example of how you can create engaging, Instagram-style stories using React and TypeScript.",
    audioUrl: "https://example.com/audio1.mp3"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1729424004701-cac6289119a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "For the second page, we're showcasing a different image aspect ratio. Notice how the layout adapts to different content sizes and orientations.",
    audioUrl: "https://example.com/audio2.mp3"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1729432535925-99da7bd2e2be?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "On this third page, we're demonstrating how you can include longer text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.",
    audioUrl: "https://example.com/audio3.mp3"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1729432535925-99da7bd2e2be?q=80&w=1901&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "This is our final story page. We hope you enjoyed this demo of the Instagram-style story navigation component!",
    audioUrl: "https://example.com/audio4.mp3"
  }
];

const StoryNavigation: React.FC<StoryProps> = ({ title = "Demo Story", pages = dummyStories, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onClose();
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current && pages.length > 0) {
      audioRef.current.src = pages[currentPage].audioUrl;
      setIsPlaying(false);
    }
  }, [currentPage, pages]);

  const getRandomLayout = () => {
    const layouts = ['image-top', 'text-top', 'image-left', 'image-right'];
    return layouts[Math.floor(Math.random() * layouts.length)];
  };

  const layout = getRandomLayout();

  if (pages.length === 0) {
    return (
      <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center">
        <p>No story pages available.</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-white text-black rounded">
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-300 ease-linear"
          style={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
        ></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} className="text-white">
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center p-4">
        <div className={`w-full max-w-md ${layout === 'image-top' || layout === 'text-top' ? 'flex flex-col' : 'flex'}`}>
          {layout === 'image-top' && (
            <>
              <img src={pages[currentPage].imageUrl} alt="Story" className="w-full h-64 object-cover mb-4" />
              <p className="text-sm">{pages[currentPage].text}</p>
            </>
          )}
          {layout === 'text-top' && (
            <>
              <p className="text-sm mb-4">{pages[currentPage].text}</p>
              <img src={pages[currentPage].imageUrl} alt="Story" className="w-full h-64 object-cover" />
            </>
          )}
          {layout === 'image-left' && (
            <>
              <img src={pages[currentPage].imageUrl} alt="Story" className="w-1/2 h-64 object-cover mr-4" />
              <p className="text-sm w-1/2">{pages[currentPage].text}</p>
            </>
          )}
          {layout === 'image-right' && (
            <>
              <p className="text-sm w-1/2 mr-4">{pages[currentPage].text}</p>
              <img src={pages[currentPage].imageUrl} alt="Story" className="w-1/2 h-64 object-cover" />
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button onClick={goToPrevPage} className="text-white p-2" disabled={currentPage === 0}>
          <ChevronLeft size={24} />
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button onClick={goToNextPage} className="text-white p-2">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Audio control */}
      <div className="absolute bottom-4 right-4">
        <button onClick={toggleAudio} className="text-white p-2">
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default StoryNavigation;
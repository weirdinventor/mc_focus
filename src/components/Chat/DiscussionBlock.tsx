import React, { useState, useEffect } from 'react';
import { I18nKeyPath } from './../../../src/i18n/types';

interface DiscussionBlockProps {
  title: I18nKeyPath;
  image: string; // Changed to string for web (URL or path)
  onPress: () => void;
}

export const DiscussionBlock: React.FC<DiscussionBlockProps> = ({
  title,
  image,
  onPress,
}) => {
  const [boxHeight, setBoxHeight] = useState(0);

  // Calculate width based on window size
  const getContainerWidth = () => window.innerWidth - 108;

  // Update box height when component mounts or window resizes
  useEffect(() => {
    const updateHeight = () => {
      setBoxHeight(getContainerWidth() * 0.45);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}
    >
      <button
        onClick={onPress}
        className="w-full flex justify-end p-4"
        style={{ height: boxHeight }}
        onMouseEnter={(e) => {
          const width = e.currentTarget.offsetWidth;
          setBoxHeight(width * 0.45);
        }}
      >
        <div className="flex justify-between">
          <div className="pr-2.5 text-white text-lg font-bold line-clamp-2">
            {title}
          </div>
        </div>
      </button>
    </div>
  );
};
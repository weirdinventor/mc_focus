 import React, { useState, JSX } from 'react';
import { Colors } from './../constants/Colors';

interface CustomImageProps {
  source: string;
  height: number | `${number}%`;
  width?: number | `${number}%`;
  resizeMode?: 'contain' | 'cover';
  style?: React.CSSProperties;
}

/**
 * Image component with skeleton loader
 * @param source pass string uri for remote images
 * @example
 * source={"example.com"}
 */
export const CImage = ({
  source,
  height,
  width = '100%',
  resizeMode = 'cover',
  style,
}: CustomImageProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      style={{
        alignSelf: 'center',
        overflow: 'hidden',
        width,
        height,
        ...style,
      }}
    >
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: Colors.grey1,
            borderRadius: '8px',
            animation: 'pulse 2s infinite',
          }}
        />
      )}
      <img
        src={source}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: resizeMode,
        }}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

// CSS for the pulsing animation
const styles = `
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
`;

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
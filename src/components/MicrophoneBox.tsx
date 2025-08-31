// /components/MicrophoneBox.js

import React from 'react';

// --- Mock de constantes ---
const Colors = {
  grey5: '#aaaaaa',
  grey1: '#f0f0f0',
};

// --- Icônes SVG ---
const MicOnIcon: React.FC<{ size: number; color?: string }> = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);
const MicOffIcon: React.FC<{ size: number; color?: string }> = ({ size, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="1" y1="1" x2="23" y2="23"></line>
    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
    <line x1="12" y1="19" x2="12" y2="23"></line>
    <line x1="8" y1="23" x2="16" y2="23"></line>
  </svg>
);

// --- Styles CSS ---
const componentStyles = `
  .mic-icon-container {
    align-self: flex-end;
    display: flex; /* Remplace justifyContent/alignItems */
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  }
`;

// --- Interface et Composant ---
interface MicrophoneBoxProps {
  size: number;
  iconSize: number;
  isMuted: boolean;
  iconColor?: string;
  backgroundColor?: string;
}

export const MicrophoneBox = ({
  size,
  iconSize,
  isMuted,
  iconColor = Colors.grey5,
  backgroundColor = Colors.grey1,
}: MicrophoneBoxProps) => {
  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    backgroundColor,
  };

  return (
    <>
      <style>{componentStyles}</style>
      <div className="mic-icon-container" style={containerStyle}>
        {isMuted ? (
          <MicOffIcon size={iconSize} color={iconColor} />
        ) : (
          <MicOnIcon size={iconSize} color={iconColor} />
        )}
      </div>
    </>
  );
};
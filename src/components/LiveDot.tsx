import { Colors } from '../constants/Colors';
import React from 'react';

interface LiveDotProps {
  dotColor?: string;
}

export const LiveDot = ({ dotColor = Colors.seance400 }: LiveDotProps) => {
  // We combine the base style with the dynamic color prop
  const combinedStyle = {
    ...styles.container,
    backgroundColor: dotColor,
  };
  
  return <div style={combinedStyle} />;
};

// Styles are defined as a plain JavaScript object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: 5,
    height: 5,
    borderRadius: 10,
  },
};

import React from 'react';
import ImageAssets from '../../assets/images';
import { CImage } from '../CImage'; // Assuming CImage renders a web <img> tag

// Define the type for our style objects
type Styles = {
  [key: string]: React.CSSProperties;
};

interface SingleAvatarProps {
  // Prop to allow custom image source
  source?: string;
}

export const SingleAvatar: React.FC<SingleAvatarProps> = ({ source = ImageAssets.APP_ICON }) => {
  return (
    // View is replaced with div
    <div style={styles.container}>
      {/* CImage should be a component that renders an <img> tag */}
      <CImage height={'100%'} source={source} />
    </div>
  );
};

// Styles are now plain JavaScript objects
const styles: Styles = {
  container: {
    width: 26,
    height: 26,
    borderRadius: '50%', // Use '50%' for a perfect circle
    border: '2px solid #FFFFFF', // Assuming Colors.white is a hex code
    overflow: 'hidden',
    marginLeft: -6, // Creates the overlap effect for each avatar
    boxSizing: 'border-box',
  },
};
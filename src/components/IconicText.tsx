import { Colors } from '../constants/Colors';
import React from 'react';
import { I18nKeyPath, TextOptions } from '../../src/i18n/types';
import { CText, TextColors } from './CText';
// Import an icon to use as an example
import { MdStar } from 'react-icons/md'; 

// Simplified props for web, as the icon component is imported directly
interface IconicTextProps {
  text: I18nKeyPath;
  textOptions?: TextOptions;
  textColor?: TextColors;
  
  iconName: string; // Used to decide which icon to render
  iconSize?: number;
  iconColor?: string;
}

 
export const IconicText = ({
  text,
  textOptions,
  textColor = 'grey5',
  iconName,
  iconSize = 24,
  iconColor = Colors.seance600,
}: IconicTextProps) => {
  // A simple function to map the name prop to an actual icon component
  const renderIcon = () => {
    if (iconName === 'star') {
      return <MdStar size={iconSize} color={iconColor} />;
    }
    return null; // Handle cases where the icon name is not found
  };
  
  return (
    <div style={styles.container}>
      {renderIcon()}
      <CText
        textOptions={textOptions}
        text={text}
        size="md_medium"
        color={textColor}
      />
    </div>
  );
};

// Styles are defined as a plain JavaScript object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
};
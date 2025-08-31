import { Colors } from '../constants/Colors';
import lang from 'i18n-js'; // Assuming you keep this for type compatibility
import React, { ComponentType } from 'react';
import { I18nKeyPath } from '../../src/i18n/types';
import { CText, TextSizes } from './CText';
// Import a specific icon component from the web library
import { FaInfoCircle } from 'react-icons/fa';

interface WebIconProps {
  name: string;
  type: string;
  size?: number;
  color?: string;
}

interface InfoChipAccessories extends Partial<WebIconProps> {
  RightAccessory?: ComponentType;
  LeftAccessory?: ComponentType;
}

interface InfoChipProps extends InfoChipAccessories {
  text: I18nKeyPath;
  textOptions?: lang.TranslateOptions;
  small?: boolean;
  black?: boolean;
}

export const InfoChip = ({
  text,
  textOptions,
  small,
  black,
  RightAccessory,
  LeftAccessory,
  ...iconProps
}: InfoChipProps) => {
  // Combine base and conditional styles
  const containerStyle = {
    ...styles.container,
    ...(small && styles.smallPadding),
  };

  const textSize: TextSizes = small ? 'xxs_medium' : black ? 'sm_black' : 'sm_bold';

  return (
    <div style={containerStyle}>
      {LeftAccessory && <LeftAccessory />}
      {iconProps.name && (
        <FaInfoCircle
          size={iconProps.size ?? 14}
          color={iconProps.color ?? Colors.whiteSand50}
        />
      )}
      <CText
        text={text}
        size={textSize}
        color="white"
        textOptions={textOptions}
      />
      {RightAccessory && <RightAccessory />}
    </div>
  );
};

// Styles are defined as a plain JavaScript object
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: Colors.black40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex', // Use flexbox for web layout
    flexDirection: 'row',
    padding: '8px 12px',
    gap: 4,
  },
  smallPadding: {
    padding: '6px 8px',
  },
};
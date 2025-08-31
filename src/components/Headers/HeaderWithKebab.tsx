import React, { CSSProperties } from 'react';
import { FiMoreVertical } from 'react-icons/fi'; // Replaced EntypoDotsThreeVertical with FiMoreVertical

// Assuming these are available in your ReactJS project
import { BackButton } from './../../components/Buttons/BackButton';
import { Colors } from './../../constants/Colors';
import { I18nKeyPath } from './../../../src/i18n/types';
import { t } from './../../../src/i18n'; // Import the i18next translation function

interface HeaderWithKebabProps {
  text: I18nKeyPath;
  onKebabPress: () => void;
}

export const HeaderWithKebab = ({
  text,
  onKebabPress,
}: HeaderWithKebabProps) => {
  // Styles for the text element, derived from the original CText props
  const titleStyle: CSSProperties = {
    fontSize: '1.5rem', // xxl
    fontWeight: 800,    // extraBold
    color: Colors.white,
    textTransform: 'uppercase',
    // Emulates numberOfLines={1}
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: 0, // Reset default heading margins
  };

  return (
    <div style={styles.headerContainer}>
      <div style={styles.titleWrapper}>
        <BackButton />
        <h1 style={titleStyle}>{t(text)}</h1>
      </div>
      <button onClick={onKebabPress} style={styles.kebabButton}>
        <FiMoreVertical size={16} color={Colors.white} />
      </button>
    </div>
  );
};

// Styles converted to a CSS-in-JS object
const styles: { [key: string]: CSSProperties } = {
  headerContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    overflow: 'hidden', // Prevents the title from pushing the kebab button out
  },
  kebabButton: {
    background: 'none',
    border: 'none',
    padding: '8px', // Add some padding to increase the clickable area
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%', // Make the hover effect nicer
  },
};
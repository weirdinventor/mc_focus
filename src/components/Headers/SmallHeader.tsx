import React, { CSSProperties } from 'react';
import { FiSearch } from 'react-icons/fi'; // Replaces react-native-easy-icon

// Assuming these components have been converted to ReactJS
import { BackButton } from './../../components/Buttons/BackButton';

// Assuming your Colors constants file is available
import { Colors } from './../../constants/Colors';

interface SmallHeaderProps {
  title: string;
  withSearch?: boolean;
}

export const SmallHeader = ({ title, withSearch = true }: SmallHeaderProps) => {
  // `useSafeAreaInsets` is a React Native hook and is removed for the web.
  // The extra padding is now handled directly in the styles.

  // Styles for the text, derived from the props of the original CText component
  const titleStyle: CSSProperties = {
    fontSize: '1.25rem', // Equivalent for 'lg'
    fontWeight: 800,      // Equivalent for 'extraBold'
    color: Colors.white,
    margin: 0, // h2 elements have default margins, so we reset it
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftWrapper}>
        <BackButton />
        <h2 style={titleStyle}>{title}</h2>
      </div>
      {withSearch && (
        <button style={styles.iconButton}>
          <FiSearch size={24} color={Colors.white} />
        </button>
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '100%',
    backgroundColor: Colors.seance900,
    display: 'flex',
    flexDirection: 'row',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    // We combine the original padding with the safe area padding logic
    // Original: padding: 16, paddingTop: top + 8.
    // We'll set a larger fixed paddingTop.
    paddingTop: 24, // 16 + 8
    justifyContent: 'space-between',
    alignItems: 'center', // Added for vertical alignment
    boxSizing: 'border-box', // Good practice for web layouts
  },
  leftWrapper: {
    gap: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Added a style for the button to remove default browser styling
  iconButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
  },
};
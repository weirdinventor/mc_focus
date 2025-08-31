import React, { CSSProperties, ReactNode } from 'react';
import { FaUser } from 'react-icons/fa'; // Replaces Font Awesome icon

// --- Assuming these imports are correctly pathed for your ReactJS project ---
import ImageAssets from './../../assets/images';
import { Colors } from './../../constants/Colors';
import { t } from './../../../src/i18n'; // Using your i18next helper
import { TOptions } from 'i18next';

// --- Placeholder for your converted InfoChip component ---
// In your actual project, this would be in its own file.
interface InfoChipProps {
  LeftAccessory?: () => ReactNode;
  text: string;
  textOptions?: TOptions;
}
const InfoChip = ({ LeftAccessory, text, textOptions }: InfoChipProps) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '4px 12px',
    borderRadius: '20px',
  }}>
    {LeftAccessory && <LeftAccessory />}
    <span style={{ color: Colors.white, fontSize: '14px' }}>
      {t(text, textOptions)}
    </span>
  </div>
);
// --- End of Placeholder ---

interface DiscussionHeaderProps {
  title: string | undefined;
  membersCount?: number;
  coverImage?: string | null;
}

export const DiscussionHeader = ({
  title,
  membersCount,
  coverImage,
}: DiscussionHeaderProps) => {
  // 1. Dynamic background image style for the main container
  const containerStyle: CSSProperties = {
    ...styles.container,
    backgroundImage: `url(${coverImage || ImageAssets.BG_CLEAN})`,
  };

  // 2. Dynamic gradient style for the overlay div
  const gradientStyle: CSSProperties = {
    ...styles.gradientStyle,
    background: `linear-gradient(to top, ${Colors.gradients.purpleToFullTransparent.join(', ')})`,
  };

  // 3. Style for the title, derived from CText props
  const titleStyle: CSSProperties = {
    marginTop: 12,
    color: 'white',
    fontSize: '2.25rem', // xxxl
    fontWeight: 900,      // black
    textTransform: 'uppercase',
    margin: 0, // Reset default h1 margin
    padding: 0,
  };

  return (
    <div style={containerStyle}>
      {/* The gradient is now an absolutely positioned div inside the container */}
      <div style={gradientStyle} />

      <div style={styles.textContainer}>
        <div style={styles.chipWrapper}>
          <InfoChip
            LeftAccessory={() => (
              <FaUser size={14} color={Colors.white} />
            )}
            text="group.membersCount"
            textOptions={{ count: membersCount }}
          />
        </div>

        <div style={styles.titleWrapper}>
          <h1 style={titleStyle}>{title}</h1>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    height: 312,
    width: '100%',
    paddingTop: 50,
    position: 'relative', // Needed for the absolute gradient overlay
    display: 'flex', // To make the text container grow
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  textContainer: {
    zIndex: 10, // Sits on top of the gradient
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexGrow: 1,
    paddingLeft: 24,
    paddingRight: 24,
  },
  chipWrapper: {
    // This style ensures the chip doesn't stretch to full width
    alignSelf: 'flex-start',
  },
  titleWrapper: {
    marginBottom: 56,
    marginTop: 12,
  },
  gradientStyle: {
    // This creates the overlay effect
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '50%',
  },
};
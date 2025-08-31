import React from 'react';

// Import the web versions of your custom components
import { CText } from './CText';

// --- Styles CSS which replace StyleSheet ---
// Kept inside the component file for autonomy.
const componentStyles = `
  .empty-state-container {
    box-sizing: border-box;
    padding: 24px 0;
    flex: 1; /* By default, it tries to fill the space */
    display: flex;
    flex-direction: column; /* Stacks image and text vertically */
    justify-content: center; /* Centers vertically */
    align-items: center; /* Centers horizontally */
    width: 100%;
    align-self: center;
  }

  .empty-state-container.unflex {
    /* This class is added when the 'unFlex' prop is true */
    flex: 0;
  }

  .empty-state-image {
    width: 168px;
    height: 168px;
    /* resizeMode="contain" becomes object-fit: contain */
    object-fit: contain;
  }

  .empty-state-text-wrapper {
    max-width: 220px;
    align-self: center; /* This is redundant due to align-items on parent, but kept for clarity */
  }
`;

// --- Interface for React JS props ---
interface EmptyStateProps {
  image?: string; // This will now be an image URL
  boldText: string; // I18nKeyPath becomes string
  textOptions?: object; // TranslateOptions becomes a generic object
  smallText?: string;
  unFlex?: boolean;
}

/**
 * A component to display when there is no data to show, converted for React JS.
 */
export const EmptyState = ({
  image,
  boldText,
  textOptions,
  smallText,
  unFlex,
}: EmptyStateProps) => {
  // Dynamically build the className string based on props
  const containerClassName = `empty-state-container ${unFlex ? 'unflex' : ''}`;

  return (
    <>
      <style>{componentStyles}</style>
      <div className={containerClassName}>
        {image && (
          // CImage is replaced by a standard <img> tag
          <img
            className="empty-state-image"
            src={image}
            alt="État vide" // Important for accessibility
          />
        )}
        <div className="empty-state-text-wrapper">
          <CText
            size="md_bold"
            isCentered
            mt={16}
            mb={8}
            text={boldText}
            textOptions={textOptions}
          />
          {smallText && (
            <CText
              size="xs_medium"
              color="grey" // Make sure this color key exists in your web CText
              isCentered
              text={smallText}
            />
          )}
        </div>
      </div>
    </>
  );
};
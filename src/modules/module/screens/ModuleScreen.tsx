import { BigStaticHeader } from './../../../components/Headers/BigStaticHeader';
import { TopHeader } from './../../../components/Headers/TopHeader';
import React, { JSX } from 'react';
import { AllModulesFeed } from '../components/AllModulesFeed';

// The TabStackScreenProps are removed as they are not used in the web version.
export const ModuleScreen = (): JSX.Element => {
  return (
    // <Wrapper> is replaced with a <div> styled to act as a fullscreen container.
    <div style={styles.container}>
      {/* TopHeader is assumed to be a web component now. */}

      {/* <ScrollView> is replaced with a scrollable <div>. */}
      <div style={styles.cardsWrapper}>
        <div style={styles.contentWrapper}>
          <BigStaticHeader
            title="NOS MODULES"
            description="modules.description"
          />
          <AllModulesFeed />
        </div>
      </div>
    </div>
  );
};

// Styles are converted to a CSS-in-JS object.
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh', // Ensures the container takes up the full viewport height.
    position: 'relative', // Needed for the 'absolute' positioned TopHeader.
    backgroundColor: '#yourBackgroundColor', // Add a background color if needed.
  },
  cardsWrapper: {
    flex: 1, // Allows this div to grow and take available space.
    overflowY: 'auto', // Makes the content scrollable.
    width: '100%',
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    paddingBottom: '32px',
  },
};
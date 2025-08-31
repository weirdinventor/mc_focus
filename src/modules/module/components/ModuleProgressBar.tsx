import { CText } from './../../../components/CText';
import { StaticProgressBar } from './../../../components/StaticProgressBar';
import { Colors } from './../../../constants/Colors';
import React from 'react';

// The props interface is platform-agnostic and remains the same.
interface ModuleProgressBarProps {
  flexed?: boolean;
}

export const ModuleProgressBar = ({
  flexed = true,
}: ModuleProgressBarProps) => {
  return (
    // <View> is replaced with <div>.
    // Styles are applied conditionally using the spread operator.
    <div style={{ ...styles.progressWrapper, ...(flexed && styles.flexed) }}>
      {/* CText is assumed to be a converted web component. */}
      <CText
        size="md_bold"
        color="white"
        text="modules.progressAmount"
        textOptions={{ c: 1, max: 5 }}
      />
      {/* StaticProgressBar is assumed to be a converted web component. */}
      <StaticProgressBar
        value={1}
        maxValue={5}
        style={styles.progressBar}
        singleColor={Colors.seance900}
      />
      <CText
        size="md_bold"
        color="white"
        text="common.customString"
        textOptions={{ value: '25%' }}
      />
    </div>
  );
};

// StyleSheet.create is replaced with a standard CSS-in-JS object.
const styles: { [key: string]: React.CSSProperties } = {
  progressWrapper: {
    display: 'flex', // Added to make it a flex container on the web.
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px', // Added 'px' unit for consistency.
  },
  flexed: {
    flex: 1,
  },
  progressBar: {
    flexShrink: 1,
    height: '3px', // Added 'px' unit.
  },
};
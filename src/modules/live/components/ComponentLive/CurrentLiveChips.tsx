import React, { CSSProperties } from 'react';

// --- Assuming these custom components are web-compatible ---
import { InfoChip } from '../../../../components/InfoChip';
import { LiveDot } from '../../../../components/LiveDot';
import { Colors } from '../../../../constants/Colors';

// The props interface remains the same

// interface CurrentLiveChipsProps {}
 type CurrentLiveChipsProps = Record<string, never>; // this is temporary

export const CurrentLiveChips: React.FC<CurrentLiveChipsProps> = () => {
  // 1. Replaced StyleSheet.create with a standard CSS-in-JS object.
  // The style properties are identical for web CSS.
  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex', // Added display: flex for web
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  };

  // 2. Replaced the <View> component with a standard <div> element.
  return (
    <div style={styles.container}>
      <InfoChip
        LeftAccessory={() => <LiveDot dotColor={Colors.deepRed} />}
        text="live.liveHappening"
        black
      />
    </div>
  );
};
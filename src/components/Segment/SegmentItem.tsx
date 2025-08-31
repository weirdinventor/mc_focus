import { CText } from './../../components/CText';
import React from 'react';

// The onLayout prop is no longer needed for the web version.
interface SegmentItemProps {
  name: string;
  isSelected: boolean;
  onSegmentPress: () => void;
}

export const SegmentItem = ({
  isSelected,
  name,
  onSegmentPress,
}: SegmentItemProps) => {
  return (
    // Replace <Pressable> with <button> for web semantics and accessibility.
    // The onLayout prop is removed.
    <button style={styles.button} onClick={onSegmentPress}>
      {/* CText component is assumed to be converted to render a web element */}
      <CText isCentered color={isSelected ? 'pink700' : 'grey'} size="sm_bold">
        {name}
      </CText>
    </button>
  );
};

// Styles are now a plain JavaScript object for CSS-in-JS.
const styles: { [key: string]: React.CSSProperties } = {
  button: {
    paddingTop: 32,
    paddingBottom: 16,
    flexGrow: 1,
    // Add reset styles to make <button> behave like <Pressable>
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
  },
};
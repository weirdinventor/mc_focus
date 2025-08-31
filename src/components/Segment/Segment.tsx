import { Colors } from './../../constants/Colors';
import { useGetCategoriesQuery } from './../../react-query/queries/feed/feedQueries';
import React, { useEffect, useRef, useState } from 'react';
import { SegmentItem } from './SegmentItem';

interface SegmentProps {
  currentSegment: string | null;
  onSegmentPress: (segmentId: string | null) => void;
}

export const Segment = ({ currentSegment, onSegmentPress }: SegmentProps) => {
  const { data: categories } = useGetCategoriesQuery();
  const containerRef = useRef<HTMLDivElement>(null);

  // State to hold the dynamic style properties for the underline
  const [underlineStyle, setUnderlineStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  // This effect recalculates the underline's position whenever the active segment changes.
  useEffect(() => {
    if (categories && currentSegment && containerRef.current) {
      const activeIndex = categories.findIndex(
        (seg) => seg.id === currentSegment,
      );

      if (activeIndex !== -1) {
        // Find the specific DOM node for the active segment
        const activeElement = containerRef.current
          .children[activeIndex] as HTMLElement;

        if (activeElement) {
          // Measure its position and width
          setUnderlineStyle({
            left: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
          });
        }
      }
    }
    // Dependency array ensures this runs when the data or selection changes
  }, [currentSegment, categories]);

  return (
    // Attach the ref to the container div to enable measurements
    <div ref={containerRef} style={styles.container}>
      {categories?.map(({ id, name }) => (
        <SegmentItem
          key={id}
          name={name}
          isSelected={currentSegment === id}
          // The onSegmentPress prop is passed directly down
          onSegmentPress={() => onSegmentPress(id)}
        />
      ))}

      {/* The underline div gets its position and width from state, and animates via CSS */}
      <div style={{ ...styles.underline, ...underlineStyle }} />
    </div>
  );
};

// Styles are now a plain JavaScript object for CSS-in-JS
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: 'relative', // Position relative is crucial for the absolute positioned underline
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${Colors.grey8}`,
  },
  underline: {
    position: 'absolute',
    bottom: -1, // Position it just over the container's bottom border
    height: 2,
    backgroundColor: Colors.seance700,
    // This is the key for animation: CSS transitions
    transition: 'left 300ms ease-in-out, width 300ms ease-in-out',
  },
};
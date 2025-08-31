// ContentScreenWrapper.tsx

// --- IMPORTS ARE KEPT AS-IS ---
import ImageAssets from './../assets/images';
import { EmptyState } from './../components/EmptyState';
import { Screen } from './../components/Screen';
import { Segment } from './../components/Segment/Segment';
import React, { ComponentType, useState, CSSProperties } from 'react';
import { I18nKeyPath } from './../../src/i18n/types';

interface ContentScreenWrapperProps<T> {
  headerTitle: I18nKeyPath;
  smallCards: boolean;
  // FIX 1: Update the RenderItem prop type to include 'index'
  RenderItem: ComponentType<{ item: T; index: number }>;
  data: T[];
}

export const ContentScreenWrapper = <T extends { categoryId: string }>({
  headerTitle,
  smallCards,
  RenderItem,
  data,
}: ContentScreenWrapperProps<T>) => {
  const [currentSegmentId, setCurrentSegmentId] = useState<string | null>(null);

  const categorizedData = data?.filter(
    (el) => !currentSegmentId || el.categoryId === currentSegmentId,
  );

  const cardsContainerStyle: CSSProperties = {
    ...styles.cardsContainer,
    ...(smallCards && styles.smallCardsContainer),
  };

  return (
    <Screen
      noHorizontalPadding
      containerStyles={styles.container}
      headerText={headerTitle}
      headerWithBack
      withoutTopPadding={true}
    >
      {!!data.length && (
        <Segment
          currentSegment={currentSegmentId}
          onSegmentPress={setCurrentSegmentId}
        />
      )}
      {categorizedData?.length === 0 ? (
        <EmptyState
          boldText="emptyState.live.title"
          image={ImageAssets.CAMERA_VIDEO}
        />
      ) : (
        <div style={cardsContainerStyle}>
          {categorizedData?.map((item, index) => (
            // FIX 2: Pass the 'index' as a prop to the RenderItem component
            <RenderItem key={(item as any).id || index} item={item} index={index} />
          ))}
        </div>
      )}
    </Screen>
  );
};

// --- STYLES ARE UNCHANGED ---
const styles: { [key: string]: CSSProperties } = {
  container: {
    paddingBottom: 64,
  },
  cardsContainer: {
    marginTop: 16,
    gap: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  smallCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 0,
    paddingLeft: 24,
    paddingRight: 24,
  },
};
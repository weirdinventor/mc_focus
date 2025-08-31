import { CText } from './../../../components/CText';
import { ModuleCard } from './../../../components/Cards/ModuleCard';
import { useGetAllModulesQuery } from './../../../react-query/queries/modules/modulesQueries';
import { useGetMeQuery } from './../../../react-query/queries/user/userQueries';
import React, { memo, useEffect } from 'react';

export const AllModulesFeed = memo(() => {
  const { data: me } = useGetMeQuery();
  const isPaid = !!me?.isSubscribed;
  const { data: modules } = useGetAllModulesQuery({ paid: isPaid });

  // This effect can be kept if you have other logic that depends on isPaid,
  // but as is, it doesn't do anything. It's harmless.
  useEffect(() => {
    // nothing else to do; rely on me.isSubscribed
  }, [isPaid]);

  // The Dimensions and useLayout hooks are removed, as layout is now handled by CSS.

  return (
    // <View> becomes <div>.
    <div style={styles.container}>
      <div style={styles.header}>
        <CText size="lg_extraBold" text="modules.allModules" />
      </div>
      {/* <ScrollView> becomes a scrollable <div>. */}
      <div style={styles.scrollWrapper}>
        <div style={styles.gridContainer}>
          {modules?.map((item) => (
            // The card wrapper no longer needs a JS-calculated width.
            <div key={item.id} style={styles.cardWrapper}>
              <ModuleCard {...item} isPremium={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// Styles are converted to a CSS-in-JS object.
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1, // Ensures the container fills its parent.
    width: '100%',
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 16,
    flexShrink: 0, // Prevents the header from shrinking.
  },
  scrollWrapper: {
    flex: 1, // Allows this div to grow and take available space.
    overflowY: 'auto', // Makes the content scrollable.
    paddingBottom: 24,
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 24,
    paddingRight: 24,
    gap: '8px',
    marginTop: 16,
  },
  cardWrapper: {
    // This is the CSS magic for a 2-column grid.
    // It takes 50% of the width minus half the gap.
    flex: '1 1 calc(50% - 4px)',
    marginBottom: '8px',
    overflow: 'hidden',
    minWidth: '150px', // Prevents cards from getting too small.
  },
};
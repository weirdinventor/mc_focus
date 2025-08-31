import { memo, useEffect } from 'react';
import { BaseLiveCard } from '../../../components/Cards/BaseLiveCard';
import { FeedCardRow } from '../../../components/FeedCardsRow';
import { RootStackRoutes } from '../../../navigators/routes';
import { useGetRecordsQuery } from '../../../react-query/queries/feed/feedQueries';

// The 'useFocusEffect' and 'useCallback' imports have been removed as they are no longer needed.

interface RebroadcastFeedProps {
  groupId?: string;
}

export const RebroadcastFeed = memo(({ groupId }: RebroadcastFeedProps) => {
  const { data, refetch } = useGetRecordsQuery({
    recordType: 'published',
    groupId,
  });

  // This replaces `useFocusEffect`.
  // The `useEffect` hook runs when the component first mounts on the page,
  // triggering the data fetch. The `refetch` function from React Query is a
  // stable dependency, so this will behave like a "componentDidMount".
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <FeedCardRow
      // The navigationPath has been converted from an object to a URL string.
      // This format is compatible with web routers like react-router-dom,
      // assuming you have a dynamic route set up like "/RebroadcastContentScreen/:groupId".
      navigationPath={`${RootStackRoutes.REBROADCAST_CONTENT_SCREEN}/${groupId}`}
      
      // `(data || [])` is a safety check. It ensures that if `data` is undefined
      // (e.g., during loading), the `.slice()` method is called on an empty array,
      // preventing a runtime error.
      data={(data || []).slice(0, 3)}
      headerTitle="live.reboardcastTitle"
      RenderCard={({ item }) => (
        <BaseLiveCard
          {...item}
          coverPicture={item.thumbnail}
          author={item.owner.username}
          profilePicture={item.owner.profilePicture}
          type="rebroadcast"
          videoUrl={item.fileUrl}
          subscriptionRequired={item.accessLevel === 'premium'}
          timeAgo={7} // Note: This prop might represent a static value or need adjustment
          peopleAmount={375} // Note: This prop might represent a static value or need adjustment
        />
      )}
    />
  );
});
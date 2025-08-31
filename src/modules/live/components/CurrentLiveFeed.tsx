import { memo } from 'react';
import { BaseLiveCard } from '../../../components/Cards/BaseLiveCard';
import { FeedCardRow } from '../../../components/FeedCardsRow';
import { calculateTimeLeft } from '../../../hooks/useCalculateTumeLeft';
import { RootStackRoutes } from '../../../navigators/routes';
import { useGetModuleOngoingLiveQuery } from '../../../react-query/queries/feed/feedQueries';

interface CurrentLiveFeedProps {
  groupId: string;
}

export const CurrentLiveFeed = memo(({ groupId }: CurrentLiveFeedProps) => {
  const { data: currentModuleLive } = useGetModuleOngoingLiveQuery(groupId);

  return (
    <FeedCardRow
      // ---- THE FIX IS HERE ----
      // Changed the navigationPath from an object to a URL string
      // to match what the web component expects.
      navigationPath={`/${RootStackRoutes.CURRENT_CONTENT_SCREEN}`}
      withoutAllButton
      // The `|| []` ensures that if `currentModuleLive` is undefined,
      // we pass an empty array to prevent errors.
      data={currentModuleLive || []}
      RenderCard={({ item }) => (
        <BaseLiveCard
          {...item}
          author={item.owner.username}
          profilePicture={item.owner.profilePicture}
          id={item.id}
          type="currentLive"
          subscriptionRequired={item.accessLevel === 'premium'}
          timeAgo={7}
          startsIn={calculateTimeLeft(item?.airsAt)}
          peopleAmount={375}
        />
      )}
      headerTitle="live.liveHappeningEmoji"
    />
  );
});
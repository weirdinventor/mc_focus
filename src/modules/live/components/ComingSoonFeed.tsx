"use client"

import React, { useState, useEffect } from "react"
import { BaseLiveCard } from "../../../components/New/ui/base-live-card"
import { FeedCardRow } from "../../../components/New/ui/feed-card-row"
import { useGetTimeframeLivesQuery } from "../../../react-query/queries/feed/feedQueries"

interface ComingSoonFeedProps {
  groupId?: string
}

// Mock function to calculate time left
const calculateTimeLeft = (airsAt: string) => {
  const now = new Date().getTime()
  const airTime = new Date(airsAt).getTime()
  const difference = airTime - now

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);

    return parts.join(" ");
  }
  return "Starting soon"
}

export const ComingSoonFeed = React.memo(({ groupId }: ComingSoonFeedProps) => {
  const { data: futureLives, refetch } = useGetTimeframeLivesQuery({
    timeframe: "future",
    groupId,
  })

  const [timeLeftMap, setTimeLeftMap] = useState<Record<string, string>>({})

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    if (futureLives && futureLives.length > 0) {
      const interval = setInterval(() => {
        const updatedTimeLeftMap = futureLives.reduce(
          (acc, live) => ({
            ...acc,
            [live.id]: calculateTimeLeft(live.airsAt),
          }),
          {},
        )
        setTimeLeftMap(updatedTimeLeftMap)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [futureLives])

  return (
    <div className="ml-5 mt-5 mb-5">
      <FeedCardRow
        navigationPath="/soon-content"
        data={futureLives?.slice(0, 3) || []}
        headerTitle="Coming Soon"
        renderCard={(item) => {
          console.log('Rendering item:', item);
          return <BaseLiveCard
            key={item.id}
            {...item}
            coverPicture={item?.coverImage}
            author={item?.owner.username}
            profilePicture={item?.owner.profilePicture}
            type="soon"
            subscriptionRequired={item?.accessLevel === "premium"}
            timeAgo={7}
            startsIn={timeLeftMap[item?.id]}
            peopleAmount={375}
            description={item.title}
          />
        }}
      />
    </div>
  )
})

ComingSoonFeed.displayName = "ComingSoonFeed"

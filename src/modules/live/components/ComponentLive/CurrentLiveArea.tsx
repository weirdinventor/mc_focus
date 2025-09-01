import React from "react"
import { Button } from "../../../../components/New/ui/button"
import { CurrentLiveChips } from "./CurrentLiveChips"
import { useGetSingleOngoingLiveQuery } from "../../../../react-query/queries/feed/feedQueries"



// Mock mutation hook
const useJoinStreamMutation = () => {
  return {
    mutate: (params: any, options: any) => {
      console.log("Joining stream:", params)
      options.onSuccess?.({ token: "mock-token", roomId: "mock-room" })
    },
  }
}

export const CurrentLiveArea = () => {
  const { data: ongoingLive, refetch } = useGetSingleOngoingLiveQuery();
  const { mutate } = useJoinStreamMutation()

  React.useEffect(() => {
    refetch()
  }, [refetch])

  const onPressHandler = () => {
    if (ongoingLive?.id) {
      mutate(
        { liveId: ongoingLive.id },
        {
          onSuccess: (data: any) => {
            console.log("Navigating to meeting screen with:", data)
            // In real app, navigate to meeting screen
          },
        },
      )
    }
  }

  if (!ongoingLive) {
    return null
  }

  return (
    <div className="relative h-[472px] rounded-b-[36px] overflow-hidden">
      {/* Background Image */}
      <img
        src={ongoingLive.coverImage || "/placeholder.svg"}
        alt="Live session cover"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 pt-5">
        <CurrentLiveChips />

        <h1 className="text-white text-2xl font-bold uppercase mt-2 mb-2 line-clamp-2">{ongoingLive.title}</h1>

        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src={ongoingLive.owner.profilePicture || "/placeholder.svg"}
              alt={ongoingLive.owner.username}
              className="w-10 h-10 rounded-full border-2 border-white/20"
            />
            <span className="text-white font-medium">{ongoingLive.owner.username}</span>
          </div>

          {/* Watch Button */}
          <Button
            onClick={onPressHandler}
            className="bg-gradient-to-r from-seance-400 to-seance-500 hover:from-seance-500 hover:to-seance-600 text-black px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Watch
          </Button>
        </div>
      </div>
    </div>
  )
}

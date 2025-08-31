import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface MessageBubbleProps {
  username: string
  text: string
  profilePicture?: string
  isOwn?: boolean
}

export function MessageBubble({ username, text, profilePicture, isOwn }: MessageBubbleProps) {
  return (
    <div className="flex gap-3 p-4">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarImage src={profilePicture || "/placeholder.svg"} />
        <AvatarFallback>{username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="font-medium text-sm mb-1">{username}</div>
        <div className="bg-muted rounded-lg p-3 text-sm whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  )
}

import { Card, CardContent, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Clock, Users, Crown } from "lucide-react"

interface BaseLiveCardProps {
  id: string
  title: string
  description?: string
  author: string
  profilePicture?: string
  coverPicture?: string
  type: "annonces" | "live"
  subscriptionRequired?: boolean
  timeAgo?: number
  startsIn?: string
  peopleAmount?: number
}

export function BaseLiveCard({
  title,
  description,
  author,
  profilePicture,
  coverPicture,
  subscriptionRequired,
  startsIn,
  peopleAmount,
}: BaseLiveCardProps) {
  return (
    <Card className="w-full">
      {coverPicture && (
        <div className="relative h-48 bg-muted rounded-t-lg overflow-hidden">
          <img src={coverPicture || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          {subscriptionRequired && (
            <Badge className="absolute top-2 right-2" variant="secondary">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profilePicture || "/placeholder.svg"} />
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{author}</span>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mb-3">{description}</p>}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {startsIn && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{startsIn}</span>
            </div>
          )}
          {peopleAmount && (
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{peopleAmount}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

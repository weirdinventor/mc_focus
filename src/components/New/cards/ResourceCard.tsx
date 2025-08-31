import { Card, CardContent, CardHeader } from "../ui/card"
import { Badge } from "../ui/badge"
import type { Resource } from "../../../types"

interface ResourceCardProps extends Resource {
  isContentScreen?: boolean
  tag?: string
}

export function ResourceCard({ title, description, tag, isContentScreen = false }: ResourceCardProps) {
  return (
    <Card className={`w-full ${isContentScreen ? "h-32" : "h-40"}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">{title}</h3>
          {tag && (
            <Badge variant="outline" className="text-xs">
              {tag}
            </Badge>
          )}
        </div>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      )}
    </Card>
  )
}

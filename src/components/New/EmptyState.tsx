interface EmptyStateProps {
  boldText: string
  image?: string
  textOptions?: Record<string, any>
}

export function EmptyState({ boldText, image, textOptions }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center">
      {image && <img src={image || "/placeholder.svg"} alt="Empty state" className="w-32 h-32 mb-4 opacity-50" />}
      <h3 className="text-lg font-semibold text-muted-foreground">{boldText}</h3>
    </div>
  )
}

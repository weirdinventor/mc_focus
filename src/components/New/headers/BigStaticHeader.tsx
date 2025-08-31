interface BigStaticHeaderProps {
  title: string
  description?: string
  paddingT?: number
  paddingB?: number
}

export function BigStaticHeader({ title, description, paddingT = 0, paddingB = 0 }: BigStaticHeaderProps) {
  return (
    <div
      className="px-6"
      style={{
        paddingTop: paddingT,
        paddingBottom: paddingB,
      }}
    >
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}

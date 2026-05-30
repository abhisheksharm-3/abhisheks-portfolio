import { cn } from "@/lib/utils"

type PostCalloutProps = {
  children: React.ReactNode
  className?: string
}

export function PostCallout({ children, className }: PostCalloutProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-sm border border-primary/15 bg-primary/[0.03] px-4 py-3",
        "text-sm text-foreground/70 font-light leading-relaxed",
        className
      )}
    >
      {children}
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  actions?: React.ReactNode
}

const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, title, description, actions, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "bg-white rounded-lg border border-slate-200 p-6",
          className
        )}
        ref={ref}
        {...props}
      >
        {(title || description || actions) && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-slate-600 mt-1">{description}</p>
              )}
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
          </div>
        )}
        {children}
      </div>
    )
  }
)

ChartContainer.displayName = "ChartContainer"

export { ChartContainer }

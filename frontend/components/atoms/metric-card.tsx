"use client"

import { cn } from "@/lib/utils"
import { forwardRef } from "react"

interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  variant?: "default" | "success" | "warning" | "danger"
}

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, title, value, change, changeLabel, icon, variant = "default", ...props }, ref) => {
    const getChangeColor = () => {
      if (change === undefined) return ""
      if (change > 0) return "text-green-600"
      if (change < 0) return "text-red-600"
      return "text-slate-600"
    }

    const getChangeIcon = () => {
      if (change === undefined) return null
      if (change > 0) return "↑"
      if (change < 0) return "↓"
      return "→"
    }

    return (
      <div
        className={cn(
          "bg-white rounded-lg border border-slate-200 p-4",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            {change !== undefined && (
              <div className={cn("flex items-center space-x-1 mt-1", getChangeColor())}>
                <span className="text-sm font-medium">
                  {getChangeIcon()}{Math.abs(change)}%
                </span>
                {changeLabel && (
                  <span className="text-xs text-slate-500">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0 text-slate-400">
              {icon}
            </div>
          )}
        </div>
      </div>
    )
  }
)

MetricCard.displayName = "MetricCard"

export { MetricCard }

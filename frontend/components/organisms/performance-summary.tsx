"use client"

import { MetricCard } from "@/components/atoms/metric-card"
import { SalesPerformanceSummary } from "@/lib/api/product-analytics"
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, BarChart3 } from "lucide-react"

interface PerformanceSummaryProps {
  performanceSummary: SalesPerformanceSummary
}

export function PerformanceSummary({ performanceSummary }: PerformanceSummaryProps) {
  const formatCurrency = (value: number) => `$${value.toLocaleString()}`
  const formatNumber = (value: number) => value.toLocaleString()
  const formatPercentage = (value: number) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

  const metrics = [
    {
      title: "Orders Growth",
      value: formatPercentage(performanceSummary.ordersGrowth),
      change: performanceSummary.ordersGrowth,
      changeLabel: "vs previous year",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Revenue Growth", 
      value: formatPercentage(performanceSummary.revenueGrowth),
      change: performanceSummary.revenueGrowth,
      changeLabel: "vs previous year",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Units Growth",
      value: formatPercentage(performanceSummary.unitsGrowth), 
      change: performanceSummary.unitsGrowth,
      changeLabel: "vs previous year",
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Price Change",
      value: formatPercentage(performanceSummary.priceChange),
      change: performanceSummary.priceChange,
      changeLabel: "vs previous year", 
      icon: <BarChart3 className="h-5 w-5" />,
    }
  ]

  const totals = [
    {
      title: "Total Orders",
      value: formatNumber(performanceSummary.totalOrders),
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Total Units Sold",
      value: formatNumber(performanceSummary.totalUnitsSold),
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "Total Revenue",
      value: formatCurrency(performanceSummary.totalRevenue),
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Overall Avg. Price",
      value: formatCurrency(performanceSummary.overallAveragePrice),
      icon: <BarChart3 className="h-5 w-5" />,
    }
  ]

  return (
    <div className="space-y-6">
      {/* Year-over-Year Performance */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Year-over-Year Performance Summary</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeLabel={metric.changeLabel}
              icon={metric.icon}
            />
          ))}
        </div>
      </div>

      {/* Overall Totals */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Overall Performance Totals</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {totals.map((total, index) => (
            <MetricCard
              key={index}
              title={total.title}
              value={total.value}
              icon={total.icon}
            />
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Insights</h3>
        <div className="space-y-3">
          {generateInsights(performanceSummary).map((insight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                insight.type === 'positive' ? 'bg-green-500' : 
                insight.type === 'negative' ? 'bg-red-500' : 'bg-blue-500'
              }`} />
              <p className="text-sm text-slate-700">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function generateInsights(summary: SalesPerformanceSummary) {
  const insights = []

  // Revenue growth insight
  if (summary.revenueGrowth > 20) {
    insights.push({
      type: 'positive' as const,
      text: `Revenue shows strong growth of ${summary.revenueGrowth.toFixed(1)}%, indicating excellent market performance.`
    })
  } else if (summary.revenueGrowth < -10) {
    insights.push({
      type: 'negative' as const,
      text: `Revenue declined by ${Math.abs(summary.revenueGrowth).toFixed(1)}%, requiring attention to sales strategy.`
    })
  }

  // Orders vs Units insight
  const orderToUnitRatio = summary.totalUnitsSold / summary.totalOrders
  if (orderToUnitRatio > 2) {
    insights.push({
      type: 'positive' as const,
      text: `High units per order ratio (${orderToUnitRatio.toFixed(1)}) suggests strong customer purchase volumes.`
    })
  }

  // Price strategy insight
  if (summary.priceChange > 10 && summary.unitsGrowth > 0) {
    insights.push({
      type: 'positive' as const,
      text: `Price increases of ${summary.priceChange.toFixed(1)}% while maintaining unit growth demonstrate strong pricing power.`
    })
  } else if (summary.priceChange < -5) {
    insights.push({
      type: 'neutral' as const,
      text: `Price reduction of ${Math.abs(summary.priceChange).toFixed(1)}% may be part of a competitive pricing strategy.`
    })
  }

  // Growth consistency insight
  if (summary.ordersGrowth > 0 && summary.revenueGrowth > 0 && summary.unitsGrowth > 0) {
    insights.push({
      type: 'positive' as const,
      text: 'Consistent positive growth across all key metrics indicates strong overall performance.'
    })
  }

  // Default insight if no specific patterns
  if (insights.length === 0) {
    insights.push({
      type: 'neutral' as const,
      text: 'Performance metrics show stable trends. Consider analyzing quarterly data for more detailed insights.'
    })
  }

  return insights
}

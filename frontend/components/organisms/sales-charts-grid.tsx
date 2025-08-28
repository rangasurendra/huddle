"use client"

import { ChartContainer } from "@/components/atoms/chart-container"
import { BarChart } from "@/components/atoms/bar-chart"
import { LineChart } from "@/components/atoms/line-chart"
import { Button } from "@/components/atoms/button"
import { YearlySalesData } from "@/lib/api/product-analytics"
import { useState } from "react"

interface SalesChartsGridProps {
  salesData: YearlySalesData[]
  productName: string
}

type ChartType = 'bar' | 'line'
type MetricType = 'orderCount' | 'totalQuantitySold' | 'totalRevenue' | 'averageSellingPrice'

export function SalesChartsGrid({ salesData, productName }: SalesChartsGridProps) {
  const [chartTypes, setChartTypes] = useState<Record<string, ChartType>>({
    orders: 'bar',
    quantity: 'line',
    revenue: 'bar',
    price: 'line'
  })

  const toggleChartType = (key: string) => {
    setChartTypes(prev => ({
      ...prev,
      [key]: prev[key] === 'bar' ? 'line' : 'bar'
    }))
  }

  const charts = [
    {
      key: 'orders',
      title: 'Orders by Year',
      metric: 'orderCount' as MetricType,
      color: '#3b82f6',
      description: `Total: ${salesData.reduce((sum, d) => sum + d.orderCount, 0).toLocaleString()} orders`
    },
    {
      key: 'quantity',
      title: 'Total Quantity Sold',
      metric: 'totalQuantitySold' as MetricType,
      color: '#10b981',
      description: `Total: ${salesData.reduce((sum, d) => sum + d.totalQuantitySold, 0).toLocaleString()} units`
    },
    {
      key: 'revenue',
      title: 'Revenue by Year',
      metric: 'totalRevenue' as MetricType,
      color: '#f59e0b',
      description: `Total: $${salesData.reduce((sum, d) => sum + d.totalRevenue, 0).toFixed(2)}`
    },
    {
      key: 'price',
      title: 'Average Selling Price',
      metric: 'averageSellingPrice' as MetricType,
      color: '#ef4444',
      description: `Overall Avg: $${(salesData.reduce((sum, d) => sum + d.averageSellingPrice, 0) / salesData.length).toFixed(2)}`
    }
  ]

  if (!salesData.length) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">No sales data available for the selected product.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-2">Yearly Sales Trend Overview</h2>
        <p className="text-slate-300">{productName}</p>
        <div className="mt-4 flex items-center space-x-4">
          <Button variant="primary" size="sm">
            Custom Date Range
          </Button>
          <Button variant="secondary" size="sm">
            Change Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {charts.map((chart) => {
          const ChartComponent = chartTypes[chart.key] === 'bar' ? BarChart : LineChart
          return (
            <ChartContainer
              key={chart.key}
              title={chart.title}
              description={chart.description}
              actions={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleChartType(chart.key)}
                >
                  {chartTypes[chart.key] === 'bar' ? 'Line View' : 'Bar View'}
                </Button>
              }
            >
              <div className="h-80">
                <ChartComponent
                  data={salesData}
                  metric={chart.metric}
                  color={chart.color}
                  width={400}
                  height={300}
                />
              </div>
            </ChartContainer>
          )
        })}
      </div>
    </div>
  )
}

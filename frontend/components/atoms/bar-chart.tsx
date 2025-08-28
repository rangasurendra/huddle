"use client"

import { useD3 } from "@/hooks/use-d3"
import { YearlySalesData } from "@/lib/api/product-analytics"
import * as d3 from "d3"
import { useMemo } from "react"

interface BarChartProps {
  data: YearlySalesData[]
  width?: number
  height?: number
  metric: 'orderCount' | 'totalQuantitySold' | 'totalRevenue' | 'averageSellingPrice'
  color?: string
}

export function BarChart({ 
  data, 
  width = 800, 
  height = 400, 
  metric,
  color = "#3b82f6" 
}: BarChartProps) {
  const chartData = useMemo(() => 
    data.map(d => ({
      year: d.year,
      value: d[metric]
    })), [data, metric]
  )

  const ref = useD3(
    (svg) => {
      // Clear previous content
      svg.selectAll("*").remove()

      const margin = { top: 20, right: 30, bottom: 40, left: 80 }
      const innerWidth = width - margin.left - margin.right
      const innerHeight = height - margin.top - margin.bottom

      // Create scales
      const xScale = d3.scaleBand()
        .domain(chartData.map(d => d.year.toString()))
        .range([0, innerWidth])
        .padding(0.1)

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.value) || 0])
        .nice()
        .range([innerHeight, 0])

      // Create main group
      const g = svg
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)

      // Add bars
      g.selectAll(".bar")
        .data(chartData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.year.toString()) || 0)
        .attr("y", d => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.value))
        .attr("fill", color)
        .attr("opacity", 0.8)
        .on("mouseover", function(event, d) {
          d3.select(this).attr("opacity", 1)
          
          // Create tooltip
          const tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "8px")
            .style("border-radius", "4px")
            .style("font-size", "12px")
            .style("pointer-events", "none")

          tooltip.transition()
            .duration(200)
            .style("opacity", .9)

          const formattedValue = metric === 'averageSellingPrice' || metric === 'totalRevenue' 
            ? `$${d.value.toFixed(2)}`
            : d.value.toLocaleString()

          tooltip.html(`Year: ${d.year}<br/>Value: ${formattedValue}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px")
        })
        .on("mouseout", function() {
          d3.select(this).attr("opacity", 0.8)
          d3.selectAll(".tooltip").remove()
        })

      // Add X axis
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale))

      // Add Y axis
      const yAxisFormat = metric === 'averageSellingPrice' || metric === 'totalRevenue' 
        ? d3.format("$.2s")
        : d3.format(".2s")
      
      g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(yAxisFormat))

      // Add Y axis label
      g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (innerHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "12px")
        .style("fill", "#64748b")
        .text(getMetricLabel(metric))

    },
    [chartData, width, height, color, metric]
  )

  return <svg ref={ref}></svg>
}

function getMetricLabel(metric: string): string {
  switch (metric) {
    case 'orderCount':
      return 'Number of Orders'
    case 'totalQuantitySold':
      return 'Units Sold'
    case 'totalRevenue':
      return 'Revenue ($)'
    case 'averageSellingPrice':
      return 'Average Price ($)'
    default:
      return 'Value'
  }
}

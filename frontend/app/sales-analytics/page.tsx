"use client"

import { useState, useEffect } from "react"
import { ProductSelector } from "@/components/molecules/product-selector"
import { SalesChartsGrid } from "@/components/organisms/sales-charts-grid"
import { PerformanceSummary } from "@/components/organisms/performance-summary"
import { 
  ProductListItem, 
  ProductSalesAnalytics, 
  productAnalyticsApi 
} from "@/lib/api/product-analytics"

export default function SalesAnalyticsPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductListItem | null>(null)
  const [analyticsData, setAnalyticsData] = useState<ProductSalesAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleProductSelect = async (product: ProductListItem | null) => {
    setSelectedProduct(product)
    setAnalyticsData(null)
    setError(null)

    if (!product) return

    setIsLoading(true)
    try {
      const data = await productAnalyticsApi.getProductSalesAnalytics({
        productId: product.productId,
        startYear: 2019,
        endYear: 2023
      })
      setAnalyticsData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch analytics data')
      console.error('Error fetching analytics:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Product Selection */}
        <ProductSelector
          onProductSelect={handleProductSelect}
          selectedProduct={selectedProduct}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600">Loading sales analytics...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Analytics Data */}
        {analyticsData && !isLoading && (
          <div className="space-y-8">
            {/* Sales Charts */}
            <SalesChartsGrid
              salesData={analyticsData.yearlySalesData}
              productName={analyticsData.product.name}
            />

            {/* Performance Summary */}
            <PerformanceSummary
              performanceSummary={analyticsData.performanceSummary}
            />
          </div>
        )}

        {/* Empty State */}
        {!selectedProduct && !isLoading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Annual Sales Trends Analysis
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Select a product from the dropdown above to view comprehensive sales analytics including 
              order trends, revenue growth, unit sales, and pricing analysis over time.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

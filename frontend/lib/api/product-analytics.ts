// Types for API responses
export interface ProductSummary {
  productId: number
  name: string
  sku: string
  category: string
  currentPrice: number
}

export interface YearlySalesData {
  year: number
  orderCount: number
  totalQuantitySold: number
  totalRevenue: number
  averageSellingPrice: number
  growthPercentage: number
}

export interface SalesPerformanceSummary {
  ordersGrowth: number
  revenueGrowth: number
  unitsGrowth: number
  priceChange: number
  totalOrders: number
  totalUnitsSold: number
  totalRevenue: number
  overallAveragePrice: number
}

export interface ProductSalesAnalytics {
  product: ProductSummary
  yearlySalesData: YearlySalesData[]
  performanceSummary: SalesPerformanceSummary
}

export interface ProductListItem {
  productId: number
  name: string
  sku: string
  category: string
  price: number
  imageUrl: string
}

export interface ProductSearchResponse {
  products: ProductListItem[]
  totalCount: number
  pageNumber: number
  pageSize: number
  totalPages: number
}

export interface ProductSalesAnalyticsRequest {
  productId: number
  startYear?: number
  endYear?: number
}

export interface ProductSearchRequest {
  searchTerm?: string
  category?: string
  pageSize?: number
  pageNumber?: number
}

// API service
class ProductAnalyticsApi {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5165/api'

  async getProductSalesAnalytics(request: ProductSalesAnalyticsRequest): Promise<ProductSalesAnalytics> {
    const url = `${this.baseUrl}/ProductAnalytics/sales-analytics`
    console.log('Fetching sales analytics from:', url, 'with request:', request)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    console.log('Response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API Error:', errorText)
      throw new Error(`Failed to fetch sales analytics: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Received data:', data)
    return data
  }

  async searchProducts(request: ProductSearchRequest): Promise<ProductSearchResponse> {
    const url = `${this.baseUrl}/ProductAnalytics/search-products`
    console.log('Searching products from:', url, 'with request:', request)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        searchTerm: request.searchTerm || '',
        category: request.category || '',
        pageSize: request.pageSize || 20,
        pageNumber: request.pageNumber || 1,
      }),
    })

    console.log('Search response status:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Search API Error:', errorText)
      throw new Error(`Failed to search products: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('Search results:', data)
    return data
  }

  async getProductSummary(productId: number): Promise<ProductSummary> {
    const response = await fetch(`${this.baseUrl}/ProductAnalytics/products/${productId}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch product summary: ${response.statusText}`)
    }

    return response.json()
  }
}

export const productAnalyticsApi = new ProductAnalyticsApi()

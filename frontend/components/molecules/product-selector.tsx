"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/molecules/search-bar"
import { Button } from "@/components/atoms/button"
import { ProductListItem, productAnalyticsApi } from "@/lib/api/product-analytics"
import { cn } from "@/lib/utils"

interface ProductSelectorProps {
  onProductSelect: (product: ProductListItem) => void
  selectedProduct?: ProductListItem | null
}

export function ProductSelector({ onProductSelect, selectedProduct }: ProductSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const searchProducts = async () => {
      if (searchTerm.length < 2) {
        setProducts([])
        return
      }

      setIsLoading(true)
      try {
        const response = await productAnalyticsApi.searchProducts({
          searchTerm,
          pageSize: 10
        })
        setProducts(response.products)
      } catch (error) {
        console.error('Error searching products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  const handleProductClick = (product: ProductListItem) => {
    onProductSelect(product)
    setIsOpen(false)
    setSearchTerm("")
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Product Selection</h2>
            <p className="text-sm text-slate-600 mt-1">
              Select a product to analyze detailed sales metrics and performance trends
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-96 relative">
              <SearchBar
                placeholder="Search for products by name, SKU, or category..."
                value={searchTerm}
                onChange={(value) => {
                  setSearchTerm(value)
                  setIsOpen(value.length >= 2)
                }}
              />
              
              {/* Search Results Dropdown */}
              {isOpen && (searchTerm.length >= 2) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-slate-500">
                      Searching products...
                    </div>
                  ) : products.length > 0 ? (
                    <div className="py-2">
                      {products.map((product) => (
                        <button
                          key={product.productId}
                          onClick={() => handleProductClick(product)}
                          className="w-full px-4 py-3 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                              <span className="text-lg">📦</span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-slate-900">{product.name}</div>
                              <div className="text-sm text-slate-600">
                                SKU: {product.sku} • {product.category}
                              </div>
                              <div className="text-sm font-medium text-blue-600">
                                ${product.price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-slate-500">
                      No products found matching "{searchTerm}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Selected Product Display */}
        {selectedProduct ? (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{selectedProduct.name}</h3>
                  <p className="text-sm text-slate-600">
                    SKU: {selectedProduct.sku} • {selectedProduct.category}
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onProductSelect(null as any)}
              >
                Change Product
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-8 border-2 border-dashed border-slate-300 rounded-lg text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Select Product for Analysis</h3>
            <p className="text-slate-600 mb-4">
              Choose a product from our catalog to view detailed sales metrics, trends, and performance data
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
              {/* Sample Products */}
              {[
                { id: 1, name: "SoundWave Pro Headphones", category: "Electronics" },
                { id: 2, name: "FitTrack Smart Watch", category: "Wearables" },
                { id: 3, name: "PowerMax 10000 Power Bank", category: "Accessories" },
                { id: 4, name: "UltraBook Pro X13", category: "Computers" },
                { id: 5, name: "ProShot X7 Camera", category: "Photography" }
              ].map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick({
                    productId: product.id,
                    name: product.name,
                    sku: `SKU-${product.id}`,
                    category: product.category,
                    price: 199.99,
                    imageUrl: "/placeholder-product.jpg"
                  })}
                  className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">📦</span>
                  </div>
                  <div className="text-sm font-medium text-slate-900">{product.name}</div>
                  <div className="text-xs text-slate-600">{product.category}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

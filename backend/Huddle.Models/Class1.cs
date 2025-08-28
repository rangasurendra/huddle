using System.ComponentModel.DataAnnotations;

namespace Huddle.Models
{
    // Request DTOs
    public class ProductSalesAnalyticsRequestDto
    {
        [Required]
        public int ProductId { get; set; }
        
        public int? StartYear { get; set; }
        
        public int? EndYear { get; set; }
    }

    public class ProductSearchRequestDto
    {
        public string? SearchTerm { get; set; }
        
        public string? Category { get; set; }
        
        public int PageSize { get; set; } = 20;
        
        public int PageNumber { get; set; } = 1;
    }

    // Response DTOs
    public class ProductSalesAnalyticsResponseDto
    {
        public ProductSummaryDto Product { get; set; } = new();
        
        public List<YearlySalesDataDto> YearlySalesData { get; set; } = new();
        
        public SalesPerformanceSummaryDto PerformanceSummary { get; set; } = new();
    }

    public class ProductSummaryDto
    {
        public int ProductId { get; set; }
        
        public string Name { get; set; } = string.Empty;
        
        public string SKU { get; set; } = string.Empty;
        
        public string Category { get; set; } = string.Empty;
        
        public decimal CurrentPrice { get; set; }
    }

    public class YearlySalesDataDto
    {
        public int Year { get; set; }
        
        public int OrderCount { get; set; }
        
        public int TotalQuantitySold { get; set; }
        
        public decimal TotalRevenue { get; set; }
        
        public decimal AverageSellingPrice { get; set; }
        
        public decimal GrowthPercentage { get; set; }
    }

    public class SalesPerformanceSummaryDto
    {
        public decimal OrdersGrowth { get; set; }
        
        public decimal RevenueGrowth { get; set; }
        
        public decimal UnitsGrowth { get; set; }
        
        public decimal PriceChange { get; set; }
        
        public int TotalOrders { get; set; }
        
        public int TotalUnitsSold { get; set; }
        
        public decimal TotalRevenue { get; set; }
        
        public decimal OverallAveragePrice { get; set; }
    }

    public class ProductListItemDto
    {
        public int ProductId { get; set; }
        
        public string Name { get; set; } = string.Empty;
        
        public string SKU { get; set; } = string.Empty;
        
        public string Category { get; set; } = string.Empty;
        
        public decimal Price { get; set; }
        
        public string ImageUrl { get; set; } = string.Empty;
    }

    public class ProductSearchResponseDto
    {
        public List<ProductListItemDto> Products { get; set; } = new();
        
        public int TotalCount { get; set; }
        
        public int PageNumber { get; set; }
        
        public int PageSize { get; set; }
        
        public int TotalPages { get; set; }
    }
}

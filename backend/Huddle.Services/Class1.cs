using Huddle.Models;

namespace Huddle.Services
{
    public interface IProductAnalyticsService
    {
        Task<ProductSalesAnalyticsResponseDto> GetProductSalesAnalyticsAsync(ProductSalesAnalyticsRequestDto request);
        
        Task<ProductSearchResponseDto> SearchProductsAsync(ProductSearchRequestDto request);
        
        Task<ProductSummaryDto> GetProductSummaryAsync(int productId);
    }

    public class ProductAnalyticsService : IProductAnalyticsService
    {
        // In a real implementation, this would use Entity Framework or another data access layer
        // For now, we'll simulate data
        
        public async Task<ProductSalesAnalyticsResponseDto> GetProductSalesAnalyticsAsync(ProductSalesAnalyticsRequestDto request)
        {
            // Simulate async operation
            await Task.Delay(100);
            
            // Mock data - in real implementation, this would query the database
            var product = GetMockProduct(request.ProductId);
            var yearlySales = GenerateMockYearlySalesData(request.ProductId, request.StartYear, request.EndYear);
            var performanceSummary = CalculatePerformanceSummary(yearlySales);
            
            return new ProductSalesAnalyticsResponseDto
            {
                Product = product,
                YearlySalesData = yearlySales,
                PerformanceSummary = performanceSummary
            };
        }

        public async Task<ProductSearchResponseDto> SearchProductsAsync(ProductSearchRequestDto request)
        {
            await Task.Delay(50);
            
            // Mock product data
            var allProducts = GetMockProducts();
            
            // Apply search filter
            var filteredProducts = allProducts.AsQueryable();
            
            if (!string.IsNullOrEmpty(request.SearchTerm))
            {
                filteredProducts = filteredProducts.Where(p => 
                    p.Name.Contains(request.SearchTerm, StringComparison.OrdinalIgnoreCase) ||
                    p.SKU.Contains(request.SearchTerm, StringComparison.OrdinalIgnoreCase));
            }
            
            if (!string.IsNullOrEmpty(request.Category))
            {
                filteredProducts = filteredProducts.Where(p => 
                    p.Category.Equals(request.Category, StringComparison.OrdinalIgnoreCase));
            }
            
            var totalCount = filteredProducts.Count();
            var products = filteredProducts
                .Skip((request.PageNumber - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();
            
            return new ProductSearchResponseDto
            {
                Products = products,
                TotalCount = totalCount,
                PageNumber = request.PageNumber,
                PageSize = request.PageSize,
                TotalPages = (int)Math.Ceiling((double)totalCount / request.PageSize)
            };
        }

        public async Task<ProductSummaryDto> GetProductSummaryAsync(int productId)
        {
            await Task.Delay(25);
            return GetMockProduct(productId);
        }

        private ProductSummaryDto GetMockProduct(int productId)
        {
            var products = new Dictionary<int, ProductSummaryDto>
            {
                { 1, new ProductSummaryDto { ProductId = 1, Name = "SoundWave Pro Headphones", SKU = "SW-HP-2023", Category = "Electronics", CurrentPrice = 299.99m } },
                { 2, new ProductSummaryDto { ProductId = 2, Name = "FitTrack Smart Watch", SKU = "FT-SW-101", Category = "Wearables", CurrentPrice = 199.99m } },
                { 3, new ProductSummaryDto { ProductId = 3, Name = "PowerMax 10000 Power Bank", SKU = "PM-PB-10K", Category = "Accessories", CurrentPrice = 79.99m } },
                { 4, new ProductSummaryDto { ProductId = 4, Name = "UltraBook Pro X13", SKU = "UB-X13-2023", Category = "Computers", CurrentPrice = 1299.99m } },
                { 5, new ProductSummaryDto { ProductId = 5, Name = "ProShot X7 Camera", SKU = "PS-X7-CAM", Category = "Photography", CurrentPrice = 899.99m } }
            };
            
            return products.GetValueOrDefault(productId, products[1]);
        }

        private List<ProductListItemDto> GetMockProducts()
        {
            return new List<ProductListItemDto>
            {
                new() { ProductId = 1, Name = "SoundWave Pro Headphones", SKU = "SW-HP-2023", Category = "Electronics", Price = 299.99m, ImageUrl = "/placeholder-product.jpg" },
                new() { ProductId = 2, Name = "FitTrack Smart Watch", SKU = "FT-SW-101", Category = "Wearables", Price = 199.99m, ImageUrl = "/placeholder-product.jpg" },
                new() { ProductId = 3, Name = "PowerMax 10000 Power Bank", SKU = "PM-PB-10K", Category = "Accessories", Price = 79.99m, ImageUrl = "/placeholder-product.jpg" },
                new() { ProductId = 4, Name = "UltraBook Pro X13", SKU = "UB-X13-2023", Category = "Computers", Price = 1299.99m, ImageUrl = "/placeholder-product.jpg" },
                new() { ProductId = 5, Name = "ProShot X7 Camera", SKU = "PS-X7-CAM", Category = "Photography", Price = 899.99m, ImageUrl = "/placeholder-product.jpg" }
            };
        }

        private List<YearlySalesDataDto> GenerateMockYearlySalesData(int productId, int? startYear, int? endYear)
        {
            var currentYear = DateTime.Now.Year;
            var start = startYear ?? currentYear - 4;
            var end = endYear ?? currentYear;
            
            var salesData = new List<YearlySalesDataDto>();
            var random = new Random(productId); // Seed with product ID for consistent data
            
            for (int year = start; year <= end; year++)
            {
                var baseOrders = 1000 + random.Next(500, 2000);
                var growth = (double)(year - start) / (end - start);
                var orders = (int)(baseOrders * (1 + growth * 0.5));
                
                var avgPrice = 100 + random.Next(50, 300) + (year - start) * 10;
                var quantity = orders + random.Next(500, 1500);
                var revenue = quantity * (decimal)avgPrice;
                
                salesData.Add(new YearlySalesDataDto
                {
                    Year = year,
                    OrderCount = orders,
                    TotalQuantitySold = quantity,
                    TotalRevenue = revenue,
                    AverageSellingPrice = (decimal)avgPrice,
                    GrowthPercentage = year == start ? 0 : random.Next(-10, 35)
                });
            }
            
            return salesData;
        }

        private SalesPerformanceSummaryDto CalculatePerformanceSummary(List<YearlySalesDataDto> yearlySales)
        {
            if (!yearlySales.Any()) 
                return new SalesPerformanceSummaryDto();
            
            var firstYear = yearlySales.First();
            var lastYear = yearlySales.Last();
            
            var ordersGrowth = firstYear.OrderCount > 0 ? 
                ((decimal)(lastYear.OrderCount - firstYear.OrderCount) / firstYear.OrderCount) * 100 : 0;
            
            var revenueGrowth = firstYear.TotalRevenue > 0 ? 
                ((lastYear.TotalRevenue - firstYear.TotalRevenue) / firstYear.TotalRevenue) * 100 : 0;
            
            var unitsGrowth = firstYear.TotalQuantitySold > 0 ? 
                ((decimal)(lastYear.TotalQuantitySold - firstYear.TotalQuantitySold) / firstYear.TotalQuantitySold) * 100 : 0;
            
            var priceChange = firstYear.AverageSellingPrice > 0 ? 
                ((lastYear.AverageSellingPrice - firstYear.AverageSellingPrice) / firstYear.AverageSellingPrice) * 100 : 0;
            
            return new SalesPerformanceSummaryDto
            {
                OrdersGrowth = ordersGrowth,
                RevenueGrowth = revenueGrowth,
                UnitsGrowth = unitsGrowth,
                PriceChange = priceChange,
                TotalOrders = yearlySales.Sum(y => y.OrderCount),
                TotalUnitsSold = yearlySales.Sum(y => y.TotalQuantitySold),
                TotalRevenue = yearlySales.Sum(y => y.TotalRevenue),
                OverallAveragePrice = yearlySales.Average(y => y.AverageSellingPrice)
            };
        }
    }
}

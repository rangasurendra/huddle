using Microsoft.AspNetCore.Mvc;
using Huddle.Models;
using Huddle.Services;

namespace Huddle.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductAnalyticsController : ControllerBase
    {
        private readonly IProductAnalyticsService _productAnalyticsService;
        private readonly ILogger<ProductAnalyticsController> _logger;

        public ProductAnalyticsController(
            IProductAnalyticsService productAnalyticsService,
            ILogger<ProductAnalyticsController> logger)
        {
            _productAnalyticsService = productAnalyticsService;
            _logger = logger;
        }

        /// <summary>
        /// Get annual sales trends for a selected product
        /// </summary>
        /// <param name="request">Product analytics request parameters</param>
        /// <returns>Product sales analytics data including yearly trends</returns>
        [HttpPost("sales-analytics")]
        public async Task<ActionResult<ProductSalesAnalyticsResponseDto>> GetProductSalesAnalytics(
            ProductSalesAnalyticsRequestDto request)
        {
            try
            {
                _logger.LogInformation("Getting sales analytics for product {ProductId} from {StartYear} to {EndYear}", 
                    request.ProductId, request.StartYear, request.EndYear);
                
                var result = await _productAnalyticsService.GetProductSalesAnalyticsAsync(request);
                
                _logger.LogInformation("Successfully retrieved sales analytics for product {ProductId}", request.ProductId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting sales analytics for product {ProductId}", request.ProductId);
                return StatusCode(500, "An error occurred while processing your request");
            }
        }

        /// <summary>
        /// Search for products to analyze
        /// </summary>
        /// <param name="request">Product search parameters</param>
        /// <returns>List of products matching search criteria</returns>
        [HttpPost("search-products")]
        public async Task<ActionResult<ProductSearchResponseDto>> SearchProducts(
            ProductSearchRequestDto request)
        {
            try
            {
                _logger.LogInformation("Searching products with term: '{SearchTerm}', Category: '{Category}', Page: {PageNumber}, Size: {PageSize}", 
                    request.SearchTerm, request.Category, request.PageNumber, request.PageSize);
                
                var result = await _productAnalyticsService.SearchProductsAsync(request);
                
                _logger.LogInformation("Found {ProductCount} products for search term '{SearchTerm}'", 
                    result.Products.Count, request.SearchTerm);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error searching products with term '{SearchTerm}'", request.SearchTerm);
                return StatusCode(500, "An error occurred while searching products");
            }
        }

        /// <summary>
        /// Get product summary by ID
        /// </summary>
        /// <param name="productId">Product identifier</param>
        /// <returns>Product summary information</returns>
        [HttpGet("products/{productId}")]
        public async Task<ActionResult<ProductSummaryDto>> GetProductSummary(int productId)
        {
            try
            {
                _logger.LogInformation("Getting product summary for product {ProductId}", productId);
                
                var result = await _productAnalyticsService.GetProductSummaryAsync(productId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting product summary for product {ProductId}", productId);
                return StatusCode(500, "An error occurred while processing your request");
            }
        }
    }
}

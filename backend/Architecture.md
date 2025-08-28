# Huddle Framework Template - Architecture Documentation

## Overview

The Huddle Framework Template is a .NET 9.0 based web API solution following a clean, layered architecture pattern. It implements a Controller-Service-Model pattern with clear separation of concerns and request-response handling.

## Architecture Pattern

This template follows the **Layered Architecture** pattern with three distinct layers:

1. **Presentation Layer** (`Huddle.API`)
2. **Business Logic Layer** (`Huddle.Services`)
3. **Data Model Layer** (`Huddle.Models`)

## Project Structure

```
Huddle.API.sln
├── Huddle.API/          # Web API Layer (Controllers, Program.cs, Configuration)
├── Huddle.Services/     # Business Logic Layer (Services, Business Rules)
└── Huddle.Models/       # Data Models Layer (DTOs, Entities, Models)
```

## Layer Responsibilities

### 1. Huddle.API (Presentation Layer)

**Purpose**: Handles HTTP requests and responses, API configuration, and dependency injection setup.

**Responsibilities**:
- HTTP request routing and handling
- Request validation and response formatting
- Authentication and authorization
- API documentation (OpenAPI/Swagger)
- Dependency injection configuration
- Middleware configuration

**Key Components**:
- `Controllers/` - API controllers implementing endpoints
- `Program.cs` - Application startup and configuration
- `appsettings.json` - Configuration files
- Middleware pipeline configuration

**Dependencies**:
- References `Huddle.Services` for business logic
- References `Huddle.Models` for DTOs and models

### 2. Huddle.Services (Business Logic Layer)

**Purpose**: Contains all business logic, rules, and orchestration between data and presentation layers.

**Responsibilities**:
- Business rule implementation
- Data validation and transformation
- Service orchestration
- External service integration
- Domain logic encapsulation

**Key Components**:
- Service interfaces and implementations
- Business logic validation
- Data transformation logic
- External API integrations

**Dependencies**:
- References `Huddle.Models` for data models
- No dependency on `Huddle.API` (maintains separation)

### 3. Huddle.Models (Data Model Layer)

**Purpose**: Defines data structures, DTOs, and entities used throughout the application.

**Responsibilities**:
- Data model definitions
- Request/Response DTOs
- Entity models
- Validation attributes
- Data contracts

**Key Components**:
- Request DTOs
- Response DTOs
- Entity models
- Enums and constants

**Dependencies**:
- No dependencies on other projects (pure data models)

## Request-Response Flow

```
HTTP Request
    ↓
[Controller] ← Validates request, maps DTOs
    ↓
[Service] ← Processes business logic
    ↓
[Models] ← Data transformation & validation
    ↓
[Service] ← Returns processed data
    ↓
[Controller] ← Maps to response DTOs
    ↓
HTTP Response
```

### Flow Description:

1. **HTTP Request**: Client sends request to API endpoint
2. **Controller**: 
   - Receives HTTP request
   - Validates request parameters and body
   - Maps request to appropriate DTOs
   - Calls corresponding service method
3. **Service**: 
   - Implements business logic
   - Validates business rules
   - Processes data transformations
   - Returns results or errors
4. **Controller**: 
   - Receives service response
   - Maps service response to response DTOs
   - Returns HTTP response with appropriate status codes

## Design Principles

### 1. Separation of Concerns
- Each layer has distinct responsibilities
- No cross-cutting concerns between layers
- Clear boundaries between presentation, business, and data layers

### 2. Dependency Inversion
- High-level modules don't depend on low-level modules
- Both depend on abstractions (interfaces)
- Services are injected via dependency injection

### 3. Single Responsibility
- Each class and method has one reason to change
- Controllers handle HTTP concerns only
- Services handle business logic only
- Models define data structures only

### 4. Open/Closed Principle
- Open for extension through interfaces
- Closed for modification through abstraction

## Technology Stack

- **.NET 9.0**: Latest .NET framework
- **ASP.NET Core**: Web API framework
- **OpenAPI**: API documentation and specification
- **Dependency Injection**: Built-in .NET DI container

## Configuration

### appsettings.json Structure
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

### Program.cs Configuration
- Service registration
- Middleware pipeline setup
- OpenAPI configuration for development
- HTTPS redirection
- Authorization setup

## Best Practices

### 1. Controller Design
- Keep controllers thin - delegate to services
- Use appropriate HTTP status codes
- Implement proper error handling
- Use async/await for I/O operations
- Validate input using model validation

### 2. Service Design
- Implement interfaces for testability
- Use dependency injection for external dependencies
- Handle exceptions appropriately
- Return meaningful results or errors
- Keep methods focused and cohesive

### 3. Model Design
- Use DTOs for API contracts
- Implement validation attributes
- Keep models simple and focused
- Use appropriate data types
- Avoid business logic in models

### 4. Error Handling
- Implement global exception handling
- Return consistent error responses
- Log errors appropriately
- Use problem details for error responses

## Example Implementation

### Controller Example
```csharp
[ApiController]
[Route("api/[controller]")]
public class ExampleController : ControllerBase
{
    private readonly IExampleService _exampleService;

    public ExampleController(IExampleService exampleService)
    {
        _exampleService = exampleService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ExampleResponseDto>> GetExample(int id)
    {
        var result = await _exampleService.GetExampleAsync(id);
        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<ExampleResponseDto>> CreateExample(
        ExampleRequestDto request)
    {
        var result = await _exampleService.CreateExampleAsync(request);
        return CreatedAtAction(nameof(GetExample), 
            new { id = result.Id }, result);
    }
}
```

### Service Example
```csharp
public interface IExampleService
{
    Task<ExampleResponseDto> GetExampleAsync(int id);
    Task<ExampleResponseDto> CreateExampleAsync(ExampleRequestDto request);
}

public class ExampleService : IExampleService
{
    public async Task<ExampleResponseDto> GetExampleAsync(int id)
    {
        // Business logic implementation
        // Data validation
        // External service calls
        // Return mapped response
    }

    public async Task<ExampleResponseDto> CreateExampleAsync(
        ExampleRequestDto request)
    {
        // Validation
        // Business logic
        // Data persistence
        // Return created entity
    }
}
```

### Model Examples
```csharp
public class ExampleRequestDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}

public class ExampleResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
```

## Future Considerations

### Potential Enhancements
1. **Data Layer**: Add `Huddle.Data` for repository pattern and data access
2. **Infrastructure**: Add `Huddle.Infrastructure` for external integrations
3. **Domain**: Add `Huddle.Domain` for domain entities and business rules
4. **Testing**: Add unit and integration test projects
5. **Logging**: Implement structured logging with Serilog
6. **Caching**: Add caching layer for performance optimization
7. **Authentication**: Implement JWT or OAuth authentication
8. **Database**: Add Entity Framework Core for data persistence

### Scalability Considerations
- Add message queues for asynchronous processing
- Implement distributed caching for multi-instance deployments
- Add health checks and monitoring
- Implement rate limiting and throttling

## Conclusion

The Huddle Framework Template provides a solid foundation for building scalable .NET web APIs following established architectural patterns. The clean separation of concerns, dependency injection, and adherence to SOLID principles make it maintainable and testable while allowing for future growth and enhancement.

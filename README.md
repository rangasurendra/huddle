# Huddle - Product Sales Analytics Platform

A modern full-stack application for analyzing product sales trends with interactive visualizations. Built with .NET 9 backend API and Next.js frontend following clean architecture principles.

## 🚀 Features

- **Annual Sales Trends Analysis**: View detailed sales metrics by year for any product
- **Interactive Charts**: D3-powered visualizations with bar and line chart options
- **Product Search**: Search and select products from catalog
- **Performance Metrics**: Year-over-year growth analysis and insights
- **Responsive Design**: Modern UI built with Atomic Design methodology
- **API Documentation**: Swagger UI for API exploration and testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your machine:

### Required Software

1. **Git** - [Download](https://git-scm.com/downloads)
2. **.NET 9 SDK** - [Download](https://dotnet.microsoft.com/download/dotnet/9.0)
3. **Node.js 18+** - [Download](https://nodejs.org/) (LTS version recommended)
4. **pnpm** - Package manager for frontend dependencies

### Installing Prerequisites

#### 1. Install .NET 9 SDK

**Windows:**
```bash
# Download and install from: https://dotnet.microsoft.com/download/dotnet/9.0
# Or use winget:
winget install Microsoft.DotNet.SDK.9
```

**macOS:**
```bash
# Using Homebrew:
brew install --cask dotnet
```

**Linux (Ubuntu/Debian):**
```bash
# Add Microsoft package repository
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb

# Install .NET SDK
sudo apt-get update
sudo apt-get install -y dotnet-sdk-9.0
```

#### 2. Install Node.js and pnpm

**Windows/macOS/Linux:**
```bash
# Install Node.js from https://nodejs.org/
# Then install pnpm globally:
npm install -g pnpm
```

#### 3. Verify Installations

```bash
# Check .NET version
dotnet --version
# Should output: 9.x.x

# Check Node.js version
node --version
# Should output: v18.x.x or higher

# Check pnpm version
pnpm --version
# Should output: 8.x.x or higher
```

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rangasurendra/huddle.git
cd huddle
```

### 2. Backend Setup (.NET API)

```bash
# Navigate to backend directory
cd backend

# Restore NuGet packages
dotnet restore

# Build the solution
dotnet build

# Run the API server
dotnet run --project Huddle.API
```

The backend API will be available at:
- **HTTP**: `http://localhost:5165`
- **Swagger UI**: `http://localhost:5165/swagger`

### 3. Frontend Setup (Next.js)

Open a new terminal window/tab:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The frontend application will be available at:
- **Local**: `http://localhost:3000`
- **Sales Analytics**: `http://localhost:3000/sales-analytics`

## 🏗️ Project Structure

```
huddle/
├── backend/                    # .NET 9 API Backend
│   ├── Huddle.API/            # Web API Layer
│   │   ├── Controllers/       # API Controllers
│   │   ├── Program.cs         # Application startup
│   │   └── Properties/        # Launch settings
│   ├── Huddle.Services/       # Business Logic Layer
│   │   └── Class1.cs          # Service implementations
│   ├── Huddle.Models/         # Data Models Layer
│   │   └── Class1.cs          # DTOs and models
│   └── Huddle.sln             # Solution file
├── frontend/                   # Next.js 15 Frontend
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Dashboard page
│   │   └── sales-analytics/   # Sales analytics page
│   ├── components/            # React Components (Atomic Design)
│   │   ├── atoms/             # Basic UI elements
│   │   ├── molecules/         # Component groups
│   │   ├── organisms/         # Complex sections
│   │   └── templates/         # Page layouts
│   ├── lib/                   # Utilities and API
│   │   └── api/               # API integration
│   ├── hooks/                 # Custom React hooks
│   └── public/                # Static assets
└── README.md                  # This file
```

## 🎯 Usage

### Accessing the Sales Analytics Dashboard

1. **Start both servers** (backend and frontend)
2. **Open your browser** and navigate to `http://localhost:3000/sales-analytics`
3. **Select a product** from the sample products or use the search functionality
4. **View analytics** including:
   - Order trends by year
   - Total quantity sold over time
   - Revenue analysis
   - Average selling price trends
   - Performance summary and insights

### API Documentation

The API documentation is available via Swagger UI at `http://localhost:5165/swagger` when the backend is running.

**Available Endpoints:**
- `POST /api/ProductAnalytics/sales-analytics` - Get product sales analytics
- `POST /api/ProductAnalytics/search-products` - Search products
- `GET /api/ProductAnalytics/products/{id}` - Get product details

## 🔧 Development

### Backend Development

```bash
cd backend

# Watch for changes and auto-reload
dotnet watch run --project Huddle.API

# Run tests (when available)
dotnet test

# Clean build artifacts
dotnet clean
```

### Frontend Development

```bash
cd frontend

# Development server with hot reload
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## 🏛️ Architecture

### Backend Architecture
- **Pattern**: Clean Architecture with Controller-Service-Model layers
- **Framework**: ASP.NET Core 9.0 Web API
- **Documentation**: OpenAPI/Swagger
- **CORS**: Configured for frontend integration

### Frontend Architecture
- **Pattern**: Atomic Design methodology
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: D3.js for interactive data visualizations
- **Type Safety**: Full TypeScript integration

## 📊 Features in Detail

### Sales Analytics Dashboard
- **Product Selection**: Search and select from product catalog
- **Interactive Charts**: Toggle between bar and line chart views
- **Metrics Tracking**:
  - Number of orders per year
  - Total quantity sold
  - Revenue trends
  - Average selling price analysis
- **Performance Summary**: Year-over-year growth calculations
- **Insights**: AI-generated performance insights

### Technical Features
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live data fetching from API
- **Error Handling**: Comprehensive error states and loading indicators
- **Accessibility**: ARIA compliant components

## 🔗 API Endpoints

### Product Analytics

#### Get Sales Analytics
```http
POST /api/ProductAnalytics/sales-analytics
Content-Type: application/json

{
  "productId": 1,
  "startYear": 2019,
  "endYear": 2023
}
```

#### Search Products
```http
POST /api/ProductAnalytics/search-products
Content-Type: application/json

{
  "searchTerm": "headphones",
  "pageSize": 20,
  "pageNumber": 1
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

#### Backend Issues

**Port Already in Use:**
```bash
# Kill process using port 5165
netstat -ano | findstr :5165
taskkill /PID <process_id> /F
```

**Build Errors:**
```bash
# Clean and rebuild
dotnet clean
dotnet restore
dotnet build
```

#### Frontend Issues

**Node/npm Version Issues:**
```bash
# Check Node version
node --version
# Update to Node 18+ if needed
```

**Package Installation Issues:**
```bash
# Clear pnpm cache
pnpm store prune
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### CORS Issues

If you encounter CORS errors:
1. Ensure the backend is running on `http://localhost:5165`
2. Check that the frontend API URL is correctly set in `.env.local`
3. Verify CORS policy in `backend/Huddle.API/Program.cs`

### Getting Help

- Check the [Issues](https://github.com/rangasurendra/huddle/issues) page for known problems
- Create a new issue if you encounter a bug
- Refer to the architecture documentation in `backend/Architecture.md` and `frontend/ARCHITECTURE.md`

## 📚 Additional Resources

- [.NET 9 Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [D3.js Documentation](https://d3js.org/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
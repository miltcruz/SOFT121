
# SOFT121

An ASP.NET Core web application with a modern JavaScript frontend (`client-app`) and a REST API (`Controllers`). Designed for SOFT 121 course labs and demos.

## 📂 Project Structure

- `Controllers/` — ASP.NET Core API controllers (e.g., `WeatherForecastController`)
- `Infrastructure/` — cross‑cutting concerns (e.g., DI, services, configuration) *(if used)*
- `Models/` — domain and DTO classes
- `client-app/` — front-end SPA (React or similar)
- `Program.cs` — entry point configuring web host, services, middleware
- `SOFT121.csproj` / `SOFT121.sln` — project and solution
- `WeatherForecast.cs` — sample model used by the template API
- `.vscode/` — editor/dev environment config
- `Properties/` — launch profiles and app metadata
- `SOFT121.http` — HTTP test requests for local debugging

> This overview is derived from the repository’s file listing and language mix (C#, JavaScript, HTML, CSS). [1](https://github.com/miltcruz/SOFT121)

---

## 🚀 Getting Started (Development)

### Prerequisites
- **.NET SDK** (version matching `TargetFramework` in `SOFT121.csproj`)
- **Node.js + npm** (for `client-app`, if applicable)
- An IDE: **Visual Studio**, **VS Code**, or **Rider**

### 1) Backend (ASP.NET Core)
```bash
# from repo root
dotnet restore
dotnet run
```

### 2) Frontend (client-app)
```bash
# from repo root
cd client-app
npm install
npm start
```

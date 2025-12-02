using SOFT121.Infrastructure.Interfaces;
using SOFT121.Infrastructure.Repositories;
var builder = WebApplication.CreateBuilder(args);


// Load appsettings.Local.json
builder.Configuration.AddJsonFile("appsettings.Local.json", optional: true, reloadOnChange: true);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// Register IDataRepositoryFactory
builder.Services.AddSingleton<IDataRepositoryFactory, DataRepositoryFactory>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// CORS: allow any origin in Development; restrict to the React site in Production
if (app.Environment.IsDevelopment())
{
    app.UseCors(policy =>
    {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
}
else
{
    // Only allow the specific production origin
    app.UseCors(policy =>
    {
        policy.WithOrigins("http://site");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

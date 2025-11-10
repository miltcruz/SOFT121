using SOFT121.Infrastructure.Interfaces;

namespace SOFT121.Infrastructure.Repositories;

public class DataRepositoryFactory : IDataRepositoryFactory
{

    private readonly IConfiguration _configuration;

    public DataRepositoryFactory(IConfiguration configuration)
    {
        _configuration = configuration;
    }


    public IDataRepository Create(string databaseName)
    {
        var connectionString = _configuration.GetConnectionString(databaseName);

        if (string.IsNullOrEmpty(connectionString))
            throw new ArgumentException($"Connection string '{databaseName}' not found.");

        var dbProvider = _configuration["DbProvider"] ?? "SqlServer"; // Default to SqlServer if not specified

        switch (dbProvider.Trim().ToLower())
        {
            case "mysql":
                return new MySqlRepository(connectionString);
            case "sqlserver":
                return new SqlServerRepository(connectionString);
            default:
                throw new NotSupportedException($"Database provider '{dbProvider}' is not supported.");
        }
    }
}

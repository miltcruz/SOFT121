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

        return new SqlServerRepository(connectionString);
    }
}



using System.Data;
using MySqlConnector;
using SOFT121.Infrastructure.Interfaces;

namespace SOFT121.Infrastructure.Repositories;

public class MySqlRepository : IDataRepository
{
    private readonly string _connectionString = string.Empty;

    public MySqlRepository(IConfiguration config)
    {
        if (config == null) throw new System.ArgumentNullException(nameof(config));
        _connectionString = config.GetConnectionString("MySqlConnection") ?? string.Empty;
    }

    public async Task<IEnumerable<string>> GetDataAsync(string storedProc)
    {
        var results = new List<string>();

        using (var connection = new MySqlConnection(_connectionString))
        {
            using (var command = new MySqlCommand(storedProc, connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                await connection.OpenAsync();

                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        results.Add(reader.GetString(0));
                    }
                }
            }
        }

        return results;
    }
}
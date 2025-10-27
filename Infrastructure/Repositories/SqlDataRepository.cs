using Microsoft.Data.SqlClient;
using System.Data;
using SOFT121.Infrastructure.Interfaces;

namespace SOFT121.Infrastructure.Repositories;

public class SqlDataRepository : IDataRepository
{
    private readonly string _connectionString = string.Empty;

    public SqlDataRepository(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("DefaultConnection") ?? string.Empty;
    }

    public async Task<IEnumerable<string>> GetDataAsync(string storedProc)
    {
        var results = new List<string>();

        using (var connection = new SqlConnection(_connectionString))
        {
            using (var command = new SqlCommand(storedProc, connection))
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
namespace SOFT121.Infrastructure.Interfaces;

public interface IDataRepository
{
    /// GetDataAsync without parameters
    /// <param name="storedProc">The stored procedure name</param>
    /// <returns>A collection of rows as dictionaries</returns>
    /// <example>
    /// // Call: await repo.GetDataAsync("StoredProcName");
    /// </example>
    Task<IEnumerable<IDictionary<string, object?>>> GetDataAsync(string storedProc);

    /// GetDataAsync with parameters
    /// <param name="storedProc">The stored procedure name</param>
    /// <param name="parameters">A dictionary of parameter names and values</param>
    /// <returns>A collection of rows as dictionaries</returns>
    /// <example>
    /// // Call without parameters: await repo.GetDataAsync("StoredProcName", null);
    /// // Call with parameters: var parameters = new Dictionary<string, object?> { { "CategoryId", 5 }, { "@IsActive", true } };
    /// // await repo.GetDataAsync("StoredProcName", parameters);
    /// </example>
    Task<IEnumerable<IDictionary<string, object?>>> GetDataAsync(string storedProc, IDictionary<string, object?> parameters);
}

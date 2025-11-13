namespace SOFT121.Infrastructure.Interfaces;

public interface IDataRepositoryFactory
{
    /// <summary>
    /// Creates an instance of IDataRepository based on the provided connection string.
    /// </summary>
    /// <param name="connectionString"></param>
    /// <returns>Repository instance</returns>
    IDataRepository Create(string connectionString);
}

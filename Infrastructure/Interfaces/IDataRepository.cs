namespace SOFT121.Infrastructure.Interfaces;

public interface IDataRepository
{
    Task<IEnumerable<string>> GetDataAsync(string storedProc);
}
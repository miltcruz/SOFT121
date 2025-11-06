namespace SOFT121.Infrastructure.Interfaces;

public interface IDataRepositoryFactory
{
    IDataRepository Create(string connectionString);
}

using server.Model;

namespace server.Service;

public interface IPerformanceRepository
{
    Task<List<PerformanceModel>> GetAll();

    Task<PerformanceModel?> GetByName(string name);

    Task<PerformanceModel?> GetById(int id);

    Task Add(PerformanceModel performance);

    Task Delete(PerformanceModel performance);

    Task<PerformanceModel> Update(int id, PerformanceModel performance);
    Task<List<PerformanceModel>> GetLatest(int count);
    Task<List<PerformanceModel>> GetTopSales(int count);

}
using server.Model;

namespace server.Service;

public interface IPerformanceRepository
{
    Task<IEnumerable<PerformanceModel>> GetAll();

    Task<PerformanceModel?> GetByName(string name);

    Task<PerformanceModel?> GetById(int id);

    void Add(PerformanceModel performance);

    void Delete(PerformanceModel performance);

    Task<PerformanceModel> Update(int id, PerformanceModel performance);
}
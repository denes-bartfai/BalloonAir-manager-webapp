using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Model;

namespace server.Service;

public class PerformanceRepository : IPerformanceRepository
{
    private readonly BalloonAirContext _context;

    public PerformanceRepository(BalloonAirContext context)
    {
        _context = context;
    }
    
    public Task<List<PerformanceModel>> GetAll()
    {
        return _context.Performance.Include(p=> p.Event).ToListAsync();
    }

    public Task<PerformanceModel?> GetByName(string name)
    {
        return _context.Performance.Include(p=> p.Event).SingleOrDefaultAsync(e => e.Event == name);
    }

    public Task<PerformanceModel?> GetById(int id)
    {
        return _context.Performance.Include(p => p.Event).SingleOrDefaultAsync(e => e.Id == id);
    }

    public async Task Add(PerformanceModel performance)
    {
        _context.Add(performance);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(PerformanceModel performance)
    {
        _context.Remove(performance);
        await _context.SaveChangesAsync();
    }

    public async Task<PerformanceModel> Update(int id, PerformanceModel performance)
    {
        var performanceToUpdate = await _context.Performance.FindAsync(id);

        if (performanceToUpdate == null)
        {
            return null;
        }

        performanceToUpdate.Date = performance.Date;
        performanceToUpdate.State = performance.State;
        performanceToUpdate.City = performance.City;
        performanceToUpdate.Event = performance.Event;
        performanceToUpdate.Sales = performance.Sales;
        performanceToUpdate.Comment = performance.Comment;
        await _context.SaveChangesAsync();
        
        return performanceToUpdate;
    }
}
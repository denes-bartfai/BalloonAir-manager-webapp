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
        return _context.Performance.ToListAsync();
    }

    public Task<PerformanceModel?> GetByName(string name)
    {
        return _context.Performance.FirstOrDefaultAsync(e => e.Event == name);
    }

    public Task<PerformanceModel?> GetById(int id)
    {
        return _context.Performance.SingleOrDefaultAsync(e => e.Id == id);
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

    public async Task<List<PerformanceModel>> GetLatest(int count = 5)
    {
        return await _context.Performance.OrderByDescending(p => p.Date).Take(count).ToListAsync();
    }

    public async Task<List<PerformanceModel>> GetTopSales(int count = 5)
    {
        int currentYear = DateTime.Now.Year;
        return await _context.Performance
            .Where(p => p.Date.Year == currentYear)
            .OrderByDescending(p => p.Sales)
            .Take(count).ToListAsync();
    }
}
using Microsoft.EntityFrameworkCore;
using server.Model;

namespace server.Data;

public class BalloonAirContext : DbContext
{
    public BalloonAirContext(DbContextOptions<BalloonAirContext> options) : base(options)
    {
    }
    public DbSet<PerformanceModel> Performance { get; set; }
    public DbSet<ContactModel> Contact { get; set; }
}

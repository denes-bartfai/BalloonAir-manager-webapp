using System.ComponentModel.DataAnnotations;

namespace server.Model;

public class PerformanceModel
{
    public int Id { get; init; }
    public DateTime  Date { get; set; }
    public string State { get; set; }
    public string City { get; set; }
    public string Event { get; set; }
    public int Sales { get; set; }
    public string Comment { get; set; }
}
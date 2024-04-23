using System.ComponentModel.DataAnnotations;

namespace server.Model;

public class PerformanceModel
{
    public int Id { get; init; }
    
    [Required]
    public DateTime  Date { get; set; }

    public int Year => Date.Year;
    public int Month => Date.Month;
    public int Day => Date.Day;
    
    [Required]
    public string State { get; set; }
    [Required]
    public string City { get; set; }
    [Required]
    public string Event { get; set; }
    [Required]
    public int Sales { get; set; }
    public string Comment { get; set; }
}
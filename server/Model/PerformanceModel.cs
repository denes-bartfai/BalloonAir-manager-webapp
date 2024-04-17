namespace server.Model;

public class PerformanceModel
{
    public int Id { get; init; }
    public DateTime  Date { get; init; }
    public string State { get; init; }
    public string City { get; init; }
    public string Event { get; init; }
    public decimal Sales { get; init; }
    public string Comment { get; init; }
}
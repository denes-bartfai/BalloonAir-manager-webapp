using System.ComponentModel.DataAnnotations;

namespace server.Model;

public class ContactModel
{
    public int Id { get; init; }
    
    public string City { get; set; }

    private string _company;

    public string Company
    {
        get => string.IsNullOrEmpty(_company) ? $"{City} Önkormányzat" : _company;
        set => _company = value;
    }

    private string _position = "ügyintéző";

    public string Position
    {
        get => _position;
        set => _position = value?.ToLowerInvariant() ?? "ügyintéző";
    }
    
    public string Name { get; set; }
    
    [EmailAddress]
    public string Email { get; set; }
    
    [Phone]
    public string PhoneNumber { get; set; }
}
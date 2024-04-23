using System.ComponentModel.DataAnnotations;

namespace server.Model;

public class ContactModel
{
    public int Id { get; init; }
    
    [Required]
    public string City { get; set; }

    [Required]
    public string Company { get; set; }

    private string _position = "ügyintéző";

    public string Position
    {
        get => _position;
        set => _position = value?.ToLowerInvariant() ?? "ügyintéző";
    }
    
    [Required]
    public string Name { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [Phone]
    public string PhoneNumber { get; set; }

    public ContactModel()
    {
        Company = $"{City} Önkormányzat";
    }
}
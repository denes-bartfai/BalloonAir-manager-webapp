using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Model;

namespace server.Service;

public class ContactRepository : IContactRepository
{
    private readonly BalloonAirContext _context;

    public ContactRepository(BalloonAirContext context)
    {
        _context = context;
    }
    
    public Task<List<ContactModel>> GetAll()
    {
        return _context.Contact.ToListAsync();
    }

    public Task<ContactModel?> GetByName(string name)
    {
        return _context.Contact.SingleOrDefaultAsync(c => c.Name == name);
    }

    public Task<ContactModel?> GetById(int id)
    {
        return _context.Contact.SingleOrDefaultAsync(c => c.Id == id);
    }

    public async Task Add(ContactModel contact)
    {
        _context.Add(contact);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(ContactModel contact)
    {
        _context.Remove(contact);
        await _context.SaveChangesAsync();
    }

    public async Task<ContactModel> Update(int id, ContactModel contact)
    {
        var contactToUpdate = await _context.Contact.FindAsync(id);

        if (contactToUpdate == null)
        {
            return null;
        }

        contactToUpdate.City = contact.City;
        contactToUpdate.Company = contact.Company;
        contactToUpdate.Position = contact.Position;
        contactToUpdate.Name = contact.Name;
        contactToUpdate.Email = contact.Email;
        contactToUpdate.PhoneNumber = contact.PhoneNumber;
        await _context.SaveChangesAsync();

        return contactToUpdate;
    }
    
    
}
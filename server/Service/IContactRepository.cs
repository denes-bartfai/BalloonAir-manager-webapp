using server.Model;

namespace server.Service;

public interface IContactRepository
{
    Task<List<ContactModel>> GetAll();

    Task<ContactModel?> GetByName(string name);

    Task<ContactModel?> GetById(int id);

    Task Add(ContactModel contact);

    Task Delete(ContactModel contact);

    Task<ContactModel> Update(int id, ContactModel contact);
}
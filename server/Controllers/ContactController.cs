using Microsoft.AspNetCore.Mvc;
using server.Model;
using server.Service;

namespace server.Controllers;

[ApiController]
[Route("/api/[controller]/[action]")]
public class ContactController : ControllerBase
{
     private readonly ILogger<ContactController> _logger;
    private readonly IContactRepository _contactRepository;

    public ContactController(ILogger<ContactController> logger, IContactRepository contactRepository)
    {
        _logger = logger;
        _contactRepository = contactRepository;
    }
    
    [HttpGet]
    public async Task<ActionResult> GetAllContact()
    {
        try
        {
            var contact = await _contactRepository.GetAll();

            return Ok(contact);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while fetching all contact.");
            return StatusCode(500, "An error occurred while fetching all contact.");
        }
        
    }

    [HttpGet]
    public async Task<ActionResult> GetContactByName(string contactName)
    {
        try
        {
            var contact = await _contactRepository.GetByName(contactName);

            if (contact == null)
            {
                return NotFound($"Contact {contactName} not found");
            }

            return Ok(contact);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while fetching contact by name: {contactName}");
            return StatusCode(500, "An error occurred while fetching contact by name.");
        }
    }
    
    [HttpGet]
    public async Task<ActionResult> GetContactById (int contactId)
    {
        try
        {
            var contact =await _contactRepository.GetById(contactId);

            if (contact == null)
            {
                return NotFound($"Contact {contactId} not found");
            }

            return Ok(contact);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while fetching contact by ID: {contactId}");
            return StatusCode(500, "An error occurred while fetching contact by ID.");
        }
    }

    [HttpPost]
    public async Task<ActionResult> AddContact(ContactModel contact)
    {
        try
        {
            if (contact == null)
            {
                return BadRequest($"Please provide valid contact data.");
            }

            await _contactRepository.Add(contact);
            return CreatedAtAction(nameof(GetContactById), new { contactId = contact.Id }, contact);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding contact.");
            return StatusCode(500, "An error occurred while adding contact.");
        }
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteContact(string contactName)
    {
        try
        {
            var contact = await _contactRepository.GetByName(contactName);

            if (contact == null)
            {
                return NotFound($"Contact {contactName} not found");
            }

            await _contactRepository.Delete(contact);
            return Ok($"Contact {contactName} has been deleted.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while deleting contact: {contactName}");
            return StatusCode(500, "An error occurred while deleting contact.");
        }
    }

    [HttpPatch]
    public async Task<ActionResult> PatchContact(int id, ContactModel contactModel)
    {
        try
        {
            var updatedContact = await _contactRepository.Update(id, contactModel);
            if (updatedContact == null)
            {
                return NotFound($"Contact with ID{id} not found");
            }

            return Ok(updatedContact);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while updating contact with ID: {id}");
            return StatusCode(500, "An error occurred while updating contact.");
        }
    }
}
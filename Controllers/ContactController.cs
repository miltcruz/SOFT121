using Microsoft.AspNetCore.Mvc;
using SOFT121.Infrastructure.Interfaces;
using SOFT121.Models;

namespace SOFT121.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IDataRepository _repo;

        public ContactController(IDataRepositoryFactory factory)
        {
            _repo = factory.Create("AP");
        }

        [HttpGet(Name = "GetContacts")]
        public async Task<List<Contact>> GetAll()
        {
            var results = new List<Contact>();
            var rows = await _repo.GetDataAsync("GetAllContactUpdates");
            foreach (var row in rows)
            {
                var contact = new Contact
                {
                    VendorID = row["VendorID"] != DBNull.Value ? Convert.ToInt32(row["VendorID"]) : 0,
                    LastName = row["LastName"]?.ToString() ?? string.Empty,
                    FirstName = row["FirstName"]?.ToString() ?? string.Empty
                };

                results.Add(contact);
            }


            return results;
        }
    }
}

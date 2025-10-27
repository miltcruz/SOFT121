using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SOFT121.Models;

namespace SOFT121.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly SqlConnection _connection;

        public ContactController(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("AP");
            _connection = new SqlConnection(connectionString);
            _connection.Open();
        }

        [HttpGet(Name = "GetContacts")]
        public List<Contact> GetAll()
        {
            var contacts = new List<Contact>();
            using (SqlCommand command = new SqlCommand("GetAllContactUpdates", _connection))
            {
                command.CommandType = System.Data.CommandType.StoredProcedure;
                using (SqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        var contact = new Contact
                        {
                            VendorID = reader["VendorID"] != DBNull.Value ? Convert.ToInt32(reader["VendorID"]) : 0,
                            LastName = reader["LastName"]?.ToString() ?? string.Empty,
                            FirstName = reader["FirstName"]?.ToString() ?? string.Empty
                        };
                        contacts.Add(contact);
                    }
                }
            }
            return contacts;
        }
    }
}

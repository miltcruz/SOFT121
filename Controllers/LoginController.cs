using Microsoft.AspNetCore.Mvc;
using SOFT121.Models;

namespace SOFT121.Controllers;

[ApiController]
[Route("[controller]")]

public class LoginController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromBody] LoginRequest loginRequest)
    {
        if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            return BadRequest("Email and Password are required.");


        return Ok(new User
        {
            Id = 1,
            Email = loginRequest.Email,
            FirstName = "John",
            LastName = "Doe"
        });

    }
}

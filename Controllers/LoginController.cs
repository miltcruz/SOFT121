using Microsoft.AspNetCore.Mvc;
using SOFT121.Models;

namespace SOFT121.Controllers;

[ApiController]
[Route("[controller]")]

public class LoginController : ControllerBase
{
    [HttpPost]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            return BadRequest("Email and Password are required.");

        // Simulate authentication logic
        bool isAuthenticated = false;
        User user = new User();

        return Ok(new LoginResponse
        {
            IsAuthenticated = isAuthenticated,
            User = user
        });

    }
}

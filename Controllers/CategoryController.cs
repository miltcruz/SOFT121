using Microsoft.AspNetCore.Mvc;
using SOFT121.Infrastructure.Interfaces;
using SOFT121.Models;

namespace SOFT121.Controllers;

[ApiController]
[Route("[controller]")]

public class CategoryController : ControllerBase
{
    private readonly IDataRepository _repo;

    public CategoryController(IDataRepositoryFactory factory)
    {
        _repo = factory.Create("MyGuitarShop");
    }

    [HttpGet(Name = "GetCategories")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var rows = await _repo.GetDataAsync("GetAllCategories");
            var categories = rows.Select(MapRowToCategory).ToList();
            return Ok(categories);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    private static Category MapRowToCategory(IDictionary<string, object?> row)
    {
        return new Category
        {
            CategoryId = row["CategoryID"] != DBNull.Value ? Convert.ToInt32(row["CategoryID"]) : 0,
            CategoryName = row["CategoryName"]?.ToString() ?? string.Empty,
        };
    }
}

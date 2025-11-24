using Microsoft.AspNetCore.Mvc;
using SOFT121.Infrastructure.Interfaces;
using SOFT121.Models;

namespace SOFT121.Controllers;

[ApiController]
[Route("[controller]")]

public class ProductController : ControllerBase
{
    private readonly IDataRepository _repo;

    public ProductController(IDataRepositoryFactory factory)
    {
        _repo = factory.Create("MyGuitarShop");
    }

    [HttpGet(Name = "GetProducts")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var rows = await _repo.GetDataAsync("GetAllProducts");
            var products = rows.Select(MapRowToProduct).ToList();
            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}", Name = "GetProductById")]
    public async Task<IActionResult> GetById(int id)
    {
        var param = new Dictionary<string, object?> { { "ProductId", id } };
        var rows = await _repo.GetDataAsync("GetProduct", param);

        var product = rows.Select(MapRowToProduct).FirstOrDefault();
        return product == null ? NotFound() : Ok(product);
    }

    [HttpPost(Name = "CreateProduct")]
    public async Task<IActionResult> Create([FromBody] Product newProduct)
    {
        if (newProduct == null)
        {
            return BadRequest("Invalid product data.");
        }

        try
        {
            var param = new Dictionary<string, object?> {
                { "CategoryId", newProduct.CategoryId },
                { "ProductCode", newProduct.ProductCode },
                { "ProductName", newProduct.ProductName },
                { "Description", newProduct.Description },
                { "ListPrice", newProduct.ListPrice },
                { "DiscountPercent", newProduct.DiscountPercent }
            };

            var rows = await _repo.GetDataAsync("AddProduct", param);
            var createdRow = rows.Select(MapRowToProduct).FirstOrDefault();

            if (createdRow == null)
            {
                return StatusCode(500, "Failed to create product.");
            }
            return CreatedAtRoute("GetProductById", new { id = createdRow.ProductId }, createdRow);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}.");
        }
    }

    [HttpPut("{id}", Name = "UpdateProduct")]
    public async Task<IActionResult> Update(int id, [FromBody] Product updatedProduct)
    {
        if (updatedProduct == null) return BadRequest("Invalid product data.");

        try
        {
            var parameters = new Dictionary<string, object?>
            {
                { "ProductID", id },
                { "CategoryID", updatedProduct.CategoryId },
                { "ProductCode", updatedProduct.ProductCode },
                { "ProductName", updatedProduct.ProductName },
                { "Description", updatedProduct.Description },
                { "ListPrice", updatedProduct.ListPrice },
                { "DiscountPercent", updatedProduct.DiscountPercent }
            };

            await _repo.GetDataAsync("UpdateProduct", parameters);

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("{id}", Name = "DeleteProduct")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            // Call stored procedure to perform a soft delete (set IsActive = 0)
            var parameters = new Dictionary<string, object?>
            {
                { "ProductID", id },
                // Use Delete = 0 to indicate soft-delete (stored proc will set IsActive = 0)
                { "Delete", 0 }
            };

            await _repo.GetDataAsync("DeleteProduct", parameters);

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    private static Product MapRowToProduct(IDictionary<string, object?> row)
    {
        return new Product
        {
            ProductId = row["ProductID"] != DBNull.Value ? Convert.ToInt32(row["ProductID"]) : 0,
            CategoryId = row["CategoryID"] != DBNull.Value ? Convert.ToInt32(row["CategoryID"]) : 0,
            CategoryName = row["CategoryName"]?.ToString() ?? string.Empty,
            ProductCode = row["ProductCode"]?.ToString() ?? string.Empty,
            ProductName = row["ProductName"]?.ToString() ?? string.Empty,
            Description = row["Description"]?.ToString() ?? string.Empty,
            ListPrice = row["ListPrice"] != DBNull.Value ? Convert.ToDecimal(row["ListPrice"]) : 0.0m,
            DiscountPercent = row["DiscountPercent"] != DBNull.Value ? Convert.ToDecimal(row["DiscountPercent"]) : 0.0m
        };
    }
}

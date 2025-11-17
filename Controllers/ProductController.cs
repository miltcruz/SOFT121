using Microsoft.AspNetCore.Mvc;
using SOFT121.Infrastructure.Interfaces;
using SOFT121.Models;

namespace SOFT121.Controllers;

[ApiController]
[Route("[controller]")]

public class ProductController : ControllerBase
{
    private readonly IDataRepository _repo;

    // remove in-memory list when implementing data access
    private List<Product> products = new List<Product>();

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
            products = rows.Select(MapRowToProduct).ToList();
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

        newProduct.ProductId = products.Count + 1;
        products.Add(newProduct);
        return CreatedAtRoute("GetProductById", new { id = newProduct.ProductId }, newProduct);
    }

    [HttpPut("{id}", Name = "UpdateProduct")]
    public async Task<IActionResult> Update(int id, Product updatedProduct)
    {
        var product = products.FirstOrDefault(p => p.ProductId == id);
        if (product == null) return NotFound();

        product.ProductName = updatedProduct.ProductName;
        product.ListPrice = updatedProduct.ListPrice;

        return NoContent();
    }

    [HttpDelete("{id}", Name = "DeleteProduct")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = products.FirstOrDefault(p => p.ProductId == id);

        if (product == null) return NotFound();
        bool removed = products.Remove(product);

        return NoContent();
    }

    private static Product MapRowToProduct(IDictionary<string, object?> row)
    {
        return new Product
        {
            ProductId = row["ProductID"] != DBNull.Value ? Convert.ToInt32(row["ProductID"]) : 0,
            CategoryId = row["CategoryID"] != DBNull.Value ? Convert.ToInt32(row["CategoryID"]) : 0,
            ProductCode = row["ProductCode"]?.ToString() ?? string.Empty,
            ProductName = row["ProductName"]?.ToString() ?? string.Empty,
            Description = row["Description"]?.ToString() ?? string.Empty,
            ListPrice = row["ListPrice"] != DBNull.Value ? Convert.ToDecimal(row["ListPrice"]) : 0.0m,
            DiscountPercent = row["DiscountPercent"] != DBNull.Value ? Convert.ToDecimal(row["DiscountPercent"]) : 0.0m
        };
    }
}

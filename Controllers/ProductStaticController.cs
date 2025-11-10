using Microsoft.AspNetCore.Mvc;
using SOFT121.Models;

namespace SOFT121.Controllers;

[ApiController]
[Route("[controller]")]

public class ProductStaticController : ControllerBase
{
    private static List<Product> products = new List<Product>
    {
        new Product
        {
            ProductId = 1,
            CategoryId = 1,
            ProductCode = "GADGET-001",
            ProductName = "Super Gadget",
            Description = "A high-tech gadget with many features.",
            ListPrice = 99.99M,
            DiscountPercent = 10.0M
        },
        new Product
        {
            ProductId = 2,
            CategoryId = 2,
            ProductCode = "WIDGET-002",
            ProductName = "Amazing Widget",
            Description = "An amazing widget that makes life easier.",
            ListPrice = 49.99M,
            DiscountPercent = 5.0M
        }
    };

    [HttpGet(Name = "GetStaticProducts")]
    public IActionResult GetAll()
    {
        try
        {
            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet("{id}", Name = "GetStaticProductById")]
    public IActionResult GetById(int id)
    {
        var product = products.FirstOrDefault(p => p.ProductId == id);

        return product == null ? NotFound() : Ok(product);
    }

    [HttpPost(Name = "CreateStaticProduct")]
    public IActionResult Create([FromBody] Product newProduct)
    {
        if (newProduct == null)
        {
            return BadRequest("Invalid product data.");
        }

        newProduct.ProductId = products.Count + 1;
        products.Add(newProduct);
        return CreatedAtRoute("GetProductById", new { id = newProduct.ProductId }, newProduct);
    }

    [HttpPut("{id}", Name = "UpdateStaticProduct")]
    public IActionResult Update(int id, Product updatedProduct)
    {
        var product = products.FirstOrDefault(p => p.ProductId == id);
        if (product == null) return NotFound();

        product.ProductName = updatedProduct.ProductName;
        product.ListPrice = updatedProduct.ListPrice;

        return NoContent();
    }

    [HttpDelete("{id}", Name = "DeleteStaticProduct")]
    public IActionResult Delete(int id)
    {
        var product = products.FirstOrDefault(p => p.ProductId == id);

        if (product == null) return NotFound();
        bool removed = products.Remove(product);

        return NoContent();
    }
}

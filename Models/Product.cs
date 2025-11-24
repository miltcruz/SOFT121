namespace SOFT121.Models;

public class Product
{
    public int ProductId { get; set; } = 0;
    public int CategoryId { get; set; } = 0;
    public string CategoryName { get; set; } = string.Empty;
    public string ProductCode { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal ListPrice { get; set; } = 0.0m;
    public decimal DiscountPercent { get; set; } = 0.0m;
}

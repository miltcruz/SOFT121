namespace SOFT121.Models;

public class Product
{
    public int ProductId { get; set; }
    public int CategoryId { get; set; }
    public string ProductCode { get; set; }
    public string ProductName { get; set; }
    public string Description { get; set; }
    public decimal ListPrice { get; set; }
    public decimal DiscountPercent { get; set; }
}

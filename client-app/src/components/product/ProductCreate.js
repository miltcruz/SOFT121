import { useState, useEffect } from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router';
import { validateNumber, validationAlphaNumeric } from '../../scripts';
import { ENDPOINTS } from '../../apiConfig';

export default function ProductCreate() {
  const [form, setForm] = useState({
    productId: 0,
    categoryId: '',
    productCode: '',
    productName: '',
    description: '',
    listPrice: 0.0,
    discountPercent: 0.0,
  });
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(ENDPOINTS.CATEGORY);
        if (!res.ok) throw new Error('Failed to load categories');
        const data = await res.json();
        setCategories(data || []);
        // if no category selected, optionally set to first category id
        if (!form.categoryId && data && data.length > 0) {
          setForm((prev) => ({ ...prev, categoryId: data[0].categoryId }));
        }
      } catch (err) {
        setMessage('Error loading categories');
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //clear previous messages
    setMessage('');

    // Prepare data for submission
    const payload = {
      categoryId: parseInt(form.categoryId, 10),
      productCode: form.productCode,
      productName: form.productName,
      description: form.description,
      listPrice: parseFloat(form.listPrice),
      discountPercent: parseFloat(form.discountPercent),
    };

    // Validate numeric fields
    if (
      !validateNumber(payload.categoryId) ||
      !validateNumber(payload.listPrice) ||
      !validateNumber(payload.discountPercent)
    ) {
      setMessage(
        'Please enter valid numeric values for Category Id, List Price, and Discount Percent.'
      );
      return;
    }

    // Validate alphanumeric fields
    if (
      !validationAlphaNumeric(payload.productCode) ||
      !validationAlphaNumeric(payload.productName) ||
      !validationAlphaNumeric(payload.description)
    ) {
      setMessage(
        'Product Code, Product Name, and Description must be alphanumeric.'
      );
      return;
    }

    try {
      const response = await fetch(ENDPOINTS.PRODUCT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // normalize casing (backend might return PascalCase)
      const created = {
        productId: data.productId ?? data.ProductId,
        categoryId: data.categoryId ?? data.CategoryId,
        categoryName: data.categoryName ?? data.CategoryName,
        productCode: data.productCode ?? data.ProductCode,
        productName: data.productName ?? data.ProductName,
        description: data.description ?? data.Description,
        listPrice: data.listPrice ?? data.ListPrice,
        discountPercent: data.discountPercent ?? data.DiscountPercent,
      };

      localStorage.setItem('product', JSON.stringify(created));
      navigate(`/product/${created.productId}`);
    } catch (error) {
      setMessage(`Error creating product: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      <div>
        <label>Category</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
        >
          <option value="">-- Select category --</option>
          {categories.map((c) => (
            <option key={c.categoryId} value={c.categoryId}>
              {c.categoryName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Product Code</label>
        <input
          name="productCode"
          type="text"
          value={form.productCode}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Product Name</label>
        <input
          name="productName"
          type="text"
          value={form.productName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>List Price</label>
        <input
          name="listPrice"
          type="text"
          value={form.listPrice}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Discount Percent</label>
        <input
          name="discountPercent"
          type="text"
          value={form.discountPercent}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" bg="blue" color="white">
        Create
      </Button>
      {message && <div>{message}</div>}
    </form>
  );
}

import { useState, useEffect } from 'react';
import Button from '../Button';
import { useParams, useNavigate } from 'react-router';
import { validateNumber, validationAlphaNumeric } from '../../scripts';
import { ENDPOINTS } from '../../apiConfig';

export default function ProductUpdate() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const cachedProduct = localStorage.getItem('product');
    if (cachedProduct) {
      try {
        const parsed = JSON.parse(cachedProduct);
        const normalized = {
          productId: parsed.productId ?? parsed.ProductId ?? 0,
          categoryId: parsed.categoryId ?? parsed.CategoryId ?? 0,
          categoryName: parsed.categoryName ?? parsed.CategoryName ?? '',
          productCode: parsed.productCode ?? parsed.ProductCode ?? '',
          productName: parsed.productName ?? parsed.ProductName ?? '',
          description: parsed.description ?? parsed.Description ?? '',
          listPrice: parsed.listPrice ?? parsed.ListPrice ?? 0.0,
          discountPercent:
            parsed.discountPercent ?? parsed.DiscountPercent ?? 0.0,
        };

        if (normalized.productId.toString() === productId) {
          setProduct(normalized);
          setLoading(false);
          localStorage.removeItem('product');
          return;
        }
      } catch (e) {
        // ignore parse error and continue to fetch from API
      }
    }

    // declare the async function to fetch product details
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${ENDPOINTS.PRODUCT}/${productId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const normalized = {
          productId: data.productId ?? data.ProductId ?? 0,
          categoryId: data.categoryId ?? data.CategoryId ?? 0,
          categoryName: data.categoryName ?? data.CategoryName ?? '',
          productCode: data.productCode ?? data.ProductCode ?? '',
          productName: data.productName ?? data.ProductName ?? '',
          description: data.description ?? data.Description ?? '',
          listPrice: data.listPrice ?? data.ListPrice ?? 0.0,
          discountPercent: data.discountPercent ?? data.DiscountPercent ?? 0.0,
        };
        setProduct(normalized);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch product details
    fetchProduct();
  }, [productId]);

  const [form, setForm] = useState({
    productId: product ? product.productId : 0,
    categoryName: product ? product.categoryName : '',
    categoryId: product ? product.categoryId : '',
    productCode: product ? product.productCode : '',
    productName: product ? product.productName : '',
    description: product ? product.description : '',
    listPrice: product ? product.listPrice : 0.0,
    discountPercent: product ? product.discountPercent : 0.0,
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
        // if no category selected and no product loaded, optionally set to first category id
        if (!product && !form.categoryId && data && data.length > 0) {
          setForm((prev) => ({ ...prev, categoryId: data[0].categoryId }));
        }
      } catch (err) {
        setMessage('Error loading categories');
      }
    };
    fetchCategories();
  }, []);

  // When product data is loaded, populate the form fields
  useEffect(() => {
    if (!product) return;

    setForm({
      productId: product.productId ?? 0,
      categoryName: product.categoryName ?? '',
      categoryId: product.categoryId != null ? String(product.categoryId) : '',
      productCode: product.productCode ?? '',
      productName: product.productName ?? '',
      description: product.description ?? '',
      listPrice: product.listPrice ?? 0.0,
      discountPercent: product.discountPercent ?? 0.0,
    });
  }, [product]);

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
      const response = await fetch(`${ENDPOINTS.PRODUCT}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(
          `Network response was not ok: ${response.status} ${text}`
        );
      }

      // NoContent expected; update local cache with the new form values so details view can use them
      const savedProduct = {
        productId: parseInt(productId, 10),
        categoryId: parseInt(form.categoryId, 10),
        categoryName:
          (
            categories.find(
              (c) => String(c.categoryId) === String(form.categoryId)
            ) || {}
          ).categoryName ?? '',
        productCode: form.productCode,
        productName: form.productName,
        description: form.description,
        listPrice: parseFloat(form.listPrice),
        discountPercent: parseFloat(form.discountPercent),
      };

      localStorage.setItem('product', JSON.stringify(savedProduct));
      navigate(`/product/${productId}`);
    } catch (error) {
      setMessage(`Error updating product: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Product</h2>
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
        Update
      </Button>
      {message && <div>{message}</div>}
    </form>
  );
}

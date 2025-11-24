import { useState } from 'react';
import Button from '../Button';
import { useNavigate } from 'react-router';
import { validateNumber, validationAlphaNumeric } from '../../scripts';

export default function ProductCreate() {
  const [form, setForm] = useState({
    productId: 0,
    categoryId: 0,
    productCode: '',
    productName: '',
    description: '',
    listPrice: 0.0,
    discountPercent: 0.0,
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //clear previous messages
    setMessage('');

    console.log('Submitting form data:', form);
    // Prepare data for submission
    const payload = {
      categoryId: parseInt(form.categoryId, 10),
      productCode: form.productCode,
      productName: form.productName,
      description: form.description,
      listPrice: parseFloat(form.listPrice),
      discountPercent: parseFloat(form.discountPercent),
    };
    console.log('Payload:', payload);
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
      const response = await fetch('http://localhost:5156/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('product', JSON.stringify(data));
      navigate(`/product/${data.productId}`);
    } catch (error) {
      setMessage(`Error creating product: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      <div>
        <label>Category Id</label>
        <input
          name="categoryId"
          type="text"
          value={form.categoryId}
          onChange={handleChange}
        />
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

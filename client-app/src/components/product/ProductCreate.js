import { useState } from 'react';
import Button from './Button';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>
      <div>
        <label>Category Id</label>
        <input name="categoryId" type="number" value={form.categoryId} />
      </div>
      <div>
        <label>Product Code</label>
        <input name="productCode" type="text" value={form.productCode} />
      </div>
      <div>
        <label>Product Name</label>
        <input name="productName" type="text" value={form.productName} />
      </div>
      <div>
        <label>Description</label>
        <textarea name="description" value={form.description} />
      </div>
      <div>
        <label>List Price</label>
        <input name="listPrice" type="number" value={form.listPrice} />
      </div>
      <div>
        <label>Discount Percent</label>
        <input
          name="discountPercent"
          type="number"
          value={form.discountPercent}
        />
      </div>
      <Button type="submit" bg="blue" color="white">
        Create
      </Button>
      {message && <div>{message}</div>}
    </form>
  );
}

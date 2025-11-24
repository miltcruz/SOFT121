import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../apiConfig';
import Button from '../Button';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const cachedProduct = localStorage.getItem('product');
    if (cachedProduct) {
      if (JSON.parse(cachedProduct).productId.toString() === productId) {
        setProduct(JSON.parse(cachedProduct));
        setLoading(false);
        localStorage.removeItem('product');
        return;
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
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch product details
    fetchProduct();
  }, [productId]);

  const [message, setMessage] = useState('');
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this product?');
    if (!ok) return;

    setDeleting(true);
    setMessage('');
    try {
      const res = await fetch(`${ENDPOINTS.PRODUCT}/${productId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMessage('Product deleted successfully.');
        // Optionally navigate away or refresh; for now just indicate success
      } else {
        const text = await res.text();
        setMessage(`Delete failed: ${res.status} ${text}`);
      }
    } catch (err) {
      setMessage(`Delete failed: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <h2>Product Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {product && (
        <div>
          <h3>{product.productName}</h3>
          <p>{product.description}</p>
          <p>Code: {product.productCode}</p>
          <p>Price: ${product.listPrice}</p>
          <p>Discount: ${product.discountPercent}</p>
        </div>
      )}
      <div style={{ marginTop: '1rem' }}>
        <Button
          type="button"
          onClick={() => navigate('/product/create')}
          bg="blue"
          color="white"
          style={{ marginRight: '0.5rem' }}
        >
          Create New Product
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          bg="red"
          color="white"
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </Button>
        {message && <div style={{ marginTop: '0.5rem' }}>{message}</div>}
      </div>
    </div>
  );
}

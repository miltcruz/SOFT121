import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '../Button';
import { ENDPOINTS } from '../../apiConfig';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(ENDPOINTS.PRODUCT);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <div>
        <Button
          onClick={() => navigate('/product/create')}
          type="button"
          bg="blue"
          color="white"
        >
          Create New Product
        </Button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>
                  <Link to={`/product/${product.productId}`}>
                    {product.productName}
                  </Link>
                </td>
                <td>{product.categoryName}</td>
                <td>{product.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

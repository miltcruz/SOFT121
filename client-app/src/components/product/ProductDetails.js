import { useParams } from 'react-router';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    // declare the async function to fetch product details
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5156/product/${productId}`
        );

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
    </div>
  );
}

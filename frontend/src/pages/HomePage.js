import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Spinner } from 'react-bootstrap';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/products/')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setError(err.message);
        setLoading(false);
        // Add some dummy products if API is not available (for testing)
        setProducts([
          {
            id: 1,
            name: "Sample Product 1",
            description: "This is a sample product description.",
            price: "19.99",
            image_url: "https://via.placeholder.com/150"
          },
          {
            id: 2,
            name: "Sample Product 2",
            description: "Another sample product with details.",
            price: "29.99",
            image_url: "https://via.placeholder.com/150"
          },
          {
            id: 3,
            name: "Sample Product 3",
            description: "The third sample product for display.",
            price: "39.99",
            image_url: "https://via.placeholder.com/150"
          }
        ]);
      });
  }, []);

  const addToCart = (product) => {
    const saved = localStorage.getItem('cart');
    const cart = saved ? JSON.parse(saved) : [];

    // Check if product already in cart
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      alert('Product is already in the cart!');
      return;
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    alert('Added to cart!');
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="display-4 text-center mb-4">Welcome to Our Store</h1>
        <p className="lead text-center">
          Discover our latest products with the best quality and prices
        </p>
      </div>

      <h2 className="mb-4">Featured Products</h2>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Card className="product-card h-100">
              <Card.Img 
                variant="top" 
                src={product.image_url} 
                alt={product.name} 
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-truncate-2 mb-2">
                  {product.description}
                </Card.Text>
                <Card.Text className="price mt-auto mb-3">
                  ${product.price}
                </Card.Text>
                <div className="d-flex justify-content-between mt-auto">
                  <Button 
                    as={Link}
                    to={`/product/${product.id}`} 
                    variant="outline-primary"
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="primary"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Card, Button, Breadcrumb, Spinner, Alert } from 'react-bootstrap';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch product details');
        }
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching product:", err);
        setError(err.message);
        setLoading(false);
        
        // Add a sample product if API is not available (for testing)
        setProduct({
          id: id,
          name: "Sample Product",
          description: "This is a sample product description for testing purposes. This product doesn't exist in the database, but is shown as a placeholder when the API is unavailable.",
          price: "29.99",
          image_url: "https://via.placeholder.com/400x300"
        });
      });
  }, [id]);

  const addToCart = () => {
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

  if (error && !product) {
    return (
      <Alert variant="danger" className="my-5">
        Error: {error}
      </Alert>
    );
  }

  if (!product) {
    return (
      <Alert variant="warning" className="my-5">
        Product not found
      </Alert>
    );
  }

  return (
    <div>
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row>
        <Col md={6} className="mb-4">
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="product-detail-img"
          />
        </Col>
        <Col md={6}>
          <Card className="border-0">
            <Card.Body>
              <h1 className="mb-3">{product.name}</h1>
              <p className="price fs-3 text-success mb-4">${product.price}</p>
              <Card.Text className="mb-4">
                {product.description}
              </Card.Text>
              <div className="product-actions">
                <Button 
                  variant="primary" 
                  className="px-5 py-2"
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline-secondary" 
                  className="ms-3 px-5 py-2" 
                  as={Link} 
                  to="/"
                >
                  Continue Shopping
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h3 className="mb-4">Product Details</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus consequat nunc at velit lobortis, 
            nec tincidunt justo lobortis. Phasellus facilisis nisl eget nulla sodales, vel vulputate sem elementum.
          </p>
          <ul>
            <li>High-quality material</li>
            <li>Durable construction</li>
            <li>Easy to maintain</li>
            <li>Modern design</li>
          </ul>
        </Col>
      </Row>
    </div>
  );
}

export default ProductPage;
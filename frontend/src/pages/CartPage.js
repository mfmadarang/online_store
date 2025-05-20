import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';

function CartPage() {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Save to local storage whenever cart changes
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Dispatch custom event to update cart count in navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Calculate total price
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setTotalPrice(total);
  }, [cartItems]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center my-5">
        <Alert variant="info">
          <h3>Your cart is empty</h3>
          <p>You haven't added any products to your cart yet.</p>
          <Button as={Link} to="/" variant="primary" className="mt-3">
            Go Shopping
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Your Shopping Cart</h1>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th style={{ width: '100px' }}>Image</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id}>
                      <td>
                        <img 
                          src={item.image_url} 
                          alt={item.name} 
                          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                      </td>
                      <td>
                        <h5>{item.name}</h5>
                        <p className="text-muted small mb-0 text-truncate-2">
                          {item.description}
                        </p>
                      </td>
                      <td className="fw-bold">${item.price}</td>
                      <td>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="cart-summary">
            <Card.Body>
              <h3 className="mb-4">Order Summary</h3>
              
              <Row className="mb-2">
                <Col>Items ({cartItems.length}):</Col>
                <Col className="text-end fw-bold">${totalPrice.toFixed(2)}</Col>
              </Row>
              
              <Row className="mb-2">
                <Col>Shipping:</Col>
                <Col className="text-end fw-bold">Free</Col>
              </Row>
              
              <Row className="mb-4">
                <Col>Tax:</Col>
                <Col className="text-end fw-bold">Calculated at checkout</Col>
              </Row>
              
              <hr />
              
              <Row className="mb-4">
                <Col>
                  <h4>Total:</h4>
                </Col>
                <Col className="text-end">
                  <h4 className="text-success fw-bold">${totalPrice.toFixed(2)}</h4>
                </Col>
              </Row>
              
              <div className="d-grid gap-2">
                <Button variant="success" size="lg">
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button 
                  variant="outline-primary" 
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
    </div>
  );
}

export default CartPage;
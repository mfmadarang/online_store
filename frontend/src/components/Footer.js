import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>About Us</h5>
            <p className="text-muted">
              We offer high quality products at competitive prices.
              Our mission is to provide the best shopping experience.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-muted">Home</a></li>
              <li><a href="/cart" className="text-decoration-none text-muted">Cart</a></li>
              <li><a href="/login" className="text-decoration-none text-muted">Login</a></li>
              <li><a href="/register" className="text-decoration-none text-muted">Register</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <p className="text-muted">
              Email: info@onlinestore.com<br />
              Phone: (123) 456-7890<br />
              Address: 123 E-Commerce St.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col text-center pt-3 border-top border-secondary">
            <p className="text-muted small mb-0">
              &copy; {new Date().getFullYear()} Online Store. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
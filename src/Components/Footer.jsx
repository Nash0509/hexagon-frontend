import React from 'react';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div>
        <p>&copy; 2023 Hexagon. All rights reserved.</p>
        <nav>
          <a href="/terms">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

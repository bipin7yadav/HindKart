import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { MdVerified, MdOutlineSync, MdOutlinePhone } from "react-icons/md";

function Footer() {
  return (
    <footer className="myntra-footer">
      <div className="footer-guarantees">
        <div className="guarantee-item">
          <div className="guarantee-icon">
            <MdVerified />
          </div>
          <div>
            <strong>100% ORIGINAL</strong> guarantee for all products at hindkart.com
          </div>
        </div>
        <div className="guarantee-item">
          <div className="guarantee-icon">
            <MdOutlineSync />
          </div>
          <div>
            <strong>Return within 14days</strong> of receiving your order
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-col">
          <h3>ONLINE SHOPPING</h3>
          <ul>
            <li><Link to="/AllProducts">Men's Fashion</Link></li>
            <li><Link to="/AllProducts">Women's Clothing</Link></li>
            <li><Link to="/AllProducts">Kids Wear</Link></li>
            <li><Link to="/AllProducts">Footwear</Link></li>
            <li><Link to="/AllProducts">HindKart Studio</Link></li>
            <li><Link to="/AllProducts">Gift Cards</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>CUSTOMER POLICIES</h3>
          <ul>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#terms">T&C</a></li>
            <li><a href="#terms">Terms Of Use</a></li>
            <li><a href="#shipping">Track Orders</a></li>
            <li><a href="#shipping">Shipping & Delivery</a></li>
            <li><a href="#cancellation">Cancellation & Returns</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>EXPERIENCE HINDKART APP</h3>
          <p className="app-subtitle">Fast, seamless fashion shopping at your fingertips.</p>
          <div className="app-buttons">
            <div className="store-btn">Google Play</div>
            <div className="store-btn">App Store</div>
          </div>
          <h3 className="social-heading">KEEP IN TOUCH</h3>
          <div className="social-links">
            <a href="https://github.com/bipin7yadav" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/bipin-yadav-07a08217a/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://twitter.com/bipinyadav9769" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>

        <div className="footer-col">
          <h3>POPULAR SEARCHES</h3>
          <p className="popular-tags">
            Shorts | T-Shirts | Shirts | Running Shoes | Formal Shoes | Jeans | Chinos | Trousers | HRX | Puma | Nike | H&M | Roadster
          </p>
          <div className="footer-copyright">
            In case of any concern, <strong>Contact Us</strong>
            <p>© {new Date().getFullYear()} www.hindkart.com. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
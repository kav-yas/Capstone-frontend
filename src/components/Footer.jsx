import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import "../styles/Footer.css"; // Corrected CSS file path

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-top">
          {/* Brand & About Section */}
          <Col md={4} className="footer-section">
            <h5>Habit-Sync</h5>
            <p>Your ultimate habit tracker to boost productivity and achieve goals effectively.</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="footer-section">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/my-habits">My Habits</a></li>
              <li><a href="/track-progress">Track Progress</a></li>

            </ul>
          </Col>

          {/* Social Media Links */}
          <Col md={4} className="footer-section">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </Col>
        </Row>

        {/* Bottom Footer */}
        <Row className="footer-bottom">
          <Col>
            <p>© {new Date().getFullYear()} Habit-Sync. All Rights Reserved.</p>
            <p><a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Logo and About */}
          <div className="footer-column">
            <div className="footer-logo">
              <div className="logo-icon">
                <span>CodeMasters</span>
              </div>
            </div>
            <p className="footer-about">
              Uncodemy is a premier coding institute dedicated to transforming aspiring developers into industry-ready professionals through hands-on training and personalized mentorship.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon"><Facebook size={18} /></a>
              <a href="#" className="social-icon"><Twitter size={18} /></a>
              <a href="#" className="social-icon"><Linkedin size={18} /></a>
              <a href="#" className="social-icon"><Instagram size={18} /></a>
              <a href="#" className="social-icon"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><a onClick={() => navigate("/")}>Home</a></li>
              <li><a onClick={() => navigate("/#tracks")}>Our Courses</a></li>
              <li><a onClick={() => navigate("/#hero")}>About Us</a></li>
              <li><a onClick={() => navigate("/#success-stories")}>Testimonials</a></li>
              <li><a href="#instructors">Instructors</a></li>
            </ul>
          </div>

          {/* Column 3: Courses (No Navigation) */}
          <div className="footer-column">
            <h3 className="footer-heading">Courses</h3>
            <ul className="footer-links">
              <li>Full-Stack Web Development</li>
              <li>Data Science</li>
              <li>Cloud Computing</li>
              <li>Automation Testing</li>
              <li>Java Development</li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-column">
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="contact-info">
              <li><MapPin size={18} /><span>Noida Sector 1, New Delhi</span></li>
              <li><Phone size={18} /><span>(123) 456-7890</span></li>
              <li><Mail size={18} /><span>uncodemy@codemasters.tech</span></li>
            </ul>
            <div className="subscribe-form">
              <h4>Subscribe to Newsletter</h4>
              <div className="form-group">
                <input type="email" placeholder="Your Email" />
                <button type="submit">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© {new Date().getFullYear()} Uncodemy. All Rights Reserved.</p>
          </div>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
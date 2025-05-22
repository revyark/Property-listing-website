

// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#2c2929', color: 'white', padding: '40px 20px', fontFamily: 'Arial' }}>
      <table style={{ width: '100%', tableLayout: 'fixed' }}>
        <tbody>
          <tr style={{ verticalAlign: 'top' }}>
            <td>
              <h2 style={{ color: '#f28c5b' }}>AGAR</h2>
            </td>
            <td>
              <h4>About Us</h4>
              <p>Contact Us</p>
              <p>Case Studies</p>
              <p>Careers</p>
              <p>Privacy Policy</p>
              <p>Sitemap</p>
              <p>Terms and Conditions</p>
              <p>Return & Refund Policy</p>
            </td>
            <td>
              <h4>Legal & Compliance</h4>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <p>Refund & Cancellation Policy</p>
              <p>User Agreement</p>
              <p>Commercial Space Rental Guidelines</p>
            </td>
            <td>
              <h4>Follow Us</h4>
              <p>Verified Listings & Secure Transactions</p>
              <p>Host & Guest Protection Policies</p>
              <p>Data Security & Privacy Measures</p>
              <p>Fraud Prevention & Anti-Scam Guidelines</p>
            </td>
            <td>
              <h4>Follow Us</h4>
              <p style={{ fontSize: '22px' }}>
                <i className="fab fa-facebook" style={{ marginRight: '10px' }}></i>
                <i className="fab fa-twitter" style={{ marginRight: '10px' }}></i>
                <i className="fab fa-linkedin" style={{ marginRight: '10px' }}></i>
                <i className="fab fa-instagram"></i>
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Bottom copyright */}
      <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px' }}>
        © 2025 Agar Inc. Designed and Developed by Tycho Technologies.
      </div>
    </div>
  );
};

export default Footer;

// src/components/Footer.jsx
import { FaBuilding, FaPhoneAlt, FaEnvelope, FaHeadset, FaGlobe } from 'react-icons/fa';
import logo from '../assets/brand-logo.png';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer-container">
            {/* The decorative circle from the mockup */}
            <div className="footer-accent-circle"></div>

            <div className="footer-top">
                <img src={logo} alt="JGM Industries Logo" className="footer-logo" />
                <p className="footer-tagline">
                    CRAFTED FROM PURE, POWERFUL HERBS.<br />
                    MADE TO CARE FOR YOU THE NATURAL WAY.
                </p>
            </div>

            <div className="footer-bottom">
                
                <div className="contact-item">
                    <FaBuilding className="contact-icon" />
                    <div className="contact-text-group">
                        <span className="contact-label">Address</span>
                        <span className="contact-value">SILIGURI, DARJEELING - 734434 (W.B)</span>
                    </div>
                </div>

                <div className="contact-item">
                    <FaPhoneAlt className="contact-icon" />
                    <div className="contact-text-group">
                        <span className="contact-label">Phone No.</span>
                        <span className="contact-value">76796-00984</span>
                    </div>
                </div>

                <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <div className="contact-text-group">
                        <span className="contact-label">E-Mail</span>
                        <span className="contact-value">jgmindustriesofficial@gmail.com</span>
                    </div>
                </div>

                <div className="contact-item">
                    <FaHeadset className="contact-icon" />
                    <div className="contact-text-group">
                        <span className="contact-label">Customer Care</span>
                        <span className="contact-value">62962-63480</span>
                    </div>
                </div>

                {/* The Globe Icon on the far right */}
                <div className="contact-item" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <FaGlobe className="contact-icon" style={{ fontSize: '3rem' }} />
                </div>

            </div>
        </footer>
    );
}
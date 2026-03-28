// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/brand-logo.png';
import './Navbar.css';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Helps the navbar know when the page changes

    // Check if the user is currently logged in by looking for the token
    const isAuthenticated = !!localStorage.getItem('userToken');

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleLogout = () => {
        // Remove the digital key
        localStorage.removeItem('userToken');
        // Close the mobile menu if it's open
        setIsMobileMenuOpen(false);
        // Send them back to the login page
        navigate('/login');
    };

    return (
        <nav className="navbar">
            
            <div className="logo-container">
                <Link to="/">
                    <img src={logo} alt="JGM Industries Logo" className="logo-img" />
                </Link>
            </div>

            <div className="nav-center">
                <Link to="/" className="nav-link">HOME</Link>
                <Link to="/about" className="nav-link">ABOUT US</Link>
                <Link to="/products" className="nav-link">OUR PRODUCTS</Link>
                <Link to="/contact" className="nav-link">CONTACT US</Link>
                <Link to="/certification" className="nav-link">CERTIFICATION</Link>
            </div>

            {/* Desktop Right Side */}
            <div className="nav-right">
                <div className="phone-container">
                    <FaPhoneAlt style={{ fontSize: '1rem' }} /> 
                    <span>76796-00984</span>
                </div>
                
                {/* CONDITIONAL RENDERING: Join Us OR Logout */}
                {isAuthenticated ? (
                    <button className="join-btn" onClick={handleLogout} style={{ backgroundColor: '#e74c3c', color: 'white' }}>
                        LOGOUT <FaSignOutAlt style={{ marginLeft: '5px' }} />
                    </button>
                ) : (
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <button className="join-btn">JOIN US</button>
                    </Link>
                )}
            </div>

            <button className="hamburger" onClick={toggleMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <Link to="/" className="nav-link" onClick={toggleMenu}>HOME</Link>
                    <Link to="/about" className="nav-link" onClick={toggleMenu}>ABOUT US</Link>
                    <Link to="/products" className="nav-link" onClick={toggleMenu}>OUR PRODUCTS</Link>
                    <Link to="/contact" className="nav-link" onClick={toggleMenu}>CONTACT US</Link>
                    <Link to="/certification" className="nav-link" onClick={toggleMenu}>CERTIFICATION</Link>
                    
                    <div className="nav-right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="phone-container" style={{ marginBottom: '15px' }}>
                            <FaPhoneAlt style={{ fontSize: '1rem' }} /> 
                            <span>76796-00984</span>
                        </div>
                        
                        {/* CONDITIONAL RENDERING FOR MOBILE */}
                        {isAuthenticated ? (
                            <button className="join-btn" onClick={handleLogout} style={{ backgroundColor: '#e74c3c', color: 'white' }}>
                                LOGOUT <FaSignOutAlt style={{ marginLeft: '5px' }} />
                            </button>
                        ) : (
                            <Link to="/login" style={{ textDecoration: 'none' }} onClick={toggleMenu}>
                                <button className="join-btn">JOIN US</button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
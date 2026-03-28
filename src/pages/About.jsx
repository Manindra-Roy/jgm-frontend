// src/pages/About.jsx
import { useEffect } from 'react';
import { FaLeaf, FaHeart, FaShieldAlt } from 'react-icons/fa';
import './About.css';
import heroBg from '../assets/home-bg.jpg';

export default function About() {
    
    // Ensure the page scrolls to the top when it loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-container">
            
            {/* Shortened Hero Banner */}
            <div className="about-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="about-overlay"></div>
                <h1 className="about-hero-title">ABOUT US</h1>
            </div>

            {/* Main Content Card */}
            <div className="about-content-card">
                <h2 className="about-heading">Our Roots & Vision</h2>
                
                <p className="about-text">
                    Welcome to <strong>JGM Industries</strong>. Operating proudly out of Siliguri, West Bengal, we are dedicated to reviving the ancient wisdom of nature through our premium herbal products. Under our flagship brands, <strong>JAI GOU MATA</strong> and <strong>ZIO</strong>, we bring you remedies and lifestyle products that are deeply rooted in tradition and crafted with uncompromising purity.
                </p>

                <p className="about-text">
                    In a world increasingly reliant on artificial chemicals, we believe that true care comes from the earth. Our concept is entirely herbal. Every product we formulate—from our premium agarbattis to our natural perfumes and vaporizers—is crafted from pure, powerful herbs, ensuring that we care for you the natural way.
                </p>

                <div className="values-grid">
                    <div className="value-card">
                        <FaLeaf className="value-icon" />
                        <h3 className="value-title">100% Herbal</h3>
                        <p className="value-text">Crafted from nature's finest ingredients with absolutely no harsh chemicals.</p>
                    </div>

                    <div className="value-card">
                        <FaHeart className="value-icon" />
                        <h3 className="value-title">Pure Intent</h3>
                        <p className="value-text">Made with a deep respect for natural healing and holistic well-being.</p>
                    </div>

                    <div className="value-card">
                        <FaShieldAlt className="value-icon" />
                        <h3 className="value-title">Quality Assured</h3>
                        <p className="value-text">Rigorous standards ensure every product delivers safe and effective results.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
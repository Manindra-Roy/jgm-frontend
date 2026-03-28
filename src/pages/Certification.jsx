// src/pages/Certification.jsx
import { useEffect } from 'react';
import { FaAward, FaCertificate, FaLeaf, FaCheckDouble } from 'react-icons/fa';
import './Certification.css';
import heroBg from '../assets/home-bg.jpg';

export default function Certification() {
    
    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="cert-container">
            
            {/* Shortened Hero Banner */}
            <div className="cert-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="cert-overlay"></div>
                <h1 className="cert-hero-title">CERTIFICATION</h1>
            </div>

            <div className="cert-content">
                <h2 className="cert-heading">Our Commitment to Quality</h2>
                <p className="cert-subtitle">
                    At JGM Industries, we believe that true wellness comes from uncompromising purity. Our facilities and products adhere to strict industry standards to ensure you receive the finest herbal remedies available.
                </p>

                <div className="cert-grid">
                    
                    {/* Certificate 1 */}
                    <div className="cert-card">
                        <div className="cert-icon-wrapper">
                            <FaAward className="cert-icon" />
                        </div>
                        <h3 className="cert-title">ISO 9001:2015</h3>
                        <p className="cert-text">Certified for rigorous Quality Management Systems in manufacturing.</p>
                    </div>

                    {/* Certificate 2 */}
                    <div className="cert-card">
                        <div className="cert-icon-wrapper">
                            <FaLeaf className="cert-icon" />
                        </div>
                        <h3 className="cert-title">100% Herbal</h3>
                        <p className="cert-text">Officially verified as using pure, natural, and herbal ingredients.</p>
                    </div>

                    {/* Certificate 3 */}
                    <div className="cert-card">
                        <div className="cert-icon-wrapper">
                            <FaCertificate className="cert-icon" />
                        </div>
                        <h3 className="cert-title">GMP Certified</h3>
                        <p className="cert-text">Compliant with Good Manufacturing Practices for absolute safety.</p>
                    </div>

                    {/* Certificate 4 */}
                    <div className="cert-card">
                        <div className="cert-icon-wrapper">
                            <FaCheckDouble className="cert-icon" />
                        </div>
                        <h3 className="cert-title">Quality Tested</h3>
                        <p className="cert-text">Every batch undergoes rigorous lab testing before it reaches you.</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
// src/components/Hero.jsx
import './Hero.css';
import heroBg from '../assets/home-bg.jpg';

export default function Hero() {
    return (
        <div className="hero-container" style={{ backgroundImage: `url(${heroBg})` }}>
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <h1 className="hero-title">JGM INDUSTRIES</h1>
                <h2 className="hero-subtitle">WE HAVE HERBAL CONCEPT</h2>
                <p className="hero-text">
                    Crafted from pure, powerful herbs.<br />
                    Made to care for you the natural way.
                </p>
            </div>
        </div>
    );
}
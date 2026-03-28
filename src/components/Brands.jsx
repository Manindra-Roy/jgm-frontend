// src/components/Brands.jsx
import './Brands.css';
import patternBg from '../assets/OUR WEBSITE.webp';

export default function Brands() {
    return (
        <div className="brands-section" style={{ backgroundImage: `url("${patternBg}")` }}>
            <h2 className="brands-title">We Have Two Brands</h2>
            
            <div className="badges-container">
                <div className="brand-badge">
                    <span>JAI GOU<br/>MATA</span>
                </div>
                
                <div className="brand-badge badge-zio">
                    <span>ZIO</span>
                </div>
            </div>
        </div>
    );
}
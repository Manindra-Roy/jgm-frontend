// src/pages/ProductDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import api from '../services/api';
import './ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams(); // Gets the ID from the URL (e.g., /product/123)
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchProduct = async () => {
            try {
                // Fetch the single product from your backend
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Product not found or server error.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleWhatsAppOrder = () => {
        const phone = "917679600984";
        const message = `Hello JGM Industries! I am on your website and would like to order:\n\n*${product.name}* (₹${product.price}/-)\n\nPlease let me know the next steps!`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    if (loading) return <div className="details-page-container"><h2 style={{textAlign: 'center', paddingTop: '50px'}}>Loading natural goodness...</h2></div>;
    if (error) return <div className="details-page-container"><h2 style={{textAlign: 'center', paddingTop: '50px', color: 'red'}}>{error}</h2></div>;
    if (!product) return null;

    return (
        <div className="details-page-container">
            
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontFamily: 'Lora', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#216f56', fontWeight: 'bold' }}
            >
                <FaArrowLeft /> Back to Products
            </button>

            <div className="details-content">
                
                {/* Left: Image */}
                <div className="details-image-section">
                    <img 
                        src={product.image || 'https://via.placeholder.com/400?text=No+Image'} 
                        alt={product.name} 
                        className="details-main-image" 
                    />
                </div>

                {/* Right: Info */}
                <div className="details-info-section">
                    <h1 className="details-title">{product.name}</h1>
                    
                    <div className="details-price">
                        ₹{product.price}/- 
                        <span className="details-tag">100% Herbal</span>
                    </div>

                    <p className="details-description">
                        {product.description || "Experience the pure, powerful essence of nature. Crafted with uncompromising quality by JGM Industries in Siliguri, this herbal remedy is designed to care for you the natural way. Free from harsh chemicals and artificial additives."}
                    </p>

                    <ul className="benefits-list">
                        <li><FaCheckCircle className="benefit-icon" /> Guaranteed Pure & Natural</li>
                        <li><FaCheckCircle className="benefit-icon" /> Safely formulated for daily use</li>
                        <li><FaCheckCircle className="benefit-icon" /> Proudly manufactured in India</li>
                    </ul>

                    <button className="details-order-btn" onClick={handleWhatsAppOrder}>
                        <FaWhatsapp style={{ fontSize: '1.6rem' }} /> ORDER ON WHATSAPP
                    </button>
                </div>

            </div>
        </div>
    );
}
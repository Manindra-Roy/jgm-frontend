
// // src/components/ProductGrid.jsx
// import { useState, useEffect } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
// import api from '../services/api';
// import './ProductGrid.css';
// import logo from '../assets/brand-logo.png';
// import patternBg from '../assets/OUR WEBSITE.webp';

// export default function ProductGrid() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 // Fetching real products from your backend!
//                 const response = await api.get('/products');
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error("Error fetching products:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     // WhatsApp Direct Order Logic
//     const handleInquiry = (productName, productPrice) => {
//         const phone = "917679600984"; // Your exact business number
//         const message = `Hello JGM Industries, I am interested in ordering:\n\n*${productName}* (₹${productPrice}/-)\n\nPlease let me know how to proceed!`;
//         const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <div className="products-section" style={{ backgroundImage: `url("${patternBg}")` }}>
            
//             <div className="section-title-wrapper">
//                 <h2 className="section-title">CATEGORIES WE OFFER</h2>
//             </div>

//             {loading ? (
//                 <h3 style={{ color: '#2c3e50', fontFamily: 'Lora, serif' }}>Loading our natural catalog...</h3>
//             ) : products.length === 0 ? (
//                 <h3 style={{ color: '#2c3e50', fontFamily: 'Lora, serif' }}>No products found in the database.</h3>
//             ) : (
//                 <div className="product-grid">
//                     {products.map((product) => (
//                         <div key={product.id} className="product-card">
                            
//                             <div className="product-image-container">
//                                 {/* The tiny overlapping JGM logo */}
//                                 <div className="product-badge">
//                                     <img src={logo} alt="JGM Badge" />
//                                 </div>
                                
//                                 <img 
//                                     src={product.image || 'https://via.placeholder.com/250?text=No+Image'} 
//                                     alt={product.name} 
//                                     className="product-image" 
//                                 />
//                             </div>

//                             <h3 className="product-name">{product.name}</h3>
//                             <p className="product-price">₹{product.price}/-</p>

//                             <button 
//                                 className="buy-btn" 
//                                 onClick={() => handleInquiry(product.name, product.price)}
//                             >
//                                 BUY NOW <FaShoppingCart />
//                             </button>
                            
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }






// src/components/ProductGrid.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import api from '../services/api';
import './ProductGrid.css';
import logo from '../assets/brand-logo.png';
import patternBg from '../assets/OUR WEBSITE.webp';

export default function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // WhatsApp Direct Order Logic
    const handleInquiry = (productName, productPrice) => {
        const phone = "917679600984"; 
        const message = `Hello JGM Industries, I am interested in ordering:\n\n*${productName}* (₹${productPrice}/-)\n\nPlease let me know how to proceed!`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="products-section" style={{ backgroundImage: `url("${patternBg}")` }}>
            
            <div className="section-title-wrapper">
                <h2 className="section-title">CATEGORIES WE OFFER</h2>
            </div>

            {loading ? (
                <h3 style={{ color: '#2c3e50', fontFamily: 'Lora, serif' }}>Loading our natural catalog...</h3>
            ) : products.length === 0 ? (
                <h3 style={{ color: '#2c3e50', fontFamily: 'Lora, serif' }}>No products found in the database.</h3>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product._id || product.id} className="product-card">
                            
                            {/* Clickable Area: Image and Title */}
                            <Link 
                                to={`/product/${product._id || product.id}`} 
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <div className="product-image-container">
                                    <div className="product-badge">
                                        <img src={logo} alt="JGM Badge" />
                                    </div>
                                    
                                    <img 
                                        src={product.image || 'https://via.placeholder.com/250?text=No+Image'} 
                                        alt={product.name} 
                                        className="product-image" 
                                    />
                                </div>

                                <h3 className="product-name">{product.name}</h3>
                            </Link>

                            {/* Non-Clickable Area: Price and Button */}
                            <p className="product-price">₹{product.price}/-</p>

                            <button 
                                className="buy-btn" 
                                onClick={() => handleInquiry(product.name, product.price)}
                            >
                                BUY NOW <FaShoppingCart />
                            </button>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
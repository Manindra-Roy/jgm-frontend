// // src/pages/ProductsPage.jsx
// import { useState, useEffect } from 'react';
// import api from '../services/api';
// import './ProductsPage.css';
// import { Link } from 'react-router-dom';

// export default function ProductsPage() {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Scroll to top when page loads
//         window.scrollTo(0, 0);

//         const fetchProducts = async () => {
//             try {
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
//     const handleOrder = (productName, productPrice) => {
//         const phone = "917679600984"; 
//         const message = `Hello JGM Industries, I would like to order:\n\n*${productName}* (₹${productPrice}/-)\n\nPlease let me know the payment and delivery details.`;
//         const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <div className="products-page-container">
//             {loading ? (
//                 <h2 style={{ color: 'white', textAlign: 'center', fontFamily: 'Lora, serif', marginTop: '50px' }}>Loading Inventory...</h2>
//             ) : products.length === 0 ? (
//                 <h2 style={{ color: 'white', textAlign: 'center', fontFamily: 'Lora, serif', marginTop: '50px' }}>No products available.</h2>
//             ) : (
//                 <div className="products-page-grid">
//                     {products.map((product) => (
//                         <div key={product.id} className="prod-page-card">
                            
//                             <div className="prod-page-img-container">
//                                 {/* Optional: If you want to show a special offer tag randomly or based on a backend flag */}
//                                 {product.price > 200 && (
//                                     <div className="special-offer-tag">12+2<br/>SPECIAL<br/>OFFER</div>
//                                 )}
                                
//                                 <img 
//                                     src={product.image || 'https://via.placeholder.com/250?text=No+Image'} 
//                                     alt={product.name} 
//                                     className="prod-page-img" 
//                                 />
//                             </div>

//                             <h3 className="prod-page-title">{product.name}</h3>
//                             <p className="prod-page-price">{product.price}/-</p>

//                             <button 
//                                 className="prod-page-btn" 
//                                 onClick={() => handleOrder(product.name, product.price)}
//                             >
//                                 ORDER NOW
//                             </button>
                            
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }



// src/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './ProductsPage.css';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Scroll to top when page loads
        window.scrollTo(0, 0);

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
    const handleOrder = (productName, productPrice) => {
        const phone = "917679600984"; 
        const message = `Hello JGM Industries, I would like to order:\n\n*${productName}* (₹${productPrice}/-)\n\nPlease let me know the payment and delivery details.`;
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className="products-page-container">
            {loading ? (
                <h2 style={{ color: 'white', textAlign: 'center', fontFamily: 'Lora, serif', marginTop: '50px' }}>Loading Inventory...</h2>
            ) : products.length === 0 ? (
                <h2 style={{ color: 'white', textAlign: 'center', fontFamily: 'Lora, serif', marginTop: '50px' }}>No products available.</h2>
            ) : (
                <div className="products-page-grid">
                    {products.map((product) => (
                        <div key={product._id || product.id} className="prod-page-card">
                            
                            {/* Clickable Area: Image and Title */}
                            <Link 
                                to={`/product/${product._id || product.id}`} 
                                style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <div className="prod-page-img-container">
                                    {/* Optional Special Offer Tag */}
                                    {product.price > 200 && (
                                        <div className="special-offer-tag">12+2<br/>SPECIAL<br/>OFFER</div>
                                    )}
                                    
                                    <img 
                                        src={product.image || 'https://via.placeholder.com/250?text=No+Image'} 
                                        alt={product.name} 
                                        className="prod-page-img" 
                                    />
                                </div>

                                <h3 className="prod-page-title">{product.name}</h3>
                            </Link>

                            {/* Non-Clickable Area: Price and Button */}
                            <p className="prod-page-price">{product.price}/-</p>

                            <button 
                                className="prod-page-btn" 
                                onClick={() => handleOrder(product.name, product.price)}
                            >
                                ORDER NOW
                            </button>
                            
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}



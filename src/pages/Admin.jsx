// src/pages/Admin.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaBoxOpen, FaSearch, FaChartBar } from 'react-icons/fa';
import api from '../services/api';
import './Admin.css';

export default function Admin() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Agarbatti', 
        inStock: true,         
        description: '',
        image: ''
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            alert("Access Denied. Please log in first.");
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [navigate]);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            if (Array.isArray(response.data)) {
                setProducts(response.data);
            } else {
                setProducts([]); 
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        }
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/products', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
            });
            alert("Product added successfully!");
            setFormData({ name: '', price: '', category: 'Agarbatti', inStock: true, description: '', image: '' }); 
            fetchProducts(); 
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Make sure you are authorized.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this product?")) {
            try {
                await api.delete(`/products/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` }
                });
                fetchProducts(); 
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("Failed to delete product.");
            }
        }
    };

    // --- BULLETPROOF HELPERS --- //
    // This safely extracts the category name whether it's an object from your DB or a simple string
    const getCategoryName = (cat) => {
        if (!cat) return 'Other';
        if (typeof cat === 'object' && cat.name) return cat.name; // Grabs the name from the {_id, name, icon} object!
        if (typeof cat === 'string') return cat;
        return 'Other';
    };

    const filteredProducts = products.filter(product => {
        const safeName = product?.name || ''; 
        return safeName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Safely count unique categories without crashing
    const uniqueCategories = [...new Set(products.map(p => getCategoryName(p.category)))];

    return (
        <div className="admin-container">
            
            <div className="admin-header">
                <div>
                    <h1 className="admin-title">JGM COMMAND CENTER</h1>
                    <p className="admin-subtitle">Manage inventory, track stock, and organize categories.</p>
                </div>
                <div style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.2)' }}>
                    <FaChartBar />
                </div>
            </div>

            <div className="admin-stats-row">
                <div className="stat-card">
                    <span className="stat-title">Total Products</span>
                    <h2 className="stat-value">{products.length}</h2>
                </div>
                <div className="stat-card">
                    <span className="stat-title">In Stock</span>
                    <h2 className="stat-value">{products.filter(p => p?.inStock !== false).length}</h2>
                </div>
                <div className="stat-card">
                    <span className="stat-title">Categories Active</span>
                    <h2 className="stat-value">{uniqueCategories.length}</h2>
                </div>
            </div>

            <div className="admin-grid">
                
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3><FaPlus style={{ color: '#f1c40f', marginRight: '10px' }}/> Add New Product</h3>
                    </div>

                    <form onSubmit={handleAddProduct}>
                        <div className="admin-form-group">
                            <label>Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. ZIO PREMIUM AGARBATTI" />
                        </div>
                        
                        <div className="form-row">
                            <div className="admin-form-group">
                                <label>Price (₹)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} required placeholder="0" />
                            </div>
                            
                            <div className="admin-form-group">
                                <label>Category</label>
                                <select name="category" value={formData.category} onChange={handleChange}>
                                    <option value="Agarbatti">Agarbatti</option>
                                    <option value="Perfume">Perfume</option>
                                    <option value="Herbal Care">Herbal Care</option>
                                    <option value="Vaporizer">Vaporizer</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label>Image URL</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Paste image link here..." />
                        </div>

                        <div className="admin-form-group">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required placeholder="Detail the herbal ingredients and benefits..."></textarea>
                        </div>

                        <div className="checkbox-group">
                            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} id="stockToggle" />
                            <label htmlFor="stockToggle" style={{ margin: 0, cursor: 'pointer' }}>Product is Currently In Stock</label>
                        </div>

                        <button type="submit" className="admin-submit-btn" disabled={loading}>
                            {loading ? "Processing..." : "PUBLISH PRODUCT"}
                        </button>
                    </form>
                </div>

                <div className="admin-card">
                    <div className="admin-card-header">
                        <h3><FaBoxOpen style={{ color: '#216f56', marginRight: '10px' }}/> Inventory</h3>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <FaSearch style={{ position: 'absolute', left: '10px', color: '#94a3b8' }} />
                            <input 
                                type="text" 
                                className="inventory-search" 
                                placeholder="Search products..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ paddingLeft: '35px' }}
                            />
                        </div>
                    </div>
                    
                    {filteredProducts.length === 0 ? (
                        <p style={{ color: '#718096', fontStyle: 'italic', textAlign: 'center', marginTop: '40px' }}>No products match your search.</p>
                    ) : (
                        <div className="inventory-list">
                            {filteredProducts.map((product) => (
                                <div key={product._id || product.id} className="inventory-item">
                                    <div className="inventory-info">
                                        <img src={product?.image || 'https://via.placeholder.com/80'} alt={product?.name || 'Unknown'} className="inventory-img" />
                                        <div className="inventory-details">
                                            <h4>{product?.name || 'Unnamed Product'}</h4>
                                            
                                            <div className="inventory-meta">
                                                <span style={{ fontWeight: 'bold' }}>₹{product?.price || 0}/-</span>
                                                {/* Uses our new bulletproof helper to get the name safely! */}
                                                <span className="badge category">{getCategoryName(product?.category)}</span>
                                                <span className={`badge ${product?.inStock !== false ? 'stock-in' : 'stock-out'}`}>
                                                    {product?.inStock !== false ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="delete-btn" onClick={() => handleDelete(product._id || product.id)} title="Delete Product">
                                        <FaTrash /> Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
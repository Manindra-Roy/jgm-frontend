// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Your axios instance
import logo from '../assets/brand-logo.png';
import './Login.css';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    // State to hold the form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle input typing
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear errors when user starts typing again
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                // --- LOGIN PROCESS ---
                // Adjust the URL if your backend route is different (e.g., /users/login)
                const response = await api.post('/users/login', {
                    email: formData.email,
                    password: formData.password
                });

                // Save the token to localStorage so the browser remembers who is logged in
                localStorage.setItem('userToken', response.data.token);
                
                // Redirect to the home page!
                navigate('/');
                
            } else {
                // --- REGISTRATION PROCESS ---
                // Adjust the URL if your backend route is different (e.g., /users/register)
                const response = await api.post('/users/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                });

                // If registration is successful, automatically log them in or switch to login tab
                alert("Account created successfully! You can now log in.");
                setIsLogin(true); 
                setFormData({ name: '', email: '', password: '' }); // Clear form
            }
        } catch (err) {
            console.error("Authentication Error:", err);
            // Display the error message from the backend, or a generic one
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            
            <div className="login-header">
                <Link to="/">
                    <img src={logo} alt="JGM Logo" className="login-logo" />
                </Link>
                <h1 className="login-title">JGM INDUSTRIES</h1>
            </div>

            <div className="login-card">
                <h2 className="login-card-title">
                    ....{isLogin ? 'Login' : 'Register'}....
                </h2>

                {/* Show error messages if they exist */}
                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    
                    {!isLogin && (
                        <div className="login-form-group">
                            <label>Name</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                    )}

                    <div className="login-form-group">
                        <label>E-mail</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    <div className="login-form-group">
                        <label>Pass</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required 
                        />
                    </div>

                    {isLogin && (
                        <div className="forgot-pass">
                            <span>FORGOT PASS</span>
                        </div>
                    )}
                    
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button type="submit" disabled={loading} style={{
                            backgroundColor: '#5c0b0b',
                            color: 'white',
                            border: 'none',
                            padding: '10px 30px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            borderRadius: '5px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginBottom: '15px',
                            opacity: loading ? 0.7 : 1
                        }}>
                            {loading ? 'Processing...' : (isLogin ? 'Submit' : 'Create Account')}
                        </button>
                        <p style={{ cursor: 'pointer', color: '#5c0b0b', fontWeight: 'bold' }} onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}>
                            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
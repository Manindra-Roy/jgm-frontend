// src/pages/Contact.jsx
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaHeadset } from 'react-icons/fa';
import './Contact.css';
import heroBg from '../assets/home-bg.jpg';

export default function Contact() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    // Loading and success states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Prepare the data for Web3Forms
        const object = {
            ...formData,
            access_key: "YOUR_ACCESS_KEY_HERE" // <-- PASTE YOUR KEY HERE
        };
        const json = JSON.stringify(object);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            });
            const result = await response.json();

            if (result.success) {
                setSubmitStatus("success");
                setFormData({ name: '', email: '', phone: '', message: '' }); // Clear the form
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-hero" style={{ backgroundImage: `url(${heroBg})` }}>
                <div className="contact-overlay"></div>
                <h1 className="contact-hero-title">CONTACT US</h1>
            </div>

            <div className="contact-content">
                {/* Left Side: Information Card */}
                <div className="contact-info-card">
                    <h2 className="info-title">Get In Touch</h2>
                    
                    <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <div className="info-text">
                            <h4>Address</h4>
                            <p>SILIGURI, DARJEELING<br/>734434 (W.B)</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaPhoneAlt className="info-icon" />
                        <div className="info-text">
                            <h4>Phone No.</h4>
                            <p>76796-00984</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaHeadset className="info-icon" />
                        <div className="info-text">
                            <h4>Customer Care</h4>
                            <p>62962-63480</p>
                        </div>
                    </div>

                    <div className="info-item">
                        <FaEnvelope className="info-icon" />
                        <div className="info-text">
                            <h4>E-Mail</h4>
                            <p>jgmindustriesofficial@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="contact-form-card">
                    <h2 className="form-title">Send a Message</h2>
                    <p className="form-subtitle">Have a question about our herbal products? Drop us a line.</p>

                    {/* Show Success or Error Messages */}
                    {submitStatus === "success" && (
                        <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px', fontWeight: 'bold' }}>
                            Thank you! Your message has been sent successfully. We will contact you soon.
                        </div>
                    )}
                    {submitStatus === "error" && (
                        <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '5px', marginBottom: '20px', fontWeight: 'bold' }}>
                            Oops! Something went wrong. Please try again later.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="form-group">
                                <label>E-Mail</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91..." />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" placeholder="How can we help you today?"></textarea>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass-panel" style={{
            marginTop: 'auto',
            borderRadius: '16px 16px 0 0',
            borderBottom: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            padding: '40px 0 20px 0'
        }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', marginBottom: '40px' }}>
                    {/* Brand Section */}
                    <div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            background: 'linear-gradient(to right, #fff, #a5b4fc)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '20px',
                            display: 'inline-block'
                        }}>
                            LUXE COMMERCE
                        </h3>
                        <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                            Premium products for a premium lifestyle. Experience the future of shopping with our curated collection of high-end essentials.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}><Link to="/" className="nav-link">Home</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link to="/shop" className="nav-link">Shop Collection</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link to="/cart" className="nav-link">My Cart</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link to="/login" className="nav-link">Login / Register</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>Contact Us</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#ccc' }}>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <MapPin size={18} color="var(--accent-color)" />
                                <span>123 Innovation Dr, Tech City</span>
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Phone size={18} color="var(--accent-color)" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Mail size={18} color="var(--accent-color)" />
                                <span>support@luxecommerce.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social & Copyright */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div style={{ color: '#888', fontSize: '0.9rem' }}>
                        © {new Date().getFullYear()} Luxe Commerce. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <a href="#" style={{ color: '#ccc', transition: 'color 0.3s' }}><Facebook size={20} /></a>
                        <a href="#" style={{ color: '#ccc', transition: 'color 0.3s' }}><Twitter size={20} /></a>
                        <a href="#" style={{ color: '#ccc', transition: 'color 0.3s' }}><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

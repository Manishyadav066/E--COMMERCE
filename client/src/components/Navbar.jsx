import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import SearchBox from './SearchBox';
import AddProductModal from './AddProductModal';

const Navbar = () => {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Simple check for logged in user
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <>
            <nav className="glass-panel" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                margin: '0',
                borderRadius: '0 0 16px 16px',
                borderTop: 'none',
                borderLeft: 'none',
                borderRight: 'none'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                    <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginRight: '20px' }}>
                        LUXE COMMERCE
                    </Link>

                    <SearchBox />

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
                        <Link to="/" className="nav-link">Home</Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="nav-link"
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                                fontSize: 'inherit',
                                padding: 0,
                                color: 'inherit'
                            }}
                        >
                            Add Product
                        </button>
                        <Link to="/shop" className="nav-link">Shop</Link>
                        <Link to="/cart" style={{ position: 'relative' }}>
                            <ShoppingCart size={24} />
                            {cartItems.length > 0 && (
                                <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--accent-color)', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        <Link to={userInfo ? "/profile" : "/login"}>
                            <User size={24} />
                        </Link>
                    </div>
                </div>
            </nav>
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={() => {
                    if (window.location.pathname === '/shop') {
                        window.location.reload();
                    } else {
                        navigate('/shop');
                    }
                }}
            />
        </>
    );
};

export default Navbar;

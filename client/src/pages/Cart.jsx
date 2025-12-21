import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, getCartTotal } = useCart();

    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }} className="animate-fade-in">
                <h2>Your cart is empty</h2>
                <Link to="/shop">
                    <button className="glass-button" style={{ marginTop: '20px' }}>Go to Shop</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in" style={{ padding: '20px' }}>
            <h1 style={{ marginBottom: '30px' }}>Your Shopping Cart</h1>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                <div style={{ flex: 2 }}>
                    {cartItems.map((item) => (
                        <div key={item._id} className="glass-panel" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '20px',
                            marginBottom: '15px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }}
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <div>
                                    <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>${item.price} x {item.qty}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>${(item.price * item.qty).toFixed(2)}</span>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ flex: 1 }}>
                    <div className="glass-panel" style={{ padding: '25px' }}>
                        <h3 style={{ marginTop: 0 }}>Order Summary</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span>Subtotal</span>
                            <span>${getCartTotal()}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div style={{ height: '1px', background: 'var(--glass-border)', marginBottom: '25px' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>${getCartTotal()}</span>
                        </div>
                        <button className="glass-button" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            Checkout <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

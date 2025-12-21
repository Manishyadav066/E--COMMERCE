import { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Shop = () => {
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const keyword = location.search;

    const fetchProducts = async () => {
        try {
            const { data } = await api.get(`/products${keyword}`);
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError('Could not load products.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [keyword]);

    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;

    return (
        <div className="animate-fade-in" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1 style={{ margin: 0, textAlign: 'left' }}>Shop Collection</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', width: '100%' }}>
                {products.map((product) => (
                    <div key={product._id} className="glass-panel" style={{ padding: '15px', display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            height: '180px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '8px',
                            marginBottom: '15px',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Link to={`/products/${product._id}`} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = 'Image not available'; }}
                                />
                            </Link>
                        </div>

                        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h3 style={{ margin: '0 0 5px 0', fontSize: '1rem' }}>{product.name}</h3>
                        </Link>

                        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                ${product.price}
                            </span>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                                <button
                                    className="glass-button"
                                    style={{ padding: '5px 10px', fontSize: '0.8rem', flex: 1 }}
                                    onClick={() => addToCart(product)}
                                >
                                    Add Cart
                                </button>
                                <button
                                    className="glass-button"
                                    style={{ padding: '5px 10px', fontSize: '0.8rem', backgroundColor: '#fa8900', flex: 1 }}
                                    onClick={() => {
                                        addToCart(product);
                                        navigate('/shipping');
                                    }}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shop;

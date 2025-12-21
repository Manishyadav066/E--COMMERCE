import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo) {
            navigate('/login');
        } else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            fetchOrders(userInfo.token);
        }
    }, [navigate]);

    const fetchOrders = async (token) => {
        try {
            const res = await fetch('http://localhost:5000/api/orders/myorders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            setOrders(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch orders');
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
                <h2>User Profile</h2>
                <form>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Name</label>
                        <input type="text" value={name} disabled style={{ width: '100%', padding: '0.5rem', backgroundColor: '#f3f3f3' }} />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Email Address</label>
                        <input type="email" value={email} disabled style={{ width: '100%', padding: '0.5rem', backgroundColor: '#f3f3f3' }} />
                    </div>
                </form>
            </div>
            <div style={{ flex: 2 }}>
                <h2>My Orders</h2>
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f3f3' }}>
                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>ID</th>
                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>DATE</th>
                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>TOTAL</th>
                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>PAID</th>
                                <th style={{ padding: '0.5rem', textAlign: 'left' }}>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} style={{ borderBottom: '1px solid #ddd' }}>
                                    <td style={{ padding: '0.5rem' }}>{order._id}</td>
                                    <td style={{ padding: '0.5rem' }}>{order.createdAt.substring(0, 10)}</td>
                                    <td style={{ padding: '0.5rem' }}>${order.totalPrice}</td>
                                    <td style={{ padding: '0.5rem' }}>
                                        {order.isPaid ? (
                                            <span style={{ color: 'green' }}>{order.paidAt.substring(0, 10)}</span>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>
                                        {order.isDelivered ? (
                                            <span style={{ color: 'green' }}>{order.deliveredAt.substring(0, 10)}</span>
                                        ) : (
                                            <i className="fas fa-times" style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td style={{ padding: '0.5rem' }}>
                                        <Link to={`/order/${order._id}`}>
                                            <button style={{ cursor: 'pointer', padding: '5px 10px' }}>Details</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const res = await fetch(`http://localhost:5000/api/orders/${id}`, config);
                if (!res.ok) {
                    throw new Error('Order not found');
                }
                const data = await res.json();
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    const payHandler = async () => {
        // Simulate payment
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: 'MOCK_PAYMENT_ID',
                    status: 'COMPLETED',
                    update_time: new Date().toISOString(),
                    email_address: 'mock@example.com'
                })
            };

            const res = await fetch(`http://localhost:5000/api/orders/${id}/pay`, config);
            if (res.ok) {
                const updatedOrder = await res.json();
                setOrder(updatedOrder);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <>
            <h1>Order {order._id}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ flex: 2 }}>
                    <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant="success">Delivered on {order.deliveredAt}</Message>
                        ) : (
                            <Message variant="danger">Not Delivered</Message>
                        )}
                    </div>

                    <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h2>Payment Method</h2>
                        <p><strong>Method: </strong> {order.paymentMethod}</p>
                        {order.isPaid ? (
                            <Message variant="success">Paid on {order.paidAt.substring(0, 10)}</Message>
                        ) : (
                            <Message variant="danger">Not Paid</Message>
                        )}
                    </div>

                    <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <div>
                                {order.orderItems.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                                        <div style={{ flex: 1 }}>
                                            <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                                        </div>
                                        <div style={{ flex: 2 }}>
                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
                        <h2>Order Summary</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Items</span>
                            <span>${(order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Shipping</span>
                            <span>${order.shippingPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Tax</span>
                            <span>${order.taxPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>${order.totalPrice}</span>
                        </div>
                        {!order.isPaid && (
                            <button
                                type="button"
                                style={{
                                    width: '100%',
                                    backgroundColor: '#f0c14b',
                                    border: '1px solid #a88734',
                                    padding: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={payHandler}
                            >
                                Pay Now (Mock)
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;

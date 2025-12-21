import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PlaceOrder = () => {
    const { cartItems, shippingAddress, paymentMethod, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(Number(getCartTotal()));
    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
    const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const placeOrderHandler = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            if (!token) {
                navigate('/login');
                return;
            }

            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                }),
            });

            if (res.ok) {
                const data = await res.json();
                clearCart();
                navigate(`/order/${data._id}`);
            } else {
                alert('Place Order Failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                <div style={{ flex: 2 }}>
                    <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city},{' '}
                            {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {paymentMethod}
                    </div>

                    <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <h2>Order Items</h2>
                        {cartItems.length === 0 ? (
                            <Message>Your cart is empty</Message>
                        ) : (
                            <div>
                                {cartItems.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #eee', padding: '0.5rem 0' }}>
                                        <div style={{ flex: 1 }}>
                                            <img src={item.image} alt={item.name} style={{ width: '50px' }} />
                                        </div>
                                        <div style={{ flex: 2 }}>
                                            <Link to={`/products/${item._id}`}>{item.name}</Link>
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
                            <span>${itemsPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Shipping</span>
                            <span>${shippingPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span>Tax</span>
                            <span>${taxPrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold' }}>
                            <span>Total</span>
                            <span>${totalPrice}</span>
                        </div>
                        <button
                            type="button"
                            style={{
                                width: '100%',
                                backgroundColor: '#f0c14b',
                                border: '1px solid #a88734',
                                padding: '10px',
                                cursor: 'pointer',
                            }}
                            disabled={cartItems.length === 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;

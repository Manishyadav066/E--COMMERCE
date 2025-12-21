import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const stepStyle = {
        marginRight: '1rem',
        fontWeight: 'bold',
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={stepStyle}>
                {step1 ? (
                    <Link to='/login' style={{ color: 'green' }}>Sign In</Link>
                ) : (
                    <span style={{ color: '#ccc' }}>Sign In</span>
                )}
            </div>

            <div style={stepStyle}>
                {step2 ? (
                    <Link to='/shipping' style={{ color: 'green' }}>Shipping</Link>
                ) : (
                    <span style={{ color: '#ccc' }}>Shipping</span>
                )}
            </div>

            <div style={stepStyle}>
                {step3 ? (
                    <Link to='/payment' style={{ color: 'green' }}>Payment</Link>
                ) : (
                    <span style={{ color: '#ccc' }}>Payment</span>
                )}
            </div>

            <div style={stepStyle}>
                {step4 ? (
                    <Link to='/placeorder' style={{ color: 'green' }}>Place Order</Link>
                ) : (
                    <span style={{ color: '#ccc' }}>Place Order</span>
                )}
            </div>
        </div>
    );
};

export default CheckoutSteps;

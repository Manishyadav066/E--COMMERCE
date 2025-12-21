import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const Payment = () => {
    const { shippingAddress, savePaymentMethod } = useCart();
    const navigate = useNavigate();

    if (!shippingAddress.address) {
        navigate('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        savePaymentMethod(paymentMethod);
        navigate('/placeorder');
    };

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <form onSubmit={submitHandler}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>Select Method</label>
                    <div style={{ marginTop: '1rem' }}>
                        <input
                            type="radio"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="PayPal" style={{ marginLeft: '0.5rem' }}>PayPal or Credit Card</label>
                    </div>
                </div>
                <button type="submit" style={{ backgroundColor: '#f0c14b', border: '1px solid #a88734', padding: '10px 20px', cursor: 'pointer' }}>
                    Continue
                </button>
            </form>
        </FormContainer>
    );
};

export default Payment;

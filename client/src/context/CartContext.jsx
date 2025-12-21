import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find((item) => item._id === product._id);
            if (itemExists) {
                return prevItems.map((item) =>
                    item._id === product._id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, qty: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
    };

    const [shippingAddress, setShippingAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const saveShippingAddress = (data) => {
        setShippingAddress(data);
    };

    const savePaymentMethod = (data) => {
        setPaymentMethod(data);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
                shippingAddress,
                saveShippingAddress,
                paymentMethod,
                savePaymentMethod,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

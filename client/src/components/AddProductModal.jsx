import React, { useState } from 'react';
import api from '../utils/api';

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await api.post('/products', {
                name,
                price: Number(price),
                image,
                brand,
                category,
                countInStock: Number(countInStock),
                description,
            });
            onProductAdded();
            onClose();
            // Reset form
            setName('');
            setPrice('');
            setImage('');
            setBrand('');
            setCategory('');
            setCountInStock('');
            setDescription('');
        } catch (error) {
            alert('Failed to create product');
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
        }}>
            <div className="glass-panel" style={{
                padding: '30px',
                borderRadius: '16px',
                width: '500px',
                maxWidth: '90%',
                maxHeight: '90vh', // Ensure it doesn't exceed viewport height
                overflowY: 'auto', // Enable vertical scrolling
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(255, 255, 255, 0.95)' // Increased opacity for better visibility
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ margin: 0, background: 'linear-gradient(to right, #4f46e5, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.8rem' }}>New Product</h2>
                    <button onClick={onClose} style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        color: '#666',
                        lineHeight: 1
                    }}>×</button>
                </div>
                <form onSubmit={submitHandler}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Product Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                outline: 'none',
                                transition: 'all 0.3s',
                                backgroundColor: 'rgba(255,255,255,0.5)'
                            }}
                            placeholder="e.g. Wireless Noise Cancelling Headphones"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Price ($)</label>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    backgroundColor: 'rgba(255,255,255,0.5)'
                                }}
                                placeholder="0.00"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Stock Count</label>
                            <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    backgroundColor: 'rgba(255,255,255,0.5)'
                                }}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                outline: 'none',
                                backgroundColor: 'rgba(255,255,255,0.5)'
                            }}
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Brand</label>
                            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    backgroundColor: 'rgba(255,255,255,0.5)'
                                }}
                                placeholder="Brand Name"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Category</label>
                            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    outline: 'none',
                                    backgroundColor: 'rgba(255,255,255,0.5)'
                                }}
                                placeholder="Electronics, Fashion..."
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#374151' }}>Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #d1d5db',
                                outline: 'none',
                                minHeight: '100px',
                                resize: 'vertical',
                                backgroundColor: 'rgba(255,255,255,0.5)'
                            }}
                            placeholder="Detailed product description..."
                        ></textarea>
                    </div>

                    <button type="submit" style={{
                        width: '100%',
                        padding: '14px',
                        background: 'linear-gradient(to right, #4f46e5, #9333ea)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2), 0 2px 4px -1px rgba(79, 70, 229, 0.1)',
                        transition: 'transform 0.2s',
                    }}
                        onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProductModal;

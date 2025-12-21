import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Message from '../components/Message';
import Loader from '../components/Loader';
import api from '../utils/api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError('Product not found');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        addToCart({ ...product, qty: Number(qty) });
    };

    const submitReviewHandler = async (e) => {
        e.preventDefault();
        setReviewLoading(true);
        try {
            // Mock auth check
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                alert('Please login');
                setReviewLoading(false);
                return;
            }

            await api.post(`/products/${id}/reviews`, {
                rating,
                comment
            }, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });

            alert('Review Submitted');
            setRating(0);
            setComment('');
            // Re-fetch
            const { data } = await api.get(`/products/${id}`);
            setProduct(data);
            setReviewLoading(false);
        } catch (err) {
            setReviewError(err.response?.data?.message || err.message);
            setReviewLoading(false);
        }
    };

    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;

    return (
        <div className="animate-fade-in">
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div>
                    <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px' }} />
                </div>
                <div>
                    <h2>{product.name}</h2>
                    <div style={{ margin: '1rem 0', color: '#f0c14b' }}>
                        Rating: {product.rating} / 5 ({product.numReviews} reviews)
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Price: ${product.price}</div>
                    <p>{product.description}</p>
                </div>
                <div>
                    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span>Price:</span>
                            <strong>${product.price}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span>Status:</span>
                            <span>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                        {product.countInStock > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span>Qty:</span>
                                <select value={qty} onChange={(e) => setQty(e.target.value)} style={{ padding: '5px' }}>
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    )).slice(0, 10)}
                                </select>
                            </div>
                        )}
                        <button
                            onClick={addToCartHandler}
                            className="btn-primary"
                            disabled={product.countInStock === 0}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#f0c14b', border: '1px solid #a88734', cursor: 'pointer', marginBottom: '10px' }}
                        >
                            Add To Cart
                        </button>
                        <button
                            onClick={() => {
                                addToCartHandler();
                                navigate('/shipping');
                            }}
                            className="btn-primary"
                            disabled={product.countInStock === 0}
                            style={{ width: '100%', padding: '10px', backgroundColor: '#fa8900', border: '1px solid #c45500', cursor: 'pointer' }}
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ul>
                    {product.reviews.map(review => (
                        <li key={review._id} style={{ borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                            <strong>{review.name}</strong>
                            <div style={{ color: '#f0c14b' }}>Rating: {review.rating} / 5</div>
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: '2rem' }}>
                    <h2>Write a Customer Review</h2>
                    {reviewError && <Message variant="danger">{reviewError}</Message>}
                    {JSON.parse(localStorage.getItem('userInfo')) ? (
                        <form onSubmit={submitReviewHandler}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Rating</label>
                                <select value={rating} onChange={(e) => setRating(e.target.value)} style={{ display: 'block', width: '100%', padding: '0.5rem' }}>
                                    <option value="">Select...</option>
                                    <option value="1">1 - Poor</option>
                                    <option value="2">2 - Fair</option>
                                    <option value="3">3 - Good</option>
                                    <option value="4">4 - Very Good</option>
                                    <option value="5">5 - Excellent</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label>Comment</label>
                                <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{ display: 'block', width: '100%', padding: '0.5rem' }}></textarea>
                            </div>
                            <button type="submit" style={{ backgroundColor: '#f0c14b', border: '1px solid #a88734', padding: '10px 20px', cursor: 'pointer' }}>
                                Submit
                            </button>
                        </form>
                    ) : (
                        <Message>Please <Link to="/login">sign in</Link> to write a review</Message>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;

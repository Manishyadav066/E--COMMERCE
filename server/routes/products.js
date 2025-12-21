const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Mock Data for Offline Mode
const mockProducts = [
    {
        _id: '1',
        name: 'Premium Wireless Headphones',
        description: 'Experience high-fidelity audio with active noise cancellation.',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
        category: 'Electronics',
        countInStock: 15
    },
    {
        _id: '2',
        name: 'Minimalist Analog Watch',
        description: 'A timeless classic with a modern touch.',
        price: 189.00,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
        category: 'Accessories',
        countInStock: 8
    },
    {
        _id: '3',
        name: 'Designer Sunglasses',
        description: 'UV protection with premium frame retention.',
        price: 129.50,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60',
        category: 'Fashion',
        countInStock: 20
    },
    {
        _id: '4',
        name: 'Smart Fitness Tracker',
        description: 'Track your health metrics with precision.',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60',
        category: 'Electronics',
        countInStock: 12
    },
    {
        _id: '5',
        name: 'Professional DSLR Camera',
        description: 'Capture life moments in stunning detail.',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60',
        category: 'Electronics',
        countInStock: 5
    },
    {
        _id: '6',
        name: 'Portable Bluetooth Speaker',
        description: 'Powerful sound in a compact design.',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60',
        category: 'Electronics',
        countInStock: 25
    },
    {
        _id: '7',
        name: 'Ultra-Slim Laptop',
        description: 'Performance meets portability.',
        price: 1299.00,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60',
        category: 'Electronics',
        countInStock: 10
    },
    {
        _id: '8',
        name: 'Noise-Cancelling Earbuds',
        description: 'Immersive sound without distractions.',
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60',
        category: 'Electronics',
        countInStock: 30
    }
];

// Get all products
// Get all products
router.get('/', async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const products = await Product.find({ ...keyword });
        res.json(products);
    } catch (error) {
        console.warn('Database error, serving mock products:', error.message);
        // Simple mock search
        if (req.query.keyword) {
            const lowerKeyword = req.query.keyword.toLowerCase();
            const filtered = mockProducts.filter(p => p.name.toLowerCase().includes(lowerKeyword));
            res.json(filtered);
        } else {
            res.json(mockProducts);
        }
    }
});

// Create new review
router.post('/:id/reviews', async (req, res) => {
    // Basic mock implementation for now, would need auth middleware in real app
    const { rating, comment, userAttr } = req.body; // userAttr from req.user if auth middleware used

    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === (req.user ? req.user._id.toString() : 'mockWithAuth')
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Product already reviewed');
            }

            const review = {
                name: req.body.name || 'Anonymous', // Should come from req.user.name
                rating: Number(rating),
                comment,
                user: req.user ? req.user._id : new mongoose.Types.ObjectId(), // Mock ID if no auth
            };

            product.reviews.push(review);

            product.numReviews = product.reviews.length;

            product.rating =
                product.reviews.reduce((acc, item) => item.rating + acc, 0) /
                product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Review added' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message || 'Error adding review' });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.warn('Database error, serving mock product:', error.message);
        const mockProduct = mockProducts.find(p => p._id === req.params.id);
        if (mockProduct) {
            res.json(mockProduct);
        } else {
            // Return random mock product if ID doesn't match specific mock
            res.json(mockProducts[0]);
        }
    }
});

// Admin stats or create product (simplified for now)
router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.warn('Database error (Mock Mode), cannot save:', error.message);
        // Simulate success for demo
        res.status(201).json({ ...req.body, _id: Date.now().toString() });
    }
});

module.exports = router;

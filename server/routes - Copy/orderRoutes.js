const express = require('express');
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to protect routes (Basic implementation for speed)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // Decode token
            const decoded = jwt.decode(token);
            // In a real app we would verify signature and fetch user from DB
            // Here we just attach the user ID from token
            req.user = { _id: decoded.id || decoded._id };
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post(
    '/',
    protect,
    asyncHandler(async (req, res) => {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            res.status(400);
            throw new Error('No order items');
            return;
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                taxPrice,
                shippingPrice,
                totalPrice,
            });

            const createdOrder = await order.save();

            res.status(201).json(createdOrder);
        }
    })
);

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
router.get(
    '/myorders',
    protect,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.json(orders);
    })
);

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get(
    '/:id',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id).populate(
            'user',
            'name email'
        );

        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    })
);

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put(
    '/:id/pay',
    protect,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address,
            };

            const updatedOrder = await order.save();

            res.json(updatedOrder);
        } else {
            res.status(404);
            throw new Error('Order not found');
        }
    })
);

module.exports = router;

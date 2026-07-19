const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Token verify karne ke liye
const { upgradePlan, verifyPaymentAndUpdate } = require('../controllers/subscriptionController');

// Route 1: Razorpay Order Create karna (Frontend ko bhejega)
// Method: POST | Endpoint: /api/subscription/upgrade
router.post('/upgrade', auth, upgradePlan);

// Route 2: Payment successful hone ke baad Account Update karna
// Method: POST | Endpoint: /api/subscription/verify
router.post('/verify', auth, verifyPaymentAndUpdate);

// YE LINE SABSE IMPORTANT HAI - Isike miss hone se wo error aata hai
module.exports = router;
const User = require('../models/User');

exports.upgradePlan = async (req, res) => {
  try {
    const { planType } = req.body; 
    
    const userId = req.user?.id || req.user?.userId || req.user?._id;
    let user = await User.findById(userId || req.body.userId);

    let amount = 0;
    if (planType === 'basic_149') amount = 149 * 100;
    else if (planType === 'premium_299') amount = 299 * 100;

 
    const mockOrder = {
      id: `order_mock_${Math.random().toString(36).substring(2, 9)}`,
      entity: "order",
      amount: amount,
      amount_paid: 0,
      amount_due: amount,
      currency: "INR",
      receipt: `receipt_order_mock`,
      status: "created",
      attempts: 0,
      notes: [],
      created_at: Math.floor(Date.now() / 1000)
    };

    return res.json({ 
      order: mockOrder,
      key_id: 'rzp_test_TE5LhivwWGjdXh', 
      planType: planType,
      isMock: true 
    });
    
  } catch (err) {
    console.error("🔥 Error:", err);
    res.status(500).send('Server Error');
  }
};

exports.verifyPaymentAndUpdate = async (req, res) => {
  try {
    const { razorpayPaymentId, planType } = req.body;
    const userId = req.user?.id || req.user?.userId || req.user?._id;
    let user = await User.findById(userId);
    user.accountType = planType;
    await user.save();
    res.json({ message: 'Payment successful, account upgraded!', accountType: user.accountType });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
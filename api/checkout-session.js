const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { sessionId } = req.query;
  try {
    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Get customer ID from the session
    const customerId = session.customer;

    // Retrieve the customer's payment history
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
    });

    // Return both the session data and payment history
    res.status(200).json({
      session,
      paymentHistory: paymentIntents.data,
    });
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    res.status(500).json({ error: error.message });
  }
};

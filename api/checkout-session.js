const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { sessionId } = req.query;
  try {
    // Retrieve the session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Get customer ID from the session
    const customerId = session.customer;

    // Initialize an empty array to hold all payment intents
    let allPaymentIntents = [];
    let hasMore = true;
    let startingAfter = null;

    // Paginate through all payment intents for the customer
    while (hasMore) {
      const paymentIntents = await stripe.paymentIntents.list({
        customer: customerId,
        starting_after: startingAfter,
      });

      allPaymentIntents = allPaymentIntents.concat(paymentIntents.data);
      hasMore = paymentIntents.has_more;

      // Set the startingAfter parameter for the next request (if more data exists)
      if (hasMore) {
        startingAfter = paymentIntents.data[paymentIntents.data.length - 1].id;
      }
    }

    // Return both the session data and the complete payment history
    res.status(200).json({
      session,
      paymentHistory: allPaymentIntents,
    });
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    res.status(500).json({ error: error.message });
  }
};

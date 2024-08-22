const express = require('express');
const stripe = require('stripe')('sk_test_nrfdnuHM90YV3MIpOZ97xBH7');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.cart.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });
    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.json(session);
    const paymentIntents = await stripe.paymentIntents.list({
      customer: session.customer,
    });
    console.log('hello');
    console.log(paymentIntents);
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Running on port 4242'));

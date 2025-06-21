// /backend/routes/stripeRoutes.js
import express from 'express';
import stripe from '../config/stripe.js';

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			ui_mode: 'embedded',
			line_items: [
				{
					price: process.env.EXAMPLE_8_CLASSES_PRICE_ID,
					quantity: 1,
				},
			],
			mode: 'payment',
			return_url: `${process.env.FRONT_END_DOMAIN}/checkoutResults?session_id={CHECKOUT_SESSION_ID}`,
			automatic_tax: { enabled: true },
		});

		res.send({ clientSecret: session.client_secret });
	} catch (error) {
		console.error('Error creating checkout session:', error);
		res.status(500).send({ error: 'Something went wrong creating the checkout session.' });
	}
});

router.get('/session-status', async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
		res.send({
			status: session.status,
			customer_email: session.customer_details?.email,
		});
	} catch (error) {
		console.error('Error retrieving session:', error);
		res.status(500).send({ error: 'Failed to retrieve session status.' });
	}
});

export default router;

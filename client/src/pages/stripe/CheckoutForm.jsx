import React, { useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';

// Load your Stripe publishable key (keep secret key on server only)
const stripePromise = loadStripe('pk_test_51RKQvyRVD2l4HOKc0z3cHEQWYDMHtMWFPShvVcnFqKJXIyaMdkfa7NxybDTUmJNE4kfE9HqC2zjAKPZ9nzMlhkoZ00ZUwZnV1F');

// Component that handles the embedded Stripe checkout session
const CheckoutForm = () => {
	// This function fetches the client secret from your backend
	const fetchClientSecret = useCallback(async () => {
		try {
			const response = await fetch('http://localhost:3000/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			return data.clientSecret;
		} catch (error) {
			console.error('Error fetching client secret:', error);
		}
	}, []);

	const options = { fetchClientSecret };

	return (
		<div id='checkout'>
			<EmbeddedCheckoutProvider
				stripe={stripePromise}
				options={options}
			>
				<EmbeddedCheckout />
			</EmbeddedCheckoutProvider>
		</div>
	);
};

export default CheckoutForm;

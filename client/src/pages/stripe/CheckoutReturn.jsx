import React, { useState, useEffect } from 'react';

import { Navigate } from 'react-router-dom';

// Component that handles the return after checkout
const CheckoutReturn = () => {
	const [status, setStatus] = useState(null);
	const [customerEmail, setCustomerEmail] = useState('');

	useEffect(() => {
		const getSessionStatus = async () => {
			try {
				const queryString = window.location.search;
				const urlParams = new URLSearchParams(queryString);
				const sessionId = urlParams.get('session_id');

				const response = await fetch(`http://localhost:3000/session-status?session_id=${sessionId}`);
				const data = await response.json();

				setStatus(data.status);
				setCustomerEmail(data.customer_email);
			} catch (error) {
				console.error('Error fetching session status:', error);
			}
		};

		getSessionStatus();
	}, []);

	if (status === 'open') {
		return <Navigate to='/checkout' />;
	}

	if (status === 'complete') {
		return (
			<section id='success'>
				<p>
					We appreciate your business! A confirmation email will be sent to {customerEmail}.<br />
					If you have any questions, please email <a href='mailto:orders@example.com'>orders@example.com</a>.
				</p>
			</section>
		);
	}

	return null;
};

export default CheckoutReturn;

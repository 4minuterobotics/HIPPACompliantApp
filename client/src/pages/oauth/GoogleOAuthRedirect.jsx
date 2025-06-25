// /auth/callback
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const GoogleOAuthRedirect = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const completeLogin = async () => {
			try {
				const response = await axios.get('/api/auth/google/callback'); // or POST
				const isAdmin = response.data.is_admin;
				const isOwner = response.data.is_owner;
				const isProvider = response.data.is_provider;
				const serviceChosen = response.data.service_chosen;

				if (isAdmin) {
					navigate('/admin');
				} else if (isOwner) {
					navigate('/admin');
				} else if (isProvider) {
					navigate('/admin');
				} else {
					if (!serviceChosen) {
						navigate('/serviceDescription');
					} else navigate('/studentHome');
				}
			} catch (err) {
				console.error('Login failed:', err);
				console.log('error on the page titled GoogleOAuthRedirect.jsx');
				navigate('/login');
			}
		};

		completeLogin();
	}, []);

	return <p>Logging you in...</p>;
};

export default GoogleOAuthRedirect;

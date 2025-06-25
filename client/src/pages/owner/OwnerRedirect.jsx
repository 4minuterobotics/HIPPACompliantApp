// src/pages/ownerView/OwnerRedirect.jsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoleAccessGuard } from '../../hooks/useRoleAccessGuard';

const dbMode = import.meta.env.VITE_APP_DB_MODE;

const OwnerRedirect = () => {
	const { id } = useParams();
	const authUser = useRoleAccessGuard('owner');
	const navigate = useNavigate();

	useEffect(() => {
		if (!authUser || !id) {
			console.warn('Missing authenticated user or owner ID. Redirecting to login.');
			return;
		}

		const userId = dbMode === 'mongo' ? authUser._id : authUser.id;

		console.log(`Authenticated user ID (${dbMode}):`, userId);

		if (String(userId) === id) {
			console.log(`Redirecting to owner dashboard for user ID: ${id}`);
			navigate(`/ownerHome/${id}/dashboard`, { replace: true });
		} else {
			console.warn(`Unauthorized access attempt by ${authUser.email || authUser.google_oauth_email}. Expected ID: ${id}, got: ${userId}`);
			navigate('/accessDenied');
		}
	}, [authUser, id, navigate]);

	return <p>Loading...</p>;
};

export default OwnerRedirect;

// // src/pages/ownerView/OwnerRedirect.jsx
// import { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useRoleAccessGuard } from '../../hooks/useRoleAccessGuard';
// const dbMode = import.meta.env.VITE_APP_DB_MODE;

// const OwnerRedirect = () => {
// 	const { id } = useParams();
// 	const authUser = useRoleAccessGuard('owner');
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		if (!authUser || !id) {
// 			console.log('No authenticated user or owner ID provided. Redirecting to login.');
// 			return;
// 		}
// 		// Log the authenticated user ID for debugging
// 		// If using MongoDB, use authUser._id instead of authUser.id
// 		// If using Postgres, use authUser.id
// 		if (dbMode === 'mongo') {
// 			console.log('Authenticated user ID (MongoDB):', authUser._id);
// 			if (String(authUser._id) === id) {
// 				// Redirect to nested route like /ownerHome/:id/dashboard
// 				console.log('Redirecting to owner dashboard for user ID: ' + id);
// 				navigate(`/ownerHome/${id}/dashboard`, { replace: true });
// 			} else {
// 				console.log('The user ' + authUser.google_oauth_email + ' does not have access to this owner ID: ' + id + '. Redirecting to access denied page.');
// 				navigate('/accessDenied');
// 			}
// 		} else if (dbMode === 'postgres') {
// 			console.log('Authenticated user ID (Postgres):', authUser.id);
// 			if (String(authUser.id) === id) {
// 				// Redirect to nested route like /ownerHome/:id/dashboard
// 				console.log('Redirecting to owner dashboard for user ID: ' + id);
// 				navigate(`/ownerHome/${id}/dashboard`, { replace: true });
// 			} else {
// 				console.log('The user ' + authUser.google_oauth_email + ' does not have access to this owner ID: ' + id + '. Redirecting to access denied page.');
// 				navigate('/accessDenied');
// 			}
// 		}

// 		// Confirm the user ID matches the param
// 		// If using Postgres, compare authUser.id with id
// 		// If using MongoDB, compare authUser._id with id
// 		if (dbMode === 'postgres' && String(authUser.id) === id) {
// 			// Redirect to nested route like /ownerHome/:id/dashboard
// 			console.log('Redirecting to owner dashboard for user ID: ' + id);
// 			navigate(`/ownerHome/${id}/dashboard`, { replace: true });
// 		} else if (dbMode === 'mongo' && String(authUser._id) === id) {
// 			// Redirect to nested route like /ownerHome/:id/dashboard
// 			console.log('Redirecting to owner dashboard for user ID: ' + id);
// 			navigate(`/ownerHome/${id}/dashboard`, { replace: true });
// 		} else {
// 			console.log('The user ' + authUser.google_oauth_email + ' does not have access to this owner ID: ' + id + '. Redirecting to access denied page.');
// 			navigate('/accessDenied');
// 		}
// 	}, [authUser, id, navigate]);

// 	return <p>Loading...</p>;
// };

// export default OwnerRedirect;

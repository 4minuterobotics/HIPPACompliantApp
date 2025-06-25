import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRoleAccessGuard } from '../../hooks/useRoleAccessGuard';

const dbMode = import.meta.env.VITE_APP_DB_MODE;

const StudentRedirect = () => {
	const { id } = useParams();
	const authUser = useRoleAccessGuard('student');
	const navigate = useNavigate();

	useEffect(() => {
		if (!authUser || !id) {
			console.log('No authenticated user or student ID provided. Redirecting to login.');
			navigate('/login', { replace: true });
			return;
		}

		const authUserId = dbMode === 'mongo' ? authUser._id : authUser.id;
		const userLabel = authUser.email || authUser.google_oauth_email || 'Unknown user';

		console.log(`Authenticated user ID (${dbMode}):`, authUserId);

		if (String(authUserId) === id) {
			console.log(`Redirecting to student dashboard for user ID: ${id}`);
			navigate(`/studentHome/${id}/dashboard`, { replace: true });
		} else {
			console.log(`${userLabel} does not have access to student ID: ${id}. Redirecting to access denied.`);
			navigate('/accessDenied', { replace: true });
		}
	}, [authUser, id, navigate]);

	return <p>Loading...</p>;
};

export default StudentRedirect;

// // src/pages/studentView/StudentRedirect.jsx
// import { useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useRoleAccessGuard } from '../../hooks/useRoleAccessGuard';
// const dbMode = import.meta.env.VITE_APP_DB_MODE;

// const StudentRedirect = () => {
// 	const { id } = useParams();
// 	const authUser = useRoleAccessGuard('student');
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		if (!authUser || !id) {
// 			console.log('No authenticated user or student ID provided. Redirecting to login.');
// 			return;
// 		}
// 		// Log the authenticated user ID for debugging
// 		// If using MongoDB, use authUser._id instead of authUser.id
// 		// If using Postgres, use authUser.id
// 		if (dbMode === 'mongo') {
// 			console.log('Authenticated user ID (MongoDB):', authUser._id);
// 			if (String(authUser._id) === id) {
// 				// Redirect to nested route like /studentHome/:id/dashboard
// 				console.log('Redirecting to student dashboard for user ID: ' + id);
// 				navigate(`/studentHome/${id}/dashboard`, { replace: true });
// 			} else {
// 				console.log('The user ' + authUser.google_oauth_email + ' does not have access to this student ID: ' + id + '. Redirecting to access denied page.');
// 				navigate('/accessDenied');
// 			}
// 		} else if (dbMode === 'postgres') {
// 			console.log('Authenticated user ID (Postgres):', authUser.id);
// 			if (String(authUser.id) === id) {
// 				// Redirect to nested route like /studentHome/:id/dashboard
// 				console.log('Redirecting to student dashboard for user ID: ' + id);
// 				navigate(`/studentHome/${id}/dashboard`, { replace: true });
// 			} else {
// 				console.log('The user ' + authUser.google_oauth_email + ' does not have access to this student ID: ' + id + '. Redirecting to access denied page.');
// 				navigate('/accessDenied');
// 			}
// 		}

// 		// Confirm the user ID matches the param
// 		// If using Postgres, compare authUser.id with id
// 		// If using MongoDB, compare authUser._id with id
// 		if (dbMode === 'postgres' && String(authUser.id) === id) {
// 			// Redirect to nested route like /studentHome/:id/dashboard
// 			console.log('Redirecting to student dashboard for user ID: ' + id);
// 			navigate(`/studentHome/${id}/dashboard`, { replace: true });
// 		} else if (dbMode === 'mongo' && String(authUser._id) === id) {
// 			// Redirect to nested route like /studentHome/:id/dashboard
// 			console.log('Redirecting to student dashboard for user ID: ' + id);
// 			navigate(`/studentHome/${id}/dashboard`, { replace: true });
// 		} else {
// 			console.log('The user ' + authUser.google_oauth_email + ' does not have access to this student ID: ' + id + '. Redirecting to access denied page.');
// 			navigate('/accessDenied');
// 		}
// 	}, [authUser, id, navigate]);

// 	return <p>Loading...</p>;
// };

// export default StudentRedirect;
// src/pages/studentView/StudentRedirect.jsx

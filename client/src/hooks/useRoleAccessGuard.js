// // src/hooks/useRoleAccessGuard.js
// import { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext'; // Adjust the import path as needed
// import axios from 'axios';

// export const useRoleAccessGuard = (expectedRole) => {
// 	const [authUser, setAuthUser] = useState(null);
// 	const [loading, setLoading] = useState(true);

// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchCurrentUser = async () => {
// 			try {
// 				const res = await axios.get('http://localhost:3000/api/current-user', {
// 					withCredentials: true,
// 				});

// 				const user = res.data;

// 				// const isStudent = !user.is_admin && !user.is_owner && !user.is_provider;
// 				const isStudent = user.is_student;
// 				const isAdmin = user.is_admin;
// 				const isOwner = user.is_owner;
// 				const isProvider = user.is_provider;

// 				/*if (
// 					(expectedRole === 'student' && !isStudent) ||
// 					((expectedRole === 'admin' || expectedRole === 'owner' || expectedRole === 'provider') && !isAdmin && !isOwner && !isProvider)
// 				) {
// 					navigate('/accessDenied');
// 				} else {
// 					setAuthUser(user);
// 				}*/
// 				if (
// 					(expectedRole === 'student' && !isStudent) ||
// 					(expectedRole === 'owner' && !isOwner) ||
// 					(expectedRole === 'provider' && !isProvider) ||
// 					(expectedRole === 'admin' && !isAdmin)
// 				) {
// 					console.log(
// 						'The user ' +
// 							user.google_oauth_email +
// 							' does not have the required role: ' +
// 							expectedRole +
// 							'. Later log this to a file for admin review. Remove this console log in production.'
// 					);
// 					navigate('/accessDenied');
// 				} else {
// 					console.log('Access granted for user:', user.google_oauth_email);
// 					setAuthUser(user);
// 				}
// 			} catch (err) {
// 				console.error('Access guard failed:', err);
// 				navigate('/login');
// 			} finally {
// 				setLoading(false);
// 			}
// 		};

// 		fetchCurrentUser();
// 	}, [expectedRole, navigate]);

// 	return loading ? null : authUser;
// };

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Adjust the import path as needed

export const useRoleAccessGuard = (expectedRole) => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		// While user is loading (null), do nothing.
		if (user === null) return;

		// If there's no user after loading, redirect to login.
		if (!user) {
			navigate('/login');
			return;
		}

		const isStudent = user.is_student;
		const isAdmin = user.is_admin;
		const isOwner = user.is_owner;
		const isProvider = user.is_provider;

		if (
			(expectedRole === 'student' && !isStudent) ||
			(expectedRole === 'owner' && !isOwner) ||
			(expectedRole === 'provider' && !isProvider) ||
			(expectedRole === 'admin' && !isAdmin)
		) {
			console.log(
				'The user ' +
					user.google_oauth_email +
					' does not have the required role: ' +
					expectedRole +
					'. Later log this to a file for admin review. Remove this console log in production.'
			);
			navigate('/accessDenied');
		} else {
			console.log('Access granted for user:', user.google_oauth_email);
		}
	}, [user, expectedRole, navigate]);

	// Optionally return user if you want to use it
	return user;
};

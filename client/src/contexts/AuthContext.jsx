import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/api/current-user?ts=${Date.now()}`, {
					withCredentials: true,
				});
				console.log('Logged-in user:', res.data);
				setUser(res.data);
			} catch (err) {
				console.log('No user logged in');
				setUser(false);
			}
		};

		fetchUser();
	}, [location.key]); // ✅ triggers on route changes including browser back

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

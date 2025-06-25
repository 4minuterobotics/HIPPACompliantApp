import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AdminCalendar from '../../components/admin/AdminCalendar';
import ToDoList from '../../components/admin/ToDoList';

const Admin = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				// Axios will include cookies with this request
				const res = await axios.get('http://localhost:3000/api/current-user', {
					withCredentials: true,
				});

				const data = res.data;

				if (!data.is_admin) {
					navigate('/accessDenied'); // Redirect non-admins
					return;
				}

				setUser(data); // Set user state
			} catch (err) {
				// If the request fails (e.g., not logged in), redirect to login
				console.error('Failed to fetch user:', err);
				navigate('/login');
			}
		};

		fetchUser();
	}, [navigate]);

	return (
		user?.is_admin && (
			<div className='d-flex justify-content-between'>
				<AdminCalendar />
				<ToDoList />
			</div>
		)
	);
};

export default Admin;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// import AdminCalendar from '../../components/admin/AdminCalendar';
// import ToDoList from '../../components/admin/ToDoList';

// const Admin = () => {
// 	const [user, setUser] = useState(null);
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		const fetchUser = async () => {
// 			try {
// 				// Axios will include cookies with this request
// 				const res = await axios.get('http://localhost:3000/api/current-user', {
// 					withCredentials: true,
// 				});

// 				const data = res.data;

// 				if (!data.is_admin) {
// 					navigate('/accessDenied'); // Redirect non-admins
// 					return;
// 				}

// 				setUser(data); // Set user state
// 			} catch (err) {
// 				// If the request fails (e.g., not logged in), redirect to login
// 				console.error('Failed to fetch user:', err);
// 				navigate('/login');
// 			}
// 		};

// 		fetchUser();
// 	}, [navigate]);

// 	return (
// 		<div className='d-flex justify-content-between'>
// 			<AdminCalendar />
// 			<ToDoList />
// 		</div>
// 	);
// };

// export default Admin;

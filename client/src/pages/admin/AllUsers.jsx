import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './allUsers.css';

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUsersAndCheckAccess = async () => {
			try {
				// 🔐 Get current user
				const userRes = await axios.get('http://localhost:3000/api/current-user', {
					withCredentials: true,
				});
				const user = userRes.data;
				setCurrentUser(user); // ✅ Save user to state

				// 🔒 Check if user is allowed
				const isAuthorized = user.is_admin || user.is_owner || user.is_provider;
				if (!isAuthorized) {
					return navigate('/accessDenied');
				}

				// ✅ Fetch all users (admin-only route)
				const usersRes = await axios.get('http://localhost:3000/api/admin/users', {
					withCredentials: true,
				});
				setUsers(usersRes.data);
			} catch (err) {
				console.error('Access check or fetch failed:', err);
				navigate('/accessDenied');
			}
		};

		fetchUsersAndCheckAccess();
	}, [navigate]);

	return currentUser?.is_admin || currentUser?.is_owner || currentUser?.is_provider ? (
		<div className='container'>
			<h1>Admin Dashboard</h1>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Username</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id}>
							<td>
								{user.first_name} {user.last_name}
							</td>
							<td>{user.username}</td>
							<td>
								<Link to={`/admin/userProfile/${user.id}`}>View Profile</Link>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	) : null;
};

export default AllUsers;

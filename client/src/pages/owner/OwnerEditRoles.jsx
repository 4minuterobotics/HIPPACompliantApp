import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Outlet } from 'react-router-dom';

export default function OwnerEditRoles() {
	const { id } = useParams();
	const [users, setUsers] = useState([]);
	const [editingUser, setEditingUser] = useState(null);
	const [newRole, setNewRole] = useState('');

	console.log('OwnerEditRoles component loaded');

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await axios.get(`/api/owner/${id}/users`, {
					withCredentials: true,
				});
				console.log('Fetched users:', res);
				setUsers(res.data);
			} catch (error) {
				console.error('Failed to fetch users:', error);
			}
		};

		fetchUsers();
	}, []);

	const handleRoleChange = (userId, role, value) => {
		setUsers((prevUsers) => prevUsers.map((user) => (user._id === userId ? { ...user, [role]: value } : user)));
	};

	const handleSave = async (user) => {
		try {
			await axios.post(`/api/owner/users/${user._id}/roles`, user);
			alert('Roles updated!');
		} catch (error) {
			console.error('Failed to update roles:', error);
			alert('Failed to update roles.');
		}
	};

	const handleAddRole = () => {
		setUsers((prevUsers) => prevUsers.map((user) => ({ ...user, [newRole]: false })));
		setNewRole('');
	};

	return (
		<div>
			<h2>Edit User Roles</h2>
			<input
				type='text'
				placeholder='Add new role'
				value={newRole}
				onChange={(e) => setNewRole(e.target.value)}
			/>
			<button onClick={handleAddRole}>Add Role</button>
			<table>
				<thead>
					<tr>
						<th>User</th>
						{users[0] &&
							Object.keys(users[0])
								.filter((key) => key.startsWith('is_'))
								.map((role) => <th key={role}>{role}</th>)}
						<th>Save</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user._id}>
							<td>{user.username || user.email}</td>
							{Object.keys(user)
								.filter((key) => key.startsWith('is_'))
								.map((role) => (
									<td key={role}>
										<input
											type='checkbox'
											checked={!!user[role]}
											onChange={(e) => handleRoleChange(user._id, role, e.target.checked)}
										/>
									</td>
								))}
							<td>
								<button onClick={() => handleSave(user)}>Save</button>
							</td>
						</tr>
					))}

					{/* {!users.length ? (
						<tr>
							<td colSpan='100%'>Loading or no users found.</td>
						</tr>
					) : (
						users.map((user) => (
							// render user row
							<tr key={user._id}>
								<td>{user.username || user.email}</td>
								{Object.keys(user)
									.filter((key) => key.startsWith('is_'))
									.map((role) => (
										<td key={role}>
											<input
												type='checkbox'
												checked={!!user[role]}
												onChange={(e) => handleRoleChange(user._id, role, e.target.checked)}
											/>
										</td>
									))}
								<td>
									<button onClick={() => handleSave(user)}>Save</button>
								</td>
							</tr>
						))
					)} */}
				</tbody>
			</table>
		</div>
	);
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useRoleAccessGuard } from '../../hooks/useRoleAccessGuard';
import OwnerMenuBar from '../../components/owner/OwnerMenuBar';

const dbMode = import.meta.env.VITE_APP_DB_MODE;

const OwnerHome = () => {
	const { id } = useParams();
	const authUser = useRoleAccessGuard('owner');
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const getUserId = (user) => (dbMode === 'mongo' ? user?._id : user?.id);
	console.log('Database mode:', dbMode); // Debugging line to check dbMode

	useEffect(() => {
		if (!authUser) {
			console.error('No authenticated user found');
			navigate('/login');
			return;
		}

		const authUserId = String(getUserId(authUser));

		if (!id) {
			console.log(`No ID param provided. Redirecting to /ownerHome/${authUserId}/dashboard`);
			navigate(`/ownerHome/${authUserId}/dashboard`);
			return;
		}

		if (authUserId !== id) {
			console.warn(`ID param (${id}) does not match authUser ID (${authUserId}). Redirecting.`);
			navigate('/accessDenied');
			return;
		}

		const fetchTargetUser = async () => {
			try {
				console.log('Fetching owner data for ID:', id);
				const res = await axios.get(`http://localhost:3000/api/owner/${id}`, {
					withCredentials: true,
				});
				setUserData(res.data);
			} catch (err) {
				console.error('Failed to fetch owner data:', err);
				navigate('/error');
			}
		};

		if (authUser?.is_owner) {
			fetchTargetUser();
		} else {
			console.warn('Authenticated user is not an owner. Redirecting.');
			navigate('/accessDenied');
		}
	}, [id, authUser, navigate]);

	if (!authUser || !userData) return <p>Loading user data...</p>;

	return (
		<div className='container'>
			<OwnerMenuBar user={authUser} />
			<div className='admin-content p-4'>
				<Outlet />
			</div>
		</div>
	);
};

export default OwnerHome;
////////////////////////////////////////////////////

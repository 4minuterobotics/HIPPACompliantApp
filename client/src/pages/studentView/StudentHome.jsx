import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useRoleAccessGuard } from '../../hooks/useRoleAccessGuard';
import CalendarWidget from '../../components/studentView/CalendlyWidget';
import StudentMenuBar from '../../components/studentView/StudentMenuBar';

const dbMode = import.meta.env.VITE_APP_DB_MODE;
console.log('Database mode:', dbMode); // Debugging line

const StudentHome = () => {
	const { id } = useParams();
	const authUser = useRoleAccessGuard('student');
	const [userData, setUserData] = useState(null);
	const navigate = useNavigate();

	const getUserId = (user) => (dbMode === 'mongo' ? user?._id : user?.id);

	useEffect(() => {
		if (!authUser) {
			console.error('No authenticated user found');
			navigate('/login');
			return;
		}

		const authUserId = String(getUserId(authUser));

		// CASE 1: No ID param → Redirect to student's own dashboard
		if (!id) {
			console.log(`No ID param provided, redirecting to: /studentHome/${authUserId}/dashboard`);
			navigate(`/studentHome/${authUserId}/dashboard`);
			return;
		}

		// CASE 2: Mismatched ID → Access Denied
		if (authUserId !== id) {
			console.warn(`Mismatched user ID. Expected: ${authUserId}, Got: ${id}`);
			navigate('/accessDenied');
			return;
		}

		// CASE 3: ID matches → Fetch student data
		const fetchStudentData = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/api/student/${id}`, {
					withCredentials: true,
				});
				setUserData(res.data);
			} catch (err) {
				console.error('Failed to fetch student data:', err);
				navigate('/error');
			}
		};

		fetchStudentData();
	}, [id, authUser, navigate]);

	if (!authUser || !userData) return <p>Loading user data...</p>;

	return (
		<div className='container'>
			<CalendarWidget />
			<StudentMenuBar user={authUser} />
			<div className='admin-content p-4'>
				<Outlet />
			</div>
		</div>
	);
};

export default StudentHome;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate, Outlet } from 'react-router-dom';
// import { useRoleAccessGuard } from '../../hooks/useRoleAccessGuard';
// import CalendarWidget from '../../components/studentView/CalendlyWidget';
// import StudentMenuBar from '../../components/studentView/StudentMenuBar';
// const dbMode = import.meta.env.VITE_APP_DB_MODE;
// console.log('Database mode:', dbMode); // Debugging line to check dbMode
// const StudentHome = () => {
// 	const { id } = useParams();
// 	const authUser = useRoleAccessGuard('student');
// 	const [userData, setUserData] = useState(null);

// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		// if (!authUser || !id) return;
// 		if (!authUser) {
// 			console.error('No authenticated user found');
// 			navigate('/login');
// 			return;
// 		}
// 		// CASE 1: No ID param? Redirect with authUser.id in URL
// 		if (!id) {
// 			console.log(`No ID param provided, redirecting to student dashboard with authUser.id: ${authUser.id}`);
// 			//If using Postgres to validate, navigate to /studentHome/:authUser.id/dashboard
// 			// If using MongoDB, navigate to /studentHome/:authUser._id/dashboard
// 			if (dbMode == 'mongo') {
// 				console.log(`Redirect to /studentHome/${authUser._id}/dashboard`);
// 				navigate(`/studentHome/${authUser._id}/dashboard`);
// 				return;
// 			} else if (dbMode == 'postgres') {
// 				console.log(`Redirect to /studentHome/${authUser.id}/dashboard`);
// 				navigate(`/studentHome/${authUser.id}/dashboard`);
// 				return;
// 			}
// 		}

// 		// CASE 2: ID param exists but doesn't match logged-in user
// 		// If using postgres, compare authUser.id with id
// 		// If using MongoDB, compare authUser._id with id

// 		if (dbMode == 'postgres') {
// 			if (String(authUser.id) !== id) {
// 				navigate('/accessDenied');
// 				console.log(`ID param ${id} does not match logged-in user ID ${authUser.id}. Redirecting to access denied.`);
// 				return;
// 			}
// 		} else if (dbMode == 'mongo') {
// 			if (String(authUser._id) !== id) {
// 				console.log(`ID param ${id} does not match logged-in user ID ${authUser._id}. Redirecting to access denied.`);
// 				navigate('/accessDenied');
// 				return;
// 			}
// 		}
// 		console.log('is this happening');
// 		// CASE 3: ID is valid and matches authUser, fetch their data
// 		const fetchTargetUser = async () => {
// 			try {
// 				console.log('Fetching student data for ID:', id);
// 				// Fetch student data from the API
// 				// Use the ID from the URL params to get the specific student data
// 				// Make sure to include withCredentials to send cookies
// 				const res = await axios.get(`http://localhost:3000/api/student/${id}`, {
// 					withCredentials: true,
// 				});
// 				setUserData(res.data);
// 			} catch (err) {
// 				console.error('Failed to fetch student data:', err);
// 				navigate('/error');
// 			}
// 		};

// 		// Only fetch user data if authenticated and admin
// 		// If using MongoDB, check if authUser._id matches the ID param
// 		// If using Postgres, check if authUser.id matches the ID param
// 		if (dbMode == 'mongo' && authUser?.is_student && String(authUser._id) === id) {
// 			fetchTargetUser();
// 		} else if (dbMode == 'postgres' && authUser?.is_student && String(authUser.id) === id) {
// 			fetchTargetUser();
// 		} else {
// 			navigate('/accessDenied');
// 		}
// 	}, [id, authUser, navigate]);

// 	if (!authUser || !userData) return <p>Loading user data...</p>;

// 	return (
// 		<div className='container'>
// 			<CalendarWidget />
// 			{/* <h1>Welcome, {authUser.first_name}!</h1> */}
// 			{/* <p>Your user ID is: {authUser.id}</p> */}
// 			{/* <CalendarWidget /> */}
// 			{/* <div>Recommended Hours: {userData.prescription?.prescribed_hours}</div> */}
// 			{/* <div>Completed Hours: {userData.prescription?.completed_hours} </div> */}
// 			{/* <div>User email: {authUser.email || authUser.google_oauth_email}</div>{' '} */}

// 			<StudentMenuBar user={authUser} />
// 			<div className='admin-content p-4'>
// 				<Outlet />
// 			</div>
// 		</div>
// 	);
// };

// export default StudentHome;

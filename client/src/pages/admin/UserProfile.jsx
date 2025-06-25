import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditUserForm from '../../components/admin/EditUserForm';
import PDFDownloadButton from '../../components/admin/PDFDownloadButton';
import axios from 'axios';

const UserProfile = () => {
	const { id } = useParams();
	const [userData, setUserData] = useState(null);
	const [authUser, setAuthUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const res = await axios.get('http://localhost:3000/api/current-user', {
					withCredentials: true,
				});

				const currentUser = res.data;
				console.log('is an official member');

				if (!currentUser.is_admin) {
					navigate('/accessDenied');
					return;
				}

				setAuthUser(currentUser);
			} catch (err) {
				console.error('Failed to fetch current user:', err);
				navigate('/login');
			}
		};

		fetchCurrentUser();
	}, [navigate]);

	useEffect(() => {
		const fetchTargetUser = async () => {
			try {
				const res = await axios.get(`http://localhost:3000/api/admin/users/${id}`, {
					withCredentials: true,
				});
				console.log('yehaw');
				setUserData(res.data);
			} catch (err) {
				console.error('Failed to fetch target user:', err);
				navigate('/error');
			}
		};

		// Only fetch user data if authenticated and admin
		if (authUser?.is_admin) {
			fetchTargetUser();
		}
	}, [id, authUser, navigate]);

	if (!authUser) return <div>Checking session...</div>;
	if (!userData) return <div>Loading user data...</div>;

	const { user, prescription } = userData;

	if (authUser && userData) {
		return (
			<div>
				<h2>
					User Profile: {user.first_name} {user.last_name}
				</h2>
				<p>Username: {user.username}</p>

				<h3>Prescription Info</h3>
				<p>Prescribed Class: {prescription?.prescribed_class || 'N/A'}</p>
				<p>Prescribed Hours: {prescription?.prescribed_hours || 'N/A'}</p>
				<p>Completed Hours: {prescription?.completed_hours || 'N/A'}</p>
				<p>Course Completed: {prescription?.course_completed ? 'Yes' : 'No'}</p>
				<p>Prescribed Screening: {prescription?.prescribed_screening || 'N/A'}</p>
				<p>Screening Completed: {prescription?.screening_completed ? 'Yes' : 'No'}</p>

				<EditUserForm
					userId={id}
					prescription={prescription}
				/>
				<PDFDownloadButton userId={id} />
			</div>
		);
	}
};

export default UserProfile;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import EditUserForm from '../../components/admin/EditUserForm';
// import PDFDownloadButton from '../../components/admin/PDFDownloadButton';
// import axios from 'axios';

// // const UserProfile = ({ user }) => {
// // 	if (!user) {
// // 		// return <div>Loading...</div>;
// // 		return (
// // 			<div className='container mt-4'>
// // 				<main
// // 					className='w-100 m-auto'
// // 					style={{ maxWidth: '600px' }}
// // 				>
// // 					<h1 className='h3 mb-4 fw-normal text-center'>User Profile</h1>

// // 					<div className='card p-4 shadow-sm'>
// // 						<h5 className='mb-3'>Personal Information</h5>
// // 						<p>
// // 							<strong>First Name:</strong> william
// // 						</p>
// // 						<p>
// // 							<strong>Last Name:</strong> lawrence
// // 						</p>
// // 						<p>
// // 							<strong>Address:</strong> 123048 dkj st
// // 						</p>
// // 						<p>
// // 							<strong>Address 2:</strong> apt 4
// // 						</p>
// // 						<p>
// // 							<strong>City:</strong> harvey
// // 						</p>
// // 						<p>
// // 							<strong>State:</strong>il
// // 						</p>
// // 						<p>
// // 							<strong>Zip:</strong> 23433
// // 						</p>
// // 						<p>
// // 							<strong>Email:</strong> sd@lk.com
// // 						</p>
// // 						<p>
// // 							<strong>Phone:</strong> 8283920184
// // 						</p>

// // 						<hr />

// // 						<h5 className='mb-3'>Birthday Details</h5>
// // 						<p>
// // 							<strong>Birthday:</strong> 09
// // 						</p>
// // 						<p>
// // 							<strong>Birth Month:</strong> August
// // 						</p>
// // 						<p>
// // 							<strong>Birth Year:</strong> 1928
// // 						</p>

// // 						<hr />

// // 						<h5 className='mb-3'>Hours</h5>
// // 						<p>
// // 							<strong>Recommended Hours:</strong> 3
// // 						</p>
// // 						<p>
// // 							<strong>Completed Hours:</strong> 1
// // 						</p>

// // 						<hr />

// // 						<h5 className='mb-3'>Documents</h5>
// // 						<p>
// // 							<strong>Court Docs 1:</strong> doc 1
// // 						</p>
// // 						<p>
// // 							<strong>Court Docs 2:</strong> doc 2
// // 						</p>
// // 						<p>
// // 							<strong>Front ID:</strong> id pic
// // 						</p>
// // 						<p>
// // 							<strong>Back ID:</strong> id pic
// // 						</p>

// // 						<hr />

// // 						<h5 className='mb-3'>Login Info</h5>
// // 						<p>
// // 							<strong>Login Email:</strong> sd@jk.com
// // 						</p>
// // 						<p>
// // 							<strong>Password:</strong> hashed and salted password
// // 						</p>
// // 					</div>
// // 				</main>
// // 			</div>
// // 		);
// // 	} else {
// // 		return (
// // 			<div className='container mt-4'>
// // 				<main
// // 					className='w-100 m-auto'
// // 					style={{ maxWidth: '600px' }}
// // 				>
// // 					<h1 className='h3 mb-4 fw-normal text-center'>User Profile</h1>

// // 					<div className='card p-4 shadow-sm'>
// // 						<h5 className='mb-3'>Personal Information</h5>
// // 						<p>
// // 							<strong>First Name:</strong> {user.firstName}
// // 						</p>
// // 						<p>
// // 							<strong>Last Name:</strong> {user.lastName}
// // 						</p>
// // 						<p>
// // 							<strong>Address:</strong> {user.address}
// // 						</p>
// // 						<p>
// // 							<strong>Address 2:</strong> {user.address2}
// // 						</p>
// // 						<p>
// // 							<strong>City:</strong> {user.city}
// // 						</p>
// // 						<p>
// // 							<strong>State:</strong> {user.state}
// // 						</p>
// // 						<p>
// // 							<strong>Zip:</strong> {user.zip}
// // 						</p>
// // 						<p>
// // 							<strong>Email:</strong> {user.email}
// // 						</p>
// // 						<p>
// // 							<strong>Phone:</strong> {user.phone}
// // 						</p>

// // 						<hr />

// // 						<h5 className='mb-3'>Birthday Details</h5>
// // 						<p>
// // 							<strong>Birthday:</strong> {user.birthday}
// // 						</p>
// // 						<p>
// // 							<strong>Birth Month:</strong> {user.birthMonth}
// // 						</p>
// // 						<p>
// // 							<strong>Birth Year:</strong> {user.birthYear}
// // 						</p>

// // 						<hr />

// // 						<h5 className='mb-3'>Hours</h5>
// // 						<p>
// // 							<strong>Recommended Hours:</strong> {user.recommendedHours}
// // 						</p>
// // 						<p>
// // 							<strong>Completed Hours:</strong> {user.completedHours}
// // 						</p>

// // 						<hr />

// // 						<h5 className='mb-3'>Documents</h5>
// // 						<p>
// // 							<strong>Court Docs 1:</strong> {user.courtDocs1}
// // 						</p>
// // 						<p>
// // 							<strong>Court Docs 2:</strong> {user.courtDocs2}
// // 						</p>
// // 						<p>
// // 							<strong>Front ID:</strong> {user.frontID}
// // 						</p>
// // 						<p>
// // 							<strong>Back ID:</strong> {user.backID}
// // 						</p>

// // 						<hr />

// // 						<h5 className='mb-3'>Login Info</h5>
// // 						<p>
// // 							<strong>Login Email:</strong> {user.loginEmail}
// // 						</p>
// // 						<p>
// // 							<strong>Password:</strong> {user.password}
// // 						</p>
// // 					</div>
// // 				</main>
// // 			</div>
// // 		);
// // 	}
// // };

// // export default UserProfile;

// const UserProfile = () => {
// 	const { id } = useParams();
// 	const [userData, setUserData] = useState(null);

// 	useEffect(() => {
// 		const fetchUser = async () => {
// 			const res = await axios.get(`http://localhost:3000/api/admin/users/${id}`, {
// 				withCredentials: true,
// 			});
// 			setUserData(res.data);
// 		};
// 		fetchUser();
// 	}, [id]);

// 	if (!userData) return <div>Loading...</div>;

// 	const { user, prescription } = userData;

// 	return (
// 		<div>
// 			<h2>
// 				User Profile: {user.first_name} {user.last_name}
// 			</h2>
// 			<p>Username: {user.username}</p>

// 			<h3>Prescription Info</h3>
// 			<p>Prescribed Class: {prescription?.prescribed_class || 'N/A'}</p>
// 			<p>Prescribed Hours: {prescription?.prescribed_hours || 'N/A'}</p>
// 			<p>Completed Hours: {prescription?.completed_hours || 'N/A'}</p>
// 			<p>Course Completed: {prescription?.course_completed ? 'Yes' : 'No'}</p>
// 			<p>Prescribed Screening: {prescription?.prescribed_screening || 'N/A'}</p>
// 			<p>Screening Completed: {prescription?.screening_completed ? 'Yes' : 'No'}</p>

// 			<EditUserForm
// 				userId={id}
// 				prescription={prescription}
// 			/>
// 			<PDFDownloadButton userId={id} />
// 		</div>
// 	);
// };

// export default UserProfile;

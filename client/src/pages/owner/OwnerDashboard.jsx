/* eslint-disable react/no-unescaped-entities */
// src/pages/ownerView/OwnerDashboard.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ToDoList from '../../components/admin/ToDoList';
import EditUserRolesCard from '../../components/admin/EditUserRolesCard';
const OwnerDashboard = () => {
	const { id } = useParams();
	return (
		// <div className="container">
		// 	<h1>Owner Dashboard</h1>
		// 	<p>Your owner ID is: {id}</p>
		// 	{/* Put widgets, calendar, stats, etc. here */}
		// </div>
		<div className='container py-4'>
			{' '}
			<header className='pb-3 mb-4 border-bottom'>
				{' '}
				<a
					href='/'
					className='d-flex align-items-center text-body-emphasis text-decoration-none'
				>
					{' '}
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='40'
						height='32'
						fill='currentColor'
						className='bi bi-list-task'
						viewBox='0 0 16 16'
					>
						<path
							fillRule='evenodd'
							d='M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z'
						/>
						<path d='M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z' />
						<path
							fillRule='evenodd'
							d='M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z'
						/>
					</svg>
					<span className='fs-4'>Dashboard</span>{' '}
				</a>{' '}
			</header>{' '}
			<div className='p-5 mb-4 bg-body-tertiary rounded-3'>
				{/* {' '}
				<div className='container-fluid py-5'>
					{' '}
					<h1 className='display-5 fw-bold'>Complete Steps</h1>{' '}
					<p className='col-md-8 fs-4'>
						Complete the next steps in whatever process you are currently faced with. Once you have completed these tasks,this big message will no longer appear on this
						dashboard component. Eventually this will be replace with data.
					</p>{' '}
					<button
						className='btn btn-primary btn-lg'
						type='button'
					>
						Handle Task
					</button>{' '}
				</div>{' '} */}
				<ToDoList />
			</div>{' '}
			<div className='row align-items-md-stretch'>
				{' '}
				<div className='col-md-6'>
					<ToDoList />{' '}
				</div>{' '}
				<div className='col-md-6'>
					{' '}
					<EditUserRolesCard id={id} />
				</div>{' '}
			</div>{' '}
			<footer className='pt-3 mt-4 text-body-secondary border-top'>© 2025 </footer>{' '}
		</div>
	);
};

export default OwnerDashboard;

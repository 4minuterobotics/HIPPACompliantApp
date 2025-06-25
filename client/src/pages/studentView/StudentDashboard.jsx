/* eslint-disable react/no-unescaped-entities */
// src/pages/studentView/StudentDashboard.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDashboard = () => {
	const { id } = useParams();
	return (
		// <div className="container">
		// 	<h1>Student Dashboard</h1>
		// 	<p>Your student ID is: {id}</p>
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
					{/* <svg
						xmlns='http://www.w3.org/2000/svg'
						width='40'
						height='32'
						className='me-2'
						viewBox='0 0 118 94'
						role='img'
					>
						<title>Bootstrap</title>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z'
							fill='currentColor'
						></path>
					</svg> */}{' '}
					<span className='fs-4'>Dashboard</span>{' '}
				</a>{' '}
			</header>{' '}
			<div className='p-5 mb-4 bg-body-tertiary rounded-3'>
				{' '}
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
				</div>{' '}
			</div>{' '}
			<div className='row align-items-md-stretch'>
				{' '}
				<div className='col-md-6'>
					{' '}
					<div className='h-100 p-5 text-bg-dark rounded-3'>
						{' '}
						<h2>Upcomming Class Sessions </h2>{' '}
						<p>
							This section will only be visible for students taking classes. The rest of this is filler tet. sdlfkjasd;lkfjl lkj falskdjf laksfj skfdj l lkj lsjfk aslkfj slakf
							jslf kjfl kjlkj ;kljfs klsf sdfl kjasf;l kjslkfjas lkja slksjf lkj l jksl jas;fdk jsfl kjsf .
						</p>{' '}
						<button
							className='btn btn-outline-light'
							type='button'
						>
							See Classes
						</button>{' '}
					</div>{' '}
				</div>{' '}
				<div className='col-md-6'>
					{' '}
					<div className='h-100 p-5 bg-body-tertiary border rounded-3'>
						{' '}
						<h2>Documents</h2>{' '}
						<p>
							This section will be vidisibe for all students. It will show a large icon of a document. Clicking this will take students to a doc page that either shows the
							docuements they have or allows them to request a document.
						</p>{' '}
						<button
							className='btn btn-outline-secondary'
							type='button'
						>
							View Docs
						</button>{' '}
					</div>{' '}
				</div>{' '}
			</div>{' '}
			<footer className='pt-3 mt-4 text-body-secondary border-top'>© 2025 </footer>{' '}
		</div>
	);
};

export default StudentDashboard;

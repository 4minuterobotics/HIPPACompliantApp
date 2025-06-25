// src/pages/studentView/StudentDashboard.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const StudentDocs = () => {
	const { id } = useParams();
	return (
		<div className='container'>
			{/* <h1>Student Dashboard</h1> */}
			{/* <p>Your student ID is: {id}</p> */}
			{/* Put widgets, calendar, stats, etc. here */}
			<div className='my-3 p-3 bg-body rounded shadow-sm'>
				{' '}
				<h6 className='border-bottom pb-2 mb-0'>Suggestions</h6>{' '}
				<div className='d-flex text-body-secondary pt-3'>
					{' '}
					<svg
						aria-label='Placeholder: 32x32'
						className='bd-placeholder-img flex-shrink-0 me-2 rounded'
						height='32'
						preserveAspectRatio='xMidYMid slice'
						role='img'
						width='32'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>Placeholder</title>
						<rect
							width='100%'
							height='100%'
							fill='#007bff'
						></rect>
						<text
							x='50%'
							y='50%'
							fill='#007bff'
							dy='.3em'
						>
							32x32
						</text>
					</svg>{' '}
					<div className='pb-3 mb-0 small lh-sm border-bottom w-100'>
						{' '}
						<div className='d-flex justify-content-between'>
							{' '}
							<strong className='text-gray-dark'>Full Name</strong> <a href='#'>Follow</a>{' '}
						</div>{' '}
						<span className='d-block'>@username</span>{' '}
					</div>{' '}
				{/* </div>{' '}
				<div className='d-flex text-body-secondary pt-3'>
					{' '}
					<svg
						aria-label='Placeholder: 32x32'
						className='bd-placeholder-img flex-shrink-0 me-2 rounded'
						height='32'
						preserveAspectRatio='xMidYMid slice'
						role='img'
						width='32'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>Placeholder</title>
						<rect
							width='100%'
							height='100%'
							fill='#007bff'
						></rect>
						<text
							x='50%'
							y='50%'
							fill='#007bff'
							dy='.3em'
						>
							32x32
						</text>
					</svg>{' '}
					<div className='pb-3 mb-0 small lh-sm border-bottom w-100'>
						{' '}
						<div className='d-flex justify-content-between'>
							{' '}
							<strong className='text-gray-dark'>Full Name</strong> <a href='#'>Follow</a>{' '}
						</div>{' '}
						<span className='d-block'>@username</span>{' '}
					</div>{' '}
				</div>{' '}
				<div className='d-flex text-body-secondary pt-3'>
					{' '}
					<svg
						aria-label='Placeholder: 32x32'
						className='bd-placeholder-img flex-shrink-0 me-2 rounded'
						height='32'
						preserveAspectRatio='xMidYMid slice'
						role='img'
						width='32'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>Placeholder</title>
						<rect
							width='100%'
							height='100%'
							fill='#007bff'
						></rect>
						<text
							x='50%'
							y='50%'
							fill='#007bff'
							dy='.3em'
						>
							32x32
						</text>
					</svg>{' '}
					<div className='pb-3 mb-0 small lh-sm border-bottom w-100'>
						{' '}
						<div className='d-flex justify-content-between'>
							{' '}
							<strong className='text-gray-dark'>Full Name</strong> <a href='#'>Follow</a>{' '}
						</div>{' '}
						<span className='d-block'>@username</span>{' '}
					</div>{' '}
				</div>{' '} */}
				<small className='d-block text-end mt-3'>
					{' '}
					<a href='#'>All suggestions</a>{' '}
				</small>{' '}
			</div>
		</div>
	);
};

export default StudentDocs;

// src/pages/AccessDenied.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccessDenied = () => {
	return (
		<div className='container d-flex align-items-center justify-content-center vh-100'>
			<div
				className='text-center border p-5 rounded shadow'
				style={{ maxWidth: '500px' }}
			>
				<h1 className='display-4 text-danger mb-3'>🚫 Access Denied</h1>
				<p className='lead'>You do not have permission to view this page.</p>
				<a
					href='/'
					className='btn btn-primary mt-3'
				>
					Go to Home
				</a>
			</div>
		</div>
	);
};

export default AccessDenied;

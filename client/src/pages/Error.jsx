// src/pages/AccessDenied.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Error = () => {
	return (
		<div className='container d-flex align-items-center justify-content-center vh-100'>
			<div
				className='text-center border p-5 rounded shadow'
				style={{ maxWidth: '500px' }}
			>
				<h1 className='display-4 text-danger mb-3'>🚫 404</h1>
				<p className='lead'>Something unexpected happend. Sorry.</p>
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

export default Error;

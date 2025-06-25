import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import logo from '../assets/logo-no-words.png';

const Login = () => {
	const backendURL = 'http://localhost:3000/api/auth/google';
	const [error, setError] = useState('');

	const [firstName, setFirstName] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:3000/api/login', {
				firstName,
				password,
			});
			let responseMessage = 'You got a response from the backend.';

			// Handle array of validation messages
			if (Array.isArray(response?.data?.errors)) {
				responseMessage = response.data.errors.join('\n');
			} else if (response?.data?.message) {
				responseMessage = response.data.message;
				console.log('response.data.message');
			} else if (typeof response?.data === 'string') {
				responseMessage = response.data;
				console.log('response.data');
			} else if (response.message) {
				responseMessage = response.message;
				console.log('err.message');
			}

			// Update state for UI display
			setError(responseMessage);

			// Alert the user
			alert(`Registration failed:\n${responseMessage}`);

			// You can save token here if backend returns one
			// localStorage.setItem('token', response.data.token);

			// Redirect after successful login
			if (response.data.redirect == 'admin') {
				navigate('/admin');
			} else if (response.data.redirect == 'regularUser') {
				navigate('/serviceDescription');
			}
		} catch (err) {
			console.error('Login failed:', err);

			let errorMessage = 'An error occurred. Please try again.';

			// Handle array of validation messages
			if (Array.isArray(err.response?.data?.errors)) {
				errorMessage = err.response.data.errors.join('\n');
			} else if (err.response?.data?.message) {
				errorMessage = err.response.data.message;
				console.log('err.response.data.message');
			} else if (typeof err.response?.data === 'string') {
				errorMessage = err.response.data;
				console.log('err.response.data');
			} else if (err.message) {
				errorMessage = err.message;
				console.log('err.message');
			}

			// Update state for UI display
			setError(errorMessage);

			// Alert the user
			alert(`Registration failed:\n${errorMessage}`);
		}
	};
	return (
		<div className='container'>
			<main
				className='form-signin w-100 m-auto'
				style={{ maxWidth: '330px' }}
			>
				<form onSubmit={handleSubmit}>
					<img
						className='mb-4'
						src={logo}
						alt=''
						width='72'
						height='72'
					/>
					<h1 className='h3 mb-3 fw-normal'>Please sign in with first name for now</h1>
					<div className='form-floating'>
						<input
							type='text'
							className='form-control'
							id='firstName'
							placeholder='First Name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
						<label htmlFor='floatingFirstName'>First Name</label>
					</div>

					{/* <div className='form-floating'>
						<input
							type='email'
							className='form-control'
							id='floatingInput'
							placeholder='name@example.com'
						/>
						<label htmlFor='floatingInput'>Email address</label>
					</div> */}

					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='password'
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label htmlFor='floatingPassword'>Password</label>
					</div>

					<div className='form-check text-start my-3'>
						<input
							className='form-check-input'
							type='checkbox'
							value='remember-me'
							id='checkDefault'
						/>
						<label
							className='form-check-label'
							htmlFor='checkDefault'
						>
							Remember me
						</label>
					</div>
					<button
						className='btn btn-primary w-100 py-2'
						type='submit'
					>
						Sign in
					</button>
					<div className='text-center mt-3'>
						<Link
							to='/forgotPassword'
							className='text-decoration-none'
						>
							Forgot password?
						</Link>
					</div>
					<p className='mt-5 mb-3 text-body-secondary'>© 2017–2025</p>
				</form>

				<div className='col-sm-4'>
					<div className='card'>
						<div className='card-body'>
							<a
								className='btn btn-block btn-primary'
								href={backendURL}
								role='button'
							>
								<i className='fab fa-google'></i> Sign In with Google
							</a>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;

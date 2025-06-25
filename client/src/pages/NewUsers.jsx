import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-no-words.png';

const NewUsers = () => {
	return (
		<div className='container'>
			<main
				className='form-signin w-100 m-auto'
				style={{ maxWidth: '330px' }}
			>
				<form>
					<img
						className='mb-4'
						src={logo}
						alt=''
						width='72'
						height='72'
					/>
					<h1 className='h3 mb-3 fw-normal'>Create an account</h1>

					<div className='form-floating'>
						<input
							type='email'
							className='form-control'
							id='floatingEmail'
							placeholder='name@example.com'
						/>
						<label htmlFor='floatingEmail'>Email address</label>
					</div>

					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='floatingPassword'
							placeholder='Password'
						/>
						<label htmlFor='floatingPassword'>Password</label>
					</div>

					<div className='form-floating'>
						<input
							type='password'
							className='form-control'
							id='floatingConfirmPassword'
							placeholder='Confirm Password'
						/>
						<label htmlFor='floatingConfirmPassword'>Confirm Password</label>
					</div>

					<button
						className='btn btn-primary w-100 py-2 mt-3'
						type='submit'
					>
						Sign Up
					</button>

					<div className='text-center mt-3'>
						<Link
							to='/login'
							className='text-decoration-none'
						>
							Already have an account? Sign in
						</Link>
					</div>

					<p className='mt-5 mb-3 text-body-secondary'>© 2017–2025</p>
				</form>
			</main>
		</div>
	);
};

export default NewUsers;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ErrorToast from '../components/toasts/ErrorToast';

const RegistrationForm = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		userName: '',
		password: '',
		confirmPassword: '',
		phone: '',
		birthMonth: '',
		birthDay: '',
		birthYear: '',
		address: '',
		address2: '',
		city: '',
		state: '',
		zip: '',
	});
	const [error, setError] = useState('');

	const handleChange = (e) => {
		console.log('handlingChange');
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError('Passwords do not match');
			alert('Passwords do not match');
			return;
		}

		try {
			const response = await axios.post('http://localhost:3000/api/register', formData);
			console.log('Form submitted successfully:', response.data);
			navigate('/serviceDescription');
			// Handle success (e.g., display a success message and redirect)
		} catch (err) {
			// console.error('Error submitting form:', err);
			console.error('Error submitting form:', err);

			let errorMessage = 'An error occurred. Please try again.';

			// Handle array of validation messages
			if (Array.isArray(err.response?.data?.errors)) {
				errorMessage = err.response.data.errors.join('\n');
			} else if (err.response?.data?.message) {
				errorMessage = err.response.data.message;
			} else if (typeof err.response?.data === 'string') {
				errorMessage = err.response.data;
			} else if (err.message) {
				errorMessage = err.message;
			}

			// Update state for UI display
			setError(errorMessage);

			// Alert the user
			alert(`Registration failed:\n${errorMessage}`);
		}
	};

	return (
		<div className='container'>
			<span className='fs-4'>Registration</span>
			<hr className='col-3 col-md-2 mb-5' />

			<h1 className='text-body-emphasis'>Welcome!</h1>
			<p className='fs-5 col-md-8'>Thank you for choosing us to help you reach your goals. Next we will set up your user profile. Please provide your information below.</p>
			<form
				onSubmit={handleSubmit}
				className='py-5 row g-3'
			>
				<div className='col-md-6'>
					<label
						htmlFor='firstName'
						className='form-label'
					>
						First Name
					</label>
					<input
						id='firstName'
						type='text'
						className='form-control'
						aria-label='First name'
						value={formData.firstName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-md-6'>
					<label
						htmlFor='lastName'
						className='form-label'
					>
						Last Name
					</label>
					<input
						id='lastName'
						type='text'
						className='form-control'
						aria-label='Last name'
						value={formData.lastName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-md-6'>
					<label
						htmlFor='userName'
						className='form-label'
					>
						Username
					</label>
					<input
						type='text'
						className='form-control'
						id='userName'
						value={formData.userName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-md-3'>
					<label
						htmlFor='password'
						className='form-label'
					>
						Enter your password
					</label>
					<input
						type='password'
						className='form-control'
						id='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='col-md-3'>
					<label
						htmlFor='confirmPassword'
						className='form-label'
					>
						Re-enter your password
					</label>
					<input
						type='password'
						className='form-control'
						id='confirmPassword'
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>
				{/* <div className='col-md-6'>
					<label
						htmlFor='inputEmail4'
						className='form-label'
					>
						Email
					</label>
					<input
						type='email'
						className='form-control'
						id='inputEmail4'
						required
					/>
				</div>
				<div className='col-md-6'>
					<label
						htmlFor='inputEmail4'
						className='form-label'
					>
						Re-enter your email address
					</label>
					<input
						type='email'
						className='form-control'
						id='inputEmail4'
						required
					/>
				</div> */}

				<div className='col-md-6'>
					<label
						htmlFor='phone'
						className='form-label'
					>
						Phone Number:
					</label>
					<input
						type='tel'
						id='phone'
						name='phone'
						placeholder='123-456-7890'
						className='form-control'
						value={formData.phone}
						onChange={handleChange}
					/>
				</div>

				<div className='col-md-2'>
					<label
						htmlFor='birth-month'
						className='form-label'
					>
						Birth Month:
					</label>
					<select
						className='form-select'
						aria-label='Default select example'
						id='birthMonth'
						value={formData.birthMonth}
						onChange={handleChange}
						required
					>
						<option
							value=''
							disabled
						>
							Choose...
						</option>
						<option value='01'>January</option>
						<option value='02'>February</option>
						<option value='03'>March</option>
						<option value='04'>April</option>
						<option value='05'>May</option>
						<option value='06'>June</option>
						<option value='07'>July</option>
						<option value='08'>August</option>
						<option value='09'>September</option>
						<option value='10'>October</option>
						<option value='11'>November</option>
						<option value='12'>December</option>
					</select>
				</div>

				<div className='col-md-2'>
					<label
						htmlFor='birth-day'
						className='form-label'
					>
						Birth Day:
					</label>
					<select
						className='form-select'
						aria-label='Default select example'
						id='birthDay'
						value={formData.birthDay}
						onChange={handleChange}
						required
					>
						<option
							value=''
							disabled
						>
							Choose...
						</option>
						<option value='01'>1</option>
						<option value='02'>2</option>
						<option value='03'>3</option>
						<option value='04'>4</option>
						<option value='05'>5</option>
						<option value='06'>6</option>
						<option value='07'>7</option>
						<option value='08'>8</option>
						<option value='09'>9</option>
						<option value='10'>10</option>
						<option value='11'>11</option>
						<option value='12'>12</option>
						<option value='13'>13</option>
						<option value='14'>14</option>
						<option value='15'>15</option>
						<option value='16'>16</option>
						<option value='17'>17</option>
						<option value='18'>18</option>
						<option value='19'>19</option>
						<option value='20'>20</option>
						<option value='21'>21</option>
						<option value='22'>22</option>
						<option value='23'>23</option>
						<option value='24'>24</option>
						<option value='25'>25</option>
						<option value='26'>26</option>
						<option value='27'>27</option>
						<option value='28'>28</option>
						<option value='29'>29</option>
						<option value='30'>30</option>
						<option value='31'>31</option>
					</select>
				</div>

				<div className='col-md-2'>
					<label
						htmlFor='birth-year'
						className='form-label'
					>
						Birth Year:
					</label>
					<select
						className='form-select'
						aria-label='Default select example'
						id='birthYear'
						value={formData.birthYear}
						onChange={handleChange}
						required
					>
						<option
							value=''
							disabled
						>
							Choose...
						</option>
						<option value='2025'>2025</option>
						<option value='2024'>2024</option>
						<option value='2023'>2023</option>
						<option value='2022'>2022</option>
						<option value='2021'>2021</option>
						<option value='2020'>2020</option>
						<option value='2019'>2019</option>
						<option value='2018'>2018</option>
						<option value='2017'>2017</option>
						<option value='2016'>2016</option>
						<option value='2015'>2015</option>
						<option value='2014'>2014</option>
						<option value='2013'>2013</option>
						<option value='2012'>2012</option>
						<option value='2011'>2011</option>
						<option value='2010'>2010</option>
						<option value='2009'>2009</option>
						<option value='2008'>2008</option>
						<option value='2007'>2007</option>
						<option value='2006'>2006</option>
						<option value='2005'>2005</option>
						<option value='2004'>2004</option>
						<option value='2003'>2003</option>
						<option value='2002'>2002</option>
						<option value='2001'>2001</option>
						<option value='2000'>2000</option>
						<option value='1999'>1999</option>
						<option value='1998'>1998</option>
						<option value='1997'>1997</option>
						<option value='1996'>1996</option>
						<option value='1995'>1995</option>
						<option value='1994'>1994</option>
						<option value='1993'>1993</option>
						<option value='1992'>1992</option>
						<option value='1991'>1991</option>
						<option value='1990'>1990</option>
						<option value='1989'>1989</option>
						<option value='1988'>1988</option>
						<option value='1987'>1987</option>
						<option value='1986'>1986</option>
						<option value='1985'>1985</option>
						<option value='1984'>1984</option>
						<option value='1983'>1983</option>
						<option value='1982'>1982</option>
						<option value='1981'>1981</option>
						<option value='1980'>1980</option>
						<option value='1979'>1979</option>
						<option value='1978'>1978</option>
						<option value='1977'>1977</option>
						<option value='1976'>1976</option>
						<option value='1975'>1975</option>
						<option value='1974'>1974</option>
						<option value='1973'>1973</option>
						<option value='1972'>1972</option>
						<option value='1971'>1971</option>
						<option value='1970'>1970</option>
						<option value='1969'>1969</option>
						<option value='1968'>1968</option>
						<option value='1967'>1967</option>
						<option value='1966'>1966</option>
						<option value='1965'>1965</option>
						<option value='1964'>1964</option>
						<option value='1963'>1963</option>
						<option value='1962'>1962</option>
						<option value='1961'>1961</option>
						<option value='1960'>1960</option>
						<option value='1959'>1959</option>
						<option value='1958'>1958</option>
						<option value='1957'>1957</option>
						<option value='1956'>1956</option>
						<option value='1955'>1955</option>
						<option value='1954'>1954</option>
						<option value='1953'>1953</option>
						<option value='1952'>1952</option>
						<option value='1951'>1951</option>
						<option value='1950'>1950</option>
						<option value='1949'>1949</option>
						<option value='1948'>1948</option>
						<option value='1947'>1947</option>
						<option value='1946'>1946</option>
						<option value='1945'>1945</option>
						<option value='1944'>1944</option>
						<option value='1943'>1943</option>
						<option value='1942'>1942</option>
						<option value='1941'>1941</option>
						<option value='1940'>1940</option>
						<option value='1939'>1939</option>
						<option value='1938'>1938</option>
						<option value='1937'>1937</option>
						<option value='1936'>1936</option>
						<option value='1935'>1935</option>
						<option value='1934'>1934</option>
						<option value='1933'>1933</option>
						<option value='1932'>1932</option>
						<option value='1931'>1931</option>
						<option value='1930'>1930</option>
					</select>
				</div>

				<div className='col-12'>
					<label
						htmlFor='inputAddress'
						className='form-label'
					>
						Mailing Address
					</label>
					<input
						type='text'
						className='form-control'
						id='address'
						placeholder='1234 Main St'
						value={formData.address}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-12'>
					<label
						htmlFor='inputAddress2'
						className='form-label'
					>
						Address 2
					</label>
					<input
						type='text'
						className='form-control'
						id='address2'
						placeholder='Apartment, studio, or floor'
						value={formData.address2}
						onChange={handleChange}
					/>
				</div>
				<div className='col-md-6'>
					<label
						htmlFor='inputCity'
						className='form-label'
					>
						City
					</label>
					<input
						type='text'
						className='form-control'
						id='city'
						value={formData.city}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-md-4'>
					<label
						htmlFor='inputState'
						className='form-label'
					>
						State
					</label>
					<select
						id='state'
						className='form-select'
						value={formData.state}
						onChange={handleChange}
						required
					>
						<option
							value=''
							disabled
						>
							Choose...
						</option>
						<option value='AL'>Alabama</option>
						<option value='AK'>Alaska</option>
						<option value='AZ'>Arizona</option>
						<option value='AR'>Arkansas</option>
						<option value='CA'>California</option>
						<option value='CO'>Colorado</option>
						<option value='CT'>Connecticut</option>
						<option value='DE'>Delaware</option>
						<option value='FL'>Florida</option>
						<option value='GA'>Georgia</option>
						<option value='HI'>Hawaii</option>
						<option value='ID'>Idaho</option>
						<option value='IL'>Illinois</option>
						<option value='IN'>Indiana</option>
						<option value='IA'>Iowa</option>
						<option value='KS'>Kansas</option>
						<option value='KY'>Kentucky</option>
						<option value='LA'>Louisiana</option>
						<option value='ME'>Maine</option>
						<option value='MD'>Maryland</option>
						<option value='MA'>Massachusetts</option>
						<option value='MI'>Michigan</option>
						<option value='MN'>Minnesota</option>
						<option value='MS'>Mississippi</option>
						<option value='MO'>Missouri</option>
						<option value='MT'>Montana</option>
						<option value='NE'>Nebraska</option>
						<option value='NV'>Nevada</option>
						<option value='NH'>New Hampshire</option>
						<option value='NJ'>New Jersey</option>
						<option value='NM'>New Mexico</option>
						<option value='NY'>New York</option>
						<option value='NC'>North Carolina</option>
						<option value='ND'>North Dakota</option>
						<option value='OH'>Ohio</option>
						<option value='OK'>Oklahoma</option>
						<option value='OR'>Oregon</option>
						<option value='PA'>Pennsylvania</option>
						<option value='RI'>Rhode Island</option>
						<option value='SC'>South Carolina</option>
						<option value='SD'>South Dakota</option>
						<option value='TN'>Tennessee</option>
						<option value='TX'>Texas</option>
						<option value='UT'>Utah</option>
						<option value='VT'>Vermont</option>
						<option value='VA'>Virginia</option>
						<option value='WA'>Washington</option>
						<option value='WV'>West Virginia</option>
						<option value='WI'>Wisconsin</option>
						<option value='WY'>Wyoming</option>
					</select>
				</div>
				<div className='col-md-2'>
					<label
						htmlFor='inputZip'
						className='form-label'
					>
						Zip
					</label>
					<input
						type='text'
						className='form-control'
						id='zip'
						value={formData.zip}
						onChange={handleChange}
						required
					/>
				</div>

				<div className='col-12'>
					<button
						type='submit'
						className='btn btn-primary'
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default RegistrationForm;

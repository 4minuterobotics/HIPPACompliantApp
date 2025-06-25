import React from 'react';
import logo from '../../assets/logo-no-words-big.png';

const PaymentInfo = (props) => {
	return (
		<div className='container'>
			<div className='py-5 text-center'>
				<img
					className='d-block mx-auto mb-4'
					src={logo}
					alt='Logo'
					width='72'
					height='72'
				/>
				<h1 className='h2'>Checkout</h1>
			</div>

			<div className='row g-5'>
				<div className='col-md-5 col-lg-4 order-md-last'>
					<h4 className='d-flex justify-content-between align-items-center mb-3'>
						<span className='text-primary'>Your cart</span>
						<span className='badge bg-primary rounded-pill'>1</span>
					</h4>
					<ul className='list-group mb-3'>
						<li className='list-group-item d-flex justify-content-between lh-sm'>
							<div>
								<h6 className='my-0'>{props.serviceInfo.fullName}</h6>
								<small className='text-body-secondary'>{props.serviceInfo.description}</small>
							</div>
							{/* <span className='text-body-secondary'>
								{'$'}
								{props.serviceInfo.price}
							</span> */}
						</li>
						{/* <li className='list-group-item d-flex justify-content-between lh-sm'>
							<div>
								<h6 className='my-0'>Second product</h6>
								<small className='text-body-secondary'>Brief description</small>
							</div>
							<span className='text-body-secondary'>$8</span>
						</li>
						<li className='list-group-item d-flex justify-content-between lh-sm'>
							<div>
								<h6 className='my-0'>Third item</h6>
								<small className='text-body-secondary'>Brief description</small>
							</div>
							<span className='text-body-secondary'>$5</span>
						</li>
						<li className='list-group-item d-flex justify-content-between bg-body-tertiary'>
							<div className='text-success'>
								<h6 className='my-0'>Promo code</h6>
								<small>EXAMPLECODE</small>
							</div>
							<span className='text-success'>−$5</span>
						</li> */}
						<li className='list-group-item d-flex justify-content-between'>
							<span>Total (USD)</span>
							<strong>
								{'$'}
								{props.serviceInfo.price}
							</strong>
						</li>
					</ul>

					{/* <form className='card p-2'>
						<div className='input-group'>
							<input
								type='text'
								className='form-control'
								placeholder='Promo code'
							/>
							<button
								type='submit'
								className='btn btn-secondary'
							>
								Redeem
							</button>
						</div>
					</form> */}
				</div>

				<div className='col-md-7 col-lg-8'>
					<h4 className='mb-3'>Billing address</h4>
					<form
						className='needs-validation'
						noValidate
					>
						<div className='row g-3'>
							<div className='col-sm-6'>
								<label
									htmlFor='firstName'
									className='form-label'
								>
									First name
								</label>
								<input
									type='text'
									className='form-control'
									id='firstName'
									required
								/>
								<div className='invalid-feedback'>Valid first name is required.</div>
							</div>

							<div className='col-sm-6'>
								<label
									htmlFor='lastName'
									className='form-label'
								>
									Last name
								</label>
								<input
									type='text'
									className='form-control'
									id='lastName'
									required
								/>
								<div className='invalid-feedback'>Valid last name is required.</div>
							</div>

							{/* <div className='col-12'>
								<label
									htmlFor='username'
									className='form-label'
								>
									Username
								</label>
								<div className='input-group has-validation'>
									<span className='input-group-text'>@</span>
									<input
										type='text'
										className='form-control'
										id='username'
										required
									/>
									<div className='invalid-feedback'>Your username is required.</div>
								</div>
							</div> */}

							<div className='col-12'>
								<label
									htmlFor='email'
									className='form-label'
								>
									Email <span className='text-body-secondary'>(Optional)</span>
								</label>
								<input
									type='email'
									className='form-control'
									id='email'
									placeholder='you@example.com'
								/>
								<div className='invalid-feedback'>Please enter a valid email address.</div>
							</div>

							<div className='col-12'>
								<label
									htmlFor='address'
									className='form-label'
								>
									Address
								</label>
								<input
									type='text'
									className='form-control'
									id='address'
									placeholder='1234 Main St'
									required
								/>
								<div className='invalid-feedback'>Please enter your shipping address.</div>
							</div>

							<div className='col-12'>
								<label
									htmlFor='address2'
									className='form-label'
								>
									Address 2 <span className='text-body-secondary'>(Optional)</span>
								</label>
								<input
									type='text'
									className='form-control'
									id='address2'
									placeholder='Apartment or suite'
								/>
							</div>

							<div className='col-md-5'>
								<label
									htmlFor='inputCity'
									className='form-label'
								>
									City
								</label>
								<input
									type='text'
									className='form-control'
									id='inputCity'
									required
								/>
								<div className='invalid-feedback'>Please select a valid country.</div>
							</div>

							<div className='col-md-4'>
								<label
									htmlFor='inputState'
									className='form-label'
								>
									State
								</label>
								<select
									id='inputState'
									className='form-select'
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
								<div className='invalid-feedback'>Please provide a valid state.</div>
							</div>

							<div className='col-md-3'>
								<label
									htmlFor='zip'
									className='form-label'
								>
									Zip
								</label>
								<input
									type='text'
									className='form-control'
									id='zip'
									required
								/>
								<div className='invalid-feedback'>Zip code required.</div>
							</div>
						</div>

						<hr className='my-4' />

						<div className='form-check'>
							<input
								type='checkbox'
								className='form-check-input'
								id='same-address'
							/>
							<label
								className='form-check-label'
								htmlFor='same-address'
							>
								Shipping address is the same as my billing address
							</label>
						</div>

						<div className='form-check'>
							<input
								type='checkbox'
								className='form-check-input'
								id='save-info'
							/>
							<label
								className='form-check-label'
								htmlFor='save-info'
							>
								Save this information for next time
							</label>
						</div>

						<hr className='my-4' />

						<h4 className='mb-3'>Payment</h4>

						<div className='my-3'>
							<div className='form-check'>
								<input
									id='credit'
									name='paymentMethod'
									type='radio'
									className='form-check-input'
									defaultChecked
									required
								/>
								<label
									className='form-check-label'
									htmlFor='credit'
								>
									Credit card
								</label>
							</div>
							<div className='form-check'>
								<input
									id='debit'
									name='paymentMethod'
									type='radio'
									className='form-check-input'
									required
								/>
								<label
									className='form-check-label'
									htmlFor='debit'
								>
									Debit card
								</label>
							</div>
							{/* <div className='form-check'>
								<input
									id='paypal'
									name='paymentMethod'
									type='radio'
									className='form-check-input'
									required
								/>
								<label
									className='form-check-label'
									htmlFor='paypal'
								>
									PayPal
								</label>
							</div> */}
						</div>

						<div className='row gy-3'>
							<div className='col-md-6'>
								<label
									htmlFor='cc-name'
									className='form-label'
								>
									Name on card
								</label>
								<input
									type='text'
									className='form-control'
									id='cc-name'
									required
								/>
								<small className='text-body-secondary'>Full name as displayed on card</small>
								<div className='invalid-feedback'>Name on card is required</div>
							</div>

							<div className='col-md-6'>
								<label
									htmlFor='cc-number'
									className='form-label'
								>
									Credit card number
								</label>
								<input
									type='text'
									className='form-control'
									id='cc-number'
									required
								/>
								<div className='invalid-feedback'>Credit card number is required</div>
							</div>

							<div className='col-md-3'>
								<label
									htmlFor='cc-expiration'
									className='form-label'
								>
									Expiration
								</label>
								<input
									type='text'
									className='form-control'
									id='cc-expiration'
									required
								/>
								<div className='invalid-feedback'>Expiration date required</div>
							</div>

							<div className='col-md-3'>
								<label
									htmlFor='cc-cvv'
									className='form-label'
								>
									CVV
								</label>
								<input
									type='text'
									className='form-control'
									id='cc-cvv'
									required
								/>
								<div className='invalid-feedback'>Security code required</div>
							</div>
						</div>

						<hr className='my-4' />

						<button
							className='w-100 btn btn-primary btn-lg'
							type='submit'
						>
							Confirm Payment
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PaymentInfo;

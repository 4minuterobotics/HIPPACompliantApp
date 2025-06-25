import React, { useState } from 'react';
import { prices, services } from '../data/data';
import PaymentInfo from '../components/paymentInfo/PaymentInfo';

const ScreeningRegistration = () => {
	const [selectedServiceInfo, setSelectedServiceInfo] = useState('');
	// State to track both screeningType and files
	const [formData, setFormData] = useState({
		screeningType: '',
		files: {
			inputIDFront: null,
			inputIDBack: null,
			inputCourtOrder: null,
			inputAdditionalDocs: null,
		},
	});

	// Handle file changes
	const handleFileChange = (e) => {
		const { id, files } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			files: {
				...prevFormData.files,
				[id]: files[0], // Update the specific file field
			},
		}));
	};

	// Handle screening type change
	const handleScreeningTypeChange = (e) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			screeningType: e.target.value, // Update screeningType in the state
		}));

		const serviceInfoObject = services.screeningServices.find((service) => {
			return service.shortName == e.target.value;
		});
		setSelectedServiceInfo(serviceInfoObject);
	};

	// Create a form having the uploaded files that will enter the data base
	let formPendingUploadToDatabase;
	const createFormWithFiles = () => {
		// Create a FormData object to send files and screeningType
		formPendingUploadToDatabase = new FormData();

		// Append files to FormData
		Object.keys(formData.files).forEach((key) => {
			if (formData.files[key]) {
				formPendingUploadToDatabase.append(key, formData.files[key]);
			}
		});

		// Append screening type to FormData
		formPendingUploadToDatabase.append('screeningType', formData.screeningType);
	};

	// Handle form submission and send data to backend
	const handleSubmit = async () => {
		// Create a FormData object to send files and screeningType
		const form = new FormData();

		// Append files to FormData
		Object.keys(formData.files).forEach((key) => {
			if (formData.files[key]) {
				form.append(key, formData.files[key]);
			}
		});

		// Append screening type to FormData
		form.append('screeningType', formData.screeningType);

		// Perform POST request after payment is successful
		try {
			const response = await fetch('/api/submit-screening', {
				method: 'POST',
				body: form,
			});

			if (response.ok) {
				console.log('Files and data sent successfully');
				// Handle successful response
			} else {
				console.error('Failed to submit');
				// Handle error
			}
		} catch (error) {
			console.error('Error:', error);
			// Handle error
		}
	};

	// const checkOut =()={

	// }
	return (
		<div className='container py-5'>
			{/* form */}
			<form className='row g-3'>
				<div className='col-md-3'>
					<label
						htmlFor='screenType'
						className='form-label'
					>
						Screening Options
					</label>
					<select
						id='screenType'
						className='form-select'
						value={formData.screeningType} // Bind the select value to state
						onChange={handleScreeningTypeChange} // Handle change
						// required
					>
						<option
							value=''
							disabled
						>
							Choose...
						</option>

						{services.screeningServices.map((service, index) => {
							return (
								<option
									key={index}
									value={service.shortName}
								>
									{service.shortName}
									{': $90'}
								</option>
							);
						})}
						{/* <option value='DUI '>DUI </option>
						<option value='Drug Felony'>Drug felony</option>
						<option value='Domestic Violence '>Domestic Violence </option> */}
					</select>
				</div>
				<div className='col-md-12'>
					<div className='input-group mb-3'>
						<input
							type='file'
							className='form-control'
							id='inputIDFront'
							onChange={handleFileChange}
							// required
						/>
						<label
							className='input-group-text'
							htmlFor='inputIDFront'
						>
							Upload State ID (FRONT)
						</label>
					</div>
				</div>
				<div className='col-md-12'>
					<div className='input-group mb-3'>
						<input
							type='file'
							className='form-control'
							id='inputIDBack'
							onChange={handleFileChange}
							// required
						/>
						<label
							className='input-group-text'
							htmlFor='inputIDBack'
						>
							Upload State ID (BACK)
						</label>
					</div>
				</div>
				<div className='col-md-12'>
					<div className='input-group mb-3'>
						<input
							type='file'
							className='form-control'
							id='inputCourtOrder'
							onChange={handleFileChange}
							// required
						/>
						<label
							className='input-group-text'
							htmlFor='inputCourtOrder'
						>
							Upload Court Order
						</label>
					</div>
				</div>
				<div className='col-md-12'>
					<div className='input-group mb-3'>
						<input
							type='file'
							className='form-control'
							id='inputAdditionalDocs'
							onChange={handleFileChange}
						/>
						<label
							className='input-group-text'
							htmlFor='inputAdditionalDocs'
						>
							Additional Document (if applicable)
						</label>
					</div>
				</div>
				<div className='col-12'>
					<button
						// type='submit'
						type='button'
						className='btn btn-primary'
						data-bs-target='#exampleModalToggle'
						data-bs-toggle='modal'
					>
						Submit Documents
					</button>
				</div>
			</form>

			{/* first modal used to confirm desire to make a purchase */}
			<div
				className='modal'
				tabIndex='-1'
				id='exampleModalToggle'
				aria-labelledby='exampleModalToggleLabel'
			>
				<div className='modal-dialog modal-dialog-centered'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title'>Purchase Screening: ${selectedServiceInfo.price}</h5>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<p>After purchasing, you will receive your screening via email or ground mail.</p>
						</div>
						<div className='modal-footer'>
							{/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
							<button
								type='button'
								className='btn btn-primary'
								data-bs-target='#exampleModalToggle2'
								data-bs-toggle='modal'
							>
								Continue to payment
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* 2nd modal used to enter payment info */}
			<div
				className='modal fade'
				id='exampleModalToggle2'
				aria-hidden='true'
				aria-labelledby='exampleModalToggleLabel2'
				tabIndex='-1'
			>
				<div className='modal-dialog modal-dialog-centered modal-xl'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h1
								className='modal-title fs-5'
								id='exampleModalToggleLabel2'
							>
								Payment Details
							</h1>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
							></button>
						</div>
						<div className='modal-body'>
							<PaymentInfo
								handleSubmit={handleSubmit}
								formWithFiles={formPendingUploadToDatabase}
								service={formData.screeningType}
								price={prices.screening}
								serviceInfo={selectedServiceInfo}
							/>
						</div>
						{/* <div className='modal-footer'>
							<button
								className='btn btn-primary'
								// onClick={handleSubmit} // Call handleSubmit after payment
							>
								Confirm Purchase
							</button>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ScreeningRegistration;

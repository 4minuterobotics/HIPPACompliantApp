import React from 'react';

const ClassRegistration = () => {
	return (
		<div className='container py-5'>
			<form className='row g-3'>
				<div className='col-md-3'>
					<label
						htmlFor='inputScreeningType'
						className='form-label'
					>
						Class Options
					</label>
					<select
						id='inputScreeningType'
						className='form-select'
						required
					>
						<option
							value=''
							disabled
						>
							Choose...
						</option>
						<option value='DUI '>DUI </option>
						<option value='Drug Felony'>Drug felony</option>
						<option value='Domestic Violence '>Domestic Violence </option>
					</select>
				</div>
				<div className='col-md-12'>
					<div className='input-group mb-3'>
						<input
							type='file'
							className='form-control'
							id='inputIDFront'
							required
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
							required
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
							required
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
						type='submit'
						className='btn btn-primary'
					>
						Submit Documents
					</button>
				</div>
			</form>
		</div>
	);
};

export default ClassRegistration;

import React, { useState } from 'react';
import axios from 'axios';

const EditUserForm = ({ userId, prescription }) => {
	const [formData, setFormData] = useState({
		prescribed_class: prescription?.prescribed_class || '',
		prescribed_hours: prescription?.prescribed_hours || 0,
		completed_hours: prescription?.completed_hours || 0,
		course_completed: prescription?.course_completed || false,
		prescribed_screening: prescription?.prescribed_screening || '',
		screening_completed: prescription?.screening_completed || false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios.post(`http://localhost:3000/api/admin/users/${userId}/update`, formData, {
			withCredentials: true,
		});
		alert('Updated successfully');
	};

	return (
		<form onSubmit={handleSubmit}>
			<h4>Edit Prescription Info</h4>
			<label>Prescribed Class:</label>
			<input
				name='prescribed_class'
				value={formData.prescribed_class}
				onChange={handleChange}
			/>

			<br />

			<label>Prescribed Hours:</label>
			<input
				name='prescribed_hours'
				type='number'
				value={formData.prescribed_hours}
				onChange={handleChange}
			/>

			<br />

			<label>Completed Hours:</label>
			<input
				name='completed_hours'
				type='number'
				value={formData.completed_hours}
				onChange={handleChange}
			/>

			<br />

			<label>Course Completed:</label>
			<input
				name='course_completed'
				type='checkbox'
				checked={formData.course_completed}
				onChange={handleChange}
			/>

			<br />

			<label>Prescribed Screening:</label>
			<input
				name='prescribed_screening'
				value={formData.prescribed_screening}
				onChange={handleChange}
			/>

			<br />

			<label>Screening Completed:</label>
			<input
				name='screening_completed'
				type='checkbox'
				checked={formData.screening_completed}
				onChange={handleChange}
			/>

			<br />

			<button
				className='btn btn-dark'
				type='submit'
			>
				Update
			</button>
		</form>
	);
};

export default EditUserForm;

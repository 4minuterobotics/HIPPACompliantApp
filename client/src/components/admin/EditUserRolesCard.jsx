import React from 'react';
import { useNavigate } from 'react-router-dom';

const EditUserRolesCard = ({ id }) => {
	const navigate = useNavigate();

	// if (!authUser?.is_owner) return null; // Only owners see this

	const handleClick = () => {
		navigate(`/ownerHome/${id}/editRoles`);
	};

	return (
		<div className='text-center mb-4'>
			<h1>Edit Roles</h1>
			<div className='d-flex flex-column align-items-center justify-content-center p-4'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='80'
					height='80'
					fill='currentColor'
					className='bi bi-pencil-square mb-3'
					viewBox='0 0 16 16'
				>
					<path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.04 4.108l-2.147-2.147 1.462-1.462a.5.5 0 0 1 .707 0l1.44 1.44zm-1.75 2.456L10.5 1.146 4 7.646V10h2.354l6.398-6.398z' />
					<path
						fillRule='evenodd'
						d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5V6a.5.5 0 0 0-1 0v7.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H10a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
					/>
				</svg>
				<button
					className='btn btn-outline-primary mt-2'
					onClick={handleClick}
				>
					Go to Edit User Roles
				</button>
			</div>
		</div>
	);
};

export default EditUserRolesCard;

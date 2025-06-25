import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminMenuBar from '../../components/admin/AdminMenuBar'; // your menu component

const AdminLayout = () => {
	return (
		<div className='admin-layout container'>
			<AdminMenuBar />
			<div className='admin-content p-4'>
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;

import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './pageLoadingScreen.css';

const PageLoadingScreen = () => {
	return (
		<div className='loading-screen'>
			{/* <p>Loading</p> */}
			<Spinner
				animation='border'
				role='status'
			>
				<span className='visually-hidden'>Loading...</span>
			</Spinner>
		</div>
	);
};

export default PageLoadingScreen;

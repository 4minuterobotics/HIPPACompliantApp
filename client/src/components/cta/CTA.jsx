import React from 'react';
import './cta.css';

const CTA = () => (
	<div className='rd__cta'>
		<div className='rd__cta-content'>
			<p>Request Access to Get Started</p>
			<h3>Register Today & start exploring the endless possibilities.</h3>
		</div>
		<div className='rd__cta-btn'>
			<a
				href='https://patientportal.advancedmd.com/159501/account/logon'
				target='_blank'
			>
				<button type='button'>Get Started</button>
			</a>
		</div>
	</div>
);

export default CTA;

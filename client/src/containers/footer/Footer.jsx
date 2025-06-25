import React from 'react';
import gpt3Logo from '../../logo.svg';
import rightLogo from '../../assets/logo-no-bg.png';
import './footer.css';

const Footer = () => (
	<div className='rd__footer section__padding'>
		{/* <div className="rd__footer-heading">
      <h1 className="gradient__text">Do you want to head your life in the Right Direction?</h1>
    </div>

    <div className="rd__footer-btn">
      <p>Request Access</p>
    </div> */}

		<div className='rd__footer-links'>
			<div className='rd__footer-links_logo'>
				<img
					src={rightLogo}
					alt='rd_logo'
				/>
				{/* <p>THE RIGHT DIRECTION, <br /> All Rights Reserved</p> */}
			</div>
			<div className='rd__footer-links_div'>
				<h4>Hours of Operation</h4>
				<p>Monday: 8am - 5pm</p>
				<p>Tuesday: 8am - 5pm</p>
				<p>Wednesday: 8am - 5pm</p>
				<p>Thursday: 8am - 5pm</p>
				<p>Friday: 8am - 5pm</p>
				<p>Mon-Fri: 5pm - 8pm - Appointments only</p>
				<p>Saturday: Appointments only</p>
				<p>Sunday: Closed</p>
			</div>
			<div className='rd__footer-links_div'>
				<h4>Social Media</h4>
				<p>LinkedIn</p>
				<p>Instagram</p>
				<p>Facebook</p>
			</div>
			<div className='rd__footer-links_div'>
				<h4>Company</h4>
				<p>Terms & Conditions </p>
				<p>Privacy Policy</p>
			</div>
			<div className='rd__footer-links_div'>
				<h4>Get in touch</h4>
				<p>1990 W Camelback Rd, Suite 207, Phoenix, AZ, 85015</p>
				<p>602-825-1128</p>
				<p>admin@delriocenter.org</p>
			</div>
		</div>

		<div className='rd__footer-copyright'>
			<p>@2023 DEL RIO CENTER. All rights reserved.</p>
		</div>
	</div>
);

export default Footer;

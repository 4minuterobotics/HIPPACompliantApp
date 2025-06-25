import React, { useState } from 'react';
import druggie from '../../assets/right-alex.png';
import smDruggie from '../../assets/right-alex-small.png';
import logo from '../../assets/logo-no-words-big.png';
import smLogo from '../../assets/logo-no-words-sm.png';

import './header.css';

const Header = () => {
	const [loaded, setLoaded] = useState(false);

	const handleLoad = () => {
		console.log('loaded');
		setLoaded(true);
	};

	return (
		<div
			className='rd__header section__padding'
			id='home'
		>
			<div className='rd__header-content'>
				<h1 className='gradient__text'>Find Your Way: Regain Control of Your Future</h1>
				<p>
					Through passion and integrity, here at Del Rio Center LLC will provide quality care for our clients leaving them with clarity and tranquility for future endeavors.
				</p>

				<div className='rd__header-content__input'>
					{/* <input type="email" placeholder="Your Email Address" /> */}
					<a
						href='https://patientportal.advancedmd.com/159501/account/logon'
						target='_blank'
					>
						<button type='button'>Get Started</button>
					</a>
				</div>

				{/* <div className="rd__header-content__people">
          <img src={people} />
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div> */}
			</div>

			<div
				className={loaded ? 'rd__header-image blurred-img loaded' : 'rd__header-image blurred-img'}
				style={{ backgroundImage: `url(${smLogo})` }}
			>
				<img
					src={logo}
					alt='client'
					loading='lazy'
					onLoad={handleLoad}
				/>
			</div>
		</div>
	);
};

export default Header;

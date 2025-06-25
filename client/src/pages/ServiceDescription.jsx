import React from 'react';

// import './ScreeningRegistration.css';

const ServiceDescription = () => (
	<div className='ServiceDescription'>
		<div className='col-lg-8 mx-auto p-4 py-md-5'>
			{/* <header className='d-flex align-items-center pb-3 mb-5 border-bottom'>
				<a
					href='/'
					className='d-flex align-items-center text-body-emphasis text-decoration-none'
				>
					<svg
						className='bi me-2'
						width='40'
						height='32'
						role='img'
						aria-label='Bootstrap'
					>
						<use xlinkHref='#bootstrap'></use>
					</svg>
					<span className='fs-4'>Select a Service</span>
				</a>
			</header> */}

			<main>
				<h1 className='text-body-emphasis'>Choose a Service</h1>
				<p className='fs-5 col-md-8'>You're almost there! Let us know what you're here for.</p>

				<hr className='col-3 col-md-2 mb-5' />
				<div className='row g-5'>
					<div className='col-md-6'>
						<h2 className='text-body-emphasis'>Screenings</h2>
						<p>Covers DUI, drug felonies, and domestic violence. Registration for our screening service is broken down into 3 simple steps.</p>
						<ol>
							<li>Upload ID and relevant court documents</li>
							<li>Review your payment options</li>
							<li>Review your screening delivery options </li>
						</ol>
						<div className='mb-5'>
							<a
								href='/docs/5.3/examples/'
								className='btn btn-primary btn-lg px-4'
							>
								Register for Screening
							</a>
						</div>
					</div>

					<div className='col-md-6'>
						<h2 className='text-body-emphasis'>Classes</h2>
						<p>Covers DUI, drug felonies, and domestic violence. Registration for our screening service is broken down into 4 simple steps.</p>
						<ol>
							<li>Upload ID and relevant court documents</li>
							<li>Review your payment options</li>
							<li>Review your certificate delivery options </li>
							<li>Begin your course</li>
						</ol>
						<div className='mb-5'>
							<a
								href='/docs/5.3/examples/'
								className='btn btn-primary btn-lg px-4'
							>
								Register for Classes
							</a>
						</div>
					</div>
				</div>
			</main>
			<footer className='pt-5 my-5 text-body-secondary border-top'>Created by the Bootstrap team · © 2025</footer>
		</div>
	</div>
);

export default ServiceDescription;

/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
const dbMode = import.meta.env.VITE_APP_DB_MODE;

const OwnerMenuBar = ({ user }) => {
	return (
		<div>
			<button
				className='btn btn-primary'
				type='button'
				data-bs-toggle='offcanvas'
				data-bs-target='#offcanvasExample'
				aria-controls='offcanvasExample'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					fill='currentColor'
					className='bi bi-list me-2'
					viewBox='0 0 16 16'
				>
					<path
						fillRule='evenodd'
						d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5'
					/>
				</svg>{' '}
				Owner Panel{' '}
			</button>

			<div
				className='offcanvas offcanvas-start'
				tabIndex='-1'
				id='offcanvasExample'
				aria-labelledby='offcanvasExampleLabel'
			>
				<div className='offcanvas-header'>
					<h5
						className='offcanvas-title'
						id='offcanvasExampleLabel'
					>
						Owner Panel{' '}
					</h5>
					<button
						type='button'
						className='btn-close'
						data-bs-dismiss='offcanvas'
						aria-label='Close'
					></button>
				</div>
				<div className='offcanvas-body'>
					<div
						className='d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary'
						style={{ width: '100%' }}
					>
						<a
							href='/'
							className='d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none'
						>
							<svg
								className='bi pe-none me-2'
								width='40'
								height='32'
								aria-hidden='true'
							>
								<use xlinkHref='#bootstrap'></use>
							</svg>
							<span className='fs-4'>Menu</span>
						</a>
						<hr />
						<ul className='nav nav-pills flex-column mb-auto'>
							<NavLink to={dbMode == 'mongo' ? `/ownerHome/${user._id}` : `/ownerHome/${user.id}`}>
								<li className='nav-item'>
									<div
										className='nav-link link-body-emphasis'
										aria-current='page'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											className='bi bi-calendar-day me-2'
											viewBox='0 0 16 16'
										>
											<path d='M4.684 11.523v-2.3h2.261v-.61H4.684V6.801h2.464v-.61H4v5.332zm3.296 0h.676V8.98c0-.554.227-1.007.953-1.007.125 0 .258.004.329.015v-.613a2 2 0 0 0-.254-.02c-.582 0-.891.32-1.012.567h-.02v-.504H7.98zm2.805-5.093c0 .238.192.425.43.425a.428.428 0 1 0 0-.855.426.426 0 0 0-.43.43m.094 5.093h.672V7.418h-.672z' />
											<path d='M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z' />

											<use xlinkHref='#home'></use>
										</svg>
										Dashboard
									</div>
								</li>
							</NavLink>
							<NavLink to='/ownerHome/:id/todo'>
								<li>
									<div className='nav-link link-body-emphasis'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											className='bi bi-people me-2'
											viewBox='0 0 16 16'
										>
											<path d='M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4' />

											<use xlinkHref='#speedometer2'></use>
										</svg>
										Your Action Needed
									</div>
								</li>
							</NavLink>
							<NavLink to='/ownerHome/:id/upcomingEvents'>
								<li>
									<div className='nav-link link-body-emphasis'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											className='bi bi-journals'
											viewBox='0 0 16 16'
										>
											<path d='M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2' />
											<path d='M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0' />
										</svg>
										Upcoming Events
									</div>
								</li>
							</NavLink>
							<li>
								<a
									href='#'
									className='nav-link link-body-emphasis'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='bi bi-prescription me-2'
										viewBox='0 0 16 16'
									>
										<path d='M5.5 6a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V9h.293l2 2-1.147 1.146a.5.5 0 0 0 .708.708L9 11.707l1.146 1.147a.5.5 0 0 0 .708-.708L9.707 11l1.147-1.146a.5.5 0 0 0-.708-.708L9 10.293 7.695 8.987A1.5 1.5 0 0 0 7.5 6zM6 7h1.5a.5.5 0 0 1 0 1H6z' />
										<path d='M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4zM3 3h10V1H3z' />

										<use xlinkHref='#table'></use>
									</svg>
									Prescriptions
								</a>
							</li>
							<li>
								<a
									href='#'
									className='nav-link link-body-emphasis'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										className='bi bi-credit-card-2-back me-2'
										viewBox='0 0 16 16'
									>
										<path d='M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z' />
										<path d='M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1' />

										<use xlinkHref='#grid'></use>
									</svg>
									Payments
								</a>
							</li>
							<li>
								<a
									href='#'
									className='nav-link link-body-emphasis'
								>
									<svg
										className='bi pe-none me-2'
										width='16'
										height='16'
										aria-hidden='true'
									>
										<use xlinkHref='#people-circle'></use>
									</svg>
									Customers
								</a>
							</li>
						</ul>
						<hr />
						<div className='dropdown'>
							<a
								href='#'
								className='d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								<img
									src='https://github.com/mdo.png'
									alt=''
									width='32'
									height='32'
									className='rounded-circle me-2'
								/>
								<strong>mdo</strong>
							</a>
							<ul className='dropdown-menu text-small shadow'>
								<li>
									<a
										className='dropdown-item'
										href='#'
									>
										New project...
									</a>
								</li>
								<li>
									<a
										className='dropdown-item'
										href='#'
									>
										Settings
									</a>
								</li>
								<li>
									<a
										className='dropdown-item'
										href='#'
									>
										Profile
									</a>
								</li>
								<li>
									<hr className='dropdown-divider' />
								</li>
								<li>
									<a
										className='dropdown-item'
										href='#'
									>
										Sign out
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OwnerMenuBar;

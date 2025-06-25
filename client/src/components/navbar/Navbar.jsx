import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import axios from 'axios';
import logo from '../../logo.svg';
import rightLogo from '../../assets/logo-no-bg.png';
import { AuthContext } from '../../contexts/AuthContext';
import './navbar.css';

const dbMode = import.meta.env.VITE_APP_DB_MODE;

const Navbar = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, setUser } = useContext(AuthContext);

	const isHomePage = location.pathname === '/';
	const [toggleMenu, setToggleMenu] = useState(false);

	const userId = dbMode === 'mongo' ? user?._id : user?.id;

	const dashboardLink = user?.is_admin
		? '/admin'
		: user?.is_owner
		? `/ownerHome/${userId}/dashboard`
		: user?.is_provider
		? '/provider'
		: user?.is_student
		? `/studentHome/${userId}/dashboard`
		: '/login';

	const handleLogout = async () => {
		try {
			await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
			setUser(null);
			navigate('/login');
		} catch (err) {
			console.error('Logout failed:', err);
		}
	};

	return (
		<div className='rd__navbar'>
			<div className='rd__navbar-links'>
				<div className='rd__navbar-links_logo'>
					<img
						src={rightLogo}
						alt='logo'
					/>
				</div>
				<div className='rd__navbar-links_container'>
					<p>
						<Link to='/'>Home</Link>
					</p>
					{isHomePage && (
						<>
							<p>
								<a href='#services'>Services</a>
							</p>
							<p>
								<a href='#features'>Our Culture</a>
							</p>
							<p>
								<a href='#housing'>Housing</a>
							</p>
						</>
					)}
				</div>
			</div>

			<div className='rd__navbar-sign'>
				{userId ? (
					<>
						<button
							className='btn btn-outline-danger'
							onClick={handleLogout}
						>
							Log Out
						</button>
						<Link to={dashboardLink}>
							<button className='btn btn-dark'>Dashboard</button>
						</Link>
					</>
				) : (
					<Link to='/login'>
						<button className='btn btn-primary'>Login</button>
					</Link>
				)}

				{(user?.is_admin || user?.is_owner || user?.is_provider) && (
					<a
						href='https://hostinger.titan.email/login/'
						target='_blank'
						rel='noreferrer'
					>
						<button
							className='signin-button'
							type='button'
						>
							Email
						</button>
					</a>
				)}
			</div>

			<div className='rd__navbar-menu'>
				{toggleMenu ? (
					<RiCloseLine
						color='#040c18'
						size={27}
						onClick={() => setToggleMenu(false)}
					/>
				) : (
					<RiMenu3Line
						color='#040c18'
						size={27}
						onClick={() => setToggleMenu(true)}
					/>
				)}
				{toggleMenu && (
					<div className='rd__navbar-menu_container scale-up-center'>
						<div className='rd__navbar-menu_container-links'>
							<p>
								<a href='#home'>Home</a>
							</p>
							<p>
								<a href='#services'>Services</a>
							</p>
							<p>
								<a href='#features'>Our Culture</a>
							</p>
							<p>
								<a href='#housing'>Housing</a>
							</p>
						</div>
						<div className='rd__navbar-menu_container-links-sign'>
							<a
								href='https://hostinger.titan.email/login/'
								target='_blank'
								rel='noreferrer'
							>
								<button
									type='button'
									className='signin-button'
								>
									Email
								</button>
							</a>
							{userId ? (
								<button
									className='btn btn-outline-danger'
									onClick={handleLogout}
								>
									Log Out
								</button>
							) : (
								<Link
									to='/login'
									className='btn btn-primary'
								>
									Login
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;

// import React, { useContext, useEffect, useState } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
// import logo from '../../logo.svg';
// import rightLogo from '../../assets/logo-no-bg.png';
// import axios from 'axios';
// import { AuthContext } from '../../contexts/AuthContext';
// const dbMode = import.meta.env.VITE_APP_DB_MODE;

// import './navbar.css';

// const Navbar = () => {
// 	const location = useLocation();
// 	const isHomePage = location.pathname === '/';

// 	const { user, setUser } = useContext(AuthContext);
// 	const navigate = useNavigate();

// 	const [toggleMenu, setToggleMenu] = useState(false);

// 	// useEffect(() => {
// 	// 	const fetchUser = async () => {
// 	// 		try {
// 	// 			const res = await axios.get('http://localhost:3000/api/current-user', {
// 	// 				withCredentials: true,
// 	// 			});
// 	// 			console.log('Logged-in user:', res.data); // 👈 Add this
// 	// 			setUser(res.data);
// 	// 		} catch {
// 	// 			console.log('No user logged in'); // 👈 Add this
// 	// 			setUser(null);
// 	// 		}
// 	// 	};
// 	// 	fetchUser();
// 	// }, []);

// 	const handleLogout = async () => {
// 		try {
// 			await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
// 			setUser(null);
// 			navigate('/login');
// 		} catch (err) {
// 			console.error('Logout failed:', err);
// 		}
// 	};
// 	return (
// 		<div className='rd__navbar'>
// 			<div className='rd__navbar-links'>
// 				<div className='rd__navbar-links_logo'>
// 					{/* <div> */}
// 					{/* <img src={logo} /> */}
// 					<img src={rightLogo} />
// 				</div>
// 				<div className='rd__navbar-links_container'>
// 					<p>
// 						<Link to='/'>Home</Link>
// 					</p>
// 					{isHomePage && (
// 						<>
// 							<p>
// 								<a href='#services'>Services</a>
// 							</p>
// 							<p>
// 								<a href='#features'>Our Culture</a>
// 							</p>
// 							<p>
// 								<a href='#housing'>Housing</a>
// 							</p>
// 							{/* <p>
// 						<a href='#blog'>Media</a>
// 					</p> */}
// 						</>
// 					)}
// 				</div>
// 			</div>
// 			<div className='rd__navbar-sign'>
// 				{/* If using mongo, use user?._id */}
// 				{/* If using postgres, use user?.id */}
// 				{(dbMode === 'mongo' ? user?._id : user?.id) ? (
// 					<button
// 						className='btn btn-outline-danger'
// 						onClick={handleLogout}
// 					>
// 						Log Out
// 					</button>
// 				) : (
// 					<Link to='/login'>
// 						<button className='btn btn-primary'>Login</button>
// 					</Link>
// 				)}

// 				{/* dashboard button */}
// 				{/* If using mongo, use user?._id */}
// 				{/* If using postgres, use user?.id */}
// 				{user?._id && (
// 					<Link
// 						// If using mongo, use user?._id
// 						// If using postgres, use user?.id
// 						to={user?.is_admin ? '/admin' : user?.is_owner ? '/owner' : user?.is_provider ? '/provider' : user?.is_student ? `/studentHome/${user._id}/dashboard` : '/login'}
// 						onClick={() => {
// 							console.log('user id: ' + user._id);
// 							console.log('user is admin: ' + user.is_admin);
// 							console.log('user is owner: ' + user.is_owner);
// 							console.log('user is provider: ' + user.is_provider);
// 							console.log('user is student: ' + user.is_student);
// 						}}
// 					>
// 						<button className='btn btn-dark'>Dashboard</button>
// 					</Link>
// 				)}
// 				{/* {user?.id && (
// 					<Link to={user?.is_admin || user?.is_owner || user?.is_provider ? '/admin' : '/studentHome'}>
// 						<button className='btn btn-dark'>Dashboard</button>
// 					</Link>
// 				)} */}

// 				{/* email button */}
// 				{(user?.is_admin || user?.is_owner || user?.is_provider) && (
// 					<a
// 						href='https://hostinger.titan.email/login/'
// 						target='_blank'
// 						rel='noreferrer'
// 					>
// 						<button
// 							className='signin-button'
// 							type='button'
// 						>
// 							Email
// 						</button>
// 					</a>
// 				)}

// 				{/* <a
// 					href='https://patientportal.advancedmd.com/159501/account/logon'
// 					target='_blank'
// 					rel='noreferrer'
// 				>
// 					<button
// 						className='signup-button'
// 						type='button'
// 					>
// 						Sign up
// 					</button>
// 				</a> */}
// 			</div>

// 			<div className='rd__navbar-menu'>
// 				{toggleMenu ? (
// 					<RiCloseLine
// 						// color='#fff'
// 						color='#040c18'
// 						size={27}
// 						onClick={() => setToggleMenu(false)}
// 					/>
// 				) : (
// 					<RiMenu3Line
// 						// color='#fff'
// 						color='#040c18'
// 						size={27}
// 						onClick={() => setToggleMenu(true)}
// 					/>
// 				)}
// 				{toggleMenu && (
// 					<div className='rd__navbar-menu_container scale-up-center'>
// 						<div className='rd__navbar-menu_container-links'>
// 							<p>
// 								<a href='#home'>Home</a>
// 							</p>
// 							<p>
// 								<a href='#services'>Services</a>
// 							</p>
// 							<p>
// 								<a href='#features'>Our Culture</a>
// 							</p>
// 							<p>
// 								<a href='#housing'>Housing</a>
// 							</p>
// 							{/* <p>
// 								<a href='#blog'>Media</a>
// 							</p> */}
// 						</div>
// 						<div className='rd__navbar-menu_container-links-sign'>
// 							<a
// 								href='https://hostinger.titan.email/login/'
// 								target='_blank'
// 								rel='noreferrer'
// 							>
// 								<button
// 									type='button'
// 									className='signin-button'
// 								>
// 									Email
// 								</button>
// 							</a>
// 							{/* <a
// 								href='https://patientportal.advancedmd.com/159501/account/logon'
// 								target='_blank'
// 								rel='noreferrer'
// 							>
// 								<button
// 									className='signup-button'
// 									type='button'
// 								>
// 									Sign up
// 								</button>
// 							</a> */}
// 							{/* If using mongo, use user?._id */}
// 							{/* If using postgres, use user?.id */}
// 							{user?._id ? (
// 								<button
// 									className='btn btn-outline-danger'
// 									onClick={handleLogout}
// 								>
// 									Log Out
// 								</button>
// 							) : (
// 								<Link
// 									to='/login'
// 									className='btn btn-primary'
// 								>
// 									Login
// 								</Link>
// 							)}
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default Navbar;

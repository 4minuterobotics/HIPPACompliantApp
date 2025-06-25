import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import axios from 'axios';

axios.defaults.withCredentials = true;
import 'bootstrap/dist/css/bootstrap.min.css';

import { Footer, Contact, Blog, Housing, Culture, WhatWeDo, Header } from './containers';
import { CTA, Brand, Navbar, ScrollToTop, PageLoadingScreen } from './components';

const LazyHome = React.lazy(() => import('./pages/Home'));
//student pages
const LazyStudentRedirect = React.lazy(() => import('./pages/studentView/StudentRedirect'));
const LazyServiceDescription = React.lazy(() => import('./pages/ServiceDescription'));
const LazyRegistrationForm = React.lazy(() => import('./pages/RegistrationForm'));
const LazyScreeningRegistration = React.lazy(() => import('./pages/ScreeningRegistration'));
const LazyClassRegistration = React.lazy(() => import('./pages/ClassRegistration'));
const LazySuccessfulPayment = React.lazy(() => import('./pages/SuccessfulPayment'));
const LazyCancelPayment = React.lazy(() => import('./pages/CancelPayment'));
const LazyLogin = React.lazy(() => import('./pages/Login'));
const LazyNewUsers = React.lazy(() => import('./pages/NewUsers'));
const LazyForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const LazyAccessDenied = React.lazy(() => import('./pages/AccessDenied'));
const LazyError = React.lazy(() => import('./pages/Error'));
// const LazyAllUsers = React.lazy(() => import('./pages/AllUsers'));
const LazyAdminLayout = React.lazy(() => import('./pages/admin/AdminLayout')); // <-- new
const LazyAdminHome = React.lazy(() => import('./pages/admin/Admin')); // Admin home
const LazyAllUsers = React.lazy(() => import('./pages/admin/AllUsers'));
const LazyUserProfile = React.lazy(() => import('./pages/admin/UserProfile'));
//
const LazyGoogleOAuth = React.lazy(() => import('./pages/oauth/GoogleOAuthRedirect'));
//
const LazyCheckoutForm = React.lazy(() => import('./pages/stripe/CheckoutForm'));
const LazyCheckoutReturn = React.lazy(() => import('./pages/stripe/CheckoutReturn'));

//
const LazyStudentHome = React.lazy(() => import('./pages/studentView/StudentHome'));
const LazyStudentDashboard = React.lazy(() => import('./pages/studentView/StudentDashboard'));
const LazyStudentDocs = React.lazy(() => import('./pages/studentView/StudentDocs'));
const LazyStudentClasses = React.lazy(() => import('./pages/studentView/StudentClasses'));

//
const LazyOwnerHome = React.lazy(() => import('./pages/owner/OwnerHome'));
const LazyOwnerRedirect = React.lazy(() => import('./pages/owner/OwnerRedirect'));
// const LazyApprovePrescription = React.lazy(() => import('./pages/owner/ApprovePrescription'));
const LazyOwnerEditRoles = React.lazy(() => import('./pages/owner/OwnerEditRoles'));
const LazyOwnerDashboard = React.lazy(() => import('./pages/owner/OwnerDashboard'));

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

const App = () => {
	const location = useLocation(); // you missed this line in your snippet!

	return (
		// <div className='App'>
		// 	<ToastContainer
		// 		position='bottom-center'
		// 		limit={1}
		// 	/>

		// 	<div className='gradient__bg'>
		// 		<Navbar />
		// 		<Header />
		// 	</div>
		// 	{/* <Brand /> */}
		// 	<WhatWeDo />
		// 	<Culture />
		// 	<Housing />
		// 	<CTA />
		// 	{/* <Blog /> */}
		// 	<Contact />
		// 	<Footer />
		// </div>

		// <Home />
		<>
			<ScrollToTop />
			<AuthProvider>
				<Navbar />

				<Routes
					key={location.pathname}
					location={location}
				>
					<Route
						path='/'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyHome />{' '}
							</React.Suspense>
						}
					/>
					{/* <Route
						path='/owner/manage-users'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								<LazyOwnerEditRoles />
							</React.Suspense>
						}
					/>
					 */}
					<Route
						path='/login'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyLogin />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/forgotPassword'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyForgotPassword />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/googleOAuth'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyGoogleOAuth />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/accessDenied'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyAccessDenied />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/error'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyError />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/newUsers'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyNewUsers />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/serviceDescription'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyServiceDescription />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/registrationForm'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyRegistrationForm />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/screeningRegistration'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyScreeningRegistration />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/classRegistration'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyClassRegistration />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/checkout'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyCheckoutForm />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/checkoutResults'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyCheckoutReturn />{' '}
							</React.Suspense>
						}
					/>
					<Route
						path='/cancelPayment'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								{' '}
								<LazyCancelPayment />{' '}
							</React.Suspense>
						}
					/>

					{/* Admin routes with layout */}
					<Route
						path='/admin'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								<LazyAdminLayout />
							</React.Suspense>
						}
					>
						<Route
							index
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyAdminHome />
								</React.Suspense>
							}
						/>
						<Route
							path='allUsers'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyAllUsers />
								</React.Suspense>
							}
						/>
						<Route
							path='userProfile/:id'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyUserProfile />
								</React.Suspense>
							}
						/>
					</Route>
					{/* Client routes with layout */}
					<Route
						path='/studentHome'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								<LazyStudentHome />
							</React.Suspense>
						}
					>
						{/* Redirect entry point: /studentHome/:id */}
						<Route
							path=':id'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyStudentRedirect />
								</React.Suspense>
							}
						/>
						<Route
							path=':id/dashboard'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyStudentDashboard />
								</React.Suspense>
							}
						/>
						<Route
							path=':id/docs'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyStudentDocs />
								</React.Suspense>
							}
						/>
						<Route
							path=':id/classes'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyStudentClasses />
								</React.Suspense>
							}
						/>

						{/* <Route
						path='userProfile'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								<LazyUserProfile />
							</React.Suspense>
						}
					/> */}
					</Route>
					<Route
						path='/ownerHome'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								<LazyOwnerHome />
							</React.Suspense>
						}
					>
						{/* Redirect entry point: /ownerHome/:id */}
						<Route
							path=':id'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyOwnerRedirect />
								</React.Suspense>
							}
						/>
						<Route
							path=':id/dashboard'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyOwnerDashboard />
								</React.Suspense>
							}
						/>
						<Route
							path=':id/editRoles'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyOwnerEditRoles />
								</React.Suspense>
							}
						/>
						{/* <Route
							path=':id/approvePrescription'
							element={
								<React.Suspense fallback={<PageLoadingScreen />}>
									<LazyApprovePrescription />
								</React.Suspense>
							}
						/> */}

						{/* <Route
						path='userProfile'
						element={
							<React.Suspense fallback={<PageLoadingScreen />}>
								<LazyUserProfile />
							</React.Suspense>
						}
					/> */}
					</Route>
				</Routes>
			</AuthProvider>
			<Footer />
		</>
	);
};

export default App;

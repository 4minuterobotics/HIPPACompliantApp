import React from 'react';
import { Footer, Contact, Blog, Housing, Culture, WhatWeDo, Header } from '../containers';
import { CTA, Brand, Navbar } from '../components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../App.css';
const Home = () => {
	return (
		<div className='App'>
			<ToastContainer
				position='bottom-center'
				limit={1}
			/>

			<div className='gradient__bg'>
				{/* <Navbar /> */}
				<Header />
			</div>
			{/* <Brand /> */}
			<WhatWeDo />
			<Culture />
			<Housing />
			<CTA />
			{/* <Blog /> */}
		</div>
	);
};

export default Home;

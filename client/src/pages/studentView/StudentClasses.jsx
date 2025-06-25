// src/pages/studentView/StudentDashboard.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const StudentClasses = () => {
	const { id } = useParams();
	return (
		<div className='container'>
			{/* <h1>Student Dashboard</h1> */}
			{/* <p>Your student ID is: {id}</p> */}
			{/* Put widgets, calendar, stats, etc. here */}
			<div className='row mb-2'>
				{' '}
				<div className='col-md-6'>
					{' '}
					<div className='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
						{' '}
						<div className='col p-4 d-flex flex-column position-static'>
							{' '}
							<strong className='d-inline-block mb-2 text-primary-emphasis'>World</strong> <h3 className='mb-0'>Featured post</h3>{' '}
							<div className='mb-1 text-body-secondary'>Nov 12</div>{' '}
							<p className='card-text mb-auto'>This is a wider card with supporting text below as a natural lead-in to additional content.</p>{' '}
							<a
								href='#'
								className='icon-link gap-1 icon-link-hover stretched-link'
							>
								Continue reading
								<svg
									className='bi'
									aria-hidden='true'
								>
									<use xlinkHref='#chevron-right'></use>
								</svg>{' '}
							</a>{' '}
						</div>{' '}
						<div className='col-auto d-none d-lg-block'>
							{' '}
							<svg
								aria-label='Placeholder: Thumbnail'
								className='bd-placeholder-img '
								height='250'
								preserveAspectRatio='xMidYMid slice'
								role='img'
								width='200'
								xmlns='http://www.w3.org/2000/svg'
							>
								<title>Placeholder</title>
								<rect
									width='100%'
									height='100%'
									fill='#55595c'
								></rect>
								<text
									x='50%'
									y='50%'
									fill='#eceeef'
									dy='.3em'
								>
									Thumbnail
								</text>
							</svg>{' '}
						</div>{' '}
					</div>{' '}
				</div>{' '}
				<div className='col-md-6'>
					{' '}
					<div className='row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative'>
						{' '}
						<div className='col p-4 d-flex flex-column position-static'>
							{' '}
							<strong className='d-inline-block mb-2 text-success-emphasis'>Design</strong> <h3 className='mb-0'>Post title</h3>{' '}
							<div className='mb-1 text-body-secondary'>Nov 11</div>{' '}
							<p className='mb-auto'>This is a wider card with supporting text below as a natural lead-in to additional content.</p>{' '}
							<a
								href='#'
								className='icon-link gap-1 icon-link-hover stretched-link'
							>
								Continue reading
								<svg
									className='bi'
									aria-hidden='true'
								>
									<use xlinkHref='#chevron-right'></use>
								</svg>{' '}
							</a>{' '}
						</div>{' '}
						<div className='col-auto d-none d-lg-block'>
							{' '}
							<svg
								aria-label='Placeholder: Thumbnail'
								className='bd-placeholder-img '
								height='250'
								preserveAspectRatio='xMidYMid slice'
								role='img'
								width='200'
								xmlns='http://www.w3.org/2000/svg'
							>
								<title>Placeholder</title>
								<rect
									width='100%'
									height='100%'
									fill='#55595c'
								></rect>
								<text
									x='50%'
									y='50%'
									fill='#eceeef'
									dy='.3em'
								>
									Thumbnail
								</text>
							</svg>{' '}
						</div>{' '}
					</div>{' '}
				</div>{' '}
			</div>
		</div>
	);
};

export default StudentClasses;

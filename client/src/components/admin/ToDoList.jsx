import React from 'react';

const ToDoList = () => {
	return (
		<div className='text-center mb-4'>
			<h1>To Do List</h1>
			<div className='d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center'>
				<div className='list-group'>
					<a
						href='#'
						className='list-group-item list-group-item-action d-flex gap-3 py-3'
						aria-current='true'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='50'
							height='50'
							fill='currentColor'
							className='bi bi-prescription px-2'
							viewBox='0 0 16 16'
						>
							<path d='M5.5 6a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V9h.293l2 2-1.147 1.146a.5.5 0 0 0 .708.708L9 11.707l1.146 1.147a.5.5 0 0 0 .708-.708L9.707 11l1.147-1.146a.5.5 0 0 0-.708-.708L9 10.293 7.695 8.987A1.5 1.5 0 0 0 7.5 6zM6 7h1.5a.5.5 0 0 1 0 1H6z' />
							<path d='M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4zM3 3h10V1H3z' />
						</svg>
						<div className='d-flex gap-2 w-100 justify-content-between'>
							<div>
								<h6 className='mb-0'>Create a screening</h6>
								<p className='mb-0 opacity-75'>For John Pheni.</p>
							</div>
							<small className='opacity-50 text-nowrap'>now</small>
						</div>
					</a>
					<a
						href='#'
						className='list-group-item list-group-item-action d-flex gap-3 py-3'
						aria-current='true'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='50'
							height='50'
							fill='currentColor'
							className='bi bi-prescription px-2'
							viewBox='0 0 16 16'
						>
							<path d='M5.5 6a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V9h.293l2 2-1.147 1.146a.5.5 0 0 0 .708.708L9 11.707l1.146 1.147a.5.5 0 0 0 .708-.708L9.707 11l1.147-1.146a.5.5 0 0 0-.708-.708L9 10.293 7.695 8.987A1.5 1.5 0 0 0 7.5 6zM6 7h1.5a.5.5 0 0 1 0 1H6z' />
							<path d='M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4zM3 3h10V1H3z' />
						</svg>
						<div className='d-flex gap-2 w-100 justify-content-between'>
							<div>
								<h6 className='mb-0'>Create a screening</h6>
								<p className='mb-0 opacity-75'>For Lolita G.</p>
							</div>
							<small className='opacity-50 text-nowrap'>3d</small>
						</div>
					</a>
					<a
						href='#'
						className='list-group-item list-group-item-action d-flex gap-3 py-3'
						aria-current='true'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='50'
							height='50'
							fill='currentColor'
							className='bi bi-prescription px-2'
							viewBox='0 0 16 16'
						>
							<path d='M5.5 6a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 1 0V9h.293l2 2-1.147 1.146a.5.5 0 0 0 .708.708L9 11.707l1.146 1.147a.5.5 0 0 0 .708-.708L9.707 11l1.147-1.146a.5.5 0 0 0-.708-.708L9 10.293 7.695 8.987A1.5 1.5 0 0 0 7.5 6zM6 7h1.5a.5.5 0 0 1 0 1H6z' />
							<path d='M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 14.5V4a1 1 0 0 1-1-1zm2 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V4zM3 3h10V1H3z' />
						</svg>
						<div className='d-flex gap-2 w-100 justify-content-between'>
							<div>
								<h6 className='mb-0'>Create a Screening</h6>
								<p className='mb-0 opacity-75'>For Joe Blow.</p>
							</div>
							<small className='opacity-50 text-nowrap'>1w</small>
						</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default ToDoList;

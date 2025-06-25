import React from 'react';

const CalendarIFrame = () => {
	return (
		<div style={{ minHeight: '800px', padding: '20px' }}>
			<iframe
				src='https://calendly.com/jukeyaboyfo/new-meeting'
				style={{ width: '100%', height: '100%', minHeight: '800px', border: 'none' }}
				frameBorder='0'
				scrolling='no'
			></iframe>
		</div>
	);
};

export default CalendarIFrame;

import React from 'react';
import { InlineWidget } from 'react-calendly';

const CalendarWidget = () => {
	return (
		<div style={{ minHeight: '800px', padding: '20px' }}>
			<InlineWidget
				url='https://calendly.com/jukeyaboyfo/new-meeting'
				styles={{ height: '800px' }}
			/>
		</div>
	);
};

export default CalendarWidget;

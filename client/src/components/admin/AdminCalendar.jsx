import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCalendar = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const res = await axios.get('http://localhost:3000/api/bookings', {
					withCredentials: true, // 🔐 this sends the session cookie
				});
				setEvents(res.data);
			} catch (error) {
				console.error('Error fetching events:', error);
			}
		};

		fetchEvents();
	}, []);

	return (
		<div>
			<h1>Booked Appointments</h1>
			{console.log(events)}
			<ul>
				{events.map((event, index) => (
					<li key={`${event.uri}-${index}`}>
						{event.name} - {new Date(event.start_time).toLocaleString()}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminCalendar;

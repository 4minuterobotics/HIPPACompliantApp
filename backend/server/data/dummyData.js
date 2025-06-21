export const bookings = [
	{
		uri: '1',
		name: 'John Doe',
		start_time: '2025-05-01T14:00:00Z',
	},
	{
		uri: '2',
		name: 'Jane Smith',
		start_time: '2025-05-02T10:30:00Z',
	},
];
export const bookings2 = [
	{
		uri: 'redirect',
		name: 'redirect',
		start_time: 'redirect',
	},
	{
		uri: 'redirect',
		name: 'not authenticated',
		start_time: 'not authenticaed',
	},
];

export const users = [
	{
		first: 'bill',
		last: 'jo',
		email: 'test@yolo.com',
		password: 'manshoot',
		salt: '1234',
		address: '234 s apple St.',
		city: 'harvey',
		recommendedHours: 16,
		completedHours: 4,
		get hoursRemaining() {
			return this.recommendedHours - this.completedHours;
		},
	},
	{
		first: 'patrick',
		last: 'wilson',
		email: 'test2@yolo.com',
		password: 'easy',
		salt: '5678',
		address: '345 NE blue Terrace',
		city: 'Phily',
		recommendedHours: 12,
		completedHours: 2,
		get hoursRemaining() {
			return this.recommendedHours - this.completedHours;
		},
	},
];

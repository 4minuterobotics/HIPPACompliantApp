export const prices = {
	screening: 90,
	DUI: {
		fourHour: 375,
		eightHour: 275,
		twelveHour: 375,
		sixteenHour: 500,
	},
};

export const services = {
	screeningServices: [
		{
			shortName: 'DUI',
			fullName: 'DUI Screening',
			description: 'Quick and confidential screening service for individuals with DUIs. Get assessed fast to meet court or DMV requirements with certified results.',
			price: 90,
		},
		{
			shortName: 'Domestic Violence',
			fullName: 'Domestic Violence Screening',
			description: 'Confidential screening service offering support and resources for individuals impacted by domestic violence—compassionate, safe, and judgment-free.',
			price: 90,
		},
		{
			shortName: 'Drug Felony',
			fullName: 'Drug Felony Screening',
			description: 'Fast, confidential background screening service focused on identifying drug use and felony history to support safe hiring and housing decisions.',
			price: 90,
		},
	],
	classes: [
		{
			shortName: 'DUI',
			fullName: 'DUI Class',
			description: 'Court-ordered DUI class focused on education, accountability, and safe driving to help individuals work toward reinstating their driver’s license.',
			hoursPerSession: 2,
			hourlyRate: 30,
			options: [
				{ sessions: 4, totalHours: 8, price: 120 },

				{ sessions: 8, totalHours: 16, price: 240 },

				{ sessions: 12, totalHours: 24, price: 360 },
			],
		},
		{
			shortName: 'Drug Felony',
			fullName: 'Drug Felony Class',
			description: 'Court-ordered drug felony class covering legal consequences, recovery strategies, and prevention skills to support rehabilitation and reduce recidivism.',
			hoursPerSession: 2,
			hourlyRate: 30,
			options: [
				{ sessions: 4, totalHours: 8, price: 120 },

				{ sessions: 8, totalHours: 16, price: 240 },

				{ sessions: 12, totalHours: 24, price: 360 },
			],
		},
		{
			shortName: 'Domestic Violence',
			fullName: 'Domestic Violence Class',
			description:
				'Court-ordered class providing education, accountability, and tools to prevent domestic violence, promote respectful behavior, and ensure safer relationships.',
			hoursPerSession: 2,
			hourlyRate: 50,
			options: [
				{ sessions: 8, totalHours: 16, price: 400 },

				{ sessions: 12, totalHours: 24, price: 600 },
			],
		},
	],
};

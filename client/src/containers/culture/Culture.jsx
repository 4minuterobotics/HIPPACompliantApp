import React from 'react';
import Feature from '../../components/feature/Feature';
import './culture.css';

const cultureData = [
	{
		title: 'Teamwork',
		text: 'We believe in being able to work with others and communicate',
	},
	{
		title: 'Respect',
		text: 'We believe in treating everyone with respect and dignity',
	},
	{
		title: 'Accountability',
		text: 'We strive for our employees to take ownership of their work and be responsible for their results. ',
	},
	{
		title: 'Responsibility',
		text: 'We are constantly working to ensure that our services are safe and reliable while making sure that our decisions uphold the highest ethical standards.',
	},
];

const Features = () => (
	<div
		className='rd__features section__padding'
		id='features'
	>
		<div className='rd__features-heading'>
			<h1 className='gradient__text'>COMPANY CULTURE</h1>
			<p>
				Our stated values define the culture of DEL RIO CENTER and unite our team as we strive to serve clients and meet the demands of our mission and vision statements. Our
				values create an environment that showcase our everyday actions and interactions which translate to a more positive experience for our clients, their families, and our
				communities.
			</p>
		</div>
		<div className='rd__features-container'>
			{cultureData.map((item, index) => (
				<Feature
					title={item.title}
					text={item.text}
					key={item.title + index}
				/>
			))}
		</div>
	</div>
);

export default Features;

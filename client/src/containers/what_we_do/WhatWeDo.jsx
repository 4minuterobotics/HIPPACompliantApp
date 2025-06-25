import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import Feature from '../../components/feature/Feature';
import './whatWeDo.css';

const services = [
	{
		title: 'Medication Services',
		description: '',
		website_link: '',
	},
	{
		title: 'Behavorial Health Observation/ Stabilization Services',
		description: '',
		website_link: '',
	},
	{
		title: 'Court-orderd Treatment',
		description: '',
		website_link: '',
	},
	{
		title: 'Physical Health Services',
		description: '',
		website_link: '',
	},
	{
		title: 'Rehabilitation Services',
		description: '',
		website_link: '',
	},
	{
		title: 'Case Management Services',
		description: '',
		website_link: '',
	},
	{
		title: 'Health Monitoring, exercise and other programs',
		description: '',
		website_link: '',
	},
	{
		title: 'Transportation for Community Support',
		description: '',
		website_link: '',
	},
	{
		title: 'Assistance with Activities of Daily Living',
		description: '',
		website_link: '',
	},
	{
		title: 'Treatment Planning',
		description: '',
		website_link: '',
	},
	{
		title: 'Individual and Group Counseling',
		description: '',
		website_link: '',
	},
];

function MyVerticallyCenteredModal(props) {
	return (
		<Modal
			{...props}
			size='sm'
			className='my-modal'
			aria-labelledby='contained-modal-title-vcenter'
			centered
		>
			<Modal.Header className='modal-header'>
				<Modal.Title id='contained-modal-title-vcenter'>Our Services</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* <p>
          {props.description}
        </p> */}

				<div className='tech-used'>
					<ul>
						{services.map((service, index) => (
							<li key={index}>{service.title}</li>
						))}
					</ul>
				</div>

				{/* <div className='github-div'>
          <div className='website-link'onClick={() => window.open(props.website_link, "_blank")}>
            <p >Visit Website</p>
          </div>
        </div> */}
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant='light'
					onClick={props.onHide}
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

const WhatWeDo = () => {
	const [modalShow, setModalShow] = useState(false);

	return (
		<>
			<div
				className='rd__whatrd section__margin'
				id='services'
			>
				<div className='rd__whatrd-feature'>
					<Feature
						title='Services'
						text='We are a healthcare institution that provides a menu of treatment to an individual that is experiencing a behavioral health issue that limits the individual’s ability to be independent or causes the individual to require treatment to maintain or enhance independence'
					/>
				</div>
				<div className='rd__whatrd-heading'>
					<h1 className='gradient__text'>Empathy, expertise and a treatment plan built to meet your specific needs</h1>
					<p onClick={() => setModalShow(true)}>Explore our Services</p>
				</div>
				<div className='rd__whatrd-container'>
					<Feature
						title='Addiction Services'
						text='We offer individual and Group Intensive outpatient program for people managing addiction and striving for sobriety.'
					/>
					<Feature
						title='Peer Support'
						text='Peer support focuses on improved daily living, community support, family support and pre-employment training.'
					/>
					<Feature
						title='Behavioral Therapy'
						text='We offer both group and individual therapy. We provide life skills, resources, and tools necessary to succeed outside of our home. Our community offers the care and support each member needs to find success in life.'
					/>
					<Feature
						title='Community Resources'
						text='We also offer housings to fellows who are in need. As well as other community activities to help fellows be productive citizens.'
					/>
				</div>
			</div>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
};

export default WhatWeDo;

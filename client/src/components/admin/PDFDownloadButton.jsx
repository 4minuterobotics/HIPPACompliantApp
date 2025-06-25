import React from 'react';

const PDFDownloadButton = ({ userId }) => {
	const handleDownload = () => {
		window.open(`http://localhost:3000/api/admin/users/${userId}/generate-pdf`, '_blank');
	};

	return (
		<button
			className='btn btn-dark'
			onClick={handleDownload}
		>
			Download PDF
		</button>
	);
};

export default PDFDownloadButton;

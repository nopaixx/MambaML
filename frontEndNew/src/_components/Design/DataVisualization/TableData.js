import React from 'react';

const RenderTableHeader = ({ portDataPreview }) => {
	const { columns } = portDataPreview;
	let header = Object.values(JSON.parse(columns)[0]);
	return header.map((key, index) => {
		return (
			<div key={index} style={{ width: 150, border: '1px solid black' }}>
				{key.toUpperCase()}
			</div>
		);
	});
};

const RenderTableData = ({ portDataPreview }) => {
	const { first100 } = portDataPreview;
	const { columns } = portDataPreview;
	const parsedColumns = JSON.parse(columns)[0];
	const parsedFirst100 = JSON.parse(first100);
	const headers = Object.values(parsedColumns);
	return headers.map((head, index) => {
		return (
			<div key={index} style={{ width: 150, borderRight: '1px solid black' }}>
				{Object.values(parsedFirst100[head]).map((item, index) => {
					return (
						<div
							key={index}
							style={{
								height: 50,
								borderBottom: '1px solid black',
								overflow: 'scroll',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							{item}
						</div>
					);
				})}
			</div>
		);
	});
};

export const TableData = ({ portDataPreview }) => {
	return (
		<React.Fragment>
			<div style={{ display: 'inline-flex' }}>
				<RenderTableHeader portDataPreview={portDataPreview} />
			</div>
			<div style={{ display: 'inline-flex' }}>
				<RenderTableData portDataPreview={portDataPreview} />
			</div>
		</React.Fragment>
	);
};

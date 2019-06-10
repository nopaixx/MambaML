import React from 'react';
import './Input.css';

export const Input = props => {
	return (
		<input
			onChange={props.onChange}
			className="input-box"
			type={props.type}
			name={props.name}
			defaultValue={props.defaultValue}>
			{props.label}
		</input>
	);
};

import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function SwitchLabels({ isChecked, label }) {
	const [checked, setState] = React.useState(false);

	const handleChange = () => {
		isChecked(!checked);
		setState(!checked);
	};
	return (
		<FormGroup row>
			<FormControlLabel
				control={
					<Switch
						checked={checked}
						onChange={handleChange}
						value='checkedB'
						color='primary'
					/>
				}
				label={label}
			/>
		</FormGroup>
	);
}

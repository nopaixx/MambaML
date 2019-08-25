import React from 'react';

import 'brace/mode/python';
import 'brace/theme/monokai';

import AceEditor from 'react-ace';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	editorTitle: {
		fontSize: '20px',
		background: '#272822',
		color: 'white',
		textAlign: 'center',
	},
	editorsRow: {
		display: 'flex',
		justifyContent: 'space-evenly',
		margin: '20px 0 20px 0',
	},
}));

export const TextEditors = ({
	dependencies,
	code,
	onChangeCodeScript,
	onChangeDependencies,
}) => {
	const classes = useStyles();
	return (
		<div className={classes.editorsRow}>
			<div>
				<div className={classes.editorTitle}>Python Script</div>
				<AceEditor
					mode='python'
					theme='monokai'
					width={'751px'}
					height={'250px'}
					value={code}
					onChange={onChangeCodeScript}
					name='UNIQUE_ID_OF_DIV'
					editorProps={{ $blockScrolling: true }}
					showPrintMargin={false}
				/>
			</div>
			<div>
				<div className={classes.editorTitle}>Dependencies</div>
				<AceEditor
					mode='python'
					theme='monokai'
					width={'375px'}
					height={'250px'}
					value={dependencies}
					onChange={onChangeDependencies}
					name='UNIQUE_ID_OF_DIV'
					editorProps={{ $blockScrolling: true }}
				/>
			</div>
		</div>
	);
};

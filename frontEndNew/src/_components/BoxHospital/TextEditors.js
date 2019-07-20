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
}));

export const TextEditors = ({
	dependencies,
	code,
	onChangeCodeScript,
	onChangeDependencies,
	onCickDisplayEditor,
	activeCodeEditor,
}) => {
	const classes = useStyles();
	return (
		<div className={'code-editors-admin'}>
			<div className='col-md-6 editor-column'>
				<Button
					onClick={() => onCickDisplayEditor('Dependencies')}
					id={'Dependencies'}
					variant='outlined'
					color='primary'
					className={classes.button}>
					Dependencies
				</Button>
				{activeCodeEditor['Dependencies'] ? (
					<AceEditor
						mode='python'
						theme='monokai'
						width={'350px'}
						height={'200px'}
						value={dependencies}
						onChange={onChangeDependencies}
						name='UNIQUE_ID_OF_DIV'
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
			<div className='col-md-6 editor-column'>
				<Button
					id={'PythonScript'}
					onClick={() => onCickDisplayEditor('PythonScript')}
					variant='outlined'
					color='primary'
					className={classes.button}>
					Python Script
				</Button>
				{activeCodeEditor['PythonScript'] ? (
					<AceEditor
						mode='python'
						theme='monokai'
						width={'650px'}
						height={'300px'}
						value={code}
						onChange={onChangeCodeScript}
						name='UNIQUE_ID_OF_DIV'
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
		</div>
	);
};

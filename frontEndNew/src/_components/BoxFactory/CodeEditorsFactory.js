import React from 'react';

import AceEditor from 'react-ace';
import Button from '@material-ui/core/Button';

import 'brace/mode/python';
import 'brace/theme/monokai';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	input: {
		display: 'none',
	},
	inputText: {
		marginRight: 10,
	},
}));

export const CodeEditors = ({
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
			<div className='editor-column'>
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
						width={'40vw'}
						height={'300px'}
						className={'codeEditor'}
						value={code}
						onChange={onChangeCodeScript}
						name='UNIQUE_ID_OF_DIV'
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
			<div className='editor-column'>
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
						width={'40vw'}
						height={'300px'}
						className={'codeEditor'}
						value={dependencies}
						onChange={onChangeDependencies}
						name='UNIQUE_ID_OF_DIV'
						editorProps={{ $blockScrolling: true }}
					/>
				) : null}
			</div>
		</div>
	);
};

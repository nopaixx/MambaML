import React from 'react';

import AceEditor from 'react-ace';

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

export const CodeEditors = ({
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
					width={'40vw'}
					height={'300px'}
					className={'codeEditor'}
					value={code}
					onChange={onChangeCodeScript}
					name='UNIQUE_ID_OF_DIV'
					editorProps={{ $blockScrolling: true }}
				/>
			</div>
			<div>
				<div className={classes.editorTitle}>Dependencies</div>
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
			</div>
		</div>
	);
};

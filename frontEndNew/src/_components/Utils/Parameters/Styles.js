import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(1),
	},
	controlPanel: {
		textAlign: 'center',
		padding: 10,
	},
	controlItems: {
		display: 'flex',
		justifyContent: 'space-around',
		padding: 10,
		paddingBottom: 50,
	},
	controlItem: {
		border: '1px solid' + theme.palette.primary.main,
		cursor: 'pointer',
		padding: 10,
		borderRadius: 10,
	},
	gridInputs: {
		display: 'grid',
		gridGap: '10px 10px',
		gridTemplateColumns: 'repeat(4, 1fr)',
		textAlign: 'center',
	},
	selectedItem: {
		padding: 10,
		border: '1px solid' + theme.palette.primary.main,
		backgroundColor: theme.palette.primary.light,
		borderRadius: 10,
		cursor: 'pointer',
	},
	gridItem: {
		padding: 10,
		border: '1px solid' + theme.palette.primary.main,
		borderRadius: 10,
		cursor: 'pointer',
	},
}));

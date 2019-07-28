import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	visualizationItem: {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center',
		border: '1px solid ' + theme.palette.primary.main,
		width: 220,
		alignItems: 'center',
		'&:hover': {
			boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
			cursor: 'pointer',
		},
	},
	scatterGroup: {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, 1fr)',
		gridAutoRows: 'minmax(100px, auto)',
	},
	arrowBack: {
		position: 'absolute',
		left: '4vw',
		top: '7vh',
		fontSize: 36,
		cursor: 'pointer',
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	closeIcon: {
		position: 'absolute',
		right: '4vw',
		top: '7vh',
		fontSize: 36,
		cursor: 'pointer',
		'&:hover': {
			color: theme.palette.primary.main,
		},
	},
	visualizationWrapper: {
		padding: 20,
	},
	tabs: {
		width: '50vw',
		margin: 'auto',
		paddingBottom: 10,
	},
}));

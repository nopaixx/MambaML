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
}));

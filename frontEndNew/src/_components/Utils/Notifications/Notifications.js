import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.main,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
}));
function MySnackbarContentWrapper(props) {
	const classes = useStyles1();
	const { className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={clsx(classes[variant], className)}
			aria-describedby='client-snackbar'
			message={
				<span id='client-snackbar' className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key='close'
					aria-label='close'
					color='inherit'
					onClick={onClose}>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

MySnackbarContentWrapper.propTypes = {
	className: PropTypes.string,
	message: PropTypes.string,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

const withErrorHandling = WrappedComponent => ({ notifications, children }) => {
	const { isOpen, onClose, type, text } = notifications;
	return (
		<WrappedComponent>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={isOpen}
				autoHideDuration={100000}
				onClose={onClose}>
				<MySnackbarContentWrapper
					onClose={onClose}
					variant={type}
					message={text}
				/>
			</Snackbar>

			{children}
		</WrappedComponent>
	);
};

const Notification = withErrorHandling(({ children }) => <div>{children}</div>);

function mapStateToProps(state) {
	const { notifications } = state;
	return {
		notifications,
	};
}

const connectedNotification = connect(mapStateToProps)(Notification);
export { connectedNotification as Notification };

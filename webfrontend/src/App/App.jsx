import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { RegisterPage } from '../Pages/RegisterPage';
import { DesignComponent } from '../_components/Design/DesignComponent';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	render() {
		const { alert } = this.props;
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="designPage">
						{alert.message && (
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						)}
						<Router history={history}>
							<div>
								<PrivateRoute exact path="/" component={HomePage} />
								<Route path="/login" component={LoginPage} />
								<Route path="/register" component={RegisterPage} />
								<Route exact path="/project" component={DesignComponent} />
								<Route path="/home" component={HomePage} />
							</div>
						</Router>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { alert } = state;
	return {
		alert,
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

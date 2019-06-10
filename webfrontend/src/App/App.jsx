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
import { hot } from 'react-hot-loader/root';
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
								<PrivateRoute path="/project/20" component={DesignComponent} />
								<Route path="/login" component={LoginPage} />
								<Route path="/register/2" component={RegisterPage} />
								{/* <Route path="/register" component={RegisterPage} /> */}
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

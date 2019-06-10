import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../Pages/HomePage';
import { LoginPage } from '../Pages/LoginPage';
import { RegisterPage } from '../Pages/RegisterPage';
import { AdminPage } from '../Pages/AdminPage';
import { DesignComponent } from '../_components/Design/DesignComponent';
import Layout from '../_containers/Layout/Layout';

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
			<div>
				<Layout>
					<div className="designPage">
						{alert.message && (
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						)}
						<Router history={history}>
							<div>
								<PrivateRoute exact path="/" component={HomePage} />
								<PrivateRoute path="/project/:id" component={DesignComponent} />
								<PrivateRoute path="/admin" component={AdminPage} />
								<Route path="/login" component={LoginPage} />
								<Route path="/register" component={RegisterPage} />
							</div>
						</Router>
					</div>
				</Layout>
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

import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../Pages/HomePage';
import { Dashboard } from '../Pages/Dashboard';
import { BasicLayout } from '../Pages/Dashboard/felxibleDashboard';
import { HomePage2 } from '../Pages/HomePage/HomePage2';
import { LoginPage } from '../Pages/LoginPage/LoginPage';
import { LandingPage1 } from '../Pages/LandingPage/LandingPage1';
import LandingPage from '../Pages/LandingPage/LandingPage';
import { PricingPage } from '../Pages/PricingPage';
import { RegisterPage } from '../Pages/RegisterPage';
import { AdminPage } from '../Pages/AdminPage';
import { DesignComponent } from '../_components/Design/DesignComponent';
import Layout from '../_containers/Layout/Layout';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			dispatch(alertActions.clear());
		});
	}

	render() {
		const { alert } = this.props;
		return (
			<div>
				<Layout history={history}>
					<div className='designPage'>
						{alert.message && (
							<div className={`alert ${alert.type}`}>{alert.message}</div>
						)}
						<Router history={history}>
							<div>
								<PrivateRoute exact path='/landing' component={LandingPage1} />
								<PrivateRoute exact path='/projects' component={HomePage2} />
								<PrivateRoute path='/project/:id' component={DesignComponent} />
								<PrivateRoute path='/admin' component={AdminPage} />
								<PrivateRoute path='/dashboard' component={Dashboard} />
								<PrivateRoute path='/dashboard2' component={BasicLayout} />
								<Route exact path='/' component={LandingPage} />
								<Route path='/login' component={LoginPage} />
								<Route path='/register' component={RegisterPage} />
								<Route path='/pricing' component={PricingPage} />
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

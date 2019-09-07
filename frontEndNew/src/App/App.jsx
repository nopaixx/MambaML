import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { notificationsActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { Dashboard } from '../Pages/Dashboard';
import BasicLayout from '../Pages/Dashboard/felxibleDashboard';
import { ProjectsPage, DatasetsPage } from '../Pages/HomePage';
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
			dispatch(notificationsActions.clear());
		});
	}

	render() {
		const { notifications, dispatch } = this.props;
		return (
			<Router history={history}>
				<Layout
					history={history}
					notifications={notifications}
					dispatch={dispatch}>
					<PrivateRoute exact path='/landing' component={LandingPage1} />
					<PrivateRoute exact path='/projects' component={ProjectsPage} />
					<PrivateRoute exact path='/datasets' component={DatasetsPage} />
					<PrivateRoute exact path='/model/:id' component={DesignComponent} />
					<PrivateRoute path='/admin' component={AdminPage} />
					<PrivateRoute path='/dashboard' component={Dashboard} />
					<PrivateRoute path='/dashboard2' component={BasicLayout} />
					<Route exact path='/' component={LandingPage} />
					<Route path='/login' component={LoginPage} />
					<Route path='/register' component={RegisterPage} />
					<Route path='/pricing' component={PricingPage} />
				</Layout>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	const { notifications } = state;
	return {
		notifications,
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

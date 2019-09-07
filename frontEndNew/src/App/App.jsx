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
import { Notification } from '../_components/Utils/Notifications';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			dispatch(notificationsActions.clear());
		});
	}

	render() {
		const { notification } = this.props;
		const url = history.listen(location => location);
		console.log(url);
		return (
			<div>
				<Layout history={history}>
					<div className='designPage'>
						<Router history={history}>
							<Notification notification={notification}>
								<PrivateRoute exact path='/landing' component={LandingPage1} />
								<PrivateRoute exact path='/projects' component={ProjectsPage} />
								<PrivateRoute exact path='/datasets' component={DatasetsPage} />
								<PrivateRoute path='/project/:id' component={DesignComponent} />
								<PrivateRoute path='/admin' component={AdminPage} />
								<PrivateRoute path='/dashboard' component={Dashboard} />
								<PrivateRoute path='/dashboard2' component={BasicLayout} />
								<Route exact path='/' component={LandingPage} />
								<Route path='/login' component={LoginPage} />
								<Route path='/register' component={RegisterPage} />
								<Route path='/pricing' component={PricingPage} />
							</Notification>
						</Router>
					</div>
				</Layout>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { notification } = state;
	return {
		notification,
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

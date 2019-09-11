import React, { Component } from 'react';
import { Notification } from '../../_components/Utils/Notifications';

import './Layout.css';
import { Navbar } from '../../_components/Navigation/Navbar/Navbar';
import { ProjectNavbar } from '../../_components/Navigation/ProjectNavbar/ProjectNavbar';

class Layout extends Component {
	render() {
		const { history, dispatch } = this.props;
		let url = history.location.pathname;

		if (url === '/login') {
			return (
				<React.Fragment>
					<main>{this.props.children}</main>
				</React.Fragment>
			);
		}

		return (
			<>
				{url === '/projects' || url === '/dashboard' || url === '/datasets' ? (
					<ProjectNavbar url={url} />
				) : (
					<Navbar history={history} dispatch={dispatch} />
				)}
				<Notification
					notifications={this.props.notifications}
					dispatch={this.props.dispatch}
				/>

				{this.props.children}
			</>
		);
	}
}

export default Layout;

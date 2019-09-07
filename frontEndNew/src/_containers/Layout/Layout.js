import React, { Component } from 'react';

import './Layout.css';
import Navbar from '../../_components/Navigation/Navbar/Navbar';
import { ProjectNavbar } from '../../_components/Navigation/ProjectNavbar/ProjectNavbar';
class Layout extends Component {
	render() {
		const { history } = this.props;
		let url = history.location.pathname;
		if (url === '/login') {
			return (
				<React.Fragment>
					<main>{this.props.children}</main>
				</React.Fragment>
			);
		}
		return (
			<React.Fragment>
				{url === '/projects' || url === '/dashboard' || url === '/datasets' ? (
					<ProjectNavbar url={url} />
				) : (
					<Navbar history={history} />
				)}
				<main>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;

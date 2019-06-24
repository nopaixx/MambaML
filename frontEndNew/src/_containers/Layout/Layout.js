import React, { Component } from 'react';

import './Layout.css';
import Navbar from '../../_components/Navigation/Navbar/Navbar';

class Layout extends Component {
	render() {
		const { history } = this.props;
		return (
			<React.Fragment>
				<Navbar history={history} />
				<main className={''}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;

import React from 'react';
import './NavigationItems.css';

import { Router, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
	<ul className={'NavigationItems'}>
		<Link to='/'>Home</Link>
		<NavigationItem link='/' active>
			Home
		</NavigationItem>
		<NavigationItem link='/login'>Log out</NavigationItem>
	</ul>
);
export default connect(navigationItems);
// const connectedApp = connect(navigationItems);
// export { connectedApp as navigationItems };

import React from 'react';

import './Navbar.css';
import MambaLogo from '../../../logo_peque.png';
import NavigationItems from '../NavigationItems/NavigationItems';

const navbar = props => (
	<header className={'Navbar'}>
		<div className={'Logo'}>
			<img src={MambaLogo} alt={'logo'} />
		</div>

		<nav className={''}>
			<NavigationItems />
		</nav>
	</header>
);

export default navbar;

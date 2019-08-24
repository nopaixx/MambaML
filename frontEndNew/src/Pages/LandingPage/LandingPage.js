import React, { Component } from 'react';

import NavBar from './containers/NavBar.js';
import SectionHero from './containers/SectionHero';
import SectionImages from './containers/SectionImages';
import SectionCompanyInfo from './containers/SectionCompanyInfo';
import SectionAwards from './containers/SectionAwards';
import SectionBuisnessPlans from './containers/SectionBuisnessPlans';
import Footer from './containers/Footer';

class LandingPage extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<SectionHero />
				<SectionImages />
				<SectionCompanyInfo />
				<SectionAwards />
				<SectionBuisnessPlans />
				<Footer />
			</div>
		);
	}
}
export default LandingPage;

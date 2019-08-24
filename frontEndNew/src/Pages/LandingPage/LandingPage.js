import React, { Component } from 'react';

import NavBar from './Components/NavBar.js';
import SectionHero from './Components/SectionHero';
import SectionImages from './Components/SectionImages';
import SectionCompanyInfo from './Components/SectionCompanyInfo';
import SectionAwards from './Components/SectionAwards';
import SectionBuisnessPlans from './Components/SectionBuisnessPlans';
import Footer from './Components/Footer';

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

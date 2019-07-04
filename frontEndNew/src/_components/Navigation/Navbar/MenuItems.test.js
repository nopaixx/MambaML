import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NormalNavbar from './Navbar';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MenuItems } from './MenuItems';

configure({ adapter: new Adapter() });

describe('<NormalNavbar />', () => {
	it('should render Two NavigationItems and one Link', () => {
		const wrapper = shallow(<NormalNavbar />);
		expect(wrapper.find(AppBar)).toHaveLength(1);
		expect(wrapper.find(Toolbar)).toHaveLength(1);
		expect(wrapper.find(MenuItems)).toHaveLength(1);
	});
});

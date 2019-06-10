import * as React from 'react';
import { SidebarItem } from './SidebarItem';

export class SidebarClassifier extends React.Component {
	state = {
		activeBoxesList: [],
		PythonModel: false,
	};
	componentDidMount() {
		this.filterBoxesWithoutPython();
	}

	filterBoxesWithoutPython = () => {
		const { sidebarItemList } = this.props;
		const activeBoxesList = [];
		sidebarItemList.forEach(box => {
			if (box.type.indexOf('Python') === -1) {
				activeBoxesList.push(box);
			}
		});
		this.setState({ activeBoxesList, PythonModel: false });
	};

	onClickBox = e => {
		const { sidebarItemList } = this.props;
		const boxType = e.target.id;
		if (boxType.includes('Modules')) {
			const PythonModules = sidebarItemList.filter(box =>
				box.type.includes('Python')
			);
			this.setState({ activeBoxesList: PythonModules, PythonModel: true });
		}
	};

	onClickBack = () => {
		this.filterBoxesWithoutPython();
	};

	render() {
		const { activeBoxesList, PythonModel } = this.state;
		return (
			<React.Fragment>
				<div onClick={this.onClickBack}>Back</div>
				{PythonModel ? <SidebarItem type={'Python Module'} /> : ''}
				{activeBoxesList.map((item, key) => (
					<SidebarItem
						key={key}
						onClick={this.onClickBox}
						type={item.type.split('-')[1] || item.type}
						ports={item.ports}
						properties={item.properties || {}}
					/>
				))}
			</React.Fragment>
		);
	}
}

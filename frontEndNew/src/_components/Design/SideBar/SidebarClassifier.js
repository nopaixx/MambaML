import * as React from 'react';
import { SidebarItem } from './SidebarItem';
import TreeMenu from '../TreeMenu/TreeMenu';

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
		this.setState({ activeBoxesList: sidebarItemList });
	};

	createTree2 = itemToOpen => {};

	onClickBox = e => {
		const { sidebarItemList } = this.props;
		const { previusLevel } = this.state;
		const boxType = e.target.id;
		let nextLevel;
		if (!previusLevel) {
			nextLevel = sidebarItemList[boxType];
		} else {
			nextLevel = previusLevel[boxType];
		}
		this.setState({ activeBoxesList: Object.keys(nextLevel) });
		this.setState({ previusLevel: sidebarItemList[boxType] });
		// if (boxType.includes('Modules')) {
		// 	const PythonModules = sidebarItemList.filter(box =>
		// 		box.type.includes('Python')
		// 	);
		// 	this.setState({ activeBoxesList: PythonModules, PythonModel: true });
		// }
	};

	onClickBack = () => {
		const { sidebarItemList } = this.props;
		const { previusLevel } = this.state;
		this.setState({ activeBoxesList: Object.keys(previusLevel) });
		//this.filterBoxesWithoutPython();
	};

	render() {
		const { activeBoxesList } = this.state;
		return (
			<React.Fragment>
				<SidebarItem
					onClick={this.onClickBox}
					type={Object.keys(activeBoxesList)}
					ports={'item.ports'}
					properties={'item.properties' || {}}
					data={activeBoxesList}
				/>
				{/* {activeBoxesList.map((item, key) => (
					<React.Fragment>

						<SidebarItem
							key={key}
							onClick={this.onClickBox}
							type={Object.keys(activeBoxesList)}
							ports={item.ports}
							properties={item.properties || {}}
						/>
					</React.Fragment>
				))} */}
			</React.Fragment>
		);
	}
}

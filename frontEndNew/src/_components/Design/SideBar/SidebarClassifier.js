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
		console.log('sidebarItemList', sidebarItemList);
		const activeBoxesList = [];
		this.setState({ activeBoxesList: sidebarItemList });
	};

	createTree2 = itemToOpen => {
		console.log();
	};

	onClickBox = e => {
		const { sidebarItemList } = this.props;
		const { previusLevel } = this.state;
		const boxType = e.target.id;
		console.log(boxType);
		let nextLevel;
		if (!previusLevel) {
			nextLevel = sidebarItemList[boxType];
		} else {
			nextLevel = previusLevel[boxType];
		}
		console.log('nextLevel', nextLevel);
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
		console.log('previous level', previusLevel);
		this.setState({ activeBoxesList: Object.keys(previusLevel) });
		//this.filterBoxesWithoutPython();
	};

	render() {
		const { activeBoxesList } = this.state;
		return (
			<React.Fragment>
				{console.log('SidebarClassifier', activeBoxesList)}
				<SidebarItem
					onClick={this.onClickBox}
					type={Object.keys(activeBoxesList)}
					ports={'item.ports'}
					properties={'item.properties' || {}}
					data={activeBoxesList}
				/>
				{/* {activeBoxesList.map((item, key) => (
					<React.Fragment>
						{console.log('item', item)}

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

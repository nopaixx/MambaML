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
		this.setState({ activeBoxesList: Object.keys(sidebarItemList) });
		//console.log('sidebarItemList', sidebarItemList);
		// sidebarItemList.forEach(box => {
		// 	if (box.type && box.type.indexOf('Python') === -1) {
		// 		activeBoxesList.push(box);
		// 	}
		// });
		// const mainKeys = Object.keys(sidebarItemList);
		// console.log('keys', mainKeys);
		// for (let key in sidebarItemList) {
		// 	console.log('key', sidebarItemList[key], key);
		// }
		//this.createTree(sidebarItemList);

		// this.setState({
		// 	activeBoxesList: Object.keys(sidebarItemList),
		// 	PythonModel: false,
		// });
	};

	createTree = payload => {
		const name = payload.id;
		delete payload.id;
		console.log('payload', payload);
		Object.keys(payload).forEach(item => {
			const nextLevel = payload[item];

			console.log('nextLevel', nextLevel);
			console.log('item', item);
			console.log(Object.keys(nextLevel).length > 1);
		});
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
		const { activeBoxesList, PythonModel } = this.state;
		return (
			<React.Fragment>
				<div onClick={this.onClickBack}>Back</div>
				{PythonModel ? <SidebarItem type={'Python Module'} /> : ''}
				{activeBoxesList.map((item, key) => (
					<React.Fragment>
						{console.log('item', item)}
						<SidebarItem
							key={key}
							onClick={this.onClickBox}
							type={item}
							ports={item.ports}
							properties={item.properties || {}}
						/>
					</React.Fragment>
				))}
			</React.Fragment>
		);
	}
}

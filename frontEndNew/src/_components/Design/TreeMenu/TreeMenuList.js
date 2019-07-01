import React from 'react';
import { debounce } from 'lodash';

import walk from './walk';
import { defaultChildren } from './renderPropsList';
import KeyDown from './KeyDown';

// const defaultOnClick = props => console.log('props', props); // eslint-disable-line no-console

class TreeMenu extends React.Component {
	static defaultProps = {
		data: {},
		// onClickItem: defaultOnClick,
		debounceTime: 125,
		children: defaultChildren,
		hasSearch: true,
	};

	state = {
		openNodes: this.props.initialOpenNodes || [],
		searchTerm: '',
		activeKey: this.props.initialActiveKey || '',
		focusKey: this.props.initialFocusKey || '',
	};

	search = value => {
		const { debounceTime } = this.props;
		const search = debounce(
			searchTerm => this.setState({ searchTerm }),
			debounceTime
		);
		search(value);
	};

	toggleNode = node => {
		if (!this.props.openNodes) {
			const { openNodes } = this.state;
			const newOpenNodes = openNodes.includes(node)
				? openNodes.filter(openNode => openNode !== node)
				: [...openNodes, node];
			this.setState({ openNodes: newOpenNodes });
		}
	};

	generateItems = () => {
		const { data, onClickItem, locale, matchSearch } = this.props;
		const { searchTerm } = this.state;
		const openNodes = this.props.openNodes || this.state.openNodes;
		const activeKey = this.props.activeKey || this.state.activeKey;
		const focusKey = this.props.focusKey || this.state.focusKey;

		const items = data
			? walk({ data, openNodes, searchTerm, locale, matchSearch })
			: [];

		return items.map(item => {
			const focused = item.key === focusKey;
			const active = item.key === activeKey;
			const onClick = () => {
				this.props.selectedOption(item);
				const newActiveKey = this.props.activeKey || item.key;
				this.setState({ activeKey: newActiveKey, focusKey: newActiveKey });
				onClickItem && onClickItem(item);
			};

			const toggleNode = item.hasNodes
				? () => this.toggleNode(item.key)
				: undefined;
			return { ...item, focused, active, onClick, toggleNode };
		});
	};

	render() {
		const { children, hasSearch, onClickItem } = this.props;
		const { focusKey, activeKey, openNodes } = this.state;
		const items = this.generateItems();
		const renderedChildren = children || defaultChildren;
		const focusIndex = items.findIndex(
			item => item.key === (focusKey || activeKey)
		);

		const getFocusKey = item => {
			const keyArray = item.key.split('/');

			return keyArray.length > 1
				? keyArray.slice(0, keyArray.length - 1).join('/')
				: item.key;
		};

		const keyDownProps = {
			up: () => {
				this.setState(({ focusKey }) => ({
					focusKey: focusIndex > 0 ? items[focusIndex - 1].key : focusKey,
				}));
			},
			down: () => {
				this.setState(({ focusKey }) => ({
					focusKey:
						focusIndex < items.length - 1
							? items[focusIndex + 1].key
							: focusKey,
				}));
			},
			left: () => {
				this.setState(({ openNodes, ...rest }) => {
					const item = items[focusIndex];
					const newOpenNodes = openNodes.filter(node => node !== item.key);

					return item.isOpen
						? { ...rest, openNodes: newOpenNodes, focusKey: item.key }
						: { ...rest, focusKey: getFocusKey(item) };
				});
			},
			right: () => {
				const { hasNodes, key } = items[focusIndex];
				if (hasNodes)
					this.setState(({ openNodes }) => ({
						openNodes: [...openNodes, key],
					}));
			},
			enter: () => {
				this.setState(({ focusKey }) => ({ activeKey: focusKey }));
				onClickItem && onClickItem(items[focusIndex]);
			},
		};

		return (
			<KeyDown {...keyDownProps}>
				{renderedChildren(
					hasSearch ? { search: this.search, items } : { items }
				)}
			</KeyDown>
		);
	}
}

export default TreeMenu;

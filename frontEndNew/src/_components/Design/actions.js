import { v4 } from 'uuid';

export const onDragNode = (event, data, id, chart) => {
	const nodechart = chart.nodes[id];

	if (nodechart) {
		chart.nodes[id] = {
			...nodechart,
			position: {
				x: data.x,
				y: data.y,
			},
		};
	}

	return chart;
};

export const onDragCanvas = (event, data) => chart => {
	chart.offset.x = data.x;
	chart.offset.y = data.y;
	return chart;
};

export const onLinkStart = ({ linkId, fromNodeId, fromPortId }) => chart => {
	chart.links[linkId] = {
		id: linkId,
		from: {
			nodeId: fromNodeId,
			portId: fromPortId,
		},
		to: {},
	};
	return chart;
};

export const onLinkMove = ({ linkId, toPosition }) => chart => {
	const link = chart.links[linkId];
	link.to.position = toPosition;
	chart.links[linkId] = { ...link };
	return chart;
};

export const onLinkComplete = ({
	linkId,
	fromNodeId,
	fromPortId,
	toNodeId,
	toPortId,
}) => chart => {
	if ([fromNodeId, fromPortId].join() !== [toNodeId, toPortId].join()) {
		chart.links[linkId].to = {
			nodeId: toNodeId,
			portId: toPortId,
		};
	}
	return chart;
};

export const onLinkCancel = ({ linkId }) => chart => {
	delete chart.links[linkId];
	return chart;
};

export const onLinkMouseEnter = ({ linkId }) => chart => {
	// Set the link to hover
	const link = chart.links[linkId];
	// Set the connected ports to hover
	if (link.to.nodeId && link.to.portId) {
		if (chart.hovered.type !== 'link' || chart.hovered.id !== linkId) {
			chart.hovered = {
				type: 'link',
				id: linkId,
			};
		}
	}
	return chart;
};

export const onLinkMouseLeave = ({ linkId }) => chart => {
	const link = chart.links[linkId];
	// Set the connected ports to hover
	if (link.to.nodeId && link.to.portId) {
		chart.hovered = {};
	}
	return chart;
};

export const onLinkClick = ({ linkId }) => chart => {
	if (chart.selected.id !== linkId || chart.selected.type !== 'link') {
		chart.selected = {
			type: 'link',
			id: linkId,
		};
	}
	return chart;
};

export const onCanvasClick = () => chart => {
	if (chart.selected.id) {
		chart.selected = {};
	}
	return chart;
};

export const onDeleteKey = () => chart => {
	if (chart.selected.type === 'node' && chart.selected.id) {
		const node = chart.nodes[chart.selected.id];
		// Delete the connected links
		Object.keys(chart.links).forEach(linkId => {
			const link = chart.links[linkId];
			if (link.from.nodeId === node.id || link.to.nodeId === node.id) {
				delete chart.links[link.id];
			}
		});
		// Delete the node
		delete chart.nodes[chart.selected.id];
	} else if (chart.selected.type === 'link' && chart.selected.id) {
		delete chart.links[chart.selected.id];
	}
	if (chart.selected) {
		chart.selected = {};
	}
	return chart;
};

export const onNodeClick = ({ nodeId }) => chart => {
	if (chart.selected.id !== nodeId || chart.selected.type !== 'node') {
		chart.selected = {
			type: 'node',
			id: nodeId,
		};
	}
	return chart;
};

export const onNodeSizeChange = ({ nodeId, size }) => chart => {
	chart.nodes[nodeId] = {
		...chart.nodes[nodeId],
		size,
	};
};

export const onPortPositionChange = (nodeToUpdate, port, position, chart) => {
	const node = chart.nodes[nodeToUpdate.id];
	node.ports[port.id].position = {
		x: position.x,
		y: position.y,
	};

	chart.nodes[nodeToUpdate.id] = { ...node };

	return chart;
};

export const onCanvasDrop = ({ data, position, chart }) => {
	const id = v4();
	chart.nodes[id] = {
		id,
		position,
		type: data.type,
		ports: data.ports,
		properties: data.properties,
	};
	return chart;
};

export const sidebarItemList = [
	{
		type: 'Data',
		ports: {
			port1: {
				id: 'port1',
				type: 'bottom',
				properties: {
					custom: 'property',
				},
			},
		},
		properties: {
			payload: 'dataset1',
			custom: 'property',
		},
	},
	{
		type: 'Model',
		ports: {
			port1: {
				id: 'port1',
				type: 'bottom',
				properties: {
					custom: 'property',
				},
			},
		},
	},
	{
		type: 'Endpoint',
		ports: {
			port1: {
				id: 'port1',
				type: 'left',
				properties: {
					custom: 'property',
				},
			},
			port2: {
				id: 'port2',
				type: 'right',
				properties: {
					custom: 'property',
				},
			},
		},
	},
];

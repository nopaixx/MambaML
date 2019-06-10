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
		type: 'Python Module-Sort',
		ports: {
			port1: {
				id: 'port1',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port2: {
				id: 'port2',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port3: {
				id: 'port3',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port4: {
				id: 'port4',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port5: {
				id: 'port5',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
			port6: {
				id: 'port6',
				type: 'output',
				properties: {
					value: 'yes',
				},
			},
		},
		properties: {
			payload: {
				code:
					'def FUNCTION_ID_1(input1=None, input2=None, input3=None, input4=None, input5=None):\n\tout1=None\n\tout1=None\n\tout3=None\n\tout4=None\n\tout2=None\n\tval = 5*5\n\tout1 = val\n\tout2 = val*5\n\tout3 = out2*5\n\treturn val, out1, out2, out3',
			},
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
		type: 'Python Module-Python Script',
		properties: {
			payload: {
				code:
					'def FUNCTION_ID_1(input1=None, input2=None, input3=None, input4=None, input5=None):\n\r' +
					'\tout1=None\n\r' +
					'\tout1=None\n\r' +
					'\tout3=None\n\r' +
					'\tout4=None\n\r' +
					'\tout2=None\n\r' +
					'\tval = 5*5\n\r' +
					'\tout1 = val\n\r' +
					'\tout2 = val*5\n\r' +
					'\tout3 = out2*5\n\r' +
					'\treturn val, out1, out2, out3\n\r',
				nimput: 5,
				nouts: 4,
			},
		},
		ports: {
			port1: {
				id: 'port1',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port2: {
				id: 'port2',
				type: 'input',
				properties: {
					value: 'no',
				},
			},
			port3: {
				id: 'port3',
				type: 'input',
				properties: {
					value: 'no',
				},
			},
			port4: {
				id: 'port4',
				type: 'input',
				properties: {
					value: 'no',
				},
			},
			port5: {
				id: 'port5',
				type: 'input',
				properties: {
					value: 'yes',
				},
			},
			port6: {
				id: 'port6',
				type: 'output',
				properties: {
					value: 'no',
				},
			},
			port7: {
				id: 'port7',
				type: 'output',
				properties: {
					value: 'no',
				},
			},
			port8: {
				id: 'port8',
				type: 'output',
				properties: {
					value: 'no',
				},
			},
			port9: {
				id: 'port9',
				type: 'output',
				properties: {
					value: 'no',
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

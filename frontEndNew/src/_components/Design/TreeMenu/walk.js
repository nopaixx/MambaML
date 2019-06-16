import { isEmpty } from 'lodash';
import memoize from 'fast-memoize';

const validateData = data => !!data && !isEmpty(data);
const getValidatedData = data => (validateData(data) ? data : []);

const walk = ({ data, ...props }) => {
	const validatedData = getValidatedData(data);

	const propsWithDefaultValues = { parent: '', level: 0, ...props };
	const handleArray = dataAsArray =>
		dataAsArray.reduce((all, node, index) => {
			const branchProps = {
				node,
				index,
				nodeName: node.key,
				...propsWithDefaultValues,
			};
			const branch = generateBranch(branchProps);
			return [...all, ...branch];
		}, []);

	const handleObject = dataAsObject =>
		Object.entries(dataAsObject)
			.sort((a, b) => a[1].index - b[1].index) // sorted by index
			.reduce((all, [nodeName, node]) => {
				const branchProps = { node, nodeName, ...propsWithDefaultValues };
				const branch = generateBranch(branchProps);
				return [...all, ...branch];
			}, []);

	return Array.isArray(validatedData)
		? handleArray(validatedData)
		: handleObject(validatedData);
};

const defaultMatchSearch = ({ label, searchTerm }) => {
	const processString = text => text.trim().toLowerCase();
	return processString(label).includes(processString(searchTerm));
};

const defaultLocale = ({ label }) => label;

const generateBranch = ({
	node,
	nodeName,
	matchSearch = defaultMatchSearch,
	locale = defaultLocale,
	...props
}) => {
	const { parent, level, openNodes, searchTerm } = props;

	const { nodes, label: rawLabel = 'unknown', ...nodeProps } = node;
	const key = [parent, nodeName].filter(x => x).join('/');
	const hasNodes = validateData(nodes);
	const isOpen = hasNodes && (openNodes.includes(key) || !!searchTerm);

	const label = locale({ label: rawLabel, ...nodeProps });
	const isVisible =
		!searchTerm || matchSearch({ label, searchTerm, ...nodeProps });
	const currentItem = { ...props, ...nodeProps, label, hasNodes, isOpen, key };

	const data = getValidatedData(nodes);
	const nextLevelItems = isOpen
		? walk({
				data,
				locale,
				matchSearch,
				...props,
				parent: key,
				level: level + 1,
		  })
		: [];

	return isVisible ? [currentItem, ...nextLevelItems] : nextLevelItems;
};

export default memoize(walk);

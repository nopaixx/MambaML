// // @flow
// import React from 'react';
// // import type { Element as ReactElement } from 'react';

// // React.addons.cloneWithProps look-alike that merges style & className.
// module.exports = function cloneElement(element, props) {
// 	if (props.style && element.props.style) {
// 		props.style = { ...element.props.style, ...props.style };
// 	}
// 	if (props.className && element.props.className) {
// 		props.className = `${element.props.className} ${props.className}`;
// 	}
// 	return React.cloneElement(element, props);

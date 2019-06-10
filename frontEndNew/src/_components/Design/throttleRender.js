import { throttle } from 'lodash';
import * as React from 'react';

/** A little HOC to throttle component renders */
export const throttleRender = (wait, options) => {
	return ComponentToThrottle => {
		return class Throttle extends React.Component {
			throttledSetState;
			constructor(props, context) {
				super(props, context);
				this.state = {};
				this.throttledSetState = throttle(
					nextState => this.setState(nextState),
					wait,
					options
				);
			}
			shouldComponentUpdate(nextProps, nextState) {
				return this.state !== nextState;
			}
			componentWillMount() {
				this.throttledSetState({ props: this.props });
			}
			componentWillReceiveProps(nextProps) {
				this.throttledSetState({ props: nextProps });
			}
			componentWillUnmount() {
				this.throttledSetState.cancel();
			}
			render() {
				return <ComponentToThrottle {...this.state.props} />;
			}
		};
	};
};

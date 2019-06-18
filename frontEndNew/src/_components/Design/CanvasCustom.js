import styled from 'styled-components';

const CanvasOuterCustom = styled.div`
	position: relative;
	background-size: 10px 10px;
	background-color:  #d38c8c};
	background-image: linear-gradient(
			90deg,
			hsla(0, 0%, 100%, 0.1) 1px,
			transparent 0
		),
		linear-gradient(180deg, hsla(0, 0%, 100%, 0.1) 1px, transparent 0);
	width: 100%;
	height: 100%;
	overflow: hidden;
	cursor: not-allowed;
`;

export const CanvasCustom = CanvasOuterCustom;

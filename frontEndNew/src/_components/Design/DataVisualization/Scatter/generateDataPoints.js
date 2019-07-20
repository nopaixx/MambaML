export const generateDataPoints = (xData, yData) => {
	let dataPoints = [];
	let xMax = 0;
	let yMax = 0;
	let xMin = Infinity;
	let yMin = Infinity;
	for (let i = 0; i < xData.length; i++) {
		if (xData[i] !== null) {
			if (xData[i] > xMax) xMax = xData[i];
			if (xData[i] < xMin) xMin = xData[i];
			if (yData[i] > yMax) yMax = yData[i];
			if (yData[i] < yMin) yMin = yData[i];
		}
		dataPoints.push([xData[i], yData[i]]);
	}
	return { dataPoints, xMax, yMax, xMin, yMin };
};

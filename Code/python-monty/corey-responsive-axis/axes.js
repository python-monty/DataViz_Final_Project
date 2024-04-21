import { xAxis } from './xAxis';
import { yAxis } from './yAxis';
import { xAxisLabel } from './xAxisLabel';
import { yAxisLabel } from './yAxisLabel';

export const axes = (
  svg,
  {
    height,
    marginBottom,
    xScale,
    marginLeft,
    yScale,
    xAxisLabelText,
    width,
    xAxisLabelOffset,
    yAxisLabelText,
    yAxisLabelOffset,
  },
) => {
  // Axes
  xAxis(svg, { height, marginBottom, xScale });
  yAxis(svg, { marginLeft, yScale });

  // Axis Labels
  xAxisLabel(svg, {
    xAxisLabelText,
    width,
    height,
    marginBottom,
    xAxisLabelOffset,
  });
  yAxisLabel(svg, {
    yAxisLabelText,
    yAxisLabelOffset,
    height,
  });
};

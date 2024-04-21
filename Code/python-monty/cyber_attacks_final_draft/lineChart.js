import {
  scaleLinear,
  scaleTime,
  scaleOrdinal,
  axisLeft,
  extent,
  line,
  flatGroup,
} from 'd3';
import {
  xAxis,
  yAxis,
  xAxisLabel,
  yAxisLabel,
} from '@python-monty/corey-responsive-axis';
import { axes } from './axes';
import { colorLegend } from './colorLegend';

export const lineChart = (
  svg,
  {
    // filteredLineData,
    yearlyData,
    xValue,
    xAxisLabel,
    yAxisLabel,
    yValue,
    lineValue,
    yAxisLabelText,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    width,
    height,
    innerRectFill,
    colorLegendX,
    colorLegendY,
    colorLegendLabel,
    setClickValue,
    clickedValue,
    yAxisLabelOffset,
    xAxisLabelOffset,
    setHoveredValue,
    hoveredValue,
  },
) => {
  const xScale = scaleTime(extent(yearlyData, xValue), [
    marginLeft,
    width - marginRight,
  ]);

  const yScale = scaleLinear(extent(yearlyData, yValue), [
    height - marginBottom,
    marginTop,
  ]);

  const altColorScale = scaleOrdinal()
    .domain(yearlyData.map(lineValue))
    .range([
      '#69045f',
      '#ec6f66',
      '#1101f9',
      '#68e5bf',
      '#e9a90b',
      '#a18d45',
      '#c2a4be',
      '#b7aa1d',
      '#346c17',
      '#ab468b',
      '#0fc02b',
      '#f8422d',
      '#d42ce1',
      '#6a62a6',
      '#006f84',
      '#37135d',
      '#f7f434',
      '#cdf2e7',
      '#1ad68c',
      '#2a315f',
    ]);

  svg.call(axes, {
    xScale,
    yScale,
    xAxisLabel,
    yAxisLabel,
    yAxisLabelOffset,
    xAxisLabelOffset,
  });

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  svg
    .selectAll('rect')
    .data([null])
    .join('rect')
    .attr('x', marginLeft)
    .attr('y', marginTop)
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('fill', innerRectFill);

  const lineGenerator = line(
    (d) => xScale(xValue(d)),
    (d) => yScale(yValue(d)),
  ).defined(yValue);

  const dataGrouped = flatGroup(yearlyData, (d) => {
    // return d.industryCode;
    return d.industryName;
  });

  // const legendWidth = 100;
  // const legendHeight = 200;
  const columnWidth = 178;
  const columnPadding = 55;
  const itemHeight = 10;
  const itemPadding = 3;
  const itemsPerColumn = Math.ceil(dataGrouped.length / 6);

  svg.call(colorLegend, {
    altColorScale,
    colorLegendLabel,
    colorLegendX,
    colorLegendY,
    setClickValue,
    clickedValue,
    itemsPerColumn,
    columnWidth,
    columnPadding,
    itemHeight,
    itemPadding,
    setHoveredValue,
    hoveredValue,
  });

  svg
    .selectAll('path.mark')
    .data(dataGrouped)
    .join('path')
    .attr('class', 'mark')
    .attr('fill', 'none')
    .attr('stroke', (d) => {
      return altColorScale(d[0]);
    })
    .style('stroke-width', 2)
    .attr('opacity', (d) =>
      d[0] === hoveredValue ? 1 : 0.2,
    )
    .attr('d', (d) => lineGenerator(d[1]));
};

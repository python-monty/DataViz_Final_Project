import { axisBottom } from 'd3';

export const xAxis = (
  svg,
  { height, marginBottom, xScale, tickDensity = 50 },
) => {
  // CALCULATE THE DENSITY OF TICKS ON X AXIS BY CURRENT INNER RECT WIDTH

  const [min, max] = xScale.range();
  const innerWidth = max - min;
  const ticks = innerWidth / tickDensity;

  svg
    .selectAll('g.x-axis')
    .data([null])
    .join('g')
    .attr('class', 'x-axis')
    .attr(
      'transform',
      `translate(0,${height - marginBottom})`,
    )
    .call(axisBottom(xScale).ticks(ticks));
};

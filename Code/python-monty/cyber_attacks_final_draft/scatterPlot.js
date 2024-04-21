import {
  // extent,
  // scaleLinear,
  scaleOrdinal,
  scalePoint,
  // brush,
} from 'd3';
import { axes } from './axes';
import { scatterColorLegend } from './scatterColorLegend';

export const scatterPlot = (
  selection,
  {
    filteredScatterData,
    width,
    height,
    xValue,
    yValue,
    index,
    colorValue,
    margin,
    xAxisLabel,
    yAxisLabel,
    scatterColorLegendLabel,
    scatterColorLegendX,
    scatterColorLegendY,
    state,
    setState,
    scatterHoveredValue,
    setScatterHoveredValue,
    yAxisLabelOffset,
    xAxisLabelOffset,
  },
) => {
  const { highlightedSet } = state;

  const xScale = scalePoint(
    filteredScatterData.map((d) => d.year), // DOMAIN OF X
    [margin.left, width - margin.right], // RANGE OF X
  );

  const yScale = scalePoint(
    filteredScatterData.map((d) => d.event_subtype), // DOMAIN OF Y
    [height - margin.bottom, margin.top], // RANGE OF Y
  );

  const altColorScale = scaleOrdinal()
    .domain(filteredScatterData.map(colorValue))
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

  selection.call(axes, {
    xScale,
    yScale,
    xAxisLabel,
    yAxisLabel,
    yAxisLabelOffset,
    xAxisLabelOffset,
  });

  const columnWidth = 30;
  const columnPadding = 55;
  const itemHeight = 10;
  const itemPadding = 3;
  const itemsPerColumn = Math.ceil(
    filteredScatterData.length / 5,
  );

  selection.call(scatterColorLegend, {
    altColorScale,
    scatterColorLegendLabel,
    scatterColorLegendX,
    scatterColorLegendY,
    setScatterHoveredValue,
    scatterHoveredValue,
    itemsPerColumn,
    columnWidth,
    columnPadding,
    itemHeight,
    itemPadding,
  });

  // const brushBehavior = brush()
  //   .on('brush', (event) => {
  //     // console.log(event);
  //     // console.log(event.selection);
  //     const [[x0, y0], [x1, y1]] = event.selection;
  //     console.log({ x0, y0, x1, y1 });
  //     const newHighlightedSet = new Set();
  //     for (const d of filteredScatterData) {
  //       if (
  //         x0 <= xScale(xValue(d)) &&
  //         xScale(xValue(d)) <= x1 &&
  //         y0 <= yScale(yValue(d)) &&
  //         yScale(yValue(d)) <= y1
  //       ) {
  //         console.log('xvalue d:' + xValue(d));
  //         // console.log(index(d));
  //         newHighlightedSet.add(index(d));
  //       }
  //     }
  //     setState((state) => ({
  //       ...state,
  //       highlightedSet: newHighlightedSet,
  //     }));
  //   })
  //   .on('end', (event) => {
  //     if (event.selection === null) {
  //       setState((state) => ({
  //         ...state,
  //         highlightedSet: null,
  //       }));
  //     }
  //   });

  // const brushG = selection
  //   .selectAll('g.brush')
  //   .data([null])
  //   .join('g')
  //   .attr('class', 'brush')
  //   .call(brushBehavior);

  selection
    .selectAll('circle.mark')
    .data(filteredScatterData)
    .join('circle')
    .attr('class', 'mark')
    .attr('cx', (d) => xScale(xValue(d)))
    .attr('cy', (d) => yScale(yValue(d)))
    .attr('fill', (d) => altColorScale(colorValue(d)))
    .attr('r', 7)
    .attr('stroke', (d) =>
      highlightedSet && highlightedSet.has(index(d))
        ? 'black'
        : 'none',
    )
    .attr('stroke-width', 2);
};

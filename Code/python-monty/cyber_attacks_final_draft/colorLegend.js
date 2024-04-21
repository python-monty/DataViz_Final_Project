export const colorLegend = (
  selection,
  {
    altColorScale,
    colorLegendLabel,
    colorLegendX,
    colorLegendY,
    tickSpacing = 30,
    tickPadding = 17,
    colorLegendLabelX = -30,
    colorLegendLabelY = -24,
    setClickValue,
    clickedValue,
    itemsPerColumn,
    columnWidth,
    columnPadding,
    itemHeight,
    itemPadding,
    setHoveredValue,
    hoveredValue,
  },
) => {
  let colorLegendG = selection
    .selectAll('g.color-legend')
    .data([null])
    .join('g')
    .attr('class', 'color-legend')
    .attr(
      'transform',
      `translate(${colorLegendX},${colorLegendY})`,
    );

  colorLegendG
    .selectAll('text.color-legend-label')
    .data([null])
    .join('text')
    .attr('x', colorLegendLabelX)
    .attr('y', colorLegendLabelY)
    .attr('class', 'color-legend-label')
    .attr('font-family', 'sans-serif')
    .attr('alignment-baseline', 'hanging')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text(colorLegendLabel);

  colorLegendG
    .selectAll('g.tick')
    .data(altColorScale.domain())
    .join((enter) =>
      enter
        .append('g')
        .attr('class', 'tick')
        .call((selection) => {
          selection.append('circle');
          selection.append('text');
        }),
    )
    .attr('transform', (d, i) => {
      const col = Math.floor(i / itemsPerColumn);
      const row = i % itemsPerColumn;
      const x = col * (columnWidth + columnPadding);
      const y = row * (itemHeight + itemPadding);
      return `translate(${x},${y})`;
    })
    .attr('font-size', 10)
    .attr('font-family', 'sans-serif')
    .call((selection) => {
      selection
        .select('circle')
        .attr('r', 5)
        .attr('fill', altColorScale);
      selection
        .select('text')
        .attr('dy', '0.50em')
        .attr('x', tickPadding)
        .text((d) => d);
    })
    .on('click', (event, d) => {
      setClickValue(d);
    })
    // .attr('opacity', (d) => (d === hoveredValue ? 1 : 0.2))
    .attr('opacity', (d) =>
      hoveredValue ? (d === hoveredValue ? 1 : 0.2) : 1,
    )
    .on('mouseover', (event, d) => {
      setHoveredValue(d);
    });
  // .on('mouseout', () => {
  //   setHoveredValue(null);
  // });
};

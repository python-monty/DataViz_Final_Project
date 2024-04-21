export const scatterColorLegend = (
  selection,
  {
    altColorScale,
    scatterColorLegendLabel,
    scatterColorLegendX,
    scatterColorLegendY,
    tickSpacing = 30,
    tickPadding = 17,
    scatterColorLegendLabelX = -12,
    scatterColorLegendLabelY = -24,
    setScatterHoveredValue,
    scatterHoveredValue,
    // setHoveredValue,
    // hoveredValue,
    itemsPerColumn,
    columnWidth,
    columnPadding,
    itemHeight,
    itemPadding,
  },
) => {
  const scatterColorLegendG = selection
    .selectAll('g.scatterColor-legend')
    .data([null])
    .join('g')
    .attr('class', 'scatterColor-legend')
    .attr(
      'transform',
      `translate(${scatterColorLegendX},${scatterColorLegendY})`,
    );

  scatterColorLegendG
    .selectAll('text.scatterColor-legend-label')
    .data([null])
    .join('text')
    .attr('x', scatterColorLegendLabelX)
    .attr('y', scatterColorLegendLabelY)
    .attr('class', 'scatterColor-legend-label')
    .attr('font-family', 'sans-serif')
    .attr('alignment-baseline', 'hanging')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .text(scatterColorLegendLabel);

  scatterColorLegendG
    .selectAll('g.scatterTick')
    .data(altColorScale.domain())
    .join((enter) =>
      enter
        .append('g')
        .attr('class', 'scatterTick')
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
        .attr('dy', '50.em')
        .attr('x', tickPadding)
        .text((d) => d);
    })
    .on('mouseover', (event, d) => {
      setScatterHoveredValue(d);
      console.log(d);
    });
};

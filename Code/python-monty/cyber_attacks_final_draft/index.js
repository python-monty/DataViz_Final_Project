import { select } from 'd3';
import { lineChart } from './lineChart';
import { scatterPlot } from './scatterPlot';
import { yearlyData } from '@python-monty/full_cyber_attack_data';
import { newData } from '@python-monty/full_cyber_attack_data';
import { observeResize } from '@curran/responsive-axes';
import { menu } from './menu';
import './styles.css';

export const main = (container, { state, setState }) => {
  const dimensions = observeResize({
    state,
    setState,
    container,
  });

  if (dimensions === null) return;
  let { width, height } = dimensions;
  height = height - 10;

  // Display the count as text
  const {
    hoveredValue,
    scatterHoveredValue,
    clickedValue,
  } = state;

  console.log(hoveredValue);

  // <SCATTERPLOT> FILTER THE DATA. CONTROLS WHAT IS SHOWN IN THE SCATTERPLOT VIZ ACCORDING TO WHAT LINE VIZ COLOR LEGEND ITEM IS HOVERED OVER
  // let filter = parseInt(hoveredValue);
  let filter = clickedValue;

  const scatterFilters = new Set([filter]);

  // <SCATTERPLOT> FILTER OUT ALL OTHER DATA THAT DOES NOT HAVE AN INDUSTRY CODE OF 11,21 OR 43
  const filteredScatterData = newData.filter(
    ({ industry }) => scatterFilters.has(industry),
  );

  // <SCATTERPLOT> SLICE ALL EVENT SUBTYPE STRINGS DOWN TO ONLY 10 DIGITS (FOR EASIER RENDERING ON SCREEN)
  filteredScatterData.forEach(function (part, index) {
    filteredScatterData[index].event_subtype =
      filteredScatterData[index].event_subtype.slice(0, 10);

    filteredScatterData[index].actor = filteredScatterData[
      index
    ].actor.slice(0, 10);
  });

  console.log('filteredScatterData:' + filteredScatterData);

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

  // console.log('test245');

  // FOR SELECTING ONE INDUSTRY TO PASS TO THE RIGHT SIDE VIZ
  const setClickValue = (d) => {
    setState((state) => ({
      ...state,
      clickedValue: d,
    }));
  };

  // FOR FADING OUT OTHER INDUSTRIES NOT MOUSED OVER
  const setHoveredValue = (d) => {
    setState((state) => ({
      ...state,
      hoveredValue: d,
    }));
  };

  // FOR IDENTIFYING WHICH ACTOR IS MOUSED OVER IN RIGHT VIZ
  const setScatterHoveredValue = (d) => {
    setState((state) => ({
      ...state,
      scatterHoveredValue: d,
    }));
  };
  // console.log('test253');
  svg
    .selectAll('g.multi-line-chart')
    .data([null])
    .join('g')
    .attr('class', 'multi-line-chart')
    // svg.selectAll('g.bar-chart');
    .call(lineChart, {
      // filteredLineData,
      yearlyData,
      xValue: (d) => d.UTCyear,
      xAxisLabel: 'Year',
      yAxisLabel: 'Number of Attacks',
      yValue: (d) => d.count,
      lineValue: (d) => d.industryName,
      innerRectFill: '#E8E8E8',
      marginTop: 20,
      marginBottom: 120,
      marginLeft: 80,
      marginRight: 20,
      width: width / 2,
      height,
      colorLegendLabel: 'Industries',
      colorLegendX: width / 20,
      colorLegendY: height - 70,
      setClickValue,
      clickedValue,
      yAxisLabelOffset: 35,
      xAxisLabelOffset: 25,
      setHoveredValue,
      hoveredValue,
    });

  // console.log('yearlyData');
  // console.log(yearlyData);

  svg
    .selectAll('g.scatter-chart')
    .data([null])
    .join('g')
    .attr('class', 'scatter-chart')
    .attr('transform', `translate(${width / 2},0)`)
    .call(scatterPlot, {
      filteredScatterData,
      width: width / 2,
      height,
      xValue: (d) => d.year,
      yValue: (d) => d.event_subtype,
      colorValue: (d) => d.actor,
      index: (d) => d.key,
      xAxisLabel: 'Year',
      yAxisLabel: 'Attack Type',
      scatterColorLegendLabel: 'Actor',
      margin: {
        top: 20,
        right: 20,
        bottom: 120,
        left: 80,
      },
      scatterColorLegendX: width / 20,
      scatterColorLegendY: height - 70,
      state,
      setState,
      scatterHoveredValue,
      setScatterHoveredValue,
      yAxisLabelOffset: 65,
      xAxisLabelOffset: 25,
    });
  console.log(filteredScatterData);
};

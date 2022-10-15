import React from "react";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleOrdinal, scaleTime, scaleBand } from "@visx/scale";
import { timeFormatDefaultLocale } from "d3-time-format";
import { schemeTableau10 } from "d3-scale-chromatic";
import { LegendOrdinal } from "@visx/legend";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";

import { DataType, GraphData } from "../model/GraphData";
import { ConfigKind, LegendOrientation } from "../model/ConfigData";
import { getDateTimeLocale, getLocale } from "../service/translationManager";
import { GradientTealBlue } from "@visx/gradient";
import { LinePath } from "@visx/shape";

interface WrapperPros {
  graphData: GraphData;
}

export const Wrapper = ({ graphData }: WrapperPros) => {
  const width = 300;
  const height = 200;

  const margin = { top: 10, right: 30, bottom: 40, left: 55 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const customLocale = graphData.configMap.get(ConfigKind.customLocale);
  const locale = getLocale(customLocale ?? navigator.language);
  const d3TimeLocale = getDateTimeLocale(locale);
  timeFormatDefaultLocale(d3TimeLocale);

  let xScale;
  switch (graphData.xAxis.dataType) {
    case DataType.number: {
      xScale = scaleLinear();
      break;
    }
    case DataType.date: {
      xScale = scaleTime();
      break;
    }
    case DataType.category: {
      xScale = scaleBand();
      break;
    }
    default: {
      throw new Error("Unknown DataType");
    }
  }
  xScale = (xScale.domain(graphData.xAxis.domain) as any).range([0, width]);
  const yScale = scaleLinear()
    .domain(graphData.yAxis.domain)
    .range([height, 0]);

  const serieListNames = graphData.serieList.map((item) => item.name);
  const colorScale = scaleOrdinal()
    .domain(serieListNames)
    .range(schemeTableau10);

  // Add the legend
  const legendIsVertical =
    graphData.configMap.get(ConfigKind.legendOrientation) ===
    LegendOrientation.vertical;

  const keys = graphData.serieList.map((item) => item.name);
  const transformedData = [];
  graphData.serieList.forEach((series, indexSeries) => {
    series.pointList.forEach((point, index) => {
      if (indexSeries === 0) {
        transformedData.push({
          x0: point.x,
        });
      }
      const transformedPoint = transformedData[index];
      transformedPoint[series.name] = point.y;
    });
  });
  const x0Scale = scaleBand<string>({
    domain: transformedData.map((d) => d.x0),
    padding: 0.2,
  });
  const x1Scale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  x0Scale.rangeRound([0, xMax]);
  x1Scale.rangeRound([0, x0Scale.bandwidth()]);

  console.log(graphData);

  return (
    <div>
      <svg width={width} height={height}>
        <GradientTealBlue id="teal" />
        <rect width={width} height={height} fill="url(#teal)" rx={14} />
        {graphData.xAxis.dataType !== DataType.category &&
          graphData.serieList.map((item) => (
            <LinePath
              data={item.pointList}
              x={(d) => xScale(d.x) ?? 0}
              y={(d) => yScale(d.y) ?? 0}
              stroke={colorScale(item.name)}
            />
          ))}
        {graphData.xAxis.dataType === DataType.category && (
          <Group top={margin.top} left={margin.left}>
            <BarGroup
              data={transformedData}
              keys={keys}
              height={yMax}
              x0={(d) => d.x0}
              x0Scale={x0Scale}
              x1Scale={x1Scale}
              yScale={yScale}
              color={colorScale}
            >
              {(barGroups) =>
                barGroups.map((barGroup) => (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => (
                      <rect
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                        rx={4}
                      />
                    ))}
                  </Group>
                ))
              }
            </BarGroup>
          </Group>
        )}
        <AxisLeft left={margin.left} scale={yScale} />
        <AxisBottom top={yMax + margin.top} left={margin.left} scale={xScale} />
      </svg>
      <LegendOrdinal
        scale={colorScale}
        direction="column-reverse"
        itemDirection="row-reverse"
        labelMargin="0 20px 0 0"
        shapeMargin="1px 0 0"
      />
    </div>
  );
};

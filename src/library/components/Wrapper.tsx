import React from "react";
import styled from "@emotion/styled";
import { format } from "d3-format";
import { timeFormat, timeFormatDefaultLocale } from "d3-time-format";
import { schemeTableau10 } from "d3-scale-chromatic";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleLinear, scaleOrdinal, scaleTime, scaleBand } from "@visx/scale";
import { LegendOrdinal } from "@visx/legend";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";
import { GradientTealBlue } from "@visx/gradient";
import { LinePath } from "@visx/shape";

import { DataType, GraphData } from "../model/GraphData";
import { ConfigKind, LegendOrientation } from "../model/ConfigData";
import {
  AvailableLocale,
  getDateTimeLocale,
  getLocale,
} from "../service/translationManager";

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
`;

const Svg = styled.svg`
  width: 100%;
  max-width: 50em;
`;

const LegendTitle = styled.div`
  margin-bottom: 1em;
  font-weight: 100;
`;

interface WrapperPros {
  graphData: GraphData;
}

export const Wrapper = ({ graphData }: WrapperPros) => {
  const width = 600;
  const height = 400;

  const margin = { top: 20, right: 30, bottom: 60, left: 65 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const customLocale = graphData.configMap.get(ConfigKind.customLocale);
  const locale = getLocale(
    customLocale ?? globalThis.navigator?.language ?? AvailableLocale.enGB
  );
  const d3TimeLocale = getDateTimeLocale(locale);
  timeFormatDefaultLocale(d3TimeLocale);

  let xScale;
  const x0Padding = 0.2;
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
      xScale = scaleBand({
        padding: x0Padding,
      });
      break;
    }
    default: {
      throw new Error("Unknown DataType");
    }
  }
  xScale = (xScale.domain(graphData.xAxis.domain) as any).range([
    0,
    chartWidth,
  ]);
  const yScale = scaleLinear()
    .domain(graphData.yAxis.domain)
    .range([chartHeight, 0]);

  const serieListLabels = graphData.serieList.map((item) => item.label);
  const colorScale = scaleOrdinal()
    .domain(serieListLabels)
    .range(schemeTableau10);

  // Add the legend
  const legendIsVertical =
    graphData.configMap.get(ConfigKind.legendOrientation) ===
    LegendOrientation.vertical;

  const keys = graphData.serieList.map((item) => item.label);
  const transformedData = [];
  graphData.serieList.forEach((series, indexSeries) => {
    series.pointList.forEach((point, index) => {
      if (indexSeries === 0) {
        transformedData.push({
          x0: point.x,
        });
      }
      const transformedPoint = transformedData[index];
      transformedPoint[series.label] = point.y;
    });
  });
  const x0Scale = scaleBand<string>({
    domain: transformedData.map((d) => d.x0),
    padding: x0Padding,
  });
  const x1Scale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  x0Scale.rangeRound([0, chartWidth]);
  x1Scale.rangeRound([0, x0Scale.bandwidth()]);

  const xAxisNbOfTicks = graphData.configMap.get(ConfigKind.xAxisNbOfTicks);
  const xAxisFormat = graphData.configMap.get(ConfigKind.xAxisFormat);
  const yAxisNbOfTicks = graphData.configMap.get(ConfigKind.yAxisNbOfTicks);
  const yAxisFormat = graphData.configMap.get(ConfigKind.yAxisFormat);
  const legendTitle = graphData.configMap.get(ConfigKind.legendTitle);

  return (
    <WrapperDiv>
      <Svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
        <GradientTealBlue id="teal" />
        <rect width={width} height={height} fill="url(#teal)" rx={8} />
        <Group top={margin.top} left={margin.left}>
          {graphData.xAxis.dataType !== DataType.category &&
            graphData.serieList.map((item, index) => (
              <LinePath
                key={`line-path-${item.label}-${index}`}
                data={item.pointList}
                x={(d) => xScale(d.x) ?? 0}
                y={(d) => yScale(d.y) ?? 0}
                stroke={colorScale(item.label)}
              />
            ))}
          {graphData.xAxis.dataType === DataType.category && (
            <BarGroup
              data={transformedData}
              keys={keys}
              height={chartHeight}
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
          )}
        </Group>
        <AxisLeft
          top={margin.top}
          left={margin.left}
          scale={yScale}
          numTicks={yAxisNbOfTicks ? +yAxisNbOfTicks : undefined}
          tickFormat={yAxisFormat ? format(yAxisFormat) : undefined}
        />
        <Group top={height / 2} left={margin.left / 3}>
          <text transform="rotate(-90)" textAnchor="middle">
            {graphData.yAxis.label}
          </text>
        </Group>
        <AxisBottom
          top={chartHeight + margin.top}
          left={margin.left}
          scale={xScale}
          numTicks={xAxisNbOfTicks ? +xAxisNbOfTicks : undefined}
          tickFormat={
            xAxisFormat
              ? graphData.xAxis.dataType === DataType.date
                ? timeFormat(xAxisFormat)
                : format(xAxisFormat)
              : undefined
          }
        />
        <Group top={height - margin.bottom / 4} left={width / 2}>
          <text textAnchor="middle">{graphData.xAxis.label}</text>
        </Group>
      </Svg>
      <div>
        {legendTitle && (
          <LegendTitle className="title">{legendTitle}</LegendTitle>
        )}
        <LegendOrdinal
          scale={colorScale}
          direction={legendIsVertical ? "column" : "row"}
        />
      </div>
    </WrapperDiv>
  );
};

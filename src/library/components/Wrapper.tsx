import React, { CSSProperties } from "react";
import { schemeTableau10 } from "d3-scale-chromatic";
import {
  scaleLinear,
  scaleOrdinal,
  scaleTime,
  scaleBand,
  PickD3Scale,
} from "@visx/scale";

import { DataType, GraphData } from "../model/GraphData";
import { LegendSection } from "./LegendSection";
import { Dimension } from "../model/UiType";
import { AxisSection } from "./AxisSection";
import { LineSection } from "./LineSection";
import { BarSection, X0_PADDING } from "./BarSection";
import { ClippedPathGroup } from "./ClippedPathGroup";

const WrapperDiv: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5em",
  margin: "2em 0",
};

const Svg: CSSProperties = {
  width: "100%",
  maxWidth: "50em",
  height: "auto",
};

const BackgroundRect: CSSProperties = {
  borderRadius: "4px",
  fill: "#8282821c",
};

const computeDimension = () => {
  const width = 600;
  const height = 400;

  const margin = { top: 20, right: 30, bottom: 60, left: 65 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const dimension: Dimension = {
    width,
    height,
    margin,
    chart: {
      width: chartWidth,
      height: chartHeight,
    },
  };

  return dimension;
};

interface WrapperPros {
  graphData: GraphData;
}

export const Wrapper = ({ graphData }: WrapperPros) => {
  const dimension = computeDimension();

  let xScale: PickD3Scale<any, any, any>;
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
        padding: X0_PADDING,
      });
      break;
    }
    default: {
      throw new Error("Unknown DataType");
    }
  }
  xScale = (xScale.domain(graphData.xAxis.domain) as any).range([
    0,
    dimension.chart.width,
  ]);
  const yScale = scaleLinear()
    .domain(graphData.yAxis.domain)
    .range([dimension.chart.height, 0]);

  const seriesListLabels = graphData.seriesList.map((item) => item.label);
  const colorScale = scaleOrdinal()
    .domain(seriesListLabels)
    .range(schemeTableau10);

  return (
    <div style={WrapperDiv}>
      <svg
        style={Svg}
        viewBox={`0 0 ${dimension.width} ${dimension.height}`}
        width={dimension.width}
      >
        <rect
          style={BackgroundRect}
          width={dimension.width}
          height={dimension.height}
          rx={8}
        />
        <ClippedPathGroup dimension={dimension}>
          {graphData.xAxis.dataType !== DataType.category && (
            <LineSection
              graphData={graphData}
              xScale={xScale}
              yScale={yScale}
              colorScale={colorScale}
            />
          )}
          {graphData.xAxis.dataType === DataType.category && (
            <BarSection
              graphData={graphData}
              dimension={dimension}
              yScale={yScale}
              colorScale={colorScale}
            />
          )}
        </ClippedPathGroup>
        <AxisSection
          graphData={graphData}
          dimension={dimension}
          xScale={xScale}
          yScale={yScale}
        />
      </svg>
      <LegendSection graphData={graphData} colorScale={colorScale} />
    </div>
  );
};

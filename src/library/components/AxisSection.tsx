import React from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { AxisBottom, AxisLeft } from "@visx/axis";

import { DataType, GraphData } from "../model/GraphData";
import { ConfigKind } from "../model/ConfigData";
import { Dimension } from "../model/UiType";
import { PickD3Scale } from "@visx/scale";

const defaultLabelProps = {
  fill: "currentColor",
  fontSize: 12,
  fontFamily: "sans-serif",
};

const tickXLabelProps = {
  ...defaultLabelProps,
  textAnchor: "middle",
};

const tickYLabelProps = {
  ...defaultLabelProps,
  textAnchor: "end",
  dx: "-0.25em",
  dy: "0.33em",
};

const labelProps = {
  ...defaultLabelProps,
  textAnchor: "middle",
};

interface AxisSectionProps {
  graphData: GraphData;
  dimension: Dimension;
  xScale: PickD3Scale<any, any, any>;
  yScale: PickD3Scale<any, any, any>;
}

export const AxisSection = ({
  graphData,
  dimension,
  xScale,
  yScale,
}: AxisSectionProps) => {
  const xAxisNbOfTicks = graphData.configMap.get(ConfigKind.xAxisNbOfTicks);
  const xAxisFormat =
    graphData.configMap.get(ConfigKind.xAxisFormat) ??
    (graphData.xAxis.dataType === DataType.number && "~s");
  const yAxisNbOfTicks = graphData.configMap.get(ConfigKind.yAxisNbOfTicks);
  const yAxisFormat = graphData.configMap.get(ConfigKind.yAxisFormat) ?? "~s";

  return (
    <>
      <AxisLeft
        top={dimension.margin.top}
        left={dimension.margin.left}
        scale={yScale}
        numTicks={yAxisNbOfTicks ? +yAxisNbOfTicks : undefined}
        tickFormat={yAxisFormat ? (format(yAxisFormat) as any) : undefined}
        stroke="currentColor"
        tickStroke="currentColor"
        label={graphData.yAxis.label}
        tickLabelProps={() => tickYLabelProps as any}
        labelProps={labelProps as any}
      />
      <AxisBottom
        top={dimension.chart.height + dimension.margin.top}
        left={dimension.margin.left}
        scale={xScale}
        numTicks={xAxisNbOfTicks ? +xAxisNbOfTicks : undefined}
        tickFormat={
          xAxisFormat
            ? graphData.xAxis.dataType === DataType.date
              ? timeFormat(xAxisFormat)
              : (format(xAxisFormat) as any)
            : undefined
        }
        stroke="currentColor"
        tickStroke="currentColor"
        label={graphData.xAxis.label}
        tickLineProps={{
          fill: "currentColor",
        }}
        tickLabelProps={() => tickXLabelProps as any}
        labelProps={labelProps as any}
      />
    </>
  );
};

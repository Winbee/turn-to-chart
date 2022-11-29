import React from "react";
import { format } from "d3-format";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { PickD3Scale } from "@visx/scale";
import { timeFormatDefaultLocale } from "d3-time-format";
import {
  timeSecond,
  timeMinute,
  timeHour,
  timeDay,
  timeMonth,
  timeWeek,
  timeYear,
} from "d3-time";

import { DataType, GraphData } from "../model/GraphData";
import { ConfigKind } from "../model/ConfigData";
import { Dimension } from "../model/UiType";
import { getTimeLocaleDefinition } from "../service/translationManager";

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

  let applicableXTickFormat;
  if (graphData.xAxis.dataType === DataType.date) {
    const customLocale =
      graphData.configMap.get(ConfigKind.customLocale) ??
      globalThis.navigator?.language;
    const d3TimeLocale = getTimeLocaleDefinition(customLocale);
    const timeLocaleObject = timeFormatDefaultLocale(d3TimeLocale);

    if (xAxisFormat) {
      applicableXTickFormat = timeLocaleObject.format(xAxisFormat);
    } else if (graphData.configMap.get(ConfigKind.customLocale)) {
      // We need to redefine the conditional formatting based on https://github.com/d3/d3-time-format#d3-time-format
      // because timeFormatDefaultLocale doesn't modify global d3 object
      const formatMillisecond = timeLocaleObject.format(".%L"),
        formatSecond = timeLocaleObject.format(":%S"),
        formatMinute = timeLocaleObject.format("%I:%M"),
        formatHour = timeLocaleObject.format("%I %p"),
        formatDay = timeLocaleObject.format("%a %d"),
        formatWeek = timeLocaleObject.format("%b %d"),
        formatMonth = timeLocaleObject.format("%B"),
        formatYear = timeLocaleObject.format("%Y");

      const multiFormat = (date: Date) => {
        const formatFunction =
          timeSecond(date) < date
            ? formatMillisecond
            : timeMinute(date) < date
            ? formatSecond
            : timeHour(date) < date
            ? formatMinute
            : timeDay(date) < date
            ? formatHour
            : timeMonth(date) < date
            ? timeWeek(date) < date
              ? formatDay
              : formatWeek
            : timeYear(date) < date
            ? formatMonth
            : formatYear;
        return formatFunction(date);
      };

      applicableXTickFormat = multiFormat;
    }
  } else if (xAxisFormat) {
    applicableXTickFormat = format(xAxisFormat);
  }
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
        tickFormat={applicableXTickFormat as any}
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

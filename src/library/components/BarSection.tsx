import React from "react";
import { scaleBand, PickD3Scale } from "@visx/scale";
import { BarGroup } from "@visx/shape";
import { Group } from "@visx/group";

import { GraphData } from "../model/GraphData";
import { Dimension } from "../model/UiType";

export const X0_PADDING = 0.2;

interface BarSectionPros {
  graphData: GraphData;
  dimension: Dimension;
  yScale: PickD3Scale<any, any, any>;
  colorScale: PickD3Scale<"ordinal", any, any>;
}

export const BarSection = ({
  graphData,
  dimension,
  yScale,
  colorScale,
}: BarSectionPros) => {
  const keys = graphData.serieList.map((item) => item.label);
  const transformedData: any = [];
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
    domain: transformedData.map((d: any) => d.x0),
    padding: X0_PADDING,
  });
  const x1Scale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  x0Scale.rangeRound([0, dimension.chart.width]);
  x1Scale.rangeRound([0, x0Scale.bandwidth()]);

  return (
    <BarGroup
      data={transformedData}
      keys={keys}
      height={dimension.chart.height}
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
  );
};

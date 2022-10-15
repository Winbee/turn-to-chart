import React from "react";
import { Group } from "@visx/group";
import { RectClipPath } from "@visx/clip-path";

import { Dimension } from "../model/UiType";

interface ClippedPathGroupPros {
  dimension: Dimension;
  children: React.ReactNode;
}

export const ClippedPathGroup = ({
  dimension,
  children,
}: ClippedPathGroupPros) => {
  return (
    <>
      <RectClipPath
        id="chart-clip"
        x={0}
        y={-dimension.margin.top}
        width={dimension.chart.width + dimension.margin.right}
        height={dimension.chart.height + dimension.margin.top}
      />
      <Group
        clipPath="url(#chart-clip)"
        top={dimension.margin.top}
        left={dimension.margin.left}
      >
        {children}
      </Group>
    </>
  );
};

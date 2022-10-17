import React, { Fragment } from "react";
import { PickD3Scale } from "@visx/scale";
import { LinePath } from "@visx/shape";

import { GraphData } from "../model/GraphData";

interface LineSectionPros {
  graphData: GraphData;
  xScale: PickD3Scale<any, any, any>;
  yScale: PickD3Scale<any, any, any>;
  colorScale: PickD3Scale<"ordinal", any, any>;
}

export const LineSection = ({
  graphData,
  xScale,
  yScale,
  colorScale,
}: LineSectionPros) => {
  return (
    <>
      {graphData.seriesList.map((item, index) => (
        <Fragment key={`line-path-${item.label}-${index}`}>
          <LinePath
            data={item.pointList as any}
            x={(d: any) => xScale(d.x)}
            y={(d: any) => yScale(d.y)}
            stroke={colorScale(item.label)}
            shapeRendering="geometricPrecision"
          />
          {item.pointList.map((d, i) => (
            <circle
              key={`line-path-${item.label}-${index}-point-${i}`}
              cx={xScale(d.x) ?? 0}
              cy={yScale(d.y) ?? 0}
              r={2}
              fill={colorScale(item.label)}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
};

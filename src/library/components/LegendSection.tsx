import React from "react";
import styled from "@emotion/styled";
import { PickD3Scale } from "@visx/scale";
import { LegendOrdinal } from "@visx/legend";
import { GraphData } from "../model/GraphData";
import { ConfigKind, LegendOrientation } from "../model/ConfigData";

const LegendWrapper = styled.div`
  padding: 0.2em;
  border-radius: 5px;
  background: #8282821c;
`;

const LegendTitle = styled.div`
  margin: 0.4em 0;
  font-weight: 600;
`;

interface LegendSectionPros {
  graphData: GraphData;
  colorScale: PickD3Scale<"ordinal", any, any>;
}

export const LegendSection = ({ graphData, colorScale }: LegendSectionPros) => {
  const legendIsVertical =
    graphData.configMap.get(ConfigKind.legendOrientation) ===
    LegendOrientation.vertical;

  const legendTitle = graphData.configMap.get(ConfigKind.legendTitle);

  return (
    <LegendWrapper>
      {legendTitle && (
        <LegendTitle className="title">{legendTitle}</LegendTitle>
      )}
      <LegendOrdinal
        scale={colorScale}
        direction={legendIsVertical ? "column" : "row"}
        shape="circle"
        itemMargin={".5em"}
        labelMargin={"0 .1em 0 0"}
      />
    </LegendWrapper>
  );
};

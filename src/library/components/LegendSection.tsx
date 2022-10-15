import React, { CSSProperties } from "react";
import { PickD3Scale } from "@visx/scale";
import { LegendOrdinal } from "@visx/legend";
import { GraphData } from "../model/GraphData";
import { ConfigKind, LegendOrientation } from "../model/ConfigData";

const LegendWrapper: CSSProperties = {
  padding: "0.2em",
  borderRadius: "5px",
  background: "#8282821c",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
};

const LegendTitle: CSSProperties = {
  margin: "0.4em 0",
  fontWeight: 600,
  textAlign: "center",
};

const LegendStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

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
    <div style={LegendWrapper}>
      {legendTitle && <div style={LegendTitle}>{legendTitle}</div>}
      <LegendOrdinal
        scale={colorScale}
        direction={legendIsVertical ? "column" : "row"}
        shape="circle"
        itemMargin={".5em"}
        labelMargin={"0 .1em 0 0"}
        style={LegendStyle}
      />
    </div>
  );
};

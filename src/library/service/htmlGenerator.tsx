import { renderToStaticMarkup } from "react-dom/server";
import { GraphData } from "../model/GraphData";
import { Wrapper } from "../components/Wrapper";
import React from "react";

export const generateHtml = (graphData: GraphData): string => {
  return renderToStaticMarkup(<Wrapper graphData={graphData} />);
};

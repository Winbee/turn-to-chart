import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

import { GraphData } from "../model/GraphData";
import { Wrapper } from "../components/Wrapper";

export const generateHtml = (graphData: GraphData): string => {
  return renderToStaticMarkup(<Wrapper graphData={graphData} />);
};

import * as ReactDOMServer from "react-dom/server";
import { GraphData } from "../model/GraphData";
import { Wrapper } from "../components/Wrapper";
import React from "react";

export const generateHtml = (graphData: GraphData): string => {
  return ReactDOMServer.renderToStaticMarkup(<Wrapper graphData={graphData} />);
};

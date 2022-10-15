import { extractTableData } from "./service/stringReader";
import { buildGraphData } from "./service/graphBuilder";
import { generateHtml } from "./service/htmlGenerator";

export const generateHtmlString = (content: string): string => {
  const tableData = extractTableData(content);
  if (!tableData) {
    return "no table data";
  }

  const graphData = buildGraphData(tableData);
  if (!graphData) {
    return "no graph data";
  }

  return generateHtml(graphData);
};

import { extractTableData } from "./service/stringReader";
import { buildGraphData } from "./service/graphBuilder";
import { generateHtml } from "./service/htmlGenerator";
import { TurnToChartResult } from "./model/TurnToChartResult";

export type { TurnToChartResult } from "./model/TurnToChartResult";

export const generateHtmlString = (content: string): TurnToChartResult => {
  try {
    const tableData = extractTableData(content);

    const graphData = buildGraphData(tableData);

    return {
      data: generateHtml(graphData),
      errors: [],
      metadata: {
        isSucess: true,
      },
    };
  } catch (e: unknown) {
    return {
      data: "",
      errors: [e],
      metadata: {
        isSucess: false,
      },
    };
  }
};

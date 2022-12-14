import { AxisOriginKind, ConfigKind } from "../model/ConfigData";
import { DataType, GraphData, Point, Series, XType } from "../model/GraphData";
import { TableData } from "../model/TableData";
import { buildConfigData } from "./configBuilder";
import { isNumber } from "./utils";

const X_LABEL_REGEX = /(.*?)\[(.*?)\]/;
const Y_LABEL_REGEX = /(.*?)\((.*?)\)/;

export const buildGraphData = (tableData: TableData): GraphData => {
  const graphData: GraphData = {
    seriesList: [],
    xAxis: {
      label: "",
      domain: [],
    },
    yAxis: {
      label: "",
      dataType: DataType.number,
      domain: [],
    },
    configMap: buildConfigData(tableData.configList),
  };

  tableData.headList.forEach((item, index) => {
    if (index === 0) {
      const regexResult = X_LABEL_REGEX.exec(item);
      graphData.xAxis.label = regexResult ? regexResult[1].trim() : item.trim();
      let type = graphData.configMap.get(ConfigKind.xAxisType);
      if (!type) {
        type = regexResult ? regexResult[2].trim().toLocaleLowerCase() : "";
      }

      switch (type) {
        case DataType.number: {
          graphData.xAxis.dataType = DataType.number;
          break;
        }
        case DataType.date: {
          graphData.xAxis.dataType = DataType.date;
          break;
        }
        case DataType.category: {
          graphData.xAxis.dataType = DataType.category;
          break;
        }
        default: {
          graphData.xAxis.label = item.trim();
          // We don't know the type of the x-axis, we will guess it with the first value of the first row
          const firstValue = tableData.rowList[0][0];
          if (isNumber(+firstValue)) {
            graphData.xAxis.dataType = DataType.number;
          } else {
            graphData.xAxis.dataType = DataType.category;
          }
        }
      }
    } else {
      const regexResult = Y_LABEL_REGEX.exec(item);
      const name = regexResult ? regexResult[1].trim() : item.trim();
      const unit = regexResult ? regexResult[2].trim() : undefined;
      const newSeries: Series<any> = {
        name,
        unit,
        label: name + (unit ? ` (${unit})` : ""),
        pointList: [],
      };
      graphData.seriesList.push(newSeries);
    }
  });

  const unitList = [
    ...new Set(
      graphData.seriesList
        .map((item: any) => item.unit)
        .filter((item: any) => item != null)
    ),
  ];
  graphData.yAxis.label = unitList.join(", ");

  let yMin, yMax, xMin, xMax;
  for (let rowIndex = 0; rowIndex < tableData.rowList.length; rowIndex++) {
    const currentRow = tableData.rowList[rowIndex];
    let x: XType;
    switch (graphData.xAxis.dataType) {
      case DataType.number: {
        x = +currentRow[0];
        xMin = xMin == null ? x : Math.min(x, xMin as number);
        xMax = xMax == null ? x : Math.max(x, xMax as number);
        break;
      }
      case DataType.date: {
        x = new Date(currentRow[0]);
        xMin = xMin == null ? x : xMin < x ? xMin : x;
        xMax = xMax == null ? x : xMax < x ? x : xMax;
        break;
      }
      case DataType.category: {
        x = currentRow[0].trim();
        graphData.xAxis.domain.push(x);
        break;
      }
      default: {
        throw new Error("Unknown DataType");
      }
    }

    for (let columnIndex = 1; columnIndex < currentRow.length; columnIndex++) {
      const y = +currentRow[columnIndex];
      const newPoint: Point<any> = {
        x,
        y,
      };
      graphData.seriesList[columnIndex - 1].pointList.push(newPoint);
      yMin = yMin == null ? y : Math.min(y, yMin);
      yMax = yMax == null ? y : Math.max(y, yMax);
    }
  }

  let xAxisOrigin =
    graphData.configMap.get(ConfigKind.xAxisOrigin) ??
    AxisOriginKind.fromDataBoundaries;
  if (
    graphData.xAxis.dataType === DataType.number &&
    xAxisOrigin === AxisOriginKind.fromZero
  ) {
    if (xMin != null && xMin > 0) {
      xMin = 0;
    } else if (xMax != null && xMax < 0) {
      xMax = 0;
    }
  }

  let yAxisOrigin =
    graphData.configMap.get(ConfigKind.yAxisOrigin) ??
    AxisOriginKind.fromDataBoundaries;
  if (yAxisOrigin === AxisOriginKind.fromZero) {
    if (yMin != null && yMin > 0) {
      yMin = 0;
    } else if (yMax != null && yMax < 0) {
      yMax = 0;
    }
  }
  if (
    graphData.xAxis.dataType === DataType.number ||
    graphData.xAxis.dataType === DataType.date
  ) {
    graphData.xAxis.domain = [xMin as any, xMax];
  }
  graphData.yAxis.domain = [yMin as any, yMax];

  return graphData;
};

import { ConfigMap } from "./ConfigData";

export type GraphData =
  | AbstractGraphData<number, DataType.number>
  | AbstractGraphData<Date, DataType.date>
  | AbstractGraphData<string, DataType.category>;

interface AbstractGraphData<T extends XType, K extends DataType> {
  serieList: Serie<T>[];
  xAxis: {
    label: string;
    dataType?: K;
    domain: T[];
  };
  yAxis: {
    label: string;
    dataType: DataType.number;
    domain: YType[];
  };
  configMap: ConfigMap;
}

export interface Serie<T extends XType> {
  name: string;
  unit?: string;
  label: string;
  pointList: Point<T>[];
}

export interface Point<T extends XType> {
  x: T;
  y: YType;
}

export enum DataType {
  number = "number",
  date = "date",
  category = "category",
}

export type XType = number | Date | string;
export type YType = number;

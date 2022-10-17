import { test, describe, expect } from "vitest";
import { ConfigKind } from "../model/ConfigData";
import { DataType, GraphData } from "../model/GraphData";
import { TableData } from "../model/TableData";
import { buildGraphData } from "./graphBuilder";

describe("graphBuilder", () => {
  describe("buildGraphData", () => {
    const cases: {
      title: string;
      input: TableData;
      expectedOutput: GraphData;
    }[] = [
      {
        title: "one number series with x-axis starting at zero",
        input: {
          headList: ["xLabel", "series1 (kilo)"],
          rowList: [
            ["10", "2"],
            ["20", "4"],
            ["30", "8"],
          ],
          configList: ["xAxisOrigin: from zero"],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: "kilo",
              label: "series1 (kilo)",
              pointList: [
                { x: 10, y: 2 },
                { x: 20, y: 4 },
                { x: 30, y: 8 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.number,
            domain: [0, 30],
          },
          yAxis: {
            label: "kilo",
            dataType: DataType.number,
            domain: [2, 8],
          },
          configMap: new Map([[ConfigKind.xAxisOrigin, "from zero"]]),
        },
      },
      {
        title: "one number series with y-axis starting at zero",
        input: {
          headList: ["xLabel", "series1 (kilo)"],
          rowList: [
            ["10", "2"],
            ["20", "4"],
            ["30", "8"],
          ],
          configList: ["yAxisOrigin: from zero"],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: "kilo",
              label: "series1 (kilo)",
              pointList: [
                { x: 10, y: 2 },
                { x: 20, y: 4 },
                { x: 30, y: 8 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.number,
            domain: [10, 30],
          },
          yAxis: {
            label: "kilo",
            dataType: DataType.number,
            domain: [0, 8],
          },
          configMap: new Map([[ConfigKind.yAxisOrigin, "from zero"]]),
        },
      },
      {
        title: "one number series with both axis starting at zero",
        input: {
          headList: ["xLabel", "series1 (kilo)"],
          rowList: [
            ["10", "2"],
            ["20", "4"],
            ["30", "8"],
          ],
          configList: ["xAxisOrigin: from zero", "yAxisOrigin: from zero"],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: "kilo",
              label: "series1 (kilo)",
              pointList: [
                { x: 10, y: 2 },
                { x: 20, y: 4 },
                { x: 30, y: 8 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.number,
            domain: [0, 30],
          },
          yAxis: {
            label: "kilo",
            dataType: DataType.number,
            domain: [0, 8],
          },
          configMap: new Map([
            [ConfigKind.xAxisOrigin, "from zero"],
            [ConfigKind.yAxisOrigin, "from zero"],
          ]),
        },
      },
      {
        title: "one number series with x-with-unit",
        input: {
          headList: ["xLabel (unit)", "series1 (kilo)"],
          rowList: [["10", "2"]],
          configList: [],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: "kilo",
              label: "series1 (kilo)",
              pointList: [{ x: 10, y: 2 }],
            },
          ],
          xAxis: {
            label: "xLabel (unit)",
            dataType: DataType.number,
            domain: [10, 10],
          },
          yAxis: {
            label: "kilo",
            dataType: DataType.number,
            domain: [2, 2],
          },
          configMap: new Map(),
        },
      },
      {
        title: "one time-series",
        input: {
          headList: ["xLabel [date]", "series1 (kilo)"],
          rowList: [
            ["2021-01-02", "2"],
            ["2021-03-02", "4"],
            ["2021-04-02", "8"],
          ],
          configList: ["yAxisOrigin: from zero"],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: "kilo",
              label: "series1 (kilo)",
              pointList: [
                { x: new Date("2021-01-02"), y: 2 },
                { x: new Date("2021-03-02"), y: 4 },
                { x: new Date("2021-04-02"), y: 8 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.date,
            domain: [new Date("2021-01-02"), new Date("2021-04-02")],
          },
          yAxis: {
            label: "kilo",
            dataType: DataType.number,
            domain: [0, 8],
          },
          configMap: new Map([[ConfigKind.yAxisOrigin, "from zero"]]),
        },
      },
      {
        title: "one category-series if a time-series is not specified",
        input: {
          headList: ["xLabel", "series1 (kilo)"],
          rowList: [
            ["2021-01-02", "2"],
            ["2021-03-02", "4"],
            ["2021-04-02", "8"],
          ],
          configList: ["yAxisOrigin: from zero"],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: "kilo",
              label: "series1 (kilo)",
              pointList: [
                { x: "2021-01-02", y: 2 },
                { x: "2021-03-02", y: 4 },
                { x: "2021-04-02", y: 8 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.category,
            domain: ["2021-01-02", "2021-03-02", "2021-04-02"],
          },
          yAxis: {
            label: "kilo",
            dataType: DataType.number,
            domain: [0, 8],
          },
          configMap: new Map([[ConfigKind.yAxisOrigin, "from zero"]]),
        },
      },
      {
        title: "one category series",
        input: {
          headList: ["xLabel [category]", "series1 (kilo)"],
          rowList: [
            ["category 1", "2"],
            ["category 2", "4"],
            ["category 3", "8"],
          ],
          configList: [],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: "kilo",
              label: "series1 (kilo)",
              pointList: [
                { x: "category 1", y: 2 },
                { x: "category 2", y: 4 },
                { x: "category 3", y: 8 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.category,
            domain: ["category 1", "category 2", "category 3"],
          },
          yAxis: {
            label: "kilo",
            dataType: DataType.number,
            domain: [2, 8],
          },
          configMap: new Map(),
        },
      },
      {
        title: "one category series by guessing",
        input: {
          headList: ["xLabel", "series1 (kilo)"],
          rowList: [
            ["category one", "2"],
            ["category two", "4"],
            ["category three", "8"],
          ],
          configList: [],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: "kilo",
              label: "series1 (kilo)",
              pointList: [
                { x: "category one", y: 2 },
                { x: "category two", y: 4 },
                { x: "category three", y: 8 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.category,
            domain: ["category one", "category two", "category three"],
          },
          yAxis: {
            label: "kilo",
            dataType: DataType.number,
            domain: [2, 8],
          },
          configMap: new Map(),
        },
      },
      {
        title: "three number seriess",
        input: {
          headList: ["xLabel", "series1", "series2", "series3"],
          rowList: [
            ["1", "2", "1", "0"],
            ["2", "1", "1", "4"],
            ["3", "0", "4", "1"],
            ["4", "5", "2", "3"],
          ],
          configList: ["yAxisOrigin: from zero"],
        },
        expectedOutput: {
          seriesList: [
            {
              name: "series1",
              unit: undefined,
              label: "series1",
              pointList: [
                { x: 1, y: 2 },
                { x: 2, y: 1 },
                { x: 3, y: 0 },
                { x: 4, y: 5 },
              ],
            },
            {
              name: "series2",
              unit: undefined,
              label: "series2",
              pointList: [
                { x: 1, y: 1 },
                { x: 2, y: 1 },
                { x: 3, y: 4 },
                { x: 4, y: 2 },
              ],
            },
            {
              name: "series3",
              unit: undefined,
              label: "series3",
              pointList: [
                { x: 1, y: 0 },
                { x: 2, y: 4 },
                { x: 3, y: 1 },
                { x: 4, y: 3 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.number,
            domain: [1, 4],
          },
          yAxis: {
            label: "",
            dataType: DataType.number,
            domain: [0, 5],
          },
          configMap: new Map([[ConfigKind.yAxisOrigin, "from zero"]]),
        },
      },
    ];

    test.each(cases)(
      "return expected value for $title",
      ({ input, expectedOutput }) => {
        const output = buildGraphData(input);

        expect(output).toEqual(expectedOutput);
      }
    );
  });
});

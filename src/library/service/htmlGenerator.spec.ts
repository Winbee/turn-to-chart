import { test, describe, expect } from "vitest";
import { DataType, GraphData } from "../model/GraphData";
import { generateHtml } from "./htmlGenerator";
import * as fs from "fs";
import * as prettier from "prettier";

describe("htmlGenerator", () => {
  describe("generateHtml", () => {
    const cases: { title: string; input: GraphData }[] = [
      {
        title: "one line of numbers by number",
        input: {
          seriesList: [
            {
              name: "series1",
              unit: "unit1",
              label: "series1 (unit1)",
              pointList: [
                { x: 0, y: 2 },
                { x: 1, y: 4 },
                { x: 2, y: 8 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.number,
            domain: [0, 2],
          },
          yAxis: {
            label: "unit1",
            dataType: DataType.number,
            domain: [0, 8],
          },
          configMap: new Map(),
        },
      },
      {
        title: "two lines of numbers by number",
        input: {
          seriesList: [
            {
              name: "series1",
              unit: "unit1",
              label: "series1 (unit1)",
              pointList: [
                { x: 0, y: 2 },
                { x: 1, y: 4 },
                { x: 2, y: 8 },
              ],
            },
            {
              name: "series2",
              unit: "unit2",
              label: "series2 (unit2)",
              pointList: [
                { x: 0, y: 4 },
                { x: 1, y: 5 },
                { x: 2, y: 1 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.number,
            domain: [0, 2],
          },
          yAxis: {
            label: "unit1, unit2",
            dataType: DataType.number,
            domain: [0, 8],
          },
          configMap: new Map(),
        },
      },
      // {
      //   title: "one line of numbers by date",
      //   input: {
      //     seriesList: [
      //       {
      //         name: "series1",
      //         unit: "unit1",
      //         label: "series1 (unit1)",
      //         pointList: [
      //           { x: new Date("2021-01-02T12:00:00.000Z"), y: 2 },
      //           { x: new Date("2021-03-02T12:00:00.000Z"), y: 4 },
      //           { x: new Date("2021-04-02T12:00:00.000Z"), y: 8 },
      //         ],
      //       },
      //     ],
      //     xAxis: {
      //       label: "xLabel",
      //       dataType: DataType.date,
      //       domain: [
      //         new Date("2021-01-02T12:00:00.000Z"),
      //         new Date("2021-04-02T12:00:00.000Z"),
      //       ],
      //     },
      //     yAxis: {
      //       label: "unit1",
      //       dataType: DataType.number,
      //       domain: [0, 8],
      //     },
      //     configMap: new Map(),
      //   },
      // },
      {
        title: "one line of numbers by category",
        input: {
          seriesList: [
            {
              name: "series1",
              unit: "unit1",
              label: "series1 (unit1)",
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
            label: "unit1",
            dataType: DataType.number,
            domain: [0, 8],
          },
          configMap: new Map(),
        },
      },
      {
        title: "three lines of numbers by category",
        input: {
          seriesList: [
            {
              name: "series1",
              unit: "unit1",
              label: "series1 (unit1)",
              pointList: [
                { x: "category 1", y: 2 },
                { x: "category 2", y: 4 },
                { x: "category 3", y: 8 },
              ],
            },
            {
              name: "series2",
              unit: "unit2",
              label: "series2 (unit2)",
              pointList: [
                { x: "category 1", y: 4 },
                { x: "category 2", y: 5 },
                { x: "category 3", y: 2 },
              ],
            },
            {
              name: "series3",
              unit: "unit3",
              label: "series3 (unit3)",
              pointList: [
                { x: "category 1", y: 1 },
                { x: "category 2", y: 2 },
                { x: "category 3", y: 3 },
              ],
            },
          ],
          xAxis: {
            label: "xLabel",
            dataType: DataType.category,
            domain: ["category 1", "category 2", "category 3"],
          },
          yAxis: {
            label: "unit1",
            dataType: DataType.number,
            domain: [0, 8],
          },
          configMap: new Map(),
        },
      },
    ];

    test.each(cases)("return expected value for $title", ({ title, input }) => {
      const output = generateHtml(input);
      const formatedOutput = prettier.format(output, { filepath: "file.html" });

      const fileName = title.split(" ").join("_");
      const filePath = `${__dirname}/testAsset/${fileName}.html`;
      if (!fs.existsSync(filePath)) {
        // When the file doesn't exist, we create them like snapshot test.
        fs.writeFileSync(filePath, formatedOutput);
      }
      const expectedOutput = prettier.format(
        fs.readFileSync(filePath).toString(),
        {
          filepath: "file.html",
        }
      );
      expect(formatedOutput).toEqual(expectedOutput);
    });
  });
});

import { TableData } from "../model/TableData";
import { parse, ParseConfig } from "papaparse";

function findIndexForLastContent(lineList: string[]): number {
  // We start from the end because it should be faster to parse the config than the csv part
  let foundFirstString = false;
  for (let i = lineList.length - 1; i >= 0; i--) {
    const currentLine = lineList[i];
    if (currentLine != null && currentLine !== "") {
      foundFirstString = true;
    } else if (foundFirstString) {
      // The previous line had content and the current one doesn't
      return i + 1;
    }
  }
  return -1;
}

export function extractTableDataFromCsv(lineList: string[]): TableData {
  // We need to split the string between csv data and config data
  const indexForLastContent = findIndexForLastContent(lineList);

  const linesWithCsvData =
    indexForLastContent === -1
      ? lineList
      : lineList.slice(0, indexForLastContent - 1);
  const configList =
    indexForLastContent === -1 ? [] : lineList.slice(indexForLastContent);

  const papaParseConfig: ParseConfig<string[]> = {
    skipEmptyLines: true,
  };

  const parseResult = parse(linesWithCsvData.join("\n"), papaParseConfig);

  if (parseResult.errors.length > 0) {
    throw new Error(parseResult.errors[0].message);
  }
  if (parseResult.data.length < 2) {
    throw new Error("Csv is less than 2 lines");
  }
  const tableData = {
    headList: parseResult.data[0],
    rowList: parseResult.data.slice(1),
    configList,
  };

  return tableData;
}

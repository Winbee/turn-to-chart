#!/usr/bin/env node
import { generateHtmlString } from "./dist/turn-to-chart.js";

const example1 = `
| xLabel  | serie1 (unit1) |
| :------ | ------ |
| 0 | 2000 |
| 1 | 4000 |
| 35 | 8000 |

legendTitle: This is a title
yAxisOrigin: from zero
`;
const response1 = generateHtmlString(example1);

console.log("=================");
console.log(response1);
console.log("=================");

const example2 = `
xLabel, serie1 (unit1)
0, 2000 
1, 4000
35, 8000

legendTitle: This is a title
yAxisOrigin: from zero
`;

const response2 = generateHtmlString(example2);

console.log("=================");
console.log(response2);
console.log("=================");

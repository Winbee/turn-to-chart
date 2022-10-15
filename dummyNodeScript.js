#!/usr/bin/env node
import { generateHtmlString } from "./dist/turn-to-chart.js";

const example = `
| xLabel  | serie1 (unit1) |
| :------ | ------ |
| 0 | 2000 |
| 1 | 4000 |
| 35 | 8000 |

legendTitle: This is a title
yAxisOrigin: from zero
`;

const response = generateHtmlString(example);

console.log(response);

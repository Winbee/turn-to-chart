# :memo::curly_loop::bar_chart: Transforms tables to charts

This library transforms a `markdown` or `csv` table into an HTML chart

It can be used both in the browser and node.

It is used in https://github.com/Winbee/joplin-turn-to-chart at the moment. Go take a look to see more examples.


## Example usage

- First add it to your package with `npm install turn-to-chart`
- Then use in your code:

```typescript
import { generateHtmlString } from "turn-to-chart";

const inputString = `
| xLabel  | serie1 (unit1) |
| :------ | ------ |
| 0 | 2000 |
| 1 | 4000 |
| 35 | 8000 |

legendTitle: This is a title
yAxisOrigin: from zero
`;
const result = generateHtmlString(inputString);

if(result.metadata.isSucess === true){
    // Handle the data
    console.log(result.data)
} else {
    // Handle the errors
    console.log(result.errors)
}
```
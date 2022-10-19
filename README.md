# :memo::curly_loop::bar_chart: Transforms tables to charts

This library transforms a `markdown` or `csv` table into an HTML chart

It can be used both in the browser and node.

It is used in:
- [a joplin plugin](https://github.com/Winbee/joplin-turn-to-chart)
- [a markdown-it plugin](https://github.com/Winbee/markdown-it-turn-to-chart)
- [a live editor](https://winbee.github.io/turn-to-chart/)

## Example usage

- First add it to your package with `npm install turn-to-chart`
- Then use in your code:

```typescript
import { generateHtmlString } from "turn-to-chart";

const inputString = `
| xLabel  | series1 (unit1) |
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

## Available options

You have the possiblity to modify the chart by adding options after the table. There should be one option per line and it should follow the following syntax:  `optionKey: value of this option`.

### customLocale
- **Type:** see the list below  
- **Default:** `en-GB` 

Translate in this locale the date on the xAxis when xAxisType=`date`.

Here is the list of locale available:
- `ar-EG`: Arabic (Egypt)
- `ca-ES`: Catalan (Spain)
- `cs-CZ`: Czech (Czech Republic)
- `da-DK`: Danish (Denmark)
- `de-CH`: German (Switzerland)
- `de-DE`: German (Germany)
- `en-CA`: English (Canada)
- `en-GB`: English (United Kingdom)
- `en-US`: English (United States)
- `es-ES`: Spanish (Spain)
- `es-MX`: Spanish (Mexico)
- `fa-IR`: Persian (Iran)
- `fi-FI`: Finnish (Finland)
- `fr-CA`: French (Canada)
- `fr-FR`: French (France)
- `he-IL`: Hebrew (Israel)
- `hr-HR`: Croatian (Croatia)
- `hu-HU`: Hungarian (Hungary)
- `it-IT`: Italian (Italy)
- `ja-JP`: Japanese (Japan)
- `ko-KR`: Korean (South Korea)
- `mk-MK`: Macedonian (Macedonia)
- `nb-NO`: Norwegian Bokmål (Norway)
- `nl-NL`: Dutch (Netherlands)
- `pl-PL`: Polish (Poland)
- `pt-BR`: Portuguese (Brazil)
- `ru-RU`: Russian (Russia)
- `sv-SE`: Swedish (Sweden)
- `tr-TR`: Turkish (Turkey)
- `uk-UA`: Ukrainian (Ukraine)
- `zh-CN`: Chinese (China)
- `zh-TW`: Chinese (Taiwan)

*Example where we enforce Hungarian language:*
~~~
year        | apple | pear
----------- | ----- | -----
2019        | 2     | 3
2020        | 4     | 6

xAxisType: date
customLocale: hu-HU
~~~

### legendOrientation
- **Type:** `vertical` or `horizontal` 
- **Default:** `horizontal` 



### legendTitle
- **Type:** any `string` 
- **Default:** none



### xAxisType
- **Type:** `number` or `date` or  `category` 
- **Default:** autodetected

It supports 3 types of data:
- `number`: numerical value as a continuous range
- `date`: date value as a continuous range
- `category`: string value as a discrete range

*Example where we enforce a `date` type with the normal syntax:*
~~~
year        | apple | pear
----------- | ----- | -----
2019        | 2     | 3
2020        | 4     | 6

xAxisType: date
~~~


Note that you can also pass this option by providing it in square bracket `[]` in the first cell of the table.
*Example where we enforce a `date` type with the square bracket `[]` syntax:*
~~~
year [date] | apple | pear
----------- | ----- | -----
2019        | 2     | 3
2020        | 4     | 6
~~~

### xAxisFormat
- **Type:** see [d3-format](https://github.com/d3/d3-format) for `number` xAxisType and [d3-time-format](https://github.com/d3/d3-time-format) for `date` xAxisType
- **Default:** none

### yAxisFormat
- **Type:** see [d3-format](https://github.com/d3/d3-format) for `number` xAxisType and [d3-time-format](https://github.com/d3/d3-time-format) for `date` xAxisType
- **Default:** none

### xAxisNbOfTicks
- **Type:** positive `number`
- **Default:** autodetected

### yAxisNbOfTicks
- **Type:** positive `number`
- **Default:** autodetected

### xAxisOrigin
- **Type:** `from zero` or `from data boundaries`
- **Default:** `from data boundaries`

*Note:* This option is ignored for `date` and `category` type x-axis.

### yAxisOrigin
- **Type:** `from zero` or `from data boundaries`
- **Default:** `from data boundaries`


## Units
The unit for the x-axis is the full string of the first cell of the header.
The units for the y-axis are the string in parentheses `()` of each subsequent cells of the header.

## Comments
Any string surrounded by `<!--` and `-->` will be ignored by the plugin.

*Example of a table with comments:*
~~~
year  <!--this is a comment -->      | apple | pear
-----------------------------------  | ----- | -----
2019                                 | 2     | 3 <!-- another comment --> 
2020                                 | 4     | 6
~~~

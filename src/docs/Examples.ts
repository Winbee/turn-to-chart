export const examples: {
  title: string;
  input: string;
  only?: boolean;
}[] = [
  {
    title: "3 lines of numbers by category",
    input: `| xLabel     | series1 (unit1) | series2 (unit2) | series3 (unit3) |
| :--------- | -------------- | -------------- | -------------- |
| category 1 | 2              | 4              | 1              |
| category 2 | 4              | 5              | 2              |
| category 3 | 8              | 2              | 2              |

legendTitle: This is a title
`,
  },
  {
    title: "3 lines of numbers by number",
    input: `| xLabel | series1 (unit1) | series2 (unit2) | series3 (unit3) |
| ------ | -------------- | -------------- | -------------- |
| 0      | 2              | 4              | 14             |
| 1      | 4              | 5              | 2              |
| 2      | 8              | 1              | 1              |
| 3      | 2              | 1              | 4              |
| 4      | 3              | 1              | 3              |
| 8      | 4              | 10             | 5              |

yAxisNbOfTicks: 10
yAxisOrigin: from zero
`,
  },
  {
    title: "csv with config example",
    input: `xLabel, series1 (unit1), series2 (unit2)
0, 2000 , 2000
1, 4000, 1000
35, 8000, 2500

legendTitle: This is a title
yAxisOrigin: from zero
`,
  },
];

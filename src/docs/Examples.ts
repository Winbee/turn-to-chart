export const examples: {
  title: string;
  input: string;
  only?: boolean;
}[] = [
  {
    title: "with category as x",
    input: `| xLabel     | series1 (unit1) | series2 (unit2) | series3 (unit3) |
|:-----------|-----------------|-----------------|-----------------|
| category 1 | 2               | 4               | 1               |
| category 2 | 4               | 5               | 2               |
| category 3 | 8               | 2               | 2               |
`,
  },
  {
    title: "with date as x",
    input: `| year        | apple (kg) | pear | orange | abricot |
|-------------|:-----------|------|--------|---------|
| 2019        | 2          | 3    | 3      | 3       |
| 2020        | 4          | 6    | 3      | 3       |
| 2021        | 4          | 6    | 10     | 3       |
| 2022        | 4          | 6    | 3      | 23      | 

xAxisType: date
`,
  },
  {
    title: "with number as x",
    input: `| xLabel | series1 (unit1) | series2 (unit2) | series3 (unit3) |
|--------|-----------------|-----------------|-----------------|
| 0      | 2               | 4               | 14              |
| 1      | 4               | 5               | 2               |
| 2      | 8               | 1               | 1               |
| 3      | 2               | 1               | 4               |
| 4      | 3               | 1               | 3               |
| 8      | 4               | 10              | 5               |
`,
  },
  {
    title: "with csv",
    input: `year        , apple , pear
2019        , 2     , 3
2020        , 4     , 6
2021        , 3     , 8


xAxisType: date
`,
  },
  {
    title: "with options and comments",
    input: `year        | apple | pear
----------- | ----- | -----
2022-01-01  | 2     | 3 <!-- Interesting -->
2022-03-01  | 4     | 6
2022-05-01  | 3     | 8


xAxisType: date
xAxisNbOfTicks: 3
xAxisFormat: %B
customLocale: fr-FR
yAxisFormat: ($.0f
yAxisNbOfTicks: 4
yAxisOrigin: from zero
legendOrientation: horizontal
legendTitle: Legend
`,
    only: true,
  },
];

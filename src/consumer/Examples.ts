export const examples: {
  title: string;
  input: string;
  only?: boolean;
}[] = [
  {
    title: "csv with config showing one line of numbers by number",
    input: `
    xLabel, serie1 (unit1)
    0, 2000 
    1, 4000
    35, 8000

    legendTitle: This is a title
    yAxisOrigin: from zero
    `,
  },
  {
    title: "csv showing one line of numbers by number",
    input: `
    xLabel, serie1 (unit1)
    0, 2000 
    1, 4000
    35, 8000

    `,
  },
  {
    title: "one line of numbers by number",
    input: `
    | xLabel  | serie1 (unit1) |
    | :------ | ------ |
    | 0 | 2000 |
    | 1 | 4000 |
    | 35 | 8000 |

    legendTitle: This is a title
    yAxisOrigin: from zero
    `,
  },
  {
    title: "two lines of numbers by number",
    input: `
    | xLabel  | serie1 (unit1)  |serie2 (unit2)  |
    | :------ | ------ | ------ |
    | 0 | 2 |4 |
    | 1 | 4 |5 |
    | 2 | 8 |1 |

    yAxisNbOfTicks: 8
    yAxisOrigin: from zero
    `,
  },
  {
    title: "one line of numbers by date",
    input: `
    | xLabel [date] | serie1 (unit1)  |
    | :------ | ------ |
    | 2021-01-02 | 2 |
    | 2022-03-02 | 4 |
    | 2023-04-02 | 8 |
    `,
  },
  {
    title: "one line of numbers by category",
    input: `
    | xLabel | serie1 (unit1)  |
    | :------ | ------ |
    | category 1 | 2 |
    | category 2 | 4 |
    | category 3 | 8 |
    `,
  },
  {
    title: "three lines of numbers by category",
    input: `
    | xLabel | serie1 (unit1)  |serie2 (unit2)  |serie3 (unit3)  |
    | :------ | ------ | ------ | ------ |
    | category 1 | 2 | 4 | 1 |
    | category 2 | 4 | 5 | 2 |
    | category 3 | 8 | 2 | 2 |

    legendTitle: This is a title
    `,
  },
];

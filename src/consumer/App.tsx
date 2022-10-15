import React from "react";
import { generateHtmlString } from "../library/main";
import classes from "./App.module.css";

const testValue = `
| title1  | title2  |title3  |
| :------ | ------ |------ |
| 2 | 2      |2      |
| 5 | 3      |5     |
| 6 | 4      |2      |
`;

const testValue2 = `
| title1  | title2  |title3  |
| :------ | ------ |------ |
| blabla | 2      |2      |
| blili | 3      |5     |
| bloblo | 4      |2      |
`;

function App() {
  return (
    <div className={classes.root}>
      <div className={classes.app}>
        <h1 className={classes.h1}>Turn to chart</h1>
        <div
          dangerouslySetInnerHTML={{ __html: generateHtmlString(testValue) }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: generateHtmlString(testValue2) }}
        />
      </div>
    </div>
  );
}

export default App;

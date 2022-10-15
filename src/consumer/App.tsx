import React from "react";
import { generateHtmlString } from "../library/main";
import classes from "./App.module.css";
import { examples } from "./Examples";

function App() {
  const examplesWithOnly = examples.filter((item) => item.only);
  const examplesToRender =
    examplesWithOnly.length > 0 ? examplesWithOnly : examples;
  return (
    <div className={classes.root}>
      <div className={classes.app}>
        <h1 className={classes.h1}>Turn to chart</h1>
        {examplesToRender.map((item) => (
          <div>
            <h2>{item.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: generateHtmlString(item.input),
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

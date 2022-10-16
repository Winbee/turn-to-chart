import React, { CSSProperties } from "react";
import { Editor } from "./Editor";
import { examples } from "./Examples";

const ExamplesWrapper: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4em",
};

export function Home() {
  const examplesWithOnly = examples.filter((item) => item.only);
  const examplesToRender =
    examplesWithOnly.length > 0 ? examplesWithOnly : examples;
  return (
    <div style={ExamplesWrapper}>
      {examplesToRender.map((item) => {
        return <Editor initialValue={item.input} />;
      })}
    </div>
  );
}

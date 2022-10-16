import React, { CSSProperties } from "react";
import { generateHtmlString } from "../library/main";
import { examples } from "./Examples";

const RootDiv: CSSProperties = {
  fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "400",
  colorScheme: "light dark",
  color: "rgba(255, 255, 255, 0.87)",
  backgroundColor: "#242424",
  fontSynthesis: "none",
  textRendering: "optimizeLegibility",
  minHeight: "100vh",
};

const WrapperDiv: CSSProperties = {
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "2rem",
  textAlign: "center",
};

const TitleH1: CSSProperties = {
  fontSize: "3.2em",
  lineHeight: "1.1",
};

const TitleH2: CSSProperties = {
  marginTop: "2em",
};

function App() {
  const examplesWithOnly = examples.filter((item) => item.only);
  const examplesToRender =
    examplesWithOnly.length > 0 ? examplesWithOnly : examples;
  return (
    <div style={RootDiv}>
      <div style={WrapperDiv}>
        <h1 style={TitleH1}>Turn to chart</h1>
        {examplesToRender.map((item, index) => {
          const result = generateHtmlString(item.input);
          return (
            <div key={index}>
              <h2 style={TitleH2}>{item.title}</h2>
              {result.metadata.isSucess ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: result.data,
                  }}
                />
              ) : (
                <div>{JSON.stringify(result.errors)}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

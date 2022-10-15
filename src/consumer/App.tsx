import React from "react";
import styled from "@emotion/styled";
import { generateHtmlString } from "../library/main";
import { examples } from "./Examples";

const RootDiv = styled.div`
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  min-height: 100vh;
`;

const WrapperDiv = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const TitleH1 = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
`;

function App() {
  const examplesWithOnly = examples.filter((item) => item.only);
  const examplesToRender =
    examplesWithOnly.length > 0 ? examplesWithOnly : examples;
  return (
    <RootDiv>
      <WrapperDiv>
        <TitleH1>Turn to chart</TitleH1>
        {examplesToRender.map((item, index) => (
          <div key={index}>
            <h2>{item.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: generateHtmlString(item.input),
              }}
            />
          </div>
        ))}
      </WrapperDiv>
    </RootDiv>
  );
}

export default App;

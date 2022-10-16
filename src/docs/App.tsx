import React, { CSSProperties } from "react";
import { Home } from "./Home";

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

const Content: CSSProperties = {};

const Header: CSSProperties = {
  marginBottom: "5em",
};

export function App() {
  return (
    <div style={RootDiv}>
      <div style={WrapperDiv}>
        <div style={Header}>
          <h1 style={TitleH1}>Turn to chart</h1>
          <h2 style={TitleH2}>
            transform csv and markdown tables into beautiful charts
          </h2>
        </div>
        <div style={Content}>
          <Home />
        </div>
      </div>
    </div>
  );
}

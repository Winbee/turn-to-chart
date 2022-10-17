import React, { CSSProperties, useMemo } from "react";
import { generateHtmlString } from "../library/main";

const WrapperDiv: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const ErrorDiv: CSSProperties = {
  width: "100%",
  maxWidth: "50em",
  height: "auto",
  margin: "2em 0",
  padding: "1em",
  borderRadius: 4,
  background: "#8282821c",
};

interface ViewerProps {
  stringValue: string;
}

export function Viewer({ stringValue }: ViewerProps) {
  const result = useMemo(() => {
    return generateHtmlString(stringValue);
  }, [stringValue]);
  return (
    <div style={WrapperDiv}>
      {result.metadata.isSucess ? (
        <div
          dangerouslySetInnerHTML={{
            __html: result.data,
          }}
        />
      ) : (
        <div style={ErrorDiv}>
          <div>{JSON.stringify(result.errors.join(","))}</div>
        </div>
      )}
    </div>
  );
}

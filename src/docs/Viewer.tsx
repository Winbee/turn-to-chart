import React, { CSSProperties, useMemo } from "react";
import { generateHtmlString } from "../library/main";

const WrapperDiv: CSSProperties = {
  display: "flex",
  alignItems: "center",
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
        <div>{JSON.stringify(result.errors.join(","))}</div>
      )}
    </div>
  );
}

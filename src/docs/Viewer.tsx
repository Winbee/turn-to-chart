import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const [buttonLabel, setButtonLabel] = useState("Copy HTML");

  const result = useMemo(() => {
    return generateHtmlString(stringValue);
  }, [stringValue]);

  useEffect(() => {
    setButtonLabel("Copy HTML");
  }, [result]);

  const copyHTML = useCallback(async () => {
    await navigator.clipboard.writeText(result.data);
    setButtonLabel("Copied !");
  }, [result]);

  return (
    <div style={WrapperDiv}>
      {result.metadata.isSucess ? (
        <div>
          <button onClick={copyHTML}>{buttonLabel}</button>
          <div
            dangerouslySetInnerHTML={{
              __html: result.data,
            }}
          />
        </div>
      ) : (
        <div style={ErrorDiv}>
          <div>{JSON.stringify(result.errors.join(","))}</div>
        </div>
      )}
    </div>
  );
}

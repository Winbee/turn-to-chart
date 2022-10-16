import React, { CSSProperties, useMemo, useState } from "react";
import { Viewer } from "./Viewer";

const WrapperDiv: CSSProperties = {
  display: "flex",
  gap: "1em",
  justifyContent: "space-between",
};

const TextArea: CSSProperties = {
  minHeight: 300,
  width: "50%",
  resize: "none",
};

const debounce = (fn: any, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeout != null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, delay, ...args);
  };
};

interface EditorProps {
  initialValue: string;
}

export function Editor({ initialValue }: EditorProps) {
  const [stringValue, setStringValue] = useState(initialValue);

  const [debouncedStringValue, setDebouncedStringValue] =
    useState(initialValue);

  const memoizedDebounce = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedStringValue(value);
      }, 500),
    []
  );

  return (
    <div style={WrapperDiv}>
      <textarea
        style={TextArea}
        name="text"
        placeholder="Enter text"
        value={stringValue}
        onChange={(value) => {
          const newString = value.target.value;
          setStringValue(newString);
          memoizedDebounce(newString);
        }}
      ></textarea>
      <Viewer stringValue={debouncedStringValue} />
    </div>
  );
}

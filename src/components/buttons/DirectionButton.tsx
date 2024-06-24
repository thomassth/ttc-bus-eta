import { Button } from "@fluentui/react-components";
// skipcq: JS-W1028
import React, { useCallback } from "react";

export function DirectionButton({
  direction,
  enabledDir,
  setEnabledDir,
}: {
  direction: string;
  enabledDir: string;
  setEnabledDir: React.Dispatch<React.SetStateAction<string>>;
}) {
  const setEnabledDirCallback = useCallback(() => setEnabledDir(direction), []);
  return (
    <Button
      appearance={enabledDir === direction ? "primary" : "secondary"}
      onClick={setEnabledDirCallback}
      key={direction}
      value={direction}
    >
      {direction}
    </Button>
  );
}

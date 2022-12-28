import { Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { expiredStyle } from "./CountdownGroup";

export function CountdownSec(props: { second: number }) {
  const [sec, setSec] = useState(props.second);
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSec(sec - 1);
    }, 1000);
    if (sec < 0) {
      clearTimeout(timer);
    }

    if (sec < 0) {
      setExpired(true);
    }
    // Cleanup
    return () => clearTimeout(timer);
  }, [sec]);
  return <Text style={expired ? expiredStyle : {}}>{sec}s</Text>;
}

import { Badge, Text } from "@fluentui/react-components";
import { useEffect, useState } from "react";

export const expiredStyle = {
  color: "red",
};

export function CountdownSec(props: { second: number }) {
  const [sec, setSec] = useState(props.second);
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSec(sec - 1);
    }, 1000);
    if (sec < 0) {
      clearTimeout(timer);
      setExpired(true);
    }
    // Cleanup
    return () => clearTimeout(timer);
  }, [sec]);
  if (!expired) {
    return <Text>{`${sec}s`}</Text>;
  } else {
    return (
      <Badge color="danger" shape="rounded">
        Arriving
      </Badge>
    );
  }
}

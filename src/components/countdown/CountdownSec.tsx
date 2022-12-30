import { Badge, Text, Title2 } from "@fluentui/react-components";
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
    if (sec <= 0) {
      clearTimeout(timer);
      setExpired(true);
    }
    // Cleanup
    return () => clearTimeout(timer);
  }, [sec]);
  if (!expired) {
    return (
      <div className="countdownSec">
        <Title2>
          {Math.floor(sec / 60) >= 1
            ? `${Math.floor(sec / 60)}m `
            : `${sec % 60}s`}
        </Title2>

        {sec % 60 !== 0 && Math.floor(sec / 60) >= 1 ? (
          <Text>{`${sec % 60}s`}</Text>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="countdownSec">
        <Badge color="danger" shape="rounded">
          Arriving
        </Badge>
      </div>
    );
  }
}

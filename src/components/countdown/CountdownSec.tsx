import { Badge, Text, Title2 } from "@fluentui/react-components";
import { useEffect, useState } from "react";

import { fluentStyles } from "../../styles/fluent";

export const expiredStyle = {
  color: "red",
};

export function CountdownSec(props: { second: number; epochTime: number }) {
  const [epochTime, setEpochTime] = useState(props.epochTime);
  const [sec, setSec] = useState(Math.floor((epochTime - Date.now()) / 1000));
  const overrides = fluentStyles();

  // TODO: not using seconds provided in API; may make it an option later

  useEffect(() => {
    if (epochTime !== props.epochTime) {
      setEpochTime(props.epochTime);
      setSec(Math.floor((epochTime - Date.now()) / 1000));
    }
    const timer = setTimeout(() => {
      setSec(Math.floor((epochTime - Date.now()) / 1000));
    }, 1000);
    if (sec <= 0) {
      clearTimeout(timer);
    }
    // Cleanup
    return () => clearTimeout(timer);
  }, [sec]);
  if (sec > 0) {
    return (
      <div className="countdownSec number">
        <Title2 className={overrides.number}>
          {Math.floor(sec / 60) >= 1
            ? `${Math.floor(sec / 60)}m `
            : `${sec % 60}s`}
        </Title2>

        {sec % 60 !== 0 && Math.floor(sec / 60) >= 1 ? (
          <Text className={overrides.number}>{`${sec % 60}s`}</Text>
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

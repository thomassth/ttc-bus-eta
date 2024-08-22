import { Card } from "@fluentui/react-components";
import { useEffect, useState } from "react";

import { FetchJSONWithCancelToken } from "../../components/fetch/fetchUtils.js";

export default function GORoutes() {
  const [resp, setResponse] = useState<{
    AllLines?: { Line: { Name: string; Code: string }[] };
  }>({});

  const date = new Date();

  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      const { data, Error } = await FetchJSONWithCancelToken(
        `https://api.openmetrolinx.com/OpenDataAPI/api/V1/Schedule/Line/All/${date.getFullYear()}${`0${date.getMonth() + 1}`.slice(-2)}${date.getDate()}?key=${import.meta.env.VITE_GO_ACCESS}`,
        { signal: controller.signal }
      );

      return { data, Error };
    };

    fetchEtaData().then(({ data, Error }) => {
      if (Error || !data) {
        return;
      }

      setResponse(data);
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <main>
      <h1>GO Transit</h1>
      {resp?.AllLines?.Line.map((item) => {
        return (
          <Card key={item.Name}>
            {item.Code} {item.Name}
          </Card>
        );
      })}
    </main>
  );
}

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { FetchJSONWithCancelToken } from "../../components/fetch/fetchUtils.js";

export default function GODir() {
  const params = useParams();
  // const [resp, setResponse] = useState({ AllLines: { Line: [] } });

  useEffect(() => {
    const controller = new AbortController();

    const fetchEtaData = async () => {
      const { data, Error } = await FetchJSONWithCancelToken(
        `https://api.openmetrolinx.com/OpenDataAPI/api/V1/Stop/NextService/02821?key=${import.meta.env.VITE_GO_ACCESS}`,
        {
          signal: controller.signal,
        }
      );

      return { data, Error };
    };

    fetchEtaData().then(({ data, Error }) => {
      if (Error || !data) {
        // return;
      }

      // setResponse(data);
    });

    // when useEffect is called, the following clean-up fn will run first
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      {params.lineId} {params.dir}
    </div>
  );
}

type RequestInit = globalThis.RequestInit;

export async function FetchJSONWithCancelToken(
  url: string,
  options: RequestInit
) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return { data };
  } catch (e) {
    return { data: "", Error: Error(`${e}`) };
  }
}

export const getLineStopPredictions = async (
  line: number,
  stopNum: number,
  options: RequestInit
) => {
  const response = await FetchJSONWithCancelToken(
    `https://webservices.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&r=${line}&s=${stopNum}`,
    options
  );
  return response.data;
};

export const getTTCSubwayPredictions = async (
  stopNum: number,
  options: RequestInit
) => {
  const response = await FetchJSONWithCancelToken(
    `https://ntas.ttc.ca/api/ntas/get-next-train-time/${stopNum}`,
    options
  );
  return response.data;
};
export const getTTCSubwayData = async (
  lineNum: number,
  options: RequestInit
) => {
  const response = await FetchJSONWithCancelToken(
    `https://www.ttc.ca/ttcapi/routedetail/get?id=${lineNum}`,
    options
  );
  return response.data;
};

export const getTTCMultiRouteData = async (
  controller: AbortController,
  fetchUrl: string
) => {
  const { data, Error } = await FetchJSONWithCancelToken(
    `https://retro.umoiq.com/service/publicJSONFeed?command=predictionsForMultiStops&a=ttc${fetchUrl}`,
    {
      signal: controller.signal,
      method: "GET",
    }
  );

  return { parsedData: data, error: Error };
};

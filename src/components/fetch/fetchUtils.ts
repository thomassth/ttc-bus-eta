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

export const getVehicleLocation = async (
  vehicle: number,
  options: RequestInit
) => {
  const response = await fetch(
    `https://webservices.umoiq.com/service/publicJSONFeed?command=vehicleLocation&a=ttc&v=${vehicle}`
  );
  const data = await response.json();
  if (data.Error) {
    return data;
  }
  data.vehicle.heading = parseInt(data.vehicle?.heading) ?? 0;
  data.vehicle.lon = parseFloat(data.vehicle?.lon);
  data.vehicle.lat = parseFloat(data.vehicle?.lat);
  data.vehicle.line = data.vehicle?.dirTag?.split("_")[2] || "";
  return data;
};

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

export const getStopPredictions = async (
  stopId: number,
  options: RequestInit
) => {
  const response = await FetchJSONWithCancelToken(
    `https://webservices.umoiq.com/service/publicJSONFeed?command=predictions&a=ttc&stopId=${stopId}`,
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

export const getTTCRouteData = async (
  lineNum: number,
  options: RequestInit
) => {
  const response = await FetchJSONWithCancelToken(
    `https://webservices.umoiq.com/service/publicJSONFeed?command=routeConfig&a=ttc&r=${lineNum}`,
    options
  );
  return response.data;
};
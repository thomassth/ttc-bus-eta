import { LineStop } from "../../data/EtaObjects";

export function stopsParser(json: {
  body: {
    Error: string | undefined;
    route: {
      stop: {
        stopId: string | undefined;
        tag: string;
        title: string;
        lat: string;
        lon: string;
      }[];
    };
  };
}): LineStop[] {
  const result: LineStop[] = [];
  console.log(json);
  if (json.body.Error === undefined) {
    json.body.route.stop.map(
      (element: {
        stopId: string | undefined;
        tag: string;
        title: string;
        lat: string;
        lon: string;
      }) => {
        if (element.stopId === undefined) {
          console.log(element);
        } else {
          result.push({
            id: parseInt(element.tag),
            name: element.title,
            latlong: [parseFloat(element.lat), parseFloat(element.lon)],
            stopId: parseInt(element.stopId),
          });
        }
        return element;
      }
    );
  } else {
    result.push({
      name: "Error",
      id: -1,
      latlong: [],
      stopId: -1,
    });
  }
  console.log(result);
  return result;
}
